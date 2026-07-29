import React, { useState, useEffect } from 'react';
import { Search, Bell, Sun, Moon, FileSpreadsheet, FileText, ServerOff, User } from 'lucide-react';
import { checkBackendHealth } from '../../lib/apiConfig';
import type { BackendHealthStatus } from '../../lib/apiConfig';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onOpenExcelModal: () => void;
  onOpenPitchModal: () => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  onOpenExcelModal,
  onOpenPitchModal,
  unreadCount,
  onOpenNotifications,
  searchTerm,
  setSearchTerm,
}) => {
  const [backendHealth, setBackendHealth] = useState<BackendHealthStatus | null>(null);

  useEffect(() => {
    checkBackendHealth().then((status) => setBackendHealth(status));
    const interval = setInterval(() => {
      checkBackendHealth().then((status) => setBackendHealth(status));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-20 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 flex items-center justify-between gap-4 transition-colors">
      
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search customer, account ID, or segment... (Press '/' to search)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-12 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all"
        />
        <span className="absolute right-3 top-2.5 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-slate-500 border border-slate-300 dark:border-slate-700">
          ⌘K
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        
        {/* Corporate Operational Status */}
        {backendHealth?.online ? (
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Status: Operational</span>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-medium" title="Backend Server Offline">
            <ServerOff className="w-3.5 h-3.5 text-amber-500" />
            <span>Backend Offline</span>
          </div>
        )}

        {/* Import Excel */}
        <button
          onClick={onOpenExcelModal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Import Excel</span>
        </button>

        {/* Export Report */}
        <button
          onClick={onOpenPitchModal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export Report</span>
        </button>

        {/* Notification Icon */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* Business Profile */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs border border-slate-300 dark:border-slate-700">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden lg:flex flex-col text-left text-xs">
            <span className="font-semibold text-slate-900 dark:text-slate-100">Administrator</span>
            <span className="text-[10px] text-slate-500">Business Administrator</span>
          </div>
        </div>

      </div>

    </header>
  );
};
