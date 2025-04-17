// /src/routes/AppRoutes.tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentRoutes from "./StudentRoutes"; // Adjust the path as needed
import AdminRoutes from "./AdminRoutes";
import ViewerRoutes from "./ViewerRoutes";

// Carga perezosa (lazy) de componentes
const Landing = lazy(() => import('../components/screens/LandingScreen'))
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const Layout = lazy(() => import("../components/templates/Layout"));
const Dashboard = lazy(() => import("../components/templates/Dashboard"));
const ViewerDashboard = lazy(() => import("../components/screens/ViewerDashboardScreen"));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Layout />}>
          {/* ITS MISSING THE SCREENS USAGE */}
            {/* <Route element={<StudentRoutes />}>
              <Route path="student-dashboard" element={<Dashboard />} />
            </Route> */}
            <Route element={<ViewerRoutes />}>
              <Route path="viewer-dashboard" element={<ViewerDashboard />} />
            </Route>
            {/* ITS MISSING THE SCREENS USAGE */}
            {/* <Route element={<AdminRoutes />}>
              <Route path="admin-dashboard" element={<Dashboard />} />
            </Route> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
