'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText, Clock, HardDrive, Tag, Sparkles, Mic2, Volume2,
  BrainCircuit, CheckCircle2, ChevronRight, Edit2, X
} from 'lucide-react';
import { UploadState, UploadedFile } from './UploadWorkspace';
import { cn, formatFileSize } from '@/lib/utils';

interface DocumentMetaSidebarProps {
  file: UploadedFile;
  uploadState: UploadState;
  onReset: () => void;
}

function getFileTypeLabel(name: string): string {
  return name.split('.').pop()?.toUpperCase() ?? 'FILE';
}

function getFileTypeBg(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return 'bg-red-500/10 text-red-400 border-red-500/20';
  if (ext === 'ppt' || ext === 'pptx') return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
  return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
}

const nextActions = [
  {
    id: 'action-summarize',
    label: 'View Full Summary',
    desc: 'Read the complete AI-generated summary',
    icon: <Sparkles size={14} />,
    color: 'text-indigo-400',
    bg: 'hover:bg-indigo-500/10 hover:border-indigo-500/20',
    requiresDone: true,
  },
  {
    id: 'action-audio',
    label: 'Generate Audio',
    desc: 'Convert summary to TTS narration',
    icon: <Volume2 size={14} />,
    color: 'text-purple-400',
    bg: 'hover:bg-purple-500/10 hover:border-purple-500/20',
    requiresDone: true,
  },
  {
    id: 'action-practice',
    label: 'Start Practice',
    desc: 'Practice your presentation delivery',
    icon: <Mic2 size={14} />,
    color: 'text-emerald-400',
    bg: 'hover:bg-emerald-500/10 hover:border-emerald-500/20',
    requiresDone: true,
  },
  {
    id: 'action-coach',
    label: 'AI Coach Review',
    desc: 'Get structured coaching feedback',
    icon: <BrainCircuit size={14} />,
    color: 'text-amber-400',
    bg: 'hover:bg-amber-500/10 hover:border-amber-500/20',
    requiresDone: true,
  },
];

export default function DocumentMetaSidebar({ file, uploadState, onReset }: DocumentMetaSidebarProps) {
  const [docTitle, setDocTitle] = useState(file.name.replace(/\.[^.]+$/, ''));
  const [editingTitle, setEditingTitle] = useState(false);
  const isDone = uploadState === 'done';
  const isProcessing = ['uploading', 'extracting', 'summarizing'].includes(uploadState);

  const mockPages = isDone ? Array.from({ length: 12 }) : [];

  const uploadDate = new Date();
  const formattedDate = `${uploadDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  return (
    <div className="space-y-4">
      {/* Document metadata card */}
      <div className="glass-card p-5">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">Document Details</h3>

        {/* Title */}
        <div className="mb-4">
          {editingTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="input-field text-sm py-1.5 flex-1"
                autoFocus
                onBlur={() => setEditingTitle(false)}
                onKeyDown={(e) => { if (e.key === 'Enter') setEditingTitle(false); }}
              />
              <button onClick={() => setEditingTitle(false)} className="p-1.5 text-zinc-400 hover:text-white">
                <CheckCircle2 size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-2 group">
              <p className="text-sm font-semibold text-white leading-snug flex-1">{docTitle}</p>
              <button
                onClick={() => setEditingTitle(true)}
                className="p-1 text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                title="Edit document title"
              >
                <Edit2 size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Meta rows */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-zinc-600 flex-shrink-0">
              <Tag size={13} />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className="text-xs text-zinc-500">File type</span>
              <span className={cn('text-[10px] font-bold font-mono px-2 py-0.5 rounded border', getFileTypeBg(file.name))}>
                {getFileTypeLabel(file.name)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-zinc-600 flex-shrink-0">
              <HardDrive size={13} />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className="text-xs text-zinc-500">File size</span>
              <span className="text-xs font-mono text-zinc-300">{formatFileSize(file.size)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-zinc-600 flex-shrink-0">
              <Clock size={13} />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Uploaded</span>
              <span className="text-xs font-mono text-zinc-300">{formattedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-zinc-600 flex-shrink-0">
              <FileText size={13} />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Pages extracted</span>
              <span className="text-xs font-mono text-zinc-300">
                {isDone ? `${mockPages.length} pages` : isProcessing ? 'Extracting…' : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className={cn(
          'mt-4 p-3 rounded-lg border flex items-center gap-2',
          isDone
            ? 'bg-emerald-500/8 border-emerald-500/20'
            : isProcessing
            ? 'bg-indigo-500/8 border-indigo-500/20' :'bg-white/3 border-white/8'
        )}>
          {isDone ? (
            <>
              <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-emerald-400">Ready to use</p>
                <p className="text-[10px] text-emerald-400/60">All features unlocked</p>
              </div>
            </>
          ) : isProcessing ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-indigo-400">Processing…</p>
                <p className="text-[10px] text-indigo-400/60">This may take 30–60 seconds</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-3.5 h-3.5 rounded-full bg-zinc-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-400">Waiting to start</p>
                <p className="text-[10px] text-zinc-600">Click Start Processing above</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Next actions card */}
      <div className="glass-card p-5">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Next Steps</h3>
        <div className="space-y-2">
          {nextActions.map((action) => {
            const isEnabled = isDone;
            return (
              <button
                key={action.id}
                disabled={!isEnabled}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-lg border border-white/8 transition-all duration-150 text-left group',
                  isEnabled
                    ? `${action.bg} cursor-pointer active:scale-95`
                    : 'opacity-40 cursor-not-allowed'
                )}
              >
                <div className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5',
                  isEnabled && action.color
                )}>
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-xs font-semibold', isEnabled ? 'text-white' : 'text-zinc-500')}>
                    {action.label}
                  </p>
                  <p className="text-[10px] text-zinc-600 leading-snug">{action.desc}</p>
                </div>
                {isEnabled && (
                  <ChevronRight size={13} className={cn('flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity', action.color)} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tips card */}
      <div className="glass-card p-4 border-indigo-500/15 bg-indigo-500/3">
        <p className="text-xs font-semibold text-indigo-400 mb-2">Pro tip</p>
        <p className="text-xs text-zinc-400 leading-relaxed">
          After processing, use <span className="text-indigo-300 font-medium">AI Coach</span> to get a clarity score and tone feedback before your actual presentation.
        </p>
      </div>

      {/* Cancel */}
      {!isDone && (
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-zinc-500 hover:text-red-400 border border-white/8 hover:border-red-500/20 hover:bg-red-500/5 rounded-lg transition-all duration-150"
        >
          <X size={12} />
          Cancel and remove file
        </button>
      )}

      {isDone && (
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all duration-150 active:scale-95"
        >
          <CheckCircle2 size={12} />
          View in Dashboard
        </Link>
      )}
    </div>
  );
}