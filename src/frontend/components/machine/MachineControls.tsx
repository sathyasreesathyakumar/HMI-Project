
import {
  FaPlay,
  FaStop,
  FaRedoAlt,
} from "react-icons/fa";

import {
  startMachine,
  stopMachine,
  resetMachine,
} from "../../services/opcService";
import { useState } from "react";

import { useMachine } from "../../context/MachineContext";

function MachineControls() {
  const [commandPending, setCommandPending] = useState(false);
  /*
   * ============================================
   * MACHINE CONTEXT
   * ============================================
   *
   * START / STOP:
   * Changes machineRunning.
   *
   * RESET:
   * Calls triggerReset(), which:
   * - stops the machine
   * - increments resetTrigger
   * - tells MachinePanel to reset its states
   */
  const {
    setMachineRunning,
    triggerReset,
  } = useMachine();

  /*
   * ============================================
   * START
   * ============================================
   */
const handleStart = async () => {
  if (commandPending) return;

  setCommandPending(true);
  setMachineRunning(true);

  try {
    const result = await startMachine();
    console.log("START:", result);
  } catch (error) {
    console.error("Start failed:", error);
    setMachineRunning(false);
  } finally {
    setCommandPending(false);
  }
};

  /*
   * ============================================
   * STOP
   * ============================================
   */

  const handleStop = async () => {
  if (commandPending) return;

  setCommandPending(true);
  setMachineRunning(false);

  try {
    const result = await stopMachine();
    console.log("STOP:", result);
  } catch (error) {
    console.error("Stop failed:", error);
    setMachineRunning(true);
  } finally {
    setCommandPending(false);
  }
};

  /*
   * ============================================
   * RESET
   * ============================================
   *
   * For now RESET is an HMI-side reset.
   *
   * It:
   * - stops machineRunning
   * - increments resetTrigger
   * - causes MachinePanel to restore
   *   initial bar positions
   * - clears head levels
   * - clears station faults
   *
   * We can connect the actual PLC reset tag
   * later if needed.
   */

  const handleReset = async () => {
  const result = await resetMachine();

  console.log(result);

  if (result.status === "success") {
    triggerReset();
  }
};

  return (
    <div className="scale-90 p-2">
      <div className="flex flex-col">

        <fieldset
          className="
            mt-10
            border
            w-5
            border-slate-600
            rounded-lg
            p-2
          "
        >

          {/* ================================= */}
          {/* START                              */}
          {/* ================================= */}

          <button
            onClick={handleStart}
            className="
              w-24
              h-25
              rounded-lg
              bg-green-600
              hover:bg-green-700
              shadow-lg
              flex
              flex-col
              items-center
              justify-center
              transition-all
              duration-200
            "
          >
            <FaPlay size={28} />

            <p className="mt-3 text-sm font-bold text-white">
              START
            </p>
          </button>

          <br />

          {/* ================================= */}
          {/* STOP                               */}
          {/* ================================= */}

          <button
            onClick={handleStop}
            className="
              w-24
              h-25
              rounded-lg
              bg-red-600
              hover:bg-red-700
              shadow-lg
              flex
              flex-col
              items-center
              justify-center
              transition-all
              duration-200
            "
          >
            <FaStop size={28} />

            <p className="mt-3 text-sm font-bold text-white">
              STOP
            </p>
          </button>

          <br />

          {/* ================================= */}
          {/* RESET                              */}
          {/* ================================= */}

          <button
            onClick={handleReset}
            className="
              w-24
              h-25
              rounded-lg
              bg-slate-700
              hover:bg-slate-800
              shadow-lg
              flex
              flex-col
              items-center
              justify-center
              transition-all
              duration-200
            "
          >
            <FaRedoAlt size={28} />

            <p className="mt-3 text-sm font-bold text-white">
              RESET
            </p>
          </button>

        </fieldset>

      </div>
    </div>
  );
}

export default MachineControls;
