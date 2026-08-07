import {
  FaPlay,
  FaStop,
  FaRedoAlt,
} from "react-icons/fa";
import {
    startMachine,
    stopMachine
} from "../../services/opcService";

function MachineControls() {
  const handleStart = async () => {
    const result = await startMachine();
    console.log(result);
};

const handleStop = async () => {
    const result = await stopMachine();
    console.log(result);
};
  return (
   
  <div className="  scale-90 p-2">
    <div className="flex flex-col ">
<fieldset  className="mt-10
border
w-5
border-slate-600
rounded-lg
p-2
">
      {/* START */}

      <button
      onClick={handleStart}
        className="
        w-24
        h-25
        rounded-lg
        bg-green-600
        hover:bg-green-700
        shadow-lg
        flex
        flex-col
        items-center
        justify-center
        transition-all
        duration-200
        
        "
      >
        <FaPlay size={28} />

        <p className="mt-3 text-sm font-bold text-white">
          START
        </p>
      </button>
        <br />


      {/* STOP */}

      <button
       onClick={handleStop}
        className="
        w-24
        h-25
        rounded-lg
        bg-red-600
        hover:bg-red-700
        shadow-lg
        flex
        flex-col
        items-center
        justify-center
        transition-all
        duration-200
        "
      >
        <FaStop size={28} />

        <p className="mt-3 text-sm font-bold text-white">
          STOP
        </p>
      </button>
    <br />


      {/* RESET */}

      <button
        className="
        w-24
        h-25
        rounded-lg
        bg-slate-700
        hover:bg-slate-800
        shadow-lg
        flex
        flex-col
        items-center
        justify-center
        transition-all
        duration-200
        "
      >
        <FaRedoAlt size={28} />

        <p className="mt-3 text-sm font-bold text-white">
          RESET
        </p>
      </button>
</fieldset>
    </div>
    </div>
    // </div>
  );
}

export default MachineControls;