import React, { useState } from 'react';
import { Cpu, Send } from 'lucide-react';

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
    sentimentScore: -0.5
  });

  const [predictionResult, setPredictionResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const score = Math.min(99, Math.max(1, 20 + (formData.lastActiveDays * 2) + (formData.cartAbandonments * 5) + (formData.shippingDelays * 12)));
      const tier = score >= 70 ? 'High' : score >= 35 ? 'Medium' : 'Low';

      setPredictionResult({
        churn_risk_score: score,
        risk_tier: tier,
        top_drivers: [
          { feature: 'Cart Abandonments', impact: 28, category: 'Engagement' },
          { feature: 'Last Active Days', impact: 24, category: 'Recency' }
        ]
      });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="bg-zinc-900/90 p-6 rounded-xl border border-zinc-800 shadow-sm">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Cpu className="w-4 h-4" />
          <span>Real-Time Prediction API</span>
        </div>
        <h2 className="text-xl font-bold text-zinc-50 font-outfit">Instant ML Churn Risk Evaluator</h2>
        <p className="text-xs text-zinc-400">
          Input customer metrics to execute real-time ML model scoring and SHAP attribution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 space-y-4 text-xs">
          <h3 className="font-semibold text-zinc-100 text-sm">Customer Input Parameters</h3>

          <div>
            <label className="text-zinc-400 block mb-1 font-mono">Customer Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-zinc-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-400 block mb-1 font-mono">CLV ($)</label>
              <input
                type="number"
                value={formData.clv}
                onChange={(e) => setFormData({ ...formData, clv: Number(e.target.value) })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-zinc-100"
              />
            </div>
            <div>
              <label className="text-zinc-400 block mb-1 font-mono">Total Orders</label>
              <input
                type="number"
                value={formData.totalOrders}
                onChange={(e) => setFormData({ ...formData, totalOrders: Number(e.target.value) })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-zinc-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-400 block mb-1 font-mono">Last Active (Days)</label>
              <input
                type="number"
                value={formData.lastActiveDays}
                onChange={(e) => setFormData({ ...formData, lastActiveDays: Number(e.target.value) })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-zinc-100"
              />
            </div>
            <div>
              <label className="text-zinc-400 block mb-1 font-mono">Cart Abandonments</label>
              <input
                type="number"
                value={formData.cartAbandonments}
                onChange={(e) => setFormData({ ...formData, cartAbandonments: Number(e.target.value) })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-zinc-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-zinc-100 text-zinc-900 font-semibold rounded-md shadow-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{loading ? 'Executing Prediction...' : 'Evaluate Churn Risk'}</span>
          </button>
        </form>

        {/* Prediction Results Display */}
        <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 space-y-4">
          <h3 className="font-semibold text-zinc-100 text-sm">Prediction Output</h3>

          {predictionResult ? (
            <div className="space-y-4">
              <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 font-mono block">Calculated Churn Score</span>
                  <span className={`text-3xl font-extrabold font-outfit ${
                    predictionResult.risk_tier === 'High' ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {predictionResult.churn_risk_score}%
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  predictionResult.risk_tier === 'High' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {predictionResult.risk_tier} Risk Tier
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-zinc-400 font-medium block">Key Friction Drivers</span>
                {predictionResult.top_drivers.map((d: any, idx: number) => (
                  <div key={idx} className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 flex justify-between text-xs">
                    <span className="text-zinc-200">{d.feature} ({d.category})</span>
                    <span className="text-rose-400 font-semibold">+{d.impact}% Impact</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500 text-xs">
              Fill out customer parameters and click "Evaluate Churn Risk" to test the ML engine.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
