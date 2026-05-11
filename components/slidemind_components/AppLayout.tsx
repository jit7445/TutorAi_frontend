import React from 'react';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

export default function AppLayout({ children, currentPath = '/dashboard' }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-[#090912] overflow-hidden">
      <Sidebar currentPath={currentPath} />
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        {children}
      </main>
    </div>
  );
}