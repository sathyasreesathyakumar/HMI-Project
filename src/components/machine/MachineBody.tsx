function MachineBody() {

  const topStations = Array.from(
    { length: 12 },
    (_, index) => index + 12
  );

  const bottomStations = Array.from(
    { length: 12 },
    (_, index) => 11 - index
  );


  return (

    <div
      className="
      rounded-xl
      bg-slate-900
      border
      border-slate-700
      p-6
      "
    >

      {/* TOP STATIONS */}

      <div className="flex justify-between">

        {topStations.map((station) => (

          <div
            key={station}
            className="
            h-12
            w-4
            rounded
            bg-green-500
            "
          />

        ))}

      </div>


      {/* MACHINE */}

      <div
        className="
        my-8
        rounded-[80px]
        border-8
        border-yellow-500
        p-12
        text-center
        "
      >

        <h1
          className="
          text-4xl
          font-bold
          text-cyan-400
          "
        >
          ALL STROKE
        </h1>


        <p className="mt-4 text-green-400">
          MACHINE RUNNING
        </p>


        <p className="mt-4">
          24 STATION
        </p>


        <p>
          CAROUSEL
        </p>


      </div>


      {/* BOTTOM STATIONS */}

      <div className="flex justify-between">

        {bottomStations.map((station) => (

          <div
            key={station}
            className="
            h-12
            w-4
            rounded
            bg-green-500
            "
          />

        ))}

      </div>


    </div>

  );

}

export default MachineBody;