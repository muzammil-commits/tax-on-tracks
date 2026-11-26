import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, TestimonialItem, SiteStatistics, EnquiryItem } from '../types';
import { SERVICES_DATA, TESTIMONIALS_DATA, DEFAULT_STATS } from '../data/plutoData';

const STORAGE_KEYS = {
  SERVICES: 'plutotax_services_v2',
  TESTIMONIALS: 'plutotax_testimonials_v1',
  STATS: 'plutotax_stats_v1',
  ENQUIRIES: 'plutotax_enquiries_v1',
};

interface SiteContextType {
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  statistics: SiteStatistics;
  enquiries: EnquiryItem[];
  isConsultationModalOpen: boolean;
  preselectedService: string;
  openConsultationModal: (serviceName?: string) => void;
  closeConsultationModal: () => void;
  addEnquiry: (enquiry: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>) => void;
  updateStatistics: (stats: Partial<SiteStatistics>) => void;
  toggleTestimonialApproval: (id: string) => void;
  updateServiceDescription: (id: string, shortDesc: string, fullDesc: string) => void;
  updateEnquiryStatus: (id: string, status: 'new' | 'contacted' | 'resolved') => void;
  resetToDefaults: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (saved) {
      try {
        const parsed: ServiceItem[] = JSON.parse(saved);
        return SERVICES_DATA.map((def) => {
          const found = parsed.find((p) => p.id === def.id);
          return found ? { ...found, heroImage: def.heroImage } : def;
        });
      } catch {
        return SERVICES_DATA;
      }
    }
    return SERVICES_DATA;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return saved ? JSON.parse(saved) : TESTIMONIALS_DATA;
  });

  const [statistics, setStatistics] = useState<SiteStatistics>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : DEFAULT_STATS;
  });

  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    return saved ? JSON.parse(saved) : [];
  });

  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(statistics));
  }, [statistics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  const openConsultationModal = (serviceName?: string) => {
    if (serviceName) setPreselectedService(serviceName);
    setIsConsultationModalOpen(true);
  };

  const closeConsultationModal = () => {
    setIsConsultationModalOpen(false);
    setPreselectedService('');
  };

  const addEnquiry = (enquiry: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>) => {
    const item: EnquiryItem = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setEnquiries((prev) => [item, ...prev]);
  };

  const updateStatistics = (stats: Partial<SiteStatistics>) => {
    setStatistics((prev) => ({ ...prev, ...stats }));
  };

  const toggleTestimonialApproval = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isApproved: !t.isApproved } : t))
    );
  };

  const updateServiceDescription = (id: string, shortDesc: string, fullDesc: string) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, shortDescription: shortDesc, fullDescription: fullDesc } : s
      )
    );
  };

  const updateEnquiryStatus = (id: string, status: 'new' | 'contacted' | 'resolved') => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const resetToDefaults = () => {
    setServices(SERVICES_DATA);
    setTestimonials(TESTIMONIALS_DATA);
    setStatistics(DEFAULT_STATS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.STATS);
  };

  return (
    <SiteContext.Provider
      value={{
        services,
        testimonials,
        statistics,
        enquiries,
        isConsultationModalOpen,
        preselectedService,
        openConsultationModal,
        closeConsultationModal,
        addEnquiry,
        updateStatistics,
        toggleTestimonialApproval,
        updateServiceDescription,
        updateEnquiryStatus,
        resetToDefaults,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within a SiteProvider');
  return ctx;
};
