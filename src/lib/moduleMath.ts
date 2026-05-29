import type { ModuleData } from '../data/modules';
import type { FlashcardProgress, ModuleProgress, UserProgress } from './progress';

function getCompletionRatio(completed: number, total: number) {
  if (total <= 0) {
    return null;
  }

  return completed / total;
}

function hasReviewedFlashcard(flashcard?: FlashcardProgress) {
  if (!flashcard) {
    return false;
  }

  return flashcard.reviewCount > 0 || (flashcard.state !== undefined && flashcard.state !== 'new');
}

function getQuizCompletion(moduleProgress: ModuleProgress, moduleData: ModuleData) {
  if (moduleData.quiz.length === 0) {
    return null;
  }

  const attempts = moduleProgress.quizAttempts ?? [];
  if (attempts.length === 0) {
    return 0;
  }

  return 1;
}

export function getModuleCompletion(moduleId: string, progress: UserProgress, moduleData: ModuleData) {
  const moduleProgress = progress.modules[moduleId];
  if (!moduleProgress) {
    return 0;
  }

  const sectionCompletion = getCompletionRatio(
    moduleData.sections.filter((section) => Boolean(moduleProgress.sectionsRead[section.id])).length,
    moduleData.sections.length
  );
  const flashcardCompletion = getCompletionRatio(
    moduleData.flashcards.filter((card) => hasReviewedFlashcard(moduleProgress.flashcards[card.id])).length,
    moduleData.flashcards.length
  );
  const quizCompletion = getQuizCompletion(moduleProgress, moduleData);
  const practicalOutputCompletion = getCompletionRatio(
    moduleData.practicalOutputs.filter((output) => Boolean(moduleProgress.practicalOutputs?.[output.id])).length,
    moduleData.practicalOutputs.length
  );
  const labCompletion = getCompletionRatio(
    (moduleData.interactiveLabs ?? []).filter((lab) => Boolean(moduleProgress.interactiveLabs?.[lab.id])).length,
    (moduleData.interactiveLabs ?? []).length
  );

  const activeRatios = [
    sectionCompletion,
    flashcardCompletion,
    quizCompletion,
    practicalOutputCompletion,
    labCompletion
  ].filter((value): value is number => value !== null);

  if (activeRatios.length === 0) {
    return 0;
  }

  return (activeRatios.reduce((sum, value) => sum + value, 0) / activeRatios.length) * 100;
}

export function getOverallProgress(modules: ModuleData[], progress: UserProgress) {
  if (modules.length === 0) {
    return 0;
  }

  const total = modules.reduce((sum, moduleData) => sum + getModuleCompletion(moduleData.id, progress, moduleData), 0);
  return total / modules.length;
}

export type DomainProgress = {
  domain: string;
  attemptCount: number;
  averageScore: number;
};

export function getDomainProgress(progress: UserProgress): DomainProgress[] {
  const domainMap = new Map<string, { total: number; count: number }>();

  progress.assessmentAttempts.forEach((attempt) => {
    const current = domainMap.get(attempt.domain) || { total: 0, count: 0 };
    current.total += attempt.scoreBreakdown.total;
    current.count += 1;
    domainMap.set(attempt.domain, current);
  });

  return Array.from(domainMap.entries())
    .map(([domain, data]) => ({
      domain,
      attemptCount: data.count,
      averageScore: (data.total / data.count) * 100
    }))
    .sort((a, b) => b.attemptCount - a.attemptCount);
}
