"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/lib/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

export const InteractiveGrid = ({
  className,
  gridSize = 40,
  glowColor = "rgba(59, 130, 246, 0.15)",
}: {
  className?: string;
  gridSize?: number;
  glowColor?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-20 dark:opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="brick-grid"
            width={gridSize}
            height={gridSize / 1.5}
            patternUnits="userSpaceOnUse"
          >
            <rect
              width={gridSize - 1}
              height={gridSize / 1.5 - 1}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <radialGradient
            id="mouse-glow"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#brick-grid)" />
      </svg>

      {/* Interactive Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 80%)`,
        }}
      />
    </div>
  );
};
