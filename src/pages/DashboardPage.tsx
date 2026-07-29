import React from 'react';
import type { Customer, TelemetryEvent } from '../types';
import { KPICards } from '../components/Dashboard/KPICards';
import { LiveTelemetryStream } from '../components/Dashboard/LiveTelemetryStream';
import { RiskDistributionChart } from '../components/Dashboard/RiskDistributionChart';
import { CustomerTable } from '../components/Dashboard/CustomerTable';
import { AIInsightsPanel } from '../components/Dashboard/AIInsightsPanel';
import { calculateFinancialImpact } from '../lib/churnEngine';

interface DashboardPageProps {
  customers: Customer[];
  telemetryEvents?: TelemetryEvent[];
  onSelectCustomer: (c: Customer) => void;
  onDeployRetention: (c: Customer) => void;
  onOpenPitch?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  customers,
  telemetryEvents = [],
  onSelectCustomer,
  onDeployRetention
}) => {
  const financials = calculateFinancialImpact(customers);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 6 Top KPI Cards */}
      <KPICards financials={financials} totalCustomersCount={customers.length || 50000} />

      {/* Grid: Analytics Section + Live Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiskDistributionChart customers={customers} />
        </div>
        <div>
          <LiveTelemetryStream
            events={telemetryEvents}
            onSelectCustomerById={(id) => {
              const c = customers.find(cust => cust.id === id);
              if (c) onSelectCustomer(c);
            }}
          />
        </div>
      </div>

      {/* AI Insights & Explainability Panel */}
      <AIInsightsPanel />

      {/* Customer Matrix Table */}
      <CustomerTable
        customers={customers}
        onSelectCustomer={onSelectCustomer}
        onDeployRetention={onDeployRetention}
      />
    </div>
  );
};
