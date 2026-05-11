'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { mockPages } from '@/lib/mockData';
import { UploadState } from './UploadWorkspace';


interface PagePreviewListProps {
  uploadState: UploadState;
}

function PageCard({ page, index, isDone }: { page: typeof mockPages[0]; index: number; isDone: boolean }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div className="glass-card overflow-hidden transition-all duration-200 hover:border-white/20">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/3 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold font-mono text-indigo-400">{page.pageNumber}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Page {page.pageNumber}</p>
            <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1 max-w-xs">{page.content.slice(0, 60)}…</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isDone && page.summary ? (
            <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <CheckCircle2 size={9} />
              Summarized
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              <Loader2 size={9} className="animate-spin" />
              Processing
            </span>
          )}
          {expanded ? (
            <ChevronUp size={14} className="text-zinc-500" />
          ) : (
            <ChevronDown size={14} className="text-zinc-500" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/8">
            {/* Raw content */}
            <div className="p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <FileText size={12} className="text-zinc-500" />
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Original Content</p>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{page.content}</p>
            </div>
            {/* Summary */}
            <div className="p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles size={12} className="text-indigo-400" />
                <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400/60">AI Summary</p>
              </div>
              {isDone && page.summary ? (
                <div className="space-y-1">
                  {page.summary.split('\n').map((line, li) => (
                    <p key={`summary-line-${page.id}-${li}`} className="text-xs text-zinc-300 leading-relaxed">{line}</p>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, li) => (
                    <div key={`skeleton-summary-${page.id}-${li + 1}`} className="skeleton h-3 rounded animate-shimmer" style={{ width: `${70 + (li % 3) * 10}%` }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PagePreviewList({ uploadState }: PagePreviewListProps) {
  const isDone = uploadState === 'done';

  return (
    <div className="space-y-3 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Extracted Pages</h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            {isDone ? `${mockPages.length} pages summarized` : 'Generating summaries…'}
          </p>
        </div>
        {isDone && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            <CheckCircle2 size={12} />
            All pages ready
          </span>
        )}
      </div>

      <div className="space-y-2">
        {mockPages.map((page, index) => (
          <PageCard key={page.id} page={page} index={index} isDone={isDone} />
        ))}
      </div>

      {!isDone && (
        <div className="glass-card p-4 border-dashed border-white/10">
          <div className="flex items-center gap-3">
            <div className="skeleton h-7 w-7 rounded-lg" />
            <div className="flex-1 space-y-1.5">
              <div className="skeleton h-3 w-1/3 rounded animate-shimmer" />
              <div className="skeleton h-2.5 w-1/2 rounded animate-shimmer" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}