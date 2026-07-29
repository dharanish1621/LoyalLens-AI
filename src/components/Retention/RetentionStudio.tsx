import React, { useState, useEffect } from 'react';
import type { Customer, RetentionCampaign } from '../../types';
import { generateAIRetentionCampaign } from '../../lib/aiRetentionAgent';
import confetti from 'canvas-confetti';
import { Sparkles, Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Copy, RefreshCw, Volume2 } from 'lucide-react';

interface RetentionStudioProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer) => void;
  onCampaignDispatched: (campaign: RetentionCampaign) => void;
}

export const RetentionStudio: React.FC<RetentionStudioProps> = ({
  customers,
  selectedCustomer,
  onSelectCustomer,
  onCampaignDispatched,
}) => {
  const currentCust = selectedCustomer || customers[0];
  const [campaign, setCampaign] = useState<RetentionCampaign>(() => generateAIRetentionCampaign(currentCust));
  const [activeTab, setActiveTab] = useState<'Email' | 'WhatsApp' | 'SMS' | 'Voice'>('Email');
  const [isGenerating, setIsGenerating] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (currentCust) {
      setCampaign(generateAIRetentionCampaign(currentCust));
      setDispatched(false);
    }
  }, [currentCust]);

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setCampaign(generateAIRetentionCampaign(currentCust));
      setIsGenerating(false);
    }, 600);
  };

  const handleDispatch = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setDispatched(true);
    onCampaignDispatched({ ...campaign, status: 'Dispatched' });
  };

  const copyDiscountCode = () => {
    navigator.clipboard.writeText(campaign.discountCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-zinc-900/90 p-6 rounded-xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous AI Retention Studio</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-50 font-outfit">Hyper-Personalized Campaign Studio</h2>
          <p className="text-xs text-zinc-400">
            Tailoring offers and copywriting dynamically from SHAP feature attributions.
          </p>
        </div>

        {/* Target Selector */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">Target Customer:</span>
          <select
            value={currentCust.id}
            onChange={(e) => {
              const cust = customers.find(c => c.id === e.target.value);
              if (cust) onSelectCustomer(cust);
            }}
            className="bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-md px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-zinc-600"
          >
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.riskTier} Risk - {c.churnRiskScore}%)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Target Profile & AI Config */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Target Profile Card */}
          <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={currentCust.avatar}
                alt={currentCust.name}
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
              />
              <div>
                <h3 className="font-semibold text-zinc-100 text-sm">{currentCust.name}</h3>
                <span className="text-[11px] text-rose-400 font-medium bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  {currentCust.churnRiskScore}% Risk ({currentCust.riskTier})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-zinc-950 p-3 rounded-lg border border-zinc-800 mb-3">
              <div>
                <span className="text-zinc-400 block font-mono">Segment:</span>
                <span className="font-semibold text-zinc-100">{currentCust.segment}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-mono">CLV at Risk:</span>
                <span className="font-semibold text-emerald-400">${currentCust.clv.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-xs text-zinc-300">
              <span className="text-zinc-400 font-medium block mb-1">Primary SHAP Driver:</span>
              <p className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 font-mono text-[11px] text-amber-300">
                ⚠️ {currentCust.topDrivers[0]?.feature}: {currentCust.topDrivers[0]?.description}
              </p>
            </div>
          </div>

          {/* Generated Package */}
          <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                AI Generated Rescue Package
              </span>
              <button
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>Re-generate</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-zinc-400 block font-mono">Strategy Name:</span>
                <span className="font-semibold text-zinc-100">{campaign.strategyName}</span>
              </div>

              <div>
                <span className="text-zinc-400 block font-mono">Incentive Package:</span>
                <span className="font-bold text-indigo-300 text-sm">{campaign.incentiveValue}</span>
              </div>

              <div>
                <span className="text-zinc-400 block font-mono">Promo Code:</span>
                <div className="flex items-center justify-between bg-zinc-950 p-2 rounded-md border border-zinc-800 mt-1">
                  <span className="font-mono font-bold text-amber-300">{campaign.discountCode}</span>
                  <button
                    onClick={copyDiscountCode}
                    className="text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 block">Est. Retention</span>
                  <span className="text-base font-bold text-emerald-400">{campaign.estimatedRetentionRate}%</span>
                </div>
                <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 block">Saved Value</span>
                  <span className="text-base font-bold text-indigo-300">${campaign.expectedRevenueSaved.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Omnichannel Preview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-900/90 p-5 rounded-xl border border-zinc-800 shadow-sm">
            
            {/* Channel Tabs */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Live Channel Preview
              </span>
              
              <div className="flex items-center space-x-1 bg-zinc-950 p-1 rounded-md border border-zinc-800 text-xs">
                <button
                  onClick={() => setActiveTab('Email')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded font-medium transition-all ${
                    activeTab === 'Email' ? 'bg-zinc-800 text-zinc-50 shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>

                <button
                  onClick={() => setActiveTab('WhatsApp')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded font-medium transition-all ${
                    activeTab === 'WhatsApp' ? 'bg-zinc-800 text-zinc-50 shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => setActiveTab('Voice')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded font-medium transition-all ${
                    activeTab === 'Voice' ? 'bg-zinc-800 text-zinc-50 shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI Voice</span>
                </button>
              </div>
            </div>

            {/* Email Preview */}
            {activeTab === 'Email' && (
              <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-4 space-y-3 font-sans text-xs">
                <div className="border-b border-zinc-800 pb-2.5 space-y-1 text-zinc-400 font-mono">
                  <div><span>To:</span> <span className="text-zinc-200">{currentCust.email}</span></div>
                  <div><span>Subject:</span> <span className="text-indigo-300 font-semibold">{campaign.emailHeadline}</span></div>
                </div>

                <div className="whitespace-pre-line text-zinc-300 leading-relaxed bg-zinc-900/60 p-3.5 rounded-md border border-zinc-800">
                  {campaign.aiGeneratedCopy}
                </div>

                <div className="pt-2 text-center">
                  <button className="px-5 py-2 bg-zinc-100 text-zinc-900 font-semibold text-xs rounded-md shadow-sm">
                    Claim Offer ({campaign.discountCode})
                  </button>
                </div>
              </div>
            )}

            {/* WhatsApp Preview */}
            {activeTab === 'WhatsApp' && (
              <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-4 space-y-3">
                <div className="flex items-center space-x-2 border-b border-zinc-800 pb-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-400 font-mono">WhatsApp Business API Webhook</span>
                </div>

                <div className="max-w-[85%] bg-zinc-900 text-zinc-200 p-3.5 rounded-lg border border-zinc-800 text-xs leading-relaxed space-y-1.5">
                  <p>{campaign.whatsappCopy}</p>
                  <span className="text-[10px] text-zinc-500 block text-right">Just now • Delivered</span>
                </div>
              </div>
            )}

            {/* Voice Preview */}
            {activeTab === 'Voice' && (
              <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-4 space-y-3 text-xs">
                <div className="flex items-center space-x-2 text-amber-400 font-medium">
                  <Volume2 className="w-4 h-4" />
                  <span>Synthetic AI Concierge Voice Script Preview</span>
                </div>

                <div className="bg-zinc-900/60 p-3.5 rounded-md border border-zinc-800 text-zinc-300 font-mono leading-relaxed">
                  "Hello {currentCust.name.split(' ')[0]}, this is your LoyalLens Concierge calling. We noticed a recent shipping delay on your last order. To ensure complete satisfaction, we've credited {campaign.incentiveValue} to your profile with voucher code {campaign.discountCode}. Press 1 to speak with senior support."
                </div>
              </div>
            )}

            {/* Dispatch Action */}
            <div className="pt-5 border-t border-zinc-800 flex items-center justify-between">
              <div>
                {dispatched ? (
                  <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    Campaign Dispatched via {activeTab}!
                  </span>
                ) : (
                  <span className="text-xs text-zinc-400 font-mono">
                    Ready to send via Omnichannel API
                  </span>
                )}
              </div>

              <button
                onClick={handleDispatch}
                disabled={dispatched}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-md font-semibold text-xs transition-all ${
                  dispatched
                    ? 'bg-emerald-600 text-zinc-50 cursor-default'
                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 shadow-sm'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{dispatched ? 'Campaign Dispatched' : 'Dispatch Offer Now'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
