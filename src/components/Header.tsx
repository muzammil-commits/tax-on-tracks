import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Home,
  UserCheck,
  Briefcase,
  SearchCheck,
  MessageSquare,
  Lock,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/plutoData';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';
import { DynamicIcon } from './ServiceIcon';

export const Header: React.FC = () => {
  const { services } = useSite();
  const { currentUser } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Info Bar */}
      <div className="bg-[#061F46] text-white text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-3 sm:gap-5 overflow-hidden">
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-[#FFC400] transition-colors truncate"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFC400] shrink-0" />
              <span>{BUSINESS_INFO.email}</span>
            </a>
            <span className="text-white/25 hidden sm:inline">|</span>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-[#FFC400] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC400] shrink-0" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <span className="text-white/25 hidden lg:inline">|</span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-200 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#FFC400] shrink-0" />
              <span>{BUSINESS_INFO.address}</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <a
              href={BUSINESS_INFO.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-6 h-6 rounded-full bg-white text-[#061F46] hover:bg-[#FFC400] flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={BUSINESS_INFO.socialLinks.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="w-6 h-6 rounded-full bg-white text-[#061F46] hover:bg-[#FFC400] flex items-center justify-center transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href={BUSINESS_INFO.socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-6 h-6 rounded-full bg-white text-[#061F46] hover:bg-[#FFC400] flex items-center justify-center transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={BUSINESS_INFO.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-6 h-6 rounded-full bg-white text-[#061F46] hover:bg-[#FFC400] flex items-center justify-center transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={`bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b border-slate-100 ${
          scrolled ? 'shadow-header' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[74px] flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 group">
            <img
              src="/assets/logo.png"
              alt="PlutoTax Consulting & Advisory LLC"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/')
                  ? 'bg-[#FFC400] text-[#061F46] shadow-sm font-bold'
                  : 'text-[#10264A] hover:text-[#061F46] hover:bg-[#F6F9FF]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/about"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/about')
                  ? 'bg-[#FFC400] text-[#061F46] shadow-sm font-bold'
                  : 'text-[#10264A] hover:text-[#061F46] hover:bg-[#F6F9FF]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>About Us</span>
            </Link>

            {/* Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen((v) => !v)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/services')
                    ? 'bg-[#FFC400] text-[#061F46] shadow-sm font-bold'
                    : 'text-[#10264A] hover:text-[#061F46] hover:bg-[#F6F9FF]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-[540px] z-50 animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-card-hover border border-slate-200/80 p-4">
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#061F46]">
                        PlutoTax Specialized Services
                      </span>
                      <Link
                        to="/services"
                        className="text-xs font-bold text-[#0A2D5B] hover:text-[#FFC400] inline-flex items-center gap-1"
                      >
                        View All 9 <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {services.map((srv) => (
                        <Link
                          key={srv.id}
                          to={`/services/${srv.slug}`}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F6F9FF] transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#061F46] text-[#FFC400] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <DynamicIcon name={srv.iconName} className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#061F46] group-hover:text-[#0A2D5B] line-clamp-1">
                              {srv.title}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {srv.tagline}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/refund-status"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/refund-status')
                  ? 'bg-[#FFC400] text-[#061F46] shadow-sm font-bold'
                  : 'text-[#10264A] hover:text-[#061F46] hover:bg-[#F6F9FF]'
              }`}
            >
              <SearchCheck className="w-4 h-4" />
              <span>Refund Status</span>
            </Link>

            <Link
              to="/contact"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/contact')
                  ? 'bg-[#FFC400] text-[#061F46] shadow-sm font-bold'
                  : 'text-[#10264A] hover:text-[#061F46] hover:bg-[#F6F9FF]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </nav>

          {/* Portal CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/portal"
              className="hidden sm:inline-flex items-center gap-2 bg-[#061F46] hover:bg-[#0A2D5B] text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-[#FFC400]" />
              <span>{currentUser ? 'My Client Portal' : 'Client Portal'}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle Menu"
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-[#061F46] hover:bg-[#F6F9FF] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold ${
                isActive('/') ? 'bg-[#FFC400] text-[#061F46]' : 'text-[#10264A] hover:bg-[#F6F9FF]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/about"
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold ${
                isActive('/about') ? 'bg-[#FFC400] text-[#061F46]' : 'text-[#10264A] hover:bg-[#F6F9FF]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>About Us</span>
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setMobileServicesOpen((v) => !v)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                  isActive('/services') ? 'bg-[#FFC400] text-[#061F46]' : 'text-[#10264A] hover:bg-[#F6F9FF]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4" />
                  <span>Services ({services.length})</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 pr-2 py-1.5 space-y-1">
                  <Link
                    to="/services"
                    className="block px-3 py-2 rounded-lg text-xs font-extrabold text-[#061F46] bg-[#F6F9FF]"
                  >
                    All Services Overview →
                  </Link>
                  {services.map((srv) => (
                    <Link
                      key={srv.id}
                      to={`/services/${srv.slug}`}
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#F6F9FF] hover:text-[#061F46]"
                    >
                      {srv.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/refund-status"
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold ${
                isActive('/refund-status')
                  ? 'bg-[#FFC400] text-[#061F46]'
                  : 'text-[#10264A] hover:bg-[#F6F9FF]'
              }`}
            >
              <SearchCheck className="w-4 h-4" />
              <span>Refund Status</span>
            </Link>

            <Link
              to="/contact"
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold ${
                isActive('/contact')
                  ? 'bg-[#FFC400] text-[#061F46]'
                  : 'text-[#10264A] hover:bg-[#F6F9FF]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>

            <div className="pt-2 border-t border-slate-100">
              <Link
                to="/portal"
                className="w-full flex items-center justify-center gap-2 bg-[#061F46] text-white px-4 py-3 rounded-xl text-sm font-bold shadow-md"
              >
                <Lock className="w-4 h-4 text-[#FFC400]" />
                <span>{currentUser ? 'Open Client Portal' : 'Client Portal Login'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
