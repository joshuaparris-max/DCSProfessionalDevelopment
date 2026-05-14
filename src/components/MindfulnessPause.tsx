"use client";

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'dcsPrepMindfulnessPauseOptOut';

type MindfulnessPauseProps = {
  onComplete?: () => void;
};

export function MindfulnessPause({ onComplete }: MindfulnessPauseProps) {
  const [active, setActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [completed, setCompleted] = useState(false);
  const [optOut, setOptOut] = useState(false);

  // DCS Priority Check: "Tickets, walk-ups, calls, and Paul’s instructions come first."
  const dcsPriorityReminder = "Operational Priority: If a walk-up or call arrives, STOP this pause immediately and resume support.";

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    setOptOut(stored === 'true');
  }, []);

  useEffect(() => {
    if (!active) {
      return;
    }

    if (secondsLeft === 0) {
      setActive(false);
      setCompleted(true);
      onComplete?.();
      return;
    }

    const timer = window.setTimeout(() => setSecondsLeft((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [active, secondsLeft, onComplete]);

  function handleStart() {
    setCompleted(false);
    setSecondsLeft(60);
    setActive(true);
  }

  function handleOptOut() {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    }
    setOptOut(true);
  }

  if (optOut) {
    return (
      <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Mindfulness pause</div>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Short mindfulness prompts are hidden. You can re-enable them by clearing the app&apos;s browser storage.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Mindfulness pause</div>
          <p className="mt-2 text-sm leading-7 text-emerald-900">
            Take a short one-minute breathing break to refresh focus before or after your scenario work.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOptOut}
          className="text-sm font-semibold text-emerald-700 underline"
        >
          Don’t show again
        </button>
      </div>

      {active ? (
        <div className="mt-5 grid gap-4 rounded-3xl bg-white p-5 text-center text-slate-900">
          <div className="text-5xl font-semibold">{secondsLeft}s</div>
          <p className="text-sm font-bold text-rose-600 mb-2">{dcsPriorityReminder}</p>
          <p className="text-sm leading-6 text-slate-700">
            {secondsLeft > 45 ? 'Breathe in for 4 seconds...' : 
             secondsLeft > 30 ? 'Notice tension in your shoulders and jaw—let it go as you breathe out.' :
             secondsLeft > 15 ? 'Breathe in for 4 seconds, hold for 4, out for 6.' :
             'Almost done. Notice your feet on the floor and take one final deep breath.'}
          </p>
        </div>
      ) : completed ? (
        <div className="mt-5 rounded-3xl bg-white p-5 text-slate-800">
          <div className="text-sm font-semibold text-slate-900">Pause complete</div>
          <p className="mt-3 text-sm leading-7">
            You finished a one-minute focus reset. Continue your scenario or restart the pause if you&apos;d like more calm.
          </p>
          <button
            type="button"
            onClick={handleStart}
            className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Start another pause
          </button>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-7 text-slate-700">
            Mindfulness breaks help reduce screen fatigue and keep decision-making clearer.
          </p>
          <button
            type="button"
            onClick={handleStart}
            className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Start 1-minute pause
          </button>
        </div>
      )}
    </div>
  );
}
