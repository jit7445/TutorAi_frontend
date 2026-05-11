"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Send, Sparkles, Video, FileText, PlayCircle, Download, Paperclip, X, Users, Zap, Globe, Star, Quote, Mic2, BrainCircuit, Check } from "lucide-react";
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
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-white mb-6">
            Study Smarter, <br /> 
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Not Harder</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="font-sans text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12">
            Instant notes from PDFs or AI-driven web research. 
            Cinema-quality videos for every topic. Save hours of study time every day.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="relative w-full max-w-3xl mx-auto group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-[2rem] blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#111116] border border-white/10 rounded-[2rem] p-2 flex items-center shadow-2xl">
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="p-4 text-white/40 hover:text-white transition-colors">
                <Paperclip className="w-6 h-6" />
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
                    className="w-full bg-transparent border-none focus:ring-0 py-4 px-2 text-xl md:text-2xl outline-none text-white font-sans placeholder:text-white/30 placeholder:font-light"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                )}
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="relative group/btn overflow-hidden bg-blue-600/90 hover:bg-blue-500 px-6 py-3 md:px-8 md:py-4 rounded-[1.5rem] font-bold text-sm md:text-base text-white transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-lg"
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

        {/* Trusted By Banner */}
        <FadeUp delay={0.4}>
          <div className="mt-16 w-full max-w-5xl mx-auto border-t border-white/5 pt-10">
            <p className="text-sm font-medium text-white/40 tracking-widest uppercase mb-8">Trusted by students & teams at</p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {['Stanford', 'MIT', 'Harvard', 'Oxford', 'Google', 'Microsoft'].map((company) => (
                <span key={company} className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">{company}</span>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Library Section */}
      <Library />


      {/* 2. Features Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <ScrollZoomWrapper>
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Powerful Tools</h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-sans">
                Everything you need to master any subject in a fraction of the time.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Video, title: "Video Gen", desc: "Cinema-quality educational videos with AI voiceovers.", color: "from-zinc-800 to-zinc-900" },
              { icon: FileText, title: "PDF Extraction", desc: "Upload PDFs for instant structured study notes.", color: "from-zinc-800 to-zinc-900" },
              { icon: Sparkles, title: "AI Research", desc: "Global web scraping to build perfect study guides.", color: "from-zinc-800 to-zinc-900" },
            ].map((f, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-[#111116] border border-white/5 rounded-[2rem] p-8 h-full hover:bg-[#16161c] transition-colors shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                    <f.icon className="w-6 h-6 text-zinc-300" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-zinc-400 leading-relaxed font-sans text-sm">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </ScrollZoomWrapper>
      </section>

      {/* Confident Pitch Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto relative overflow-hidden">
        <ScrollZoomWrapper>
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
                Turn any document<br />
                into a{' '}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  confident pitch
                </span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-sans">
                Upload your files. Get AI summaries, narration, and coaching feedback — all in one place.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Sparkles, title: "AI-Powered Summaries", desc: "Get page-by-page and full document summaries in seconds.", color: "from-indigo-500/20 to-blue-500/20" },
              { icon: Mic2, title: "Text-to-Speech Narration", desc: "Convert any document into a natural audio presentation.", color: "from-purple-500/20 to-pink-500/20" },
              { icon: BrainCircuit, title: "AI Presentation Coach", desc: "Practice your delivery and get scored feedback instantly.", color: "from-indigo-500/20 to-purple-500/20" },
            ].map((f, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-[#0f0f2e]/60 backdrop-blur-2xl border border-indigo-500/20 h-full p-8 rounded-3xl hover:bg-[#0f0f2e]/80 transition-colors group">
                  <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-300", f.color)}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-white/60 leading-relaxed font-sans text-sm">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </ScrollZoomWrapper>
      </section>

      {/* 3. Stats Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <ScrollZoomWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCounter value="500K+" label="Active Students" />
            <StatCounter value="12M+" label="Notes Generated" />
            <StatCounter value="98%" label="Satisfaction" />
            <StatCounter value="4.9/5" label="App Store" />
          </div>
        </ScrollZoomWrapper>
      </section>

      {/* 4. Testimonials */}
      <section className="py-16 relative overflow-hidden">
        <ScrollZoomWrapper>
          <FadeUp>
            <div className="px-4 text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Student Stories</h2>
            </div>
          </FadeUp>
          
          <div className="flex gap-6 px-4 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="min-w-[320px] md:min-w-[400px] p-8 rounded-[2rem] bg-[#111116] border border-white/5 snap-center relative">
                <Quote className="w-8 h-8 text-white/10 mb-6" />
                <p className="text-zinc-300 font-sans leading-relaxed mb-8 text-sm md:text-base">
                  "TutorAI literally saved my finals. I uploaded 500 pages of medical notes and got perfect summaries in minutes."
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500" />
                  <div>
                    <div className="text-white font-bold font-sans text-sm">Sarah Jenkins</div>
                    <div className="text-zinc-500 text-xs tracking-wider uppercase font-sans mt-0.5">Medical Student</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollZoomWrapper>
      </section>

      {/* 5. Pricing Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto relative">
        <ScrollZoomWrapper>
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Simple Pricing</h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-sans">
                Start for free, upgrade when you need more power.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free Tier */}
            <FadeUp delay={0.1}>
              <div className="bg-[#111116] border border-white/5 rounded-[2rem] p-8 h-full flex flex-col hover:border-white/10 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2">Basic</h3>
                <p className="text-zinc-500 text-sm mb-6">Perfect for trying out the platform.</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-zinc-500 text-sm">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {['3 PDF Uploads per month', 'Basic AI Summaries', 'Community Support'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                      <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl font-bold text-sm text-white bg-zinc-800 hover:bg-zinc-700 transition-colors">
                  Get Started Free
                </button>
              </div>
            </FadeUp>

            {/* Pro Tier */}
            <FadeUp delay={0.2}>
              <div className="bg-gradient-to-b from-blue-900/20 to-transparent border border-blue-500/30 rounded-[2rem] p-8 h-full flex flex-col relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <p className="text-blue-200/50 text-sm mb-6">For serious students & professionals.</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">$15</span>
                  <span className="text-zinc-500 text-sm">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {['Unlimited PDF Uploads', 'Advanced AI Summaries & Narration', 'AI Presentation Coach', 'Priority Support'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                      <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-colors">
                  Upgrade to Pro
                </button>
              </div>
            </FadeUp>

            {/* Enterprise Tier */}
            <FadeUp delay={0.3}>
              <div className="bg-[#111116] border border-white/5 rounded-[2rem] p-8 h-full flex flex-col hover:border-white/10 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2">Teams</h3>
                <p className="text-zinc-500 text-sm mb-6">Custom solutions for organizations.</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">Custom</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {['Everything in Pro', 'Custom API Access', 'Dedicated Account Manager', 'SSO & Advanced Security'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                      <Check className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl font-bold text-sm text-white bg-zinc-800 hover:bg-zinc-700 transition-colors">
                  Contact Sales
                </button>
              </div>
            </FadeUp>
          </div>
        </ScrollZoomWrapper>
      </section>

      {/* 6. Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
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
