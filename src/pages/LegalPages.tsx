import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, CheckCircle2, Home } from 'lucide-react';
import { BUSINESS_INFO } from '../data/plutoData';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white text-[#10264A]">
      <section className="bg-[#061F46] text-white py-14 border-b-4 border-[#FFC400]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <Breadcrumbs items={[{ name: 'Privacy Policy' }]} variant="dark" />
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading">
            Client Privacy Policy &amp; IRC Section 7216 Notice
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Last Updated: {new Date().getFullYear()} • {BUSINESS_INFO.name}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
        <div className="p-4 rounded-2xl bg-[#F6F9FF] border border-blue-200 text-[#061F46] text-xs sm:text-sm">
          <strong>Internal Revenue Code Section 7216 Statement:</strong> Federal law provides that tax return preparers who disclose or use tax return information for purposes other than preparing tax returns without your prior written consent are subject to criminal penalties. PlutoTax strictly adheres to IRC § 7216 and never sells or discloses your tax records.
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#061F46] mb-2">1. Scope &amp; Governance</h2>
          <p>
            {BUSINESS_INFO.name}, headquartered at {BUSINESS_INFO.address}, is committed to safeguarding personal identification numbers, tax documents, and financial information collected during federal and state tax consulting.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#061F46] mb-2">2. Information We Collect</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
            <li>Personal Identifiers: Legal names, SSN, ITIN, dates of birth, contact details.</li>
            <li>Financial Data: W-2s, 1099s, K-1s, brokerage statements, foreign bank accounts (FBAR).</li>
            <li>Immigration/Visa Records: Passports, Form I-94 arrival/departure records for Substantial Presence Test.</li>
            <li>Corporate Records: Entity EINs, operating agreements, profit and loss ledgers.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#061F46] mb-2">3. Data Encryption &amp; Storage</h2>
          <p>
            All electronic documents uploaded through our client portal are encrypted at rest using AES-256 and in transit using TLS 1.3 cryptographic protocols. Access is restricted to licensed CPAs, EAs, and authorized intake personnel.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#061F46] mb-2">4. Inquiries &amp; Contact</h2>
          <p>
            For questions regarding this policy or to request records access, contact our Privacy Officer at{' '}
            <a href={`mailto:${BUSINESS_INFO.email}`} className="text-[#061F46] font-bold underline">
              {BUSINESS_INFO.email}
            </a>{' '}
            or call {BUSINESS_INFO.phone}.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white text-[#10264A]">
      <section className="bg-[#061F46] text-white py-14 border-b-4 border-[#FFC400]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <Breadcrumbs items={[{ name: 'Terms & Conditions' }]} variant="dark" />
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading">
            Terms of Service &amp; Engagement Standards
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {BUSINESS_INFO.name} • Austin, TX 78701
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
        <div>
          <h2 className="text-xl font-extrabold text-[#061F46] mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, utilizing our online client portal, or engaging {BUSINESS_INFO.name} for tax preparation or advisory services, you agree to comply with these terms, IRS Circular 230 regulations, and applicable engagement letters.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-[#061F46] mb-2">2. Electronic Authorizations (Form 8879)</h2>
          <p>
            In accordance with IRS e-file mandates, no tax return is transmitted electronically until the client has reviewed the draft return and executed IRS Form 8879 (IRS e-file Signature Authorization).
          </p>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-[#061F46] mb-2">3. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Texas and applicable United States Federal tax statutes, without regard to conflict of law principles.
          </p>
        </div>
      </div>
    </div>
  );
};

export const SecurityPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white text-[#10264A]">
      <section className="bg-[#061F46] text-white py-14 border-b-4 border-[#FFC400]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <Breadcrumbs items={[{ name: 'Data Security' }]} variant="dark" />
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading">
            Data Security &amp; Circular 230 Standards
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Enterprise Security Architecture • IRS Publication 4557 Compliant
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#F6F9FF] border border-slate-200 text-center">
            <Lock className="w-8 h-8 text-[#061F46] mx-auto mb-2" />
            <h3 className="font-bold text-[#061F46] text-sm">256-Bit AES Encryption</h3>
            <p className="text-xs text-slate-500 mt-1">Bank-level cryptographic protection at rest and in transit.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#F6F9FF] border border-slate-200 text-center">
            <ShieldCheck className="w-8 h-8 text-[#061F46] mx-auto mb-2" />
            <h3 className="font-bold text-[#061F46] text-sm">SOC-2 US Cloud Vaults</h3>
            <p className="text-xs text-slate-500 mt-1">All data housed in isolated, high-security US data facilities.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#F6F9FF] border border-slate-200 text-center">
            <CheckCircle2 className="w-8 h-8 text-[#061F46] mx-auto mb-2" />
            <h3 className="font-bold text-[#061F46] text-sm">IRS Section 7216</h3>
            <p className="text-xs text-slate-500 mt-1">Strict legal penalties for unauthorized disclosure.</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#061F46] mb-2">IRS Publication 4557 Compliance</h2>
          <p>
            PlutoTax adheres to the &ldquo;Safeguarding Taxpayer Data&rdquo; guidelines issued by the Internal Revenue Service (IRS Publication 4557). Our administrative and technical controls prevent data theft, unauthorized network intrusions, and identity compromise.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#061F46] mb-2">Treasury Circular 230 Disclosure</h2>
          <p>
            Any US federal tax advice contained in communications from {BUSINESS_INFO.name} is written in accordance with the ethical obligations and practice standards established in Treasury Department Circular 230.
          </p>
        </div>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#F6F9FF]">
    <div className="w-20 h-20 rounded-3xl bg-[#061F46] text-[#FFC400] flex items-center justify-center font-black text-3xl mb-6 shadow-xl font-heading">
      404
    </div>
    <h1 className="text-3xl font-extrabold text-[#061F46] font-heading">Page Not Found</h1>
    <p className="mt-2 text-slate-600 max-w-md text-sm">
      The page you are looking for may have moved or no longer exists. Return to the PlutoTax homepage or browse our services directory.
    </p>
    <div className="mt-6 flex items-center gap-3">
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-[#061F46] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow hover:bg-[#0A2D5B]"
      >
        <Home className="w-4 h-4" />
        <span>Return Home</span>
      </Link>
      <Link
        to="/services"
        className="inline-flex items-center gap-2 bg-white text-[#061F46] border border-slate-300 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-100"
      >
        <span>View All Services</span>
      </Link>
    </div>
  </div>
);
