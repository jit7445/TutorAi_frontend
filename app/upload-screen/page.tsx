import React from 'react';
import AppLayout from '@/components/slidemind_components/AppLayout';
import UploadPageHeader from './components/UploadPageHeader';
import UploadWorkspace from './components/UploadWorkspace';

export default function UploadPage() {
  return (
    <AppLayout currentPath="/upload-screen">
      <div className="page-container py-6 space-y-6">
        <UploadPageHeader />
        <UploadWorkspace />
      </div>
    </AppLayout>
  );
}