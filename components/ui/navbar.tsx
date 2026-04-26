import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = ({ onLoginClick }: { onLoginClick?: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
      <div className="nav-container flex items-center justify-between w-full max-w-7xl px-8 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl shadow-blue-500/10 transition-all">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TutorAI</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <a href="#" className="hover:text-blue-500 dark:hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-white transition-colors">Docs</a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={onLoginClick}
            className="hidden sm:block px-5 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-white transition-colors"
          >
            Login
          </button>
          <button 
            onClick={onLoginClick}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

