// /src/routes/AppRoutes.tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentRoutes from "./StudentRoutes"; 
import AdminRoutes from "./AdminRoutes";
import ViewerRoutes from "./ViewerRoutes";
import TutorRoutes from "./TutorRoutes";
import { Presentation, House, University, BriefcaseBusiness, BookOpenCheck, ChartSpline } from "lucide-react";

// Carga perezosa (lazy) de componentes
const Landing = lazy(() => import('../components/screens/LandingScreen'))
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const Layout = lazy(() => import("../components/templates/Layout"));
const ForgotPassword = lazy(() => import("../components/screens/ForgotPasswordScreen"));
const ResetPassword = lazy(() => import("../components/screens/ResetPasswordScreen"));
const ViewerDashboard = lazy(() => import("../components/screens/ViewerDashboardScreen"));
const StudentProfileScreen = lazy(() => import("../components/screens/StudentProfileScreen"));
const AccountScreen = lazy(() => import("../components/screens/AccountScreen"));
const TutorStudentsScreen = lazy(() => import("../components/screens/TutorStudentsScreen"));

export const viewerMenu = [
  {
    title: "Dashboard",
    url: "/viewer-dashboard",
    icon: Presentation,
  },
]

export const studentMenu = [
  {
    title: "Programas",
    url: "/student-programs",
    icon: House,
  },
  {
    title: "Universidades",
    url: "/student-universities",
    icon: University,
  },
  {
    title: "Test vocacional",
    url: "/student-vocationalTest",
    icon: BookOpenCheck,
  },
  {
    title: "Test psicométrico",
    url: "/student-psychometricTest",
    icon: BookOpenCheck,
  },
  {
    title: "Proyección en el mercado laboral",
    url: "/student-carrerProspects",
    icon: ChartSpline,
  },
]

export const tutorMenu = [
  {
    title: "Estudiantes",
    url: "/tutor-students",
    icon: University,
  }
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<ViewerRoutes />}>
            <Route path="/" element={<Layout navMain={viewerMenu} user={currentUser} />}>
              <Route path="/viewer-dashboard" element={<ViewerDashboard />} />
            </Route>
          </Route>

          <Route element={<StudentRoutes />}>
            <Route path="/" element={<Layout navMain={studentMenu} user={currentUser} />}>
            <Route path="/account" element={<AccountScreen />} />
            <Route path="/student-profile" element={<StudentProfileScreen />} />
            </Route>
          </Route>

          <Route element={<TutorRoutes />}>
            <Route path="/" element={<Layout navMain={tutorMenu} user={currentUser} />}>
              <Route path="tutor-students" element={<TutorStudentsScreen />} />
            </Route>
          </Route>

          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};