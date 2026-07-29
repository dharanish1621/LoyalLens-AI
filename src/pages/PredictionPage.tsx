import React, { useState } from 'react';
import { ShieldAlert, Send } from 'lucide-react';

export const PredictionPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@tech.io',
    clv: 3500,
    totalOrders: 12,
    lastActiveDays: 14,
    cartAbandonments: 3,
    supportTickets: 2,
    shippingDelays: 1,
  });

  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const score = Math.min(99, Math.max(1, 20 + (formData.lastActiveDays * 2) + (formData.cartAbandonments * 5) + (formData.shippingDelays * 12)));
      const tier = score >= 70 ? 'High' : score >= 35 ? 'Medium' : 'Low';

      setEvaluationResult({
        risk_score: score,
        risk_tier: tier,
        probability: score,
        top_risk_factors: [
          { factor: 'Cart Abandonment Velocity', impact: 28, category: 'Engagement' },
          { factor: 'Days Since Last Active Purchase', impact: 24, category: 'Recency' }
        ],
        recommended_strategy: tier === 'High' ? 'Deploy VIP Express Pass + $25 Credit' : 'Include in Weekly Re-engagement Campaign'
      });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="saas-card p-6 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>Account Risk Evaluation</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-outfit">Customer Risk Evaluator</h2>
        <p className="text-xs text-slate-500">
          Input customer activity metrics to compute risk tier classification and recommended retention strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="saas-card p-5 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm border-b border-slate-200 dark:border-slate-800 pb-2">Customer Parameters</h3>

          <div>
            <label className="text-slate-600 dark:text-slate-400 block mb-1 font-medium">Customer Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-600 dark:text-slate-400 block mb-1 font-medium">Customer Lifetime Value ($)</label>
              <input
                type="number"
                value={formData.clv}
                onChange={(e) => setFormData({ ...formData, clv: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-slate-600 dark:text-slate-400 block mb-1 font-medium font-mono">Total Orders</label>
              <input
                type="number"
                value={formData.totalOrders}
                onChange={(e) => setFormData({ ...formData, totalOrders: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-600 dark:text-slate-400 block mb-1 font-medium">Days Since Last Active</label>
              <input
                type="number"
                value={formData.lastActiveDays}
                onChange={(e) => setFormData({ ...formData, lastActiveDays: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-slate-600 dark:text-slate-400 block mb-1 font-medium">Cart Abandonments</label>
              <input
                type="number"
                value={formData.cartAbandonments}
                onChange={(e) => setFormData({ ...formData, cartAbandonments: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{loading ? 'Evaluating...' : 'Evaluate Risk Score'}</span>
          </button>
        </form>

        {/* Prediction Results Display */}
        <div className="saas-card p-5 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm border-b border-slate-200 dark:border-slate-800 pb-2">Risk Evaluation Summary</h3>

          {evaluationResult ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Risk Score</span>
                  <span className={`text-3xl font-extrabold font-outfit ${
                    evaluationResult.risk_tier === 'High' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {evaluationResult.risk_score}%
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  evaluationResult.risk_tier === 'High' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                }`}>
                  {evaluationResult.risk_tier} Risk Tier
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Primary Risk Factors</span>
                {evaluationResult.top_risk_factors.map((d: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between text-xs">
                    <span className="text-slate-900 dark:text-slate-100">{d.factor} ({d.category})</span>
                    <span className="text-rose-600 dark:text-rose-400 font-semibold">+{d.impact}% Weight</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs">
                <span className="font-bold text-blue-900 dark:text-blue-200 block mb-0.5">Recommended Action:</span>
                <span className="text-blue-700 dark:text-blue-300">{evaluationResult.recommended_strategy}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Fill out customer parameters and click "Evaluate Risk Score" to generate evaluation.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
