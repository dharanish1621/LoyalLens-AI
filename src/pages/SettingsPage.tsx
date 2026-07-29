import React, { useState } from 'react';
import { Settings, Sliders, Server, Save, CheckCircle2, Cpu } from 'lucide-react';

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
            <span>Platform Settings</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-outfit">Settings & Risk Classification Thresholds</h2>
          <p className="text-xs text-slate-500">
            Configure risk boundaries, automated outreach triggers, and view system specifications.
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
        
        {/* Risk Threshold Configuration */}
        <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Customer Risk Classification Thresholds</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">High Risk Cutoff Threshold (%)</label>
              <input
                type="number"
                value={highRiskCutoff}
                onChange={(e) => setHighRiskCutoff(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Accounts with risk score ≥ {highRiskCutoff}% flagged as High Risk</span>
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">Medium Risk Cutoff Threshold (%)</label>
              <input
                type="number"
                value={mediumRiskCutoff}
                onChange={(e) => setMediumRiskCutoff(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Accounts with risk score ≥ {mediumRiskCutoff}% flagged as Medium Risk</span>
            </div>
          </div>
        </div>

        {/* Automated Triggers */}
        <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Automated Operational Triggers</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-slate-900 dark:text-slate-100 block">Automated High-Risk Outreach</span>
              <span className="text-slate-500 text-[11px]">Automatically generate outreach campaign when risk score exceeds 75%</span>
            </div>

            <input
              type="checkbox"
              checked={autoRescueEnabled}
              onChange={(e) => setAutoRescueEnabled(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </div>
        </div>

        {/* System Information (Technology Stack) */}
        <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Cpu className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span>System Information & Technology Specifications</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 font-mono block text-[10px]">CLASSIFICATION MODEL</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">XGBoost Classifier v1.7.0</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 font-mono block text-[10px]">FEATURE EXPLAINABILITY</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">SHAP TreeExplainer</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 font-mono block text-[10px]">EXPERIMENT TRACKING</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">MLflow Tracking Store</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 font-mono block text-[10px]">REST API SERVICE</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">Python Flask / FastAPI</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 font-mono block text-[10px]">FRONTEND FRAMEWORK</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">React + TypeScript + Tailwind</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 font-mono block text-[10px]">BENCHMARK ACCURACY</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">91.82% Accuracy (0.926 AUC)</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>

      </form>

    </div>
  );
};
