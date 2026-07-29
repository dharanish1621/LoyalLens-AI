import React from 'react';
import type { Customer } from '../types';
import { CustomerTable } from '../components/Dashboard/CustomerTable';
import { PieChart, Crown, ShoppingBag, UserPlus, ShieldAlert, Sparkles } from 'lucide-react';

interface SegmentsPageProps {
  customers: Customer[];
  onSelectCustomer: (c: Customer) => void;
  onDeployRetention: (c: Customer) => void;
}

export const SegmentsPage: React.FC<SegmentsPageProps> = ({
  customers,
  onSelectCustomer,
  onDeployRetention,
}) => {
  const vipCount = customers.filter(c => c.segment === 'VIP').length;
  const bargainCount = customers.filter(c => c.segment === 'Bargain Hunter').length;
  const regularCount = customers.filter(c => c.segment === 'Regular').length;
  const newCount = customers.filter(c => c.segment === 'New Buyer').length;
  const atRiskVipCount = customers.filter(c => c.segment === 'VIP' && c.riskTier === 'High').length;

  const segmentCards = [
    {
      title: 'VIP High-Value Segment',
      count: vipCount,
      description: 'CLV > $5,000 with high order frequency',
      icon: Crown,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    {
      title: 'At-Risk VIP Buyers',
      count: atRiskVipCount,
      description: 'VIP members with >70% churn risk',
      icon: ShieldAlert,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10'
    },
    {
      title: 'Bargain Hunters',
      count: bargainCount,
      description: 'Price-sensitive, high discount usage rate',
      icon: ShoppingBag,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Regular Buyers',
      count: regularCount,
      description: 'Steady re-order frequency & moderate CLV',
      icon: PieChart,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'New Buyers',
      count: newCount,
      description: 'First 30-day onboarding window',
      icon: UserPlus,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Cohort Segmentation</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-outfit">Customer Behavioral Segments</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Categorized by RFM matrix scores, purchasing patterns, and price sensitivity.
          </p>
        </div>
      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {segmentCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="saas-card saas-card-hover p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${card.bgColor}`}>
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
                <span className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-slate-100">{card.count}</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{card.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Segment Customer Table */}
      <CustomerTable
        customers={customers}
        onSelectCustomer={onSelectCustomer}
        onDeployRetention={onDeployRetention}
      />

    </div>
  );
};
