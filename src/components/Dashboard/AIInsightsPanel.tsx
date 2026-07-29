import React from 'react';
import { BrainCircuit, CheckCircle2, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

export const AIInsightsPanel: React.FC = () => {
  const topRiskFactors = [
    { factor: 'Logistics Shipping Delays (>3 days)', weight: 38, category: 'Logistics', status: 'Critical' },
    { factor: 'Support Ticket Sentiment Decay (-0.75 score)', weight: 29, category: 'Support', status: 'High' },
    { factor: 'Cart Abandonment Velocity (3+ high-value carts)', weight: 22, category: 'Engagement', status: 'High' },
    { factor: 'Price Match Sensitivity / Promo Expired Friction', weight: 11, category: 'Pricing', status: 'Medium' },
  ];

  const featureImportances = [
    { name: 'Days_Since_Last_Purchase', score: 94 },
    { name: 'Cart_Abandonment_Rate', score: 88 },
    { name: 'Customer_Service_Calls', score: 82 },
    { name: 'Returns_Rate', score: 76 },
    { name: 'Discount_Usage_Rate', score: 65 },
  ];

  return (
    <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
            <BrainCircuit className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-outfit">AI Insights & Explainability Panel</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Real-time XGBoost ML Model Diagnostics & Feature Attributions</p>
          </div>
        </div>

        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Model Live
        </span>
      </div>

      {/* Model Performance Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">Model Accuracy</span>
          <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-outfit">91.8%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">AI Confidence</span>
          <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-outfit">94.2%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">ROC-AUC Score</span>
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-outfit">0.926</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">F1 Benchmark</span>
          <span className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-outfit">0.849</span>
        </div>
      </div>

      {/* Grid: Top Risk Factors + Feature Importance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* Top Risk Factors */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              Primary Churn Risk Drivers (SHAP)
            </span>
            <span className="font-mono text-slate-400">Impact Weight</span>
          </div>

          <div className="space-y-2">
            {topRiskFactors.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-900 dark:text-slate-100">{item.factor}</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">+{item.weight}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full"
                    style={{ width: `${item.weight * 2.2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Importance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              Feature Importance Ranking
            </span>
            <span className="font-mono text-slate-400">Weight Score</span>
          </div>

          <div className="space-y-2">
            {featureImportances.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200 font-mono">{item.name}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{item.score}/100</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-full rounded-full"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Explainable AI Executive Brief */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-950 dark:text-blue-200 space-y-1.5">
        <div className="flex items-center space-x-2 font-bold text-blue-700 dark:text-blue-400">
          <Sparkles className="w-4 h-4" />
          <span>Explainable AI Executive Diagnostic Summary</span>
        </div>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
          XGBoost model detects that <strong>68% of churn risk escalation</strong> stems from consecutive delivery delays paired with unresolved support tickets. Deploying automated Express Shipping VIP Passes recovers up to 84% of exposed Customer Lifetime Value ($).
        </p>
      </div>

    </div>
  );
};
