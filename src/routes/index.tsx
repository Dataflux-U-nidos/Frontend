// /src/routes/AppRoutes.tsx
import React, { lazy, Suspense } from "react";
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
          {/* Redirige la raíz a /login */}
          <Route path="/" element={<Navigate to="/auth" />} />

          {/* Ruta login */}
          <Route path="/auth" element={<Auth />} />

          {/* Rutas con Layout */}
          <Route path="/" element={<Layout />}>
            {/* Rutas para estudiantes */}
            <Route element={<StudentRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            {/* Rutas para visualizadores */}
            <Route element={<ViewerRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            {/* Rutas para admin */}
            <Route element={<AdminRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          {/* Ruta de prueba */}
          <Route path="/prueba" element={<TestCrud />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
