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
      <div>
        <div className="flex items-center space-x-2 text-[#2563EB] text-[13px] font-semibold uppercase tracking-wider mb-1">
          <Users className="w-4 h-4" />
          <span>Customer Directory</span>
        </div>
        <h1 className="heading-page">Customer Management</h1>
        <p className="text-body text-[#6B7280]">
          Inspect behavioral metrics, order velocity, and engagement profiles across all registered accounts.
        </p>
      </div>

      <CustomerTable
        customers={customers}
        onSelectCustomer={onSelectCustomer}
        onDeployRetention={onDeployRetention}
      />
    </div>
  );
};
