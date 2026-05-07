"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { modules } from '../../src/data/modules';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';

export default function AssessmentFeedbackPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  const sortedAttempts = [...progress.assessmentAttempts].sort(
    (a, b) => new Date(b.id).getTime() - new Date(a.id).getTime()
  );

  const groupedByDomain = sortedAttempts.reduce(
    (acc, attempt) => {
      if (!acc[attempt.domain]) {
        acc[attempt.domain] = [];
      }
      acc[attempt.domain].push(attempt);
      return acc;
    },
    {} as Record<string, typeof sortedAttempts>
  );

  const domains = Object.keys(groupedByDomain).sort();

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Assessment feedback</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">All assessment feedback</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Review feedback from all your completed assessments in one place. Each correction helps build stronger understanding.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            Total attempts: <span className="font-semibold text-slate-900">{sortedAttempts.length}</span>
          </div>
        </div>
      </section>

      {sortedAttempts.length === 0 ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-center">
            <p className="text-sm text-slate-600">No assessment feedback yet. Complete some assessments to see feedback here.</p>
            <Link
              href="/strict-quiz"
              className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
            >
              Start assessment
            </Link>
          </div>
        </section>
      ) : (
        domains.map((domain) => {
          const attempts = groupedByDomain[domain];
          const avgScore = Math.round((attempts.reduce((sum, a) => sum + a.scoreBreakdown.total, 0) / attempts.length) * 100);

          return (
            <section key={domain} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{domain}</h2>
                  <p className="mt-2 text-sm text-slate-600">{attempts.length} assessments completed</p>
                </div>
                <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
                  Avg score: <span className="font-semibold text-slate-900">{avgScore}%</span>
                </div>
              </div>

              <div className="space-y-4">
                {attempts.map((attempt) => {
                  const attemptDate = new Date(attempt.id);
                  const formattedDate = attemptDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div key={attempt.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-900">{attempt.prompt}</div>
                          <div className="mt-3 space-y-3">
                            <div>
                              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                                Corrected concept
                              </div>
                              <p className="mt-1 text-sm text-slate-800">{attempt.feedback.correctedConcept}</p>
                            </div>

                            {attempt.shouldRevisit && (
                              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">
                                  Marked for revisit
                                </div>
                                <p className="mt-1 text-sm text-amber-900">
                                  Return to this concept soon to strengthen understanding.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="rounded-2xl bg-slate-100 px-3 py-2 text-center">
                            <div className="text-xs text-slate-600">Score</div>
                            <div className="text-lg font-semibold text-slate-900">
                              {Math.round(attempt.scoreBreakdown.total * 100)}%
                            </div>
                          </div>
                          <div className="text-xs text-slate-500">{formattedDate}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href={`/modules/${attempt.recommendedModuleId}`}
                          className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700"
                        >
                          Review module
                        </Link>
                        <Link
                          href={`/strict-quiz?topic=${attempt.weakTopic}`}
                          className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700"
                        >
                          Retake assessment
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
