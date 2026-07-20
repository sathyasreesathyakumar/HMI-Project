function MachineVisualization() {

  const topStations = [
    12,13,14,15,16,17,
    18,19,20,21,22,23
  ];

  const bottomStations = [
    12,11,10,9,8,7,
    6,5,4,3,2,1
  ];


  return (

    <div className="w-[650px] mx-auto">

    <div
      className="
      rounded-xl
      border
      border-slate-700
      bg-slate-900
      p-8
      min-w-[900px]
      max-w-[1100px]
      mx-auto
      "
    >

      {/* Counter */}

      <div className="mb-8">

        <p className="text-sm text-slate-400">
          COUNTER
        </p>

        <h1 className="text-4xl font-bold text-cyan-400">
          1250
        </h1>

      </div>


      {/* TOP NUMBERS */}

      <div className="flex justify-center gap-4">

        {topStations.map((station)=>(
          <p key={station}>
            {station}
          </p>
        ))}

      </div>



      {/* TOP BLUE SQUARES */}

      <div className="mt-3 flex justify-center gap-4">

        {topStations.map((station)=>(

          <div
            key={station}
            className="
            h-7
            w-7
            rounded-md
            bg-blue-500
            "
          />

        ))}

      </div>



      {/* TOP GREEN BARS */}

      <div className="mt-3 flex justify-center gap-4 ">

        {topStations.map((station)=>(

          <div
            key={station}
            className="
            h-14
            w-5
            rounded-md
            bg-green-500
            "
          />

        ))}

      </div>




      {/* MIDDLE SECTION */}

      <div
        className="
        my-8
        flex
        items-center
        justify-between
        gap-5
        "
      >
        

        {/* LEFT INDICATORS */}

        <div className="space-y-6">

          <div className="h-8 w-14 rotate-[-20deg] rounded bg-gray-400" />

          <div className="h-8 w-14 rotate-[-20deg] rounded bg-gray-400" />

          <div className="h-8 w-14 rotate-[-20deg] rounded bg-red-500" />

        </div>



        {/* MACHINE BODY */}

        <div
          className="
          flex
          flex-col
          items-center
          rounded-[80px]
          border-[12px]
          border-yellow-400
          bg-slate-950
         px-24
        py-14
          gap-5
          "
        >

          <h1
            className="
            text-3xl
            font-bold
            text-cyan-400
            "
          >
            ALL STROKE
          </h1>


          <p className="mt-4 text-xl">
            24 STATION
          </p>

          <p className="text-lg">
            CAROUSEL
          </p>



          {/* Legend */}

          <div
            className="
            mt-8
            flex
            gap-8
            "
          >

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

          </div>

        </div>



        {/* RIGHT INDICATORS */}

        <div className="space-y-6">

          <div className="h-8 w-14 rotate-[20deg] rounded bg-gray-400" />

          <div className="h-8 w-14 rotate-[20deg] rounded bg-green-500" />

          <div className="h-8 w-14 rotate-[20deg] rounded bg-gray-400" />

        </div>


      </div>




      {/* BOTTOM GREEN BARS */}

      <div className="flex justify-center gap-4">

        {bottomStations.map((station)=>(

          <div
            key={station}
            className={`
              h-14
              w-5
              rounded-md

              ${
                station === 7
                ? "bg-gray-400"
                : "bg-green-500"
              }
            `}
          />

        ))}

      </div>



      {/* BOTTOM BLUE SQUARES */}

      <div className="mt-3 flex justify-center gap-4">

        {bottomStations.map((station)=>(

          <div
            key={station}
            className="
            h-7
            w-7
            rounded-md
            bg-blue-500
            "
          />

        ))}

      </div>




      {/* BOTTOM NUMBERS */}

      <div className="mt-3 flex justify-center gap-4">

        {bottomStations.map((station)=>(

          <p key={station}>
            {station}
          </p>

        ))}

      </div>
</div>

    </div>

  );
}

export default MachineVisualization;