"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const HoverCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative p-8 rounded-3xl border border-white/10 dark:border-white/10 border-black/5 backdrop-blur-md transition-all duration-300 hover:bg-white/5 dark:hover:bg-white/5 overflow-hidden",
        className
      )}
    >

      {/* Mouse Spotlight Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.06), transparent 80%)`
        }}
      />

      {/* Rainbow Glow Border Layers */}
      <div 
        className="absolute -inset-[2px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none overflow-hidden"
        style={{
          background: "var(--gradient-shadow)",
          backgroundSize: "400%",
          animation: "rainbow-animate 20s linear infinite"
        }}
      />
      <div 
        className="absolute -inset-[2px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none blur-xl overflow-hidden"
        style={{
          background: "var(--gradient-shadow)",
          backgroundSize: "400%",
          animation: "rainbow-animate 20s linear infinite"
        }}
      />
      
      {/* Inner Mask to keep content clear */}
      <div className="absolute inset-[1px] rounded-[inherit] bg-white dark:bg-[#030d10] z-0" />

      <div className="relative z-10">{children}</div>
    </div>
  );


};
