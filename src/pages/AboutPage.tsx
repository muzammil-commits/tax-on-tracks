import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { BUSINESS_INFO, CORE_VALUES } from '../data/plutoData';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DynamicIcon } from '../components/ServiceIcon';
import { Reveal } from '../components/Reveal';

export const AboutPage: React.FC = () => {
  const { openConsultationModal } = useSite();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white text-[#10264A]">
      {/* Hero Banner */}
      <section className="bg-[#061F46] text-white py-14 sm:py-18 border-b-4 border-[#FFC400]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Breadcrumbs items={[{ name: 'About Us' }]} variant="dark" />
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            About <span className="text-[#FFC400]">PlutoTax</span> Consulting &amp; Advisory
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {BUSINESS_INFO.tagline}. Headquartered in Austin, Texas, serving individuals, visa holders, NRIs, and businesses across all 50 US states and globally.
          </p>
        </div>
      </section>

      {/* Split Story Section */}
      <section className="py-16 bg-[#F6F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-card border border-slate-200 bg-white">
            <img
              src="/assets/about-bg.png"
              alt="PlutoTax Advisory Practice"
              className="w-full h-72 sm:h-96 object-cover object-left"
            />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#E0AC00]">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#061F46]">
              Precision US &amp; Cross-Border Tax Advisory
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Founded on the principles of regulatory precision and proactive wealth preservation, PlutoTax Consulting &amp; Advisory LLC bridges the gap between standard tax preparation and executive-level financial strategy.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our team of licensed Certified Public Accountants (CPAs), Enrolled Agents (EAs), and IRS Certifying Acceptance Agents (CAAs) handles everything from Form 1040/1040-NR and multi-state corporate returns to FBAR, FATCA, and US-India DTAA optimization.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'IRS Authorized e-file Provider',
                'Certifying Acceptance Agent (CAA)',
                'Circular 230 & IRC § 7216 Compliant',
                '256-Bit AES Encrypted Client Portal',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-bold text-[#061F46]">
                  <CheckCircle2 className="w-5 h-5 text-[#FFC400] fill-[#061F46] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openConsultationModal()}
                className="inline-flex items-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold px-6 py-3 rounded-full text-sm shadow-gold transition-all"
              >
                <span>Schedule Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-[#061F46] hover:bg-[#0A2D5B] text-white font-bold px-6 py-3 rounded-full text-sm transition-all"
              >
                <span>Explore All 9 Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#061F46]">
              Our Core Values
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              The ethical and professional standards behind every return we file.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <Reveal key={val.title} delayMs={idx * 50}>
                <div className="bg-[#F6F9FF] rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-card transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#061F46] text-[#FFC400] flex items-center justify-center mb-4">
                    <DynamicIcon name={val.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold font-heading text-[#061F46] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{val.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Austin HQ Strip */}
      <section className="py-12 bg-[#061F46] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFC400]">
              <ShieldCheck className="w-4 h-4" />
              <span>Corporate Headquarters</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading">
              {BUSINESS_INFO.name}
            </h3>
            <p className="text-sm text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FFC400] shrink-0" />
              <span>{BUSINESS_INFO.address}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full font-semibold"
            >
              <Phone className="w-4 h-4 text-[#FFC400]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full font-semibold"
            >
              <Mail className="w-4 h-4 text-[#FFC400]" />
              <span>{BUSINESS_INFO.email}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
