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
    dashboardRecommendation: { title: string; detail: string; ctaHref: string; ctaLabel: string; careerTrack?: string; attributeFocus?: string }
  ) => {
    const contextLabel = workContext ? ` aligned to ${workContext}` : '';

    if (dueFlashcards > 0 || dueQuestions > 0) {
      return {
        title: "Clear Today's Reviews",
        detail: `You have ${dueFlashcards + dueQuestions} items due for retrieval practice${contextLabel}.`,
        ctaLabel: 'Review Now',
        ctaHref: '/due-today',
        category: 'Confidence Builder',
        careerTrack: 'Support Fundamentals',
        attributeFocus: 'Intelligence'
      };
    }

    return {
      title: dashboardRecommendation.title,
      detail: `${dashboardRecommendation.detail}${contextLabel}`,
      ctaLabel: dashboardRecommendation.ctaLabel,
      ctaHref: dashboardRecommendation.ctaHref,
      category: 'Focus Recommendation',
      careerTrack: dashboardRecommendation.careerTrack,
      attributeFocus: dashboardRecommendation.attributeFocus
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
  const quickActions = [
    {
      label: '5-minute review',
      description: 'Clear due flashcards and quick retrieval items.',
      href: '/due-today?mode=tiny'
    },
    {
      label: '10-minute mission',
      description: 'Complete one practical troubleshooting scenario.',
      href: '/scenarios'
    },
    {
      label: '20-minute focus block',
      description: 'Use a timed study block for a deep learning session.',
      href: dashboardRecommendation.ctaHref
    },
    {
      label: 'Log PD Evidence',
      description: 'Record your learning and build your career pack.',
      href: '/pd-log'
    }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">SupportOps Career Lab</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Today</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Welcome to your IT training cockpit. Complete missions to build practical support skills across M365, 
              endpoint troubleshooting, and networking fundamentals.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Path</div>
                <div className="text-sm font-bold text-slate-900">{selectedWorkContext}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Readiness</div>
                <div className="text-sm font-bold text-slate-900">{overallProgress}%</div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md">
            <div className="rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300 mb-4">{nextAction.category}</div>
                  {nextAction.attributeFocus && (
                    <div className="text-[10px] bg-white/10 px-2 py-1 rounded-md text-indigo-200 font-bold uppercase tracking-widest">
                      +{nextAction.attributeFocus}
                    </div>
                  )}
                </div>
                <h2 className="text-3xl font-bold leading-tight">Start next mission:</h2>
                <h3 className="mt-2 text-xl font-medium text-slate-300">{nextAction.title}</h3>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">{nextAction.detail}</p>
                
                {nextAction.careerTrack && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Track: {nextAction.careerTrack}
                  </div>
                )}

                <Link
                  href={nextAction.ctaHref}
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-900 shadow-lg hover:bg-slate-50 transition-all active:scale-95"
                >
                  <span>{nextAction.ctaLabel}</span>
                  <span className="text-xs">⚔️</span>
                </Link>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] text-[150px] opacity-10 select-none pointer-events-none group-hover:scale-110 transition-transform duration-700">
                🚀
              </div>
            </div>
          </div>
        </div>
      </section>

      <RPGDashboard summary={gamificationSummary} />

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Quick Actions</h3>
            <span className="text-[10px] bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">XP MULTIPLIER ACTIVE</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="group flex flex-col justify-between rounded-[2rem] border border-slate-100 bg-slate-50 p-6 transition hover:border-blue-200 hover:bg-blue-50/30"
              >
                <div>
                  <div className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{action.label}</div>
                  <div className="mt-2 text-xs text-slate-500 leading-relaxed">{action.description}</div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Start Mission</span>
                  <span className="text-slate-300 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <FocusForest state={gamificationState} onStateChange={setGamificationState} />
          
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm overflow-hidden relative">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Next Unlock</h3>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                🎁
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{gamificationSummary.nextMilestone}</div>
                <div className="mt-1 text-xs text-slate-500">Work towards your next badge or level milestone.</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-1000" 
                  style={{ width: `${(gamificationSummary.xpInCurrentLevel / gamificationSummary.xpNeededForNextLevel) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                {gamificationSummary.xpNeededForNextLevel - gamificationSummary.xpInCurrentLevel} XP REMAINING
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Career Progress</h3>
            <Link href="/progress" className="text-xs font-bold text-indigo-600 hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {[
              { label: 'MSP L1 Support', progress: overallProgress },
              { label: 'M365 Admin', progress: Math.min(100, (gamificationSummary.attributes.intelligence / 200) * 100) },
              { label: 'Networking', progress: Math.min(100, (gamificationSummary.attributes.agility / 200) * 100) }
            ].map(track => (
              <div key={track.label}>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>{track.label}</span>
                  <span>{Math.round(track.progress)}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full bg-slate-900 transition-all duration-700" 
                    style={{ width: `${track.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Quiet Window Support</h3>
          <p className="text-sm text-slate-600 leading-relaxed italic">
            &quot;Feeling low energy? Try a 5-minute review or log a quick reflection. Small steps build long-term momentum.&quot;
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/due-today?mode=tiny" className="rounded-full bg-slate-50 border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all">
              5-Min Task ⏱️
            </Link>
            <Link href="/pd-log" className="rounded-full bg-slate-50 border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all">
              Log Reflection ✍️
            </Link>
            <Link href="/knowledge-base-lab" className="rounded-full bg-slate-50 border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all">
              Draft SOP 📝
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
