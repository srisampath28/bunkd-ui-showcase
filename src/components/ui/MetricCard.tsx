"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: number | string;
  prefix?: string;
  subtitle?: React.ReactNode;
  themeColor?: "emerald" | "orange" | "blue" | "purple" | "cyan";
  isLive?: boolean;
}

// A simple local animated counter to replicate your AnimatedCounter logic
function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  
  useEffect(() => {
    const duration = 800;
    const startTime = Date.now();
    const startVal = display;
    const diff = value - startVal;
    
    if (diff === 0) return;
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
      setDisplay(Math.round(startVal + diff * eased));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, display]);

  return <span>{display.toLocaleString()}</span>;
}

export function MetricCard({ 
  title, 
  value, 
  prefix = "", 
  subtitle, 
  themeColor = "blue", 
  isLive = false 
}: MetricCardProps) {
  
  const colors = {
    emerald: "text-emerald-400 bg-emerald-500",
    orange: "text-orange-400 bg-orange-500",
    blue: "text-blue-400 bg-blue-500",
    purple: "text-purple-400 bg-purple-500",
    cyan: "text-cyan-400 bg-cyan-500",
  };

  const textColor = colors[themeColor].split(' ')[0];
  const bgColor = colors[themeColor].split(' ')[1];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition-all group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[10px] font-black uppercase tracking-widest ${textColor}`}>
          {title}
        </span>
        {isLive && (
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${bgColor} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${bgColor}`} />
          </span>
        )}
      </div>
      
      <div className="text-3xl font-black text-white block">
        {prefix}
        {typeof value === "number" ? <AnimatedCounter value={value} /> : value}
      </div>
      
      {subtitle && (
        <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-zinc-500">
          {subtitle}
        </div>
      )}
    </motion.div>
  );
}
