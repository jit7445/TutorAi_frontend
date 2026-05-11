import React from 'react';
import Link from 'next/link';
import { Upload, Bell, RefreshCw } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">
          Good afternoon, Alex
        </h1>
        <p className="text-sm text-zinc-400">
          You have 1 document processing and 2 awaiting practice.
          <span className="text-amber-400 ml-1 font-medium">Board Meeting Presentation failed — retry needed.</span>
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg transition-all duration-150" title="Refresh dashboard">
          <RefreshCw size={15} />
        </button>
        <button className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg transition-all duration-150 relative" title="Notifications">
          <Bell size={15} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
        </button>
        <Link
          href="/upload-screen"
          className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
        >
          <Upload size={14} />
          Upload Document
        </Link>
      </div>
    </div>
  );
}