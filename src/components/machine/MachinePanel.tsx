// import {
//   FaPlay,
//   FaStop,
//   FaRedoAlt,
// } from "react-icons/fa";

function MachinePanel() {
  const topStations = [
    12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23,
  ];

  const bottomStations = [
    12, 11, 10, 9, 8, 7,
    6, 5, 4, 3, 2, 1,
  ];

  // CLIENT HAS 13 GREEN BARS
  const topGreenBars = Array(13).fill(null);
  const bottomGreenBars = Array(13).fill(null);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 flex flex-col items-center">

      {/* Counter */}

      <div className="mb-4 ">
        <fieldset className="
relative
left-[-550px]
border
w-10
border-slate-600
rounded-lg
inline-block
p-3
">
        <p className="text-sm text-slate-400">
          COUNTER
        </p>

        <h1 className="text-5xl font-bold text-cyan-400">
          1250
        </h1></fieldset>
      </div>


      {/* TOP NUMBERS */}

      <div className="flex justify-left px-90 gap-4 text-white">

        {topStations.map((station) => (
          <div
            key={station}
            className="w-7 text-center font-semibold"
          >
            {station}
          </div>
        ))}

      </div>



      {/* TOP BLUE SQUARES */}

      <div className="mt-1 flex justify-left px-90 gap-4">

        {topStations.map((station) => (
          <div
            key={station}
            className="h-7 w-7 rounded-md bg-blue-500"
          />
        ))}

      </div>



      {/* TOP GREEN BARS */}

      <div className="mt-2 flex justify-left px-90 gap-3">

        {topGreenBars.map((_, index) => (
          <div
            key={index}
            className="h-14 w-7 rounded-md bg-green-500"
          />
        ))}

      </div>



      {/* MACHINE SECTION */}

      <div className="mt-2 flex items-center justify-center gap-3">


        {/* LEFT INDICATORS */}

        <div className="space-y-5">

          <div className="h-8 w-16 rotate-[-160deg] rounded bg-gray-300" />

          <div className="h-8 w-16 rounded bg-gray-300" />

          <div className="h-8 w-16 rotate-[-20deg] rounded bg-red-500" />

        </div>



        {/* MACHINE BODY */}

        <div
          className="
          h-[180px]
          w-[700px]
          rounded-[90px]
          border-[10px]
          border-yellow-400
          flex
          flex-col
          items-center
          justify-center
          "
        >
       
          <h1 className="text-4xl font-bold text-cyan-400">
            ALL STROKE
          </h1>

          <p className="mt-2 text-white">
            24 STATION CAROUSEL
          </p>



          {/* LEGEND */}
 
          <div className="mt-5 flex gap-8 text-white">
<fieldset className="
border
h-10
border-slate-600
rounded-lg
p-3
flex gap-8 text-white
">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-green-500" />
              Running
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-400" />
              Idle
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-red-500" />
              Fault
            </div>
</fieldset>
          </div>

        </div>



        {/* RIGHT INDICATORS */}

        <div className="space-y-4">

          <div className="h-8 w-16 rotate-[160deg] rounded bg-gray-300" />

          <div className="h-8 w-16 rounded bg-green-500" />

          <div className="h-8 w-16 rotate-[20deg] rounded bg-gray-300" />

        </div>



        {/* CONTROLS */}

        {/* <div className="flex flex-col gap-5">

          <button className="h-20 w-24 rounded-lg bg-green-600 shadow-lg">
            <div className="flex flex-col items-center gap-1">
              <FaPlay />
              START
            </div>
          </button>

          <button className="h-20 w-24 rounded-lg bg-red-600 shadow-lg">
            <div className="flex flex-col items-center gap-1">
              <FaStop />
              STOP
            </div>
          </button>

          <button className="h-20 w-24 rounded-lg bg-slate-700 shadow-lg">
            <div className="flex flex-col items-center gap-1">
              <FaRedoAlt />
              RESET
            </div>
          </button>

        </div> */}

      </div>



      {/* BOTTOM GREEN BARS */}

      <div className="mt-3 flex justify-left px-90 gap-3">

        {bottomGreenBars.map((_, index) => (

          <div
            key={index}
            className={`h-14 w-7 rounded-md ${
              index === 6
                ? "bg-gray-400"
                : "bg-green-500"
            }`}
          />

        ))}

      </div>



      {/* BOTTOM BLUE SQUARES */}

      <div className="mt-2 flex justify-left px-90 gap-4">

        {bottomStations.map((station) => (
          <div
            key={station}
            className="h-7 w-7 rounded-md bg-blue-500"
          />
        ))}

      </div>



      {/* BOTTOM NUMBERS */}

      <div className="mt-1 flex justify-left px-90 gap-4 text-white">

        {bottomStations.map((station) => (
          <div
            key={station}
            className="w-7 text-center font-semibold"
          >
            {station}
          </div>
        ))}

      </div>

    </div>
  );
}

export default MachinePanel;