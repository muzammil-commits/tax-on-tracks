import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Linkedin, Twitter, Facebook, Instagram, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/plutoData';
import { useSite } from '../context/SiteContext';

export const Footer: React.FC = () => {
  const { services } = useSite();

  return (
    <footer className="relative bg-[#061F46] text-white overflow-hidden">
      {/* Decorative curved golden & navy wave accent on bottom right, matching reference */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-[420px] h-[220px] opacity-90">
        <svg viewBox="0 0 420 220" fill="none" className="w-full h-full">
          <path d="M40 220 C160 190 280 90 420 10 L420 220 Z" fill="#FFC400" />
          <path d="M90 220 C200 195 310 115 420 42 L420 220 Z" fill="#0A2D5B" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/15">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/assets/logo-white.png"
                alt="PlutoTax Consulting & Advisory LLC"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {BUSINESS_INFO.tagline}. IRS Authorized e-file Provider &amp; Certifying Acceptance Agent (CAA) serving US &amp; international taxpayers.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-[#FFC400]/30 text-xs text-[#FFC400] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>IRS Section 7216 &amp; Circular 230 Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-slate-300">
              <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[#FFC400] transition-colors">
                <ChevronRight className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>Home</span>
              </Link>
              <Link to="/services" className="inline-flex items-center gap-1.5 hover:text-[#FFC400] transition-colors">
                <ChevronRight className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>All Services</span>
              </Link>
              <Link to="/about" className="inline-flex items-center gap-1.5 hover:text-[#FFC400] transition-colors">
                <ChevronRight className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>About Us</span>
              </Link>
              <Link to="/refund-status" className="inline-flex items-center gap-1.5 hover:text-[#FFC400] transition-colors">
                <ChevronRight className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>Refund Status</span>
              </Link>
              <Link to="/portal" className="inline-flex items-center gap-1.5 hover:text-[#FFC400] transition-colors">
                <ChevronRight className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>Client Portal</span>
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-1.5 hover:text-[#FFC400] transition-colors">
                <ChevronRight className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>Contact Us</span>
              </Link>
              {services.slice(0, 2).map((s) => (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#FFC400] transition-colors truncate"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#FFC400] shrink-0" />
                  <span className="truncate">{s.title.split(' ')[0]} {s.title.split(' ')[1]}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Follow Us & Contact */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Follow Us</h3>
            <div className="flex items-center gap-3">
              <a
                href={BUSINESS_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white text-[#061F46] hover:bg-[#FFC400] flex items-center justify-center transition-colors shadow"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white text-[#061F46] hover:bg-[#FFC400] flex items-center justify-center transition-colors shadow"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white text-[#061F46] hover:bg-[#FFC400] flex items-center justify-center transition-colors shadow"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white text-[#061F46] hover:bg-[#FFC400] flex items-center justify-center transition-colors shadow"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <div className="text-xs text-slate-300 space-y-1 pt-2">
              <p className="font-semibold text-white">{BUSINESS_INFO.address}</p>
              <p>{BUSINESS_INFO.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p>&copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-[#FFC400] transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms-and-conditions" className="hover:text-[#FFC400] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>|</span>
            <Link to="/security" className="hover:text-[#FFC400] transition-colors">
              Data Security
            </Link>
            <span>|</span>
            <Link to="/admin" className="hover:text-[#FFC400] transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
