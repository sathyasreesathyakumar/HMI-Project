import AppRouter from "./frontend/routes/AppRouter.tsx";
import { MachineProvider } from "./frontend/context/MachineContext";

function App() {
  return (
    <MachineProvider>
      <AppRouter />
    </MachineProvider>
  );
}

export default App;