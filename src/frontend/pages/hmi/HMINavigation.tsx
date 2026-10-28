import { useNavigate } from "react-router-dom";
import "./HMINavigation.css";

function HMINavigation() {
  const navigate = useNavigate();

  return (
    <div className="hmi-navigation">

      {/* Main HMI menu */}
      <div className="hmi-menu">

        {/* MACHINE SIGNALS */}
        <button
          className="hmi-menu-button machine-signals"
          type="button"
          onClick={() => navigate("/hmi/machine-signals")}
        >
          MACHINE SIGNALS
        </button>

        {/* SETTINGS */}
        <button
          className="hmi-menu-button settings"
          type="button"
          onClick={() => navigate("/hmi/settings")}
        >
          SETTINGS
        </button>

        {/* ALARM */}
        <button
          className="hmi-menu-button alarm"
          type="button"
          onClick={() => navigate("/hmi/alarm")}
        >
          ALARM
        </button>

        {/* HEATER */}
        <button
          className="hmi-menu-button heater"
          type="button"
          onClick={() => navigate("/hmi/heater")}
        >
          HEATER
        </button>

        {/* LEVEL SELECTION */}
        <button
          className="hmi-menu-button level-selection"
          type="button"
          onClick={() => navigate("/hmi/level-selection")}
        >
          LEVEL SELECTION
        </button>

        {/* PRINT SELECTION */}
        <button
          className="hmi-menu-button print-selection"
          type="button"
          onClick={() => navigate("/hmi/print-selection")}
        >
          PRINT SELECTION
        </button>

        {/* MODE SELECTION */}
       <button
        className="hmi-menu-button mode-selection"
        type="button"
        onClick={() => navigate("/hmi/mode-selection")}
        >
        MODE SELECTION
        </button>

      </div>
    </div>
  );
}

export default HMINavigation;