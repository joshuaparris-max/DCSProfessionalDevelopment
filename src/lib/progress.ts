import type { ModuleData } from '../data/modules';
import type { ReviewRating } from './spacedRepetition';
import type { ScenarioRun, ScenarioRunChoice } from '../types/scenarios';
import type { AssessmentAttempt as StoredAssessmentAttempt } from '../types/assessment';

const STORAGE_KEY = 'supportOpsProgress';
const LEGACY_STORAGE_KEY = 'dcsPrepProgress';
const LAST_SAVED_KEY = 'supportOpsLastSaved';
const LEGACY_LAST_SAVED_KEY = 'dcsPrepLastSaved';
export const STORAGE_VERSION = 2;

export type FlashcardState = 'new' | 'learning' | 'reviewing' | 'mastered';

export type FlashcardProgress = {
  state?: FlashcardState;
  reviewCount: number;
  dueDateIso: string;
};

export type ModuleQuizAttempt = {
  id: string;
  attemptAtIso: string;
  score: number;
  questionIds: string[];
};

export type ModuleProgress = {
  sectionsRead: Record<string, boolean>;
  flashcards: Record<string, FlashcardProgress>;
  quizAttempts?: ModuleQuizAttempt[];
  practicalOutputs?: Record<string, boolean>;
  interactiveLabs?: Record<string, boolean>;
};

export type AssessmentAttempt = StoredAssessmentAttempt;

export type WeakTopicReview = {
  topic: string;
  averageScore: number;
  dueDateIso: string;
  recommendedModuleId: string;
};

export type PdEntryType =
  | 'module-study'
  | 'quiz'
  | 'scenario'
  | 'flashcards'
  | 'practical-output'
  | 'focus-block'
  | 'reflection'
  | 'coaching';

export type PDLogEntry = {
  id: string;
  date: string;
  minutes: number;
  type: PdEntryType;
  title?: string;
  resource: string;
  topic: string;
  moduleIds?: string[];
  scenarioIds?: string[];
  weakTopicsTouched?: string[];
  weakTopicsImproved?: string[];
  dcsRelevance: string;
  learned: string;
  reflection?: string;
  nextStep: string;
  evidenceLink: string;
  templateId?: string;
  sensitiveConfirmed: boolean;
};

type WorkContextProfile =
  | 'DCS / School IT'
  | 'MSP Support'
  | 'Healthcare Practice IT'
  | 'General Internal IT'
  | 'Certification Study'
  | 'Job Interview Prep';

export type UserProgress = {
  schemaVersion: number;
  selectedWorkContext: WorkContextProfile;
  modules: Record<string, ModuleProgress>;
  assessmentAttempts: AssessmentAttempt[];
  weakTopicReviews: Record<string, WeakTopicReview>;
  scenarioRuns: ScenarioRun[];
  pdLogEntries: PDLogEntry[];
  dueReviewState: Record<string, string>;
  practicalOutputReviews: Record<string, { dueDateIso: string; reviewCount: number; completed: boolean }>;
  knowledgeBaseDrafts: Record<string, { title: string; body: string; updatedAtIso: string }>;
  reflectionJournal: Record<string, { scenarioId: string; content: string; emotions: string[]; createdAtIso: string }>;
  evidencePackSettings: {
    includeCertificates: boolean;
    includeLinks: boolean;
    privacyReminderAccepted: boolean;
  };
};

type PersistedProgress = Partial<UserProgress> & {
  schemaVersion?: number;
};

function safeParseProgress(value: string | null): PersistedProgress | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as PersistedProgress;
  } catch {
    return null;
  }
}

function getDefaultModuleProgress(module: ModuleData): ModuleProgress {
  return {
    sectionsRead: Object.fromEntries(module.sections.map((section) => [section.id, false])),
    flashcards: Object.fromEntries(
      module.flashcards.map((card) => [card.id, { state: 'new', reviewCount: 0, dueDateIso: new Date().toISOString() }])
    ),
    quizAttempts: [],
    practicalOutputs: Object.fromEntries(module.practicalOutputs.map((output) => [output.id, false]))
  };
}

export function getInitialProgressSnapshot(modules: ModuleData[] = []): UserProgress {
  return {
    schemaVersion: STORAGE_VERSION,
    selectedWorkContext: 'DCS / School IT',
    modules: Object.fromEntries(modules.map((module) => [module.id, getDefaultModuleProgress(module)])),
    assessmentAttempts: [],
    weakTopicReviews: {},
    scenarioRuns: [],
    pdLogEntries: [],
    dueReviewState: {},
    practicalOutputReviews: {},
    knowledgeBaseDrafts: {},
    reflectionJournal: {},
    evidencePackSettings: {
      includeCertificates: true,
      includeLinks: true,
      privacyReminderAccepted: false
    }
  };
}

function migrateProgress(raw: PersistedProgress, modules: ModuleData[]): UserProgress {
  const base = getInitialProgressSnapshot(modules);
  const fromVersion = raw.schemaVersion ?? 1;

  const migrated: UserProgress = {
    ...base,
    ...raw,
    schemaVersion: STORAGE_VERSION,
    selectedWorkContext: raw.selectedWorkContext ?? 'DCS / School IT',
    modules: raw.modules ?? base.modules,
    assessmentAttempts: raw.assessmentAttempts ?? base.assessmentAttempts,
    weakTopicReviews: raw.weakTopicReviews ?? base.weakTopicReviews,
    scenarioRuns: (raw.scenarioRuns ?? base.scenarioRuns).map((run) => {
      if (fromVersion >= 2) {
        return run;
      }
      const correctCount = run.stepChoices.filter((step) => step.correct).length;
      const score = run.stepChoices.length ? correctCount / run.stepChoices.length : 0;
      return {
        ...run,
        noteRubricChecks: {},
        noteScore: Number(score.toFixed(2)),
        revisitDueDateIso: score < 0.75 ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() : undefined
      };
    }),
    pdLogEntries: raw.pdLogEntries ?? base.pdLogEntries,
    dueReviewState: raw.dueReviewState ?? {},
    practicalOutputReviews: raw.practicalOutputReviews ?? {},
    knowledgeBaseDrafts: raw.knowledgeBaseDrafts ?? {},
    reflectionJournal: raw.reflectionJournal ?? {},
    evidencePackSettings: {
      ...base.evidencePackSettings,
      ...raw.evidencePackSettings
    }
  };

  return migrated;
}

export function getStoredProgressSnapshot(modules: ModuleData[] = []): UserProgress {
  if (typeof window === 'undefined') {
    return getInitialProgressSnapshot(modules);
  }

  const rawStored = safeParseProgress(window.localStorage.getItem(STORAGE_KEY)) ?? safeParseProgress(window.localStorage.getItem(LEGACY_STORAGE_KEY));
  if (!rawStored) {
    return getInitialProgressSnapshot(modules);
  }

  const migrated = migrateProgress(rawStored, modules);

  if (modules.length === 0) {
    return migrated;
  }

  const normalizedModules = { ...migrated.modules };
  modules.forEach((module) => {
    const existing = normalizedModules[module.id];
    const defaults = getDefaultModuleProgress(module);

    if (!existing) {
      normalizedModules[module.id] = defaults;
      return;
    }

    normalizedModules[module.id] = {
      ...defaults,
      ...existing,
      sectionsRead: {
        ...defaults.sectionsRead,
        ...existing.sectionsRead
      },
      flashcards: Object.fromEntries(
        module.flashcards.map((card) => {
          const savedCard = existing.flashcards?.[card.id];

          return [
            card.id,
            {
              ...defaults.flashcards[card.id],
              ...savedCard
            }
          ];
        })
      ),
      practicalOutputs: {
        ...defaults.practicalOutputs,
        ...existing.practicalOutputs
      },
      quizAttempts: existing.quizAttempts ?? defaults.quizAttempts
    };
  });

  return {
    ...migrated,
    modules: normalizedModules
  };
}

export function saveProgress(progress: UserProgress) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...progress,
      schemaVersion: STORAGE_VERSION
    })
  );

  window.localStorage.setItem(LAST_SAVED_KEY, new Date().toISOString());
  window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  window.localStorage.removeItem(LEGACY_LAST_SAVED_KEY);
}

export function resetProgress() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  window.localStorage.removeItem(LAST_SAVED_KEY);
  window.localStorage.removeItem(LEGACY_LAST_SAVED_KEY);
}

export function updateModulePracticalOutput(
  progress: UserProgress,
  moduleId: string,
  outputId: string,
  completed: boolean
): UserProgress {
  const moduleProgress = progress.modules[moduleId] ?? {
    sectionsRead: {},
    flashcards: {},
    practicalOutputs: {},
    interactiveLabs: {}
  };

  return {
    ...progress,
    modules: {
      ...progress.modules,
      [moduleId]: {
        ...moduleProgress,
        practicalOutputs: {
          ...(moduleProgress.practicalOutputs ?? {}),
          [outputId]: completed
        }
      }
    }
  };
}

export function updateModuleLabProgress(
  progress: UserProgress,
  moduleId: string,
  labId: string,
  completed: boolean
): UserProgress {
  const moduleProgress = progress.modules[moduleId] ?? {
    sectionsRead: {},
    flashcards: {},
    practicalOutputs: {},
    interactiveLabs: {}
  };

  return {
    ...progress,
    modules: {
      ...progress.modules,
      [moduleId]: {
        ...moduleProgress,
        interactiveLabs: {
          ...(moduleProgress.interactiveLabs ?? {}),
          [labId]: completed
        }
      }
    }
  };
}

export function updateModuleSectionProgress(
  progress: UserProgress,
  moduleId: string,
  sectionId: string,
  read: boolean
): UserProgress {
  const moduleProgress = progress.modules[moduleId] ?? {
    sectionsRead: {},
    flashcards: {},
    practicalOutputs: {}
  };

  return {
    ...progress,
    modules: {
      ...progress.modules,
      [moduleId]: {
        ...moduleProgress,
        sectionsRead: {
          ...(moduleProgress.sectionsRead ?? {}),
          [sectionId]: read
        }
      }
    }
  };
}

function adjustDueDate(rating: ReviewRating): string {
  const now = new Date();

  switch (rating) {
    case 'again':
      now.setHours(now.getHours() + 2);
      break;
    case 'hard':
      now.setDate(now.getDate() + 1);
      break;
    case 'good':
      now.setDate(now.getDate() + 3);
      break;
    case 'easy':
      now.setDate(now.getDate() + 7);
      break;
  }

  return now.toISOString();
}

function getFlashcardStateForRating(rating: ReviewRating): FlashcardState {
  switch (rating) {
    case 'again':
    case 'hard':
      return 'learning';
    case 'good':
      return 'reviewing';
    case 'easy':
      return 'mastered';
  }
}

export function recordFlashcardReview(
  progress: UserProgress,
  moduleId: string,
  cardId: string,
  rating: ReviewRating
): UserProgress {
  const moduleProgress = progress.modules[moduleId] ?? {
    sectionsRead: {},
    flashcards: {}
  };
  const existing = moduleProgress.flashcards[cardId] ?? {
    state: 'new',
    reviewCount: 0,
    dueDateIso: new Date().toISOString()
  };
  const updatedFlashcards = {
    ...moduleProgress.flashcards,
    [cardId]: {
      state: getFlashcardStateForRating(rating),
      reviewCount: existing.reviewCount + 1,
      dueDateIso: adjustDueDate(rating)
    }
  };

  return {
    ...progress,
    modules: {
      ...progress.modules,
      [moduleId]: {
        ...moduleProgress,
        flashcards: updatedFlashcards
      }
    }
  };
}

export function saveScenarioRun(progress: UserProgress, scenarioRun: ScenarioRun): UserProgress {
  return {
    ...progress,
    scenarioRuns: [...progress.scenarioRuns, scenarioRun]
  };
}

export function savePdLogEntry(progress: UserProgress, entry: PDLogEntry): UserProgress {
  return {
    ...progress,
    pdLogEntries: [entry, ...progress.pdLogEntries]
  };
}

export function saveKnowledgeBaseDraft(
  progress: UserProgress,
  draftId: string,
  draft: { title: string; body: string }
): UserProgress {
  return {
    ...progress,
    knowledgeBaseDrafts: {
      ...progress.knowledgeBaseDrafts,
      [draftId]: {
        ...draft,
        updatedAtIso: new Date().toISOString()
      }
    }
  };
}

export function recordPracticalOutputReview(
  progress: UserProgress,
  moduleId: string,
  outputId: string,
  completed: boolean
): UserProgress {
  const key = `${moduleId}:${outputId}`;
  const existing = progress.practicalOutputReviews[key] ?? {
    reviewCount: 0,
    completed: false,
    dueDateIso: new Date().toISOString()
  };
  const now = new Date();
  now.setDate(now.getDate() + (completed ? 7 : 1));
  return {
    ...progress,
    practicalOutputReviews: {
      ...progress.practicalOutputReviews,
      [key]: {
        completed,
        reviewCount: existing.reviewCount + 1,
        dueDateIso: now.toISOString()
      }
    }
  };
}

export function saveReflectionEntry(
  progress: UserProgress,
  scenarioId: string,
  entry: { content: string; emotions: string[] }
): UserProgress {
  const id = `${scenarioId}:${Date.now()}`;
  return {
    ...progress,
    reflectionJournal: {
      ...progress.reflectionJournal,
      [id]: {
        ...entry,
        scenarioId,
        createdAtIso: new Date().toISOString()
      }
    }
  };
}
