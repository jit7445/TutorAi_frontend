import React from 'react';
import { FileText, BookOpen, Mic2, TrendingUp, Volume2 } from 'lucide-react';
import { mockStats } from '@/lib/mockData';
import { cn } from '@/lib/utils';

// Grid plan: 5 cards → grid-cols-5 on xl, 3+2 on lg
// Row 1: Documents (spans 1), Pages (spans 1), Practice Sessions (spans 1)
// Row 2: Avg Score (spans 1), Audio Generated (spans 1)
// On xl: all 5 in a row

interface KPICardProps {
  id: string;
  label: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral' | 'alert';
  trendValue?: string;
  highlight?: boolean;
  alertState?: boolean;
}

function KPICard({ label, value, subtext, icon, trend, trendValue, highlight, alertState }: KPICardProps) {
  return (
    <div className={cn(
      'glass-card p-5 relative overflow-hidden group hover:border-white/20 transition-all duration-200',
      highlight && 'border-indigo-500/30 bg-indigo-500/5',
      alertState && 'border-red-500/30 bg-red-500/5'
    )}>
      {/* Background glow */}
      {highlight && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />
      )}
      {alertState && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl" />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <p className={cn(
            'text-xs font-semibold uppercase tracking-widest',
            alertState ? 'text-red-400' : highlight ? 'text-indigo-400' : 'text-zinc-500'
          )}>
            {label}
          </p>
          <div className={cn(
            'w-9 h-9 rounded-lg flex items-center justify-center',
            alertState ? 'bg-red-500/15 text-red-400': highlight ?'bg-indigo-500/15 text-indigo-400': 'bg-white/8 text-zinc-400'
          )}>
            {icon}
          </div>
        </div>

        <div className="flex items-end gap-2 mb-1.5">
          <span className={cn(
            'text-3xl font-bold font-mono tabular-nums',
            alertState ? 'text-red-300' : highlight ? 'text-white' : 'text-white'
          )}>
            {value}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-500">{subtext}</p>
          {trendValue && (
            <span className={cn(
              'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
              trend === 'up' ? 'text-emerald-400 bg-emerald-500/10' :
              trend === 'down'? 'text-red-400 bg-red-500/10' : 'text-zinc-400 bg-zinc-500/10'
            )}>
              {trendValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function KPIBentoGrid() {
  const cards: KPICardProps[] = [
    {
      id: 'kpi-docs',
      label: 'Documents',
      value: mockStats.totalDocuments,
      subtext: `${mockStats.documentsThisWeek} uploaded this week`,
      icon: <FileText size={17} />,
      trend: 'up',
      trendValue: '+6 this week',
      highlight: true,
    },
    {
      id: 'kpi-pages',
      label: 'Pages Summarized',
      value: mockStats.totalPages,
      subtext: 'Across all documents',
      icon: <BookOpen size={17} />,
      trend: 'up',
      trendValue: '+42 today',
    },
    {
      id: 'kpi-practice',
      label: 'Practice Sessions',
      value: mockStats.practiceSessions,
      subtext: 'Total sessions completed',
      icon: <Mic2 size={17} />,
      trend: 'up',
      trendValue: '+3 this week',
    },
    {
      id: 'kpi-score',
      label: 'Avg AI Score',
      value: `${mockStats.avgScore}`,
      subtext: 'Presentation readiness',
      icon: <TrendingUp size={17} />,
      trend: 'down',
      trendValue: '−2 pts',
      alertState: false,
    },
    {
      id: 'kpi-audio',
      label: 'Audio Generated',
      value: mockStats.audioGenerated,
      subtext: '1 failed — Board Meeting',
      icon: <Volume2 size={17} />,
      trend: 'neutral',
      trendValue: '1 error',
      alertState: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
      {cards.map((card) => (
        <KPICard key={card.id} {...card} />
      ))}
    </div>
  );
}