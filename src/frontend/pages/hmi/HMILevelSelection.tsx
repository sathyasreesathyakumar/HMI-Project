import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readTag, writeTag } from "../../services/opcService";
import "./HMILevelSelection.css";

function HMILevelSelection() {
  const navigate = useNavigate();

  const [levelEnabled, setLevelEnabled] = useState(false);

 
  const [delayInput, setDelayInput] = useState("0");

 
  const [headInput, setHeadInput] = useState("0");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadValues() {
      try {
        const [levelResult, delayResult, headResult] =
          await Promise.all([
            readTag("xLevel"),
            readTag("LevelSequenceDelay"),
            readTag("HeadSelection"),
          ]);

        console.log("xLevel:", levelResult);
        console.log("LevelSequenceDelay:", delayResult);
        console.log("HeadSelection:", headResult);

        if (typeof levelResult?.value === "boolean") {
          setLevelEnabled(levelResult.value);
        }

        if (typeof delayResult?.value === "number") {
  setDelayInput(String(delayResult.value));
}

if (typeof headResult?.value === "number") {
  setHeadInput(String(headResult.value));
}
      } catch (error) {
        console.error("Failed to load level settings:", error);
      } finally {
        setLoading(false);
      }
    }

    loadValues();
  }, []);

  // -----------------------------
  // LEVEL ON / OFF
  // -----------------------------
  async function handleLevelToggle() {
    const newValue = !levelEnabled;

    try {
      const result = await writeTag("xLevel", newValue);

      console.log("xLevel write:", result);

      if (result?.status === "success") {
        setLevelEnabled(newValue);
      }
    } catch (error) {
      console.error("Failed to write xLevel:", error);
    }
  }

  // -----------------------------
  // SAVE SEQUENCE DELAY
  // -----------------------------
  async function handleDelaySave() {
    const value = Number(delayInput);

    if (!Number.isFinite(value) || value < 0) {
      alert("Please enter a valid delay value.");
      return;
    }

    try {
      const result = await writeTag(
        "LevelSequenceDelay",
        value
      );

      console.log("LevelSequenceDelay write:", result);

      if (result?.status === "success") {
        setDelayInput(String(value));
      }
    } catch (error) {
      console.error(
        "Failed to write LevelSequenceDelay:",
        error
      );
    }
  }

  // -----------------------------
  // SAVE HEAD SELECTION
  // -----------------------------
  async function handleHeadSave() {
    const value = Number(headInput);

    if (!Number.isInteger(value) || value < 0) {
      alert("Please enter a valid head number.");
      return;
    }

    try {
      const result = await writeTag(
        "HeadSelection",
        value
      );

      console.log("HeadSelection write:", result);

      if (result?.status === "success") {
        setHeadInput(String(value));
      }
    } catch (error) {
      console.error(
        "Failed to write HeadSelection:",
        error
      );
    }
  }

  return (
    <div className="hmi-level-selection">

      <div className="hmi-level-header">
        LEVEL SELECTION
      </div>

      <div className="hmi-level-panel">

        {/* LEVEL */}
        <div className="hmi-level-row">
          <span>LEVEL</span>

          <button
            type="button"
            className={`hmi-level-button ${
              levelEnabled
                ? "level-enabled"
                : "level-disabled"
            }`}
            onClick={handleLevelToggle}
            disabled={loading}
          >
            {loading
              ? "LOADING..."
              : levelEnabled
                ? "ON"
                : "OFF"}
          </button>
        </div>

        {/* LEVEL SEQUENCE DELAY */}
        <div className="hmi-level-row">
          <span>LEVEL SEQUENCE DELAY</span>

          <div className="hmi-level-edit">
            <input
              type="number"
              min="0"
              value={delayInput}
              onChange={(e) =>
                setDelayInput(e.target.value)
              }
            />

            <button
              type="button"
              onClick={handleDelaySave}
            >
              SAVE
            </button>
          </div>
        </div>

        {/* HEAD SELECTION */}
        <div className="hmi-level-row">
          <span>HEAD SELECTION</span>

          <div className="hmi-level-edit">
            <input
              type="number"
              min="0"
              step="1"
              value={headInput}
              onChange={(e) =>
                setHeadInput(e.target.value)
              }
            />

            <button
              type="button"
              onClick={handleHeadSave}
            >
              SAVE
            </button>
          </div>
        </div>

      </div>

      <button
        type="button"
        className="hmi-level-back"
        onClick={() => navigate("/hmi")}
      >
        ← BACK
      </button>

    </div>
  );
}

export default HMILevelSelection;