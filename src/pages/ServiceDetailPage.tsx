import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  FileText,
  ArrowRight,
  ChevronDown,
  Lock,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DynamicIcon } from '../components/ServiceIcon';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { services, openConsultationModal } = useSite();
  const { currentUser } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenFaq(0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#F6F9FF]">
        <h1 className="text-2xl font-extrabold text-[#061F46] mb-2">Service Not Found</h1>
        <p className="text-sm text-slate-600 mb-6">
          The requested service page could not be found.
        </p>
        <Link
          to="/services"
          className="bg-[#061F46] text-white px-6 py-3 rounded-full text-sm font-bold"
        >
          Browse All Services
        </Link>
      </div>
    );
  }

  const related = services.filter((s) => service.relatedServices.includes(s.id));

  const handleGetStarted = () => {
    navigate(`/portal?service=${encodeURIComponent(service.slug)}&tab=request`);
  };

  return (
    <div className="w-full bg-[#F6F9FF] text-[#10264A]">
      {/* Hero Banner */}
      <section className="relative bg-[#061F46] text-white overflow-hidden border-b-4 border-[#FFC400]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${service.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061F46] via-[#061F46]/90 to-[#061F46]/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 space-y-5">
          <Breadcrumbs
            items={[{ name: 'Services', to: '/services' }, { name: service.title }]}
            variant="dark"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#FFC400]/40 text-[#FFC400] text-xs font-bold">
                <DynamicIcon name={service.iconName} className="w-4 h-4" />
                <span>Tax On Tracks Specialized Service</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-200 max-w-2xl">{service.tagline}</p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="inline-flex items-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold px-6 py-3.5 rounded-full text-sm shadow-gold transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {currentUser ? 'Apply Now in Client Portal' : 'Get Started (Client Portal)'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openConsultationModal(service.title)}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold px-5 py-3.5 rounded-full text-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-[#FFC400]" />
                  <span>Free Consultation</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-3xl overflow-hidden border-2 border-[#FFC400]/50 shadow-2xl">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#061F46]">
                Service Overview &amp; Scope
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Who Needs This & Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
                <h3 className="text-lg font-extrabold font-heading text-[#061F46]">
                  Who Needs This (Eligibility)
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {service.whoNeedsThis.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#061F46] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
                <h3 className="text-lg font-extrabold font-heading text-[#061F46]">
                  Key Benefits
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {service.keyBenefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC400] fill-[#061F46] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-5">
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#061F46]">
                Step-by-Step Process
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.processSteps.map((st) => (
                  <div
                    key={st.step}
                    className="p-4 rounded-2xl bg-[#F6F9FF] border border-slate-200 space-y-1.5"
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FFC400] text-[#061F46] font-black text-xs">
                      {st.step}
                    </span>
                    <h4 className="text-sm font-extrabold text-[#061F46]">{st.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{st.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#061F46]">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 overflow-hidden bg-[#F6F9FF]/50"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-3 p-4 text-left font-bold text-sm text-[#061F46]"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Required Documents */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-[#061F46]">
                <FileText className="w-5 h-5 text-[#FFC400]" />
                <h3 className="text-lg font-extrabold font-heading">Required Documents</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                {service.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400] mt-2 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Portal CTA Card */}
            <div className="bg-[#061F46] text-white rounded-3xl p-6 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFC400]">
                <ShieldCheck className="w-4 h-4" />
                <span>256-Bit Encrypted Workflow</span>
              </div>
              <h3 className="text-xl font-extrabold font-heading">
                Ready to File or Apply?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Start this service directly in your Tax On Tracks Client Portal to upload documents and connect with your assigned CPA.
              </p>
              <button
                type="button"
                onClick={handleGetStarted}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold py-3 rounded-full text-sm shadow-gold transition-all"
              >
                <span>Apply Now in Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => openConsultationModal(service.title)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded-full text-xs transition-colors"
              >
                Ask a CPA Question First
              </button>
            </div>

            {/* Related Services */}
            {related.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
                <h3 className="text-base font-extrabold font-heading text-[#061F46]">
                  Related Services
                </h3>
                <div className="space-y-2">
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/services/${rel.slug}`}
                      className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#F6F9FF] hover:bg-[#FFC400]/15 border border-slate-200/70 transition-colors group"
                    >
                      <span className="text-xs font-bold text-[#061F46]">{rel.title}</span>
                      <ArrowRight className="w-4 h-4 text-[#061F46] group-hover:translate-x-1 transition-transform shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
};
