"use client";

import { useMemo, useState } from 'react';
import { privacyWordingExamples } from '../../src/data/supportCoach';
import { reviewPrivacyWording } from '../../src/lib/privacyWording';

export default function PrivacyWordingPage() {
  const [draft, setDraft] = useState('Sarah Smith in Year 8 cannot log in and thinks her password is wrong.');
  const review = useMemo(() => reviewPrivacyWording(draft), [draft]);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Privacy-safe wording trainer</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Rewrite support notes safely</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Practise turning messy notes into professional, manager-safe wording. This is a local rule-based trainer,
            not an AI call, and it should still avoid real DCS private details.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Messy note</h2>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="mt-4 min-h-56 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-900"
          />
          <p className="mt-3 text-xs leading-6 text-slate-500">
            Do not paste live ticket details, student names, parent names, credentials, IP addresses, or confidential procedures.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-slate-900">Safer version</h2>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${
              review.riskLevel === 'high'
                ? 'bg-red-100 text-red-800'
                : review.riskLevel === 'medium'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {review.riskLevel} risk
            </span>
          </div>

          <div className="mt-4 rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-800">{review.saferDraft}</div>

          <div className="mt-5 rounded-3xl border border-slate-200 p-4">
            <div className="font-semibold text-slate-900">Warnings</div>
            {review.warnings.length ? (
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {review.warnings.map((warning) => <li key={warning}>- {warning}</li>)}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-600">No obvious privacy warning from the local rule set.</p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Examples</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {privacyWordingExamples.map((example) => (
            <article key={example.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">{example.title}</h3>
              <div className="mt-3 rounded-2xl bg-red-50 p-4 text-sm text-red-950">
                <div className="font-semibold">Risky</div>
                <p className="mt-1">{example.unsafe}</p>
              </div>
              <div className="mt-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-950">
                <div className="font-semibold">Safer</div>
                <p className="mt-1">{example.safer}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{example.why}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
