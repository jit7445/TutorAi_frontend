"use client";
import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const MorphingBackground = ({ children }: { children?: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Background Gradient Morphing
  const backgroundGradient = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "linear-gradient(135deg, #0a0a1a, #0d1b2a)", // Stage 1: Midnight
      "linear-gradient(150deg, #020f12, #0a2a2a)", // Stage 2: Teal
      "linear-gradient(165deg, #1a0a2e, #2d1b69)", // Stage 3: Violet
      "linear-gradient(180deg, #2a0a1f, #4a1040)", // Stage 4: Magenta
      "linear-gradient(195deg, #1a0800, #3d1a00)", // Stage 5: Amber
      "linear-gradient(210deg, #001a0a, #002a15)", // Stage 6: Emerald
    ]
  );

  // Floating Blobs Colors
  const blob1Color = useTransform(smoothProgress, [0, 0.5, 1], ["#3b82f6", "#8b5cf6", "#10b981"]);
  const blob2Color = useTransform(smoothProgress, [0, 0.5, 1], ["#06b6d4", "#ec4899", "#f59e0b"]);
  const blob3Color = useTransform(smoothProgress, [0, 0.5, 1], ["#6366f1", "#d946ef", "#14b8a6"]);

  // Parallax & Mesh Movement
  const meshY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const blobY = useTransform(smoothProgress, [0, 1], [0, 300]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      {/* Fixed Morphing Background Container */}
      <motion.div
        style={{ background: backgroundGradient }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        {/* Grain/Noise Texture */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Floating Orbs / Blobs */}
        <motion.div
          style={{ y: blobY, backgroundColor: blob1Color }}
          className="absolute top-[10%] left-[15%] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-20 transition-colors duration-1000"
        />
        <motion.div
          style={{ y: useTransform(smoothProgress, [0, 1], [0, -400]), backgroundColor: blob2Color }}
          className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] rounded-full blur-[130px] opacity-25 transition-colors duration-1000"
        />
        <motion.div
          style={{ y: useTransform(smoothProgress, [0, 1], [0, 200]), backgroundColor: blob3Color }}
          className="absolute bottom-[10%] left-[30%] w-[45vw] h-[45vw] rounded-full blur-[140px] opacity-15 transition-colors duration-1000"
        />

        {/* Mesh Shimmer Gradients */}
        <motion.div 
          style={{ y: meshY }}
          className="absolute inset-0 z-10 opacity-30 mix-blend-soft-light"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
        </motion.div>
      </motion.div>

      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 z-[100] origin-left"
        style={{ 
          scaleX: scrollYProgress,
          background: "linear-gradient(to right, #3b82f6, #ec4899, #10b981)" 
        }}
      />

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
