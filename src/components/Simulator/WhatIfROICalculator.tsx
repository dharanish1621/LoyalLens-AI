import React, { useState } from 'react';
import type { Customer } from '../../types';
import { Sliders, TrendingUp, Calculator } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface WhatIfROICalculatorProps {
  customers: Customer[];
}

export const WhatIfROICalculator: React.FC<WhatIfROICalculatorProps> = ({ customers }) => {
  const [budget, setBudget] = useState<number>(2500);
  const [targetTier, setTargetTier] = useState<'All' | 'High' | 'Medium'>('High');
  const [discountPct, setDiscountPct] = useState<number>(15);
  const [conversionRate, setConversionRate] = useState<number>(75);

  const targetedCustomers = customers.filter(c => {
    if (targetTier === 'All') return true;
    return c.riskTier === targetTier;
  });

  const totalTargetCLV = targetedCustomers.reduce((sum, c) => sum + c.clv, 0);
  const estimatedRevenueRetained = Math.round(totalTargetCLV * (conversionRate / 100));
  const estimatedDiscountCost = Math.round(estimatedRevenueRetained * (discountPct / 100));
  const totalCampaignCost = budget + estimatedDiscountCost;
  const netProfitSaved = Math.max(0, estimatedRevenueRetained - totalCampaignCost);
  const roiPercentage = totalCampaignCost > 0 ? Math.round((netProfitSaved / totalCampaignCost) * 100) : 0;

  const chartData = [
    { month: 'Month 1', baselineLoss: Math.round(totalTargetCLV * 0.15), loyalLensRetained: Math.round(estimatedRevenueRetained * 0.20) },
    { month: 'Month 2', baselineLoss: Math.round(totalTargetCLV * 0.35), loyalLensRetained: Math.round(estimatedRevenueRetained * 0.42) },
    { month: 'Month 3', baselineLoss: Math.round(totalTargetCLV * 0.55), loyalLensRetained: Math.round(estimatedRevenueRetained * 0.65) },
    { month: 'Month 4', baselineLoss: Math.round(totalTargetCLV * 0.72), loyalLensRetained: Math.round(estimatedRevenueRetained * 0.82) },
    { month: 'Month 5', baselineLoss: Math.round(totalTargetCLV * 0.88), loyalLensRetained: Math.round(estimatedRevenueRetained * 0.92) },
    { month: 'Month 6', baselineLoss: totalTargetCLV, loyalLensRetained: estimatedRevenueRetained },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-zinc-900/90 p-6 rounded-xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Financial Projection Engine</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-50 font-outfit">"What-If" Retention ROI Calculator</h2>
          <p className="text-xs text-zinc-400">
            Simulate retention campaign budget, target cohorts, and incentive rates.
          </p>
        </div>

        <div className="bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800 flex items-center space-x-3">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="text-[10px] text-zinc-400 font-mono block">PROJECTED ROI</span>
            <span className="text-lg font-bold text-emerald-400 font-outfit">+{roiPercentage}% ROI</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Parameters (5 cols) */}
        <div className="lg:col-span-5 bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 border-b border-zinc-800 pb-3">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <h3 className="font-semibold text-zinc-100 text-sm">Simulation Parameters</h3>
          </div>

          {/* Budget Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-zinc-300">Campaign Execution Budget</span>
              <span className="text-indigo-400 font-mono">${budget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="500"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>$500</span>
              <span>$10,000</span>
            </div>
          </div>

          {/* Target Risk Tier */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-zinc-300 block">Target Customer Cohort</span>
            <div className="grid grid-cols-3 gap-2">
              {(['High', 'Medium', 'All'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setTargetTier(tier)}
                  className={`py-1.5 rounded-md text-xs font-medium transition-all border ${
                    targetTier === tier
                      ? 'bg-zinc-800 border-zinc-700 text-zinc-50 shadow-xs'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tier === 'All' ? 'All Cohorts' : `${tier} Risk`}
                </button>
              ))}
            </div>
          </div>

          {/* Discount Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-zinc-300">Incentive Discount Rate</span>
              <span className="text-amber-400 font-mono">{discountPct}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={discountPct}
              onChange={(e) => setDiscountPct(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>5%</span>
              <span>40%</span>
            </div>
          </div>

          {/* Retention Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-zinc-300">Target Retention Rate</span>
              <span className="text-emerald-400 font-mono">{conversionRate}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="95"
              step="5"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>40%</span>
              <span>95%</span>
            </div>
          </div>

        </div>

        {/* Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 shadow-sm">
              <span className="text-[11px] text-zinc-400 block mb-1 font-mono">Target CLV Pool</span>
              <span className="text-lg font-bold text-zinc-100 font-outfit">${totalTargetCLV.toLocaleString()}</span>
            </div>

            <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 shadow-sm">
              <span className="text-[11px] text-emerald-400 block mb-1 font-mono">Retained Revenue</span>
              <span className="text-lg font-bold text-emerald-400 font-outfit">${estimatedRevenueRetained.toLocaleString()}</span>
            </div>

            <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 shadow-sm col-span-2 sm:col-span-1">
              <span className="text-[11px] text-indigo-300 block mb-1 font-mono">Net Profit Saved</span>
              <span className="text-lg font-bold text-indigo-300 font-outfit">${netProfitSaved.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-zinc-100 text-sm">6-Month Revenue Trajectory</h3>
                <p className="text-[11px] text-zinc-400">Comparing unmitigated churn loss vs LoyalLens recovery</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                +${netProfitSaved.toLocaleString()} Saved
              </span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRetained" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem', color: '#f4f4f5', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="loyalLensRetained" name="LoyalLens Retained ($)" stroke="#10b981" fillOpacity={1} fill="url(#colorRetained)" strokeWidth={2} />
                  <Area type="monotone" dataKey="baselineLoss" name="Unmitigated Loss ($)" stroke="#f43f5e" fillOpacity={1} fill="url(#colorLoss)" strokeWidth={1.5} strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
