import React from 'react';
import { TrendingUp, ShieldAlert, HeartHandshake, DollarSign } from 'lucide-react';

export const AIInsightsPanel: React.FC = () => {
  const riskFactors = [
    { factor: 'Customer Engagement Velocity', impact: 'High Impact', percentage: 38 },
    { factor: 'Purchase Frequency & Order Recency', impact: 'High Impact', percentage: 29 },
    { factor: 'Support Requests & Service Tickets', impact: 'Moderate', percentage: 22 },
    { factor: 'Discount & Promo Code Usage', impact: 'Moderate', percentage: 11 },
  ];

  return (
    <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-outfit">Business Insights</h3>
          <p className="text-xs text-slate-500">Executive Account Health & Revenue Exposure Overview</p>
        </div>

        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" /> Data Updated
        </span>
      </div>

      {/* 4 Business Insight Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Revenue Trend</span>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100 font-outfit">$1.42M</div>
          <p className="text-[11px] text-slate-500">Quarterly recurring revenue (+8.4%)</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Risk Summary</span>
          </div>
          <div className="text-xl font-bold text-rose-600 dark:text-rose-400 font-outfit">17.6% Exposure</div>
          <p className="text-[11px] text-slate-500">Accounts flagged for proactive outreach</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>Customer Health</span>
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-outfit">82.4% Satisfied</div>
          <p className="text-[11px] text-slate-500">Strong loyalty index across core segments</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span>Retention Opportunities</span>
          </div>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-400 font-outfit">$284.5K Saved</div>
          <p className="text-[11px] text-slate-500">Recoverable value via active campaigns</p>
        </div>

      </div>

      {/* Risk Factors Matrix */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Customer Risk Factors</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {riskFactors.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">{item.factor}</span>
                <span className="text-[10px] text-slate-500">{item.impact}</span>
              </div>
              <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">{item.percentage}% Weight</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
