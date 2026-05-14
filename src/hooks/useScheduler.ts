"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';

export type EnergyLevel = 'sharp' | 'okay' | 'scattered' | 'tired' | 'overloaded';
export type InterruptionType = '5 min walk-up' | '20 min ticket' | 'major issue' | 'Paul / DCS priority task';
export type ResumeDecision = 'continue' | 'shorten' | 'switch';
export type EvidenceOutputType =
  | '3-bullet summary'
  | 'ticket-note example'
  | 'flashcard'
  | 'checklist item'
  | 'PD log sentence'
  | 'practical output';

export type ActivityType =
  | 'video'
  | 'application'
  | 'retrieval'
  | 'writing'
  | 'building'
  | 'break'
  | 'brain-dump'
  | 'warm-up'
  | 'reset';

export type SchedulerBlockTemplate = {
  id: string;
  day: 4 | 5;
  dayLabel: 'Thursday' | 'Friday';
  blockLabel: string;
  start: string;
  end: string;
};

export type SchedulerStudyContext = {
  coreProgress: string;
  primaryVideoSource: string;
  flashcardSource: string;
  applicationTasks: string;
  buildingTasks: string;
  writingTasks: string;
  breakActivities: string;
};

export type SchedulerSettings = {
  blocks: SchedulerBlockTemplate[];
  studyContext: SchedulerStudyContext;
};

export type ActivityRationale = {
  learningPrinciple: string;
  whyNow: string;
  dcsValue: string;
  evidenceOutput: string;
  recoveryReason: string;
  interruptionAdvice: string;
};

export type SourceGuardrail = {
  primarySource: string;
  reinforcementSource: string;
  output: EvidenceOutputType;
};

export type SchedulerActivity = {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  reason: string;
  source: string;
  start: Date;
  end: Date;
  durationMinutes: number;
  required?: boolean;
  rationale: ActivityRationale;
  alternatives: string[];
  guardrail: SourceGuardrail;
};

export type SchedulerBlock = SchedulerBlockTemplate & {
  name: string;
  startDate: Date;
  endDate: Date;
  durationMinutes: number;
};

export type InterruptionNote = {
  type: InterruptionType;
  lastAction: string;
  nextAction: string;
  resumeDecision: ResumeDecision;
  savedAtIso: string;
};

export type BlockLogDraft = {
  workedOn: string;
  explainWithoutNotes: string;
  gap: string;
};

export type SchedulerState = {
  now: Date;
  settings: SchedulerSettings;
  activeBlock: SchedulerBlock | null;
  nextBlock: SchedulerBlock | null;
  timeRemainingInBlockSeconds: number;
  countdownToNextBlockSeconds: number | null;
  plan: SchedulerActivity[];
  currentActivity: SchedulerActivity | null;
  nextActivity: SchedulerActivity | null;
  remainingActivities: SchedulerActivity[];
  energy: EnergyLevel | null;
  shouldShowEnergySelector: boolean;
  isInterrupted: boolean;
  interruptionNote: InterruptionNote | null;
  resumeNote: InterruptionNote | null;
  flashcardOnlyMode: boolean;
  blockEndLogRequired: boolean;
  blockEndLogBlock: SchedulerBlock | null;
  midpointBreak: SchedulerActivity | null;
  midpointBreakCountdownSeconds: number | null;
  interruptionDraft: {
    type: InterruptionType | null;
    lastAction: string;
    nextAction: string;
    resumeDecision: ResumeDecision;
  };
  setEnergy: (level: EnergyLevel) => void;
  startInterruption: () => void;
  updateInterruptionDraft: (
    field: 'type' | 'lastAction' | 'nextAction' | 'resumeDecision',
    value: string
  ) => void;
  saveInterruption: () => void;
  resumeFromInterruption: () => void;
  acknowledgeResumeNote: () => void;
  saveBlockEndLog: (draft: BlockLogDraft) => boolean;
};

export const SCHEDULER_SETTINGS_KEY = 'dcsprep-scheduler-settings';
const SCHEDULER_SESSION_PREFIX = 'dcsprep-scheduler-session';

export const defaultSchedulerSettings: SchedulerSettings = {
  blocks: [
    { id: 'thu-1', day: 4, dayLabel: 'Thursday', blockLabel: 'Block 1', start: '08:30', end: '10:55' },
    { id: 'thu-2', day: 4, dayLabel: 'Thursday', blockLabel: 'Block 2', start: '11:25', end: '13:05' },
    { id: 'thu-3', day: 4, dayLabel: 'Thursday', blockLabel: 'Block 3', start: '13:45', end: '16:20' },
    { id: 'fri-1', day: 5, dayLabel: 'Friday', blockLabel: 'Block 1', start: '08:30', end: '11:05' },
    { id: 'fri-2', day: 5, dayLabel: 'Friday', blockLabel: 'Block 2', start: '11:35', end: '13:05' },
    { id: 'fri-3', day: 5, dayLabel: 'Friday', blockLabel: 'Block 3', start: '13:45', end: '16:20' }
  ],
  studyContext: {
    coreProgress:
      'CompTIA A+ Core 2 in progress - currently at Section 1.6 Windows Settings, ~10 hours of Messer content remaining',
    primaryVideoSource: 'Professor Messer on YouTube',
    flashcardSource: 'DCSPrep internal deck at /due-today',
    applicationTasks: 'DCSPrep scenarios at /scenarios',
    buildingTasks: 'DCSPrep app itself and new scenario/content authoring',
    writingTasks: 'Ticket templates, runbooks, PD log entries, Evidence Pack entries',
    breakActivities: 'Walk outside, water, brief outdoor exposure'
  }
};

function safeReadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function loadSchedulerSettings(): SchedulerSettings {
  const stored = safeReadJson<Partial<SchedulerSettings>>(SCHEDULER_SETTINGS_KEY, defaultSchedulerSettings);
  return {
    blocks: Array.isArray(stored.blocks) && stored.blocks.length ? stored.blocks : defaultSchedulerSettings.blocks,
    studyContext: {
      ...defaultSchedulerSettings.studyContext,
      ...(stored.studyContext ?? {})
    }
  };
}

export function saveSchedulerSettings(settings: SchedulerSettings) {
  writeJson(SCHEDULER_SETTINGS_KEY, settings);
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function setTime(base: Date, time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const result = new Date(base);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function diffSeconds(later: Date, earlier: Date) {
  return Math.max(0, Math.floor((later.getTime() - earlier.getTime()) / 1000));
}

function diffMinutes(later: Date, earlier: Date) {
  return Math.max(0, Math.round((later.getTime() - earlier.getTime()) / 60000));
}

function sessionKey(date: Date, blockId: string) {
  return `${SCHEDULER_SESSION_PREFIX}:${dateKey(date)}:${blockId}`;
}

function blockLogKey(date: Date, blockId: string) {
  return `${sessionKey(date, blockId)}:log`;
}

function energyKey(date: Date, blockId: string) {
  return `${sessionKey(date, blockId)}:energy`;
}

function interruptionKey(date: Date, blockId: string) {
  return `${sessionKey(date, blockId)}:interruption`;
}

function blocksForWeek(settings: SchedulerSettings, now: Date): SchedulerBlock[] {
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  return settings.blocks
    .flatMap((template) => {
      const thisWeek = new Date(weekStart);
      thisWeek.setDate(weekStart.getDate() + template.day);
      const nextWeek = new Date(thisWeek);
      nextWeek.setDate(thisWeek.getDate() + 7);

      return [thisWeek, nextWeek].map((baseDate) => {
        const startDate = setTime(baseDate, template.start);
        const endDate = setTime(baseDate, template.end);
        return {
          ...template,
          name: `${template.dayLabel} ${template.blockLabel}`,
          startDate,
          endDate,
          durationMinutes: diffMinutes(endDate, startDate)
        };
      });
    })
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

function latestEndedUnloggedBlock(blocks: SchedulerBlock[], now: Date) {
  return [...blocks]
    .filter((block) => block.endDate <= now)
    .reverse()
    .find((block) => {
      if (block.endDate.getTime() < now.getTime() - 12 * 60 * 60 * 1000) return false;
      if (typeof window === 'undefined') return false;
      return !window.localStorage.getItem(blockLogKey(block.startDate, block.id));
    });
}

function normalizeEnergy(value: string | null): EnergyLevel | null {
  if (!value) return null;
  if (value === 'high') return 'sharp';
  if (value === 'moderate') return 'okay';
  if (value === 'low') return 'tired';
  if (['sharp', 'okay', 'scattered', 'tired', 'overloaded'].includes(value)) {
    return value as EnergyLevel;
  }
  return null;
}

function timeOfDayReason(block: SchedulerBlock, cursor: Date) {
  if (block.blockLabel === 'Block 1') {
    return 'Block 1 is the best time for harder intake because alertness is usually strongest early in the PD day.';
  }
  if (cursor.getHours() >= 15) {
    return 'After 3:00pm, the scheduler favours building, writing, and review over new passive intake.';
  }
  if (cursor.getHours() >= 13 && (cursor.getHours() < 15 || cursor.getMinutes() < 15)) {
    return 'Between 1:45pm and 3:15pm, the post-lunch dip guard starts with active work instead of passive video.';
  }
  return 'This slot is better used for interleaving practice, review, and one concrete output than for staying on one source.';
}

function rationaleFor(
  type: ActivityType,
  block: SchedulerBlock,
  cursor: Date,
  output: EvidenceOutputType
): ActivityRationale {
  const interruptionAdvice =
    'If live support interrupts this, save the last action and next smallest step; on return, continue, shorten, or switch based on time remaining.';

  switch (type) {
    case 'warm-up':
      return {
        learningPrinciple: 'Retrieval practice and generation effect',
        whyNow: 'A 2-5 minute recall warm-up primes the topic before new content or building work.',
        dcsValue: 'It checks what Josh can explain before opening notes, which improves ticket and support confidence.',
        evidenceOutput: output,
        recoveryReason: 'Short recall is low overhead and protects the start of the block from shallow browsing.',
        interruptionAdvice
      };
    case 'video':
      return {
        learningPrinciple: 'Dual coding with bounded intake followed by active recall',
        whyNow: timeOfDayReason(block, cursor),
        dcsValue: 'Messer Core 2 remains the backbone for Windows, security, troubleshooting, and operations knowledge.',
        evidenceOutput: output,
        recoveryReason: 'Video is capped and followed by active work so it does not become passive rewatching.',
        interruptionAdvice
      };
    case 'application':
      return {
        learningPrinciple: 'Interleaving and transfer practice',
        whyNow: timeOfDayReason(block, cursor),
        dcsValue: 'Scenario work turns study into classroom-safe support judgement and escalation wording.',
        evidenceOutput: output,
        recoveryReason: 'Hands-on application is a better fit when attention is less suited to passive intake.',
        interruptionAdvice
      };
    case 'retrieval':
      return {
        learningPrinciple: 'Testing effect and spacing',
        whyNow: timeOfDayReason(block, cursor),
        dcsValue: 'Flashcards and written recall reveal weak points before Josh meets them under live support pressure.',
        evidenceOutput: output,
        recoveryReason: 'Retrieval is compact and resilient if a block is cut short.',
        interruptionAdvice
      };
    case 'writing':
      return {
        learningPrinciple: 'Self-explanation and generation effect',
        whyNow: timeOfDayReason(block, cursor),
        dcsValue: 'Writing produces manager-safe evidence: ticket templates, runbooks, PD log notes, and checklist wording.',
        evidenceOutput: output,
        recoveryReason: 'Writing consolidates learning without adding new input load.',
        interruptionAdvice
      };
    case 'building':
      return {
        learningPrinciple: 'Active production and desirable difficulty',
        whyNow: timeOfDayReason(block, cursor),
        dcsValue: 'Building DCSPrep content creates reusable support assets and strengthens the app itself.',
        evidenceOutput: output,
        recoveryReason: 'Building is concrete and active, making it preferable to passive video in lower-alertness blocks.',
        interruptionAdvice
      };
    case 'brain-dump':
      return {
        learningPrinciple: 'Spaced retrieval after overnight consolidation',
        whyNow: 'Friday Block 1 is the first major retrieval window after Thursday learning.',
        dcsValue: 'The brain-dump shows what can be recalled before notes and highlights what needs repair.',
        evidenceOutput: output,
        recoveryReason: 'It starts the day with recall before new input increases cognitive load.',
        interruptionAdvice
      };
    case 'reset':
      return {
        learningPrinciple: 'Cognitive load reduction and autonomy support',
        whyNow: 'Overloaded mode intentionally narrows the task to one tiny, recoverable action.',
        dcsValue: 'It keeps PD alive without forcing heavy study during poor capacity.',
        evidenceOutput: output,
        recoveryReason: 'The reset protects attention and reduces fatigue rather than pretending capacity is normal.',
        interruptionAdvice
      };
    case 'break':
      return {
        learningPrinciple: 'Protected recovery and fatigue management',
        whyNow: 'Blocks of 90 minutes or more get a midpoint recovery break.',
        dcsValue: 'Recovery helps Josh return to support and study with less fatigue.',
        evidenceOutput: output,
        recoveryReason: 'Walk, water, sunlight, no new input. This protects attention and reduces fatigue without overclaiming performance gains.',
        interruptionAdvice
      };
  }
}

function sourceFor(type: ActivityType, context: SchedulerStudyContext) {
  switch (type) {
    case 'video':
      return context.primaryVideoSource;
    case 'application':
      return context.applicationTasks;
    case 'retrieval':
    case 'warm-up':
    case 'brain-dump':
      return context.flashcardSource;
    case 'building':
      return context.buildingTasks;
    case 'writing':
      return context.writingTasks;
    case 'break':
    case 'reset':
      return context.breakActivities;
  }
}

function outputFor(type: ActivityType): EvidenceOutputType {
  switch (type) {
    case 'video':
      return '3-bullet summary';
    case 'application':
      return 'ticket-note example';
    case 'retrieval':
    case 'warm-up':
    case 'brain-dump':
      return 'flashcard';
    case 'building':
      return 'practical output';
    case 'writing':
      return 'PD log sentence';
    case 'break':
    case 'reset':
      return 'PD log sentence';
  }
}

function activityCopy(type: ActivityType, context: SchedulerStudyContext, block: SchedulerBlock) {
  switch (type) {
    case 'warm-up':
      return {
        title: 'Retrieval warm-up',
        description: 'Before starting, write 3 things remembered from Windows Settings, Control Panel, or command-line tools without looking.'
      };
    case 'video':
      return {
        title: 'CompTIA Messer video intake',
        description: 'Continue Core 2 Section 1.6 Windows Settings or the next short Messer segment.'
      };
    case 'application':
      return {
        title: 'DCSPrep scenario application',
        description: 'Run one DCSPrep scenario and write the first safe action, evidence, and escalation boundary.'
      };
    case 'retrieval':
      return {
        title: 'Retrieval and SRS flashcards',
        description: 'Use due flashcards or written recall before opening notes.'
      };
    case 'writing':
      return {
        title: 'Ticket/runbook writing',
        description: 'Draft a privacy-safe ticket template, runbook note, PD log line, or Evidence Pack entry.'
      };
    case 'building':
      return {
        title: 'DCSPrep building/content authoring',
        description: 'Build or refine a scenario, module, checklist, or support-tool page.'
      };
    case 'brain-dump':
      return {
        title: 'Friday free recall brain-dump',
        description: 'Write everything remembered from Thursday before opening notes or videos.'
      };
    case 'reset':
      return {
        title: '10-minute reset and tiny PD entry',
        description: 'Walk, drink water, then write one privacy-safe PD log sentence or one tiny next step.'
      };
    case 'break':
      return {
        title: 'Protected recovery break',
        description: `${context.breakActivities}. Walk, water, sunlight, no new input.`
      };
  }
}

function makeActivity(
  block: SchedulerBlock,
  context: SchedulerStudyContext,
  id: string,
  type: ActivityType,
  start: Date,
  durationMinutes: number,
  required = false
): SchedulerActivity {
  const copy = activityCopy(type, context, block);
  const output = outputFor(type);
  const rationale = rationaleFor(type, block, start, output);
  const source = sourceFor(type, context);
  const reinforcementSource =
    type === 'video'
      ? 'DCSPrep quiz or flashcards only after the segment'
      : type === 'break'
      ? 'No reinforcement source during recovery'
      : 'Professor Messer only if this exposes a specific gap';

  return {
    id,
    type,
    title: copy.title,
    description: copy.description,
    reason: rationale.whyNow,
    source,
    start,
    end: addMinutes(start, durationMinutes),
    durationMinutes,
    required,
    rationale,
    alternatives:
      type === 'reset'
        ? ['Write one PD log sentence', 'Review one flashcard', 'Take a 10-minute reset walk']
        : ['Review 8 flashcards', 'Write one ticket-note template', 'Do one short scenario step'],
    guardrail: {
      primarySource: source,
      reinforcementSource,
      output
    }
  };
}

function rotateType(
  candidates: ActivityType[],
  previousType: ActivityType | null,
  usedMinutes: Record<ActivityType, number>,
  totalMinutes: number
) {
  return (
    candidates.find((type) => type !== previousType && (usedMinutes[type] ?? 0) < totalMinutes * 0.4) ??
    candidates.find((type) => type !== previousType) ??
    candidates[0]
  );
}

function candidateTypes(block: SchedulerBlock, cursor: Date, energy: EnergyLevel | null, flashcardOnlyMode: boolean) {
  if (flashcardOnlyMode) return ['retrieval'] as ActivityType[];
  if (energy === 'overloaded') return ['reset'] as ActivityType[];
  if (energy === 'tired') return ['building', 'retrieval', 'writing'] as ActivityType[];
  if (energy === 'scattered') return ['retrieval', 'application', 'writing'] as ActivityType[];
  if (energy === 'okay') return ['application', 'retrieval', 'writing', 'video'] as ActivityType[];

  if (cursor.getHours() >= 15 && block.blockLabel === 'Block 3') {
    return ['building', 'writing', 'retrieval'] as ActivityType[];
  }

  // Post-prandial dip guard: between 1:45 and 3:15, do active work before any passive video.
  if (cursor.getHours() === 13 || cursor.getHours() === 14 || (cursor.getHours() === 15 && cursor.getMinutes() < 15)) {
    return ['application', 'building', 'writing', 'retrieval'] as ActivityType[];
  }

  if (block.blockLabel === 'Block 1') return ['video', 'application', 'retrieval', 'writing'] as ActivityType[];
  return ['application', 'retrieval', 'writing', 'video', 'building'] as ActivityType[];
}

function buildPlan(block: SchedulerBlock, context: SchedulerStudyContext, energy: EnergyLevel | null, flashcardOnlyMode: boolean) {
  const activities: SchedulerActivity[] = [];
  const usedMinutes: Record<ActivityType, number> = {
    video: 0,
    application: 0,
    retrieval: 0,
    writing: 0,
    building: 0,
    break: 0,
    'brain-dump': 0,
    'warm-up': 0,
    reset: 0
  };
  let cursor = new Date(block.startDate);
  let previousType: ActivityType | null = null;
  const breakDuration = block.durationMinutes >= 145 ? 10 : block.durationMinutes >= 90 ? 7 : 0;
  const breakStart = breakDuration ? addMinutes(block.startDate, Math.round(block.durationMinutes / 2 - breakDuration / 2)) : null;

  if (energy === 'overloaded') {
    activities.push(makeActivity(block, context, `${block.id}-reset`, 'reset', cursor, 10, true));
    cursor = addMinutes(cursor, 10);
    previousType = 'reset';
  } else if (block.id === 'fri-1') {
    // Friday starts with free recall because the Thursday-to-Friday gap is the week's highest-value spacing event.
    const duration = 15;
    activities.push(makeActivity(block, context, `${block.id}-brain-dump`, 'brain-dump', cursor, duration, true));
    usedMinutes['brain-dump'] += duration;
    cursor = addMinutes(cursor, duration);
    previousType = 'brain-dump';
  } else if (!flashcardOnlyMode) {
    // Retrieval before new content protects against passive intake and supports test-enhanced learning.
    const duration = energy === 'tired' ? 3 : 5;
    activities.push(makeActivity(block, context, `${block.id}-warm-up`, 'warm-up', cursor, duration, true));
    usedMinutes['warm-up'] += duration;
    cursor = addMinutes(cursor, duration);
    previousType = 'warm-up';
  }

  while (cursor < block.endDate) {
    if (breakStart && cursor < breakStart && addMinutes(cursor, 20) > breakStart) cursor = new Date(breakStart);
    if (breakStart && cursor.getTime() === breakStart.getTime()) {
      activities.push(makeActivity(block, context, `${block.id}-break`, 'break', cursor, breakDuration, true));
      usedMinutes.break += breakDuration;
      cursor = addMinutes(cursor, breakDuration);
      previousType = 'break';
      continue;
    }

    const remainingToBlockEnd = diffMinutes(block.endDate, cursor);
    if (remainingToBlockEnd <= 0) break;

    const remainingToBreak = breakStart && cursor < breakStart ? diffMinutes(breakStart, cursor) : remainingToBlockEnd;
    const videoCap = energy === 'okay' ? 25 : 35;
    const overloadedCap = energy === 'overloaded' ? 10 : videoCap;
    const maxSegment = Math.min(overloadedCap, remainingToBreak || remainingToBlockEnd, remainingToBlockEnd);
    const duration = Math.max(Math.min(10, remainingToBlockEnd), Math.min(maxSegment, remainingToBlockEnd));
    const type = rotateType(candidateTypes(block, cursor, energy, flashcardOnlyMode), previousType, usedMinutes, block.durationMinutes);
    activities.push(makeActivity(block, context, `${block.id}-${activities.length}-${type}`, type, cursor, duration));
    usedMinutes[type] += duration;
    previousType = type;
    cursor = addMinutes(cursor, duration);
  }

  return activities.filter((activity) => activity.durationMinutes > 0);
}

export function useScheduler(): SchedulerState {
  const [now, setNow] = useState(() => new Date());
  const [settings, setSettings] = useState<SchedulerSettings>(defaultSchedulerSettings);
  const [energy, setEnergyState] = useState<EnergyLevel | null>(null);
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [interruptionDraft, setInterruptionDraft] = useState<{
    type: InterruptionType | null;
    lastAction: string;
    nextAction: string;
    resumeDecision: ResumeDecision;
  }>({ type: null, lastAction: '', nextAction: '', resumeDecision: 'continue' });
  const [interruptionNote, setInterruptionNote] = useState<InterruptionNote | null>(null);
  const [resumeNote, setResumeNote] = useState<InterruptionNote | null>(null);
  const [flashcardOnlyMode, setFlashcardOnlyMode] = useState(false);

  useEffect(() => {
    setSettings(loadSchedulerSettings());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const allBlocks = useMemo(() => blocksForWeek(settings, now), [settings, now]);
  const activeBlock = allBlocks.find((block) => now >= block.startDate && now < block.endDate) ?? null;
  const activeBlockId = activeBlock?.id ?? null;
  const activeBlockStartTime = activeBlock?.startDate.getTime() ?? null;
  const nextBlock = allBlocks.find((block) => block.startDate > now) ?? null;

  useEffect(() => {
    if (!activeBlockId || activeBlockStartTime === null) {
      setEnergyState(null);
      setInterruptionNote(null);
      setIsInterrupted(false);
      setFlashcardOnlyMode(false);
      return;
    }

    const blockStart = new Date(activeBlockStartTime);
    setEnergyState(normalizeEnergy(window.localStorage.getItem(energyKey(blockStart, activeBlockId))));
    setInterruptionNote(
      safeReadJson<InterruptionNote | null>(interruptionKey(blockStart, activeBlockId), null)
    );
  }, [activeBlockId, activeBlockStartTime]);

  const plan = useMemo(
    () => (activeBlock ? buildPlan(activeBlock, settings.studyContext, energy, flashcardOnlyMode) : []),
    [activeBlock, energy, flashcardOnlyMode, settings.studyContext]
  );

  const currentActivity = plan.find((activity) => now >= activity.start && now < activity.end) ?? null;
  const nextActivity = plan.find((activity) => activity.start > now) ?? null;
  const remainingActivities = plan.filter((activity) => activity.end > now);
  const midpointBreak = plan.find((activity) => activity.type === 'break') ?? null;
  const midpointBreakCountdownSeconds =
    midpointBreak && now < midpointBreak.start && diffSeconds(midpointBreak.start, now) <= 5 * 60
      ? diffSeconds(midpointBreak.start, now)
      : null;
  const isBlockStartWindow = Boolean(activeBlock && diffMinutes(now, activeBlock.startDate) <= 15);
  const blockEndLogBlock = latestEndedUnloggedBlock(allBlocks, now) ?? null;

  const setEnergy = useCallback(
    (level: EnergyLevel) => {
      if (!activeBlock) return;
      setEnergyState(level);
      writeJson(energyKey(activeBlock.startDate, activeBlock.id), level);
    },
    [activeBlock]
  );

  const startInterruption = useCallback(() => {
    setIsInterrupted(true);
    setInterruptionDraft({
      type: null,
      lastAction: currentActivity?.title ?? '',
      nextAction: nextActivity?.title ?? 'Re-entry reset - choose continue, shorten, or switch.',
      resumeDecision: 'continue'
    });
  }, [currentActivity, nextActivity]);

  const updateInterruptionDraft = useCallback(
    (field: 'type' | 'lastAction' | 'nextAction' | 'resumeDecision', value: string) => {
      setInterruptionDraft((current) => ({ ...current, [field]: value }));
    },
    []
  );

  const saveInterruption = useCallback(() => {
    if (!activeBlock || !interruptionDraft.type) return;
    const note: InterruptionNote = {
      type: interruptionDraft.type,
      lastAction: interruptionDraft.lastAction,
      nextAction: interruptionDraft.nextAction,
      resumeDecision: interruptionDraft.resumeDecision,
      savedAtIso: new Date().toISOString()
    };
    setInterruptionNote(note);
    writeJson(interruptionKey(activeBlock.startDate, activeBlock.id), note);
  }, [activeBlock, interruptionDraft]);

  const resumeFromInterruption = useCallback(() => {
    if (!activeBlock) return;
    if (interruptionNote) setResumeNote(interruptionNote);
    if (diffMinutes(activeBlock.endDate, new Date()) < 30 || interruptionNote?.resumeDecision === 'switch') {
      setFlashcardOnlyMode(true);
    }
    setIsInterrupted(false);
  }, [activeBlock, interruptionNote]);

  const acknowledgeResumeNote = useCallback(() => setResumeNote(null), []);

  const saveBlockEndLog = useCallback(
    (draft: BlockLogDraft) => {
      if (!blockEndLogBlock) return false;
      if (!draft.workedOn.trim() || !draft.explainWithoutNotes.trim() || !draft.gap.trim()) return false;
      writeJson(blockLogKey(blockEndLogBlock.startDate, blockEndLogBlock.id), {
        ...draft,
        savedAtIso: new Date().toISOString()
      });
      return true;
    },
    [blockEndLogBlock]
  );

  return {
    now,
    settings,
    activeBlock,
    nextBlock,
    timeRemainingInBlockSeconds: activeBlock ? diffSeconds(activeBlock.endDate, now) : 0,
    countdownToNextBlockSeconds: nextBlock ? diffSeconds(nextBlock.startDate, now) : null,
    plan,
    currentActivity,
    nextActivity,
    remainingActivities,
    energy,
    shouldShowEnergySelector: Boolean(activeBlock && !energy && isBlockStartWindow),
    isInterrupted,
    interruptionNote,
    resumeNote,
    flashcardOnlyMode,
    blockEndLogRequired: Boolean(blockEndLogBlock),
    blockEndLogBlock,
    midpointBreak,
    midpointBreakCountdownSeconds,
    interruptionDraft,
    setEnergy,
    startInterruption,
    updateInterruptionDraft,
    saveInterruption,
    resumeFromInterruption,
    acknowledgeResumeNote,
    saveBlockEndLog
  };
}
