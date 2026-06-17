'use client';

import { useEffect, useState } from 'react';
import { getStoredProgressSnapshot } from '../lib/progress';

export function useSelectedWorkContext() {
  const [selectedWorkContext, setSelectedWorkContext] = useState('DCS / School IT');

  useEffect(() => {
    setSelectedWorkContext(getStoredProgressSnapshot().selectedWorkContext);

    function handleStorage(event: StorageEvent) {
      if (event.key === 'supportOpsProgress' || event.key === 'dcsPrepProgress') {
        setSelectedWorkContext(getStoredProgressSnapshot().selectedWorkContext);
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return selectedWorkContext;
}

export function useMspModeEnabled() {
  return useSelectedWorkContext() === 'MSP Support';
}
