import LiveClock from "../common/LiveClock";
import NotificationBell from "../common/NotificationBell";
// import StatusBadge from "../common/StatusBadge";
import { useMachine } from "../../context/MachineContext";
function Header() {
  const { machineRunning } = useMachine();
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-700 bg-slate-900 px-5">

      {/* Left */}

      <div>
        <h2 className="text-lg font-semibold text-white">
          HOME / MACHINE
        </h2>
      </div>

      {/* Center */}

      <div
  className={`rounded-full px-4 py-2 font-semibold text-white ${
    machineRunning
      ? "bg-green-600"
      : "bg-slate-600"
  }`}
>
  {machineRunning ? "• MACHINE RUNNING" : "• MACHINE STOPPED"}
</div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <NotificationBell />

        <div className="text-right">
          <p className="text-sm font-medium text-white">
            Operator
          </p>

          <p className="text-xs text-slate-400">
            Shift A
          </p>
        </div>

        <LiveClock />

      </div>

    </header>
  );
}

export default Header;