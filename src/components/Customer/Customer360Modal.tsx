import React from 'react';
import type { Customer } from '../../types';
import { X, ShieldAlert, Sparkles, Clock, ArrowRight } from 'lucide-react';

interface Customer360ModalProps {
  customer: Customer | null;
  onClose: () => void;
  onDeployRetention: (customer: Customer) => void;
}

export const Customer360Modal: React.FC<Customer360ModalProps> = ({
  customer,
  onClose,
  onDeployRetention,
}) => {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-zinc-950 w-full max-w-4xl max-h-[90vh] rounded-xl border border-zinc-800 shadow-2xl overflow-y-auto flex flex-col">
        
        {/* Dialog Header */}
        <div className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur-md px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-10 h-10 rounded-full object-cover border border-zinc-700"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-zinc-100 font-outfit">{customer.name}</h2>
                <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {customer.segment}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">{customer.email} • ID: {customer.id}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dialog Content */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-900/80 p-3.5 rounded-lg border border-zinc-800">
              <span className="text-[11px] text-zinc-400 block mb-1 font-mono">Lifetime Value</span>
              <span className="text-xl font-bold text-zinc-100 font-outfit">${customer.clv.toLocaleString()}</span>
            </div>
            
            <div className="bg-zinc-900/80 p-3.5 rounded-lg border border-zinc-800">
              <span className="text-[11px] text-zinc-400 block mb-1 font-mono">Churn Risk Score</span>
              <span className={`text-xl font-bold font-outfit ${customer.churnRiskScore > 70 ? 'text-rose-400' : 'text-amber-400'}`}>
                {customer.churnRiskScore}%
              </span>
            </div>

            <div className="bg-zinc-900/80 p-3.5 rounded-lg border border-zinc-800">
              <span className="text-[11px] text-zinc-400 block mb-1 font-mono">Last Active</span>
              <span className="text-xl font-bold text-zinc-100 font-outfit">{customer.lastActiveDaysAgo} <span className="text-xs text-zinc-400">days ago</span></span>
            </div>

            <div className="bg-zinc-900/80 p-3.5 rounded-lg border border-zinc-800">
              <span className="text-[11px] text-zinc-400 block mb-1 font-mono">RFM Matrix</span>
              <span className="text-xs font-semibold text-indigo-400">R:{customer.rfmScore.recency} | F:{customer.rfmScore.frequency} | M:{customer.rfmScore.monetary}</span>
            </div>
          </div>

          {/* Explainable AI (SHAP) Drivers */}
          <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <h3 className="font-semibold text-zinc-100 text-sm font-outfit">SHAP Explainable Churn Drivers (XAI)</h3>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">Feature Attribution</span>
            </div>

            <div className="space-y-2.5">
              {customer.topDrivers.map((driver, idx) => (
                <div key={idx} className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs font-medium mb-1">
                    <span className="text-zinc-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      {driver.feature} ({driver.category})
                    </span>
                    <span className="text-rose-400 font-semibold">+{driver.impactScore}% Impact</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-1">
                    <div
                      className="bg-rose-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, driver.impactScore * 2)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-400">{driver.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral Journey Timeline */}
          <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-4 h-4 text-indigo-400" />
              <h3 className="font-semibold text-zinc-100 text-sm font-outfit">Customer Behavioral Timeline</h3>
            </div>

            <div className="space-y-2.5 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
              {customer.journeyTimeline.map((item) => (
                <div key={item.id} className="relative pl-8 flex items-start justify-between text-xs">
                  <div className={`absolute left-1.5 top-1.5 w-3 h-3 rounded-full border-2 ${
                    item.type === 'negative' ? 'bg-rose-500 border-zinc-950' : 'bg-emerald-500 border-zinc-950'
                  }`} />
                  <div>
                    <span className="font-medium text-zinc-200 block">{item.event}</span>
                    <span className="text-zinc-400 text-[11px]">{item.timestamp}</span>
                  </div>
                  <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
                    item.type === 'negative' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {item.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Dialog Footer */}
        <div className="sticky bottom-0 z-10 bg-zinc-950/95 backdrop-blur-md px-6 py-3.5 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            Strategy Engine ready for {customer.name}
          </span>
          
          <button
            onClick={() => {
              onClose();
              onDeployRetention(customer);
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-xs bg-zinc-100 text-zinc-900 hover:bg-zinc-200 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            <span>Generate Rescue Campaign</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
