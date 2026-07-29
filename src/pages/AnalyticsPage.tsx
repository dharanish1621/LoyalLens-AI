import React from 'react';
import type { Customer } from '../types';
import { RiskDistributionChart } from '../components/Dashboard/RiskDistributionChart';
import { BarChart3 } from 'lucide-react';

interface AnalyticsPageProps {
  customers: Customer[];
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ customers }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-zinc-900/90 p-6 rounded-xl border border-zinc-800 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Deep Behavioral Analytics</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-50 font-outfit">Churn Analytics & SHAP Explainability</h2>
          <p className="text-xs text-zinc-400">
            Multi-dimensional risk distributions and SHAP feature impact weightings.
          </p>
        </div>
      </div>

      <RiskDistributionChart customers={customers} />
    </div>
  );
};
