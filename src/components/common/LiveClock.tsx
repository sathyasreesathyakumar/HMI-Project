import { useEffect, useState } from "react";

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-right">
      <p className="text-sm font-medium text-slate-200">
        {time.toLocaleTimeString()}
      </p>

      <p className="text-xs text-slate-400">
        {time.toLocaleDateString()}
      </p>
    </div>
  );
}

export default LiveClock;