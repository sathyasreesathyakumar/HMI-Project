import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readTag } from "../../services/opcService";
import "./HMIAlarm.css";

function HMIAlarm() {
  const navigate = useNavigate();

  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmCode, setAlarmCode] = useState(0);
  const [alarmMessage, setAlarmMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlarm() {
      try {
        const activeResult = await readTag("AlarmActive");
        const codeResult = await readTag("AlarmCode");
        const messageResult = await readTag("AlarmMessage");

        console.log("AlarmActive:", activeResult);
        console.log("AlarmCode:", codeResult);
        console.log("AlarmMessage:", messageResult);

        if (typeof activeResult?.value === "boolean") {
          setAlarmActive(activeResult.value);
        }

        if (typeof codeResult?.value === "number") {
          setAlarmCode(codeResult.value);
        }

        if (typeof messageResult?.value === "string") {
          setAlarmMessage(messageResult.value);
        }
      } catch (error) {
        console.error("Failed to read alarm:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAlarm();

    const interval = setInterval(loadAlarm, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hmi-alarm">

      <div className="hmi-alarm-header">
        ALARM
      </div>

      <div className="hmi-alarm-panel">

        <div className="hmi-alarm-status-row">
          <span>ALARM STATUS</span>

          <div
            className={`hmi-alarm-status ${
              alarmActive ? "alarm-active" : "alarm-clear"
            }`}
          >
            {loading
              ? "LOADING..."
              : alarmActive
                ? "ALARM ACTIVE"
                : "NO ALARM"}
          </div>
        </div>

        <div className="hmi-alarm-row">
          <span>ALARM CODE</span>

          <div className="hmi-alarm-value">
            {alarmCode}
          </div>
        </div>

        <div className="hmi-alarm-row">
          <span>ALARM MESSAGE</span>

          <div className="hmi-alarm-message">
            {alarmMessage || "—"}
          </div>
        </div>

      </div>

      <button
        type="button"
        className="hmi-alarm-back"
        onClick={() => navigate("/hmi")}
      >
        ← BACK
      </button>

    </div>
  );
}

export default HMIAlarm;