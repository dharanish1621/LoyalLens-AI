import React from 'react';
import type { Customer } from '../types';
import { CustomerTable } from '../components/Dashboard/CustomerTable';
import { Users } from 'lucide-react';

interface CustomerManagementPageProps {
  customers: Customer[];
  onSelectCustomer: (c: Customer) => void;
  onDeployRetention: (c: Customer) => void;
}

export const CustomerManagementPage: React.FC<CustomerManagementPageProps> = ({
  customers,
  onSelectCustomer,
  onDeployRetention
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-zinc-900/90 p-6 rounded-xl border border-zinc-800 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Customer Intelligence Hub</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-50 font-outfit">Customer Management & RFM Profiles</h2>
          <p className="text-xs text-zinc-400">
            Search, filter, and inspect detailed behavioral metrics across all registered accounts.
          </p>
        </div>
      </div>

      <CustomerTable
        customers={customers}
        onSelectCustomer={onSelectCustomer}
        onDeployRetention={onDeployRetention}
      />
    </div>
  );
};
