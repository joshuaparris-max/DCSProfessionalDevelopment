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
import { RPGDashboard } from '../src/components/RPGDashboard';
import { FocusForest } from '../src/components/FocusForest';

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

  const selectedWorkContext = progress.selectedWorkContext;
  const dashboardRecommendation = getDashboardRecommendation(progress);

  const getNextBestAction = (
    workContext: string,
    dashboardRecommendation: { title: string; detail: string; ctaHref: string; ctaLabel: string }
  ) => {
    const contextLabel = workContext ? ` aligned to ${workContext}` : '';

    if (dueFlashcards > 0 || dueQuestions > 0) {
      return {
        title: "Clear Today's Reviews",
        detail: `You have ${dueFlashcards + dueQuestions} items due for retrieval practice${contextLabel}.`,
        ctaLabel: 'Review Now',
        ctaHref: '/due-today',
        category: 'Confidence Builder'
      };
    }

    return {
      title: dashboardRecommendation.title,
      detail: `${dashboardRecommendation.detail}${contextLabel}`,
      ctaLabel: dashboardRecommendation.ctaLabel,
      ctaHref: dashboardRecommendation.ctaHref,
      category: 'Focus Recommendation'
    };
  };

  const nextAction = getNextBestAction(selectedWorkContext, dashboardRecommendation);

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
  const overallProgress = Math.round(getOverallProgress(modules, progress));
  const currentWeakestFocus = getCurrentWeakFocus(progress);
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
      href: dashboardRecommendation.ctaHref
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
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{selectedWorkContext} profile</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Your IT career growth dashboard</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Track your growth in IT support, MSP operations, M365, endpoint and networking practice, and professional service delivery.
              Use this app to build privacy-safe evidence, scenario judgement, and career-ready readiness in a local-first workflow.
            </p>
            <Link
              href="/settings"
              className="mt-5 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Change profile
            </Link>
          </div>
          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="rounded-[2rem] bg-slate-100 p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{nextAction.category}</div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">{nextAction.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">{nextAction.detail}</p>
              <Link
                href={nextAction.ctaHref}
                className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm text-white font-semibold"
              >
                {nextAction.ctaLabel}
              </Link>
            </div>
            <ScheduleSuggestions />
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Active Quest</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{dashboardRecommendation.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              {dashboardRecommendation.detail}
              {selectedWorkContext ? ` This quest is tailored for your ${selectedWorkContext} path.` : ''}
            </p>
          </div>
          <Link
            href={dashboardRecommendation.ctaHref}
            className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-all active:scale-95"
          >
            {dashboardRecommendation.ctaLabel} ⚔️
          </Link>
        </div>
      </section>

      <RPGDashboard summary={gamificationSummary} />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Available Side Missions</h3>
            <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">BONUS XP</span>
          </div>
          <div className="grid gap-3">
            {quietWindowActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="group flex items-start justify-between rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
              >
                <div className="max-w-[80%]">
                  <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{action.label}</div>
                  <div className="mt-1 text-xs text-slate-500 leading-relaxed">{action.description}</div>
                </div>
                <div className="text-slate-300 group-hover:text-slate-600 transition-colors">→</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <FocusForest state={gamificationState} onStateChange={setGamificationState} />
          <DailyChallenge />
          <StickersDisplay stickers={gamificationSummary.stickers} />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Recent Achievements</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {recentBadges.length > 0 ? (
              recentBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-4 rounded-3xl border border-slate-100 p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                    🏆
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{badge.title}</div>
                    <div className="text-[10px] text-slate-500">{new Date(badge.awardedAtIso!).toLocaleDateString()}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 py-8 text-center text-sm text-slate-400 italic">
                No badges earned yet. Complete your first quest!
              </div>
            )}
          </div>
          <Link 
            href="/progress" 
            className="mt-6 block text-center text-xs font-semibold text-indigo-600 hover:underline"
          >
            View all badges and history
          </Link>
        </div>
        <RecentChanges />
      </div>
    </div>
  );
}
