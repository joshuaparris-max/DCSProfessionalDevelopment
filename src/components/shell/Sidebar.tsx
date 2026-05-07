'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/modules', label: 'Modules' },
  { href: '/academic-pd', label: 'Academic PD' },
  { href: '/search', label: 'Search' },
  { href: '/scenarios', label: 'Scenario Lab' },
  { href: '/due-today', label: 'Due Today' },
  { href: '/progress', label: 'Progress' },
  { href: '/readiness', label: 'Readiness' },
  { href: '/pd-log', label: 'PD Log' },
  { href: '/evidence-pack', label: 'Evidence Pack' },
  { href: '/error-log', label: 'Error Log' },
  { href: '/support-tools', label: 'Support Tools' },
  { href: '/settings', label: 'Settings' }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Navigation</div>
      <nav className="mt-5 space-y-3 text-sm text-slate-700">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-3xl px-4 py-3 transition ${
                isActive ? 'bg-slate-200 font-medium' : 'hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
