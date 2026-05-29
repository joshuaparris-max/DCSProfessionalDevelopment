import type { ModuleData } from '../data/modules';
import { getModuleCompletion } from './moduleMath';
import type { UserProgress } from './progress';

export const GAMIFICATION_STORAGE_KEY = 'supportOpsGamification';
const LEGACY_GAMIFICATION_STORAGE_KEY = 'dcsPrepGamification';

export type ITSpecialization = 'support-tech' | 'network-engineer' | 'm365-admin' | 'security-analyst' | 'generalist';

export type GamificationBadge = {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  awardedAtIso?: string;
};

export type GamificationSticker = {
  id: string;
  label: string;
  emoji: string;
  awardedAtIso: string;
};

export type LevelMilestone = {
  level: number;
  title: string;
  specialization?: ITSpecialization;
  description: string;
  unlockedAtIso?: string;
};

export type GamificationState = {
  points: number;
  level: number;
  xpInCurrentLevel: number;
  totalXpEarned: number;
  studyStreakDays: number;
  specialization: ITSpecialization;
  badges: Record<string, { awardedAtIso: string }>;
  stickers: GamificationSticker[];
  levelMilestones: Record<number, { unlockedAtIso: string }>;
  bossBattlesWon: number;
  lastCalculatedAtIso: string;
};

export type GamificationSummary = {
  points: number;
  level: number;
  xpInCurrentLevel: number;
  xpNeededForNextLevel: number;
  totalXpEarned: number;
  specialization: ITSpecialization;
  studyStreakDays: number;
  completedBadgeCount: number;
  badges: GamificationBadge[];
  stickers: GamificationSticker[];
  bossBattlesWon: number;
  nextMilestone: string;
  nextLevelTitle: string;
};

type GamificationOptions = {
  nowIso?: string;
};

// XP thresholds for each level (cumulative)
const LEVEL_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 100,
  3: 250,
  4: 450,
  5: 700,
  6: 1000,
  7: 1350,
  8: 1750,
  9: 2200,
  10: 2700,
  11: 3250,
  12: 3850,
  13: 4500,
  14: 5200,
  15: 5950,
  16: 6750,
  17: 7600,
  18: 8500,
  19: 9450,
  20: 10450,
  25: 16000,
  30: 23000,
  35: 31500,
  40: 41500,
  45: 53000,
  50: 67000
};

const MAX_LEVEL = 50;

function getXpThresholdForLevel(level: number): number {
  if (level <= 1) return 0;
  if (level > MAX_LEVEL) return LEVEL_THRESHOLDS[MAX_LEVEL] ?? 67000;
  return LEVEL_THRESHOLDS[level] ?? 0;
}

function calculateLevelFromXp(totalXp: number): { level: number; xpInCurrentLevel: number } {
  let level = 1;
  for (let l = MAX_LEVEL; l >= 2; l--) {
    if (totalXp >= getXpThresholdForLevel(l)) {
      level = l;
      break;
    }
  }

  const currentLevelThreshold = getXpThresholdForLevel(level);
  const xpInCurrentLevel = totalXp - currentLevelThreshold;

  return { level, xpInCurrentLevel };
}

function getSpecializationFromProgress(progress: UserProgress): ITSpecialization {
  const aPlus = progress.assessmentAttempts.filter((a) => a.category === 'CompTIA A+').length;
  const m365 = progress.assessmentAttempts.filter((a) => a.category === 'M365').length;
  const network = progress.assessmentAttempts.filter((a) => a.category === 'Networking').length;
  const security = progress.assessmentAttempts.filter((a) => a.category === 'Cybersecurity').length;

  const scores = [
    { spec: 'support-tech' as ITSpecialization, count: aPlus },
    { spec: 'm365-admin' as ITSpecialization, count: m365 },
    { spec: 'network-engineer' as ITSpecialization, count: network },
    { spec: 'security-analyst' as ITSpecialization, count: security }
  ];

  const top = scores.sort((a, b) => b.count - a.count)[0];
  return top.count > 0 ? top.spec : 'generalist';
}

function getLevelTitle(level: number, specialization: ITSpecialization): string {
  const specPrefix = {
    'support-tech': '🖥️',
    'm365-admin': '☁️',
    'network-engineer': '🌐',
    'security-analyst': '🛡️',
    'generalist': '📚'
  };

  if (level < 5) return `${specPrefix[specialization]} Novice ${specialization.replace('-', ' ')}`;
  if (level < 10) return `${specPrefix[specialization]} Junior ${specialization.replace('-', ' ')}`;
  if (level < 20) return `${specPrefix[specialization]} Professional ${specialization.replace('-', ' ')}`;
  if (level < 35) return `${specPrefix[specialization]} Senior ${specialization.replace('-', ' ')}`;
  if (level < 50) return `${specPrefix[specialization]} Expert ${specialization.replace('-', ' ')}`;
  return `${specPrefix[specialization]} IT Legend`;
}

export function getInitialGamificationState(nowIso = new Date().toISOString()): GamificationState {
  return {
    points: 0,
    level: 1,
    xpInCurrentLevel: 0,
    totalXpEarned: 0,
    studyStreakDays: 0,
    specialization: 'generalist',
    badges: {},
    stickers: [],
    levelMilestones: {},
    bossBattlesWon: 0,
    lastCalculatedAtIso: nowIso
  };
}

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

export function loadGamificationState(nowIso = new Date().toISOString()): GamificationState {
  if (typeof window === 'undefined') {
    return getInitialGamificationState(nowIso);
  }

  const stored = safeParseState(window.localStorage.getItem(GAMIFICATION_STORAGE_KEY)) ??
                 safeParseState(window.localStorage.getItem(LEGACY_GAMIFICATION_STORAGE_KEY));

  const state = {
    ...getInitialGamificationState(nowIso),
    ...stored,
    badges: stored?.badges ?? {},
    stickers: stored?.stickers ?? [],
    levelMilestones: stored?.levelMilestones ?? {}
  };

  // Clean up legacy storage key
  if (window.localStorage.getItem(LEGACY_GAMIFICATION_STORAGE_KEY)) {
    window.localStorage.removeItem(LEGACY_GAMIFICATION_STORAGE_KEY);
  }

  return state;
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

function calculatePoints(progress: UserProgress, modules: ModuleData[], stickers: GamificationSticker[] = []) {
  const modulePoints = modules.reduce((sum, moduleData) => {
    return sum + Math.floor(getModuleCompletion(moduleData.id, progress, moduleData));
  }, 0);
  const pdPoints = progress.pdLogEntries.reduce((sum, entry) => sum + Math.floor(Math.min(entry.minutes, 90) / 5), 0);
  const completedScenarioPoints = progress.scenarioRuns.filter((run) => run.completed).length * 40;
  const strongScenarioNotePoints = progress.scenarioRuns.filter((run) => (run.noteScore ?? 0) >= 0.85).length * 20;
  const assessmentPoints = progress.assessmentAttempts.length * 20;
  const practicalOutputPoints = countCompletedPracticalOutputs(progress) * 50;
  const stickerPoints = stickers.length * 10;

  return modulePoints + pdPoints + completedScenarioPoints + strongScenarioNotePoints + assessmentPoints + practicalOutputPoints + stickerPoints;
}

function calculateTotalXp(progress: UserProgress, modules: ModuleData[], stickers: GamificationSticker[] = []): number {
  // XP calculation for different activities
  let totalXp = 0;

  // Module study XP: 2 XP per 1% of module completion across all modules
  modules.forEach((moduleData) => {
    const completion = getModuleCompletion(moduleData.id, progress, moduleData);
    totalXp += Math.floor(completion * 2);
  });

  // PD log entries: 5 XP per 5 minutes studied (up to 90 minutes = 90 XP per entry)
  totalXp += progress.pdLogEntries.reduce((sum, entry) => {
    return sum + Math.floor(Math.min(entry.minutes, 90) / 5) * 5;
  }, 0);

  // Scenario completions: 50 XP per completion
  totalXp += progress.scenarioRuns.filter((run) => run.completed).length * 50;

  // Boss battle bonus (exam attempts): 75 XP for passing assessment, 30 XP for attempt
  totalXp += progress.assessmentAttempts.reduce((sum, attempt) => {
    const score = attempt.scoreBreakdown.total;
    return sum + (score >= 0.7 ? 75 : 30); // 75 XP for passing (70%+), 30 for attempt
  }, 0);

  // Practical outputs: 100 XP per completed output
  totalXp += countCompletedPracticalOutputs(progress) * 100;

  // Strong scenario notes (85%+ quality): 30 XP bonus
  totalXp += progress.scenarioRuns.filter((run) => (run.noteScore ?? 0) >= 0.85).length * 30;

  // Sticker achievements: 15 XP per sticker
  totalXp += stickers.length * 15;

  return totalXp;
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
  const previousBadges = previousState.badges ?? {};
  const previousStickers = Array.isArray(previousState.stickers) ? previousState.stickers : [];
  const earnedBadgeIds = getBadgeDefinitions(progress, modules)
    .filter((badge) => badge.earned)
    .map((badge) => badge.id);
  const badges = { ...previousBadges };

  earnedBadgeIds.forEach((badgeId) => {
    badges[badgeId] = badges[badgeId] ?? { awardedAtIso: nowIso };
  });

  // Calculate Stickers
  const stickers = [...previousStickers];
  const reflections = Object.values(progress.reflectionJournal || {});
  
  const addSticker = (id: string, label: string, emoji: string) => {
    if (!stickers.some(s => s.id === id)) {
      stickers.push({ id, label, emoji, awardedAtIso: nowIso });
    }
  };

  if (reflections.some(r => r.emotions.includes('Empathetic'))) {
    addSticker('empathy-expert', 'Empathy Expert', '🏷️');
  }
  if (reflections.length >= 3) {
    addSticker('quick-reflector', 'Quick Reflector', '📝');
  }
  if (modules.some(m => m.id === 'cybersecurity-incident-response-nist' && getModuleCompletion(m.id, progress, m) >= 100)) {
    addSticker('nist-aware', 'NIST Aware', '🛡️');
  }
  if (modules.some(m => m.id === 'microsoft-intune-fundamentals' && getModuleCompletion(m.id, progress, m) >= 100)) {
    addSticker('intune-hero', 'Intune Hero', '💻');
  }

  // Calculate XP and level
  const totalXpEarned = calculateTotalXp(progress, modules, stickers);
  const { level, xpInCurrentLevel } = calculateLevelFromXp(totalXpEarned);
  const specialization = getSpecializationFromProgress(progress);

  // Track level milestones
  const levelMilestones = { ...previousState.levelMilestones };
  if (!levelMilestones[level]) {
    levelMilestones[level] = { unlockedAtIso: nowIso };
  }

  // Count boss battles won (assessments with 70%+ score)
  const bossBattlesWon = progress.assessmentAttempts.filter((a) => a.scoreBreakdown.total >= 0.7).length;

  return {
    points: calculatePoints(progress, modules, stickers),
    level,
    xpInCurrentLevel,
    totalXpEarned,
    studyStreakDays: calculateStudyStreakDays(progress),
    specialization,
    badges,
    stickers,
    levelMilestones,
    bossBattlesWon,
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

  const nextLevelThreshold = getXpThresholdForLevel(state.level + 1);
  const currentLevelThreshold = getXpThresholdForLevel(state.level);
  const xpNeededForNextLevel = nextLevelThreshold - currentLevelThreshold;

  return {
    points: state.points,
    level: state.level,
    xpInCurrentLevel: state.xpInCurrentLevel,
    xpNeededForNextLevel,
    totalXpEarned: state.totalXpEarned,
    specialization: state.specialization,
    studyStreakDays: state.studyStreakDays,
    completedBadgeCount: badges.filter((badge) => badge.earned).length,
    badges,
    stickers: state.stickers,
    bossBattlesWon: state.bossBattlesWon,
    nextMilestone: getNextMilestone(badges),
    nextLevelTitle: getLevelTitle(state.level + 1, state.specialization)
  };
}

