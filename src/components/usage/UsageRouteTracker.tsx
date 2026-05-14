"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useUsagePageView } from '../../hooks/useUsageTracking';

function routeLabel(pathname: string) {
  if (pathname === '/') return 'Dashboard';
  return pathname
    .split('/')
    .filter(Boolean)
    .map((part) => part.replace(/-/g, ' '))
    .join(' / ');
}

export default function UsageRouteTracker() {
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const searchKey = searchParams?.toString() ?? '';
  const route = useMemo(() => (searchKey ? `${pathname}?${searchKey}` : pathname), [pathname, searchKey]);

  useUsagePageView({
    route,
    label: routeLabel(pathname)
  });

  return null;
}
