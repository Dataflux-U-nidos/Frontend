// /src/routes/AppRoutes.tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentRoutes from "./StudentRoutes"; // Adjust the path as needed
import AdminRoutes from "./AdminRoutes";
import ViewerRoutes from "./ViewerRoutes";

// Carga perezosa (lazy) de componentes
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const TestCrud = lazy(() => import("../components/templates/TestCrud"));
const Layout = lazy(() => import("../components/templates/Layout"));
const Dashboard = lazy(() => import("../components/templates/Dashboard"));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Layout />}>
            <Route element={<StudentRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ViewerRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<AdminRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="/prueba" element={<TestCrud />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
