import React, { useState } from 'react';
import { Settings, Sliders, Server, Save, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [highRiskCutoff, setHighRiskCutoff] = useState(70);
  const [mediumRiskCutoff, setMediumRiskCutoff] = useState(35);
  const [autoRescueEnabled, setAutoRescueEnabled] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Platform Configuration</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-outfit">Settings & Model Thresholds</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure risk classification boundaries, automated triggers, and API webhooks.
          </p>
        </div>

        {saved && (
          <span className="flex items-center space-x-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* ML Risk Threshold Configuration */}
        <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>XGBoost ML Risk Classification Thresholds</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">High Risk Cutoff Threshold (%)</label>
              <input
                type="number"
                value={highRiskCutoff}
                onChange={(e) => setHighRiskCutoff(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Customers with score ≥ {highRiskCutoff}% flagged as High Risk</span>
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">Medium Risk Cutoff Threshold (%)</label>
              <input
                type="number"
                value={mediumRiskCutoff}
                onChange={(e) => setMediumRiskCutoff(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Customers with score ≥ {mediumRiskCutoff}% flagged as Medium Risk</span>
            </div>
          </div>
        </div>

        {/* Automated Dispatch Integration Settings */}
        <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Automated Downstream Action Triggers</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-slate-900 dark:text-slate-100 block">Autonomous VIP Concierge Alerts</span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">Automatically trigger WhatsApp rescue code when churn score exceeds 75%</span>
            </div>

            <input
              type="checkbox"
              checked={autoRescueEnabled}
              onChange={(e) => setAutoRescueEnabled(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Platform Configuration</span>
        </button>

      </form>

    </div>
  );
};
