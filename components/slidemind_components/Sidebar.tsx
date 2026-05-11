'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/slidemind_components/ui/AppLogo';
import {
  LayoutDashboard,
  Upload,
  FileText,
  Mic2,
  BrainCircuit,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/dashboard' },
  { id: 'nav-upload', label: 'Upload', icon: <Upload size={18} />, href: '/upload-screen' },
  { id: 'nav-documents', label: 'Documents', icon: <FileText size={18} />, href: '/dashboard', badge: 3 },
  { id: 'nav-practice', label: 'Practice', icon: <Mic2 size={18} />, href: '/dashboard' },
  { id: 'nav-coach', label: 'AI Coach', icon: <BrainCircuit size={18} />, href: '/dashboard' },
];

interface SidebarProps {
  currentPath: string;
}

export default function Sidebar({ currentPath }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'flex flex-col h-full border-r border-white/8 bg-[#0b0b18] transition-all duration-300 ease-in-out flex-shrink-0 relative',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center border-b border-white/8 flex-shrink-0',
        collapsed ? 'justify-center px-0 py-4 h-16' : 'gap-2 px-4 py-4 h-16'
      )}>
        <AppLogo size={32} />
        {!collapsed && (
          <span className="font-semibold text-base text-white tracking-tight truncate">
            PresentAI
          </span>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[3.75rem] z-10 w-6 h-6 bg-[#141428] border border-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-indigo-500/50 transition-all duration-150"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Upgrade banner */}
      {!collapsed && (
        <div className="mx-3 mt-4 mb-2 p-3 rounded-lg bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={13} className="text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300">Pro Plan</span>
          </div>
          <p className="text-xs text-zinc-400 mb-2">4 of 10 documents used</p>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[40%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </div>
        </div>
      )}

      {/* Nav section */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {!collapsed && (
          <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-1">
            Main
          </p>
        )}
        {navItems.map((item) => {
          const isActive = currentPath === item.href || (item.href !== '/dashboard' && currentPath.startsWith(item.href));
          return (
            <Link
              key={item.id}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                collapsed ? 'justify-center px-0' : '',
                isActive ? 'sidebar-item-active' : 'sidebar-item'
              )}
            >
              <span className={cn('flex-shrink-0', isActive ? 'text-indigo-400' : '')}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="flex-1 truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="flex-shrink-0 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {!collapsed && (
          <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mt-4 mb-1">
            Account
          </p>
        )}
        <Link
          key="nav-settings"
          href="/dashboard"
          title={collapsed ? 'Settings' : undefined}
          className={cn('sidebar-item', collapsed ? 'justify-center px-0' : '')}
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </Link>
      </nav>

      {/* User profile */}
      <div className={cn(
        'border-t border-white/8 p-3',
        collapsed ? 'flex justify-center' : 'flex items-center gap-3'
      )}>
        {collapsed ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
            A
          </div>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Alex Rivera</p>
              <p className="text-xs text-zinc-500 truncate">alex@presentai.io</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 text-zinc-500 hover:text-white rounded-md hover:bg-white/8 transition-all duration-150" title="Notifications">
                <Bell size={14} />
              </button>
              <button className="p-1.5 text-zinc-500 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-all duration-150" title="Sign out">
                <LogOut size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}