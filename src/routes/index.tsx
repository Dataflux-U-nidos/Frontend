// /src/routes/AppRoutes.tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentRoutes from "./StudentRoutes"; 
import AdminRoutes from "./AdminRoutes";
import ViewerRoutes from "./ViewerRoutes";
import { Presentation } from "lucide-react";

// Carga perezosa (lazy) de componentes
const Landing = lazy(() => import('../components/screens/LandingScreen'))
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const Layout = lazy(() => import("../components/templates/Layout"));
const Dashboard = lazy(() => import("../components/templates/DashboardTemplate"));
const ViewerDashboard = lazy(() => import("../components/screens/ViewerDashboardScreen"));

export const viewerMenu = [
  {
    title: "Dashboard",
    url: "/viewer-dashboard",
    icon: Presentation,
  },
]

const currentUser = {
  name: "Laura Rojas",
  email: "laura@example.com",
  avatar: "/avatars/shadcn.jpg",
}


export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />

          <Route element={<ViewerRoutes />}>
            <Route path="/" element={<Layout navMain={viewerMenu} user={currentUser} />}>
              <Route path="viewer-dashboard" element={<ViewerDashboard />} />
            </Route>
          </Route>

          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
