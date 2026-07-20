import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Machine from "../pages/dashboard/Machine";
import Settings from "../pages/Settings";
import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

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

          <Route
            path={ROUTES.SETTINGS}
            element={<Settings />}
          />

          <Route
            path={ROUTES.UNAUTHORIZED}
            element={<Unauthorized />}
          />
        </Route>

        {/* Catch all route */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;