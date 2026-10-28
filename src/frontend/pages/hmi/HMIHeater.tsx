import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readTag, writeTag } from "../../services/opcService";
import "./HMIHeater.css";

const HEATER_COUNT = 26;

function HMIHeater() {
  const navigate = useNavigate();

  const [heaterMode, setHeaterMode] = useState(false);

  // Actual heater output status
  const [heaterStates, setHeaterStates] = useState<boolean[]>(
    Array(HEATER_COUNT).fill(false)
  );

  // AM command/selection status
  const [heaterCommands, setHeaterCommands] = useState<boolean[]>(
    Array(HEATER_COUNT).fill(false)
  );

  const [loading, setLoading] = useState(true);

  // =========================================================
  // READ HEATER STATUS
  // =========================================================

  async function loadHeaterStatus() {
    try {
      // -------------------------------------------------------
      // MASTER HEATER MODE
      // -------------------------------------------------------

      const modeResult = await readTag(
        "xHeater_Mode_on"
      );

      if (typeof modeResult?.value === "boolean") {
        setHeaterMode(modeResult.value);
      }

      // -------------------------------------------------------
      // READ AM + OP FOR ALL 26 HEATERS
      // -------------------------------------------------------

      const results = await Promise.all(
        Array.from(
          { length: HEATER_COUNT },
          async (_, index) => {

            const heaterNumber = index + 1;

            const amResult = await readTag(
              `xHEATER${heaterNumber}_AM`
            );

            const opResult = await readTag(
              `xO_HEATER${heaterNumber}_OP`
            );

            return {
              am:
                typeof amResult?.value === "boolean"
                  ? amResult.value
                  : false,

              op:
                typeof opResult?.value === "boolean"
                  ? opResult.value
                  : false,
            };
          }
        )
      );

      // -------------------------------------------------------
      // UPDATE HMI STATES
      // -------------------------------------------------------

      setHeaterCommands(
        results.map((result) => result.am)
      );

      setHeaterStates(
        results.map((result) => result.op)
      );

    } catch (error) {

      console.error(
        "Failed to read heater status:",
        error
      );

    } finally {

      setLoading(false);

    }
  }

  // =========================================================
  // POLLING
  // =========================================================

  useEffect(() => {

    loadHeaterStatus();

    const interval = setInterval(
      loadHeaterStatus,
      500
    );

    return () => clearInterval(interval);

  }, []);

  // =========================================================
  // HEATER MASTER MODE
  // =========================================================

  async function handleHeaterMode() {

    const newValue = !heaterMode;

    try {

      const result = await writeTag(
        "xHeater_Mode_on",
        newValue
      );

      console.log(
        "xHeater_Mode_on:",
        result
      );

      if (result?.status !== "success") {

        console.error(
          "Failed to change heater mode:",
          result
        );

      }

    } catch (error) {

      console.error(
        "Failed to change heater mode:",
        error
      );

    }
  }

  // =========================================================
  // INDIVIDUAL HEATER
  // =========================================================

  async function handleHeaterToggle(
    index: number
  ) {

    const heaterNumber = index + 1;

    const tagName =
      `xHEATER${heaterNumber}_AM`;

    const newValue =
      !heaterCommands[index];

    try {

      const result = await writeTag(
        tagName,
        newValue
      );

      console.log(
        `${tagName}:`,
        result
      );

      if (result?.status !== "success") {

        console.error(
          `Failed to write ${tagName}:`,
          result
        );

      }

      /*
       * IMPORTANT:
       *
       * We do NOT manually change heaterStates.
       *
       * The simulated PLC changes:
       *
       * xO_HEATERn_OP
       *
       * and the polling function reads
       * that actual output.
       */

    } catch (error) {

      console.error(
        `Failed to write ${tagName}:`,
        error
      );

    }
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="hmi-heater">

      {/* HEADER */}

      <div className="hmi-heater-header">
        HEATER
      </div>


      <div className="hmi-heater-panel">

        {/* MASTER HEATER MODE */}

        <div className="hmi-heater-mode-row">

          <span>
            HEATER MODE
          </span>

          <button
            type="button"
            className={`hmi-heater-mode-button ${
              heaterMode
                ? "heater-mode-on"
                : "heater-mode-off"
            }`}
            onClick={handleHeaterMode}
            disabled={loading}
          >
            {loading
              ? "LOADING..."
              : heaterMode
                ? "ON"
                : "OFF"}
          </button>

        </div>


        {/* INDIVIDUAL HEATERS */}

        <div className="hmi-heater-grid">

          {heaterStates.map(
            (state, index) => {

              const heaterNumber =
                index + 1;

              return (

                <div
                  className="hmi-heater-item"
                  key={heaterNumber}
                >

                  <span>
                    HEATER {heaterNumber}
                  </span>

                  <button
                    type="button"
                    className={`hmi-heater-button ${
                      state
                        ? "heater-on"
                        : "heater-off"
                    }`}
                    onClick={() =>
                      handleHeaterToggle(index)
                    }
                  >

                    {state
                      ? "ON"
                      : "OFF"}

                  </button>

                </div>

              );
            }
          )}

        </div>

      </div>


      {/* BACK */}

      <button
        type="button"
        className="hmi-heater-back"
        onClick={() =>
          navigate("/hmi")
        }
      >
        ← BACK
      </button>

    </div>
  );
}

export default HMIHeater;