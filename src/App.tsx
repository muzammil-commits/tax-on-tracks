import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { RefundStatusPage } from './pages/RefundStatusPage';
import { ContactPage } from './pages/ContactPage';
import { PortalPage } from './pages/PortalPage';
import { AdminPage } from './pages/AdminPage';
import {
  PrivacyPolicyPage,
  TermsPage,
  SecurityPage,
  NotFoundPage,
} from './pages/LegalPages';

export function App() {
  return (
    <SiteProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-white text-[#10264A]">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/refund-status" element={<RefundStatusPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/portal" element={<PortalPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-and-conditions" element={<TermsPage />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <ConsultationModal />
          </div>
        </Router>
      </AuthProvider>
    </SiteProvider>
  );
}

export default App;
