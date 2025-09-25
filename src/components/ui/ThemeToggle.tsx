'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true); // Default to dark mode
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default to dark mode if no preference or if system prefers dark
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);

    // Add a small delay for the animation
    setTimeout(() => {
      const newTheme = !isDark;
      setIsDark(newTheme);

      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }

      // Reset animation state
      setTimeout(() => setIsAnimating(false), 600);
    }, 150);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg border border-border bg-card hover:bg-accent transition-all duration-300 group overflow-hidden theme-transition"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

      {/* Animated SVG Icon */}
      <div className={`relative z-10 transition-transform duration-500 ${isAnimating ? 'theme-toggle-morph' : ''}`}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-500 ${isAnimating ? 'theme-toggle-pulse' : ''}`}
        >
          {/* Sun rays */}
          <g className={`transition-all duration-500 ${isDark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'} ${isAnimating ? 'theme-toggle-rays' : ''}`}>
            <path
              d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-foreground"
            />
          </g>

          {/* Sun circle */}
          <circle
            cx="12"
            cy="12"
            r="5"
            fill="currentColor"
            className={`transition-all duration-500 ${
              isDark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            } text-foreground`}
          />

          {/* Moon */}
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="currentColor"
            className={`transition-all duration-500 ${
              isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            } text-foreground`}
          />

          {/* Moon craters */}
          <g className={`transition-all duration-500 ${
            isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}>
            <circle cx="15" cy="9" r="1" fill="currentColor" className="text-muted-foreground" />
            <circle cx="17" cy="13" r="0.5" fill="currentColor" className="text-muted-foreground" />
            <circle cx="13" cy="15" r="0.5" fill="currentColor" className="text-muted-foreground" />
          </g>
        </svg>
      </div>

      {/* Ripple effect */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-lg bg-primary/20 theme-toggle-ripple" />
      )}

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </button>
  );
}
