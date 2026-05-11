import React from 'react';
import AppLayout from '@/components/slidemind_components/AppLayout';
import DashboardHeader from './components/DashboardHeader';
import KPIBentoGrid from './components/KPIBentoGrid';
import DocumentLibrary from './components/DocumentLibrary';
import ActivityFeed from './components/ActivityFeed';
import ProcessingChart from './components/ProcessingChart';

export default function DashboardPage() {
  return (
    <AppLayout currentPath="/dashboard">
      <div className="page-container py-6 space-y-6">
        <DashboardHeader />
        <KPIBentoGrid />
        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          <div className="xl:col-span-2 2xl:col-span-3 space-y-5">
            <ProcessingChart />
            <DocumentLibrary />
          </div>
          <div className="xl:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}