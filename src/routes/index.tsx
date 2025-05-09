import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentRoutes from "./StudentRoutes";
import AdminRoutes from "./AdminRoutes";
import ViewerRoutes from "./ViewerRoutes";
import TutorRoutes from "./TutorRoutes";
import UniversityRoutes from "./UniversityRoutes";
import AccountViewerScreen from "@/components/screens/AccountViewerScreen";
import InfoManagerRoutes from "./InfoManagerRoutes"; 
import MarketingRoutes from "./MarketingRoutes";
import FinancesRoutes from "./FinancesRoutes";

import AccountTutorScreen from "@/components/screens/AccountTutorScreen";
import AccountUniversityScreen from "@/components/screens/AccountUniversityScreen";
import AccountAdminScreen from "@/components/screens/AccountAdminScreen";
import LayoutScreen from "@/components/screens/LayoutScreen";

const TestPsicometrico = lazy(() => import("@/components/screens/TestPsicometricoScreen"));
const TestVocational = lazy(() => import("@/components/screens/TestVocationalScreen"));
const TestVocationalPartial = lazy(() => import("@/components/screens/TestVocationalPartialScreen"));
const Landing = lazy(() => import('../components/screens/LandingScreen'))
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const ForgotPassword = lazy(() => import("../components/screens/ForgotPasswordScreen"));
const ResetPassword = lazy(() => import("../components/screens/ResetPasswordScreen"));
const ViewerDashboard = lazy(() => import("../components/screens/ViewerDashboardScreen"));
const StudentProfileScreen = lazy(() => import("../components/screens/StudentProfileScreen"));
const AccountScreen = lazy(() => import("../components/screens/AccountScreen"));
const TutorStudentsScreen = lazy(() => import("../components/screens/TutorStudentsScreen"));
const UniversityViewersScreen = lazy(() => import("@/components/screens/UniversityViewersScreen"));
const UniversityManagersScreen = lazy(() => import("@/components/screens/UniversityManagersScreen"));
const AdminSupportScreen = lazy(() => import("@/components/screens/AdminSupportScreen"));
const AdminFinancesScreen = lazy(() => import("@/components/screens/AdminFinancesScreen"));
const AdminMarketingScreen = lazy(() => import("@/components/screens/AdminMarketingScreen"));
const InfoManagerMainScreen = lazy(() => import("../components/screens/InfoManagerMainScreen"));
const MarketingMainScreen = lazy(() => import("../components/screens/MarketingMainScreen"));
const FinancesIncomeScreen = lazy(() => import("../components/screens/FinancesIncomeScreen"));
const FinancesCampaingsScreen = lazy(() => import("../components/screens/FinancesCampaingsScreen"));
const StudentMajorsScreen = lazy(() => import("../components/screens/StudentMajorsScreen"));
const FinancesSubscriptionScreen = lazy(() => import("../components/screens/FinancesSubscriptionScreen"));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/student-vocationalTest-partial" element={<TestVocationalPartial />} />

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
              <Route path="/student-psychometricTest" element={<TestPsicometrico />} />
              <Route path="/student-vocationalTest" element={<TestVocational />} />
              <Route path="/student-programs" element={<StudentMajorsScreen />} />
            </Route>
          </Route>

          <Route element={<TutorRoutes />}>
            <Route element={<LayoutScreen />}>
              <Route path="/account-tutor" element={<AccountTutorScreen />} />
              <Route path="/tutor-students" element={<TutorStudentsScreen />} />
            </Route>
          </Route>

          <Route element={<UniversityRoutes />}>
            <Route element={<LayoutScreen />}>
              <Route path="/account-university" element={<AccountUniversityScreen />} />
              <Route path="/university-viewers" element={<UniversityViewersScreen />} />
              <Route path="/university-managers" element={<UniversityManagersScreen />} />
            </Route>
          </Route>

          <Route element={<InfoManagerRoutes />}>
            <Route path="/infomanager-main" element={<InfoManagerMainScreen />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route element={<LayoutScreen />}>
              <Route path="/account-admin" element={<AccountAdminScreen />} />
              <Route path="/admin-support" element={<AdminSupportScreen />} />
              <Route path="/admin-finances" element={<AdminFinancesScreen />} />
              <Route path="/admin-marketing" element={<AdminMarketingScreen />} />
            </Route>
          </Route>

          <Route element={<MarketingRoutes />}>
            <Route element={<LayoutScreen />}>
              <Route path="/marketing-main" element={<Navigate to="/marketing-university" replace />} />
              <Route path="/marketing-university" element={<MarketingMainScreen />} />
              <Route path="/marketing-scholar" element={<MarketingMainScreen />} />
            </Route>
          </Route>

          <Route element={<FinancesRoutes />}>
            <Route element={<LayoutScreen />}>
              <Route path="/finances-income" element={<FinancesIncomeScreen />} />
              <Route path="/finances-campaings" element={<FinancesCampaingsScreen />} />
              <Route path="/finances-subscriptions" element={<FinancesSubscriptionScreen />} />
            </Route>
          </Route>
          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};