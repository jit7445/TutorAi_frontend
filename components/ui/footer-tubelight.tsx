"use client";
import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const FooterTubeLight = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    if (isInView) {
      // Flicker on when in view
      const sequence = async () => {
        setIsGlowing(true);
        await new Promise(r => setTimeout(r, 50));
        setIsGlowing(false);
        await new Promise(r => setTimeout(r, 100));
        setIsGlowing(true);
        await new Promise(r => setTimeout(r, 50));
        setIsGlowing(false);
        await new Promise(r => setTimeout(r, 150));
        setIsGlowing(true);
      };
      sequence();
    } else {
      setIsGlowing(false);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative w-full flex flex-col items-center py-20 overflow-hidden">
      {/* Tube Housing */}
      <div className="w-full max-w-4xl h-4 bg-slate-800/50 rounded-full relative z-20 border border-white/5 overflow-hidden">
        {/* The Tube */}
        <motion.div
          animate={{
            backgroundColor: isGlowing ? "#ffffff" : "#1a3a40",
            boxShadow: isGlowing 
              ? "0 0 20px #ffffff, 0 0 40px #ffffff, 0 0 80px #ffffff" 
              : "0 0 0px transparent",
          }}
          className="absolute inset-0 transition-all duration-500"
        />
      </div>

      {/* Ambient Glow on "Wall" behind tube */}
      <motion.div
        animate={{
          opacity: isGlowing ? 0.3 : 0,
          scale: isGlowing ? 1 : 0.8,
        }}
        className="absolute w-[1200px] h-[300px] bg-white/20 blur-[100px] rounded-full z-10 pointer-events-none"
      />

      {/* Light Spread on Floor below tube */}
      <motion.div
        animate={{
          opacity: isGlowing ? 0.2 : 0,
          y: isGlowing ? 0 : 20,
        }}
        className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white/20 to-transparent z-0 pointer-events-none"
      />

    </div>
  );
};
