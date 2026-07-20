import { FaBell } from "react-icons/fa";

function NotificationBell() {
  return (
    <button className="relative rounded-lg p-2 hover:bg-slate-800">
      <FaBell className="text-lg text-slate-300" />

      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
        0
      </span>
    </button>
  );
}

export default NotificationBell;