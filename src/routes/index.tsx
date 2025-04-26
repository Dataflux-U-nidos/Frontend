// /src/routes/AppRoutes.tsx
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentRoutes from "./StudentRoutes"; 
import AdminRoutes from "./AdminRoutes";
import ViewerRoutes from "./ViewerRoutes";
import TutorRoutes from "./TutorRoutes";
import UniversityRoutes from "./UniversityRoutes";

import { Presentation, House, University, BriefcaseBusiness, BookOpenCheck, ChartSpline } from "lucide-react";
import { useGetMyUser } from "@/hooks/user/useGetMyUserHook";

const Landing = lazy(() => import('../components/screens/LandingScreen'))
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const Layout = lazy(() => import("../components/templates/Layout"));
const ForgotPassword = lazy(() => import("../components/screens/ForgotPasswordScreen"));
const ResetPassword = lazy(() => import("../components/screens/ResetPasswordScreen"));
const ViewerDashboard = lazy(() => import("../components/screens/ViewerDashboardScreen"));
const StudentProfileScreen = lazy(() => import("../components/screens/StudentProfileScreen"));
const AccountScreen = lazy(() => import("../components/screens/AccountScreen"));
const TutorStudentsScreen = lazy(() => import("../components/screens/TutorStudentsScreen"));
import UniversityViewersScreen from "@/components/screens/UniversityViewersScreen";
import UniversityManagersScreen from "@/components/screens/UniversityManagersScreen";



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

export const universityMenu = [
  {
    title: "Visualizadores",
    url: "/university-viewers",
    icon: Presentation,
  },
  {
    title: "Gestores de información",
    url: "/university-managers",
    icon: House,
  },
]

const currentUser = {
  name: "Laura Rojas",
  email: "laura@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export const AppRoutes = () => {
  const [userData, setUserData] = useState<any | null>(null);
    const { mutateAsync: fetchUser } = useGetMyUser();
  
  useEffect(() => {
      const loadUser = async () => {
        try {
          const user = await fetchUser();
          const userData = {
            name: user.name,
            last_name: user.last_name,
            email: user.email}
          setUserData(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      loadUser();;
    }, []);

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
            <Route path="/" element={<Layout navMain={viewerMenu} user={userData} />}>
              <Route path="/viewer-dashboard" element={<ViewerDashboard />} />
            </Route>
          </Route>

          <Route element={<StudentRoutes />}>
            <Route path="/" element={<Layout navMain={studentMenu} user={userData} />}>
            <Route path="/account" element={<AccountScreen />} />
            <Route path="/student-profile" element={<StudentProfileScreen />} />
            </Route>
          </Route>

          <Route element={<TutorRoutes />}>
            <Route path="/" element={<Layout navMain={tutorMenu} user={userData} />}>
              <Route path="tutor-students" element={<TutorStudentsScreen />} />
            </Route>
          </Route>

          <Route element={<UniversityRoutes />}>
            <Route path="/" element={<Layout navMain={universityMenu} user={currentUser} />}>
              <Route path="university-viewers" element={<UniversityViewersScreen />} />
            </Route>
            <Route path="/" element={<Layout navMain={universityMenu} user={currentUser} />}>
              <Route path="university-managers" element={<UniversityManagersScreen />} />
            </Route>
          </Route>

          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};