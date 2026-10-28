import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readTag, writeTag } from "../../services/opcService";
import "./HMIModeSelection.css";

function HMIModeSelection() {
  const navigate = useNavigate();

  const [autoMode, setAutoMode] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load current values from OPC
  useEffect(() => {
    async function loadModes() {
      try {
        const autoResult = await readTag("AutoMode");
        const manualResult = await readTag("ManualMode");

        console.log("AutoMode:", autoResult);
        console.log("ManualMode:", manualResult);

        if (typeof autoResult?.value === "boolean") {
          setAutoMode(autoResult.value);
        }

        if (typeof manualResult?.value === "boolean") {
          setManualMode(manualResult.value);
        }
      } catch (error) {
        console.error("Failed to read mode:", error);
      } finally {
        setLoading(false);
      }
    }

    loadModes();
  }, []);

  // AUTO MODE
  async function handleAutoMode() {
    try {
      const result = await writeTag("AutoMode", true);
      console.log("AutoMode write:", result);

      if (result?.status === "success") {
        await writeTag("ManualMode", false);

        setAutoMode(true);
        setManualMode(false);
      }
    } catch (error) {
      console.error("Failed to set Auto Mode:", error);
    }
  }

  // MANUAL MODE
  async function handleManualMode() {
    try {
      const result = await writeTag("ManualMode", true);
      console.log("ManualMode write:", result);

      if (result?.status === "success") {
        await writeTag("AutoMode", false);

        setManualMode(true);
        setAutoMode(false);
      }
    } catch (error) {
      console.error("Failed to set Manual Mode:", error);
    }
  }

  return (
    <div className="hmi-mode-selection">

      <div className="hmi-mode-header">
        MODE SELECTION
      </div>

      <div className="hmi-mode-panel">

        {/* AUTO MODE */}
        <div className="hmi-mode-row">
          <span>AUTO MODE</span>

          <button
            type="button"
            className={`hmi-mode-button ${
              autoMode ? "mode-active" : "mode-inactive"
            }`}
            onClick={handleAutoMode}
            disabled={loading}
          >
            {loading ? "LOADING..." : autoMode ? "ON" : "OFF"}
          </button>
        </div>

        {/* MANUAL MODE */}
        <div className="hmi-mode-row">
          <span>MANUAL MODE</span>

          <button
            type="button"
            className={`hmi-mode-button ${
              manualMode ? "mode-active" : "mode-inactive"
            }`}
            onClick={handleManualMode}
            disabled={loading}
          >
            {loading ? "LOADING..." : manualMode ? "ON" : "OFF"}
          </button>
        </div>

      </div>

      <button
        type="button"
        className="hmi-mode-back"
        onClick={() => navigate("/hmi")}
      >
        ← BACK
      </button>

    </div>
  );
}

export default HMIModeSelection;