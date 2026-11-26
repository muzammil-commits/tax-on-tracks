import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DynamicIcon } from '../components/ServiceIcon';
import { Reveal } from '../components/Reveal';

export const ServicesPage: React.FC = () => {
  const { services, openConsultationModal } = useSite();
  const [query, setQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full bg-[#F6F9FF] text-[#10264A] min-h-screen">
      {/* Banner */}
      <section className="bg-[#061F46] text-white py-14 border-b-4 border-[#FFC400]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: 'Services' }]} variant="dark" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
                Our <span className="text-[#FFC400]">Tax &amp; Advisory</span> Services
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
                Explore all 9 specialized US and international tax services delivered by licensed Tax On Tracks CPAs, Enrolled Agents, and Certifying Acceptance Agents.
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white text-[#10264A] rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC400]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service, idx) => (
              <Reveal key={service.id} delayMs={idx * 45} className="h-full">
                <div className="group h-full bg-white rounded-3xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="relative h-44 overflow-hidden bg-[#061F46]">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061F46]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 w-11 h-11 rounded-xl bg-[#061F46] border-2 border-[#FFC400] text-[#FFC400] flex items-center justify-center shadow-lg">
                      <DynamicIcon name={service.iconName} className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h2 className="text-lg font-extrabold font-heading text-[#061F46] mb-2">
                        {service.title}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#061F46] hover:text-[#0A2D5B] border-b-2 border-[#FFC400] pb-0.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 text-[#E0AC00]" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => openConsultationModal(service.title)}
                        className="px-4 py-2 rounded-full bg-[#F6F9FF] hover:bg-[#FFC400] text-[#061F46] text-xs font-extrabold border border-slate-200 transition-colors"
                      >
                        Get Advice
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
