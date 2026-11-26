import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  UploadCloud,
  FolderOpen,
  FileCheck2,
  CreditCard,
  MessageSquare,
  Bell,
  UserCog,
  LogOut,
  Menu,
  X,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  EyeOff,
  Send,
  Plus,
  FileText,
  Sparkles,
  ChevronRight,
  Search,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import { ServiceRequestItem } from '../types';
import {
  downloadTaxOrganizerPDF,
  downloadTaxReturnPDF,
  downloadInvoicePDF,
} from '../utils/pdfGenerator';

type PortalTab =
  | 'Overview'
  | 'My Services'
  | 'Upload Docs'
  | 'My Docs'
  | 'Tax Returns'
  | 'Invoices'
  | 'CPA Messages'
  | 'Notifications'
  | 'Profile & Settings';

interface YearData {
  step: number;
  statusLabel: string;
  filingBanner: string;
  federalStatus: string;
  federalRefund: string;
  documents: {
    id: string;
    name: string;
    category: string;
    size: string;
    uploadDate: string;
    status: string;
  }[];
}

const YEAR_RECORDS: Record<string, YearData> = {
  '2024': {
    step: 5,
    statusLabel: 'E-Filing Completed (IRS Accepted)',
    filingBanner:
      'Tax Year 2024 return successfully E-Filed with the IRS & State on October 14, 2024. Final Refund Deposited.',
    federalStatus: 'IRS Accepted & Processed',
    federalRefund: '$3,840.00 Direct Deposit',
    documents: [
      { id: '24-1', name: '2024_Form_W2_Microsoft_Corporation.pdf', category: 'Form W-2', size: '1.4 MB', uploadDate: '02/10/2024', status: 'Verified' },
      { id: '24-2', name: '2024_Form_1099_INT_Chase_Bank.pdf', category: 'Form 1099', size: '0.8 MB', uploadDate: '02/14/2024', status: 'Verified' },
      { id: '24-3', name: '2024_Form_1099_DIV_Vanguard.pdf', category: 'Form 1099', size: '1.1 MB', uploadDate: '02/18/2024', status: 'Verified' },
      { id: '24-4', name: '2024_FBAR_SBI_NRE_Foreign_Accounts.pdf', category: 'FBAR / Foreign Bank', size: '2.3 MB', uploadDate: '03/01/2024', status: 'Verified' },
    ],
  },
  '2025': {
    step: 3,
    statusLabel: 'Review Draft (Ready for Client Review & Approval)',
    filingBanner:
      'Draft Form 1040 prepared by CPA Michael Miller. Please review your draft and sign off to proceed with instant IRS E-Filing.',
    federalStatus: 'Draft Prepared — Awaiting Approval',
    federalRefund: '$2,450.00 (Estimated)',
    documents: [
      { id: '25-1', name: '2025_Form_W2_Primary_Employer.pdf', category: 'Form W-2', size: '1.6 MB', uploadDate: '01/28/2025', status: 'Verified' },
      { id: '25-2', name: '2025_Form_1099_B_ETrade_RSU_Capital_Gains.pdf', category: 'Form 1099', size: '2.8 MB', uploadDate: '02/05/2025', status: 'Verified' },
      { id: '25-3', name: '2025_ICICI_Bank_NRO_NRE_Statement.pdf', category: 'FBAR / Foreign Bank', size: '1.9 MB', uploadDate: '02/12/2025', status: 'Verified' },
      { id: '25-4', name: '2025_Travis_County_Property_Tax_Statement.pdf', category: 'Prior Return', size: '0.9 MB', uploadDate: '02/20/2025', status: 'Verified' },
    ],
  },
  '2026': {
    step: 2,
    statusLabel: 'Under Preparation (CPA Active Deduction Calculation)',
    filingBanner:
      'Documents received. CPA Michael Miller is currently preparing your Tax Year 2026 filing and checking Foreign Tax Credit optimizations.',
    federalStatus: 'Under Active CPA Preparation',
    federalRefund: 'Calculating (W-2s Received)',
    documents: [
      { id: '26-1', name: '2026_Tax_Organizer_Intake_Packet.pdf', category: 'Prior Return', size: '1.1 MB', uploadDate: '01/15/2026', status: 'Verified' },
      { id: '26-2', name: '2026_Form_W2_Wage_Statement.pdf', category: 'Form W-2', size: '1.5 MB', uploadDate: '02/01/2026', status: 'Verified' },
    ],
  },
};

const INITIAL_RETURNS = [
  { id: 'dtr-1', userId: 'RTFOID1', documentType: 'Form 1040 Federal Return (2024)', comment: 'IRS Accepted & Finalized', date: '06-03-2025', status: 'Completed', year: '2024' },
  { id: 'dtr-2', userId: 'RTFOID1', documentType: 'FinCEN 114 FBAR Disclosure (2024)', comment: 'FinCEN Verified', date: '06-03-2025', status: 'Completed', year: '2024' },
  { id: 'dtr-3', userId: 'RTFOID2', documentType: 'Form 1040 Draft Return (2025)', comment: 'Draft Copy Ready for Review', date: '29-01-2026', status: 'Unpaid', year: '2025' },
];

const INITIAL_INVOICES = [
  { id: 'pi-1', orderId: 'RTFOID1', orderType: 'Tax Organizer & Form 1040 (2024)', amount: 205, status: 'Completed', number: 'PT-2024-7841', year: '2024' },
  { id: 'pi-2', orderId: 'RTFOID2', orderType: 'Form 1040 + FBAR Advisory (2025)', amount: 350, status: 'Unpaid', number: 'PT-2025-9031', year: '2025' },
];

const INITIAL_MY_DOCS = [
  { id: 1, year: '2024', type: 'Tax Organizer', message: '2024 Intake Packet', uploadDate: '06-03-2025', status: 'Completed', fileName: '2024_Tax_Organizer.pdf' },
  { id: 2, year: '2025', type: 'Tax Organizer', message: '2025 Draft Organizer', uploadDate: '29-01-2026', status: 'Under Payment', fileName: '2025_Tax_Organizer_Draft.pdf' },
  { id: 3, year: '2025', type: 'Form W-2', message: 'Primary Employer W-2', uploadDate: '04-06-2026', status: 'Docs Received', fileName: '2025_Form_W2.pdf' },
];

const MILESTONES = [
  { id: 1, title: 'Upload Docs' },
  { id: 2, title: 'Preparation' },
  { id: 3, title: 'Review Draft' },
  { id: 4, title: 'Payment' },
  { id: 5, title: 'E-Filing' },
];

export const PortalPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { services } = useSite();
  const {
    currentUser,
    loginClient,
    registerClient,
    logoutClient,
    uploadDocument,
    sendMessageToCPA,
    updateProfile,
    submitServiceRequest,
    markNotificationRead,
  } = useAuth();

  // Auth states
  const initialAuthTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>(initialAuthTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Portal Navigation & UI States
  const [activeTab, setActiveTab] = useState<PortalTab>('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [taxYear, setTaxYear] = useState('2025');
  const [bannerNotice, setBannerNotice] = useState('');

  // Documents & Upload
  const [docCategory, setDocCategory] = useState('Form W-2');
  const [docFileName, setDocFileName] = useState('');
  const [docFileSize, setDocFileSize] = useState('1.4 MB');
  const [docSearch, setDocSearch] = useState('');
  const [selectedDocModal, setSelectedDocModal] = useState<{
    name: string;
    category: string;
    size: string;
    status?: string;
  } | null>(null);
  const [myDocs, setMyDocs] = useState(INITIAL_MY_DOCS);

  // Returns & Invoices
  const [returnsList, setReturnsList] = useState(INITIAL_RETURNS);
  const [invoicesList, setInvoicesList] = useState(INITIAL_INVOICES);
  const [payingInvoiceId, setPayingInvoiceId] = useState<string | null>(null);

  // Service Requests
  const [reqServiceId, setReqServiceId] = useState(services[0]?.id || 'federal-tax-preparation');
  const [reqTaxYear, setReqTaxYear] = useState('2025');
  const [reqFilingStatus, setReqFilingStatus] = useState('Married Filing Jointly');
  const [reqNotes, setReqNotes] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedServiceReq, setSelectedServiceReq] = useState<ServiceRequestItem | null>(null);

  // CPA Chat
  const [chatInput, setChatInput] = useState('');

  // Profile & Settings
  const [profName, setProfName] = useState(currentUser?.name || '');
  const [profPhone, setProfPhone] = useState(currentUser?.phone || '');
  const [profCountry, setProfCountry] = useState(currentUser?.country || 'United States');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setProfName(currentUser.name);
      setProfPhone(currentUser.phone);
      setProfCountry(currentUser.country || 'United States');
    }
  }, [currentUser]);

  // Service-to-Portal deep link (?service=slug&tab=request)
  useEffect(() => {
    const srvSlug = searchParams.get('service');
    const tabParam = searchParams.get('tab');
    if (srvSlug) {
      const found = services.find((s) => s.slug === srvSlug);
      if (found) setReqServiceId(found.id);
    }
    if (currentUser && tabParam === 'request') {
      setActiveTab('My Services');
      setShowRequestForm(true);
    }
  }, [searchParams, currentUser, services]);

  const notify = (msg: string) => {
    setBannerNotice(msg);
    setTimeout(() => setBannerNotice(''), 5000);
  };

  // Auth handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email.trim() || !password.trim()) {
      setAuthError('Please enter both email and password.');
      return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      const ok = loginClient(email.trim(), password);
      setAuthLoading(false);
      if (!ok) setAuthError('Invalid credentials. Please check your email.');
    }, 350);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setAuthError('Please complete all required registration fields.');
      return;
    }
    if (password.length < 8) {
      setAuthError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      registerClient(fullName.trim(), email.trim(), phone.trim(), password, country);
      setAuthLoading(false);
    }, 350);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email.trim()) {
      setAuthError('Enter your registered email address.');
      return;
    }
    setAuthSuccess(`Password reset instructions have been sent to ${email}.`);
  };

  // Document Upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      notify('File exceeds 15 MB limit. Please compress or split the PDF.');
      return;
    }
    setDocFileName(file.name);
    setDocFileSize(`${Math.max(0.1, file.size / (1024 * 1024)).toFixed(1)} MB`);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFileName.trim()) return;
    const cleanName = docFileName.includes('.') ? docFileName : `${docFileName}.pdf`;
    uploadDocument({ name: cleanName, category: docCategory, size: docFileSize });
    setMyDocs((prev) => [
      {
        id: prev.length + 1,
        year: taxYear,
        type: docCategory,
        message: cleanName,
        uploadDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
        status: 'Docs Received',
        fileName: cleanName,
      },
      ...prev,
    ]);
    notify(`Document "${cleanName}" encrypted and uploaded to your ${taxYear} Vault.`);
    setDocFileName('');
  };

  // Invoice payment
  const handlePayInvoice = (inv: (typeof INITIAL_INVOICES)[0]) => {
    setPayingInvoiceId(inv.id);
    setTimeout(() => {
      setInvoicesList((prev) =>
        prev.map((i) => (i.id === inv.id ? { ...i, status: 'Completed' } : i))
      );
      setReturnsList((prev) =>
        prev.map((r) => (r.userId === inv.orderId ? { ...r, status: 'Completed' } : r))
      );
      setPayingInvoiceId(null);
      notify(`Payment of $${inv.amount}.00 for ${inv.orderType} confirmed! Order #${inv.orderId} marked Completed.`);
    }, 800);
  };

  // Service Request submission
  const handleServiceRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const srv = services.find((s) => s.id === reqServiceId);
    if (!srv) return;
    submitServiceRequest({
      serviceId: srv.id,
      serviceTitle: srv.title,
      taxYear: reqTaxYear,
      filingStatus: reqFilingStatus,
      notes: reqNotes || 'Standard filing & CPA review requested.',
    });
    setReqNotes('');
    setShowRequestForm(false);
    notify(`Service request for "${srv.title}" (${reqTaxYear}) submitted to Michael Miller, CPA.`);
  };

  // Profile Update
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: profName, phone: profPhone, country: profCountry });
    notify('Profile details updated successfully.');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 8 || newPass !== confirmNewPass) {
      notify('Passwords must match and be at least 8 characters.');
      return;
    }
    setNewPass('');
    setConfirmNewPass('');
    notify('Your portal password has been updated securely.');
  };

  // ---------------------------------------------------------------------------
  // UNAUTHENTICATED VIEW (LOGIN / REGISTER / FORGOT)
  // ---------------------------------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-[85vh] bg-[#F6F9FF] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Branding & Visual */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061F46] text-[#FFC400] text-xs font-bold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted Client Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#061F46] leading-tight">
              Secure Access to Your <span className="text-[#E0AC00]">PlutoTax</span> Dashboard
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Upload W-2s and 1099s, track IRS e-file milestones, review Form 1040 drafts, pay invoices, and message your dedicated CPA directly.
            </p>

            <div className="rounded-3xl overflow-hidden shadow-card-hover border-2 border-white bg-white">
              <img
                src="/assets/portal-grand-preview.png"
                alt="PlutoTax Client Portal Preview"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-3 text-xs font-bold text-[#061F46]">
              <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                IRS Section 7216 Protected
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                <Lock className="w-4 h-4 text-[#061F46]" />
                TLS 1.3 &amp; AES-256 Vault
              </span>
            </div>
          </div>

          {/* Right Auth Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-card-hover border border-slate-200">
            <div className="flex border-b border-slate-200 mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError('');
                  setAuthSuccess('');
                }}
                className={`flex-1 py-3 text-sm font-extrabold border-b-2 transition-colors ${
                  authMode === 'login'
                    ? 'border-[#061F46] text-[#061F46]'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setAuthError('');
                  setAuthSuccess('');
                }}
                className={`flex-1 py-3 text-sm font-extrabold border-b-2 transition-colors ${
                  authMode === 'register'
                    ? 'border-[#061F46] text-[#061F46]'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                New Client Registration
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {authSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{authSuccess}</span>
              </div>
            )}

            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                    Client Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#10264A]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('forgot');
                        setAuthError('');
                        setAuthSuccess('');
                      }}
                      className="text-xs font-bold text-[#0A2D5B] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label="Toggle password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#061F46]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#061F46]"
                  />
                  <span>Remember me on this device</span>
                </label>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-[#061F46] hover:bg-[#0A2D5B] text-white font-extrabold py-3.5 rounded-full text-sm shadow-md transition-all disabled:opacity-60"
                >
                  {authLoading ? 'Signing In...' : 'Access My Secure Tax Portal'}
                </button>

                <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
                  Demo login: sign in with <code className="font-bold text-[#061F46]">client@example.com</code> and any password.
                </div>
              </form>
            )}

            {authMode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ananya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (512) 555-0198"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                    Country of Residence
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                  >
                    <option value="United States">United States (USA)</option>
                    <option value="India">India (NRI / OCI)</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                      Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Min 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold py-3.5 rounded-full text-sm shadow-gold transition-all"
                >
                  {authLoading ? 'Creating Account...' : 'Create Client Account'}
                </button>
              </form>
            )}

            {authMode === 'forgot' && (
              <form onSubmit={handleForgot} className="space-y-4">
                <p className="text-xs text-slate-600">
                  Enter your registered email address and we will send secure password reset instructions.
                </p>
                <input
                  type="email"
                  required
                  placeholder="client@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#061F46] hover:bg-[#0A2D5B] text-white font-extrabold py-3 rounded-full text-sm"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="w-full text-xs font-bold text-[#061F46] hover:underline"
                >
                  Back to Sign In
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // AUTHENTICATED CLIENT PORTAL DASHBOARD
  // ---------------------------------------------------------------------------
  const yearData = YEAR_RECORDS[taxYear] || YEAR_RECORDS['2025'];
  const unreadNotifs = (currentUser.notifications || []).filter((n) => !n.read).length;
  const pendingInvoicesCount = invoicesList.filter((i) => i.status !== 'Completed').length;
  const activeServicesCount = (currentUser.serviceRequests || []).length;

  const sidebarGroups: {
    label: string;
    items: { id: PortalTab; icon: React.ReactNode; badge?: number }[];
  }[] = [
    {
      label: 'Dashboard',
      items: [
        { id: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'My Services', icon: <Briefcase className="w-4 h-4" />, badge: activeServicesCount },
      ],
    },
    {
      label: 'Documents & Returns',
      items: [
        { id: 'Upload Docs', icon: <UploadCloud className="w-4 h-4" /> },
        { id: 'My Docs', icon: <FolderOpen className="w-4 h-4" />, badge: myDocs.length },
        { id: 'Tax Returns', icon: <FileCheck2 className="w-4 h-4" />, badge: returnsList.length },
      ],
    },
    {
      label: 'Billing & Support',
      items: [
        { id: 'Invoices', icon: <CreditCard className="w-4 h-4" />, badge: pendingInvoicesCount || undefined },
        { id: 'CPA Messages', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotifs || undefined },
      ],
    },
    {
      label: 'Account',
      items: [{ id: 'Profile & Settings', icon: <UserCog className="w-4 h-4" /> }],
    },
  ];

  const handleSelectTab = (tab: PortalTab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const statusBadgeClass = (status: string) => {
    if (status === 'Completed' || status === 'Verified') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (status === 'Unpaid' || status === 'Pending Documents') {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }
    if (status === 'In Progress' || status === 'Under Review') {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    return 'bg-blue-50 text-[#061F46] border-blue-200';
  };

  return (
    <div className="min-h-screen bg-[#F6F9FF] text-[#10264A] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#061F46]/50 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Vertical Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-20 h-screen w-68 bg-[#061F46] text-white flex flex-col justify-between transition-transform duration-300 shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="overflow-y-auto flex-1">
          <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFC400] text-[#061F46] flex items-center justify-center font-black text-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-extrabold text-white truncate max-w-[145px]">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-[#FFC400] font-semibold">
                  IRS 7216 Client Vault
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4 space-y-5">
            {sidebarGroups.map((grp) => (
              <div key={grp.label}>
                <div className="px-3 mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {grp.label}
                </div>
                <div className="space-y-1">
                  {grp.items.map((item) => {
                    const active = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectTab(item.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          active
                            ? 'bg-[#FFC400] text-[#061F46] shadow-md'
                            : 'text-slate-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {item.icon}
                          <span>{item.id}</span>
                        </span>
                        {item.badge !== undefined && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              active ? 'bg-[#061F46] text-[#FFC400]' : 'bg-white/15 text-white'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={logoutClient}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-rose-600/90 text-xs font-bold text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Portal Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open portal menu"
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-[#061F46] hover:bg-[#F6F9FF]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 truncate">
              <span>Client Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#061F46] font-extrabold truncate">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              aria-label="Select Tax Year"
              className="bg-[#F6F9FF] border border-slate-200 rounded-full px-3 py-1.5 text-xs font-extrabold text-[#061F46]"
            >
              <option value="2026">TY 2026</option>
              <option value="2025">TY 2025</option>
              <option value="2024">TY 2024</option>
            </select>

            <button
              type="button"
              onClick={() => handleSelectTab('Notifications')}
              aria-label="View notifications"
              className="relative p-2 rounded-full bg-[#F6F9FF] hover:bg-slate-100 text-[#061F46] border border-slate-200"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFC400] text-[#061F46] text-[10px] font-black flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="p-4 sm:p-8 max-w-6xl w-full mx-auto space-y-6">
          {bannerNotice && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-800 flex items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{bannerNotice}</span>
              </div>
              <button
                type="button"
                onClick={() => setBannerNotice('')}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* 1. OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-[#061F46] text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FFC400]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tax Year {taxYear} Active</span>
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading mt-1">
                    Welcome back, {currentUser.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Assigned CPA: <strong className="text-white">Michael Miller, CPA</strong> • Status:{' '}
                    <strong className="text-[#FFC400]">{yearData.statusLabel}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    downloadTaxOrganizerPDF(taxYear, currentUser.name, currentUser.email);
                    notify(`Tax Organizer for ${taxYear} downloaded.`);
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold px-5 py-3 rounded-full text-xs sm:text-sm shadow-gold shrink-0 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {taxYear} Tax Organizer</span>
                </button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
                  <div className="text-[11px] font-bold uppercase text-slate-500">Active Services</div>
                  <div className="text-2xl font-black text-[#061F46] mt-1">{activeServicesCount}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Tracked in portal</div>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
                  <div className="text-[11px] font-bold uppercase text-slate-500">Vault Documents</div>
                  <div className="text-2xl font-black text-[#061F46] mt-1">{yearData.documents.length}</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-0.5">AES-256 Verified</div>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
                  <div className="text-[11px] font-bold uppercase text-slate-500">Federal Refund</div>
                  <div className="text-lg sm:text-xl font-black text-emerald-600 mt-1 truncate">
                    {yearData.federalRefund}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{yearData.federalStatus}</div>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
                  <div className="text-[11px] font-bold uppercase text-slate-500">Pending Invoices</div>
                  <div className="text-2xl font-black text-[#061F46] mt-1">{pendingInvoicesCount}</div>
                  <button
                    type="button"
                    onClick={() => handleSelectTab('Invoices')}
                    className="text-xs font-bold text-[#0A2D5B] hover:underline mt-0.5"
                  >
                    View Billing →
                  </button>
                </div>
              </div>

              {/* 5-Step Filing Progress */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-extrabold font-heading text-[#061F46]">
                      Tax Filing Milestone Tracker ({taxYear})
                    </h2>
                    <p className="text-xs text-slate-500">{yearData.filingBanner}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {MILESTONES.map((m) => {
                    const done = yearData.step > m.id || (yearData.step === 5 && m.id === 5);
                    const active = yearData.step === m.id && yearData.step !== 5;
                    return (
                      <div
                        key={m.id}
                        className={`p-3.5 rounded-2xl border flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 ${
                          done
                            ? 'bg-emerald-50/70 border-emerald-200'
                            : active
                            ? 'bg-[#FFC400]/15 border-[#FFC400]'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                            done
                              ? 'bg-emerald-500 text-white'
                              : active
                              ? 'bg-[#061F46] text-[#FFC400]'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {done ? <CheckCircle2 className="w-4 h-4" /> : m.id}
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-[#061F46]">{m.title}</div>
                          <div className="text-[10px] text-slate-500">
                            {done ? 'Completed' : active ? 'In Progress' : 'Pending'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Docs + Quick CPA Chat */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold font-heading text-[#061F46]">
                      Source Documents ({taxYear})
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleSelectTab('Upload Docs')}
                      className="inline-flex items-center gap-1 bg-[#061F46] text-white px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-[#0A2D5B]"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#FFC400]" />
                      <span>Upload</span>
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {yearData.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3.5 rounded-2xl bg-[#F6F9FF] border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-[#061F46] truncate">
                            {doc.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {doc.category} • {doc.size} • {doc.uploadDate}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {doc.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedDocModal(doc)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-[#061F46] hover:bg-slate-100"
                            aria-label="View document"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-[380px]">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-extrabold font-heading text-[#061F46]">
                      Dedicated CPA Chat
                    </h3>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      ● Michael Miller, CPA
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1">
                    {currentUser.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${m.sender === 'client' ? 'items-end' : 'items-start'}`}
                      >
                        <span className="text-[10px] text-slate-400 mb-0.5">
                          {m.senderName} • {m.timestamp}
                        </span>
                        <div
                          className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                            m.sender === 'client'
                              ? 'bg-[#061F46] text-white rounded-br-none'
                              : 'bg-[#F6F9FF] text-[#10264A] border border-slate-200 rounded-bl-none'
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!chatInput.trim()) return;
                      sendMessageToCPA(chatInput);
                      setChatInput('');
                    }}
                    className="pt-3 border-t border-slate-100 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Message your CPA..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-[#F6F9FF] border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                    />
                    <button
                      type="submit"
                      aria-label="Send message"
                      className="p-2.5 rounded-xl bg-[#061F46] text-[#FFC400] hover:bg-[#0A2D5B]"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* 2. MY SERVICES & REQUESTS */}
          {activeTab === 'My Services' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold font-heading text-[#061F46]">
                    My Services &amp; Requests
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Manage active engagements or submit a new PlutoTax service request.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRequestForm((v) => !v)}
                  className="inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-gold"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showRequestForm ? 'Close Form' : 'Request New Service'}</span>
                </button>
              </div>

              {showRequestForm && (
                <form
                  onSubmit={handleServiceRequestSubmit}
                  className="bg-white rounded-3xl p-6 border-2 border-[#FFC400] shadow-card space-y-4"
                >
                  <h2 className="text-lg font-extrabold font-heading text-[#061F46]">
                    New Service Application
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                        Select Service
                      </label>
                      <select
                        value={reqServiceId}
                        onChange={(e) => setReqServiceId(e.target.value)}
                        className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-3 py-2.5 text-sm"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                        Tax Year
                      </label>
                      <select
                        value={reqTaxYear}
                        onChange={(e) => setReqTaxYear(e.target.value)}
                        className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-3 py-2.5 text-sm"
                      >
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                        Filing Status
                      </label>
                      <select
                        value={reqFilingStatus}
                        onChange={(e) => setReqFilingStatus(e.target.value)}
                        className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-3 py-2.5 text-sm"
                      >
                        <option value="Single">Single</option>
                        <option value="Married Filing Jointly">Married Filing Jointly</option>
                        <option value="Business / LLC / Corp">Business / LLC / Corp</option>
                        <option value="Non-Resident (1040-NR)">Non-Resident (1040-NR)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                      Notes / Special Instructions
                    </label>
                    <textarea
                      rows={3}
                      value={reqNotes}
                      onChange={(e) => setReqNotes(e.target.value)}
                      placeholder="Describe W-2s, visa status, foreign accounts, or entity details..."
                      className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#061F46] hover:bg-[#0A2D5B] text-white font-extrabold px-6 py-3 rounded-full text-sm"
                  >
                    Submit Service Request
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(currentUser.serviceRequests || []).map((req) => (
                  <div
                    key={req.id}
                    onClick={() => setSelectedServiceReq(req)}
                    className="cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#FFC400] shadow-sm hover:shadow-card transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-extrabold text-[#061F46]">{req.serviceTitle}</h3>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border shrink-0 ${statusBadgeClass(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{req.notes}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>TY {req.taxYear} • {req.filingStatus}</span>
                      <span className="font-bold text-[#061F46]">Requested {req.requestDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. UPLOAD DOCS */}
          {activeTab === 'Upload Docs' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-extrabold font-heading text-[#061F46]">
                  Upload Documents — Tax Year {taxYear}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Upload Form W-2, 1099s, foreign bank statements, or prior returns to your encrypted vault.
                </p>
              </div>

              <form
                onSubmit={handleUploadSubmit}
                className="p-6 rounded-2xl bg-[#F6F9FF] border-2 border-dashed border-[#061F46]/25 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                      Document Category
                    </label>
                    <select
                      value={docCategory}
                      onChange={(e) => setDocCategory(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                    >
                      <option value="Form W-2">Form W-2 (Wage &amp; Tax Statement)</option>
                      <option value="Form 1099">Form 1099 (INT / DIV / B / NEC)</option>
                      <option value="FBAR / Foreign Bank">FBAR / Foreign Bank Statements</option>
                      <option value="Passport / Visa">Passport / Visa (ITIN CAA)</option>
                      <option value="Prior Return">Prior Year Form 1040 / K-1</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                      Select File (PDF, PNG, JPG — max 15 MB)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileSelect}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                    Document Name / Label
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={`e.g. ${taxYear}_Form_W2_Employer.pdf`}
                    value={docFileName}
                    onChange={(e) => setDocFileName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Encrypted with AES-256 bit IRS Section 7216 security
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#061F46] hover:bg-[#0A2D5B] text-white font-extrabold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md"
                  >
                    <UploadCloud className="w-4 h-4 text-[#FFC400]" />
                    <span>Upload to {taxYear} Vault</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 4. MY DOCS */}
          {activeTab === 'My Docs' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold font-heading text-[#061F46]">
                    My Documents
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    All uploaded organizers, W-2s, and tax statements.
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter documents..."
                    value={docSearch}
                    onChange={(e) => setDocSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="hidden sm:block bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F6F9FF] border-b border-slate-200 text-xs uppercase text-[#061F46]">
                    <tr>
                      <th className="py-3.5 px-4">#</th>
                      <th className="py-3.5 px-4">Year</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4">Message</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status &amp; Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {myDocs
                      .filter(
                        (d) =>
                          d.type.toLowerCase().includes(docSearch.toLowerCase()) ||
                          d.message.toLowerCase().includes(docSearch.toLowerCase())
                      )
                      .map((d) => (
                        <tr key={d.id} className="hover:bg-[#F6F9FF]/50">
                          <td className="py-3.5 px-4 font-bold">{d.id}</td>
                          <td className="py-3.5 px-4">{d.year}</td>
                          <td className="py-3.5 px-4 font-semibold text-[#061F46]">{d.type}</td>
                          <td className="py-3.5 px-4 text-slate-600">{d.message}</td>
                          <td className="py-3.5 px-4 text-slate-500">{d.uploadDate}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusBadgeClass(d.status)}`}>
                                {d.status}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  downloadTaxOrganizerPDF(d.year, currentUser.name, currentUser.email);
                                  notify(`Downloaded ${d.fileName}`);
                                }}
                                className="px-3 py-1.5 rounded-full bg-[#061F46] text-white text-xs font-bold hover:bg-[#0A2D5B]"
                              >
                                Download
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="sm:hidden space-y-3">
                {myDocs.map((d) => (
                  <div key={d.id} className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>#{d.id} • TY {d.year}</span>
                      <span>{d.uploadDate}</span>
                    </div>
                    <div className="text-sm font-extrabold text-[#061F46]">{d.type}</div>
                    <div className="text-xs text-slate-600">{d.message}</div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusBadgeClass(d.status)}`}>
                        {d.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => downloadTaxOrganizerPDF(d.year, currentUser.name, currentUser.email)}
                        className="px-3 py-1.5 rounded-full bg-[#061F46] text-white text-xs font-bold"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. TAX RETURNS */}
          {activeTab === 'Tax Returns' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h1 className="text-2xl font-extrabold font-heading text-[#061F46]">
                  Draft Documents &amp; Tax Returns
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Review your prepared Form 1040 drafts and download CPA-signed e-file acknowledgments.
                </p>
              </div>

              <div className="hidden sm:block bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F6F9FF] border-b border-slate-200 text-xs uppercase text-[#061F46]">
                    <tr>
                      <th className="py-3.5 px-4">Order ID</th>
                      <th className="py-3.5 px-4">Document Type</th>
                      <th className="py-3.5 px-4">Comment</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">PDF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {returnsList.map((r) => (
                      <tr key={r.id} className="hover:bg-[#F6F9FF]/50">
                        <td className="py-3.5 px-4 font-mono font-bold text-xs">{r.userId}</td>
                        <td className="py-3.5 px-4 font-bold text-[#061F46]">{r.documentType}</td>
                        <td className="py-3.5 px-4 text-slate-600">{r.comment}</td>
                        <td className="py-3.5 px-4 text-slate-500">{r.date}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusBadgeClass(r.status)}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => {
                              downloadTaxReturnPDF({
                                title: r.documentType,
                                year: r.year,
                                clientName: currentUser.name,
                                clientEmail: currentUser.email,
                                efileConfirmation: `${r.userId}-CERT-${r.year}`,
                              });
                              notify(`Downloaded ${r.documentType}`);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#061F46] text-white text-xs font-bold hover:bg-[#0A2D5B]"
                          >
                            <Download className="w-3.5 h-3.5 text-[#FFC400]" />
                            <span>Download</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="sm:hidden space-y-3">
                {returnsList.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-slate-500">{r.userId}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusBadgeClass(r.status)}`}>
                        {r.status}
                      </span>
                    </div>
                    <div className="text-sm font-extrabold text-[#061F46]">{r.documentType}</div>
                    <div className="text-xs text-slate-500">{r.comment} • {r.date}</div>
                    <button
                      type="button"
                      onClick={() =>
                        downloadTaxReturnPDF({
                          title: r.documentType,
                          year: r.year,
                          clientName: currentUser.name,
                          clientEmail: currentUser.email,
                        })
                      }
                      className="w-full py-2 rounded-full bg-[#061F46] text-white text-xs font-bold"
                    >
                      Download PDF Summary
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. INVOICES */}
          {activeTab === 'Invoices' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h1 className="text-2xl font-extrabold font-heading text-[#061F46]">
                  Invoices &amp; Payments
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Download official receipts or settle pending engagement invoices.
                </p>
              </div>

              <div className="hidden sm:block bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F6F9FF] border-b border-slate-200 text-xs uppercase text-[#061F46]">
                    <tr>
                      <th className="py-3.5 px-4">Invoice #</th>
                      <th className="py-3.5 px-4">Order ID</th>
                      <th className="py-3.5 px-4">Description</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">PDF</th>
                      <th className="py-3.5 px-4">Status / Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoicesList.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#F6F9FF]/50">
                        <td className="py-3.5 px-4 font-bold text-[#061F46]">{inv.number}</td>
                        <td className="py-3.5 px-4 font-mono text-xs">{inv.orderId}</td>
                        <td className="py-3.5 px-4">{inv.orderType}</td>
                        <td className="py-3.5 px-4 font-extrabold">${inv.amount}.00</td>
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => {
                              downloadInvoicePDF(
                                inv.number,
                                inv.year,
                                currentUser.name,
                                currentUser.email,
                                inv.amount,
                                inv.status === 'Completed' ? 'PAID' : 'PENDING'
                              );
                              notify(`Invoice ${inv.number} downloaded.`);
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-[#FFC400] text-[#061F46] text-xs font-extrabold hover:bg-[#FFD233]"
                          >
                            Invoice PDF
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          {inv.status === 'Completed' ? (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Paid &amp; Completed
                            </span>
                          ) : (
                            <button
                              type="button"
                              disabled={payingInvoiceId === inv.id}
                              onClick={() => handlePayInvoice(inv)}
                              className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold disabled:opacity-50"
                            >
                              {payingInvoiceId === inv.id ? 'Processing...' : 'Pay Now'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="sm:hidden space-y-3">
                {invoicesList.map((inv) => (
                  <div key={inv.id} className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-[#061F46]">{inv.number}</span>
                      <span className="text-base font-black text-[#061F46]">${inv.amount}.00</span>
                    </div>
                    <div className="text-sm font-bold">{inv.orderType}</div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          downloadInvoicePDF(
                            inv.number,
                            inv.year,
                            currentUser.name,
                            currentUser.email,
                            inv.amount,
                            inv.status === 'Completed' ? 'PAID' : 'PENDING'
                          )
                        }
                        className="flex-1 py-2 rounded-full bg-[#FFC400] text-[#061F46] text-xs font-extrabold"
                      >
                        Invoice PDF
                      </button>
                      {inv.status !== 'Completed' && (
                        <button
                          type="button"
                          onClick={() => handlePayInvoice(inv)}
                          className="flex-1 py-2 rounded-full bg-emerald-600 text-white text-xs font-extrabold"
                        >
                          {payingInvoiceId === inv.id ? 'Processing...' : 'Pay Now'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. CPA MESSAGES */}
          {activeTab === 'CPA Messages' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col h-[520px] animate-fade-in">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <h1 className="text-xl font-extrabold font-heading text-[#061F46]">
                  Dedicated CPA Support &amp; Messaging
                </h1>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                  ● Michael Miller, CPA — Direct Encrypted Channel
                </p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {currentUser.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'client' ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] text-slate-400 mb-0.5">
                      {m.senderName} • {m.timestamp}
                    </span>
                    <div
                      className={`p-3.5 rounded-2xl max-w-[80%] text-xs sm:text-sm leading-relaxed ${
                        m.sender === 'client'
                          ? 'bg-[#061F46] text-white rounded-br-none'
                          : 'bg-[#F6F9FF] text-[#10264A] border border-slate-200 rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!chatInput.trim()) return;
                  sendMessageToCPA(chatInput);
                  setChatInput('');
                }}
                className="pt-4 border-t border-slate-100 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Write a message to your CPA..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-[#F6F9FF] border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-[#061F46] hover:bg-[#0A2D5B] text-[#FFC400] px-5 py-2.5 rounded-full text-xs font-extrabold"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* 8. NOTIFICATIONS */}
          {activeTab === 'Notifications' && (
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-2xl font-extrabold font-heading text-[#061F46]">
                Notifications
              </h1>
              <div className="space-y-3">
                {(currentUser.notifications || []).map((n) => (
                  <div
                    key={n.id}
                    className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      n.read
                        ? 'bg-white border-slate-200'
                        : 'bg-[#F6F9FF] border-[#FFC400]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {!n.read && <span className="w-2 h-2 rounded-full bg-[#FFC400]" />}
                        <h3 className="text-sm font-extrabold text-[#061F46]">{n.title}</h3>
                        <span className="text-[11px] text-slate-400">• {n.date}</span>
                      </div>
                      <p className="text-xs text-slate-600">{n.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!n.read && (
                        <button
                          type="button"
                          onClick={() => markNotificationRead(n.id)}
                          className="px-3 py-1.5 rounded-full border border-slate-300 text-xs font-bold hover:bg-slate-100"
                        >
                          Mark Read
                        </button>
                      )}
                      {n.targetTab && (
                        <button
                          type="button"
                          onClick={() => handleSelectTab(n.targetTab as PortalTab)}
                          className="px-3.5 py-1.5 rounded-full bg-[#061F46] text-white text-xs font-bold"
                        >
                          Open {n.targetTab}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. PROFILE & SETTINGS */}
          {activeTab === 'Profile & Settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
              <form
                onSubmit={handleProfileSave}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4"
              >
                <h2 className="text-lg font-extrabold font-heading text-[#061F46]">
                  Personal Information
                </h2>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={profPhone}
                    onChange={(e) => setProfPhone(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={profCountry}
                    onChange={(e) => setProfCountry(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#061F46] hover:bg-[#0A2D5B] text-white font-extrabold px-6 py-3 rounded-full text-sm"
                >
                  Save Profile Changes
                </button>
              </form>

              <form
                onSubmit={handlePasswordChange}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4"
              >
                <h2 className="text-lg font-extrabold font-heading text-[#061F46]">
                  Security &amp; Password Management
                </h2>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 8 characters"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#10264A] mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter new password"
                    value={confirmNewPass}
                    onChange={(e) => setConfirmNewPass(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold px-6 py-3 rounded-full text-sm shadow-gold"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Document Details Modal */}
      {selectedDocModal && (
        <div
          className="fixed inset-0 z-50 bg-[#061F46]/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedDocModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-extrabold text-[#061F46]">
                <FileText className="w-5 h-5 text-[#FFC400]" />
                <span>Document Verification</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocModal(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>File Name:</strong> {selectedDocModal.name}</p>
              <p><strong>Category:</strong> {selectedDocModal.category}</p>
              <p><strong>Size:</strong> {selectedDocModal.size}</p>
              <p className="text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                <ShieldCheck className="w-4 h-4" />
                SHA-256 Verified &amp; Encrypted in US SOC-2 Vault
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedDocModal(null)}
                className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  downloadTaxOrganizerPDF(taxYear, currentUser.name, currentUser.email);
                  setSelectedDocModal(null);
                }}
                className="px-4 py-2 rounded-full bg-[#061F46] text-white text-xs font-bold"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Request Detail Modal */}
      {selectedServiceReq && (
        <div
          className="fixed inset-0 z-50 bg-[#061F46]/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedServiceReq(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-[#061F46]">
                {selectedServiceReq.serviceTitle}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedServiceReq(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-slate-600">
              <p><strong>Status:</strong> {selectedServiceReq.status}</p>
              <p><strong>Tax Year:</strong> {selectedServiceReq.taxYear}</p>
              <p><strong>Filing Status:</strong> {selectedServiceReq.filingStatus}</p>
              <p><strong>Assigned CPA:</strong> {selectedServiceReq.assignedCpa}</p>
              <p><strong>Request Date:</strong> {selectedServiceReq.requestDate}</p>
              <p className="bg-[#F6F9FF] p-3 rounded-xl border border-slate-200">
                <strong>Notes:</strong> {selectedServiceReq.notes}
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedServiceReq(null);
                  handleSelectTab('Upload Docs');
                }}
                className="px-4 py-2 rounded-full bg-[#FFC400] text-[#061F46] text-xs font-extrabold"
              >
                Upload Supporting Docs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
