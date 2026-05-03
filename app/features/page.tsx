"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, FileText, Sparkles, Globe, Zap, Cpu, Search, Brain, Rocket } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { MorphingBackground } from "@/components/ui/morphing-background";
import { AuthModal } from "@/components/ui/auth-modal";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Video,
    title: "Cinema-Quality Video Generation",
    desc: "Our AI doesn't just show slides. It creates dynamic, cinema-quality educational videos with synthesized voiceovers, relevant stock footage, and motion graphics tailored to your specific topic.",
    color: "bg-blue-500/20 text-blue-400",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000"
  },
  {
    icon: FileText,
    title: "Deep PDF Intelligence",
    desc: "Upload textbook chapters or complex research papers. Our AI extracts core concepts, creates mind maps, and generates high-fidelity study notes that feel like they were written by a top-tier professor.",
    color: "bg-emerald-500/20 text-emerald-400",
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1000"
  },
  {
    icon: Globe,
    title: "Global Web Research",
    desc: "When a topic is too new for a textbook, TutorAI scrapes the entire web—from scientific journals to technical blogs—to build you a perfectly up-to-date learning experience.",
    color: "bg-purple-500/20 text-purple-400",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
  }
];

export default function FeaturesPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <MorphingBackground>
      <Navbar onLoginClick={() => setIsAuthModalOpen(true)} />
      
      <main className="pt-40 pb-20 px-4 min-h-screen max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white/80 tracking-widest uppercase">The Future of Education</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter"
          >
            Limitless <span className="italic font-normal text-emerald-400">Intelligence</span>
          </motion.h1>
        </div>

        <div className="space-y-40">
          {FEATURES.map((f, i) => (
            <div key={i} className={cn(
              "flex flex-col gap-12 items-center",
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            )}>
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 space-y-8"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10", f.color)}>
                  <f.icon className="w-8 h-8" />
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                  {f.title}
                </h2>
                <p className="text-white/50 text-lg md:text-xl font-sans leading-relaxed">
                  {f.desc}
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 text-xs font-bold uppercase tracking-widest">
                    <Zap className="w-3 h-3" /> Ultra Fast
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 text-xs font-bold uppercase tracking-widest">
                    <Shield className="w-3 h-3" /> Secure
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-1 relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video md:aspect-square lg:aspect-video">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-60 p-12 md:p-24 rounded-[4rem] bg-white text-black text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full" />
          <div className="relative z-10 space-y-8">
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight">Ready to start?</h2>
            <p className="text-black/60 text-xl max-w-xl mx-auto font-sans">
              Join the educational revolution today and experience learning like never before.
            </p>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-black text-white px-12 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all flex items-center gap-3 mx-auto"
            >
              <Rocket className="w-6 h-6" />
              Get Started for Free
            </button>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />}
      </AnimatePresence>
    </MorphingBackground>
  );
}
