"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { modules } from '../src/data/modules';
import { getDashboardRecommendation, getCurrentWeakFocus } from '../src/lib/readinessMath';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../src/lib/progress';
import { isDue } from '../src/lib/spacedRepetition';
import { getOverallProgress } from '../src/lib/moduleMath';
import {
  deriveGamificationState,
  getGamificationSummary,
  getInitialGamificationState,
  loadGamificationState,
  saveGamificationState,
  type GamificationState
} from '../src/lib/gamification';
import { DailyChallenge } from '../src/components/DailyChallenge';
import { StickersDisplay } from '../src/components/StickersDisplay';
import { showNotification } from '../src/lib/notifications';
import { ScheduleSuggestions } from '../src/components/ScheduleSuggestions';
import { RecentChanges } from '../src/components/RecentChanges';

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));
  const [gamificationState, setGamificationState] = useState<GamificationState>(() => getInitialGamificationState());

  const dueFlashcards = modules.flatMap((module) =>
    Object.values(progress.modules[module.id]?.flashcards || {}).filter(
      (card) => card.reviewCount > 0 && isDue(card.dueDateIso)
    )
  ).length;
  const dueQuestions = progress.assessmentAttempts.filter((attempt) => isDue(attempt.nextReviewDateIso)).length;

  useEffect(() => {
    const storedProgress = getStoredProgressSnapshot(modules);
    const derivedGamificationState = deriveGamificationState(storedProgress, modules, loadGamificationState());

    setProgress(storedProgress);
    setGamificationState(derivedGamificationState);
    saveGamificationState(derivedGamificationState);

    // Check for due items and notify
    const totalDue = dueFlashcards + dueQuestions;
    if (totalDue > 0) {
      showNotification('PD Review Due', {
        body: `You have ${totalDue} items waiting for review today.`,
        tag: 'pd-review-due'
      });
    }
  }, [dueFlashcards, dueQuestions]);

  const completedScenarios = progress.scenarioRuns.filter((run) => run.completed).length;
  const monthlyMinutes = progress.pdLogEntries
    .filter((entry) => entry.date.startsWith(getMonthKey(new Date())))
    .reduce((sum, entry) => sum + entry.minutes, 0);
  const recommendation = getDashboardRecommendation(progress);
  const overallProgress = getOverallProgress(modules, progress);
  const weakestFocus = getCurrentWeakFocus(progress);
  const gamificationSummary = getGamificationSummary(progress, modules, gamificationState);
  const recentBadges = gamificationSummary.badges.filter((badge) => badge.earned).slice(0, 4);
  const quietWindowActions = [
    {
      label: 'Micro-learning card (single module drill)',
      description: 'Jump into modules and finish one flashcard stack or quiz subsection.',
      href: '/modules'
    },
    {
      label: 'Start tiny: 5-minute task',
      description: 'Clear one due item without opening a full study block.',
      href: '/due-today?mode=tiny'
    },
    {
      label: '20-minute focus block',
      description: 'Use the main guided study block for one bounded session.',
      href: recommendation.ctaHref
    },
    {
      label: 'Review due flashcards',
      description: 'Go straight to flashcards and question reviews waiting today.',
      href: '/due-today'
    },
    {
      label: 'Do one scenario step',
      description: 'Practice one troubleshooting decision in Scenario Lab.',
      href: '/scenarios'
    },
    {
      label: 'Log PD',
      description: 'Record a quiet-window study block or reflection before you switch tasks.',
      href: '/pd-log'
    }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Today&apos;s quiet-window PD</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Quiet-window dashboard for short DCS IT study blocks
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Use this page when there is genuine breathing room between live support tasks. It keeps the next
              study action small, clear, and aligned with weak areas, due review, and practical DCS IT support work.
            </p>
            <div className="mt-5 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
              Tickets, walk-ups, calls, and Paul&apos;s instructions come first.
            </div>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="rounded-[2rem] bg-slate-100 p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">What should I study next?</div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">{recommendation.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">{recommendation.detail}</p>
              <div className="mt-4 rounded-3xl bg-white px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Weak area driving this</div>
                <div className="mt-2 text-sm font-medium text-slate-900">{weakestFocus}</div>
              </div>
              <Link
                href={recommendation.ctaHref}
                className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
              >
                {recommendation.ctaLabel}
              </Link>
            </div>
            <ScheduleSuggestions />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Current weak focus area</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{weakestFocus}</div>
          <p className="mt-2 text-sm text-slate-600">Use this to choose the next quiet-window study block.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Overall progress</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{Math.round(overallProgress)}%</div>
          <p className="mt-2 text-sm text-slate-600">Across modules, flashcards, practical outputs, and assessment sessions.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Due today</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{dueFlashcards + dueQuestions}</div>
          <p className="mt-2 text-sm text-slate-600">{dueFlashcards} flashcards and {dueQuestions} question reviews are waiting.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">This month&apos;s logged PD</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{monthlyMinutes} min</div>
          <p className="mt-2 text-sm text-slate-600">{completedScenarios} scenario exercises recorded so far.</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Personal progression</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Points, streaks, and DCS task badges</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              Progress is earned from module milestones, scenario work, PD logging, assessment attempts, and practical
              outputs. Badge dates are saved locally on this device.
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-lg">
            <div className="rounded-3xl bg-slate-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Points</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{gamificationSummary.points}</div>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Streak</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{gamificationSummary.studyStreakDays} day</div>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Badges</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{gamificationSummary.completedBadgeCount}</div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {(recentBadges.length > 0 ? recentBadges : gamificationSummary.badges.slice(0, 4)).map((badge) => (
            <div
              key={badge.id}
              className={`rounded-3xl border px-4 py-4 ${
                badge.earned ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className={`text-xs font-semibold uppercase tracking-[0.16em] ${badge.earned ? 'text-emerald-700' : 'text-slate-500'}`}>
                {badge.earned ? 'Earned' : 'Next badge'}
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-900">{badge.title}</div>
              <p className="mt-2 text-xs leading-6 text-slate-600">{badge.description}</p>
            </div>
          ))}
        </div>

        <StickersDisplay stickers={gamificationSummary.stickers} />

        <div className="mt-4 text-xs font-medium text-slate-500">Next milestone: {gamificationSummary.nextMilestone}</div>
      </section>

      <DailyChallenge />

      <RecentChanges />

      <section className="rounded-[2rem] border border-rose-100 bg-rose-50 p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">I&apos;m overwhelmed mode</div>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">Three tiny moves when everything feels loud</h2>
        <p className="mt-2 text-sm leading-7 text-slate-700">
          Pick one action only. Live support still wins—this is for micro pockets between interruptions.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <Link
            href="/due-today?mode=tiny"
            className="rounded-3xl border border-rose-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm"
          >
            Clear one due review (tiny)
          </Link>
          <Link
            href="/pd-log"
            className="rounded-3xl border border-rose-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm"
          >
            Log a 5-minute reflection
          </Link>
          <Link
            href="/modules"
            className="rounded-3xl border border-rose-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm"
          >
            Open modules—pick the shortest card
          </Link>
        </div>
      </section>

      <DailyChallenge />

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Quiet-window quick actions</h2>
            <p className="mt-2 text-sm text-slate-600">
              Keep the next action bounded. These buttons are designed for short quiet windows, not open-ended browsing.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {quietWindowActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 transition hover:bg-slate-100"
            >
              <div className="text-sm font-medium text-slate-800">{action.label}</div>
              <p className="mt-2 text-xs leading-6 text-slate-600">{action.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Operational priority</div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-emerald-900">
          Use this application only during available time that does not conflict with live support responsibilities.
          Tickets, walk-ups, calls, and Paul&apos;s instructions take priority over professional development. This app is
          for personal development only and should never contain sensitive DCS, student, staff, parent, credential,
          or network detail.
        </p>
      </section>
    </div>
  );
}
