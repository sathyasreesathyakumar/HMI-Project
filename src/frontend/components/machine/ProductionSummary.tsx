import { useEffect, useState } from "react";
import { readTag } from "../../services/opcService";

function ProductionSummary() {

  const [batchProduction, setBatchProduction] = useState(0);
  const [totalProduction, setTotalProduction] = useState(0);
  const [productionPerHour, setProductionPerHour] = useState(0);

  const loadBatchProduction = async () => {
    
    const result = await readTag("batch production");
    // console.log("Batch:", result);
    if (result.status === "success") {
      setBatchProduction(result.value);
    } else {
      console.log(result.message);
    }

  };

 useEffect(() => {
    loadBatchProduction();

    const interval = setInterval(() => {
        loadBatchProduction();
    }, 1000);

    return () => clearInterval(interval);
}, []);

const loadTotalProduction = async () => {
    
    const result = await readTag("total production");
    // console.log("Total:", result);
    if (result.status === "success") {
      setTotalProduction(result.value);
    } else {
      console.log(result.message);
    }

  };

 useEffect(() => {
    loadTotalProduction();

    const interval = setInterval(() => {
        loadTotalProduction();
    }, 1000);

    return () => clearInterval(interval);
}, []);


const loadProductionPerHour = async () => {
    
    const result = await readTag("production / hour");
    // console.log("Production per hour:", result);
    if (result.status === "success") {
      setProductionPerHour(result.value);
    } else {
      console.log(result.message);
    }

  };

 useEffect(() => {
    loadProductionPerHour();

    const interval = setInterval(() => {
        loadProductionPerHour();
    }, 1000);

    return () => clearInterval(interval);
}, []);

  return (
    <div className="grid grid-cols-3 gap-3   ">

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">
          Batch Production
        </p>

        <h1 className="mt-1 text-4xl font-bold text-cyan-400">
          {batchProduction}
        </h1>
      </div>


      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">
          Total Production
        </p>

        <h1 className="mt-1 text-4xl font-bold text-cyan-400">
          {totalProduction}
        </h1>
      </div>


      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">
          Production / Hour
        </p>

        <h1 className="mt-1 text-4xl font-bold text-cyan-400">
          {productionPerHour}
        </h1>
      </div>

    </div>
  );
}

export default ProductionSummary;