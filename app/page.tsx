"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Video, FileText, PlayCircle, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/ui/navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { HoverCard } from "@/components/ui/hover-card";
import { AuthModal } from "@/components/ui/auth-modal";
import { LampContainer } from "@/components/ui/lamp";
import { CanvasText } from "@/components/ui/canvas-text";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { useMousePosition } from "@/lib/hooks/use-mouse-position";
import { useTheme } from "next-themes";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const { theme } = useTheme();

  const handleGenerate = () => {
    if (!topic) return;
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar onLoginClick={() => setIsAuthModalOpen(true)} />
      
      <AnimatePresence>
        {isAuthModalOpen && (
          <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[95vh] flex flex-col items-center justify-center px-4 overflow-hidden border-b border-black/5 dark:border-white/5">
        <InteractiveGrid 
          className="z-0" 
          gridSize={50} 
          glowColor={theme === "dark" ? "rgba(37, 99, 235, 0.2)" : "rgba(37, 99, 235, 0.1)"}
        />
        <BackgroundBeams className="opacity-[0.1] dark:opacity-30" />
        
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Learning Platform</span>
          </div>
          
          <h1 className="hero-heading text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
            Learn Anything <br /> with <span className="text-blue-600">TutorAI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Generate high-quality educational videos and detailed study notes in seconds. Just type a topic and let our AI handle the rest.
          </p>

          {/* Input Area */}
          <div className="relative max-w-2xl mx-auto mt-12 group">
            <BackgroundGradient containerClassName="rounded-3xl" className="rounded-2xl p-1 glass-card overflow-hidden shadow-xl shadow-blue-500/5">
              <div className="relative flex items-center glass-card rounded-2xl p-1">
                <input
                  type="text"
                  placeholder="Explain the world 2..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-4 text-lg outline-none placeholder:text-muted hero-heading"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic}
                  className={cn(
                    "flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-200",
                    topic 
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]" 
                      : "bg-slate-100 dark:bg-slate-800 text-muted cursor-not-allowed"
                  )}
                >
                  {isGenerating ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </div>
            </BackgroundGradient>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <HoverCard>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <Video className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 hero-heading">Video Generation</h3>
            <p className="opacity-70 leading-relaxed">
              Cinema-quality educational videos with synthesized voiceovers and dynamic visuals tailored to your topic.
            </p>
          </HoverCard>

          <HoverCard>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
              <FileText className="text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 hero-heading">Study Notes</h3>
            <p className="opacity-70 leading-relaxed">
              Comprehensive PDF and DOC notes including summaries, key concepts, and detailed explanations.
            </p>
          </HoverCard>

          <HoverCard>
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 border border-pink-500/20">
              <Sparkles className="text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 hero-heading">AI Magic</h3>
            <p className="opacity-70 leading-relaxed">
              Powered by advanced LLMs and media synthesis models to ensure accuracy and engagement.
            </p>
          </HoverCard>
        </div>
      </section>

      {/* Mock Result Section */}
      <section ref={resultsRef} className="py-20 px-4 glass-card border-y scroll-mt-20 transition-all">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-bold hero-heading">Your Generated Content</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Video Preview */}
            <div className="group relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-black aspect-video flex items-center justify-center shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
               <PlayCircle className="w-20 h-20 text-white/50 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300 z-20 cursor-pointer" />
               <div className="absolute bottom-6 left-6 z-20 text-left">
                  <p className="text-sm font-medium text-blue-400 mb-1">Generated Video</p>
                  <h4 className="text-lg font-bold text-white">Topic Overview: {topic || "World History"}</h4>
               </div>
            </div>
            
            {/* Notes Preview */}
            <div className="flex flex-col gap-4">
               {[1, 2].map((i) => (
                 <div key={i} className="flex items-center justify-between p-6 rounded-2xl glass-card border hover:border-blue-500/30 transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <FileText className="w-5 h-5 opacity-50" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold hero-heading">Summary_Notes_Part_{i}.pdf</p>
                        <p className="text-sm opacity-50">2.4 MB • PDF Document</p>
                      </div>
                    </div>
                    <button className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-blue-600">
                      <Download className="w-5 h-5" />
                    </button>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lamp Section */}
      <div className="mt-20">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Ready to <br /> Start Learning?
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 px-10 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20"
          >
            Get Started Now
          </motion.button>
        </LampContainer>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t text-center opacity-50">
        <p>© 2026 TutorAI. All rights reserved.</p>
      </footer>

    </main>
  );
}
