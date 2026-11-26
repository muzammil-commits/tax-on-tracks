import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/plutoData';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ContactPage: React.FC = () => {
  const { services, addEnquiry } = useSite();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceRequired, setServiceRequired] = useState(services[0]?.title || '');
  const [preferredContact, setPreferredContact] = useState('Phone / WhatsApp');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      fullName,
      email,
      phone,
      serviceRequired,
      preferredContact,
      message,
    });
    setSubmitted(true);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="w-full bg-[#F6F9FF] text-[#10264A] min-h-screen">
      <section className="bg-[#061F46] text-white py-14 border-b-4 border-[#FFC400]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Breadcrumbs items={[{ name: 'Contact Us' }]} variant="dark" />
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Contact <span className="text-[#FFC400]">Tax On Tracks</span> Advisory
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Reach our Austin headquarters by phone, WhatsApp, email, or submit an enquiry below for a response from a licensed CPA.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#061F46] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h2 className="text-xl font-extrabold font-heading text-[#FFC400]">
                  Austin Corporate Headquarters
                </h2>
                <p className="text-xs text-slate-300 mt-1">{BUSINESS_INFO.name}</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FFC400] shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.address}</span>
                </div>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center gap-3 hover:text-[#FFC400] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#FFC400] shrink-0" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-3 hover:text-[#FFC400] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#FFC400] shrink-0" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
                <div className="flex items-start gap-3 text-slate-300">
                  <Clock className="w-5 h-5 text-[#FFC400] shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.workingHours}</span>
                </div>
              </div>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold py-3 rounded-full text-sm shadow-gold transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
            <h2 className="text-2xl font-extrabold font-heading text-[#061F46] mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              All enquiries are routed directly to our CPA intake team.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your consultation enquiry has been received. A CPA will contact you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ananya Sharma"
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (512) 555-0198"
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                    Preferred Contact
                  </label>
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value)}
                    className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
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
                  className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
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
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your tax filing or advisory needs..."
                  className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#061F46]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#061F46] hover:bg-[#0A2D5B] text-white font-extrabold py-3.5 rounded-full text-sm shadow-md transition-all"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
