import React from 'react';
import Link from 'next/link';
import { FileText, Upload } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
        {icon ?? <FileText size={24} />}
      </div>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-xs mb-5">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Upload size={14} />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}