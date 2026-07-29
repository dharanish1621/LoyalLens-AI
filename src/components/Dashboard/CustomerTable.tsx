import React, { useState } from 'react';
import type { Customer, RiskTier } from '../../types';
import { Search, Sparkles, Eye, AlertCircle } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  onDeployRetention: (customer: Customer) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onSelectCustomer,
  onDeployRetention,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskTier, setSelectedRiskTier] = useState<string>('All');
  const [selectedSegment, setSelectedSegment] = useState<string>('All');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = selectedRiskTier === 'All' || c.riskTier === selectedRiskTier;
    const matchesSegment = selectedSegment === 'All' || c.segment === selectedSegment;

    return matchesSearch && matchesRisk && matchesSegment;
  });

  const getRiskBadge = (score: number, tier: RiskTier) => {
    if (tier === 'High') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5 animate-pulse" />
          {score}% High Risk
        </span>
      );
    }
    if (tier === 'Medium') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
          {score}% Medium Risk
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
        {score}% Stable
      </span>
    );
  };

  return (
    <div className="bg-zinc-900/90 rounded-xl border border-zinc-800 shadow-sm overflow-hidden mb-8">
      
      {/* Controls Bar: Search + Filters */}
      <div className="p-4 border-b border-zinc-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search customer, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
          />
        </div>

        {/* Risk & Segment Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          
          {/* Risk Tier Filter Buttons */}
          <div className="flex items-center space-x-1 bg-zinc-950 p-1 rounded-md border border-zinc-800 text-xs">
            {['All', 'High', 'Medium', 'Low'].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedRiskTier(tier)}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  selectedRiskTier === tier
                    ? 'bg-zinc-800 text-zinc-100 shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Segment Filter Dropdown */}
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-600"
          >
            <option value="All">All Segments</option>
            <option value="VIP">VIP Segment</option>
            <option value="Bargain Hunter">Bargain Hunters</option>
            <option value="Regular">Regular Buyers</option>
            <option value="New Buyer">New Buyers</option>
          </select>
        </div>

      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-950/60 border-b border-zinc-800 text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
              <th className="py-3 px-5">Customer Profile</th>
              <th className="py-3 px-4">Segment</th>
              <th className="py-3 px-4">CLV ($)</th>
              <th className="py-3 px-4">Churn Risk Score</th>
              <th className="py-3 px-4">Primary SHAP Driver</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-400">
                  <AlertCircle className="w-6 h-6 text-zinc-500 mx-auto mb-2" />
                  No customer profiles found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-zinc-800/40 transition-colors group"
                >
                  {/* Customer Profile */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center space-x-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                      />
                      <div>
                        <div className="font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                          {c.name}
                          {c.segment === 'VIP' && (
                            <span className="text-[10px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20 font-mono font-medium">
                              VIP
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-400 font-mono">{c.email} • {c.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Segment */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[11px] font-medium border border-zinc-700/60">
                      {c.segment}
                    </span>
                  </td>

                  {/* CLV */}
                  <td className="py-3.5 px-4 font-bold text-zinc-100 font-outfit text-sm">
                    ${c.clv.toLocaleString()}
                  </td>

                  {/* Churn Risk */}
                  <td className="py-3.5 px-4">
                    {getRiskBadge(c.churnRiskScore, c.riskTier)}
                  </td>

                  {/* Top SHAP Driver */}
                  <td className="py-3.5 px-4">
                    <div className="text-xs text-zinc-200 font-medium truncate max-w-[190px]">
                      {c.topDrivers[0]?.feature || 'Standard Pattern'}
                    </div>
                    <div className="text-[11px] text-zinc-400 truncate max-w-[190px]">
                      {c.topDrivers[0]?.description}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-5 text-right space-x-2">
                    <button
                      onClick={() => onSelectCustomer(c)}
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1.2 rounded-md text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-zinc-400" />
                      <span>XAI 360</span>
                    </button>

                    <button
                      onClick={() => onDeployRetention(c)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.2 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-900 hover:bg-zinc-200 shadow-sm transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                      <span>Deploy Rescue</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
