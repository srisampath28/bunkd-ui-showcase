'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedSearchBarProps {
  categories?: string[];
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

export default function AnimatedSearchBar({ 
  categories = [], 
  value, 
  onChange, 
  onSubmit 
}: AnimatedSearchBarProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generic marketplace placeholders replacing business-specific categories
  const fallback = [
    "Campus Cafe", 
    "Snack Station", 
    "University Apparel", 
    "Study Supplies", 
    "Dorm Essentials"
  ];
  
  const items = categories.length > 0 ? categories : fallback;

  // Custom typing animation loop orchestration
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % items.length;
      const fullText = items[i];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      // Variable typing speed to simulate human behavior
      setTypingSpeed(isDeleting ? 60 + Math.random() * 40 : 100 + Math.random() * 80);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
        return;
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, items]);

  const hasUserInput = value.length > 0;

  return (
    <div className="relative flex items-center bg-surface-container-lowest rounded-full p-1 shadow-[0_12px_24px_rgba(0,0,0,0.06)] focus-within:ring-2 focus-within:ring-primary/20 transition-all">
      
      {/* Search Icon */}
      <div className="pl-5 pr-3 flex items-center justify-center">
        <span className="material-symbols-outlined text-outline">search</span>
      </div>
      
      {/* Input & Animated Overlay Container */}
      <div className="relative flex-1">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSubmit(); }}
          className="bg-transparent border-none outline-none focus:ring-0 w-full py-3 text-on-surface font-medium relative z-10"
          type="text"
          aria-label="Search campus marketplace"
        />
        
        {/* Animated placeholder overlay — disappears when user types */}
        {!hasUserInput && (
          <div className="absolute inset-0 flex items-center pointer-events-none select-none">
            <span className="text-outline/60 font-medium">
              Search for &ldquo;
              <span className="text-on-surface-variant font-semibold">{displayText}</span>
              <span className="inline-block w-[2px] h-[1.1em] bg-primary/70 align-text-bottom ml-[1px] animate-blink" />
              &rdquo;
            </span>
          </div>
        )}
      </div>

      {/* Clear Input Button */}
      {hasUserInput && (
        <button
          type="button"
          onClick={() => { onChange(''); inputRef.current?.focus(); }}
          className="pr-2 flex items-center justify-center text-outline hover:text-on-surface transition-colors"
          aria-label="Clear search input"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      )}

      {/* Submit Action */}
      <button
        onClick={onSubmit}
        className="bg-primary text-white rounded-full h-10 px-6 font-bold hover:opacity-90 transition-all flex items-center justify-center whitespace-nowrap"
      >
        Go
      </button>
    </div>
  );
}
