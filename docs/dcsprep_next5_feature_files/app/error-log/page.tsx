"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { weakTopicLabels } from '../../src/data/skillDomains';
import { weakTopicCoaching } from '../../src/data/supportCoach';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';

type ErrorGroup = {
  key: keyof typeof weakTopicLabels;
  label: string;
  attempts: UserProgress['assessmentAttempts'];
};

export default function ErrorLogPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
  }, []);

  const groups: ErrorGroup[] = (Object.entries(weakTopicLabels) as [keyof typeof weakTopicLabels, string][]).map(([key, label]) => ({
    key,
    label,
    attempts: progress.assessmentAttempts
      .filter((attempt) => attempt.weakTopic === key && (attempt.shouldRevisit || attempt.scoreBreakdown.total < 0.85))
      .slice(0, 5)
  }));

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Error log</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Review recurring errors and weak areas
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This error log now explains why each weak area matters at DCS, gives a next practice action, and links back
            to the best module or workflow instead of just showing wrong answers.
          </p>
        </div>
      </section>

      <div className="space-y-5">
        {groups.map((group) => {
          const coaching = weakTopicCoaching[group.key];

          return (
            <section key={group.key} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{group.label}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">{coaching.dcsWhyItMatters}</p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
                    <span className="font-semibold text-slate-900">Next practice:</span> {coaching.nextBestAction}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                    {group.attempts.length} logged
                  </div>
                  <Link href={coaching.recommendedHref} className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
                    Open module
                  </Link>
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
                <span className="font-semibold">Safe boundary:</span> {coaching.safeBoundary}
              </div>

              <div className="mt-5 space-y-4">
                {group.attempts.length ? (
                  group.attempts.map((attempt) => (
                    <div key={attempt.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <div className="text-sm font-semibold text-slate-900">{attempt.prompt}</div>
                      <div className="mt-3 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">Recorded answer:</span> {attempt.answerSummary}
                      </div>
                      <div className="mt-2 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">Corrected concept:</span>{' '}
                        {attempt.feedback.correctedConcept}
                      </div>
                      <div className="mt-2 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">Why it matters at DCS:</span>{' '}
                        {coaching.dcsWhyItMatters}
                      </div>
                      <div className="mt-2 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">Next review:</span> {attempt.nextReviewDateIso}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          href={`/modules/${attempt.recommendedModuleId}`}
                          className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                        >
                          Open recommended module
                        </Link>
                        <Link
                          href={`/strict-quiz?topic=${attempt.weakTopic}`}
                          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                        >
                          Practise again
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
                    No active error entries for this topic yet. Use the practice prompt: {coaching.practicePrompt}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
