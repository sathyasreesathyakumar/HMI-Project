import { useEffect, useState } from "react";
import {
  readTag,
  writeTag,
  readStationSelections,
  readStationFaults,
  readHeadLevels,
  readOvalState,
} from "../../services/opcService";
import { useMachine } from "../../context/MachineContext";
import "./MachinePanel.css";

/*
 * ============================================
 * INITIAL CAROUSEL BAR POSITIONS
 * ============================================
 *
 * These are the original positions of all
 * 24 station bars.
 *
 * Positions 12, 13, 14 and 27, 28, 29 are
 * the three left/right transition positions.
 */
const INITIAL_BAR_POSITIONS = [
  // Stations 1–12 → bottom
  { station: 1, position: 0 },
  { station: 2, position: 1 },
  { station: 3, position: 2 },
  { station: 4, position: 3 },
  { station: 5, position: 4 },
  { station: 6, position: 5 },
  { station: 7, position: 6 },
  { station: 8, position: 7 },
  { station: 9, position: 8 },
  { station: 10, position: 9 },
  { station: 11, position: 10 },
  { station: 12, position: 11 },

  // Stations 13–24 → top
  { station: 13, position: 15 },
  { station: 14, position: 16 },
  { station: 15, position: 17 },
  { station: 16, position: 18 },
  { station: 17, position: 19 },
  { station: 18, position: 20 },
  { station: 19, position: 21 },
  { station: 20, position: 22 },
  { station: 21, position: 23 },
  { station: 22, position: 24 },
  { station: 23, position: 25 },
  { station: 24, position: 26 },
];

function MachinePanel() {
  /*
   * ============================================
   * MACHINE CONTEXT
   * ============================================
   *
   * machineRunning:
   * Controls whether the machine is running.
   *
   * resetTrigger:
   * Changes every time RESET is pressed.
   */
  const { machineRunning, resetTrigger } = useMachine();

  /*
   * ============================================
   * COUNTER
   * ============================================
   */
  const [counter, setCounter] = useState("0");

  /*
   * ============================================
   * STATION SELECTIONS
   * ============================================
   */
  const [stationSelections, setStationSelections] = useState<boolean[]>(
    Array.from({ length: 24 }, () => false)
  );

  /*
   * ============================================
   * STATION FAULTS
   * ============================================
   */
  const [stationFaults, setStationFaults] = useState(
    Array.from({ length: 24 }, () => ({
      squeezeFault: false,
      headDownFault: false,
      headUpFault: false,
    }))
  );

  /*
   * ============================================
   * HEAD LEVELS
   * ============================================
   */
  const [headLevels, setHeadLevels] = useState<boolean[]>(
    Array.from({ length: 24 }, () => false)
  );

  /*
   * ============================================
   * OVAL STATE
   * ============================================
   */
  const [ovalState, setOvalState] = useState({
    running: false,
    forward: false,
    reverse: false,
  });

  /*
   * ============================================
   * FIXED STATIONS
   * ============================================
   */

  const topStations = [
    13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24,
  ];

  const bottomStations = [
    12, 11, 10, 9, 8, 7,
    6, 5, 4, 3, 2, 1,
  ];

  /*
   * ============================================
   * MOVING FABRIC BARS
   * ============================================
   *
   * IMPORTANT:
   * Keep the same structure as your existing
   * working animation.
   */
  const [barPositions, setBarPositions] = useState<
    { station: number; position: number }[]
  >(INITIAL_BAR_POSITIONS);

  /*
   * ============================================
   * COUNTER HANDLING
   * ============================================
   */

  const handleCounterKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      const result = await writeTag(
        "counter",
        Number(counter)
      );

      console.log(result);

      await loadCounter();
    }
  };

  const loadCounter = async () => {
    const result = await readTag("counter");

    if (result.status === "success") {
      setCounter(String(result.value));
    } else {
      console.log(result.message);
    }
  };

  /*
   * ============================================
   * LOAD COUNTER
   * ============================================
   */

  useEffect(() => {
    loadCounter();
  }, []);

  /*
   * ============================================
   * STATION SELECTIONS
   * ============================================
   */

  useEffect(() => {
    let cancelled = false;

    const loadStationSelections = async () => {
      const selections = await readStationSelections();

      if (!cancelled) {
        setStationSelections(selections);
      }
    };

    loadStationSelections();

    const interval = setInterval(
      loadStationSelections,
      5000
    );

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  /*
   * ============================================
   * CAROUSEL MOVEMENT
   * ============================================
   *
   * The bars move only when the oval is running.
   *
   * Forward:
   * position + 1
   *
   * Reverse:
   * position - 1
   *
   * The modulo 30 keeps the bars inside the
   * 30 carousel positions.
   */
  useEffect(() => {
  if (!machineRunning) return;

  const interval = setInterval(() => {
    setBarPositions((previous) =>
      previous.map((bar) => {
        if (ovalState.forward) {
          return {
            ...bar,
            position: (bar.position + 1) % 30,
          };
        }

        if (ovalState.reverse) {
          return {
            ...bar,
            position: (bar.position - 1 + 30) % 30,
          };
        }

        return bar;
      })
    );
  }, 1000);

  return () => clearInterval(interval);
}, [
  machineRunning,
  ovalState.forward,
  ovalState.reverse,
]);

  /*
   * ============================================
   * STATION FAULTS
   * ============================================
   */

  useEffect(() => {
    let cancelled = false;

    const loadStationFaults = async () => {
      const faults = await readStationFaults();

      if (!cancelled) {
        setStationFaults(faults);
      }
    };

    loadStationFaults();

    const interval = setInterval(
      loadStationFaults,
      5000
    );

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  /*
   * ============================================
   * HEAD LEVELS
   * ============================================
   */

  useEffect(() => {
    let cancelled = false;

    const loadHeadLevels = async () => {
      const levels = await readHeadLevels();

      if (!cancelled) {
        setHeadLevels(levels);
      }
    };

    loadHeadLevels();

    const interval = setInterval(
      loadHeadLevels,
      5000
    );

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  /*
   * ============================================
   * OVAL STATE
   * ============================================
   */

  useEffect(() => {
    let cancelled = false;

    const loadOvalState = async () => {
      const state = await readOvalState();

      if (!cancelled) {
        setOvalState(state);
      }
    };

    loadOvalState();

    const interval = setInterval(
      loadOvalState,
      5000
    );

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  /*
   * ============================================
   * RESET
   * ============================================
   *
   * Whenever resetTrigger changes:
   *
   * 1. Stop carousel movement
   * 2. Restore original bar positions
   * 3. Make all heads idle
   * 4. Clear all faults
   *
   * machineRunning itself is controlled by
   * MachineContext.
   */
  useEffect(() => {
    if (resetTrigger === 0) return;

    /*
     * Restore original carousel positions.
     *
     * Use a new array so React gets a fresh state
     * reference.
     */
    setBarPositions(
      INITIAL_BAR_POSITIONS.map((bar) => ({
        ...bar,
      }))
    );

    /*
     * All heads become idle.
     */
    setHeadLevels(
      Array.from({ length: 24 }, () => false)
    );

    /*
     * Clear all station faults.
     */
    setStationFaults(
      Array.from({ length: 24 }, () => ({
        squeezeFault: false,
        headDownFault: false,
        headUpFault: false,
      }))
    );
  }, [resetTrigger]);

  /*
   * ============================================
   * GET POSITION CLASS
   * ============================================
   */

  const getPositionClass = (position: number) => {
    /*
     * Bottom positions
     * 0 → 11
     */
    if (position >= 0 && position <= 11) {
      return `carousel-bottom-${position}`;
    }

    /*
     * Left transition positions
     * 12 → 14
     */
    if (position === 12) {
      return "carousel-left-1";
    }

    if (position === 13) {
      return "carousel-left-2";
    }

    if (position === 14) {
      return "carousel-left-3";
    }

    /*
     * Top positions
     * 15 → 26
     */
    if (position >= 15 && position <= 26) {
      return `carousel-top-${position - 15}`;
    }

    /*
     * Right transition positions
     * 27 → 29
     */
    if (position === 27) {
      return "carousel-right-1";
    }

    if (position === 28) {
      return "carousel-right-2";
    }

    if (position === 29) {
      return "carousel-right-3";
    }

    return "";
  };

  /*
   * ============================================
   * BAR COLOR
   * ============================================
   *
   * Priority:
   *
   * FAULT
   *   ↓
   * GREEN / RUNNING
   *   ↓
   * GRAY / IDLE
   *
   * After RESET:
   * headLevels = false
   * faults = false
   *
   * Therefore all bars become gray naturally.
   */
  const getBarColor = (station: number) => {
    const stationIndex = station - 1;

    const fault = stationFaults[stationIndex];

    /*
     * Fault has highest priority.
     */
    if (
      fault?.squeezeFault ||
      fault?.headDownFault ||
      fault?.headUpFault
    ) {
      return "bg-red-500";
    }

    /*
     * Station/head is ON.
     */
    if (headLevels[stationIndex]) {
      return "bg-green-500";
    }

    /*
     * Idle.
     */
    return "bg-gray-400";
  };

  return (
    <div
      className="
        flex
        justify-center
        origin-top
        p-2
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        flex-col
        items-center
      "
    >
      {/* ========================================= */}
      {/* COUNTER                                   */}
      {/* ========================================= */}

      <div className="mb-3 self-start">
        <fieldset
          className="
            border
            border-slate-600
            rounded-lg
            inline-block
            p-2
          "
        >
          <p className="text-sm text-slate-400">
            COUNTER
          </p>

          <input
            type="number"
            value={counter}
            onChange={(e) =>
              setCounter(e.target.value)
            }
            onKeyDown={handleCounterKeyDown}
            className="
              mt-2
              w-30
              rounded-lg
              border-2
              border-cyan-500/40
              bg-slate-950
              text-center
              text-3xl
              font-bold
              text-cyan-400
              outline-none
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-500/30
              transition-all
            "
          />
        </fieldset>
      </div>

      {/* ========================================= */}
      {/* TOP NUMBERS                               */}
      {/* ========================================= */}

      <div className="flex justify-left gap-4 text-white">
        {topStations.map((station) => (
          <div
            key={station}
            className="w-7 text-center font-semibold"
          >
            {station}
          </div>
        ))}
      </div>

      {/* ========================================= */}
      {/* TOP BLUE BOXES                            */}
      {/* FIXED                                     */}
      {/* ========================================= */}

      <div className="mt-0 flex justify-left gap-4">
        {topStations.map((station) => {
          const selected =
            stationSelections[station - 1];

          return (
            <div
              key={station}
              className={`
                h-7
                w-7
                rounded-md
                transition-colors
                duration-200
                ${
                  selected
                    ? "bg-blue-500"
                    : "bg-slate-600"
                }
              `}
            />
          );
        })}
      </div>

      {/* ========================================= */}
      {/* MACHINE AREA                              */}
      {/* ========================================= */}

      <div
        className="
          relative
          mt-1.5
          h-[270px]
          w-[620px]
        "
      >
        {/* ======================================= */}
        {/* MOVING FABRIC BARS                      */}
        {/* ======================================= */}

        {barPositions.map((bar) => (
          <div
            key={bar.station}
            className={`carousel-bar ${getPositionClass(
              bar.position
            )}`}
          >
            <div
              className={`
                h-14
                w-7
                rounded-md
                ${getBarColor(bar.station)}
                carousel-bar-rotation
              `}
            />
          </div>
        ))}

        {/* ======================================= */}
        {/* FIXED YELLOW OVAL                       */}
        {/* ======================================= */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            z-10
            h-[150px]
            w-[520px]
            rounded-[90px]
            border-[8px]
            border-yellow-400
            flex
            flex-col
            items-center
            justify-center
            bg-slate-900
          "
        >
          <h1 className="text-3xl font-bold text-cyan-400">
            ALL STROKE
          </h1>

          <p className="mt-0.5 text-white">
            24 STATION CAROUSEL
          </p>

          {/* LEGEND */}

          <div className="mt-1.5 flex gap-5 text-white">
            <fieldset
              className="
                border
                h-10
                border-slate-600
                rounded-lg
                p-2
                flex
                gap-4
                text-white
              "
            >
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-green-500" />
                Running
              </div>

              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-400" />
                Idle
              </div>

              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-red-500" />
                Fault
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* BOTTOM BLUE BOXES                         */}
      {/* FIXED                                     */}
      {/* ========================================= */}

      <div className="mt-1.5 flex justify-left gap-4">
        {bottomStations.map((station) => {
          const selected =
            stationSelections[station - 1];

          return (
            <div
              key={station}
              className={`
                h-7
                w-7
                rounded-md
                transition-colors
                duration-200
                ${
                  selected
                    ? "bg-blue-500"
                    : "bg-slate-600"
                }
              `}
            />
          );
        })}
      </div>

      {/* ========================================= */}
      {/* BOTTOM NUMBERS                            */}
      {/* ========================================= */}

      <div className="mt-0 flex justify-left gap-4 text-white">
        {bottomStations.map((station) => (
          <div
            key={station}
            className="w-7 text-center font-semibold"
          >
            {station}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MachinePanel;

