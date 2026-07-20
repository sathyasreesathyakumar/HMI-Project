import {
  FaPlay,
  FaStop,
  FaRedoAlt,
} from "react-icons/fa";

function MachineControls() {
  return (
    <div className="flex flex-col  gap-5">
<fieldset  className="mt-20
border
w-10
border-slate-600
rounded-lg
p-3
">
      {/* START */}

      <button
        className="
        w-24
        h-28
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

        <p className="mt-2 text-sm font-bold text-white">
          START
        </p>
      </button>
        <br />


      {/* STOP */}

      <button
        className="
        w-24
        h-28
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

        <p className="mt-2 text-sm font-bold text-white">
          STOP
        </p>
      </button>
    <br />


      {/* RESET */}

      <button
        className="
        w-24
        h-28
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

        <p className="mt-2 text-sm font-bold text-white">
          RESET
        </p>
      </button>
</fieldset>
    </div>
  );
}

export default MachineControls;