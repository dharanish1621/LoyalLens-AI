import React from 'react';
import type { Customer } from '../../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { PieChart as PieIcon, BarChart3 } from 'lucide-react';

interface RiskDistributionChartProps {
  customers: Customer[];
}

export const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({ customers }) => {
  const categoryRiskData = [
    { name: 'High Risk (>70%)', count: customers.filter(c => c.riskTier === 'High').length, color: '#f43f5e' },
    { name: 'Medium Risk (35-70%)', count: customers.filter(c => c.riskTier === 'Medium').length, color: '#f59e0b' },
    { name: 'Low Risk (<35%)', count: customers.filter(c => c.riskTier === 'Low').length, color: '#10b981' },
  ];

  const driverCategoriesMap: Record<string, number> = {
    Logistics: 0,
    Engagement: 0,
    Pricing: 0,
    Support: 0,
    Product: 0
  };

  customers.forEach(c => {
    c.topDrivers.forEach(d => {
      driverCategoriesMap[d.category] = (driverCategoriesMap[d.category] || 0) + d.impactScore;
    });
  });

  const radarData = Object.keys(driverCategoriesMap).map(cat => ({
    subject: cat,
    impact: driverCategoriesMap[cat],
    fullMark: 100
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      
      {/* 1. Customer Churn Risk Tiers Bar Chart */}
      <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <h3 className="font-semibold text-zinc-100 text-sm font-outfit">Churn Risk Cohort Distribution</h3>
          </div>
          <span className="text-xs text-zinc-400 font-mono">Live Segment Breakdown</span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryRiskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem', color: '#f4f4f5', fontSize: '12px' }}
                cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {categoryRiskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. SHAP Explainable Churn Driver Radar */}
      <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <PieIcon className="w-4 h-4 text-indigo-400" />
            <h3 className="font-semibold text-zinc-100 text-sm font-outfit">SHAP Churn Drivers Analysis</h3>
          </div>
          <span className="text-[11px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded font-mono border border-indigo-500/20">
            XAI Feature Impact
          </span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#27272a" />
              <PolarAngleAxis dataKey="subject" stroke="#a1a1aa" fontSize={11} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#3f3f46" fontSize={10} />
              <Radar name="Impact Weight" dataKey="impact" stroke="#6366f1" fill="#6366f1" fillOpacity={0.35} />
              <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem', color: '#f4f4f5', fontSize: '12px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
