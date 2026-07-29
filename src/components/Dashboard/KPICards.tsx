import React from 'react';
import { DollarSign, ShieldAlert, TrendingDown, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface KPICardsProps {
  financials: {
    totalClvAtRisk: number;
    highRiskCount: number;
    mediumRiskCount: number;
    lowRiskCount: number;
    avgChurnRisk: number;
    estimatedRetainedRevenue: number;
  };
}

export const KPICards: React.FC<KPICardsProps> = ({ financials }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. CLV At Risk */}
      <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 shadow-sm relative overflow-hidden group hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between text-zinc-400 text-xs font-medium mb-1">
          <span>Total CLV at Risk</span>
          <DollarSign className="w-4 h-4 text-rose-400" />
        </div>
        <div className="text-2xl font-bold text-zinc-50 font-outfit">
          ${financials.totalClvAtRisk.toLocaleString()}
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-400">
          <span>Targeting High Risk</span>
          <span className="text-rose-400 font-semibold flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +12.4%
          </span>
        </div>
      </div>

      {/* 2. High Risk Customers */}
      <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 shadow-sm relative overflow-hidden group hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between text-zinc-400 text-xs font-medium mb-1">
          <span>High Risk Customers</span>
          <ShieldAlert className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-2xl font-bold text-zinc-50 font-outfit">
          {financials.highRiskCount} <span className="text-xs font-normal text-zinc-400">Users</span>
        </div>
        <div className="mt-2.5 flex items-center space-x-2 text-[11px] text-zinc-400">
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
            {financials.mediumRiskCount} Medium
          </span>
          <span>• {financials.lowRiskCount} Low</span>
        </div>
      </div>

      {/* 3. Average Churn Velocity */}
      <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 shadow-sm relative overflow-hidden group hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between text-zinc-400 text-xs font-medium mb-1">
          <span>Platform Churn Index</span>
          <TrendingDown className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="text-2xl font-bold text-zinc-50 font-outfit">
          {financials.avgChurnRisk}%
        </div>
        <div className="mt-3 flex items-center space-x-2 text-[11px] text-zinc-400">
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full"
              style={{ width: `${financials.avgChurnRisk}%` }}
            />
          </div>
          <span className="text-zinc-400 font-mono">Index</span>
        </div>
      </div>

      {/* 4. Autonomous Retained Value */}
      <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 shadow-sm relative overflow-hidden group hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between text-zinc-400 text-xs font-medium mb-1">
          <span>Est. Recovered Revenue</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-2xl font-bold text-emerald-400 font-outfit">
          ${financials.estimatedRetainedRevenue.toLocaleString()}
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-400">
          <span>AI Offer Conversion</span>
          <span className="text-emerald-400 font-semibold">78.4% ROI</span>
        </div>
      </div>

    </div>
  );
};
