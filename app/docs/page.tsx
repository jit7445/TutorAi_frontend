"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Search, Code, Terminal, Layers, Share2, Globe, Cpu, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { MorphingBackground } from "@/components/ui/morphing-background";
import { AuthModal } from "@/components/ui/auth-modal";
import { cn } from "@/lib/utils";

const DOCS_SECTIONS = [
  {
    title: "Getting Started",
    icon: Rocket,
    items: [
      { title: "Introduction", desc: "What is TutorAI and how does it work?" },
      { title: "Quick Start", desc: "Generate your first study session in under 60 seconds." },
      { title: "Account Setup", desc: "Managing your profile and library." }
    ]
  },
  {
    title: "Core Concepts",
    icon: Brain,
    items: [
      { title: "Topic Generation", desc: "How to phrase topics for the best AI results." },
      { title: "PDF Analysis", desc: "Supported file types and extraction logic." },
      { title: "Video Rendering", desc: "Understanding the cinema-quality generation pipeline." }
    ]
  },
  {
    title: "API & Integration",
    icon: Code,
    items: [
      { title: "REST API", desc: "Programmatic access to the TutorAI engine." },
      { title: "Webhooks", desc: "Get notified when your generations are ready." },
      { title: "SDKs", desc: "Official libraries for Node.js and Python." }
    ]
  }
];

import { Rocket, Brain } from "lucide-react";

export default function DocsPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MorphingBackground>
      <Navbar onLoginClick={() => setIsAuthModalOpen(true)} />
      
      <main className="pt-40 pb-20 px-4 min-h-screen max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-12 shrink-0">
            {DOCS_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold font-display uppercase tracking-widest text-[10px]">
                  <section.icon className="w-4 h-4 text-blue-400" />
                  {section.title}
                </div>
                <div className="space-y-1 border-l border-white/5 ml-2 pl-4">
                  {section.items.map((item) => (
                    <button key={item.title} className="block text-sm text-white/40 hover:text-white transition-colors py-2 text-left w-full">
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* Content */}
          <div className="flex-1 space-y-24">
            <header className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <Book className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-white/80 tracking-widest uppercase">Documentation</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-5xl md:text-7xl font-bold text-white tracking-tighter"
              >
                Everything you need <br /> to <span className="italic font-normal text-blue-400">master</span> TutorAI
              </motion.h1>

              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="text" 
                  placeholder="Search documentation..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-blue-500/50 transition-all font-sans"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              {DOCS_SECTIONS.flatMap(s => s.items).map((item, i) => (
                <motion.button
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold text-xl font-display">{item.title}</h3>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-white/40 text-sm font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="p-12 rounded-[3rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 space-y-6">
              <Terminal className="w-10 h-10 text-blue-400" />
              <h3 className="text-2xl font-bold text-white font-display">Looking for the API?</h3>
              <p className="text-white/50 font-sans">
                Our developer portal provides full OpenAPI specifications, playground environments, and authentication guides for building on top of the TutorAI engine.
              </p>
              <button className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:scale-105 transition-all">
                Explore API Docs
              </button>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />}
      </AnimatePresence>
    </MorphingBackground>
  );
}
