// src/routes/index.tsx (updated)
import React, { lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import StudentRoutes from "./StudentRoutes";
import AdminRoutes from "./AdminRoutes";
import ViewerRoutes from "./ViewerRoutes";
import TutorRoutes from "./TutorRoutes";
import UniversityRoutes from "./UniversityRoutes";
import JobOpportunityRoutes from "./JobOppotunityRoutes";
import InfoManagerRoutes from "./InfoManagerRoutes";
import MarketingRoutes from "./MarketingRoutes";
import FinancesRoutes from "./FinancesRoutes";
import SupportRoutes from "./SupportRoutes";

// Screens que no animamos
import AccountViewerScreen from "@/components/screens/AccountViewerScreen";
import AccountTutorScreen from "@/components/screens/AccountTutorScreen";
import AccountUniversityScreen from "@/components/screens/AccountUniversityScreen";
import AccountAdminScreen from "@/components/screens/AccountAdminScreen";
import LayoutScreen from "@/components/screens/LayoutScreen";
import CuestionaryScreen from "@/components/screens/CuestionaryScreen";

const TestVocational = lazy(
  () => import("@/components/screens/TestVocationalScreen")
);
const TestSatisfaction = lazy(() => import("@/components/screens/TestSatisfactionScreen"));
const Landing = lazy(() => import("../components/screens/LandingScreen"));
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const ForgotPassword = lazy(
  () => import("../components/screens/ForgotPasswordScreen")
);
const ResetPassword = lazy(
  () => import("../components/screens/ResetPasswordScreen")
);
const ViewerDashboard = lazy(
  () => import("../components/screens/ViewerDashboardScreen")
);
const StudentProfileScreen = lazy(
  () => import("../components/screens/StudentProfileScreen")
);
const AccountScreen = lazy(() => import("../components/screens/AccountScreen"));
const TutorStudentsScreen = lazy(
  () => import("../components/screens/TutorStudentsScreen")
);
const UniversityViewersScreen = lazy(
  () => import("@/components/screens/UniversityViewersScreen")
);
const UniversityManagersScreen = lazy(
  () => import("@/components/screens/UniversityManagersScreen")
);
const AdminSupportScreen = lazy(
  () => import("@/components/screens/AdminSupportScreen")
);
const AdminFinancesScreen = lazy(
  () => import("@/components/screens/AdminFinancesScreen")
);
const AdminMarketingScreen = lazy(
  () => import("@/components/screens/AdminMarketingScreen")
);
const AdminDashboardScreen = lazy(
  () => import("@/components/screens/AdminDashboardScreen")
);
const InfoManagerMainScreen = lazy(
  () => import("../components/screens/InfoManagerMainScreen")
);
const MarketingMainScreen = lazy(
  () => import("../components/screens/MarketingMainScreen")
);
const FinancesIncomeScreen = lazy(
  () => import("../components/screens/FinancesIncomeScreen")
);
const FinancesCampaingsScreen = lazy(
  () => import("../components/screens/FinancesCampaingsScreen")
);
const StudentGradesScreen = lazy(
  () => import("../components/screens/StudentGradesScreen")
);
const FinancesSubscriptionScreen = lazy(
  () => import("../components/screens/FinancesSubscriptionScreen")
);
const StudentJobOpportunitiesScreen = lazy(
  () => import("../components/screens/StudentJobOpportunitiesScreen")
);
const SupportScreen = lazy(
  () => import("../components/screens/SupportMainScreen")
);
const AdminJobOpportunities = lazy(
  () => import("../components/screens/AdminManageJobOpScreen")
);
// Pantallas con animación - Existentes
const StudentMajorsScreen = lazy(
  () => import("@/components/screens/StudentMajorsScreen")
);
const UniversityDetailMockScreen = lazy(
  () => import("@/components/screens/UniversityDetailMockScreen")
);

// *** NUEVA PANTALLA PARA UNIVERSIDADES ***
const StudentUniversitiesScreen = lazy(
  () => import("@/components/screens/StudentUniversitiesScreen")
);

// Wrapper que aplica la animación de entrada/salida
const MotionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

// Componente interno que usa useLocation() dentro del BrowserRouter
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Viewer */}
        <Route element={<ViewerRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/account-viewer" element={<MotionWrapper><AccountViewerScreen /></MotionWrapper>} />
            <Route path="/viewer-dashboard" element={<MotionWrapper><ViewerDashboard /></MotionWrapper>} />
          </Route>
        </Route>

        {/* Student Routes */}
        <Route element={<StudentRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/account-student" element={<MotionWrapper><AccountScreen /></MotionWrapper>} />
            <Route path="/student-profile" element={<MotionWrapper><StudentProfileScreen /></MotionWrapper>} />
            <Route path="/student-vocationalTest" element={<MotionWrapper><TestVocational /></MotionWrapper>} />
            <Route path="/student-grades" element={<MotionWrapper><StudentGradesScreen /></MotionWrapper>} />
            <Route path="/student-survey" element={<CuestionaryScreen />} />
            <Route path="/student-satisfaction" element={<TestSatisfaction />} />

            {/* Rutas con animación para estudiantes */}
            <Route path="/student-programs" element={<MotionWrapper><StudentMajorsScreen /></MotionWrapper>} />

            {/* NUEVA RUTA PARA UNIVERSIDADES */}
            <Route path="/student-universities" element={<MotionWrapper><StudentUniversitiesScreen /></MotionWrapper>} />

            {/* Detalle universidad */}
            <Route path="/university/:id" element={<MotionWrapper><UniversityDetailMockScreen /></MotionWrapper>} />
          </Route>
        </Route>

        {/* Job Opportunities */}
        <Route element={<JobOpportunityRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/student-carrerProspects" element={<MotionWrapper><StudentJobOpportunitiesScreen /></MotionWrapper>} />
          </Route>
        </Route>

        {/* Tutor */}
        <Route element={<TutorRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/account-tutor" element={<MotionWrapper><AccountTutorScreen /></MotionWrapper>} />
            <Route path="/tutor-students" element={<MotionWrapper><TutorStudentsScreen /></MotionWrapper>} />
          </Route>
        </Route>

        {/* University */}
        <Route element={<UniversityRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/account-university" element={<MotionWrapper><AccountUniversityScreen /></MotionWrapper>} />
            <Route path="/university-viewers" element={<MotionWrapper><UniversityViewersScreen /></MotionWrapper>} />
            <Route path="/university-managers" element={<MotionWrapper><UniversityManagersScreen /></MotionWrapper>} />
          </Route>
        </Route>

        {/* InfoManager */}
        <Route element={<InfoManagerRoutes />}>
          <Route path="/infomanager-main" element={<MotionWrapper><InfoManagerMainScreen /></MotionWrapper>} />
        </Route>

        {/* Admin */}
        <Route element={<AdminRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/account-admin" element={<MotionWrapper><AccountAdminScreen /></MotionWrapper>} />
            <Route path="/admin-support" element={<MotionWrapper><AdminSupportScreen /></MotionWrapper>} />
            <Route path="/admin-finances" element={<MotionWrapper><AdminFinancesScreen /></MotionWrapper>} />
            <Route path="/admin-marketing" element={<MotionWrapper><AdminMarketingScreen /></MotionWrapper>} />
            <Route path="/admin-job-opportunities" element={<MotionWrapper><AdminJobOpportunities /></MotionWrapper>} />
            <Route path="/admin-dashboard" element={<MotionWrapper><AdminDashboardScreen /></MotionWrapper>} />
          </Route>
        </Route>

        {/* Marketing */}
        <Route element={<MarketingRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/marketing-main" element={<Navigate to="/marketing-university" replace />} />
            <Route path="/marketing-university" element={<MotionWrapper><MarketingMainScreen /></MotionWrapper>} />
            <Route path="/marketing-scholar" element={<MotionWrapper><MarketingMainScreen /></MotionWrapper>} />
          </Route>
        </Route>

        {/* Finances */}
        <Route element={<FinancesRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/finances-income" element={<FinancesIncomeScreen />} />
            <Route path="/finances-campaings" element={<FinancesCampaingsScreen />} />
            <Route path="/finances-subscriptions" element={<FinancesSubscriptionScreen />} />
          </Route>
        </Route>

        {/* Support */}
        <Route element={<SupportRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/support" element={<MotionWrapper><SupportScreen /></MotionWrapper>} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export const AppRoutes = () => (
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
);