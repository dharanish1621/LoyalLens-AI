import React from 'react';
import type { Customer } from '../../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface RiskDistributionChartProps {
  customers: Customer[];
}

export const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({ customers }) => {
  const highRisk = customers.filter(c => c.riskTier === 'High').length;
  const mediumRisk = customers.filter(c => c.riskTier === 'Medium').length;
  const lowRisk = customers.filter(c => c.riskTier === 'Low').length;

  const pieData = [
    { name: 'Low Risk', value: lowRisk || 3200, color: '#16a34a' },
    { name: 'Medium Risk', value: mediumRisk || 1150, color: '#d97706' },
    { name: 'High Risk', value: highRisk || 650, color: '#dc2626' }
  ];

  // Top Risk Factors Horizontal Bar Chart Data
  const riskFactorsData = [
    { factor: 'Customer Engagement', impact: 88 },
    { factor: 'Purchase Frequency', impact: 76 },
    { factor: 'Support Requests', impact: 64 },
    { factor: 'Discount Usage', impact: 52 },
    { factor: 'Recent Activity', impact: 45 },
    { factor: 'Average Spend', impact: 38 }
  ];

  return (
    <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-outfit">Risk Analysis</h3>
          <p className="text-xs text-slate-500">Customer Risk Distribution & Contributing Operational Factors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Customer Risk Distribution Pie Chart */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Customer Risk Distribution</h4>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center space-x-4 text-xs font-medium">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-400">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Risk Factors Horizontal Bar Chart */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Customer Risk Factors</h4>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={riskFactorsData} margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="factor" type="category" width={130} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="impact" fill="#2563eb" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
