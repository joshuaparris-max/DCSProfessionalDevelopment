"use client";

import { useState, useEffect } from 'react';
import { saveModuleOffline, getModuleOffline, removeModuleOffline } from '../lib/offlineStorage';
import type { TrainingModule } from '../types/training';

export function useOfflineDownload(moduleData: TrainingModule) {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      const offlineData = await getModuleOffline(moduleData.id);
      setIsDownloaded(!!offlineData);
    }
    checkStatus();
  }, [moduleData.id]);

  async function toggleDownload() {
    if (isDownloaded) {
      await removeModuleOffline(moduleData.id);
      setIsDownloaded(false);
    } else {
      setIsDownloading(true);
      // In a real app, we might fetch images or other assets here
      await saveModuleOffline(moduleData);
      setIsDownloaded(true);
      setIsDownloading(false);
    }
  }

  return { isDownloaded, isDownloading, toggleDownload };
}
