"use client";

import { useEffect, useRef } from 'react';
import type { UsageActivityCategory, UsageEvent } from '../types/usageAnalytics';
import {
  categoryForRoute,
  contentTypeForRoute,
  eventTypeForRoute,
  recordUsageEvent
} from '../lib/usageAnalytics';

export function useUsagePageView(options: {
  route: string;
  label?: string;
  contentType?: UsageEvent['contentType'];
  contentId?: string;
  activityCategory?: UsageActivityCategory;
  metadata?: UsageEvent['metadata'];
}): void {
  const startRef = useRef<number | null>(null);
  const routeRef = useRef<string | null>(null);
  const { route, label, contentType, contentId, activityCategory, metadata } = options;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const now = Date.now();
    startRef.current = now;
    routeRef.current = route;

    recordUsageEvent({
      eventType: eventTypeForRoute(route),
      route,
      label,
      contentType: contentType ?? contentTypeForRoute(route),
      contentId,
      activityCategory: activityCategory ?? categoryForRoute(route),
      metadata
    });

    return () => {
      const startedAt = startRef.current;
      const trackedRoute = routeRef.current;
      if (!startedAt || !trackedRoute) {
        return;
      }

      const durationSeconds = Math.round((Date.now() - startedAt) / 1000);
      if (durationSeconds < 2) {
        return;
      }

      recordUsageEvent({
        eventType: 'section_view',
        route: trackedRoute,
        label,
        contentType: contentType ?? contentTypeForRoute(trackedRoute),
        contentId,
        activityCategory: activityCategory ?? categoryForRoute(trackedRoute),
        durationSeconds,
        completed: true,
        metadata
      });
    };
  }, [
    activityCategory,
    contentId,
    contentType,
    label,
    metadata,
    route
  ]);
}

export function trackUsageInteraction(event: Omit<UsageEvent, 'id' | 'timestamp'>): void {
  recordUsageEvent(event);
}
