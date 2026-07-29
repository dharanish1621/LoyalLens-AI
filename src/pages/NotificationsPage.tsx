import React from 'react';
import { Bell, CheckCheck, ShieldAlert, Sparkles, Send, Info } from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'alert' | 'campaign' | 'system' | 'ai';
  read: boolean;
}

interface NotificationsPageProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  notifications,
  onMarkAllAsRead,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      case 'campaign':
        return <Send className="w-4 h-4 text-emerald-500" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-blue-500" />;
      default:
        return <Info className="w-4 h-4 text-cyan-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="saas-card p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4" />
            <span>Telemetry Alerts Feed</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-outfit">Platform Notifications</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time churn risk spikes, campaign dispatch logs, and AI model health updates.
          </p>
        </div>

        <button
          onClick={onMarkAllAsRead}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Notifications Feed */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`saas-card p-4 border transition-all flex items-start space-x-3.5 ${
              n.read ? 'border-slate-200 dark:border-slate-800 opacity-80' : 'border-blue-500/40 bg-blue-500/5'
            }`}
          >
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 shrink-0">
              {getIcon(n.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{n.title}</h4>
                <span className="text-[10px] font-mono text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{n.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
