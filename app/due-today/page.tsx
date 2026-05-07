"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { weakTopicLabels } from '../../src/data/skillDomains';
import { modules } from '../../src/data/modules';
import {
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  recordFlashcardReview,
  recordPracticalOutputReview,
  saveProgress,
  type UserProgress
} from '../../src/lib/progress';
import { getDueReviewItems } from '../../src/lib/dueReview';
import { isDue, type ReviewRating } from '../../src/lib/spacedRepetition';

const ratings: ReviewRating[] = ['again', 'hard', 'good', 'easy'];

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function leitnerHint(reviewCount: number) {
  if (reviewCount <= 1) return 'Leitner bucket: Box 1 — first exposures';
  if (reviewCount <= 3) return 'Leitner bucket: Box 2 — early reinforcement';
  if (reviewCount <= 6) return 'Leitner bucket: Box 3 — settling recall';
  if (reviewCount <= 10) return 'Leitner bucket: Box 4 — stronger retention';
  return 'Leitner bucket: Box 5 — maintenance polish';
}

function PomodoroPanel() {
  const focusSeconds = 25 * 60;
  const [remaining, setRemaining] = useState(focusSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || remaining <= 0) {
      return undefined;
    }
    const id = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, remaining]);

  useEffect(() => {
    if (remaining <= 0) {
      setRunning(false);
    }
  }, [remaining]);

  return (
    <section className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Pomodoro study timer</div>
          <div className="mt-2 text-4xl font-semibold text-indigo-950">{formatClock(remaining)}</div>
          <p className="mt-2 text-sm leading-7 text-indigo-900">
            Single-task focus window. Pause between classroom duties—do not run timers during live escalations.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setRunning((current) => !current)}
            className="rounded-full bg-indigo-900 px-5 py-2 text-sm font-semibold text-white"
          >
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setRemaining(focusSeconds);
            }}
            className="rounded-full border border-indigo-200 bg-white px-5 py-2 text-sm font-semibold text-indigo-900"
          >
            Reset 25:00
          </button>
        </div>
      </div>
    </section>
  );
}

export default function DueTodayPage({ searchParams }: { searchParams?: { mode?: string | string[] } }) {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});

  const mode = Array.isArray(searchParams?.mode) ? searchParams.mode[0] : searchParams?.mode;
  const tinyMode = mode === 'tiny';

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
    setHasHydratedProgress(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    saveProgress(progress);
  }, [hasHydratedProgress, progress]);

  const dueFlashcards = modules.flatMap((module) =>
    module.flashcards
      .filter((card) => {
        const flashcardProgress = progress.modules[module.id]?.flashcards?.[card.id];
        return Boolean(flashcardProgress && flashcardProgress.reviewCount > 0 && isDue(flashcardProgress.dueDateIso));
      })
      .map((card) => ({
        moduleId: module.id,
        moduleTitle: module.title,
        card
      }))
  );

  const latestAttemptsByQuestion = new Map<string, (typeof progress.assessmentAttempts)[number]>();
  progress.assessmentAttempts.forEach((attempt) => {
    if (!latestAttemptsByQuestion.has(attempt.questionId)) {
      latestAttemptsByQuestion.set(attempt.questionId, attempt);
    }
  });

  const dueQuestions = [...latestAttemptsByQuestion.values()].filter((attempt) => isDue(attempt.nextReviewDateIso));
  const dueWeakTopics = Object.values(progress.weakTopicReviews).filter((review) => isDue(review.dueDateIso));
  const dueReviewItems = getDueReviewItems(progress);
  const dueScenarioNotes = dueReviewItems.filter((item) => item.type === 'scenario-note');
  const duePracticalOutputs = dueReviewItems.filter((item) => item.type === 'practical-output');

  const firstDueFlashcard = dueFlashcards[0];
  const firstDueQuestion = dueQuestions[0];
  const firstDueWeakTopic = dueWeakTopics[0];

  const tinyFocusItem = tinyMode
    ? firstDueFlashcard
      ? { kind: 'flashcard' as const, payload: firstDueFlashcard }
      : firstDueQuestion
      ? { kind: 'question' as const, payload: firstDueQuestion }
      : firstDueWeakTopic
      ? { kind: 'weakTopic' as const, payload: firstDueWeakTopic }
      : null
    : null;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Due today</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Complete scheduled review items
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Flashcards, missed questions, and weak topics all stay local in the browser. Use this page to clear
            one review queue at a time.
          </p>
        </div>
      </section>

      {!tinyMode ? <PomodoroPanel /> : null}

      {tinyMode ? (
        <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-900">
              Tiny mode: one short review
            </div>
            <p className="text-sm leading-7 text-slate-700">
              This session is limited to a single due item so you can make progress without opening a full study block.
            </p>
            {tinyFocusItem ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {tinyFocusItem.kind === 'flashcard'
                    ? 'First due flashcard'
                    : tinyFocusItem.kind === 'question'
                    ? 'First due assessment review'
                    : 'First due weak topic'}
                </div>
                <div className="mt-3 text-lg font-semibold text-slate-900">
                  {tinyFocusItem.kind === 'flashcard'
                    ? tinyFocusItem.payload.card.front
                    : tinyFocusItem.kind === 'question'
                    ? tinyFocusItem.payload.prompt
                    : weakTopicLabels[tinyFocusItem.payload.topic]}
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {tinyFocusItem.kind === 'flashcard'
                    ? 'Reveal and rate this flashcard first to complete the quick session.'
                    : tinyFocusItem.kind === 'question'
                    ? 'Review this missed assessment question and use the links below to retake or revisit the related module.'
                    : 'Practice this weak topic now to keep the session brief and focused.'}
                </p>
                {tinyFocusItem.kind !== 'flashcard' ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={
                        tinyFocusItem.kind === 'question'
                          ? `/strict-quiz?topic=${tinyFocusItem.payload.weakTopic}`
                          : `/strict-quiz?topic=${tinyFocusItem.payload.topic}`
                      }
                      className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                    >
                      Start review
                    </Link>
                    <Link
                      href={
                        tinyFocusItem.kind === 'question'
                          ? `/modules/${tinyFocusItem.payload.recommendedModuleId}`
                          : `/modules/${tinyFocusItem.payload.recommendedModuleId}`
                      }
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                    >
                      Open module
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 text-sm text-slate-700">
                No review items are due yet. Close this quick session and return when the next item appears.
              </div>
            )}
            <div className="text-sm text-slate-600">
              Want to see the full queue? <Link href="/due-today" className="font-semibold text-slate-900">Open the full due list</Link>.
            </div>
          </div>
        </section>
      ) : null}

      {!tinyMode && (
        <>
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">Flashcards due today</h2>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{dueFlashcards.length} due</div>
            </div>

        <div className="mt-5 space-y-4">
          {dueFlashcards.length ? (
            dueFlashcards.map(({ moduleId, moduleTitle, card }) => {
              const revealKey = `${moduleId}-${card.id}`;
              const revealed = Boolean(revealedCards[revealKey]);

              return (
                <div key={revealKey} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{moduleTitle}</div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    {leitnerHint(progress.modules[moduleId]?.flashcards?.[card.id]?.reviewCount ?? 0)}
                  </div>
                  <div className="mt-3 text-xl font-semibold text-slate-900">{revealed ? card.back : card.front}</div>
                  <button
                    onClick={() =>
                      setRevealedCards((current) => ({
                        ...current,
                        [revealKey]: !current[revealKey]
                      }))
                    }
                    className="mt-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                  >
                    {revealed ? 'Show prompt' : 'Reveal answer'}
                  </button>
                  <div className="mt-4 grid gap-3 md:grid-cols-4">
                    {ratings.map((rating) => (
                      <button
                        key={rating}
                        onClick={() =>
                          setProgress((current) => recordFlashcardReview(current, moduleId, card.id, rating))
                        }
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium capitalize text-slate-800"
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">No flashcards are due right now.</div>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Missed questions due</h2>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{dueQuestions.length} due</div>
        </div>

        <div className="mt-5 space-y-4">
          {dueQuestions.length ? (
            dueQuestions.map((attempt) => (
              <div key={attempt.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{attempt.domain}</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">{attempt.prompt}</div>
                <div className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Your answer:</span> {attempt.answerSummary}
                </div>
                <div className="mt-2 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Corrected concept:</span>{' '}
                  {attempt.feedback.correctedConcept}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/strict-quiz?topic=${attempt.weakTopic}`}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                  >
                    Retake assessment
                  </Link>
                  <Link
                    href={`/modules/${attempt.recommendedModuleId}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                  >
                    Open module
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">No assessment reviews are due right now.</div>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Weak topics due</h2>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{dueWeakTopics.length} due</div>
        </div>

        <div className="mt-5 space-y-4">
          {dueWeakTopics.length ? (
            dueWeakTopics.map((review) => (
              <div key={review.topic} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-lg font-semibold text-slate-900">{weakTopicLabels[review.topic]}</div>
                <div className="mt-2 text-sm text-slate-700">
                  Average recent score {Math.round(review.averageScore)}%. Next review {review.dueDateIso}.
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/strict-quiz?topic=${review.topic}`}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                  >
                    Retake assessment
                  </Link>
                  <Link
                    href={`/modules/${review.recommendedModuleId}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                  >
                    Recommended module
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">No weak-topic reviews are due right now.</div>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Scenario note reviews due</h2>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{dueScenarioNotes.length} due</div>
        </div>
        <div className="mt-5 space-y-4">
          {dueScenarioNotes.length ? (
            dueScenarioNotes.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.moduleTitle}</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">{item.prompt}</div>
                <div className="mt-3 text-sm text-slate-700">Due: {item.dueDateIso}</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/scenarios" className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
                    Re-run scenario
                  </Link>
                  {item.moduleId ? (
                    <Link
                      href={`/modules/${item.moduleId}`}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                    >
                      Open module
                    </Link>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
              No scenario-note reviews are due right now.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Practical outputs due</h2>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{duePracticalOutputs.length} due</div>
        </div>
        <div className="mt-5 space-y-4">
          {duePracticalOutputs.length ? (
            duePracticalOutputs.map((item) => {
              const outputId = item.id.split(':')[2] ?? '';
              return (
                <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.moduleTitle}</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">{item.prompt}</div>
                  <div className="mt-3 text-sm text-slate-700">Due: {item.dueDateIso}</div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/modules/${item.moduleId}`}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                    >
                      Open module
                    </Link>
                    <button
                      onClick={() =>
                        setProgress((current) => recordPracticalOutputReview(current, item.moduleId, outputId, true))
                      }
                      className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                    >
                      Mark reviewed
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
              No practical-output reviews are due right now.
            </div>
          )}
        </div>
      </section>
    </>
      )}
    </div>
  );
}
