import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, SearchCheck, ShieldCheck, ArrowRight, Clock, FileCheck2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/plutoData';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const RefundStatusPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#F6F9FF] text-[#10264A] min-h-screen">
      <section className="bg-[#061F46] text-white py-14 border-b-4 border-[#FFC400]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Breadcrumbs items={[{ name: 'Refund Status' }]} variant="dark" />
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Track Your <span className="text-[#FFC400]">Tax Refund</span> Status
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Check your official IRS Federal or State tax refund status, or sign in to your Tax On Tracks Client Portal to view your live e-file acknowledgment ID.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#061F46] text-[#FFC400] flex items-center justify-center">
                  <SearchCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold font-heading text-[#061F46]">
                    IRS &ldquo;Where&apos;s My Refund?&rdquo; Tool
                  </h2>
                  <p className="text-xs text-slate-500">
                    Official Internal Revenue Service Federal Refund Lookup
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                To check your federal refund status on the official IRS portal, have the following details from your Tax On Tracks Form 1040 summary ready:
              </p>

              <ul className="space-y-2 text-sm text-[#10264A] bg-[#F6F9FF] p-4 rounded-2xl border border-slate-200">
                <li className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#061F46] shrink-0" />
                  <span>Social Security Number (SSN) or Individual Taxpayer ID (ITIN)</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#061F46] shrink-0" />
                  <span>Filing Status (Single, Married Filing Jointly, etc.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#061F46] shrink-0" />
                  <span>Exact Whole-Dollar Refund Amount shown on your Form 1040</span>
                </li>
              </ul>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://sa.www4.irs.gov/wmr/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold px-6 py-3 rounded-full text-sm shadow-gold transition-all"
                >
                  <span>Check IRS Federal Refund</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="https://www.irs.gov/payments/pay-your-taxes-by-debit-or-credit-card"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#061F46] border border-slate-300 font-bold px-5 py-3 rounded-full text-sm transition-colors"
                >
                  <span>IRS Direct Pay</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-[#061F46]">
                <Clock className="w-5 h-5 text-[#FFC400]" />
                <h3 className="text-lg font-extrabold font-heading">Typical IRS Processing Timelines</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#F6F9FF] border border-slate-200">
                  <div className="text-xs font-bold uppercase text-slate-500">E-File + Direct Deposit</div>
                  <div className="text-lg font-extrabold text-[#061F46] mt-1">10 – 21 Days</div>
                  <p className="text-xs text-slate-600 mt-1">Fastest IRS turnaround after e-file acceptance.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F6F9FF] border border-slate-200">
                  <div className="text-xs font-bold uppercase text-slate-500">ITIN / Paper Filing</div>
                  <div className="text-lg font-extrabold text-[#061F46] mt-1">6 – 12 Weeks</div>
                  <p className="text-xs text-slate-600 mt-1">Includes Form W-7 CAA processing with IRS Austin unit.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#061F46] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFC400]">
                <ShieldCheck className="w-4 h-4" />
                <span>Tax On Tracks Client Portal Tracking</span>
              </div>
              <h3 className="text-2xl font-extrabold font-heading">
                View Your E-File Status &amp; Return Summary
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Already filed with Tax On Tracks? Log in to your Client Portal to download your signed Form 1040 summary, view your IRS Submission ID, and check your exact refund amount.
              </p>
              <Link
                to="/portal"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold py-3.5 rounded-full text-sm shadow-gold transition-all"
              >
                <span>Go to Client Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-slate-400 text-center">
                Questions about a delayed refund? Call {BUSINESS_INFO.phone}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
