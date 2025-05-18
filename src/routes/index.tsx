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

const TestVocational = lazy(
  () => import("@/components/screens/TestVocationalScreen")
);
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

// Nuestras pantallas con animación
const StudentMajorsScreen = lazy(
  () => import("@/components/screens/StudentMajorsScreen")
);
const UniversityDetailMockScreen = lazy(
  () => import("@/components/screens/UniversityDetailMockScreen")
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
            <Route path="/account-viewer" element={<AccountViewerScreen />} />
            <Route path="/viewer-dashboard" element={<ViewerDashboard />} />
          </Route>
        </Route>

        <Route element={<StudentRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/account-student" element={<AccountScreen />} />
            <Route path="/student-profile" element={<StudentProfileScreen />} />
            <Route
              path="/student-vocationalTest"
              element={<TestVocational />}
            />
            <Route path="/student-programs" element={<StudentMajorsScreen />} />
            <Route path="/student-grades" element={<StudentGradesScreen />} />
          </Route>
        </Route>

        {/* Usando JobOpportunityRoutes para proteger la ruta de salidas laborales */}
        <Route element={<JobOpportunityRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route
              path="/student-carrerProspects"
              element={
                <MotionWrapper>
                  <StudentJobOpportunitiesScreen />
                </MotionWrapper>
              }
            />
          </Route>
        </Route>

        {/* Aquí aplicamos MotionWrapper */}
        <Route
          path="/student-programs"
          element={
            <MotionWrapper>
              <StudentMajorsScreen />
            </MotionWrapper>
          }
        />

        {/* Nueva ruta con animación */}
        <Route
          path="/universidad/:id"
          element={
            <MotionWrapper>
              <UniversityDetailMockScreen />
            </MotionWrapper>
          }
        />

        {/* Tutor */}
        <Route element={<TutorRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/account-tutor" element={<AccountTutorScreen />} />
            <Route path="/tutor-students" element={<TutorStudentsScreen />} />
          </Route>
        </Route>

        {/* University */}
        <Route element={<UniversityRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route
              path="/account-university"
              element={<AccountUniversityScreen />}
            />
            <Route
              path="/university-viewers"
              element={<UniversityViewersScreen />}
            />
            <Route
              path="/university-managers"
              element={<UniversityManagersScreen />}
            />
          </Route>
        </Route>

        {/* InfoManager */}
        <Route element={<InfoManagerRoutes />}>
          <Route path="/infomanager-main" element={<InfoManagerMainScreen />} />
        </Route>

        {/* Admin */}
        <Route element={<AdminRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/account-admin" element={<AccountAdminScreen />} />
            <Route path="/admin-support" element={<AdminSupportScreen />} />
            <Route path="/admin-finances" element={<AdminFinancesScreen />} />
            <Route path="/admin-marketing" element={<AdminMarketingScreen />} />
          </Route>
        </Route>

        {/* Marketing */}
        <Route element={<MarketingRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route
              path="/marketing-main"
              element={<Navigate to="/marketing-university" replace />}
            />
            <Route
              path="/marketing-university"
              element={<MarketingMainScreen />}
            />
            <Route
              path="/marketing-scholar"
              element={<MarketingMainScreen />}
            />
          </Route>
        </Route>

        {/* Finances */}
        <Route element={<FinancesRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/finances-income" element={<FinancesIncomeScreen />} />
            <Route
              path="/finances-campaings"
              element={<FinancesCampaingsScreen />}
            />
            <Route
              path="/finances-subscriptions"
              element={<FinancesSubscriptionScreen />}
            />
          </Route>
        </Route>
        <Route element={<SupportRoutes />}>
          <Route element={<LayoutScreen />}>
            <Route path="/support" element={<SupportScreen />} />
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
