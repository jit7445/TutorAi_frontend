"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, Menu, X, UserCircle, LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
];


export const Navbar = ({ onLoginClick }: { onLoginClick?: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { scrollY } = useScroll();
  
  // Dynamic styles based on scroll
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const navPadding = useTransform(scrollY, [0, 100], ["1.5rem", "0.75rem"]);
  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Check authentication
    const token = localStorage.getItem("tutorai_token");
    setIsLoggedIn(!!token);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tutorai_token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-start pt-6 px-4 pointer-events-none">
      <motion.div
        style={{ 
          width: navWidth,
          padding: navPadding,
          backgroundColor: `rgba(var(--background), ${isScrolled ? 0.9 : 0.4})`
        }}
        className={cn(
          "nav-container pointer-events-auto flex items-center justify-between max-w-5xl rounded-full border border-black/5 dark:border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-in-out",
          isScrolled ? "shadow-blue-500/10" : "shadow-transparent"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 pl-2">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-xl font-extrabold tracking-tighter text-slate-900 dark:text-white hidden sm:block font-display">
            TutorAI
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/10 font-sans">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onHoverStart={() => setHoveredLink(link.name)}
              onHoverEnd={() => setHoveredLink(null)}
              className="relative px-6 py-2 text-sm font-semibold transition-colors rounded-full"
            >
              <span className={cn(
                "relative z-10",
                hoveredLink === link.name ? "text-blue-600 dark:text-white" : "text-slate-600 dark:text-slate-200"
              )}>
                {link.name}
              </span>
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-sm"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pr-2">
          
          {isLoggedIn ? (

            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-all"
              >
                <UserCircle className="w-8 h-8 text-blue-600" />
              </button>
              
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-12 right-0 w-48 p-2 glass-card rounded-2xl shadow-2xl border border-black/5 dark:border-white/10 z-[60]"
                  >
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-all font-sans font-bold text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <button 
                onClick={onLoginClick}
                className="hidden sm:flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-all font-sans"
              >
                Login
              </button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLoginClick}
                className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] font-sans"
              >
                Join
              </motion.button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.div>


      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-4 right-4 p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl z-40 pointer-events-auto md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold p-4 rounded-2xl hover:bg-blue-500/10 hover:text-blue-600 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-black/10 dark:bg-white/10 my-2" />
              <button 
                onClick={() => {
                  onLoginClick?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-500/20"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


