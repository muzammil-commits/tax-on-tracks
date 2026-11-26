import React from 'react';
import {
  TrendingUp,
  FileSpreadsheet,
  ShieldAlert,
  FileBadge,
  Building2,
  Globe2,
  Clock,
  ShieldCheck,
  Coins,
  CheckCircle2,
  Smile,
  Lock,
  Award,
  Globe,
  Scale,
  UploadCloud,
  Calculator,
  FileCheck,
  Send,
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  const map: Record<string, React.ReactNode> = {
    TrendingUp: <TrendingUp className={className} />,
    FileSpreadsheet: <FileSpreadsheet className={className} />,
    ShieldAlert: <ShieldAlert className={className} />,
    FileBadge: <FileBadge className={className} />,
    Building2: <Building2 className={className} />,
    Globe2: <Globe2 className={className} />,
    Clock: <Clock className={className} />,
    ShieldCheck: <ShieldCheck className={className} />,
    Coins: <Coins className={className} />,
    CheckCircle2: <CheckCircle2 className={className} />,
    Smile: <Smile className={className} />,
    Lock: <Lock className={className} />,
    Award: <Award className={className} />,
    Globe: <Globe className={className} />,
    Scale: <Scale className={className} />,
    UploadCloud: <UploadCloud className={className} />,
    Calculator: <Calculator className={className} />,
    FileCheck: <FileCheck className={className} />,
    Send: <Send className={className} />,
  };

  return <>{map[name] || <FileSpreadsheet className={className} />}</>;
};
