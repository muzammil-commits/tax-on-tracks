import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  to?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; variant?: 'light' | 'dark' }> = ({
  items,
  variant = 'dark',
}) => {
  const textColor = variant === 'dark' ? 'text-slate-300' : 'text-slate-500';
  const activeColor = variant === 'dark' ? 'text-[#FFC400]' : 'text-[#061F46]';

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center flex-wrap gap-1.5 text-xs font-medium ${textColor}`}>
      <Link to="/" className="inline-flex items-center gap-1 hover:text-[#FFC400] transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          {item.to ? (
            <Link to={item.to} className="hover:text-[#FFC400] transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className={`font-semibold ${activeColor}`}>{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
