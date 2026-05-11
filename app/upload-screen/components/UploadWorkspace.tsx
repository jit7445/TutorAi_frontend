'use client';
import React, { useState, useRef, useCallback } from 'react';
import UploadDropzone from './UploadDropzone';
import FileProcessingPanel from './FileProcessingPanel';
import PagePreviewList from './PagePreviewList';
import DocumentMetaSidebar from './DocumentMetaSidebar';

export type UploadState = 'idle' | 'selected' | 'uploading' | 'extracting' | 'summarizing' | 'done' | 'error';

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export default function UploadWorkspace() {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const simulateProcessing = useCallback(async (file: UploadedFile) => {
    // Backend integration: POST /api/upload with FormData
    setUploadState('uploading');
    setCurrentStep(0);
    setProgress(0);

    // Step 1: Upload
    for (let i = 0; i <= 30; i += 5) {
      await new Promise((r) => setTimeout(r, 80));
      setProgress(i);
    }

    // Step 2: Extract
    setUploadState('extracting');
    setCurrentStep(1);
    for (let i = 30; i <= 65; i += 5) {
      await new Promise((r) => setTimeout(r, 120));
      setProgress(i);
    }

    // Step 3: Summarize
    setUploadState('summarizing');
    setCurrentStep(2);
    for (let i = 65; i <= 95; i += 3) {
      await new Promise((r) => setTimeout(r, 150));
      setProgress(i);
    }

    // Step 4: Done
    setCurrentStep(3);
    setProgress(100);
    await new Promise((r) => setTimeout(r, 400));
    setUploadState('done');
  }, []);

  const handleFileSelected = useCallback((file: UploadedFile) => {
    setUploadedFile(file);
    setUploadState('selected');
    setErrorMessage('');
  }, []);

  const handleStartProcessing = useCallback(() => {
    if (uploadedFile) {
      simulateProcessing(uploadedFile);
    }
  }, [uploadedFile, simulateProcessing]);

  const handleReset = useCallback(() => {
    setUploadState('idle');
    setUploadedFile(null);
    setProgress(0);
    setCurrentStep(0);
    setErrorMessage('');
  }, []);

  if (uploadState === 'idle') {
    return <UploadDropzone onFileSelected={handleFileSelected} />;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-5 animate-fade-in">
      <div className="xl:col-span-2 2xl:col-span-3 space-y-5">
        <FileProcessingPanel
          file={uploadedFile!}
          uploadState={uploadState}
          progress={progress}
          currentStep={currentStep}
          errorMessage={errorMessage}
          onStart={handleStartProcessing}
          onReset={handleReset}
        />
        {(uploadState === 'summarizing' || uploadState === 'done') && (
          <PagePreviewList uploadState={uploadState} />
        )}
      </div>
      <div className="xl:col-span-1">
        <DocumentMetaSidebar
          file={uploadedFile!}
          uploadState={uploadState}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}