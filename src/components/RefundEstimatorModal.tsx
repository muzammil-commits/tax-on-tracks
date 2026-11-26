import React, { useState, useEffect } from 'react';
import { X, Calculator, ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RefundEstimatorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { openConsultationModal } = useSite();
  const [filingStatus, setFilingStatus] = useState<'single' | 'mfj' | 'hoh'>('single');
  const [wages, setWages] = useState('120000');
  const [withheld, setWithheld] = useState('22000');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const gross = Math.max(0, Number(wages) || 0);
  const taxWithheld = Math.max(0, Number(withheld) || 0);
  const stdDeduction = filingStatus === 'mfj' ? 29200 : filingStatus === 'hoh' ? 21900 : 14600;
  const taxable = Math.max(0, gross - stdDeduction);
  const estimatedTax = Math.round(taxable * (filingStatus === 'mfj' ? 0.16 : 0.19));
  const diff = taxWithheld - estimatedTax;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#061F46]/65 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-[calc(100%-16px)] sm:max-w-[520px] max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#061F46] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFC400] text-[#061F46] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold font-heading">
                Quick Refund Estimator
              </h3>
              <p className="text-xs text-slate-300">Preliminary federal estimate (standard deduction)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close estimator"
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as 'single' | 'mfj' | 'hoh')}
              className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#10264A]"
            >
              <option value="single">Single</option>
              <option value="mfj">Married Filing Jointly</option>
              <option value="hoh">Head of Household</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                Annual W-2 / Gross Income ($)
              </label>
              <input
                type="number"
                value={wages}
                onChange={(e) => setWages(e.target.value)}
                className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#10264A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#10264A] mb-1">
                Federal Tax Withheld ($)
              </label>
              <input
                type="number"
                value={withheld}
                onChange={(e) => setWithheld(e.target.value)}
                className="w-full bg-[#F6F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#10264A]"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F6F9FF] border border-blue-200 text-center space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {diff >= 0 ? 'Estimated Federal Refund' : 'Estimated Federal Balance Due'}
            </div>
            <div
              className={`text-3xl font-black font-heading ${
                diff >= 0 ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              ${Math.abs(diff).toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500">
              Preliminary estimate only. Itemized deductions, credits, and DTAA treaties can improve your outcome.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              openConsultationModal('Federal & Multi-State Tax Preparation');
            }}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#FFD233] text-[#061F46] font-extrabold py-3 rounded-full text-sm shadow-gold transition-all"
          >
            <span>Get Exact CPA Calculation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
