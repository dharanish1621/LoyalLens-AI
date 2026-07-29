import React from 'react';
import type { TelemetryEvent } from '../../types';
import { Activity, AlertTriangle, Clock, ShoppingCart, Truck, Frown, CheckCircle } from 'lucide-react';

interface LiveTelemetryStreamProps {
  events: TelemetryEvent[];
  onSelectCustomerById: (id: string) => void;
}

export const LiveTelemetryStream: React.FC<LiveTelemetryStreamProps> = ({ events, onSelectCustomerById }) => {
  const getEventIcon = (type: TelemetryEvent['eventType']) => {
    switch (type) {
      case 'cart_abandoned':
        return <ShoppingCart className="w-3.5 h-3.5 text-rose-400" />;
      case 'shipping_delay':
        return <Truck className="w-3.5 h-3.5 text-amber-400" />;
      case 'negative_review':
      case 'checkout_error':
        return <Frown className="w-3.5 h-3.5 text-rose-400" />;
      case 'successful_order':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  return (
    <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <h3 className="text-xs font-semibold text-zinc-100 uppercase tracking-wider flex items-center gap-1.5 font-outfit">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            Live Telemetry Activity Feed
          </h3>
        </div>
        <span className="text-[11px] text-zinc-400 font-mono">Real-time Webhooks</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {events.slice(0, 4).map((evt) => (
          <div
            key={evt.id}
            onClick={() => onSelectCustomerById(evt.customerId)}
            className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all flex items-start space-x-3 group"
          >
            <img
              src={evt.avatar}
              alt={evt.customerName}
              className="w-8 h-8 rounded-full object-cover border border-zinc-800 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-zinc-100 truncate group-hover:text-indigo-400 transition-colors">
                  {evt.customerName}
                </p>
                <span className="text-[10px] text-zinc-400 flex items-center font-mono">
                  <Clock className="w-3 h-3 mr-0.5 text-zinc-500" />
                  {evt.timestamp}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 flex items-center gap-1">
                {getEventIcon(evt.eventType)}
                <span className="truncate">{evt.description}</span>
              </p>
              <div className="mt-1.5 flex items-center justify-between text-[10px]">
                <span className="text-zinc-400 font-mono">{evt.customerId}</span>
                <span
                  className={`font-semibold ${
                    evt.riskImpact > 0 ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {evt.riskImpact > 0 ? `+${evt.riskImpact}% Risk` : `${evt.riskImpact}% Risk`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
