'use client';
import React from 'react';
import {
  Upload, FileText, Sparkles, Volume2, CheckCircle2, Loader2,
  AlertTriangle, RefreshCw, X, Play
} from 'lucide-react';
import { UploadState, UploadedFile } from './UploadWorkspace';
import { cn, formatFileSize } from '@/lib/utils';

const processingSteps = [
  {
    id: 'step-upload',
    label: 'File Upload',
    desc: 'Uploading to secure storage',
    icon: <Upload size={15} />,
  },
  {
    id: 'step-extract',
    label: 'Page Extraction',
    desc: 'Parsing document structure',
    icon: <FileText size={15} />,
  },
  {
    id: 'step-summarize',
    label: 'AI Summarization',
    desc: 'Generating page-wise summaries via Gemini',
    icon: <Sparkles size={15} />,
  },
  {
    id: 'step-audio',
    label: 'Audio Generation',
    desc: 'Creating TTS narration script',
    icon: <Volume2 size={15} />,
  },
];

interface FileProcessingPanelProps {
  file: UploadedFile;
  uploadState: UploadState;
  progress: number;
  currentStep: number;
  errorMessage: string;
  onStart: () => void;
  onReset: () => void;
}

function getFileTypeLabel(type: string, name: string): string {
  const ext = name.split('.').pop()?.toUpperCase() ?? 'FILE';
  return ext;
}

function getFileTypeBg(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return 'bg-red-500/10 text-red-400';
  if (ext === 'ppt' || ext === 'pptx') return 'bg-orange-500/10 text-orange-400';
  return 'bg-blue-500/10 text-blue-400';
}

export default function FileProcessingPanel({
  file,
  uploadState,
  progress,
  currentStep,
  errorMessage,
  onStart,
  onReset,
}: FileProcessingPanelProps) {
  const isProcessing = ['uploading', 'extracting', 'summarizing'].includes(uploadState);
  const isDone = uploadState === 'done';
  const isError = uploadState === 'error';
  const isSelected = uploadState === 'selected';

  return (
    <div className="glass-card p-6 space-y-6">
      {/* File info */}
      <div className="flex items-start gap-4">
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold font-mono text-sm', getFileTypeBg(file.name))}>
          {getFileTypeLabel(file.type, file.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-white mb-0.5 truncate">{file.name}</p>
          <p className="text-xs text-zinc-500 font-mono">{formatFileSize(file.size)}</p>
        </div>
        <div className="flex items-center gap-2">
          {isSelected && (
            <button
              onClick={onStart}
              className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
            >
              <Play size={13} />
              Start Processing
            </button>
          )}
          {isDone && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
              <CheckCircle2 size={13} />
              Complete
            </span>
          )}
          <button
            onClick={onReset}
            className="p-2 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg transition-all duration-150"
            title="Remove file and start over"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {(isProcessing || isDone) && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400">
              {isProcessing ? 'Processing…' : 'Processing complete'}
            </span>
            <span className="text-xs font-bold font-mono text-indigo-400">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertTriangle size={15} className="text-red-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-400">Processing failed</p>
            <p className="text-xs text-red-400/70">{errorMessage || 'An error occurred during processing. Check your file and try again.'}</p>
          </div>
          <button
            onClick={onStart}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 px-2.5 py-1.5 rounded-lg transition-all"
          >
            <RefreshCw size={11} />
            Retry
          </button>
        </div>
      )}

      {/* Processing steps */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Processing Pipeline</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {processingSteps.map((step, index) => {
            const isCompleted = isDone || (isProcessing && index < currentStep);
            const isActive = isProcessing && index === currentStep;
            const isPending = !isDone && !isError && index > currentStep;

            return (
              <div
                key={step.id}
                className={cn(
                  'p-3 rounded-xl border transition-all duration-300',
                  isCompleted
                    ? 'bg-emerald-500/8 border-emerald-500/20'
                    : isActive
                    ? 'bg-indigo-500/10 border-indigo-500/30 animate-pulse-glow' :'bg-white/3 border-white/8'
                )}
              >
                <div className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center mb-2',
                  isCompleted ? 'bg-emerald-500/20 text-emerald-400': isActive ?'bg-indigo-500/20 text-indigo-400': 'bg-white/8 text-zinc-600'
                )}>
                  {isCompleted ? (
                    <CheckCircle2 size={14} />
                  ) : isActive ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    step.icon
                  )}
                </div>
                <p className={cn(
                  'text-xs font-semibold mb-0.5',
                  isCompleted ? 'text-emerald-400' : isActive ? 'text-indigo-300' : 'text-zinc-500'
                )}>
                  {step.label}
                </p>
                <p className="text-[10px] text-zinc-600 leading-snug">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}