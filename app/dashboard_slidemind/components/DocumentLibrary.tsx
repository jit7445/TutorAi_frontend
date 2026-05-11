'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, MoreHorizontal, FileText, Mic2, Volume2, BrainCircuit, AlertTriangle, Upload, RefreshCw } from 'lucide-react';
import { mockDocuments } from '@/lib/mockData';
import { Document } from '@/types';
import StatusBadge from '@/components/slidemind_components/ui/StatusBadge';
import EmptyState from '@/components/slidemind_components/ui/EmptyState';
import { cn, formatRelativeTime, getScoreColor, truncateText } from '@/lib/utils';

const fileTypeIcons: Record<string, { bg: string; text: string; label: string }> = {
  pdf: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'PDF' },
  pptx: { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'PPT' },
  ppt: { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'PPT' },
  docx: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'DOC' },
  doc: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'DOC' },
};

function DocumentCard({ doc }: { doc: Document }) {
  const ft = fileTypeIcons[doc.fileType] ?? fileTypeIcons['pdf'];

  return (
    <div className={cn(
      'glass-card p-4 hover:border-white/20 transition-all duration-200 group relative cursor-pointer',
      doc.status === 'error' && 'border-red-500/20 bg-red-500/3'
    )}>
      {doc.status === 'error' && (
        <div className="absolute top-3 right-3">
          <AlertTriangle size={14} className="text-red-400" />
        </div>
      )}

      <div className="flex items-start gap-3 mb-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', ft.bg)}>
          <span className={cn('text-xs font-bold font-mono', ft.text)}>{ft.label}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white leading-snug mb-1 truncate" title={doc.title}>
            {truncateText(doc.title, 32)}
          </p>
          <p className="text-xs text-zinc-500">{formatRelativeTime(doc.createdAt)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <StatusBadge value={doc.status} type="status" />
        {doc.practiceScore !== undefined && (
          <span className={cn('text-xs font-bold font-mono', getScoreColor(doc.practiceScore))}>
            {doc.practiceScore}/100
          </span>
        )}
      </div>

      {doc.status !== 'error' && doc.status !== 'processing' && doc.status !== 'uploading' && (
        <div className="flex items-center gap-1 text-xs text-zinc-600">
          <FileText size={11} />
          <span>{doc.pageCount}p</span>
          {doc.hasAudio && (
            <>
              <span className="mx-1">·</span>
              <Volume2 size={11} className="text-indigo-400" />
              <span className="text-indigo-400">Audio</span>
            </>
          )}
          {doc.practiceScore !== undefined && (
            <>
              <span className="mx-1">·</span>
              <Mic2 size={11} className="text-purple-400" />
              <span className="text-purple-400">Practiced</span>
            </>
          )}
        </div>
      )}

      {doc.status === 'processing' && (
        <div className="flex items-center gap-2 text-xs text-amber-400">
          <RefreshCw size={11} className="animate-spin" />
          <span>Processing pages…</span>
        </div>
      )}

      {doc.status === 'error' && (
        <div className="flex items-center gap-2">
          <button className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
            <RefreshCw size={11} />
            Retry processing
          </button>
        </div>
      )}

      {/* Quick actions on hover */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button className="p-1.5 bg-white/8 hover:bg-indigo-500/20 rounded-md text-zinc-400 hover:text-indigo-400 transition-all" title="Summarize">
          <BrainCircuit size={12} />
        </button>
        <button className="p-1.5 bg-white/8 hover:bg-purple-500/20 rounded-md text-zinc-400 hover:text-purple-400 transition-all" title="Practice">
          <Mic2 size={12} />
        </button>
        <button className="p-1.5 bg-white/8 hover:bg-white/15 rounded-md text-zinc-400 hover:text-white transition-all" title="More options">
          <MoreHorizontal size={12} />
        </button>
      </div>
    </div>
  );
}

export default function DocumentLibrary() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = mockDocuments.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusFilters = [
    { id: 'filter-all', label: 'All', value: 'all' },
    { id: 'filter-ready', label: 'Ready', value: 'ready' },
    { id: 'filter-processing', label: 'Processing', value: 'processing' },
    { id: 'filter-summarized', label: 'Summarized', value: 'summarized' },
    { id: 'filter-error', label: 'Error', value: 'error' },
  ];

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Document Library</h3>
          <p className="text-xs text-zinc-500 mt-0.5">{mockDocuments.length} documents total</p>
        </div>
        <Link href="/upload-screen" className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
          <Upload size={12} />
          Upload
        </Link>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search documents…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-8 py-2 text-xs"
          />
        </div>
        <div className="flex items-center gap-1">
          {statusFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.value)}
              className={cn(
                'px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150',
                filterStatus === f.value
                  ? 'bg-indigo-600 text-white' :'text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document grid */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No documents found"
          description="No documents match your current search or filter. Upload a new document to get started."
          actionLabel="Upload Document"
          actionHref="/upload-screen"
          icon={<FileText size={24} />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
}