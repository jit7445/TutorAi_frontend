"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface CanvasTextProps {
  text: string;
  className?: string;
  backgroundClassName?: string;
  colors?: string[];
  animationDuration?: number;
  lineWidth?: number;
  lineGap?: number;
  curveIntensity?: number;
  overlay?: boolean;
}

function resolveColor(color: string): string {
  if (typeof window === "undefined") return color;
  if (color.startsWith("var(")) {
    const varName = color.slice(4, -1).trim();
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    return resolved || color;
  }
  return color;
}

export function CanvasText({
  text,
  className = "",
  backgroundClassName = "bg-white dark:bg-neutral-950",
  colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"],
  animationDuration = 20,
  lineWidth = 1,
  lineGap = 4,
  curveIntensity = 30,
  overlay = true,
}: CanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [font, setFont] = useState("");
  const [bgColor, setBgColor] = useState("");
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const style = getComputedStyle(container);
    const fontSize = style.fontSize;
    const fontWeight = style.fontWeight;
    const fontFamily = style.fontFamily;
    setFont(`${fontWeight} ${fontSize} ${fontFamily}`);

    const bgContainer = document.createElement("div");
    bgContainer.className = backgroundClassName;
    bgContainer.style.position = "absolute";
    bgContainer.style.visibility = "hidden";
    document.body.appendChild(bgContainer);
    const resolvedBg = getComputedStyle(bgContainer).backgroundColor;
    document.body.removeChild(bgContainer);
    setBgColor(resolvedBg);
  }, [backgroundClassName]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !font || !bgColor) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resolvedColors = colors.map(resolveColor);
    const pixelRatio = window.devicePixelRatio || 1;
    const padding = 20;

    ctx.font = font;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = parseInt(font);

    const width = textWidth + padding * 2;
    const height = textHeight + padding * 2;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(pixelRatio, pixelRatio);

    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const phase = ((elapsed % animationDuration) / animationDuration) * Math.PI * 2;

      ctx.clearRect(0, 0, width, height);

      // Draw text to use as clip
      ctx.font = font;
      ctx.fillStyle = "black";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(text, width / 2, height / 2);

      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-atop";

      const numLines = Math.ceil(height / lineGap) + 10;

      for (let i = 0; i < numLines; i++) {
        const y = i * lineGap;
        const curve1 = Math.sin(phase) * curveIntensity;
        const curve2 = Math.sin(phase + 0.5) * curveIntensity * 0.6;
        const colorIndex = i % resolvedColors.length;

        ctx.strokeStyle = resolvedColors[colorIndex];
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(
          width * 0.33,
          y + curve1,
          width * 0.66,
          y + curve2,
          width,
          y
        );
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [
    text,
    font,
    bgColor,
    colors,
    animationDuration,
    lineWidth,
    lineGap,
    curveIntensity,
  ]);

  return (
    <span
      ref={containerRef}
      className={cn("relative inline-block", className)}
    >
      <span className="opacity-0 select-none" aria-hidden="true">
        {text}
      </span>
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 pointer-events-none",
          overlay && "mix-difference"
        )}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-label={text}
        role="img"
      />
    </span>
  );
}
