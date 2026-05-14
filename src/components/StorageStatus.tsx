"use client";

import { useEffect, useState } from 'react';

export function StorageStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [storageUsed, setStorageUsed] = useState<string>('Unknown');
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(estimate => {
        if (estimate.usage !== undefined) {
          const usedMB = (estimate.usage / (1024 * 1024)).toFixed(2);
          setStorageUsed(`${usedMB} MB`);
        }
      });
    }

    const saved = localStorage.getItem('dcsPrepLastSaved');
    if (saved) setLastSaved(new Date(saved).toLocaleTimeString());

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-4 p-3 rounded-2xl bg-white border border-slate-200 text-xs shadow-sm">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-rose-500'}`} />
        <span className="font-semibold text-slate-700">{isOnline ? 'Online' : 'Offline Mode'}</span>
      </div>
      <div className="h-4 w-[1px] bg-slate-200" />
      <div className="flex items-center gap-2">
        <span className="text-slate-500 uppercase tracking-wider font-bold">Local Data:</span>
        <span className="text-slate-700">{storageUsed} used</span>
      </div>
      {lastSaved && (
        <>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="text-slate-500">
            Last saved: <span className="text-slate-700 font-medium">{lastSaved}</span>
          </div>
        </>
      )}
    </div>
  );
}
