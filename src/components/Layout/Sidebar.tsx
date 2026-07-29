import React from 'react';
import {
  LayoutDashboard,
  Users,
  BrainCircuit,
  PieChart,
  Sparkles,
  BarChart3,
  FileText,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Radar
} from 'lucide-react';

export type NavItem =
  | 'dashboard'
  | 'customers'
  | 'predictions'
  | 'segments'
  | 'retention'
  | 'analytics'
  | 'reports'
  | 'notifications'
  | 'settings';

interface SidebarProps {
  activeTab: NavItem;
  setActiveTab: (tab: NavItem) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  unreadNotificationsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  unreadNotificationsCount,
}) => {
  const menuItems = [
    { id: 'dashboard' as NavItem, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers' as NavItem, label: 'Customers', icon: Users },
    { id: 'predictions' as NavItem, label: 'AI Predictions', icon: BrainCircuit, badge: 'Live ML' },
    { id: 'segments' as NavItem, label: 'Customer Segments', icon: PieChart },
    { id: 'retention' as NavItem, label: 'Retention Recommendations', icon: Sparkles, badge: 'AI Studio' },
    { id: 'analytics' as NavItem, label: 'Analytics', icon: BarChart3 },
    { id: 'reports' as NavItem, label: 'Reports', icon: FileText },
    {
      id: 'notifications' as NavItem,
      label: 'Notifications',
      icon: Bell,
      count: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined
    },
    { id: 'settings' as NavItem, label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`relative sticky top-0 h-screen bg-slate-900 dark:bg-slate-950 text-slate-100 border-r border-slate-800 transition-all duration-300 z-30 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="p-2 rounded-xl bg-blue-600 shadow-md shadow-blue-500/20 text-white shrink-0">
            <Radar className="w-5 h-5 animate-pulse" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white font-outfit">Loyal Lens AI</span>
              <span className="text-[10px] text-blue-400 font-medium tracking-wide uppercase">Enterprise Retention</span>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
              
              {!isCollapsed && <span className="truncate">{item.label}</span>}

              {/* Badges / Counters */}
              {!isCollapsed && item.badge && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-500/30">
                  {item.badge}
                </span>
              )}

              {!isCollapsed && item.count !== undefined && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold animate-pulse">
                  {item.count}
                </span>
              )}

              {/* Collapsed dot indicator */}
              {isCollapsed && item.count !== undefined && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer System Status */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono">XGBoost ML v1.0</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <p className="text-[10px] text-slate-500">91.8% Accuracy • 50k Records</p>
        </div>
      )}
    </aside>
  );
};
