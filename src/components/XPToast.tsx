"use client";

import React, { useState, useEffect, useCallback } from 'react';

type XPToastInfo = {
  id: string;
  amount: number;
  reason: string;
};

export function XPToast() {
  const [toasts, setToasts] = useState<XPToastInfo[]>([]);

  const addToast = useCallback((amount: number, reason: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, amount, reason }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    const handleXPEvent = (event: any) => {
      if (event.detail) {
        addToast(event.detail.amount, event.detail.reason);
      }
    };

    window.addEventListener('gain-xp', handleXPEvent);
    return () => window.removeEventListener('gain-xp', handleXPEvent);
  }, [addToast]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className="flex items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-2xl animate-in slide-in-from-right-10 fade-in duration-300"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold">
            +{toast.amount}
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">XP Gained</div>
            <div className="text-sm font-semibold">{toast.reason}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function triggerXPGain(amount: number, reason: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('gain-xp', { detail: { amount, reason } }));
  }
}
