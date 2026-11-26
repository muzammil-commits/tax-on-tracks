import React, { useState, useEffect } from 'react';
import { Lock, LogOut, CheckCircle2, BarChart3, MessageSquare, Star, FileEdit, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AdminPage: React.FC = () => {
  const { isAdminAuthenticated, loginAdmin, logoutAdmin } = useAuth();
  const {
    services,
    testimonials,
    statistics,
    enquiries,
    updateStatistics,
    toggleTestimonialApproval,
    updateServiceDescription,
    updateEnquiryStatus,
    resetToDefaults,
  } = useSite();

  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'stats' | 'enquiries' | 'testimonials' | 'services'>('stats');
  const [notice, setNotice] = useState('');

  const [returnsFiled, setReturnsFiled] = useState(statistics.returnsFiled);
  const [refundsMaximized, setRefundsMaximized] = useState(statistics.refundsMaximized);
  const [clientSatisfaction, setClientSatisfaction] = useState(statistics.clientSatisfaction);
  const [isOwnerVerified, setIsOwnerVerified] = useState(statistics.isOwnerVerified);

  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const selectedService = services.find((s) => s.id === selectedServiceId);
  const [shortDesc, setShortDesc] = useState(selectedService?.shortDescription || '');
  const [fullDesc, setFullDesc] = useState(selectedService?.fullDescription || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedService) {
      setShortDesc(selectedService.shortDescription);
      setFullDesc(selectedService.fullDescription);
    }
  }, [selectedServiceId, services]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!loginAdmin(passcode)) {
      setError('Invalid Admin Passcode. Hint: pluto2025');
    }
  };

  return (
    <div className="w-full bg-[#F6F9FF] min-h-screen text-[#10264A]">
      <section className="bg-[#061F46] text-white py-12 border-b-4 border-[#FFC400]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Breadcrumbs items={[{ name: 'Admin Console' }]} variant="dark" />
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading">
              Tax On Tracks Management Console
            </h1>
          </div>
          {isAdminAuthenticated && (
            <button
              type="button"
              onClick={logoutAdmin}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-rose-600/80 text-white px-4 py-2 rounded-full text-xs font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin Mode</span>
            </button>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isAdminAuthenticated ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-card-hover border border-slate-200 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-[#061F46] text-[#FFC400] flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#061F46]">Authorized Personnel Only</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your administrative passcode to manage statistics, enquiries, and reviews.
              </p>
            </div>
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <input
                type="password"
                placeholder="Enter passcode (e.g. pluto2025)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-3 text-sm"
              />
              <button
                type="submit"
                className="w-full bg-[#061F46] hover:bg-[#0A2D5B] text-white font-extrabold py-3.5 rounded-full text-sm"
              >
                Unlock Admin Dashboard
              </button>
            </form>
            <p className="text-xs text-slate-400">
              Demo passcode: <code>pluto2025</code>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {notice && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{notice}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'stats', label: 'Statistics Validation', icon: BarChart3 },
                { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
                { id: 'testimonials', label: 'Testimonials', icon: Star },
                { id: 'services', label: 'Service Editor', icon: FileEdit },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id as typeof tab)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      tab === t.id
                        ? 'bg-[#061F46] text-[#FFC400] shadow-md'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {tab === 'stats' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateStatistics({ returnsFiled, refundsMaximized, clientSatisfaction, isOwnerVerified });
                  setNotice('Statistics synchronized across the website!');
                }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 max-w-2xl space-y-4"
              >
                <h2 className="text-xl font-extrabold text-[#061F46]">Homepage Statistics</h2>
                <input
                  type="text"
                  value={returnsFiled}
                  onChange={(e) => setReturnsFiled(e.target.value)}
                  className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
                <input
                  type="text"
                  value={refundsMaximized}
                  onChange={(e) => setRefundsMaximized(e.target.value)}
                  className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
                <input
                  type="text"
                  value={clientSatisfaction}
                  onChange={(e) => setClientSatisfaction(e.target.value)}
                  className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
                <label className="flex items-center gap-2 text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={isOwnerVerified}
                    onChange={(e) => setIsOwnerVerified(e.target.checked)}
                  />
                  <span>Mark as Business-Owner Verified</span>
                </label>
                <button
                  type="submit"
                  className="bg-[#061F46] text-white px-6 py-3 rounded-full text-xs font-extrabold"
                >
                  Save Statistics
                </button>
              </form>
            )}

            {tab === 'enquiries' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
                <h2 className="text-xl font-extrabold text-[#061F46]">Consultation Enquiries</h2>
                {enquiries.length === 0 ? (
                  <p className="text-sm text-slate-500">No enquiries submitted yet.</p>
                ) : (
                  enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-4 rounded-2xl bg-[#F6F9FF] border border-slate-200 flex flex-col sm:flex-row justify-between gap-4"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="font-extrabold text-sm text-[#061F46]">
                          {enq.fullName} ({enq.status.toUpperCase()})
                        </div>
                        <div>{enq.email} • {enq.phone} • {enq.serviceRequired}</div>
                        <p className="text-slate-700 italic">"{enq.message}"</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateEnquiryStatus(enq.id, 'contacted')}
                          className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold"
                        >
                          Contacted
                        </button>
                        <button
                          type="button"
                          onClick={() => updateEnquiryStatus(enq.id, 'resolved')}
                          className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold"
                        >
                          Resolved
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === 'testimonials' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
                <h2 className="text-xl font-extrabold text-[#061F46]">Testimonials Approval</h2>
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl bg-[#F6F9FF] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="text-xs space-y-1">
                      <div className="font-extrabold text-sm text-[#061F46]">{t.name}</div>
                      <p className="italic text-slate-600">"{t.content}"</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleTestimonialApproval(t.id)}
                      className="px-4 py-2 rounded-full bg-[#061F46] text-white text-xs font-bold shrink-0"
                    >
                      {t.isApproved ? 'Unpublish' : 'Approve & Publish'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {tab === 'services' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateServiceDescription(selectedServiceId, shortDesc, fullDesc);
                  setNotice('Service content updated!');
                }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 max-w-3xl space-y-4"
              >
                <h2 className="text-xl font-extrabold text-[#061F46]">Service Content Editor</h2>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <textarea
                  rows={3}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
                <textarea
                  rows={5}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
                <button
                  type="submit"
                  className="bg-[#061F46] text-white px-6 py-3 rounded-full text-xs font-extrabold"
                >
                  Save Service Text
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  resetToDefaults();
                  setNotice('Site data reset to defaults.');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
