import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readTag, writeTag } from "../../services/opcService";
import "./HMIPrintSelection.css";

function HMIPrintSelection() {
  const navigate = useNavigate();

  const [printEnabled, setPrintEnabled] = useState(false);
  const [printOnDelay, setPrintOnDelay] = useState(0);

  const [loadingPrint, setLoadingPrint] = useState(true);
  const [loadingDelay, setLoadingDelay] = useState(true);

  useEffect(() => {
    async function loadPrintStatus() {
      try {
        const result = await readTag("xPrint");

        console.log("xPrint:", result);

        if (
          result?.status === "success" &&
          typeof result.value === "boolean"
        ) {
          setPrintEnabled(result.value);
        }
      } catch (error) {
        console.error("Failed to read xPrint:", error);
      } finally {
        setLoadingPrint(false);
      }
    }

    async function loadPrintDelay() {
      try {
        const result = await readTag("PrintOnDelay");

        console.log("PrintOnDelay:", result);

        if (
          result?.status === "success" &&
          typeof result.value === "number"
        ) {
          setPrintOnDelay(result.value);
        }
      } catch (error) {
        console.error("Failed to read PrintOnDelay:", error);
      } finally {
        setLoadingDelay(false);
      }
    }

    loadPrintStatus();
    loadPrintDelay();
  }, []);

  async function handlePrintToggle() {
    const newValue = !printEnabled;

    try {
      const result = await writeTag("xPrint", newValue);

      console.log("xPrint write:", result);

      if (result?.status === "success") {
        setPrintEnabled(newValue);
      } else {
        console.error("Failed to write xPrint:", result);
      }
    } catch (error) {
      console.error("Failed to write xPrint:", error);
    }
  }

  async function handleDelayChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newValue = Number(event.target.value);

    setPrintOnDelay(newValue);
  }

  async function handleDelaySave() {
    try {
      const result = await writeTag(
        "PrintOnDelay",
        printOnDelay
      );

      console.log("PrintOnDelay write:", result);

      if (result?.status !== "success") {
        console.error(
          "Failed to write PrintOnDelay:",
          result
        );
      }
    } catch (error) {
      console.error(
        "Failed to write PrintOnDelay:",
        error
      );
    }
  }

  return (
    <div className="hmi-print-selection">

      <div className="hmi-print-header">
        PRINT SELECTION
      </div>

      <div className="hmi-print-panel">

        {/* PRINT */}

        <div className="hmi-print-row">

          <span>PRINT</span>

          <button
            type="button"
            className={`hmi-print-button ${
              printEnabled
                ? "print-enabled"
                : "print-disabled"
            }`}
            onClick={handlePrintToggle}
            disabled={loadingPrint}
          >
            {loadingPrint
              ? "LOADING..."
              : printEnabled
                ? "ENABLED"
                : "DISABLED"}
          </button>

        </div>

        {/* PRINT ON DELAY */}

        <div className="hmi-print-row">

          <span>PRINT ON DELAY</span>

          <div className="hmi-print-delay-control">

            <input
              type="number"
              min="0"
              value={
                loadingDelay
                  ? ""
                  : printOnDelay
              }
              onChange={handleDelayChange}
              disabled={loadingDelay}
            />

            <button
              type="button"
              onClick={handleDelaySave}
              disabled={loadingDelay}
            >
              SAVE
            </button>

          </div>

        </div>

      </div>

      <button
        type="button"
        className="hmi-print-back"
        onClick={() => navigate("/hmi")}
      >
        ← BACK
      </button>

    </div>
  );
}

export default HMIPrintSelection;