"use client";

import { useEffect, useRef } from 'react';
import { trackUsageInteraction } from '../../hooks/useUsageTracking';

export default function SearchUsageTracker({ queryLength, resultCount }: { queryLength: number; resultCount: number }) {
  const trackedRef = useRef('');

  useEffect(() => {
    const key = `${queryLength}:${resultCount}`;
    if (!queryLength || trackedRef.current === key) {
      return;
    }

    trackedRef.current = key;
    trackUsageInteraction({
      eventType: 'search_performed',
      route: '/search',
      label: 'Search performed',
      contentType: 'search',
      activityCategory: 'search',
      metadata: {
        resultCount,
        level: `query-length:${queryLength}`,
        source: 'built-in'
      }
    });
  }, [queryLength, resultCount]);

  return null;
}
