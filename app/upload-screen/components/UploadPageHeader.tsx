import React from 'react';
import Link from 'next/link';
import { ArrowLeft, HelpCircle } from 'lucide-react';

export default function UploadPageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg transition-all duration-150"
        >
          <ArrowLeft size={15} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Upload Document</h1>
          <p className="text-sm text-zinc-400 mt-0.5">
            Upload PDF, PPT, or DOC files to generate AI summaries and coaching.
          </p>
        </div>
      </div>
      <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg px-3 py-2 transition-all duration-150">
        <HelpCircle size={13} />
        How it works
      </button>
    </div>
  );
}