import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, CalendarCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const ConsultationModal: React.FC = () => {
  const {
    isConsultationModalOpen,
    preselectedService,
    closeConsultationModal,
    services,
    addEnquiry,
  } = useSite();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceRequired, setServiceRequired] = useState('');
  const [preferredContact, setPreferredContact] = useState('Phone / WhatsApp');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setServiceRequired(preselectedService);
    } else if (services.length > 0 && !serviceRequired) {
      setServiceRequired(services[0].title);
    }
  }, [preselectedService, services]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isConsultationModalOpen) closeConsultationModal();
    };
    if (isConsultationModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isConsultationModalOpen, closeConsultationModal]);

  if (!isConsultationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      fullName,
      email,
      phone,
      serviceRequired: serviceRequired || services[0]?.title || 'Tax Consultation',
      preferredContact,
      message,
    });
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    closeConsultationModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#061F46]/65 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-white rounded-3xl w-[calc(100%-16px)] sm:max-w-[580px] max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#061F46] text-white px-6 py-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFC400] text-[#061F46] flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold font-heading">
                Free Tax Consultation
              </h3>
              <p className="text-xs text-slate-300">
                Speak with a licensed PlutoTax CPA or Enrolled Agent
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-extrabold text-[#061F46] font-heading">
                Consultation Request Received!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong>{fullName}</strong>. A PlutoTax advisor will reach out via{' '}
                <strong>{preferredContact}</strong> within 1 business day regarding{' '}
                <strong>{serviceRequired}</strong>.
              </p>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="bg-[#061F46] hover:bg-[#0A2D5B] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ananya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#10264A] focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#10264A] focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (512) 555-0198"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#10264A] focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                    Preferred Contact
                  </label>
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#10264A] focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                  >
                    <option value="Phone / WhatsApp">Phone / WhatsApp</option>
                    <option value="Email">Email</option>
                    <option value="Zoom Video Call">Zoom Video Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                  Service Required
                </label>
                <select
                  value={serviceRequired}
                  onChange={(e) => setServiceRequired(e.target.value)}
                  className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#10264A] focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                  How Can We Help? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly describe your tax situation (e.g., H-1B filing, FBAR, RSU 1099-B, Indian property sale, LLC S-Corp)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#10264A] focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protected under IRS Section 7216 strict client confidentiality.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold py-3.5 rounded-full text-sm shadow-gold transition-all hover:scale-[1.01]"
              >
                Request Free Expert Consultation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
