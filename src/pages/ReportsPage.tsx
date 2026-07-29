import React from 'react';
import type { Customer } from '../types';
import { FileText, Download } from 'lucide-react';
import { downloadSampleExcel } from '../lib/excelImporter';

interface ReportsPageProps {
  customers: Customer[];
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ customers }) => {
  const highRisk = customers.filter(c => c.riskTier === 'High');
  const totalClvAtRisk = highRisk.reduce((sum, c) => sum + c.clv, 0);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="bg-zinc-900/90 p-6 rounded-xl border border-zinc-800 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Automated Executive Reporting</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-50 font-outfit">Churn Intelligence Reports</h2>
          <p className="text-xs text-zinc-400">
            Export executive summaries and CSV/Excel audit reports for leadership review.
          </p>
        </div>

        <button
          onClick={downloadSampleExcel}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-all shadow-sm"
        >
          <Download className="w-3.5 h-3.5 text-zinc-900" />
          <span>Export Excel Report</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800">
          <span className="text-xs text-zinc-400 block mb-1 font-mono">Total Monitored Accounts</span>
          <span className="text-2xl font-bold text-zinc-100 font-outfit">{customers.length}</span>
        </div>

        <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800">
          <span className="text-xs text-rose-400 block mb-1 font-mono">High Risk Cohort</span>
          <span className="text-2xl font-bold text-rose-400 font-outfit">{highRisk.length} Users</span>
        </div>

        <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800">
          <span className="text-xs text-emerald-400 block mb-1 font-mono">CLV Exposed at Risk</span>
          <span className="text-2xl font-bold text-emerald-400 font-outfit">${totalClvAtRisk.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
