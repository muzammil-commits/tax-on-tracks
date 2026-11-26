import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClientUser, ClientDocument, ServiceRequestItem, PortalNotification } from '../types';

const DEFAULT_CLIENT_USER: ClientUser = {
  id: 'usr-101',
  email: 'client@example.com',
  name: 'Srikanth Srikanth',
  phone: '+1 (512) 555-0198',
  country: 'United States',
  taxYear: '2024 / 2025',
  filingStatus: 'CPA Review',
  progressPercent: 65,
  documents: [
    {
      id: 'doc-1',
      name: 'Form_W2_Google_2024.pdf',
      category: 'W-2',
      uploadDate: '2025-02-10',
      size: '1.4 MB',
      status: 'Verified',
    },
    {
      id: 'doc-2',
      name: 'Form_1099_Morgan_Stanley_RSU.pdf',
      category: '1099',
      uploadDate: '2025-02-12',
      size: '2.1 MB',
      status: 'Verified',
    },
    {
      id: 'doc-3',
      name: 'HDFC_NRE_NRO_Bank_Statements_2024.pdf',
      category: 'FBAR / Foreign Bank',
      uploadDate: '2025-02-14',
      size: '4.8 MB',
      status: 'Under Review',
    },
  ],
  messages: [
    {
      id: 'msg-1',
      sender: 'cpa',
      senderName: 'Michael Miller, CPA',
      text: 'Hello! I have received your W-2 and Morgan Stanley 1099-B statements. I am currently reconciling your RSU cost basis and Foreign Tax Credit under US-India DTAA.',
      timestamp: 'Yesterday at 3:15 PM',
    },
    {
      id: 'msg-2',
      sender: 'client',
      senderName: 'Srikanth Srikanth',
      text: 'Thank you Michael! I just uploaded my HDFC NRE interest certificate as well for the FBAR disclosure.',
      timestamp: 'Today at 10:20 AM',
    },
  ],
  serviceRequests: [
    {
      id: 'req-101',
      serviceId: 'federal-tax-preparation',
      serviceTitle: 'Federal & Multi-State Tax Preparation',
      taxYear: '2025',
      filingStatus: 'Married Filing Jointly',
      notes: 'Includes Form W-2, 1099-B RSU adjustments, and Texas residency.',
      status: 'In Progress',
      requestDate: '01/28/2025',
      assignedCpa: 'Michael Miller, CPA',
    },
    {
      id: 'req-102',
      serviceId: 'fbar-fatca',
      serviceTitle: 'FBAR & FATCA Compliance',
      taxYear: '2025',
      filingStatus: 'Married Filing Jointly',
      notes: 'FinCEN Form 114 and Form 8938 for ICICI & HDFC NRE/NRO accounts.',
      status: 'Under Review',
      requestDate: '02/12/2025',
      assignedCpa: 'Michael Miller, CPA',
    },
    {
      id: 'req-103',
      serviceId: 'federal-tax-preparation',
      serviceTitle: 'Federal & Multi-State Tax Preparation',
      taxYear: '2024',
      filingStatus: 'Married Filing Jointly',
      notes: 'Filed and accepted by IRS e-file gateway.',
      status: 'Completed',
      requestDate: '02/10/2024',
      assignedCpa: 'Ananya Sharma, CPA',
    },
  ],
  notifications: [
    {
      id: 'notif-1',
      title: '2025 Draft Form 1040 Ready for Review',
      description: 'CPA Michael Miller uploaded your Tax Year 2025 draft return for review and e-file authorization.',
      date: 'Today',
      read: false,
      targetTab: 'Tax Returns',
    },
    {
      id: 'notif-2',
      title: 'Invoice PT-2025-9031 Pending',
      description: 'Draft Return Review & E-File Signoff invoice ($350.00) is ready in your Invoices tab.',
      date: '2 days ago',
      read: false,
      targetTab: 'Invoices',
    },
    {
      id: 'notif-3',
      title: 'FBAR Statements Verified',
      description: 'Your ICICI NRE/NRO bank statements were verified in the AES-256 vault.',
      date: '02/14/2025',
      read: true,
      targetTab: 'My Docs',
    },
  ],
};

const USER_KEY = 'plutotax_client_user';
const ADMIN_KEY = 'plutotax_admin_auth';

interface AuthContextType {
  currentUser: ClientUser | null;
  isAdminAuthenticated: boolean;
  loginClient: (email: string, password: string) => boolean;
  registerClient: (name: string, email: string, phone: string, password: string, country?: string) => boolean;
  logoutClient: () => void;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  uploadDocument: (doc: { name: string; category: string; size: string }) => void;
  sendMessageToCPA: (text: string) => void;
  updateProfile: (updates: Partial<Pick<ClientUser, 'name' | 'phone' | 'country'>>) => void;
  submitServiceRequest: (req: { serviceId: string; serviceTitle: string; taxYear: string; filingStatus: string; notes: string }) => ServiceRequestItem | null;
  markNotificationRead: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ClientUser | null>(() => {
    const saved = localStorage.getItem(USER_KEY);
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_CLIENT_USER,
        ...parsed,
        serviceRequests: parsed.serviceRequests || DEFAULT_CLIENT_USER.serviceRequests,
        notifications: parsed.notifications || DEFAULT_CLIENT_USER.notifications,
      };
    } catch {
      return null;
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(
    () => localStorage.getItem(ADMIN_KEY) === 'true'
  );

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(ADMIN_KEY, isAdminAuthenticated ? 'true' : 'false');
  }, [isAdminAuthenticated]);

  const loginClient = (email: string, _password: string): boolean => {
    if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
      return true;
    }
    const displayName =
      email.toLowerCase() === 'client@example.com'
        ? 'Srikanth Srikanth'
        : email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const user: ClientUser = {
      ...DEFAULT_CLIENT_USER,
      email,
      name: displayName,
    };
    setCurrentUser(user);
    return true;
  };

  const registerClient = (
    name: string,
    email: string,
    phone: string,
    _password: string,
    country = 'United States'
  ): boolean => {
    const newUser: ClientUser = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone,
      country,
      taxYear: '2025 / 2026',
      filingStatus: 'Documents Uploaded',
      progressPercent: 25,
      documents: [],
      messages: [
        {
          id: 'welcome-1',
          sender: 'cpa',
          senderName: 'Tax On Tracks Senior Advisor',
          text: `Welcome to Tax On Tracks, ${name}! Your secure portal is active. Please upload your W-2s, 1099s, or prior year returns to begin your review.`,
          timestamp: 'Just now',
        },
      ],
      serviceRequests: [],
      notifications: [
        {
          id: 'notif-welcome',
          title: 'Welcome to Tax On Tracks Client Portal',
          description: 'Your 256-bit encrypted tax vault is ready. Upload documents or request a service to begin.',
          date: 'Just now',
          read: false,
          targetTab: 'Upload Docs',
        },
      ],
    };
    setCurrentUser(newUser);
    return true;
  };

  const logoutClient = () => {
    setCurrentUser(null);
  };

  const loginAdmin = (passcode: string): boolean => {
    if (passcode === 'pluto2025' || passcode === 'admin123') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  const uploadDocument = (doc: { name: string; category: string; size: string }) => {
    if (!currentUser) return;
    const newDoc: ClientDocument = {
      id: 'doc-' + Date.now(),
      name: doc.name,
      category: doc.category,
      uploadDate: new Date().toISOString().split('T')[0],
      size: doc.size,
      status: 'Received',
    };
    setCurrentUser({
      ...currentUser,
      documents: [newDoc, ...currentUser.documents],
    });
  };

  const sendMessageToCPA = (text: string) => {
    if (!currentUser || !text.trim()) return;
    const msg = {
      id: 'msg-' + Date.now(),
      sender: 'client' as const,
      senderName: currentUser.name,
      text,
      timestamp: 'Just now',
    };
    setCurrentUser({
      ...currentUser,
      messages: [...currentUser.messages, msg],
    });

    setTimeout(() => {
      setCurrentUser((prev) => {
        if (!prev) return null;
        const reply = {
          id: 'msg-reply-' + Date.now(),
          sender: 'cpa' as const,
          senderName: 'Michael Miller, CPA',
          text: 'Thank you for your message! Our tax team has logged this in your tax file and will incorporate it into your draft return.',
          timestamp: 'Just now',
        };
        return { ...prev, messages: [...prev.messages, reply] };
      });
    }, 1200);
  };

  const updateProfile = (updates: Partial<Pick<ClientUser, 'name' | 'phone' | 'country'>>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...updates });
  };

  const submitServiceRequest = (req: {
    serviceId: string;
    serviceTitle: string;
    taxYear: string;
    filingStatus: string;
    notes: string;
  }): ServiceRequestItem | null => {
    if (!currentUser) return null;
    const newReq: ServiceRequestItem = {
      id: 'req-' + Date.now(),
      serviceId: req.serviceId,
      serviceTitle: req.serviceTitle,
      taxYear: req.taxYear,
      filingStatus: req.filingStatus,
      notes: req.notes,
      status: 'Submitted',
      requestDate: new Date().toLocaleDateString('en-US'),
      assignedCpa: 'Michael Miller, CPA',
    };
    const newNotif: PortalNotification = {
      id: 'notif-' + Date.now(),
      title: `Service Request Submitted: ${req.serviceTitle}`,
      description: `Your ${req.taxYear} request has been assigned to Michael Miller, CPA for intake review.`,
      date: 'Just now',
      read: false,
      targetTab: 'My Services',
    };
    setCurrentUser({
      ...currentUser,
      serviceRequests: [newReq, ...(currentUser.serviceRequests || [])],
      notifications: [newNotif, ...(currentUser.notifications || [])],
    });
    return newReq;
  };

  const markNotificationRead = (id: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      notifications: (currentUser.notifications || []).map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdminAuthenticated,
        loginClient,
        registerClient,
        logoutClient,
        loginAdmin,
        logoutAdmin,
        uploadDocument,
        sendMessageToCPA,
        updateProfile,
        submitServiceRequest,
        markNotificationRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
