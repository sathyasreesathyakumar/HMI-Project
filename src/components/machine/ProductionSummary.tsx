function ProductionSummary() {
  return (
    <div className="grid grid-cols-3 gap-4">

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">
          Batch Production
        </p>

        <h1 className="mt-4 text-4xl font-bold text-cyan-400">
          1250
        </h1>
      </div>


      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">
          Total Production
        </p>

        <h1 className="mt-4 text-4xl font-bold text-cyan-400">
          7850
        </h1>
      </div>


      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">
          Production / Hour
        </p>

        <h1 className="mt-4 text-4xl font-bold text-cyan-400">
          450
        </h1>
      </div>

    </div>
  );
}

export default ProductionSummary;