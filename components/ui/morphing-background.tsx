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
    [0, 1],
    [
      "linear-gradient(180deg, #050505 0%, #0a0a0c 100%)",
      "linear-gradient(180deg, #0a0a0c 0%, #050505 100%)",
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
        
        {/* Subtle Glowing Orbs */}
        <motion.div
          style={{ y: blobY }}
          className="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-[0.07] bg-blue-500 transition-colors duration-1000"
        />
        <motion.div
          style={{ y: useTransform(smoothProgress, [0, 1], [0, -200]) }}
          className="absolute top-[30%] right-[10%] w-[40vw] h-[40vw] rounded-full blur-[150px] opacity-[0.05] bg-purple-500 transition-colors duration-1000"
        />
        <motion.div
          style={{ y: useTransform(smoothProgress, [0, 1], [0, 100]) }}
          className="absolute bottom-[-10%] left-[40%] w-[60vw] h-[60vw] rounded-full blur-[180px] opacity-[0.06] bg-indigo-500 transition-colors duration-1000"
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
