import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Users,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Star,
  Phone,
  Mail,
  TrendingUp,
  Award,
  Lock,
} from 'lucide-react';
import { BUSINESS_INFO, PROCESS_STEPS } from '../data/plutoData';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';
import { DynamicIcon } from '../components/ServiceIcon';
import { Reveal } from '../components/Reveal';
import { RefundEstimatorModal } from '../components/RefundEstimatorModal';

export const HomePage: React.FC = () => {
  const { services, testimonials, statistics, openConsultationModal } = useSite();
  const { currentUser } = useAuth();
  const approvedTestimonials = testimonials.filter((t) => t.isApproved);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [estimatorOpen, setEstimatorOpen] = useState(false);

  const currentReview =
    approvedTestimonials[activeTestimonial] || approvedTestimonials[0];

  const handlePrevReview = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? Math.max(0, approvedTestimonials.length - 1) : prev - 1
    );
  };

  const handleNextReview = () => {
    setActiveTestimonial((prev) =>
      prev >= approvedTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full bg-white text-[#10264A]">
      {/* 1. HERO SECTION — exact composition from image.png & image copy.png */}
      <section className="relative overflow-hidden bg-[#F6F9FF]">
        {/* Desktop Background Image (image copy 2.png) */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/hero-desktop-bg.png')" }}
        />
        {/* Mobile Background Image (image copy 3.png) */}
        <div
          className="md:hidden absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/assets/hero-mobile-bg.png')" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-64 sm:pb-72 md:py-20 lg:py-24">
          <div className="max-w-lg lg:max-w-xl space-y-5 animate-fade-up">
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold font-heading leading-[1.12] tracking-tight text-[#061F46]">
              Smart Tax Solutions <br />
              for a <span className="text-[#FFC400]">Secure Tomorrow</span>
            </h1>

            <p className="text-sm sm:text-base text-[#10264A]/90 leading-relaxed max-w-md font-medium">
              At PlutoTax Consulting &amp; Advisory LLC, we simplify your US and cross-border tax journey with expert CPA guidance, FBAR/FATCA compliance, and hassle-free e-filing.
            </p>

            {/* Primary Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => openConsultationModal()}
                className="inline-flex items-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold px-6 py-3 rounded-full text-sm shadow-gold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Expert Advice</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/portal"
                className="inline-flex items-center gap-2 bg-white/95 hover:bg-[#061F46] text-[#061F46] hover:text-white border-2 border-[#061F46] font-bold px-5 py-2.5 rounded-full text-sm shadow-sm transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>{currentUser ? 'Open Portal' : 'Client Portal'}</span>
              </Link>

              <button
                type="button"
                onClick={() => setEstimatorOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#061F46] hover:text-[#0A2D5B] underline underline-offset-4 px-1 py-2"
              >
                <Calculator className="w-3.5 h-3.5 text-[#E0AC00]" />
                <span>Refund Estimator</span>
              </button>
            </div>

            {/* Trust Metrics Strip */}
            <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 pr-4 border-r border-slate-300/80">
                <div className="w-8 h-8 rounded-full bg-[#FFC400]/25 text-[#061F46] flex items-center justify-center">
                  <Award className="w-4 h-4 text-[#E0AC00]" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-[#061F46] leading-tight">
                    {statistics.returnsFiled}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600">Returns Filed</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pr-4 border-r border-slate-300/80">
                <div className="w-8 h-8 rounded-full bg-[#FFC400]/25 text-[#061F46] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#E0AC00]" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-[#061F46] leading-tight">
                    {statistics.refundsMaximized}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600">Refunds Maximized</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#FFC400]/25 text-[#061F46] flex items-center justify-center">
                  <Star className="w-4 h-4 text-[#FFC400] fill-[#FFC400]" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-[#061F46] leading-tight">
                    {statistics.clientSatisfaction}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600">Client Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR SERVICES SECTION */}
      <section className="py-14 sm:py-18 bg-[#F6F9FF] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#FFC400]" />
                <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#061F46]">
                  Our Services
                </h2>
                <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#FFC400]" />
              </div>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Comprehensive US &amp; International Taxation Services Under One Roof
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {services.map((service, idx) => (
              <Reveal key={service.id} delayMs={idx * 40} className="h-full">
                <Link
                  to={`/services/${service.slug}`}
                  className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-28 w-full overflow-hidden bg-[#061F46]">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061F46]/80 via-[#061F46]/20 to-transparent" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#061F46] border-2 border-[#FFC400] text-[#FFC400] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <DynamicIcon name={service.iconName} className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-4 pt-3 flex-1 flex flex-col justify-between text-center">
                    <div>
                      <h3 className="text-[15px] font-extrabold font-heading text-[#061F46] group-hover:text-[#0A2D5B] leading-snug mb-1.5">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#061F46] border-b-2 border-[#FFC400] pb-0.5">
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#E0AC00] group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION (uses image copy 5.png as section bg) */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="hidden lg:block absolute inset-0 bg-cover bg-left bg-no-repeat"
          style={{ backgroundImage: "url('/assets/about-bg.png')" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:hidden rounded-3xl overflow-hidden shadow-card border border-slate-200">
              <img
                src="/assets/about-bg.png"
                alt="PlutoTax Trusted Tax Partner"
                className="w-full h-56 sm:h-72 object-cover object-left"
              />
            </div>

            <div className="hidden lg:block lg:col-span-5" />

            <div className="lg:col-span-7 space-y-5">
              <Reveal>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                  <div className="space-y-2.5 flex-1">
                    <span className="text-sm font-extrabold uppercase tracking-wider text-[#E0AC00]">
                      About PlutoTax
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#061F46]">
                      Your Trusted Tax Partner
                    </h2>
                    <p className="text-sm sm:text-base text-[#10264A]/85 leading-relaxed">
                      PlutoTax Consulting &amp; Advisory LLC is a trusted US &amp; international tax advisory firm, committed to simplifying taxation for individuals, visa holders, NRIs, and businesses with transparent guidance and timely support.
                    </p>
                  </div>

                  {/* Trusted Tax Partner Seal Badge */}
                  <div className="shrink-0 hidden sm:flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-[#061F46] to-[#0A2D5B] border-4 border-[#FFC400] text-center p-3 shadow-xl">
                    <Award className="w-6 h-6 text-[#FFC400] mb-1" />
                    <div className="text-xs font-extrabold text-white leading-tight">
                      Trusted Tax Partner
                    </div>
                    <div className="flex items-center gap-0.5 mt-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 text-[#FFC400] fill-[#FFC400]" />
                      ))}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 pt-2 text-sm font-semibold text-[#10264A]">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#FFC400] fill-[#061F46] shrink-0" />
                    <span>Expert &amp; Experienced CPA / EA Team</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#FFC400] fill-[#061F46] shrink-0" />
                    <span>Transparent &amp; Reliable Service</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#FFC400] fill-[#061F46] shrink-0" />
                    <span>US-India DTAA, FBAR &amp; ITIN CAA Solutions</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#FFC400] fill-[#061F46] shrink-0" />
                    <span>Dedicated 256-Bit Encrypted Client Portal</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold px-6 py-3 rounded-full text-sm shadow-gold transition-all hover:scale-[1.02]"
                  >
                    <span>Know More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US? NAVY STRIP WITH CURVED GOLD/WHITE DIVIDERS */}
      <section className="relative bg-[#061F46] text-white py-14 sm:py-16 overflow-hidden">
        {/* Top subtle golden curved accent */}
        <div className="pointer-events-none absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-[#061F46] via-[#FFC400] to-[#061F46] opacity-90" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 space-y-1.5 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Why Choose Us?
              </h2>
              <p className="text-sm font-bold text-[#FFC400]">Because Your Trust Matters</p>
              <div className="w-20 h-0.5 bg-[#FFC400] mx-auto md:mx-0 mt-2" />
            </div>

            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 md:divide-x md:divide-white/25">
              <div className="flex flex-col items-center text-center px-2 space-y-2">
                <ShieldCheck className="w-8 h-8 text-[#FFC400]" />
                <div className="text-xs sm:text-sm font-bold leading-snug">
                  100% Compliance Assurance
                </div>
              </div>
              <div className="flex flex-col items-center text-center px-2 space-y-2">
                <Clock className="w-8 h-8 text-[#FFC400]" />
                <div className="text-xs sm:text-sm font-bold leading-snug">
                  On-Time Service
                </div>
              </div>
              <div className="flex flex-col items-center text-center px-2 space-y-2">
                <Users className="w-8 h-8 text-[#FFC400]" />
                <div className="text-xs sm:text-sm font-bold leading-snug">
                  Expert Professionals
                </div>
              </div>
              <div className="flex flex-col items-center text-center px-2 space-y-2">
                <Headphones className="w-8 h-8 text-[#FFC400]" />
                <div className="text-xs sm:text-sm font-bold leading-snug">
                  Client Focused Approach
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom curved golden/white wave */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 36" fill="none" className="w-full h-5 sm:h-7" preserveAspectRatio="none">
            <path d="M0 10 C360 36 1080 0 1440 20 L1440 36 L0 36 Z" fill="#FFC400" />
            <path d="M0 18 C360 40 1080 6 1440 26 L1440 36 L0 36 Z" fill="#F6F9FF" />
          </svg>
        </div>
      </section>

      {/* 5. OUR PROCESS SECTION — matching horizontal numbered flow in image.png */}
      <section className="py-14 sm:py-16 bg-[#F6F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#FFC400]" />
                <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#061F46]">
                  Our Process
                </h2>
                <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#FFC400]" />
              </div>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Simple Steps, Hassle-Free Experience
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-2 text-center lg:text-left">
              <p className="font-serif italic text-xl sm:text-2xl text-[#061F46] leading-snug">
                Easy. Reliable. <br className="hidden lg:block" />
                Professional.
              </p>
            </div>

            <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROCESS_STEPS.map((step, idx) => (
                <Reveal key={step.stepNumber} delayMs={idx * 60}>
                  <div className="relative flex flex-col items-center text-center px-2">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className="w-10 h-10 rounded-full bg-[#FFC400] text-[#061F46] font-black text-sm flex items-center justify-center shadow-md">
                        {step.stepNumber}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-white text-[#061F46] flex items-center justify-center border border-slate-200 shadow-sm">
                        <DynamicIcon name={step.icon} className="w-5 h-5" />
                      </div>
                      {idx < PROCESS_STEPS.length - 1 && (
                        <ArrowRight className="hidden lg:block w-5 h-5 text-[#FFC400] ml-1" />
                      )}
                    </div>
                    <h3 className="text-sm font-extrabold font-heading text-[#061F46] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-[220px]">
                      {step.subtitle}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT OUR CLIENTS SAY (TESTIMONIAL CAROUSEL) */}
      {currentReview && (
        <section className="py-12 sm:py-14 bg-gradient-to-b from-[#F6F9FF] to-white border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-3 space-y-1 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#061F46]">
                  What Our Clients Say
                </h2>
                <p className="text-sm font-semibold text-slate-500">Trusted by Thousands</p>
              </div>

              <div className="lg:col-span-9 flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handlePrevReview}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] flex items-center justify-center shadow-md shrink-0 transition-transform hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex-1 bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-card flex flex-col sm:flex-row items-center gap-5">
                  <img
                    src={currentReview.avatar}
                    alt={currentReview.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#FFC400] shadow-md shrink-0"
                  />
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="flex items-center justify-center sm:justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A2D5B] bg-[#F6F9FF] px-2.5 py-0.5 rounded-full border border-slate-200">
                        {currentReview.serviceCategory}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: currentReview.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#FFC400] fill-[#FFC400]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#10264A] italic leading-relaxed">
                      &ldquo;{currentReview.content}&rdquo;
                    </p>
                    <div className="text-xs sm:text-sm font-extrabold text-[#061F46]">
                      — {currentReview.name}{' '}
                      <span className="font-medium text-slate-500">
                        ({currentReview.role})
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextReview}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] flex items-center justify-center shadow-md shrink-0 transition-transform hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-5">
              {approvedTestimonials.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`View review ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === activeTestimonial ? 'w-7 bg-[#061F46]' : 'w-2.5 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. LET'S GET STARTED TODAY CTA BAND */}
      <section className="relative bg-[#0A2D5B] text-white py-10 border-t-4 border-[#FFC400]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/10 border border-[#FFC400]/40 text-[#FFC400] items-center justify-center shrink-0">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#FFC400]">
                Let&apos;s Get Started Today!
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
                Get expert tax assistance and keep your finances on track.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold px-6 py-3 rounded-full text-sm shadow-gold transition-all hover:scale-[1.02]"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-xs sm:text-sm space-y-1">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center gap-2 text-white hover:text-[#FFC400] transition-colors font-semibold"
              >
                <Phone className="w-4 h-4 text-[#FFC400]" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2 text-slate-200 hover:text-[#FFC400] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FFC400]" />
                <span>{BUSINESS_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <RefundEstimatorModal isOpen={estimatorOpen} onClose={() => setEstimatorOpen(false)} />
    </div>
  );
};
