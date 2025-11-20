'use client'

import * as React from 'react'
import { useEffect } from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme,
} from 'next-themes'
import { Sun, Moon } from 'lucide-react'

// Provide sensible defaults and reduced-flash handling for theme switching
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Default props: attribute=class keeps theme on html element, storageKey scoped
  const defaults: Partial<ThemeProviderProps> = {
    attribute: 'class',
    defaultTheme: 'light',
    enableSystem: true,
    storageKey: 'alltripp-theme',
    disableTransitionOnChange: true,
  }

  return (
    <NextThemesProvider {...defaults} {...props}>
      {children}
    </NextThemesProvider>
  )
}

// Accessible Theme Toggle component to use across the app
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    // remove any transient transition disabling class after mount
    const el = document.documentElement;
    el.classList.remove('disable-theme-transitions');
  }, []);

  const toggle = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    // temporarily disable transitions for a smooth switch
    document.documentElement.classList.add('disable-theme-transitions');
    setTheme(next);
    // remove the helper class shortly after
    setTimeout(() => document.documentElement.classList.remove('disable-theme-transitions'), 300);
  }

  const isDark = resolvedTheme === 'dark';
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  // Keep aria-pressed as a string attribute for static analysis; update at runtime
  React.useEffect(() => {
    if (btnRef.current) {
      btnRef.current.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }
  }, [isDark]);

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      aria-pressed="false"
      ref={btnRef}
      onClick={toggle}
      className={`focusable inline-flex items-center justify-center ${className}`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-blue-300" />}
    </button>
  )
}
