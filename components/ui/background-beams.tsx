"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (beamsRef.current) {
      const beams = beamsRef.current.querySelectorAll(".beam");
      beams.forEach((beam) => {
        const b = beam as HTMLDivElement;
        b.style.left = `${Math.random() * 100}%`;
        b.style.animationDelay = `${Math.random() * 5}s`;
        b.style.animationDuration = `${10 + Math.random() * 20}s`;
      });
    }
  }, []);

  return (
    <div
      ref={beamsRef}
      className={cn(
        "absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
    >
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="beam absolute top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-20 animate-beam"
        />
      ))}
    </div>
  );
};
