import MachinePanel from "../../components/machine/MachinePanel";
import MachineControls from "../../components/machine/MachineControls";
import ProductionSummary from "../../components/machine/ProductionSummary";
import { useMachine } from "../../context/MachineContext";

function Machine() {
  const { setMachineRunning } = useMachine();

  return (
    <div className="scale-95 -translate-y-4">

      {/* ========================================= */}
      {/* MACHINE UI + CONTROLS                     */}
      {/* ========================================= */}

      <div className="flex justify-center">

        <div className="flex p-2">
          <MachinePanel />
        </div>

        <MachineControls
          
        />

      </div>

      {/* ========================================= */}
      {/* PRODUCTION CARDS                          */}
      {/* ========================================= */}

      <ProductionSummary />

      {/* ========================================= */}
      {/* PRODUCTION CHART                          */}
      {/* ========================================= */}

      {/* <ProductionChart /> */}

      {/* ========================================= */}
      {/* ALARM PANEL                               */}
      {/* ========================================= */}

    </div>
  );
}

export default Machine;
