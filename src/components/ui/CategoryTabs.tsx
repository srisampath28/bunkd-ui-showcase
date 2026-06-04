"use client";

import React from "react";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

export function CategoryTabs({ categories, activeCategory, setActiveCategory }: CategoryTabsProps) {
  return (
    <div className="flex space-x-2 bg-surface-container/50 p-1 rounded-2xl w-full max-w-md mx-auto mb-4 overflow-x-auto no-scrollbar">
      {categories.map((cat) => {
        const isActive = cat.id === activeCategory;
        
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`relative flex-1 py-2 px-4 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
              isActive 
                ? 'text-white' 
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
            aria-selected={isActive}
            role="tab"
          >
            {/* Smooth Sliding Background Indicator */}
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-0 bg-primary rounded-xl"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Tab Label (z-10 keeps it above the animated background) */}
            <span className="relative z-10">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
