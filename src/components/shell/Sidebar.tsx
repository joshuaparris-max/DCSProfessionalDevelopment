'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationGroups } from './navigation';
import { useSelectedWorkContext } from '../../hooks/useWorkContext';

export default function Sidebar() {
  const pathname = usePathname();
  const selectedWorkContext = useSelectedWorkContext();

  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <nav className="space-y-8 text-sm text-slate-700" aria-label="Main Navigation">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <div className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {group.label}
            </div>
            <div className="mt-3 space-y-1">
              {group.items.filter((item) => !item.workContext || item.workContext === selectedWorkContext).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-2xl px-4 py-2.5 transition ${
                      isActive ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
