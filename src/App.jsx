import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import QuoteModal from '@/components/modals/QuoteModal'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import HowItWorksPage from '@/pages/HowItWorksPage'
import SourcingPage from '@/pages/SourcingPage'
import QualityCompliancePage from '@/pages/QualityCompliancePage'
import LogisticsHandlingPage from '@/pages/LogisticsHandlingPage'
import LogisticsCompliancePage from '@/pages/LogisticsCompliancePage'
import CatalogPage from '@/pages/CatalogPage'
import RequestQuotePage from '@/pages/RequestQuotePage'
import FaqPage from '@/pages/FaqPage'
import InsightsPage from '@/pages/InsightsPage'
import InsightPostPage from '@/pages/InsightPostPage'
import PrivacyPage from '@/pages/PrivacyPage'
import ScrollToHash from '@/components/routing/ScrollToHash'
import AdminGuard from '@/components/admin/AdminGuard'
import AdminShell from '@/components/admin/AdminShell'
import PermissionGate from '@/components/admin/PermissionGate'
import AdminLoginPage from '@/pages/admin/AdminLoginPage'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage'
import AdminOrderDetailPage from '@/pages/admin/AdminOrderDetailPage'
import AdminProductsPage from '@/pages/admin/AdminProductsPage'
import AdminUsersPage from '@/pages/admin/AdminUsersPage'
import AdminKnowledgePage from '@/pages/admin/AdminKnowledgePage'
import AdminKnowledgeEditorPage from '@/pages/admin/AdminKnowledgeEditorPage'

function PublicLayout() {
  return (
    <>
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <QuoteModal />
    </>
  )
}

function AppFrame() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className={`flex min-h-screen flex-col ${isAdmin ? '' : ''}`}>
      <ScrollToHash />
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminShell />
            </AdminGuard>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route
            path="orders"
            element={
              <PermissionGate permission="orders">
                <AdminOrdersPage />
              </PermissionGate>
            }
          />
          <Route
            path="orders/:id"
            element={
              <PermissionGate permission="orders">
                <AdminOrderDetailPage />
              </PermissionGate>
            }
          />
          <Route
            path="products"
            element={
              <PermissionGate permission="products">
                <AdminProductsPage />
              </PermissionGate>
            }
          />
          <Route
            path="knowledge"
            element={
              <PermissionGate permission="knowledgeHub">
                <AdminKnowledgePage />
              </PermissionGate>
            }
          />
          <Route
            path="knowledge/:id"
            element={
              <PermissionGate permission="knowledgeHub">
                <AdminKnowledgeEditorPage />
              </PermissionGate>
            }
          />
          <Route
            path="users"
            element={
              <PermissionGate superAdminOnly>
                <AdminUsersPage />
              </PermissionGate>
            }
          />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/sourcing" element={<SourcingPage />} />
          <Route path="/quality-compliance" element={<QualityCompliancePage />} />
          <Route path="/logistics-handling" element={<LogisticsHandlingPage />} />
          <Route path="/logistics-compliance" element={<LogisticsCompliancePage />} />
          <Route path="/products" element={<CatalogPage />} />
          <Route path="/request-quote" element={<RequestQuotePage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<InsightPostPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppFrame />
    </BrowserRouter>
  )
}
