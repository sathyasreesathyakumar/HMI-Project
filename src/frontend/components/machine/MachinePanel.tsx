// import {
//   FaPlay,
//   FaStop,
//   FaRedoAlt,
// } from "react-icons/fa";
import { useEffect, useState } from "react";
import { readTag, writeTag } from "../../services/opcService";
function MachinePanel() {

  const [counter, setCounter] = useState("1250");
  const topStations = [
    12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23,
  ];

  const bottomStations = [
    12, 11, 10, 9, 8, 7,
    6, 5, 4, 3, 2, 1,
  ];

  const handleCounterKeyDown = async (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  if (e.key === "Enter") {

    const result = await writeTag(
  "counter",
  Number(counter)
);

    console.log(result);
    await loadCounter();

  }
  
};
const loadCounter = async () => {

    const result = await readTag("counter");

    if (result.status === "success") {
        setCounter(String(result.value));
    }
    else {
        console.log(result.message);
    }

};

useEffect(() => {

    loadCounter();

    // const interval = setInterval(() => {
    //     loadCounter();
    // }, 1000);

    // return () => clearInterval(interval);

}, []);

  // CLIENT HAS 13 GREEN BARS
  const topGreenBars = Array(13).fill(null);
  const bottomGreenBars = Array(13).fill(null);

  return (
  
    <div className="flex justify-center origin-top p-2 rounded-xl 
    border border-slate-700 bg-slate-900 flex-col items-center">

      {/* Counter */}

      <div className="mb-3 self-start ">
        <fieldset className="

border

border-slate-600
rounded-lg
inline-block
p-2
">
        <p className="text-sm text-slate-400">
  COUNTER
</p>

<input
  type="number"
  value={counter}
  onChange={(e) => setCounter(e.target.value)}
  onKeyDown={handleCounterKeyDown}
  className="
mt-2
w-30
rounded-lg
border-2
border-cyan-500/40
bg-slate-950

text-center
text-3xl
font-bold
text-cyan-400
outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
transition-all
"
/>

{/* <p className="mt-2 text-xs text-slate-500">
  Press Enter to update
</p> */}
</fieldset>
      </div>


      {/* TOP NUMBERS */}

      <div className="flex justify-left gap-4 text-white ">

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

      <div className="mt-0 flex justify-left  gap-4">

        {topStations.map((station) => (
          <div
            key={station}
            className="h-7 w-7 rounded-md bg-blue-500"
          />
        ))}

      </div>



      {/* TOP GREEN BARS */}

      <div className="mt-1.5 flex justify-left  gap-3">

        {topGreenBars.map((_, index) => (
          <div
            key={index}
            className="h-14 w-7 rounded-md bg-green-500"
          />
        ))}

      </div>



      {/* MACHINE SECTION */}

      <div className="mt-1.5 flex items-center justify-center gap-3">


        {/* LEFT INDICATORS */}

        <div className="space-y-5">

          <div className="h-8 w-16 rotate-[-160deg] rounded bg-gray-300" />

          <div className="h-8 w-16 rounded bg-gray-300" />

          <div className="h-8 w-16 rotate-[-20deg] rounded bg-red-500" />

        </div>



        {/* MACHINE BODY */}

        <div
          className="
          h-[150px]
          w-[550px]
          rounded-[90px]
          border-[10px]
          border-yellow-400
          flex
          flex-col
          items-center
          justify-center
          "
        >
       
          <h1 className="text-3xl font-bold text-cyan-400">
            ALL STROKE
          </h1>

          <p className="mt-0.5 text-white">
            24 STATION CAROUSEL
          </p>



          {/* LEGEND */}
 
          <div className="mt-1.5 flex gap-5 text-white">
<fieldset className="
border
h-10
border-slate-600
rounded-lg
p-2
flex gap-4 text-white
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

          <div className="h-7 w-14 rotate-[160deg] rounded bg-gray-300" />

          <div className="h-7 w-14 rounded bg-green-500" />

          <div className="h-7 w-14 rotate-[20deg] rounded bg-gray-300" />

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

      <div className="mt-1.5 flex justify-left gap-3">

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

      <div className="mt-1.5 flex justify-left  gap-4">

        {bottomStations.map((station) => (
          <div
            key={station}
            className="h-7 w-7 rounded-md bg-blue-500"
          />
        ))}

      </div>



      {/* BOTTOM NUMBERS */}

      <div className="mt-0 flex justify-left gap-4 text-white">

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