export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  iconName: string;
  whoNeedsThis: string[];
  keyBenefits: string[];
  processSteps: ProcessStep[];
  requiredDocuments: string[];
  faqs: FAQItem[];
  relatedServices: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  isApproved: boolean;
  serviceCategory: string;
}

export interface SiteStatistics {
  returnsFiled: string;
  refundsMaximized: string;
  clientSatisfaction: string;
  isOwnerVerified: boolean;
  notes: string;
}

export interface EnquiryItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  preferredContact: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface ClientDocument {
  id: string;
  name: string;
  category: string;
  uploadDate: string;
  size: string;
  status: string;
}

export interface ClientMessage {
  id: string;
  sender: 'client' | 'cpa';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ServiceRequestItem {
  id: string;
  serviceId: string;
  serviceTitle: string;
  taxYear: string;
  filingStatus: string;
  notes: string;
  status: 'Submitted' | 'Under Review' | 'Pending Documents' | 'In Progress' | 'Completed';
  requestDate: string;
  assignedCpa: string;
}

export interface PortalNotification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  targetTab?: string;
}

export interface ClientUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  country?: string;
  taxYear: string;
  filingStatus: string;
  progressPercent: number;
  documents: ClientDocument[];
  messages: ClientMessage[];
  serviceRequests?: ServiceRequestItem[];
  notifications?: PortalNotification[];
}
