import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Machine from "../pages/dashboard/Machine";
// import Settings from "./frontend/pages/Settings";
import Unauthorized from "../pages/Unauthorized";
// import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

import HMINavigation from "../pages/hmi/HMINavigation";
import HMIMachineSignals from "../pages/hmi/HMIMachineSignals";
import HMIModeSelection from "../pages/hmi/HMIModeSelection";
import HMIPrintSelection from "../pages/hmi/HMIPrintSelection";
import HMILevelSelection from "../pages/hmi/HMILevelSelection";
import HMIAlarm from "../pages/hmi/HMIAlarm";
import HMIHeater from "../pages/hmi/HMIHeater";
import HMISettings from "../pages/hmi/HMISettings";

import { ROUTES } from "../constants/routes";



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route
          path={ROUTES.LOGIN}
          element={<Login />}
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path={ROUTES.MACHINE}
            element={<Machine />}
          />
          

          {/* <Route
            path={ROUTES.SETTINGS}
            element={<Settings />}
          /> */}

          <Route
            path={ROUTES.UNAUTHORIZED}
            element={<Unauthorized />}
          />
        </Route>
        <Route
            path="/hmi"
            element={<HMINavigation />}
          />
          <Route
            path="/hmi/machine-signals"
            element={<HMIMachineSignals />}
          />
          <Route
            path="/hmi/mode-selection"
            element={<HMIModeSelection />}
          />
          <Route
            path="/hmi/print-selection"
            element={<HMIPrintSelection />}
          />
          <Route
            path="/hmi/level-selection"
            element={<HMILevelSelection />}
             />
           <Route
            path="/hmi/alarm"
            element={<HMIAlarm />}
          />

           <Route
            path="/hmi/heater"
            element={<HMIHeater />}
          />

          <Route
            path="/hmi/settings"
            element={<HMISettings />}
          />

        {/* Catch all route
        <Route
          path="*"
          element={<NotFound />}
        /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;