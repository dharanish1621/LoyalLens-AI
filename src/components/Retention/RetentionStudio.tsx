import React, { useState, useEffect } from 'react';
import type { Customer, RetentionCampaign } from '../../types';
import { generateAIRetentionCampaign } from '../../lib/aiRetentionAgent';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Copy, RefreshCw, HeartHandshake } from 'lucide-react';

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
    }, 400);
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

  const priorityLevel = currentCust.churnRiskScore >= 70 ? 'High Priority' : currentCust.churnRiskScore >= 35 ? 'Medium Priority' : 'Low Priority';
  const expectedImpact = `${Math.min(92, Math.round(75 + currentCust.totalOrders * 0.5))}% Success Rate`;
  const revenueSaved = `$${currentCust.clv.toLocaleString()}`;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <HeartHandshake className="w-4 h-4" />
            <span>Retention Outreach Studio</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-outfit">Campaign Strategy & Account Rescue</h2>
          <p className="text-xs text-slate-500">
            Tailoring customer offers, direct messaging templates, and automated re-engagement workflows.
          </p>
        </div>

        {/* Target Selector */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Target Customer:</span>
          <select
            value={currentCust.id}
            onChange={(e) => {
              const cust = customers.find(c => c.id === e.target.value);
              if (cust) onSelectCustomer(cust);
            }}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-blue-600"
          >
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.riskTier} Risk - {c.churnRiskScore}% Risk Score)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Target Profile & Strategy Metrics */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Target Profile Card */}
          <div className="saas-card p-5 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={currentCust.avatar}
                alt={currentCust.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{currentCust.name}</h3>
                <span className="text-[11px] text-rose-600 dark:text-rose-400 font-medium bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                  {currentCust.churnRiskScore}% Risk Score ({currentCust.riskTier})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 mb-3">
              <div>
                <span className="text-slate-500 block font-medium">Segment:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{currentCust.segment}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Revenue at Risk:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">${currentCust.clv.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Strategy Details Card */}
          <div className="saas-card p-5 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">Retention Strategy Specification</h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Recommended Action:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{campaign.channel} Rescue Package</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Priority:</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">{priorityLevel}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Expected Impact:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{expectedImpact}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Estimated Revenue Saved:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono">{revenueSaved}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Copywriting & Multi-Channel Preview */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            
            {/* Channel Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex space-x-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
                {(['Email', 'WhatsApp', 'SMS', 'Voice'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>Refresh Strategy</span>
              </button>
            </div>

            {/* Campaign Template Details */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-500 font-medium block mb-1">Outreach Subject Line</label>
                <input
                  type="text"
                  readOnly
                  value={campaign.emailHeadline || `Account Retention Outreach - ${currentCust.name}`}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-500 font-medium block mb-1">Message Content</label>
                <textarea
                  readOnly
                  rows={6}
                  value={
                    activeTab === 'WhatsApp' ? campaign.whatsappCopy : campaign.aiGeneratedCopy
                  }
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-slate-900 dark:text-slate-100 leading-relaxed font-mono text-xs"
                />
              </div>

              {/* Discount Code Box */}
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-blue-700 dark:text-blue-300 font-medium block">Incentive Code</span>
                  <span className="font-mono font-bold text-blue-900 dark:text-blue-100 text-sm tracking-wider">{campaign.discountCode}</span>
                </div>
                <button
                  onClick={copyDiscountCode}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleDispatch}
                  disabled={dispatched}
                  className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white shadow-md transition-all ${
                    dispatched
                      ? 'bg-emerald-600 cursor-default'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {dispatched ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Outreach Dispatched!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Execute Retention Outreach</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
