import React from 'react';
import { Users, UserCheck, ShieldAlert, HeartHandshake, DollarSign, AlertTriangle } from 'lucide-react';

interface KPICardsProps {
  financials: {
    totalClvAtRisk: number;
    highRiskCount: number;
    mediumRiskCount: number;
    lowRiskCount: number;
    avgChurnRisk: number;
    estimatedRetainedRevenue: number;
  };
  totalCustomersCount?: number;
}

export const KPICards: React.FC<KPICardsProps> = ({ financials, totalCustomersCount = 50000 }) => {
  const activeCustomers = Math.round(totalCustomersCount * (1 - (financials.avgChurnRisk / 100)));
  const retentionRate = (100 - financials.avgChurnRisk).toFixed(1);
  const avgCustomerValue = 4850;

  const kpis = [
    {
      title: 'Total Customers',
      value: totalCustomersCount.toLocaleString(),
      change: '+14.2% vs last quarter',
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40'
    },
    {
      title: 'Active Customers',
      value: activeCustomers.toLocaleString(),
      change: '82.4% engagement rate',
      icon: UserCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      title: 'Customers at Risk',
      value: financials.highRiskCount.toLocaleString(),
      change: 'Action required',
      icon: ShieldAlert,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/40'
    },
    {
      title: 'Retention Rate',
      value: `${retentionRate}%`,
      change: '+1.8% benchmark',
      icon: HeartHandshake,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      title: 'Average Customer Value',
      value: `$${avgCustomerValue.toLocaleString()}`,
      change: '+$340 target',
      icon: DollarSign,
      color: 'text-slate-700 dark:text-slate-300',
      bgColor: 'bg-slate-100 dark:bg-slate-800'
    },
    {
      title: 'Revenue at Risk',
      value: `$${financials.totalClvAtRisk.toLocaleString()}`,
      change: 'Retrievable cohort',
      icon: AlertTriangle,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="saas-card p-4 flex flex-col justify-between border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">{kpi.title}</span>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-outfit tracking-tight">
                {kpi.value}
              </div>
              <div className="mt-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {kpi.change}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
