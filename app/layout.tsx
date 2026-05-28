import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import Topbar from '../src/components/shell/Topbar';
import Sidebar from '../src/components/shell/Sidebar';
import UsageRouteTracker from '../src/components/usage/UsageRouteTracker';
import ServiceWorkerRegistration from '../src/components/pwa/ServiceWorkerRegistration';
import { AuthProvider } from '../src/contexts/AuthContext';
import { UIProvider } from '../src/contexts/UIContext';
import { LayoutShell } from '../src/components/shell/LayoutShell';

export const metadata: Metadata = {
  title: 'SupportOps Career Lab',
  description: 'A local-first IT career development dashboard for support operations and professional growth.',
  manifest: '/manifest.webmanifest'
};

export const viewport: Viewport = {
  themeColor: '#0f172a'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <UIProvider>
            <LayoutShell>
              {children}
            </LayoutShell>
            <Suspense fallback={null}>
              <UsageRouteTracker />
            </Suspense>
            <ServiceWorkerRegistration />
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
