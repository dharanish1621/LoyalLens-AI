import React, { useState, useEffect } from 'react';
import type { Customer, TelemetryEvent, RetentionCampaign } from './types';
import { INITIAL_CUSTOMERS, INITIAL_TELEMETRY } from './lib/mockDataset';
import { getRiskTier, calculateFinancialImpact } from './lib/churnEngine';

import { Navbar } from './components/Layout/Navbar';
import { KPICards } from './components/Dashboard/KPICards';
import { LiveTelemetryStream } from './components/Dashboard/LiveTelemetryStream';
import { RiskDistributionChart } from './components/Dashboard/RiskDistributionChart';
import { CustomerTable } from './components/Dashboard/CustomerTable';
import { Customer360Modal } from './components/Customer/Customer360Modal';
import { RetentionStudio } from './components/Retention/RetentionStudio';
import { WhatIfROICalculator } from './components/Simulator/WhatIfROICalculator';
import { PitchModeModal } from './components/Pitch/PitchModeModal';
import { ExcelImportModal } from './components/Excel/ExcelImportModal';

export const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [telemetryEvents, setTelemetryEvents] = useState<TelemetryEvent[]>(INITIAL_TELEMETRY);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'retention' | 'simulator'>('dashboard');
  const [isSimulating, setIsSimulating] = useState(true);

  const [selectedCustomer360, setSelectedCustomer360] = useState<Customer | null>(null);
  const [selectedRetentionCustomer, setSelectedRetentionCustomer] = useState<Customer | null>(null);
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Financial summary
  const financials = calculateFinancialImpact(customers);

  // Real-time Event Simulation Hook
  useEffect(() => {
    if (!isSimulating || customers.length === 0) return;

    const interval = setInterval(() => {
      const targetCust = customers[Math.floor(Math.random() * customers.length)];
      const eventTypes: TelemetryEvent['eventType'][] = ['cart_abandoned', 'shipping_delay', 'negative_review', 'checkout_error'];
      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

      const newEvent: TelemetryEvent = {
        id: `tel-${Date.now()}`,
        customerId: targetCust.id,
        customerName: targetCust.name,
        avatar: targetCust.avatar,
        eventType: randomType,
        description: randomType === 'cart_abandoned'
          ? `Abandoned high-value cart ($${Math.floor(200 + Math.random() * 500)} order)`
          : randomType === 'shipping_delay'
          ? `Package delivery delayed (+${Math.floor(2 + Math.random() * 4)} days)`
          : `Failed promo code redemption at checkout`,
        riskImpact: Math.floor(8 + Math.random() * 14),
        timestamp: 'Just now'
      };

      setTelemetryEvents(prev => [newEvent, ...prev.slice(0, 7)]);

      setCustomers(prevCusts =>
        prevCusts.map(c => {
          if (c.id === targetCust.id) {
            const newScore = Math.min(99, c.churnRiskScore + newEvent.riskImpact);
            return {
              ...c,
              churnRiskScore: newScore,
              riskTier: getRiskTier(newScore)
            };
          }
          return c;
        })
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [isSimulating, customers]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCampaignDispatched = (campaign: RetentionCampaign) => {
    showToast(`🚀 Campaign dispatched to ${campaign.customerName} via ${campaign.channel}! Code: ${campaign.discountCode}`);
  };

  const handleExcelImported = (importedCustomers: Customer[]) => {
    setCustomers(importedCustomers);
    showToast(`📊 Successfully loaded ${importedCustomers.length} records from your Excel file!`);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-zinc-50">
      
      {/* Top Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        onOpenPitch={() => setIsPitchOpen(true)}
        onOpenExcelModal={() => setIsExcelModalOpen(true)}
        highRiskCount={financials.highRiskCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            {/* KPI Cards */}
            <KPICards financials={financials} />

            {/* Live Telemetry Feed */}
            <LiveTelemetryStream
              events={telemetryEvents}
              onSelectCustomerById={(id) => {
                const c = customers.find(cust => cust.id === id);
                if (c) setSelectedCustomer360(c);
              }}
            />

            {/* Churn Risk Cohorts & SHAP Radar Charts */}
            <RiskDistributionChart customers={customers} />

            {/* Filterable Customer Churn Table */}
            <CustomerTable
              customers={customers}
              onSelectCustomer={(c) => setSelectedCustomer360(c)}
              onDeployRetention={(c) => {
                setSelectedRetentionCustomer(c);
                setActiveTab('retention');
              }}
            />
          </div>
        )}

        {activeTab === 'retention' && (
          <div className="animate-fade-in">
            <RetentionStudio
              customers={customers}
              selectedCustomer={selectedRetentionCustomer}
              onSelectCustomer={(c) => setSelectedRetentionCustomer(c)}
              onCampaignDispatched={handleCampaignDispatched}
            />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="animate-fade-in">
            <WhatIfROICalculator customers={customers} />
          </div>
        )}

      </main>

      {/* Customer 360 & Explainable AI Modal */}
      <Customer360Modal
        customer={selectedCustomer360}
        onClose={() => setSelectedCustomer360(null)}
        onDeployRetention={(c) => {
          setSelectedRetentionCustomer(c);
          setActiveTab('retention');
        }}
      />

      {/* 2-Min Hackathon Pitch Deck Modal */}
      <PitchModeModal
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
      />

      {/* Excel File Import Modal */}
      <ExcelImportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onCustomersImported={handleExcelImported}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-zinc-100 border border-zinc-800 px-4 py-3 rounded-lg shadow-xl font-medium text-xs flex items-center space-x-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-4 text-center text-xs text-zinc-400 bg-zinc-950">
        <p>LoyalLens AI Platform • Custom Excel Dataset Parser Integrated • Autonomous Retention Engine</p>
      </footer>

    </div>
  );
};

export default App;
