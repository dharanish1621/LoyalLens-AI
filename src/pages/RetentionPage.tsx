import React from 'react';
import type { Customer, RetentionCampaign } from '../types';
import { RetentionStudio } from '../components/Retention/RetentionStudio';
import { HeartHandshake, ArrowLeft } from 'lucide-react';

interface RetentionPageProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onClearCustomer: () => void;
  onSelectCustomer: (c: Customer) => void;
  onCampaignDispatched?: (campaign: RetentionCampaign) => void;
}

export const RetentionPage: React.FC<RetentionPageProps> = ({
  customers,
  selectedCustomer,
  onClearCustomer,
  onSelectCustomer,
  onCampaignDispatched = () => {},
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <HeartHandshake className="w-4 h-4" />
            <span>Retention Center</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-outfit">Retention Strategies & Customer Outreach</h2>
          <p className="text-xs text-slate-500">
            Generate custom rescue offers, VIP discount codes, and multi-channel messaging (Email, WhatsApp, Direct Line).
          </p>
        </div>

        {selectedCustomer && (
          <button
            onClick={onClearCustomer}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Accounts</span>
          </button>
        )}
      </div>

      {/* Retention Studio */}
      <RetentionStudio
        customers={customers}
        selectedCustomer={selectedCustomer}
        onSelectCustomer={onSelectCustomer}
        onCampaignDispatched={onCampaignDispatched}
      />

    </div>
  );
};
