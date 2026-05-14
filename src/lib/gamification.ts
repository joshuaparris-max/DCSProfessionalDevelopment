import type { ModuleData } from '../data/modules';
import { getModuleCompletion } from './moduleMath';
import type { UserProgress } from './progress';

export const GAMIFICATION_STORAGE_KEY = 'dcsPrepGamification';

export type GamificationBadge = {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  awardedAtIso?: string;
};

export type GamificationState = {
  points: number;
  studyStreakDays: number;
  badges: Record<string, { awardedAtIso: string }>;
  lastCalculatedAtIso: string;
};

export type GamificationSummary = {
  points: number;
  studyStreakDays: number;
  completedBadgeCount: number;
  badges: GamificationBadge[];
  nextMilestone: string;
};

type GamificationOptions = {
  nowIso?: string;
};

function safeParseState(value: string | null): Partial<GamificationState> | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as Partial<GamificationState>;
  } catch {
    return null;
  }
}

export function getInitialGamificationState(nowIso = new Date().toISOString()): GamificationState {
  return {
    points: 0,
    studyStreakDays: 0,
    badges: {},
    lastCalculatedAtIso: nowIso
  };
}

export function loadGamificationState(nowIso = new Date().toISOString()): GamificationState {
  if (typeof window === 'undefined') {
    return getInitialGamificationState(nowIso);
  }

  const stored = safeParseState(window.localStorage.getItem(GAMIFICATION_STORAGE_KEY));

  return {
    ...getInitialGamificationState(nowIso),
    ...stored,
    badges: stored?.badges ?? {}
  };
}

export function saveGamificationState(state: GamificationState) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(GAMIFICATION_STORAGE_KEY, JSON.stringify(state));
}

function toDateKey(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
}

function previousDateKey(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

function calculateStudyStreakDays(progress: UserProgress) {
  const activityDates = new Set<string>();

  progress.pdLogEntries.forEach((entry) => {
    const dateKey = toDateKey(entry.date);
    if (dateKey) {
      activityDates.add(dateKey);
    }
  });

  progress.scenarioRuns.forEach((run) => {
    const dateKey = toDateKey(run.completedAtIso || run.startedAtIso);
    if (dateKey) {
      activityDates.add(dateKey);
    }
  });

  progress.assessmentAttempts.forEach((attempt) => {
    const dateKey = toDateKey(attempt.timestampIso);
    if (dateKey) {
      activityDates.add(dateKey);
    }
  });

  Object.values(progress.modules).forEach((moduleProgress) => {
    moduleProgress.quizAttempts?.forEach((attempt) => {
      const dateKey = toDateKey(attempt.attemptAtIso);
      if (dateKey) {
        activityDates.add(dateKey);
      }
    });
  });

  const sortedDates = Array.from(activityDates).sort();

  if (sortedDates.length === 0) {
    return 0;
  }

  let streak = 1;
  let current = sortedDates[sortedDates.length - 1];

  while (activityDates.has(previousDateKey(current))) {
    streak += 1;
    current = previousDateKey(current);
  }

  return streak;
}

function countCompletedPracticalOutputs(progress: UserProgress) {
  return Object.values(progress.modules).reduce((sum, moduleProgress) => {
    return sum + Object.values(moduleProgress.practicalOutputs ?? {}).filter(Boolean).length;
  }, 0);
}

function calculatePoints(progress: UserProgress, modules: ModuleData[]) {
  const modulePoints = modules.reduce((sum, moduleData) => {
    return sum + Math.floor(getModuleCompletion(moduleData.id, progress, moduleData));
  }, 0);
  const pdPoints = progress.pdLogEntries.reduce((sum, entry) => sum + Math.floor(Math.min(entry.minutes, 90) / 5), 0);
  const completedScenarioPoints = progress.scenarioRuns.filter((run) => run.completed).length * 40;
  const strongScenarioNotePoints = progress.scenarioRuns.filter((run) => (run.noteScore ?? 0) >= 0.85).length * 20;
  const assessmentPoints = progress.assessmentAttempts.length * 20;
  const practicalOutputPoints = countCompletedPracticalOutputs(progress) * 50;

  return modulePoints + pdPoints + completedScenarioPoints + strongScenarioNotePoints + assessmentPoints + practicalOutputPoints;
}

function getBadgeDefinitions(progress: UserProgress, modules: ModuleData[]) {
  const completions = modules.map((moduleData) => getModuleCompletion(moduleData.id, progress, moduleData));
  const completedScenarios = progress.scenarioRuns.filter((run) => run.completed);
  const completedPracticalOutputs = countCompletedPracticalOutputs(progress);
  const imagingCompletion = modules.some((moduleData) => {
    return moduleData.id === 'device-imaging-deployment-workflows' && getModuleCompletion(moduleData.id, progress, moduleData) >= 50;
  });

  return [
    {
      id: 'first-pd-log',
      title: 'PD Logger',
      description: 'Recorded the first professional development entry.',
      earned: progress.pdLogEntries.length >= 1
    },
    {
      id: 'first-scenario',
      title: 'Scenario Starter',
      description: 'Completed the first Scenario Lab exercise.',
      earned: completedScenarios.length >= 1
    },
    {
      id: 'strong-ticket-note',
      title: 'Clean Ticket Note',
      description: 'Scored 85% or higher on a scenario note self-check.',
      earned: completedScenarios.some((run) => (run.noteScore ?? 0) >= 0.85)
    },
    {
      id: 'five-scenarios',
      title: 'Troubleshooting Reps',
      description: 'Completed five Scenario Lab exercises.',
      earned: completedScenarios.length >= 5
    },
    {
      id: 'first-practical-output',
      title: 'Workplace Evidence',
      description: 'Finished a practical output tied to a real support skill.',
      earned: completedPracticalOutputs >= 1
    },
    {
      id: 'module-25',
      title: 'Module Quarter Mark',
      description: 'Reached 25% completion in any learning module.',
      earned: completions.some((completion) => completion >= 25)
    },
    {
      id: 'module-50',
      title: 'Module Halfway',
      description: 'Reached 50% completion in any learning module.',
      earned: completions.some((completion) => completion >= 50)
    },
    {
      id: 'module-complete',
      title: 'Module Complete',
      description: 'Finished every tracked activity in a learning module.',
      earned: completions.some((completion) => completion >= 100)
    },
    {
      id: 'imaging-readiness',
      title: 'Imaging Readiness',
      description: 'Built momentum in the device imaging and deployment workflow module.',
      earned: imagingCompletion
    }
  ];
}

function getNextMilestone(badges: GamificationBadge[]) {
  const nextBadge = badges.find((badge) => !badge.earned);
  return nextBadge ? nextBadge.title : 'All current badges earned';
}

export function deriveGamificationState(
  progress: UserProgress,
  modules: ModuleData[],
  previousState: GamificationState = getInitialGamificationState(),
  options: GamificationOptions = {}
): GamificationState {
  const nowIso = options.nowIso ?? new Date().toISOString();
  const earnedBadgeIds = getBadgeDefinitions(progress, modules)
    .filter((badge) => badge.earned)
    .map((badge) => badge.id);
  const badges = { ...previousState.badges };

  earnedBadgeIds.forEach((badgeId) => {
    badges[badgeId] = badges[badgeId] ?? { awardedAtIso: nowIso };
  });

  return {
    points: calculatePoints(progress, modules),
    studyStreakDays: calculateStudyStreakDays(progress),
    badges,
    lastCalculatedAtIso: nowIso
  };
}

export function getGamificationSummary(
  progress: UserProgress,
  modules: ModuleData[],
  state: GamificationState = getInitialGamificationState()
): GamificationSummary {
  const badges = getBadgeDefinitions(progress, modules).map((badge) => ({
    ...badge,
    awardedAtIso: state.badges[badge.id]?.awardedAtIso
  }));

  return {
    points: state.points,
    studyStreakDays: state.studyStreakDays,
    completedBadgeCount: badges.filter((badge) => badge.earned).length,
    badges,
    nextMilestone: getNextMilestone(badges)
  };
}
