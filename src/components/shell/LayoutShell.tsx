"use client";

import { useUI } from '../../contexts/UIContext';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { XPToast } from '../XPToast';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const { focusMode, toggleFocusMode } = useUI();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(226,232,240,0.6),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.6),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
      {!focusMode && <Topbar />}
      
      <main className={`mx-auto grid max-w-7xl gap-6 px-4 py-6 ${focusMode ? 'md:grid-cols-1' : 'md:grid-cols-[280px_minmax(0,1fr)]'}`}>
        {!focusMode && <Sidebar />}
        <div className="min-w-0">
          {focusMode && (
            <div className="mb-6 flex justify-between items-center bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg">
              <span className="text-sm font-semibold tracking-wider uppercase">Focus Mode Active</span>
              <button 
                onClick={toggleFocusMode}
                className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-all"
              >
                Exit Focus
              </button>
            </div>
          )}
          {children}
        </div>
      </main>

      <XPToast />

      {!focusMode && (
        <footer className="border-t border-slate-200 bg-white/80 px-4 py-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-400">
          <div className="mx-auto max-w-7xl">
            SupportOps Career Lab is a personal career development tool. Keep all entries privacy-safe and free of real student, staff,
            credential, or network details.
          </div>
        </footer>
      )}
    </div>
  );
}
