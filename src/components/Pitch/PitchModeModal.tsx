import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface PitchModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchModeModal: React.FC<PitchModeModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: "LoyalLens AI - Autonomous Customer Retention Platform",
      subtitle: "Transforming Passive Analytics into Automated Revenue Recovery",
      content: (
        <div className="text-center space-y-5 py-6">
          <div className="inline-block p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-sm text-indigo-400">
            <Sparkles className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-50 font-outfit">LoyalLens AI</h1>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto">
            The world’s first autonomous e-commerce churn prediction & hyper-personalized retention engine powered by Explainable AI (XAI).
          </p>
          <div className="flex justify-center gap-3 text-xs font-mono">
            <span className="bg-zinc-900 text-zinc-300 px-3 py-1 rounded-md border border-zinc-800">
              ⚡ Real-Time SHAP XAI
            </span>
            <span className="bg-zinc-900 text-zinc-300 px-3 py-1 rounded-md border border-zinc-800">
              🤖 Gemini LLM Retention Agent
            </span>
            <span className="bg-zinc-900 text-zinc-300 px-3 py-1 rounded-md border border-zinc-800">
              📈 Interactive ROI Calculator
            </span>
          </div>
        </div>
      )
    },
    {
      title: "The $136 Billion Silent Churn Problem",
      subtitle: "Why Traditional E-Commerce Tools Fail Store Owners",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
          <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 space-y-3">
            <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Legacy Reactive Tools
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li className="flex items-start gap-2">❌ Alert store owners 30 days AFTER customer stops ordering.</li>
              <li className="flex items-start gap-2">❌ Static rules fail to catch subtle drop in login & support sentiment.</li>
              <li className="flex items-start gap-2">❌ Generic blast emails get ignored in spam folders.</li>
              <li className="flex items-start gap-2">❌ High customer acquisition cost (5x more expensive than retention).</li>
            </ul>
          </div>

          <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 space-y-3">
            <h3 className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> The LoyalLens AI Paradigm
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li className="flex items-start gap-2">✅ Real-time behavioral telemetry catches intent weeks in advance.</li>
              <li className="flex items-start gap-2">✅ Explainable AI (SHAP) diagnoses exact friction drivers per user.</li>
              <li className="flex items-start gap-2">✅ Autonomous Agent crafts 1-to-1 personalized rescue offers.</li>
              <li className="flex items-start gap-2">✅ Recovers up to 78% of at-risk Customer Lifetime Value ($).</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Technical Architecture & Data Pipeline",
      subtitle: "Scalable Event-Driven Engine Designed for High Throughput",
      content: (
        <div className="space-y-3 py-3">
          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 text-xs font-mono space-y-2 text-zinc-300">
            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-between">
              <span className="text-indigo-400 font-bold">1. Event Telemetry Ingestion</span>
              <span>Shopify / WooCommerce Webhooks → Kafka Stream</span>
            </div>
            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-between">
              <span className="text-indigo-400 font-bold">2. Feature Store & Churn ML Scoring</span>
              <span>XGBoost Classifier + SHAP Feature Attribution Engine</span>
            </div>
            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-between">
              <span className="text-indigo-400 font-bold">3. Autonomous LLM Agent</span>
              <span>Gemini Prompt Engine → Tailored Offers & Copywriting</span>
            </div>
            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-between">
              <span className="text-indigo-400 font-bold">4. Omnichannel Dispatcher</span>
              <span>WhatsApp Cloud API + Resend Email Webhooks</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Judge Q&A & Bulletproof Defense",
      subtitle: "Anticipating Key Questions from Engineering & Business Judges",
      content: (
        <div className="space-y-3 py-2 text-xs">
          <div className="bg-zinc-900 p-3.5 rounded-lg border border-zinc-800 space-y-1">
            <span className="text-amber-300 font-medium block">Q: Does automated discounting hurt profit margins?</span>
            <p className="text-zinc-300">
              A: No! LoyalLens uses Incentive Sensitivity Scoring. For VIPs, it offers priority shipping or early access; for price-sensitive buyers, it offers targeted discounts. Our What-If ROI Calculator models net profit margin before dispatching.
            </p>
          </div>

          <div className="bg-zinc-900 p-3.5 rounded-lg border border-zinc-800 space-y-1">
            <span className="text-indigo-300 font-medium block">Q: How does this scale to millions of webhooks per second?</span>
            <p className="text-zinc-300">
              A: Asynchronous stream processing decouples heavy ML inference into micro-batches. Low-latency feature stores (Redis) serve real-time scoring in under 45ms.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-zinc-950 w-full max-w-4xl rounded-xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Header */}
        <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Presentation className="w-4 h-4 text-zinc-100" />
            <span className="font-semibold text-zinc-100 font-outfit text-sm">Hackathon Pitch Deck</span>
            <span className="text-xs text-zinc-400 font-mono">Slide {currentSlide + 1} of {slides.length}</span>
          </div>

          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-100 p-1 rounded-md">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-50 font-outfit">{slides[currentSlide].title}</h2>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1">{slides[currentSlide].subtitle}</p>
          </div>

          <div className="my-auto">
            {slides[currentSlide].content}
          </div>

          {/* Navigation controls */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <button
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide(prev => prev - 1)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-zinc-200 border border-zinc-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-1.5">
              {slides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                    currentSlide === i ? 'bg-zinc-100 w-5' : 'bg-zinc-800 hover:bg-zinc-600'
                  }`}
                />
              ))}
            </div>

            <button
              disabled={currentSlide === slides.length - 1}
              onClick={() => setCurrentSlide(prev => prev + 1)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 disabled:opacity-40 text-zinc-900 shadow-sm"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
