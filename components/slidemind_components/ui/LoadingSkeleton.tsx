import React from 'react';

export function SkeletonCard() {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-8 w-8 rounded-lg" />
      </div>
      <div className="skeleton h-8 w-32 rounded" />
      <div className="skeleton h-3 w-20 rounded" />
    </div>
  );
}

export function SkeletonDocumentCard() {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div className="skeleton h-10 w-10 rounded-lg" />
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-3 w-16 rounded" />
      </div>
    </div>
  );
}

export function SkeletonActivityItem() {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="skeleton h-8 w-8 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="skeleton h-3.5 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
      <div className="skeleton h-3 w-12 rounded" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/5">
      <div className="skeleton h-4 w-4 rounded" />
      <div className="skeleton h-4 flex-1 rounded" />
      <div className="skeleton h-4 w-20 rounded" />
      <div className="skeleton h-4 w-16 rounded" />
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array.from({ length: 5 })?.map((_, i) => (
          <SkeletonCard key={`skeleton-card-${i + 1}`} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card p-5">
          <div className="skeleton h-4 w-32 rounded mb-4" />
          <div className="skeleton h-48 w-full rounded-lg" />
        </div>
        <div className="glass-card p-5 space-y-3">
          <div className="skeleton h-4 w-28 rounded" />
          {Array.from({ length: 5 })?.map((_, i) => (
            <SkeletonActivityItem key={`skeleton-activity-${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}