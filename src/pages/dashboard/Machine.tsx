import MachinePanel from "../../components/machine/MachinePanel";
import MachineControls from "../../components/machine/MachineControls";
import ProductionSummary from "../../components/machine/ProductionSummary";
import ProductionChart from "../../components/charts/ProductionChart";


function Machine() {
  return (
    <div className="space-y-2 ">

      {/* Machine UI + Controls */}

      <div className="flex items-start gap-2 ">

        <div className="flex-1">
          <MachinePanel />
        </div>

        <MachineControls />

      </div>


      {/* Production Cards */}

      <ProductionSummary />


      {/* Production Chart */}

      <ProductionChart />


      {/* Alarm Panel */}

      

    </div>
  );
}

export default Machine;