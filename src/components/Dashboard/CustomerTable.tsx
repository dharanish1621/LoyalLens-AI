import React, { useState } from 'react';
import type { Customer, RiskTier } from '../../types';
import { Search, Eye, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [sortField, setSortField] = useState<'clv' | 'churnRiskScore' | 'name'>('churnRiskScore');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredCustomers = customers
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRisk = selectedRiskTier === 'All' || c.riskTier === selectedRiskTier;
      const matchesSegment = selectedSegment === 'All' || c.segment === selectedSegment;

      return matchesSearch && matchesRisk && matchesSegment;
    })
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortAsc ? (valA as string).localeCompare(valB as string) : (valB as string).localeCompare(valA as string);
      }
      return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

  const totalPages = Math.ceil(filteredCustomers.length / pageSize) || 1;
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field: 'clv' | 'churnRiskScore' | 'name') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const getRiskBadge = (score: number, tier: RiskTier) => {
    if (tier === 'High') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-[#DC2626] border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mr-1.5" />
          {score}% High Risk
        </span>
      );
    }
    if (tier === 'Medium') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-[#F59E0B] border border-amber-200 dark:bg-amber-950/40 dark:border-amber-900">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mr-1.5" />
          {score}% Medium Risk
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900">
        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mr-1.5" />
        {score}% Stable
      </span>
    );
  };

  return (
    <div className="enterprise-card overflow-hidden">
      
      {/* Controls Bar */}
      <div className="p-4 border-b border-[#E5E7EB] dark:border-[#1F2937] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="heading-card">Customer Directory</h3>
          <p className="text-label-small text-[#6B7280]">Filter, search, and inspect customer metrics</p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8FAFC] dark:bg-[#0B0F17] border border-[#E5E7EB] dark:border-[#1F2937] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#111827] dark:text-[#F9FAFB]"
            />
          </div>

          {/* Risk Filter */}
          <select
            value={selectedRiskTier}
            onChange={(e) => setSelectedRiskTier(e.target.value)}
            className="bg-[#F8FAFC] dark:bg-[#0B0F17] border border-[#E5E7EB] dark:border-[#1F2937] text-[#111827] dark:text-[#F9FAFB] text-xs rounded-lg px-3 py-1.5"
          >
            <option value="All">All Risk Tiers</option>
            <option value="High">High Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="Low">Low Risk</option>
          </select>

          {/* Segment Filter */}
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="bg-[#F8FAFC] dark:bg-[#0B0F17] border border-[#E5E7EB] dark:border-[#1F2937] text-[#111827] dark:text-[#F9FAFB] text-xs rounded-lg px-3 py-1.5"
          >
            <option value="All">All Segments</option>
            <option value="VIP">VIP</option>
            <option value="Regular">Regular</option>
            <option value="Bargain Hunter">Bargain Hunter</option>
            <option value="New Buyer">New Buyer</option>
          </select>
        </div>
      </div>

      {/* Enterprise Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] dark:bg-[#0B0F17] text-[#6B7280] font-semibold border-b border-[#E5E7EB] dark:border-[#1F2937] sticky top-0">
            <tr>
              <th className="py-3 px-4">Account ID & Name</th>
              <th className="py-3 px-4">Segment</th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('clv')}>
                <div className="flex items-center space-x-1">
                  <span>Lifetime Value ($)</span>
                  <ArrowUpDown className="w-3 h-3 text-[#6B7280]" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('churnRiskScore')}>
                <div className="flex items-center space-x-1">
                  <span>Risk Score</span>
                  <ArrowUpDown className="w-3 h-3 text-[#6B7280]" />
                </div>
              </th>
              <th className="py-3 px-4">Last Active</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#1F2937]">
            {paginatedCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <img src={cust.avatar} alt={cust.name} className="w-8 h-8 rounded-full object-cover border border-[#E5E7EB]" />
                    <div>
                      <span className="font-semibold text-[#111827] dark:text-[#F9FAFB] block">{cust.name}</span>
                      <span className="text-[11px] text-[#6B7280] font-mono">{cust.id}</span>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#111827] dark:text-slate-300 font-medium">
                    {cust.segment}
                  </span>
                </td>

                <td className="py-3 px-4 font-semibold font-mono text-[#111827] dark:text-[#F9FAFB]">
                  ${cust.clv.toLocaleString()}
                </td>

                <td className="py-3 px-4">
                  {getRiskBadge(cust.churnRiskScore, cust.riskTier)}
                </td>

                <td className="py-3 px-4 text-[#6B7280]">
                  {cust.lastActiveDaysAgo} days ago
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onSelectCustomer(cust)}
                      className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-[#6B7280] hover:text-[#111827] dark:hover:text-white transition-colors"
                      title="Inspect Profile"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeployRetention(cust)}
                      className="px-2.5 py-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-[11px] transition-colors"
                    >
                      Strategy
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enterprise Pagination Bar */}
      <div className="p-4 border-t border-[#E5E7EB] dark:border-[#1F2937] flex items-center justify-between text-xs text-[#6B7280]">
        <span>
          Showing {Math.min((currentPage - 1) * pageSize + 1, filteredCustomers.length)} to {Math.min(currentPage * pageSize, filteredCustomers.length)} of {filteredCustomers.length} accounts
        </span>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded bg-slate-100 dark:bg-slate-800 disabled:opacity-50 text-[#111827] dark:text-slate-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-medium text-[#111827] dark:text-[#F9FAFB] font-mono">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded bg-slate-100 dark:bg-slate-800 disabled:opacity-50 text-[#111827] dark:text-slate-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
