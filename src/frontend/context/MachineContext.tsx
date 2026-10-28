import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type MachineContextType = {
  machineRunning: boolean;
  setMachineRunning: Dispatch<SetStateAction<boolean>>;

  resetTrigger: number;
  triggerReset: () => void;
};

const MachineContext = createContext<MachineContextType | undefined>(
  undefined
);

export function MachineProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [machineRunning, setMachineRunning] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  /*
   * ============================================
   * RESET MACHINE
   * ============================================
   *
   * 1. Stop the machine
   * 2. Increment resetTrigger
   *
   * MachinePanel listens to resetTrigger and
   * restores its local states.
   */
  const triggerReset = () => {
    setMachineRunning(false);

    setResetTrigger((previous) => previous + 1);
  };

  return (
    <MachineContext.Provider
      value={{
        machineRunning,
        setMachineRunning,
        resetTrigger,
        triggerReset,
      }}
    >
      {children}
    </MachineContext.Provider>
  );
}

export function useMachine() {
  const context = useContext(MachineContext);

  if (!context) {
    throw new Error(
      "useMachine must be used inside MachineProvider"
    );
  }

  return context;
}