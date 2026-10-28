import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readTag } from "../../services/opcService";
import "./HMIMachineSignals.css";

function HMIMachineSignals() {
  const navigate = useNavigate();

  const [running, setRunning] = useState(false);
  const [counter, setCounter] = useState(0);
  const [batchProduction, setBatchProduction] = useState(0);
  const [productionHour, setProductionHour] = useState(0);

  useEffect(() => {
    async function loadSignals() {
      try {
        const runningResult = await readTag("Running");
        const counterResult = await readTag("counter");
        const batchResult = await readTag("batch production");
        const productionResult = await readTag("production / hour");

        console.log("Running:", runningResult);
        console.log("Counter:", counterResult);
        console.log("Batch Production:", batchResult);
        console.log("Production / Hour:", productionResult);

        if (typeof runningResult?.value === "boolean") {
          setRunning(runningResult.value);
        }

        if (typeof counterResult?.value === "number") {
          setCounter(counterResult.value);
        }

        if (typeof batchResult?.value === "number") {
          setBatchProduction(batchResult.value);
        }

        if (typeof productionResult?.value === "number") {
          setProductionHour(productionResult.value);
        }
      } catch (error) {
        console.error("Failed to read machine signals:", error);
      }
    }

    loadSignals();

    const interval = setInterval(loadSignals, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hmi-machine-signals">

      <div className="hmi-machine-signals-header">
        MACHINE SIGNALS
      </div>

      <div className="hmi-machine-signals-panel">

        <div className="hmi-machine-signal-row">
          <span>MACHINE STATUS</span>

          <div
            className={`hmi-machine-status ${
              running ? "machine-running" : "machine-stopped"
            }`}
          >
            {running ? "RUNNING" : "STOPPED"}
          </div>
        </div>

        <div className="hmi-machine-signal-row">
          <span>COUNTER</span>

          <div className="hmi-machine-value">
            {counter}
          </div>
        </div>

        <div className="hmi-machine-signal-row">
          <span>BATCH PRODUCTION</span>

          <div className="hmi-machine-value">
            {batchProduction}
          </div>
        </div>

        <div className="hmi-machine-signal-row">
          <span>PRODUCTION / HOUR</span>

          <div className="hmi-machine-value">
            {productionHour}
          </div>
        </div>

      </div>

      <button
        type="button"
        className="hmi-machine-signals-back"
        onClick={() => navigate("/hmi")}
      >
        ← BACK
      </button>

    </div>
  );
}

export default HMIMachineSignals;