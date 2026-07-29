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
      <div>
        <div className="flex items-center space-x-2 text-[#2563EB] text-[13px] font-semibold uppercase tracking-wider mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>Operational Intelligence</span>
        </div>
        <h1 className="heading-page">Customer Analytics</h1>
        <p className="text-body text-[#6B7280]">
          Multi-dimensional risk distributions and operational factor rankings.
        </p>
      </div>

      <RiskDistributionChart customers={customers} />
    </div>
  );
};
