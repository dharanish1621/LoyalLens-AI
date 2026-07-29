import React from 'react';
import { Users, UserCheck, TrendingDown, ShieldAlert, DollarSign, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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
  const churnRate = ((financials.highRiskCount / (totalCustomersCount || 1)) * 100).toFixed(1);
  const avgCLV = 4850;

  const kpis = [
    {
      title: 'Total Customers',
      value: totalCustomersCount.toLocaleString(),
      change: '+14.2% vs last month',
      isPositive: true,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Active Customers',
      value: activeCustomers.toLocaleString(),
      change: '+8.5% retention',
      isPositive: true,
      icon: UserCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'Churn Rate',
      value: `${churnRate}%`,
      change: '-2.4% this week',
      isPositive: true, // lower churn is good
      icon: TrendingDown,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10'
    },
    {
      title: 'High Risk Customers',
      value: financials.highRiskCount.toString(),
      change: '+12 new alerts',
      isPositive: false,
      icon: ShieldAlert,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-500/10'
    },
    {
      title: 'Avg Customer Lifetime Value',
      value: `$${avgCLV.toLocaleString()}`,
      change: '+$340 benchmark',
      isPositive: true,
      icon: DollarSign,
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    },
    {
      title: 'Revenue At Risk',
      value: `$${financials.totalClvAtRisk.toLocaleString()}`,
      change: '78.4% retrievable',
      isPositive: false,
      icon: AlertTriangle,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="saas-card saas-card-hover p-4 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">{kpi.title}</span>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-outfit tracking-tight">
                {kpi.value}
              </div>
              <div className="mt-2 flex items-center text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {kpi.isPositive ? (
                  <ArrowUpRight className="w-3 h-3 text-emerald-500 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-rose-500 mr-0.5" />
                )}
                <span className={kpi.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                  {kpi.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
