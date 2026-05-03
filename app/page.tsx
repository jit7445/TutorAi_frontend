"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Send, Sparkles, Video, FileText, PlayCircle, Download, Paperclip, X, Users, Zap, Globe, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/ui/navbar";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { HoverCard } from "@/components/ui/hover-card";
import { AuthModal } from "@/components/ui/auth-modal";
import { MorphingBackground } from "@/components/ui/morphing-background";
import { Library } from "@/components/ui/library";

// --- Sub-components ---

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: false, margin: "-100px" }}
    transition={{ 
      duration: 1.2, 
      delay, 
      ease: [0.22, 1, 0.36, 1] 
    }}
  >
    {children}
  </motion.div>
);

const ScrollZoomWrapper = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ scale, opacity, y }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const StatCounter = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="text-5xl md:text-6xl font-display font-bold text-white mb-2"
      >
        {value}
      </motion.div>
      <div className="text-white/60 font-sans tracking-widest uppercase text-xs">{label}</div>
    </div>
  );
};

export default function Home() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file);
  };

  const handleGenerate = async () => {
    if (!topic && !attachedFile) {
      setError("Please enter a topic or upload a file.");
      return;
    }

    const token = localStorage.getItem("tutorai_token");
    if (!token) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsGenerating(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:3005/api/v1/ai/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ topic: topic || attachedFile?.name })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to start generation");

      setSuccess(true);
      setTopic("");
      setAttachedFile(null);
      // Wait a bit and then reload to show new items in Library
      setTimeout(() => window.location.hash = "#library", 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <MorphingBackground>
      <Navbar onLoginClick={() => setIsAuthModalOpen(true)} />
      
      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-40 md:pt-20 px-4 text-center relative overflow-hidden">


        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium text-white/80 tracking-wider uppercase">AI-Powered Learning Revolution</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="font-display text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] text-white mb-8">
            Study Smarter, <br /> 
            <span className="italic font-normal opacity-80">Not Harder</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="font-sans text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12">
            Instant notes from PDFs or AI-driven web research. 
            Cinema-quality videos for every topic. Save hours of study time every day.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="relative w-full max-w-4xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 flex items-center">
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="p-6 text-white/40 hover:text-white transition-colors">
                <Paperclip className="w-8 h-8" />
              </button>
              <div className="flex-1 flex items-center px-4">
                {attachedFile ? (
                  <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 text-lg">
                    <FileText className="w-5 h-5" />
                    <span className="truncate max-w-[250px] font-bold">{attachedFile.name}</span>
                    <button onClick={() => setAttachedFile(null)} className="hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                ) : (
                  <input 
                    type="text" 
                    placeholder="What do you want to master today?" 
                    className="w-full bg-transparent border-none focus:ring-0 py-8 px-2 text-2xl md:text-3xl outline-none text-white font-display placeholder:text-white/20"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                )}
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="relative group/btn overflow-hidden bg-blue-600 px-8 py-4 rounded-full font-bold text-base md:text-lg text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)]"
              >
                {/* Button Shine Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                
                <div className="relative z-10 flex items-center gap-2">
                  {isGenerating ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  <span className="tracking-tight whitespace-nowrap">{isGenerating ? "Creating..." : "Generate Magic"}</span>
                </div>
              </button>
            </div>



            
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-full left-0 right-0 mt-4 text-red-400 text-sm font-bold">
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-full left-0 right-0 mt-4 text-emerald-400 text-sm font-bold">
                  Success! Generation started. Check your library below.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeUp>
      </section>

      {/* Library Section */}
      <Library />


      {/* 2. Features Section */}
      <section className="py-40 px-4 max-w-7xl mx-auto">
        <ScrollZoomWrapper>
          <FadeUp>
            <div className="text-center mb-24">
              <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Powerful Tools</h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto font-sans">
                Everything you need to master any subject in a fraction of the time.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Video, title: "Video Gen", desc: "Cinema-quality educational videos with AI voiceovers.", color: "from-blue-500/20 to-cyan-500/20" },
              { icon: FileText, title: "PDF Extraction", desc: "Upload PDFs for instant structured study notes.", color: "from-purple-500/20 to-pink-500/20" },
              { icon: Sparkles, title: "AI Research", desc: "Global web scraping to build perfect study guides.", color: "from-emerald-500/20 to-teal-500/20" },
            ].map((f, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <HoverCard className="bg-white/5 backdrop-blur-2xl border-white/10 h-full p-10">
                  <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-8 border border-white/10", f.color)}>
                    <f.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-4">{f.title}</h3>
                  <p className="text-white/50 leading-relaxed font-sans">{f.desc}</p>
                </HoverCard>
              </FadeUp>
            ))}
          </div>
        </ScrollZoomWrapper>
      </section>

      {/* 3. Stats Section */}
      <section className="py-40 px-4 max-w-7xl mx-auto">
        <ScrollZoomWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCounter value="500K+" label="Active Students" />
            <StatCounter value="12M+" label="Notes Generated" />
            <StatCounter value="98%" label="Satisfaction" />
            <StatCounter value="4.9/5" label="App Store" />
          </div>
        </ScrollZoomWrapper>
      </section>

      {/* 4. Testimonials */}
      <section className="py-40 relative overflow-hidden">
        <ScrollZoomWrapper>
          <FadeUp>
            <div className="px-4 text-center mb-24">
              <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Student Stories</h2>
            </div>
          </FadeUp>
          
          <div className="flex gap-8 px-4 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="min-w-[350px] md:min-w-[450px] p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 snap-center">
                <Quote className="w-10 h-10 text-white/20 mb-6" />
                <p className="text-xl text-white/80 font-sans italic leading-relaxed mb-8">
                  "TutorAI literally saved my finals. I uploaded 500 pages of medical notes and got perfect summaries in minutes."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                  <div>
                    <div className="text-white font-bold font-display">Sarah Jenkins</div>
                    <div className="text-white/40 text-sm uppercase tracking-widest font-sans">Medical Student</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollZoomWrapper>
      </section>




      {/* 6. Footer */}
      <footer className="py-20 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <Sparkles className="text-black w-6 h-6" />
            </div>
            <span className="font-display text-2xl font-bold text-white">TutorAI</span>
          </div>
          
          <div className="flex gap-8 text-white/40 font-sans text-sm tracking-widest uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-white/20 font-sans text-sm">
            © 2026 TutorAI. Built for students, by students.
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />}
      </AnimatePresence>
    </MorphingBackground>
  );
}
