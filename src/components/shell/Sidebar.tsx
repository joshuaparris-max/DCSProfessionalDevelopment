import Link from 'next/link';

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
  { href: '/settings', label: 'Settings' }
];

export default function Sidebar() {
  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Navigation</div>
      <nav className="mt-5 space-y-3 text-sm text-slate-700">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-3xl px-4 py-3 transition hover:bg-slate-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
