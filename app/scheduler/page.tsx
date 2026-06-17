"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { mspThirtyDayPlan } from '../../src/data/mspTransition';
import { trackUsageInteraction } from '../../src/hooks/useUsageTracking';
import { useMspModeEnabled } from '../../src/hooks/useWorkContext';
import {
  type BlockLogDraft,
  type EnergyLevel,
  type EvidenceOutputType,
  type InterruptionType,
  type ResumeDecision,
  useScheduler
} from '../../src/hooks/useScheduler';

function formatClock(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function formatDuration(seconds: number | null) {
  if (seconds === null) {
    return 'Not scheduled';
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m ${String(remainingSeconds).padStart(2, '0')}s`;
  }
  return `${minutes}m ${String(remainingSeconds).padStart(2, '0')}s`;
}

function activityTone(type?: string) {
  if (type === 'break') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-950';
  }
  if (type === 'warm-up' || type === 'reset') {
    return 'border-violet-200 bg-violet-50 text-violet-950';
  }
  if (type === 'video') {
    return 'border-sky-200 bg-sky-50 text-sky-950';
  }
  if (type === 'retrieval' || type === 'brain-dump') {
    return 'border-indigo-200 bg-indigo-50 text-indigo-950';
  }
  if (type === 'building' || type === 'writing') {
    return 'border-amber-200 bg-amber-50 text-amber-950';
  }
  return 'border-slate-200 bg-white text-slate-900';
}

function schedulerActivityCategory(type?: string) {
  if (type === 'video') return 'video';
  if (type === 'application') return 'scenario';
  if (type === 'retrieval' || type === 'brain-dump' || type === 'warm-up') return 'retrieval';
  if (type === 'writing') return 'writing';
  if (type === 'building') return 'building';
  if (type === 'reset' || type === 'break') return 'scheduler';
  return 'scheduler';
}

const energyOptions: Array<{ id: EnergyLevel; label: string; description: string }> = [
  { id: 'sharp', label: 'Sharp', description: 'Messer video, notes, quiz, then application.' },
  { id: 'okay', label: 'Okay', description: 'Module, quiz, and one practical output.' },
  { id: 'scattered', label: 'Scattered', description: 'Flashcards, short scenario, ticket note.' },
  { id: 'tired', label: 'Tired', description: 'Support-tool refinement, easy review, walk.' },
  { id: 'overloaded', label: 'Overloaded', description: '10-minute reset and one tiny PD log entry.' }
];

const interruptionOptions: InterruptionType[] = [
  '5 min walk-up',
  '20 min ticket',
  'major issue',
  'Paul / DCS priority task'
];

const resumeOptions: Array<{ id: ResumeDecision; label: string }> = [
  { id: 'continue', label: 'Continue' },
  { id: 'shorten', label: 'Shorten' },
  { id: 'switch', label: 'Switch' }
];

const evidenceOptions: EvidenceOutputType[] = [
  '3-bullet summary',
  'ticket-note example',
  'flashcard',
  'checklist item',
  'PD log sentence',
  'practical output'
];

function truncate140(value: string) {
  return value.slice(0, 140);
}

export default function SchedulerPage() {
  const scheduler = useScheduler();
  const mspModeEnabled = useMspModeEnabled();
  const currentActivity = scheduler.currentActivity;
  const currentActivityId = currentActivity?.id ?? null;
  const currentActivityOutput = currentActivity?.guardrail.output ?? null;
  const [mounted, setMounted] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [whyOpen, setWhyOpen] = useState(true);
  const [evidenceType, setEvidenceType] = useState<EvidenceOutputType>('3-bullet summary');
  const [evidenceText, setEvidenceText] = useState('');
  const [evidenceSaved, setEvidenceSaved] = useState(false);
  const trackedActivityRef = useRef<string | null>(null);
  const [blockLog, setBlockLog] = useState<BlockLogDraft>({
    workedOn: '',
    explainWithoutNotes: '',
    gap: ''
  });

  const logComplete =
    blockLog.workedOn.trim().length > 0 &&
    blockLog.explainWithoutNotes.trim().length > 0 &&
    blockLog.gap.trim().length > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!currentActivityOutput) {
      return;
    }

    setEvidenceType(currentActivityOutput);
    setEvidenceText('');
    setEvidenceSaved(false);
  }, [currentActivityId, currentActivityOutput]);

  useEffect(() => {
    if (!mounted || !currentActivity || trackedActivityRef.current === currentActivity.id) {
      return;
    }

    trackedActivityRef.current = currentActivity.id;
    trackUsageInteraction({
      eventType: currentActivity.type === 'break' ? 'scheduler_activity_completed' : 'scheduler_activity_started',
      route: '/scheduler',
      label: currentActivity.title,
      contentType: 'scheduler',
      contentId: currentActivity.id,
      activityCategory: schedulerActivityCategory(currentActivity.type),
      durationSeconds: currentActivity.durationMinutes * 60,
      completed: false,
      metadata: { source: 'built-in' }
    });
  }, [currentActivity, mounted]);

  function saveEvidence() {
    if (!scheduler.currentActivity || !evidenceText.trim()) {
      return;
    }

    const key = `dcsprep-scheduler-evidence:${scheduler.currentActivity.id}`;
    window.localStorage.setItem(
      key,
      JSON.stringify({
        activityId: scheduler.currentActivity.id,
        activityTitle: scheduler.currentActivity.title,
        evidenceType,
        evidenceText: truncate140(evidenceText),
        savedAtIso: new Date().toISOString()
      })
    );
    trackUsageInteraction({
      eventType: 'scheduler_activity_completed',
      route: '/scheduler',
      label: scheduler.currentActivity.title,
      contentType: 'scheduler',
      contentId: scheduler.currentActivity.id,
      activityCategory: schedulerActivityCategory(scheduler.currentActivity.type),
      completed: true,
      metadata: { source: 'built-in' }
    });
    setEvidenceSaved(true);
  }

  function submitLog() {
    if (scheduler.saveBlockEndLog(blockLog)) {
      setBlockLog({ workedOn: '', explainWithoutNotes: '', gap: '' });
    }
  }

  if (!mounted) {
    return (
      <div className="space-y-6 pb-24">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">PD Scheduler</div>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Loading real-time plan</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            The scheduler uses the client system clock, so the live plan appears after the page has mounted.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <button
        type="button"
        onClick={() => {
          trackUsageInteraction({
            eventType: 'interruption_started',
            route: '/scheduler',
            label: 'Live support interrupted me',
            contentType: 'scheduler',
            activityCategory: 'interruption',
            metadata: { source: 'built-in' }
          });
          scheduler.startInterruption();
        }}
        className="fixed bottom-5 right-5 z-30 rounded-full bg-rose-700 px-5 py-3 text-sm font-semibold text-white shadow-lg"
      >
        Live support interrupted me
      </button>

      {scheduler.resumeNote ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 p-4">
          <section className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Re-entry note</div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Read this before restarting</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5 md:col-span-2">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Interruption type</div>
                <p className="mt-2 text-sm leading-7 text-slate-800">{scheduler.resumeNote.type}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Last action</div>
                <p className="mt-2 text-sm leading-7 text-slate-800">{scheduler.resumeNote.lastAction || 'Not recorded'}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Next action</div>
                <p className="mt-2 text-sm leading-7 text-slate-800">{scheduler.resumeNote.nextAction || 'Not recorded'}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 md:col-span-2">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Continue, shorten, or switch?</div>
                <p className="mt-2 text-sm leading-7 text-slate-800 capitalize">{scheduler.resumeNote.resumeDecision}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Re-entry reset - 3 minutes: name what you were doing, choose the next smallest step, then continue,
              shorten, or switch. This protects attention after context switching.
            </p>
            <button
              type="button"
              onClick={() => {
                trackUsageInteraction({
                  eventType: 'interruption_resolved',
                  route: '/scheduler',
                  label: scheduler.resumeNote?.type,
                  contentType: 'scheduler',
                  activityCategory: 'interruption',
                  completed: true,
                  metadata: { interruptionType: scheduler.resumeNote?.type, source: 'built-in' }
                });
                scheduler.acknowledgeResumeNote();
              }}
              className="mt-5 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
            >
              Restart schedule
            </button>
          </section>
        </div>
      ) : null}

      {scheduler.isInterrupted ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 p-4">
          <section className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">Schedule paused</div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Capture the re-entry point</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Keep this short. The aim is to lower the cost of returning after a walk-up, ticket, or supervisor task.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {interruptionOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => scheduler.updateInterruptionDraft('type', option)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    scheduler.interruptionDraft.type === option
                      ? 'border-rose-700 bg-rose-700 text-white'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-slate-900">
                Last action
                <textarea
                  value={scheduler.interruptionDraft.lastAction}
                  onChange={(event) => scheduler.updateInterruptionDraft('lastAction', event.target.value)}
                  className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-800"
                  placeholder="What were you doing?"
                />
              </label>
              <label className="text-sm font-semibold text-slate-900">
                Next action
                <textarea
                  value={scheduler.interruptionDraft.nextAction}
                  onChange={(event) => scheduler.updateInterruptionDraft('nextAction', event.target.value)}
                  className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-800"
                  placeholder="What should you do first on return?"
                />
              </label>
            </div>
            <div className="mt-5 rounded-3xl bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">On return, should the plan continue, shorten, or switch?</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {resumeOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => scheduler.updateInterruptionDraft('resumeDecision', option.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      scheduler.interruptionDraft.resumeDecision === option.id
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scheduler.saveInterruption}
                disabled={!scheduler.interruptionDraft.type}
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700"
              >
                Save note
              </button>
              <button
                type="button"
                onClick={scheduler.resumeFromInterruption}
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
              >
                Resume
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {scheduler.blockEndLogRequired && scheduler.blockEndLogBlock ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 p-4">
          <section className="w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Block-end PD log</div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Complete this before closing {scheduler.blockEndLogBlock.name}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Required reflection converts the block into evidence and retrieval. Keep each field under 140 characters.
            </p>
            <div className="mt-5 grid gap-4">
              {[
                ['workedOn', 'What I worked on'],
                ['explainWithoutNotes', 'What I can explain without notes'],
                ['gap', 'One gap']
              ].map(([field, label]) => (
                <label key={field} className="text-sm font-semibold text-slate-900">
                  {label}
                  <input
                    value={blockLog[field as keyof BlockLogDraft]}
                    onChange={(event) =>
                      setBlockLog((current) => ({
                        ...current,
                        [field]: truncate140(event.target.value)
                      }))
                    }
                    maxLength={140}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-800"
                  />
                  <span className="mt-1 block text-xs font-normal text-slate-500">
                    {blockLog[field as keyof BlockLogDraft].length}/140
                  </span>
                </label>
              ))}
            </div>
            <button
              type="button"
              disabled={!logComplete}
              onClick={submitLog}
              className="mt-5 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save block log
            </button>
          </section>
        </div>
      ) : null}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              PD Scheduler
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              What to study right now
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Real-time Thursday/Friday PD coaching using spacing, retrieval, interleaving, movement breaks,
              interruption recovery, and DCS-safe evidence writing.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Live clock
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {formatClock(scheduler.now)}
            </div>
          </div>
        </div>
      </section>

      {mspModeEnabled ? (
        <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-sm dark:border-blue-900/60 dark:bg-blue-950/40">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
                Avance MSP transition
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
                Use quiet windows to prepare for MSP support desk work
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                Prioritise ticket-note quality, client communication, M365 identity/access, endpoint triage,
                backup alerts, and clean escalation. Keep DCS examples as privacy-safe transferable evidence.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {mspThirtyDayPlan.map((block) => (
                  <div
                    key={block.label}
                    className="rounded-2xl border border-blue-100 bg-white/80 p-4 dark:border-blue-900/60 dark:bg-slate-900/70"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
                      {block.label}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{block.focus}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/msp-transition"
              className="inline-flex shrink-0 items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-[#dbeafe] dark:text-[#020617] dark:hover:bg-[#bfdbfe]"
            >
              Open MSP plan
            </Link>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="text-sm text-slate-500 dark:text-slate-400">Current block</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {scheduler.activeBlock ? scheduler.activeBlock.name : 'No active PD block'}
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {scheduler.activeBlock
              ? `${formatTime(scheduler.activeBlock.startDate)}-${formatTime(scheduler.activeBlock.endDate)}`
              : scheduler.nextBlock
              ? `Next: ${scheduler.nextBlock.name} at ${formatTime(scheduler.nextBlock.startDate)}`
              : 'No upcoming block found.'}
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {scheduler.activeBlock ? 'Time remaining in block' : 'Countdown to next block'}
          </div>
          <div className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {scheduler.activeBlock
              ? formatDuration(scheduler.timeRemainingInBlockSeconds)
              : formatDuration(scheduler.countdownToNextBlockSeconds)}
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {scheduler.flashcardOnlyMode
              ? 'Resumed with fewer than 30 minutes remaining: flashcard-only recovery mode is active.'
              : 'The plan updates from the real system clock every second.'}
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="text-sm text-slate-500 dark:text-slate-400">Current Core 2 context</div>
          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{scheduler.settings.studyContext.coreProgress}</p>
          <Link href="/settings" className="mt-4 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 dark:border-slate-600 dark:text-slate-200">
            Edit scheduler settings
          </Link>
        </div>
      </section>

      {scheduler.shouldShowEnergySelector ? (
        <section className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">Block-start state check</div>
          <h2 className="mt-3 text-2xl font-semibold text-indigo-950">How are you right now?</h2>
          <p className="mt-2 text-sm leading-7 text-indigo-900">
            This adapts the plan to current capacity without turning the scheduler into a rigid timer.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {energyOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  trackUsageInteraction({
                    eventType: 'section_view',
                    route: '/scheduler',
                    label: `Energy check: ${option.label}`,
                    contentType: 'scheduler',
                    activityCategory: 'scheduler',
                    metadata: { level: option.id, source: 'built-in' }
                  });
                  scheduler.setEnergy(option.id);
                }}
                className="rounded-3xl border border-indigo-200 bg-white px-5 py-4 text-left text-sm text-indigo-950"
              >
                <span className="block font-semibold">{option.label}</span>
                <span className="mt-2 block text-xs leading-5 text-indigo-900">{option.description}</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {scheduler.midpointBreakCountdownSeconds !== null && scheduler.midpointBreak ? (
        <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Break approaching</div>
          <h2 className="mt-3 text-2xl font-semibold text-emerald-950">
            Protected recovery break in {formatDuration(scheduler.midpointBreakCountdownSeconds)}
          </h2>
          <p className="mt-2 text-sm leading-7 text-emerald-900">
            {scheduler.midpointBreak.durationMinutes} minutes: {scheduler.midpointBreak.description}
          </p>
        </section>
      ) : null}

      <section className={`rounded-[2rem] border p-6 shadow-sm ${activityTone(scheduler.currentActivity?.type)}`}>
        <div className="text-sm font-semibold uppercase tracking-[0.2em] opacity-70">Now</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight">
          {scheduler.currentActivity ? scheduler.currentActivity.title : scheduler.activeBlock ? 'Waiting for next activity' : 'No active PD block'}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7">
          {scheduler.currentActivity
            ? scheduler.currentActivity.description
            : scheduler.nextBlock
            ? `Next PD block starts at ${formatTime(scheduler.nextBlock.startDate)}. Countdown: ${formatDuration(
                scheduler.countdownToNextBlockSeconds
              )}.`
            : 'No scheduled PD block is available.'}
        </p>
        {scheduler.currentActivity ? (
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-3xl bg-white/70 p-4 text-sm">
              <div className="font-semibold">Duration</div>
              <div className="mt-1">{scheduler.currentActivity.durationMinutes} min</div>
            </div>
            <div className="rounded-3xl bg-white/70 p-4 text-sm">
              <div className="font-semibold">Ends</div>
              <div className="mt-1">{formatTime(scheduler.currentActivity.end)}</div>
            </div>
            <div className="rounded-3xl bg-white/70 p-4 text-sm">
              <div className="font-semibold">Source</div>
              <div className="mt-1">{scheduler.currentActivity.source}</div>
            </div>
          </div>
        ) : null}
        {scheduler.currentActivity ? (
          <div className="mt-5 rounded-3xl bg-white/70 p-5 text-sm leading-7">
            <span className="font-semibold">Evidence-based reason:</span> {scheduler.currentActivity.reason}
          </div>
        ) : null}
        {scheduler.currentActivity ? (
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-3xl bg-white/70 p-4 text-sm">
              <div className="font-semibold">Primary source</div>
              <div className="mt-1">{scheduler.currentActivity.guardrail.primarySource}</div>
            </div>
            <div className="rounded-3xl bg-white/70 p-4 text-sm">
              <div className="font-semibold">Reinforcement</div>
              <div className="mt-1">{scheduler.currentActivity.guardrail.reinforcementSource}</div>
            </div>
            <div className="rounded-3xl bg-white/70 p-4 text-sm">
              <div className="font-semibold">Output</div>
              <div className="mt-1">{scheduler.currentActivity.guardrail.output}</div>
            </div>
          </div>
        ) : null}
        {scheduler.currentActivity ? (
          <div className="mt-5 rounded-3xl bg-white/70 p-5 text-sm leading-7">
            <div className="font-semibold">Also valid</div>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {scheduler.currentActivity.alternatives.map((alternative) => (
                <li key={alternative}>{alternative}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      {scheduler.currentActivity ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setWhyOpen((current) => !current)}
            className="flex w-full items-center justify-between text-left"
          >
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Why this now?
              </span>
              <span className="mt-2 block text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Learning-science rationale
              </span>
            </span>
            <span className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 dark:border-slate-600 dark:text-slate-200">
              {whyOpen ? 'Hide' : 'Show'}
            </span>
          </button>
          {whyOpen ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                ['Learning principle', scheduler.currentActivity.rationale.learningPrinciple],
                ['Why now', scheduler.currentActivity.rationale.whyNow],
                ['DCS value', scheduler.currentActivity.rationale.dcsValue],
                ['Evidence output', scheduler.currentActivity.rationale.evidenceOutput],
                ['Recovery need', scheduler.currentActivity.rationale.recoveryReason],
                ['If interrupted', scheduler.currentActivity.rationale.interruptionAdvice]
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{label}</div>
                  <div className="mt-2">{value}</div>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {scheduler.currentActivity ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Activity evidence capture
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">Finish with one tiny output</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            This turns study into manager-safe evidence. Keep it privacy-safe and under 140 characters.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-[240px_1fr_auto]">
            <label className="text-sm text-slate-700 dark:text-slate-300">
              Output type
              <select
                value={evidenceType}
                onChange={(event) => setEvidenceType(event.target.value as EvidenceOutputType)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              >
                {evidenceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slate-700 dark:text-slate-300">
              Evidence sentence
              <input
                value={evidenceText}
                onChange={(event) => {
                  setEvidenceText(truncate140(event.target.value));
                  setEvidenceSaved(false);
                }}
                maxLength={140}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                placeholder="Example: Added one Windows Settings checklist item for support notes."
              />
              <span className="mt-1 block text-xs text-slate-500">{evidenceText.length}/140</span>
            </label>
            <button
              type="button"
              onClick={saveEvidence}
              disabled={!evidenceText.trim()}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 md:self-start md:mt-7"
            >
              {evidenceSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </section>
      ) : null}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Next</div>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {scheduler.nextActivity ? scheduler.nextActivity.title : 'No next activity inside this block'}
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {scheduler.nextActivity
            ? `${formatTime(scheduler.nextActivity.start)}-${formatTime(scheduler.nextActivity.end)} - ${scheduler.nextActivity.rationale.whyNow}`
            : 'When the block ends, complete the required 3-field PD log prompt.'}
        </p>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setPlanOpen((current) => !current)}
          className="flex w-full items-center justify-between text-left"
        >
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Remaining block plan
            </span>
            <span className="mt-2 block text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {scheduler.remainingActivities.length} activities remaining
            </span>
          </span>
          <span className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 dark:border-slate-600 dark:text-slate-200">
            {planOpen ? 'Hide' : 'Show'}
          </span>
        </button>

        {planOpen ? (
          <div className="mt-5 space-y-3">
            {scheduler.remainingActivities.length ? (
              scheduler.remainingActivities.map((activity) => (
                <article key={activity.id} className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {activity.type} {activity.required ? '- required' : ''}
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{activity.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{activity.description}</p>
                    </div>
                    <div className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                      {formatTime(activity.start)}-{formatTime(activity.end)}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                No active plan to show.
              </div>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}
