import React from 'react';
import AuthForm from './components/AuthForm';
import AuthBrandPanel from './components/AuthBrandPanel';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#090912] flex">
      <AuthBrandPanel />
      <AuthForm />
    </div>
  );
}