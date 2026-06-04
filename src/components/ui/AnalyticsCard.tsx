"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnalyticsCardProps {
  title: string;
  icon?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  maxHeight?: string;
}

export function AnalyticsCard({ 
  title, 
  icon, 
  headerAction, 
  children, 
  maxHeight = "480px" 
}: AnalyticsCardProps) {
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col shadow-lg" 
      style={{ maxHeight }}
    >
      <div className="flex items-center justify-between mb-4 border-b border-zinc-800/60 pb-3">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-300 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h3>
        
        {headerAction && (
          <div className="text-[10px] font-bold text-zinc-500">
            {headerAction}
          </div>
        )}
      </div>
      
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto mt-1 space-y-0.5 custom-scrollbar pr-2">
        {children}
      </div>
    </motion.div>
  );
}
