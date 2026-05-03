"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface LampProps {
  id: number;
  color: string;
  glowColor: string;
}

const Lamp = ({ id, color, glowColor }: LampProps) => {
  const [isOn, setIsOn] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsOn(true);
      await new Promise(r => setTimeout(r, 50));
      setIsOn(false);
      await new Promise(r => setTimeout(r, 100));
      setIsOn(true);
      await new Promise(r => setTimeout(r, 50));
      setIsOn(false);
      await new Promise(r => setTimeout(r, 150));
      setIsOn(true);
    }, id * 400 + 500);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <motion.div 
      initial={{ rotate: -2 }}
      animate={{ rotate: 2 }}
      transition={{
        duration: 4 + id * 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className="relative flex flex-col items-center origin-top"
    >
      {/* Wire */}
      <div className="w-[2px] h-32 bg-slate-700/80 dark:bg-slate-700/80 bg-slate-300" />
      
      {/* Lamp Body / Dome */}
      <div className="relative flex flex-col items-center">
        <div 
          className="w-24 h-14 rounded-t-full relative z-20 shadow-xl border-b border-white/5 bg-slate-200 dark:bg-[#1a3a40]" 
        />
        
        {/* Glowing Orb */}
        <motion.div
          animate={{
            backgroundColor: isOn ? color : (theme === "dark" ? "#1a3a40" : "#cbd5e1"),
            boxShadow: isOn 
              ? `0 0 40px ${glowColor}, 0 0 80px ${glowColor}` 
              : "0 0 0px transparent",
          }}
          className="w-6 h-6 rounded-full -mt-3 z-30 transition-all duration-500"
        />

        {/* Light Beam */}
        <AnimatePresence>
          {isOn && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none origin-top z-10"
              style={{
                background: `radial-gradient(circle at top, ${glowColor}${theme === "dark" ? "33" : "11"}, transparent 80%)`,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            >
              {/* Dust Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -60, 0],
                    x: [0, Math.random() * 40 - 20, 0],
                    opacity: [0, theme === "dark" ? 0.6 : 0.2, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                  className="absolute w-1 h-1 bg-white/20 dark:bg-white/20 bg-slate-400/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floor Glow */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: theme === "dark" ? 0.35 : 0.1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: glowColor }}
            className="absolute -bottom-[550px] w-[700px] h-48 blur-[130px] rounded-[100%] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const LAMP_CONFIG = [
  { color: "#00e5ff", glowColor: "#00e5ff" }, // Cyan
  { color: "#a855f7", glowColor: "#a855f7" }, // Purple
  { color: "#ec4899", glowColor: "#ec4899" }, // Pink
  { color: "#10b981", glowColor: "#10b981" }, // Emerald
];

export const InteractiveLamps = ({ children }: { children?: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "relative w-full min-h-screen overflow-hidden flex flex-col transition-colors duration-500",
      theme === "dark" ? "bg-[#030d10]" : "bg-slate-50"
    )}>
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none blur-[150px] opacity-50 bg-blue-500/5 dark:bg-blue-500/5" />


      {/* Star Field Animation - Only visible in dark mode */}
      <div className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-1000",
        theme === "dark" ? "opacity-100" : "opacity-0"
      )}>
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random() * 0.5,
              scale: Math.random() * 0.5 + 0.5,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
              y: [`${Math.random() * 100}%`, `${(Math.random() * 100 + 5) % 100}%`],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"
          />
        ))}
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />
      
      {/* Ceiling Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-700/50 dark:bg-slate-700/50 bg-slate-200 z-10" />

      {/* Lamps Grid */}
      <div className="relative z-20 flex justify-center gap-20 md:gap-64 pt-24 px-4">
        {LAMP_CONFIG.map((config, i) => (
          <Lamp 
            key={i} 
            id={i} 
            color={config.color} 
            glowColor={config.glowColor} 
          />
        ))}
      </div>

      {/* Children Content (Original Hero) */}
      <div className="relative z-30 flex-1 flex flex-col">
        {children}
      </div>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/5 blur-[200px] rounded-full pointer-events-none" />
    </motion.div>
  );
};

