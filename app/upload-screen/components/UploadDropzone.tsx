'use client';
import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn, formatFileSize } from '@/lib/utils';
import { UploadedFile } from './UploadWorkspace';

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ACCEPTED_EXTENSIONS = ['.pdf', '.ppt', '.pptx', '.doc', '.docx'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

interface UploadDropzoneProps {
  onFileSelected: (file: UploadedFile) => void;
}

export default function UploadDropzone({ onFileSelected }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      return `Unsupported file type "${ext}". Use PDF, PPT, PPTX, DOC, or DOCX.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File too large (${formatFileSize(file.size)}). Maximum size is 50 MB.`;
    }
    return null;
  };

  const handleFile = useCallback((file: File) => {
    const err = validateFile(file);
    if (err) {
      setDragError(err);
      return;
    }
    setDragError('');
    onFileSelected({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    });
  }, [onFileSelected]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragError('');
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main dropzone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 group',
          isDragging
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
            : dragError
            ? 'border-red-500/50 bg-red-500/5' :'border-white/15 bg-white/3 hover:border-indigo-500/50 hover:bg-indigo-500/5'
        )}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-200',
            isDragging ? 'from-indigo-600/10 to-purple-600/10 opacity-100' : 'group-hover:opacity-100 from-indigo-600/5 to-purple-600/5'
          )} />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS.join(',')}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-200',
            isDragging
              ? 'bg-indigo-500/30 border border-indigo-500/50 scale-110'
              : dragError
              ? 'bg-red-500/15 border border-red-500/30' :'bg-white/8 border border-white/10 group-hover:bg-indigo-500/15 group-hover:border-indigo-500/30'
          )}>
            {dragError ? (
              <AlertCircle size={28} className="text-red-400" />
            ) : isDragging ? (
              <CheckCircle2 size={28} className="text-indigo-400 animate-scale-in" />
            ) : (
              <Upload size={28} className={cn('transition-colors', 'text-zinc-400 group-hover:text-indigo-400')} />
            )}
          </div>

          {dragError ? (
            <div>
              <p className="text-base font-semibold text-red-400 mb-1">Invalid file</p>
              <p className="text-sm text-red-400/70">{dragError}</p>
            </div>
          ) : isDragging ? (
            <div>
              <p className="text-base font-semibold text-indigo-300 mb-1">Drop to upload</p>
              <p className="text-sm text-indigo-400/70">Release to start processing</p>
            </div>
          ) : (
            <div>
              <p className="text-base font-semibold text-white mb-1">
                Drag & drop your file here
              </p>
              <p className="text-sm text-zinc-400 mb-4">
                or{' '}
                <span className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                  browse from your computer
                </span>
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {['PDF', 'PPT', 'PPTX', 'DOC', 'DOCX'].map((ext) => (
                  <span
                    key={`ext-${ext}`}
                    className="text-xs font-mono font-medium px-2 py-1 bg-white/5 border border-white/10 rounded-md text-zinc-400"
                  >
                    .{ext.toLowerCase()}
                  </span>
                ))}
              </div>
              <p className="text-xs text-zinc-600 mt-3">Maximum file size: 50 MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Supported formats info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            id: 'fmt-pdf',
            ext: 'PDF',
            color: 'text-red-400',
            bg: 'bg-red-500/10 border-red-500/15',
            desc: 'Presentations, reports, research papers',
          },
          {
            id: 'fmt-ppt',
            ext: 'PPT / PPTX',
            color: 'text-orange-400',
            bg: 'bg-orange-500/10 border-orange-500/15',
            desc: 'PowerPoint slide decks, pitch decks',
          },
          {
            id: 'fmt-doc',
            ext: 'DOC / DOCX',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10 border-blue-500/15',
            desc: 'Word documents, proposals, briefs',
          },
        ].map((fmt) => (
          <div key={fmt.id} className={cn('glass-card p-4 border', fmt.bg)}>
            <div className="flex items-center gap-2 mb-1.5">
              <FileText size={14} className={fmt.color} />
              <span className={cn('text-xs font-bold font-mono', fmt.color)}>{fmt.ext}</span>
            </div>
            <p className="text-xs text-zinc-500">{fmt.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}