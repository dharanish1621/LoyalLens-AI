import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  FileSpreadsheet,
  FileText,
  User,
  ChevronDown,
  Building,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  ServerOff
} from 'lucide-react';
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
  onSignOut?: () => void;
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
  onSignOut = () => {},
}) => {
  const [backendHealth, setBackendHealth] = useState<BackendHealthStatus | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkBackendHealth().then((status) => setBackendHealth(status));
    const interval = setInterval(() => {
      checkBackendHealth().then((status) => setBackendHealth(status));
    }, 10000);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 h-16 bg-white dark:bg-[#111827] border-b border-[#E5E7EB] dark:border-[#1F2937] px-6 flex items-center justify-between gap-4 transition-colors">
      
      {/* Global Search */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Global Search... (Press '/' to search)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#F8FAFC] dark:bg-[#0B0F17] border border-[#E5E7EB] dark:border-[#1F2937] rounded-lg pl-10 pr-12 py-2 text-[13px] text-[#111827] dark:text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#2563EB] transition-colors"
        />
        <span className="absolute right-3 top-2.5 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-[#6B7280] border border-slate-300 dark:border-slate-700">
          ⌘K
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        
        {/* Operational / Backend Status */}
        {backendHealth?.online === false && (
          <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 text-[#F59E0B] border border-amber-200 dark:border-amber-900 text-[11px] font-medium" title="Backend Server Offline">
            <ServerOff className="w-3.5 h-3.5" />
            <span>Backend Offline</span>
          </div>
        )}

        {/* Import Excel */}
        <button
          onClick={onOpenExcelModal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium bg-[#16A34A] hover:bg-emerald-700 text-white transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span className="hidden sm:inline">Import Excel</span>
        </button>

        {/* Export Report */}
        <button
          onClick={onOpenPitchModal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Export Report</span>
        </button>

        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg bg-[#F8FAFC] dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#6B7280] dark:text-slate-300 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#DC2626]" />
          )}
        </button>

        {/* Help Button */}
        <button
          className="p-2 rounded-lg bg-[#F8FAFC] dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#6B7280] dark:text-slate-300 transition-colors"
          title="Help Center"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-[#F8FAFC] dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#6B7280] dark:text-slate-300 transition-colors"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-[#6B7280]" />}
        </button>

        {/* Corporate Profile Dropdown */}
        <div className="relative pl-2 border-l border-[#E5E7EB] dark:border-[#1F2937]" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2.5 p-1 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[#111827] dark:text-[#F9FAFB] font-bold text-xs border border-[#E5E7EB] dark:border-slate-700">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:flex flex-col text-left text-[13px]">
              <span className="font-semibold text-[#111827] dark:text-[#F9FAFB]">Administrator</span>
              <span className="text-[11px] text-[#6B7280]">Business Administrator</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] hidden lg:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl shadow-lg py-2 z-50 text-[13px]">
              <div className="px-4 py-2 border-b border-[#E5E7EB] dark:border-[#1F2937]">
                <p className="font-bold text-[#111827] dark:text-[#F9FAFB]">Administrator</p>
                <p className="text-[11px] text-[#6B7280] truncate">administrator@enterprise.com</p>
              </div>

              <div className="py-1">
                <button className="w-full px-4 py-2 flex items-center space-x-2.5 text-[#111827] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors">
                  <User className="w-4 h-4 text-[#6B7280]" />
                  <span>My Profile</span>
                </button>

                <button className="w-full px-4 py-2 flex items-center space-x-2.5 text-[#111827] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors">
                  <Building className="w-4 h-4 text-[#6B7280]" />
                  <span>Organization</span>
                </button>

                <button className="w-full px-4 py-2 flex items-center space-x-2.5 text-[#111827] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors">
                  <Shield className="w-4 h-4 text-[#6B7280]" />
                  <span>Security</span>
                </button>

                <button className="w-full px-4 py-2 flex items-center space-x-2.5 text-[#111827] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors">
                  <Settings className="w-4 h-4 text-[#6B7280]" />
                  <span>Settings</span>
                </button>

                <button className="w-full px-4 py-2 flex items-center space-x-2.5 text-[#111827] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors">
                  <HelpCircle className="w-4 h-4 text-[#6B7280]" />
                  <span>Help Center</span>
                </button>
              </div>

              <div className="border-t border-[#E5E7EB] dark:border-[#1F2937] pt-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onSignOut();
                  }}
                  className="w-full px-4 py-2 flex items-center space-x-2.5 text-[#DC2626] hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4 text-[#DC2626]" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
