"use client";
import React, { useState } from "react";
import { X, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

import { AuthForm } from "./auth-form";

export const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-md glass-card rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
        {/* Animated Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5 opacity-50" />
        </button>

        <div className="text-center space-y-2 mb-8 relative z-10">
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="opacity-70 font-sans">
            {isLogin ? "Enter your details to sign in" : "Sign up to start learning with AI"}
          </p>
        </div>

        <div className="relative z-10">
          <AuthForm isLogin={isLogin} onSuccess={handleSuccess} />
        </div>

        <div className="relative my-8 text-center relative z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/5 dark:border-white/10"></div>
          </div>
          <span className="relative px-4 bg-white dark:bg-[#1a1b1e] text-xs font-medium opacity-50 uppercase tracking-widest">Or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-black/5 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <GoogleIcon />
            <span className="text-sm font-medium">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-black/5 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <GithubIcon />
            <span className="text-sm font-medium">Github</span>
          </button>
        </div>

        <p className="text-center mt-8 text-sm opacity-50 relative z-10 font-sans">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-bold hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

