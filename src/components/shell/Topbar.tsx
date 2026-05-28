"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUI } from '../../contexts/UIContext';
import { StorageStatus } from '../StorageStatus';

const STORAGE_KEY = 'dcsprep-theme';

type Theme = 'light' | 'dark';

export default function Topbar() {
  const [theme, setTheme] = useState<Theme>('light');
  const { toggleFocusMode } = useUI();

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextTheme = storedTheme ?? (systemPrefersDark ? 'dark' : 'light');
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div>
          <Link href="/" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            SupportOps Career Lab
          </Link>
        </div>
        <form action="/search" method="get" className="hidden min-w-[280px] flex-1 px-6 lg:block">
          <input
            type="text"
            name="q"
            placeholder="Search modules, scenarios, subjects..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </form>
        <div className="hidden items-center gap-4 text-sm text-slate-600 dark:text-slate-300 md:flex">
          <Link href="/modules">Modules</Link>
          <Link href="/academic-pd">Academic PD</Link>
          <Link href="/scenarios">Scenarios</Link>
          <Link href="/search">Search</Link>
          <Link href="/due-today">Due Today</Link>
          <Link href="/pd-log">PD Log</Link>
        </div>
        <div className="flex items-center gap-4">
          <StorageStatus />
          <button
            type="button"
            onClick={toggleFocusMode}
            className="hidden sm:block rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Focus Mode
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  );
}
