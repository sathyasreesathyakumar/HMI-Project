import {
  FaPlay,
  FaStop,
  FaRedoAlt
} from "react-icons/fa";

function IndustrialControls() {

  return (

    <div
      className="
      flex
      flex-col
      justify-center
      gap-6
      "
    >

      <button
        className="
        h-28
        rounded-xl
        bg-green-600
        font-bold
        "
      >

        <div className="mb-2 flex justify-center">
          <FaPlay size={30}/>
        </div>

        START

      </button>


      <button
        className="
        h-28
        rounded-xl
        bg-red-600
        font-bold
        "
      >

        <div className="mb-2 flex justify-center">
          <FaStop size={30}/>
        </div>

        STOP

      </button>


      <button
        className="
        h-28
        rounded-xl
        bg-slate-700
        font-bold
        "
      >

        <div className="mb-2 flex justify-center">
          <FaRedoAlt size={30}/>
        </div>

        RESET

      </button>

    </div>

  );
}

export default IndustrialControls;