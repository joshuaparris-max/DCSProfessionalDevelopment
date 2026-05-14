"use client";

import Link from 'next/link';

type ChangeItem = {
  date: string;
  title: string;
  description: string;
  testLabel: string;
  testHref: string;
  category: 'Feature' | 'Content' | 'Fix' | 'Security';
};

const RECENT_CHANGES: ChangeItem[] = [
  {
    date: '2026-05-14',
    title: 'New Content Modules',
    description: 'Added Microsoft Intune, Cybersecurity (NIST 800-61), and ITIL Foundations.',
    testLabel: 'Explore Modules',
    testHref: '/modules',
    category: 'Content'
  },
  {
    date: '2026-05-14',
    title: 'Focus Mode & Layout Shell',
    description: 'A distraction-free mode for intense study sessions.',
    testLabel: 'Try Focus Mode',
    testHref: '/',
    category: 'Feature'
  },
  {
    date: '2026-05-14',
    title: 'Reflection Journal',
    description: 'Track your emotional state and takeaways after troubleshooting scenarios.',
    testLabel: 'Run a Scenario',
    testHref: '/scenarios',
    category: 'Feature'
  },
  {
    date: '2026-05-14',
    title: 'Team Challenges & Social',
    description: 'Collaborate with peers in weekly team-based PD goals.',
    testLabel: 'View Teams',
    testHref: '/team-challenges',
    category: 'Feature'
  },
  {
    date: '2026-05-14',
    title: 'Micro-rewards & Stickers',
    description: 'Earn digital stickers for empathy, NIST awareness, and more.',
    testLabel: 'See My Stickers',
    testHref: '/',
    category: 'Feature'
  }
];

export function RecentChanges() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Release Notes</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Recent Updates</h2>
        </div>
      </div>

      <div className="space-y-4">
        {RECENT_CHANGES.map((change, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  change.category === 'Feature' ? 'bg-blue-100 text-blue-700' :
                  change.category === 'Content' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-slate-200 text-slate-700'
                }`}>
                  {change.category}
                </span>
                <span className="text-xs text-slate-400">{change.date}</span>
              </div>
              <h3 className="font-semibold text-slate-900">{change.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{change.description}</p>
            </div>
            <Link
              href={change.testHref}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              {change.testLabel}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
