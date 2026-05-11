'use client';
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,  } from 'recharts';
import { mockChartData, mockPracticeScoreData } from '@/lib/mockData';

type ChartView = 'activity' | 'scores';

const CustomTooltipActivity = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 shadow-xl border-white/15 min-w-[140px]">
      <p className="text-xs font-semibold text-zinc-300 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={`tooltip-${entry.name}`} className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-400">{entry.name}</span>
          <span className="text-xs font-bold font-mono" style={{ color: entry.color }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomTooltipScores = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  const score = payload[0]?.value ?? 0;
  return (
    <div className="glass-card p-3 shadow-xl border-white/15">
      <p className="text-xs font-semibold text-zinc-300 mb-1">{label}</p>
      <p className="text-sm font-bold text-indigo-400 font-mono">{score}/100</p>
    </div>
  );
};

export default function ProcessingChart() {
  const [view, setView] = useState<ChartView>('activity');

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-white mb-0.5">
            {view === 'activity' ? 'Processing Activity' : 'Practice Score Trend'}
          </h3>
          <p className="text-xs text-zinc-500">
            {view === 'activity' ? 'Documents & pages processed — last 20 days' : 'Weekly average AI coaching score'}
          </p>
        </div>
        <div className="flex p-1 bg-white/5 border border-white/8 rounded-lg">
          <button
            onClick={() => setView('activity')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
              view === 'activity' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setView('scores')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
              view === 'scores' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Scores
          </button>
        </div>
      </div>

      <div className="h-52">
        {view === 'activity' ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gradDocs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradPages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltipActivity />} />
              <Area type="monotone" dataKey="documents" name="Documents" stroke="#6366f1" strokeWidth={2} fill="url(#gradDocs)" dot={false} />
              <Area type="monotone" dataKey="pages" name="Pages" stroke="#a78bfa" strokeWidth={2} fill="url(#gradPages)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockPracticeScoreData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltipScores />} />
              <Bar dataKey="score" name="Score" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}