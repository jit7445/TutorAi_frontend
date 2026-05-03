"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, Shield, Crown } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { MorphingBackground } from "@/components/ui/morphing-background";
import { AuthModal } from "@/components/ui/auth-modal";
import { cn } from "@/lib/utils";

const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    desc: "Perfect for casual learners.",
    icon: Zap,
    features: ["5 AI Video Generations/mo", "10 PDF Extractions/mo", "Basic Research AI", "Standard Support"],
    buttonText: "Get Started",
    popular: false,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    name: "Pro",
    price: "$19",
    desc: "For serious students and pros.",
    icon: Shield,
    features: ["Unlimited Video Gen", "Unlimited PDF Notes", "Advanced Web Scraping", "Priority Support", "Custom AI Voiceovers"],
    buttonText: "Go Pro",
    popular: true,
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    name: "Elite",
    price: "$49",
    desc: "The ultimate power package.",
    icon: Crown,
    features: ["Everything in Pro", "1-on-1 AI Tutoring", "Custom Study Plans", "Early Beta Access", "Dedicated Account Manager"],
    buttonText: "Join Elite",
    popular: false,
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

export default function PricingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <MorphingBackground>
      <Navbar onLoginClick={() => setIsAuthModalOpen(true)} />
      
      <main className="pt-40 pb-20 px-4 min-h-screen max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-white/80 tracking-widest uppercase">Simple, Transparent Pricing</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter"
          >
            Choose Your <span className="italic font-normal text-blue-400">Power</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-xl max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Unlock the full potential of AI-driven learning. Save hundreds of hours every semester.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className={cn(
                "relative group p-1 rounded-[2.5rem] overflow-hidden transition-all duration-500",
                plan.popular ? "scale-105 z-10" : "scale-100"
              )}
            >
              {/* Border Glow */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                plan.color,
                plan.popular ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )} />
              
              <div className="relative z-10 h-full bg-slate-900/80 backdrop-blur-3xl p-10 rounded-[2.4rem] border border-white/10 flex flex-col">
                {plan.popular && (
                  <div className="absolute top-6 right-6 px-4 py-1 rounded-full bg-blue-600 text-[10px] font-black uppercase tracking-widest text-white">
                    Most Popular
                  </div>
                )}
                
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/10", plan.color)}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-display text-3xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm font-sans">/month</span>
                </div>
                <p className="text-white/50 text-sm mb-10 font-sans">{plan.desc}</p>
                
                <div className="flex-1 space-y-4 mb-12">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-sm text-white/70 font-sans">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                        <Check className="w-3 h-3 text-blue-400" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className={cn(
                    "w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95",
                    plan.popular 
                      ? "bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)]" 
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                  )}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />}
      </AnimatePresence>
    </MorphingBackground>
  );
}
