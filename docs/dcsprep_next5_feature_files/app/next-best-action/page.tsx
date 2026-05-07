"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { modules } from '../../src/data/modules';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';
import { getNextBestAction, getWeakAreaSignals } from '../../src/lib/weakAreaEngine';

export default function NextBestActionPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  const signals = getWeakAreaSignals(progress);
  const nextAction = getNextBestAction(progress);
  const topFive = signals.slice(0, 5);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Next-best-action engine</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">What should Josh study next?</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This page ranks weak areas using assessment attempts, due reviews, revisit flags, and available evidence. It
            favours practical DCS support judgement over vague completion percentages.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Recommended now</div>
        <h2 className="mt-3 text-3xl font-semibold">{nextAction.title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200">{nextAction.detail}</p>
        <Link href={nextAction.href} className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900">
          {nextAction.ctaLabel}
        </Link>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Top weak-area signals</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {topFive.map((signal) => (
            <article key={signal.topic} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Priority {Math.round(signal.priorityScore)} / 100</div>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{signal.label}</h3>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">{signal.evidenceCount} evidence</div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-700">{signal.dcsWhyItMatters}</p>

              <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">Why it is ranking here</div>
                <ul className="mt-2 space-y-1">
                  {signal.reasons.map((reason) => (
                    <li key={reason}>- {reason}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">Practice prompt</div>
                <p className="mt-2">{signal.practicePrompt}</p>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                <span className="font-semibold text-slate-900">Boundary:</span> {signal.safeBoundary}
              </p>

              <Link href={signal.recommendedHref} className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
                Open recommended module
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
