import React from 'react';
import { Upload, FileText, Volume2, Mic2, BrainCircuit } from 'lucide-react';
import { mockActivity } from '@/lib/mockData';
import { ActivityItem } from '@/types';
import { formatRelativeTime, truncateText } from '@/lib/utils';

const activityConfig: Record<
  ActivityItem['type'],
  { icon: React.ReactNode; color: string; bg: string }
> = {
  upload: { icon: <Upload size={12} />, color: 'text-blue-400', bg: 'bg-blue-500/15' },
  summary: { icon: <FileText size={12} />, color: 'text-indigo-400', bg: 'bg-indigo-500/15' },
  audio: { icon: <Volume2 size={12} />, color: 'text-purple-400', bg: 'bg-purple-500/15' },
  practice: { icon: <Mic2 size={12} />, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  coach: { icon: <BrainCircuit size={12} />, color: 'text-amber-400', bg: 'bg-amber-500/15' },
};

export default function ActivityFeed() {
  return (
    <div className="glass-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
        <span className="text-xs text-zinc-500">Last 7 days</span>
      </div>

      <div className="space-y-1">
        {mockActivity.map((item, index) => {
          const config = activityConfig[item.type];
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0 group hover:bg-white/3 rounded-lg px-1 -mx-1 transition-colors duration-150"
            >
              <div className={`w-7 h-7 rounded-full ${config.bg} ${config.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-200 leading-snug mb-0.5 truncate">
                  {truncateText(item.documentTitle, 28)}
                </p>
                <p className="text-xs text-zinc-500 leading-snug">
                  {item.detail}
                </p>
              </div>
              <span className="text-[10px] text-zinc-600 flex-shrink-0 mt-0.5 font-mono">
                {formatRelativeTime(item.timestamp)}
              </span>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-3 text-xs text-indigo-400 hover:text-indigo-300 py-2 hover:bg-indigo-500/5 rounded-lg transition-all duration-150">
        View all activity →
      </button>
    </div>
  );
}