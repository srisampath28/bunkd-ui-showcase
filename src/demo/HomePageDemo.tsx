"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── IMPORTED SHOWCASE COMPONENTS ─────────────────────────────
// In your real showcase repo, import these from their respective files:
// import AnimatedSearchBar from "@/components/AnimatedSearchBar";
// import { CategoryTabs } from "@/components/CategoryTabs";
// import { BottomNav } from "@/components/BottomNav";

// ─── STATIC MOCK DATA ─────────────────────────────────────────
const MOCK_CATEGORIES = [
  { id: "all", name: "All" },
  { id: "cafe", name: "Campus Cafe" },
  { id: "merch", name: "Apparel" },
  { id: "supplies", name: "Supplies" },
];

const MOCK_STORES = [
  {
    id: "1",
    name: "University Bookstore",
    category: "supplies",
    rating: 4.8,
    deliveryTime: "Ready Now",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400&h=250",
    tags: ["Books", "Stationery"],
  },
  {
    id: "2",
    name: "Fresh Bites Cafe",
    category: "cafe",
    rating: 4.9,
    deliveryTime: "10-15 min",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400&h=250",
    tags: ["Coffee", "Pastries", "Healthy"],
  },
  {
    id: "3",
    name: "Campus Tech Hub",
    category: "supplies",
    rating: 4.7,
    deliveryTime: "In Stock",
    imageUrl: "https://images.unsplash.com/photo-1531297172864-8df1481f33f0?auto=format&fit=crop&q=80&w=400&h=250",
    tags: ["Electronics", "Accessories"],
  },
  {
    id: "4",
    name: "Student Threads",
    category: "merch",
    rating: 4.6,
    deliveryTime: "2 Days",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400&h=250",
    tags: ["Hoodies", "T-Shirts"],
  },
];

// ─── SYNTHESIZED STORE CARD COMPONENT ─────────────────────────
function StoreCard({ store }: { store: typeof MOCK_STORES[0] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-zinc-100 dark:border-zinc-800 cursor-pointer group"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={store.imageUrl}
          alt={store.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{store.rating}</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white leading-tight">{store.name}</h3>
        </div>
        
        <div className="flex items-center gap-4 mb-4 text-xs font-bold text-zinc-500">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {store.deliveryTime}
          </div>
        </div>

        <div className="flex gap-2">
          {store.tags.map(tag => (
            <span key={tag} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN DEMO PAGE ───────────────────────────────────────────
export default function MarketplaceDemo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Local filtering logic to demonstrate state interactions
  const filteredStores = MOCK_STORES.filter((store) => {
    const matchesCategory = activeCategory === "all" || store.category === activeCategory;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          store.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 pb-32 font-sans selection:bg-primary/20 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* 1. Sticky Header & Search */}
      <header className="sticky top-0 z-50 bg-[#f8f9fa]/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-zinc-800/50 pt-8 pb-4 px-4 sm:px-6">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight">Discover</h1>
              <p className="text-sm font-medium text-zinc-500">Find exactly what you need.</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>

          <AnimatedSearchBar
            categories={MOCK_CATEGORIES.map(c => c.name)}
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={() => console.log("Search fired:", searchQuery)}
          />
        </div>
      </header>

      {/* 2. Main Content Area */}
      <main className="max-w-xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        
        {/* Animated Category Tabs */}
        <section>
          <CategoryTabs
            categories={MOCK_CATEGORIES}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </section>

        {/* Dynamic Store Grid */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-black tracking-tight">
              {activeCategory === 'all' ? 'All Stores' : MOCK_CATEGORIES.find(c => c.id === activeCategory)?.name}
            </h2>
            <span className="text-xs font-bold text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 px-2.5 py-1 rounded-full">
              {filteredStores.length} {filteredStores.length === 1 ? 'Result' : 'Results'}
            </span>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <StoreCard key={store.id} store={store} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full py-12 flex flex-col items-center justify-center text-zinc-400"
                >
                  <span className="material-symbols-outlined text-4xl mb-3 opacity-50">search_off</span>
                  <p className="font-medium text-sm">No stores found matching your criteria.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

      </main>

      {/* 3. Global Bottom Navigation */}
      <BottomNav />
      
    </div>
  );
}
