import type { ModuleData } from '../data/modules';
import type { WeakTopicKey } from '../types/assessment';

const STORAGE_KEY = 'dcsPrepProgress';

type FlashcardProgress = {
  reviewCount: number;
  dueDateIso: string;
};

type ModuleProgress = {
  sectionsRead: Record<string, boolean>;
  flashcards: Record<string, FlashcardProgress>;
};

export type AssessmentAttempt = {
  id: string;
  prompt: string;
  answerSummary: string;
  feedback: {
    correctedConcept: string;
  };
  weakTopic: WeakTopicKey;
  recommendedModuleId: string;
  scoreBreakdown: {
    total: number;
  };
  nextReviewDateIso: string;
  shouldRevisit?: boolean;
};

export type WeakTopicReview = {
  topic: WeakTopicKey;
  averageScore: number;
  reviewCount: number;
  dueDateIso: string;
  recommendedModuleId: string;
};

export type ScenarioRun = {
  id: string;
  completed: boolean;
};

export type PdLogEntry = {
  date: string;
  minutes: number;
};

export type UserProgress = {
  modules: Record<string, ModuleProgress>;
  assessmentAttempts: AssessmentAttempt[];
  weakTopicReviews: Record<string, WeakTopicReview>;
  scenarioRuns: ScenarioRun[];
  pdLogEntries: PdLogEntry[];
};

function safeParseProgress(value: string | null): UserProgress | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as UserProgress;
  } catch {
    return null;
  }
}

function getDefaultModuleProgress(module: ModuleData): ModuleProgress {
  return {
    sectionsRead: Object.fromEntries(module.sections.map((section) => [section, false])),
    flashcards: Object.fromEntries(
      module.flashcards.map((card) => [card.id, { reviewCount: 0, dueDateIso: new Date().toISOString() }])
    )
  };
}

export function getInitialProgressSnapshot(modules: ModuleData[] = []): UserProgress {
  return {
    modules: Object.fromEntries(modules.map((module) => [module.id, getDefaultModuleProgress(module)])),
    assessmentAttempts: [],
    weakTopicReviews: {},
    scenarioRuns: [],
    pdLogEntries: []
  };
}

export function getStoredProgressSnapshot(modules: ModuleData[] = []): UserProgress {
  if (typeof window === 'undefined') {
    return getInitialProgressSnapshot(modules);
  }

  const stored = safeParseProgress(window.localStorage.getItem(STORAGE_KEY));
  if (!stored) {
    return getInitialProgressSnapshot(modules);
  }

  if (modules.length === 0) {
    return stored;
  }

  const normalizedModules = { ...stored.modules };
  modules.forEach((module) => {
    if (!normalizedModules[module.id]) {
      normalizedModules[module.id] = getDefaultModuleProgress(module);
    }
  });

  return {
    ...stored,
    modules: normalizedModules
  };
}
