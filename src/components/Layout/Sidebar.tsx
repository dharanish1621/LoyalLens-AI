import React from 'react';
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  PieChart,
  HeartHandshake,
  BarChart3,
  FileText,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2
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
    { id: 'predictions' as NavItem, label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'segments' as NavItem, label: 'Customer Segments', icon: PieChart },
    { id: 'retention' as NavItem, label: 'Retention Center', icon: HeartHandshake },
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
      className={`relative sticky top-0 h-screen bg-slate-900 text-slate-100 border-r border-slate-800 transition-all duration-300 z-30 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Corporate Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white font-outfit">Loyal Lens</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Customer Retention Platform</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors relative ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              
              {!isCollapsed && <span className="truncate">{item.label}</span>}

              {!isCollapsed && item.count !== undefined && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                  {item.count}
                </span>
              )}

              {isCollapsed && item.count !== undefined && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Corporate System Status */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400 flex items-center justify-between">
          <span className="text-[11px]">System Status</span>
          <span className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Operational
          </span>
        </div>
      )}
    </aside>
  );
};
