import React from 'react';
import { Radar, Zap, ShieldAlert, Sparkles, SlidersHorizontal, Presentation, FileSpreadsheet } from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'retention' | 'simulator';
  setActiveTab: (tab: 'dashboard' | 'retention' | 'simulator') => void;
  isSimulating: boolean;
  setIsSimulating: (sim: boolean) => void;
  onOpenPitch: () => void;
  onOpenExcelModal: () => void;
  highRiskCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isSimulating,
  setIsSimulating,
  onOpenPitch,
  onOpenExcelModal,
  highRiskCount
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-4 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-sm">
            <Radar className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-zinc-100 tracking-tight font-outfit">LoyalLens</span>
              <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/80">
                shadcn UI
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">Autonomous Churn Prediction & Retention Engine</p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="flex items-center bg-zinc-900/90 p-1 rounded-lg border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-zinc-800 text-zinc-50 shadow-sm border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Churn Radar</span>
            {highRiskCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {highRiskCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('retention')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'retention'
                ? 'bg-zinc-800 text-zinc-50 shadow-sm border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Retention Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'simulator'
                ? 'bg-zinc-800 text-zinc-50 shadow-sm border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            <span>What-If ROI Calculator</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5">
          
          {/* Import Excel File Button */}
          <button
            onClick={onOpenExcelModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Import Excel</span>
          </button>

          {/* Live Telemetry Status Badge */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
              isSimulating
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isSimulating ? 'text-indigo-400' : ''}`} />
            <span>{isSimulating ? 'Live Telemetry' : 'Paused'}</span>
          </button>

          {/* Pitch Deck Button */}
          <button
            onClick={onOpenPitch}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-all shadow-sm"
          >
            <Presentation className="w-3.5 h-3.5 text-zinc-900" />
            <span>2-Min Pitch</span>
          </button>
        </div>

      </div>
    </header>
  );
};
