import React from 'react';
import type { Customer, TelemetryEvent } from '../types';
import { KPICards } from '../components/Dashboard/KPICards';
import { LiveTelemetryStream } from '../components/Dashboard/LiveTelemetryStream';
import { RiskDistributionChart } from '../components/Dashboard/RiskDistributionChart';
import { CustomerTable } from '../components/Dashboard/CustomerTable';
import { calculateFinancialImpact } from '../lib/churnEngine';

interface DashboardPageProps {
  customers: Customer[];
  telemetryEvents: TelemetryEvent[];
  onSelectCustomer: (c: Customer) => void;
  onDeployRetention: (c: Customer) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  customers,
  telemetryEvents,
  onSelectCustomer,
  onDeployRetention
}) => {
  const financials = calculateFinancialImpact(customers);

  return (
    <div className="space-y-6 animate-fade-in">
      <KPICards financials={financials} />
      <LiveTelemetryStream
        events={telemetryEvents}
        onSelectCustomerById={(id) => {
          const c = customers.find(cust => cust.id === id);
          if (c) onSelectCustomer(c);
        }}
      />
      <RiskDistributionChart customers={customers} />
      <CustomerTable
        customers={customers}
        onSelectCustomer={onSelectCustomer}
        onDeployRetention={onDeployRetention}
      />
    </div>
  );
};
