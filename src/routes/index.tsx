// /src/routes/AppRoutes.tsx
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentRoutes from "./StudentRoutes"; 
import AdminRoutes from "./AdminRoutes";
import ViewerRoutes from "./ViewerRoutes";
import TutorRoutes from "./TutorRoutes";
import UniversityRoutes from "./UniversityRoutes";
import AccountViewerScreen from "@/components/screens/AccountViewerScreen";

import { Presentation, House, University, BookOpenCheck, ChartSpline } from "lucide-react";
import { useGetMyUser } from "@/hooks/user/useGetMyUserHook";
import AccountTutorScreen from "@/components/screens/AccountTutorScreen";
import AccountUniversityScreen from "@/components/screens/AccountUniversityScreen";
import AccountAdminScreen from "@/components/screens/AccountAdminScreen";


const Landing = lazy(() => import('../components/screens/LandingScreen'))
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const Layout = lazy(() => import("../components/templates/Layout"));
const ForgotPassword = lazy(() => import("../components/screens/ForgotPasswordScreen"));
const ResetPassword = lazy(() => import("../components/screens/ResetPasswordScreen"));
const ViewerDashboard = lazy(() => import("../components/screens/ViewerDashboardScreen"));
const StudentProfileScreen = lazy(() => import("../components/screens/StudentProfileScreen"));
const AccountScreen = lazy(() => import("../components/screens/AccountScreen"));
const TutorStudentsScreen = lazy(() => import("../components/screens/TutorStudentsScreen"));
const UniversityViewersScreen = lazy (() => import("@/components/screens/UniversityViewersScreen"));
const UniversityManagersScreen = lazy (() => import("@/components/screens/UniversityManagersScreen"));
const AdminSupportScreen = lazy (() => import("@/components/screens/AdminSupportScreen"));
const AdminFinancesScreen = lazy (() => import("@/components/screens/AdminFinancesScreen"));
const AdminMarketingScreen = lazy (() => import("@/components/screens/AdminMarketingScreen"));




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

export const adminMenu = [
  {
    title: "Soporte",
    url: "/admin-support",
    icon: University,
  },
  {
    title: "Finanzas",
    url: "/admin-finances",
    icon: BookOpenCheck,
  },
  {
    title: "Marketing",
    url: "/admin-marketing",
    icon: ChartSpline,
  },
]
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
            email: user.email,
            userType: user.userType}
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
            <Route element={<Layout navMain={viewerMenu} user={userData} />}>
              <Route path="/account-viewer" element={<AccountViewerScreen />} />
              <Route path="/viewer-dashboard" element={<ViewerDashboard />} />
            </Route>
          </Route>

          <Route element={<StudentRoutes />}>
            <Route element={<Layout navMain={studentMenu} user={userData} />}>
            <Route path="/account-student" element={<AccountScreen />} />
            <Route path="/student-profile" element={<StudentProfileScreen />} />
            </Route>
          </Route>

          <Route element={<TutorRoutes />}>
            <Route element={<Layout navMain={tutorMenu} user={userData} />}>
              <Route path="/account-tutor" element={<AccountTutorScreen />} />
              <Route path="/tutor-students" element={<TutorStudentsScreen />} />
            </Route>
          </Route>

          <Route element={<UniversityRoutes />}>
            <Route element={<Layout navMain={universityMenu} user={userData} />}>
              <Route path="/account-university" element={<AccountUniversityScreen />} />
              <Route path="/university-viewers" element={<UniversityViewersScreen />} />
              <Route path="/university-managers" element={<UniversityManagersScreen />} />
            </Route>
          </Route>

          <Route element={<AdminRoutes />}>
            <Route element={<Layout navMain={adminMenu} user={userData} />}>
              <Route path="/account-admin" element={<AccountAdminScreen />} />
              <Route path="/admin-support" element={<AdminSupportScreen />} />
              <Route path="/admin-finances" element={<AdminFinancesScreen />} />
              <Route path="admin-marketing" element={<AdminMarketingScreen />} />
            </Route>
          </Route>
          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};