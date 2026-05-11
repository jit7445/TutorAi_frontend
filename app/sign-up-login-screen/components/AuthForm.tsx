'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Eye, EyeOff, Loader2, Copy, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type AuthMode = 'signin' | 'signup';

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const demoCredentials = [
  { role: 'Admin', email: 'alex@presentai.io', password: 'PresentDemo2026!' },
  { role: 'Viewer', email: 'morgan.chen@presentai.io', password: 'ViewerDemo2026!' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1 text-zinc-500 hover:text-indigo-400 transition-colors duration-150"
      title="Copy to clipboard"
    >
      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
    </button>
  );
}

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const signInForm = useForm<SignInFormData>({
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const signUpForm = useForm<SignUpFormData>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', acceptTerms: false },
  });

  const handleSignIn = async (data: SignInFormData) => {
    setIsLoading(true);
    setAuthError('');
    // Backend integration: POST /api/auth/signin with data
    await new Promise((r) => setTimeout(r, 1200));
    const validCreds = demoCredentials.find(
      (c) => c.email === data.email && c.password === data.password
    );
    if (!validCreds) {
      setAuthError('Invalid credentials — use the demo accounts below to sign in');
      setIsLoading(false);
      return;
    }
    window.location.href = '/dashboard';
  };

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    setAuthError('');
    if (data.password !== data.confirmPassword) {
      signUpForm.setError('confirmPassword', { message: 'Passwords do not match' });
      setIsLoading(false);
      return;
    }
    // Backend integration: POST /api/auth/signup with data
    await new Promise((r) => setTimeout(r, 1200));
    window.location.href = '/dashboard';
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    // Backend integration: signIn('google') via NextAuth
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href = '/dashboard';
  };

  const fillCredentials = (cred: { email: string; password: string }) => {
    signInForm.setValue('email', cred.email);
    signInForm.setValue('password', cred.password);
    setMode('signin');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-12">
      <div className="w-full max-w-md animate-slide-up">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-white">PresentAI</span>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 bg-white/5 border border-white/8 rounded-xl mb-8">
          <button
            onClick={() => { setMode('signin'); setAuthError(''); }}
            className={cn(
              'flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              mode === 'signin' ?'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' :'text-zinc-400 hover:text-white'
            )}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setAuthError(''); }}
            className={cn(
              'flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              mode === 'signup' ?'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' :'text-zinc-400 hover:text-white'
            )}
          >
            Sign Up
          </button>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-zinc-400">
            {mode === 'signin' ?'Sign in to access your documents and presentations.' :'Start transforming your documents with AI today.'}
          </p>
        </div>

        {/* Error banner */}
        {authError && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 animate-fade-in">
            {authError}
          </div>
        )}

        {/* Google OAuth */}
        <button
          onClick={handleGoogleAuth}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm font-medium text-white transition-all duration-150 active:scale-95 disabled:opacity-50 mb-5"
        >
          {googleLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          )}
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-xs text-zinc-600">or continue with email</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Sign In Form */}
        {mode === 'signin' && (
          <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5" htmlFor="signin-email">
                Email address
              </label>
              <input
                id="signin-email"
                type="email"
                autoComplete="email"
                className={cn('input-field', signInForm.formState.errors.email && 'border-red-500/50 focus:ring-red-500/30')}
                placeholder="you@company.com"
                {...signInForm.register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                })}
              />
              {signInForm.formState.errors.email && (
                <p className="mt-1 text-xs text-red-400">{signInForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-zinc-300" htmlFor="signin-password">
                  Password
                </label>
                <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="signin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={cn('input-field pr-10', signInForm.formState.errors.password && 'border-red-500/50 focus:ring-red-500/30')}
                  placeholder="Enter your password"
                  {...signInForm.register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {signInForm.formState.errors.password && (
                <p className="mt-1 text-xs text-red-400">{signInForm.formState.errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember-me"
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 accent-indigo-500"
                {...signInForm.register('rememberMe')}
              />
              <label htmlFor="remember-me" className="text-xs text-zinc-400">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ChevronRight size={15} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Sign Up Form */}
        {mode === 'signup' && (
          <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5" htmlFor="signup-name">
                Full name
              </label>
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                className={cn('input-field', signUpForm.formState.errors.name && 'border-red-500/50')}
                placeholder="Alex Rivera"
                {...signUpForm.register('name', { required: 'Full name is required' })}
              />
              {signUpForm.formState.errors.name && (
                <p className="mt-1 text-xs text-red-400">{signUpForm.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5" htmlFor="signup-email">
                Work email
              </label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                className={cn('input-field', signUpForm.formState.errors.email && 'border-red-500/50')}
                placeholder="you@company.com"
                {...signUpForm.register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                })}
              />
              {signUpForm.formState.errors.email && (
                <p className="mt-1 text-xs text-red-400">{signUpForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5" htmlFor="signup-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={cn('input-field pr-10', signUpForm.formState.errors.password && 'border-red-500/50')}
                  placeholder="Min. 8 characters"
                  {...signUpForm.register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Minimum 8 characters required' },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {signUpForm.formState.errors.password && (
                <p className="mt-1 text-xs text-red-400">{signUpForm.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5" htmlFor="signup-confirm">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="signup-confirm"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={cn('input-field pr-10', signUpForm.formState.errors.confirmPassword && 'border-red-500/50')}
                  placeholder="Repeat your password"
                  {...signUpForm.register('confirmPassword', { required: 'Please confirm your password' })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {signUpForm.formState.errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-400">{signUpForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input
                id="accept-terms"
                type="checkbox"
                className="w-3.5 h-3.5 mt-0.5 rounded border-white/20 bg-white/5 accent-indigo-500"
                {...signUpForm.register('acceptTerms', { required: 'You must accept the terms' })}
              />
              <label htmlFor="accept-terms" className="text-xs text-zinc-400 leading-relaxed">
                I agree to the{' '}
                <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">Terms of Service</span>
                {' '}and{' '}
                <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">Privacy Policy</span>
              </label>
            </div>
            {signUpForm.formState.errors.acceptTerms && (
              <p className="text-xs text-red-400">{signUpForm.formState.errors.acceptTerms.message}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account
                  <ChevronRight size={15} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Demo credentials box */}
        <div className="mt-6 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/15">
          <p className="text-xs font-semibold text-indigo-400 mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Demo Accounts — Click to autofill
          </p>
          <div className="space-y-2">
            {demoCredentials.map((cred) => (
              <div
                key={`cred-${cred.role}`}
                onClick={() => fillCredentials(cred)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-white/3 hover:bg-white/6 border border-white/5 hover:border-indigo-500/20 transition-all duration-150 text-left group cursor-pointer"
              >
                <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded-full w-14 text-center flex-shrink-0">
                  {cred.role}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-mono text-zinc-300 truncate">{cred.email}</span>
                  <span className="block text-xs font-mono text-zinc-600 truncate">{cred.password}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CopyButton text={cred.email} />
                  <ChevronRight size={12} className="text-indigo-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}