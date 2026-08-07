import MachinePanel from "../../components/machine/MachinePanel";
import MachineControls from "../../components/machine/MachineControls";
import ProductionSummary from "../../components/machine/ProductionSummary";
// import ProductionChart from "../../components/charts/ProductionChart";


function Machine() {
  return (
    <div className=" scale-95 -translate-y-4 ">

      {/* Machine UI + Controls */}

      <div className="flex justify-center ">

        <div className="flex p-2 ">
          <MachinePanel />
        </div>

        <MachineControls />

      </div>


      {/* Production Cards */}

      <ProductionSummary />


      {/* Production Chart */}

      {/* <ProductionChart /> */}


      {/* Alarm Panel */}

      

    </div>
  );
}

export default Machine;