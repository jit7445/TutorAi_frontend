import React from 'react';
import { cn, getStatusColor, getFileTypeColor } from '@/lib/utils';

interface StatusBadgeProps {
  value: string;
  type?: 'status' | 'filetype';
  className?: string;
}

const statusLabels: Record<string, string> = {
  uploading: 'Uploading',
  processing: 'Processing',
  summarized: 'Summarized',
  ready: 'Ready',
  error: 'Error',
  archived: 'Archived',
};

export default function StatusBadge({ value, type = 'status', className }: StatusBadgeProps) {
  const colorClass = type === 'status' ? getStatusColor(value) : getFileTypeColor(value);
  const label = type === 'status' ? (statusLabels[value] ?? value) : value.toUpperCase();

  return (
    <span className={cn(
      'status-badge border font-mono text-[10px] tracking-wide',
      colorClass,
      className
    )}>
      {type === 'status' && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full flex-shrink-0',
          value === 'ready' ? 'bg-emerald-400' :
          value === 'processing' || value === 'uploading' ? 'bg-amber-400 animate-pulse' :
          value === 'error' ? 'bg-red-400' :
          value === 'summarized'? 'bg-indigo-400' : 'bg-zinc-400'
        )} />
      )}
      {label}
    </span>
  );
}