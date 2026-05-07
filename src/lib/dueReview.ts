import { modules } from '../data/modules';
import { weakTopicLabels } from '../data/skillDomains';
import type { UserProgress } from './progress';
import { isDue } from './spacedRepetition';

export type DueReviewItem =
  | {
      id: string;
      type: 'flashcard';
      topic: string;
      moduleId: string;
      moduleTitle: string;
      prompt: string;
      dueDateIso: string;
      reviewType: 'flashcard';
    }
  | {
      id: string;
      type: 'assessment';
      topic: string;
      moduleId: string;
      moduleTitle: string;
      prompt: string;
      dueDateIso: string;
      reviewType: 'assessment';
    }
  | {
      id: string;
      type: 'weak-topic';
      topic: string;
      moduleId: string;
      moduleTitle: string;
      prompt: string;
      dueDateIso: string;
      reviewType: 'weak-topic';
    }
  | {
      id: string;
      type: 'scenario-note';
      topic: string;
      moduleId: string;
      moduleTitle: string;
      prompt: string;
      dueDateIso: string;
      reviewType: 'scenario-note';
    }
  | {
      id: string;
      type: 'practical-output';
      topic: string;
      moduleId: string;
      moduleTitle: string;
      prompt: string;
      dueDateIso: string;
      reviewType: 'practical-output';
    };

export function getDueReviewItems(progress: UserProgress): DueReviewItem[] {
  const items: DueReviewItem[] = [];

  modules.forEach((module) => {
    module.flashcards.forEach((card) => {
      const cardProgress = progress.modules[module.id]?.flashcards?.[card.id];
      if (!cardProgress || cardProgress.reviewCount <= 0 || !isDue(cardProgress.dueDateIso)) {
        return;
      }
      items.push({
        id: `flashcard:${module.id}:${card.id}`,
        type: 'flashcard',
        topic: module.domain,
        moduleId: module.id,
        moduleTitle: module.title,
        prompt: card.front,
        dueDateIso: cardProgress.dueDateIso,
        reviewType: 'flashcard'
      });
    });

    module.practicalOutputs.forEach((output) => {
      const key = `${module.id}:${output.id}`;
      const review = progress.practicalOutputReviews[key];
      if (!review || !isDue(review.dueDateIso) || review.completed) {
        return;
      }
      items.push({
        id: `practical:${key}`,
        type: 'practical-output',
        topic: module.domain,
        moduleId: module.id,
        moduleTitle: module.title,
        prompt: output.title,
        dueDateIso: review.dueDateIso,
        reviewType: 'practical-output'
      });
    });
  });

  progress.assessmentAttempts
    .filter((attempt) => isDue(attempt.nextReviewDateIso))
    .forEach((attempt) => {
      items.push({
        id: `assessment:${attempt.id}`,
        type: 'assessment',
        topic: weakTopicLabels[attempt.weakTopic] ?? attempt.domain,
        moduleId: attempt.recommendedModuleId,
        moduleTitle: attempt.domain,
        prompt: attempt.prompt,
        dueDateIso: attempt.nextReviewDateIso,
        reviewType: 'assessment'
      });
    });

  Object.values(progress.weakTopicReviews)
    .filter((review) => isDue(review.dueDateIso))
    .forEach((review) => {
      items.push({
        id: `weak:${review.topic}`,
        type: 'weak-topic',
        topic: weakTopicLabels[review.topic] ?? review.topic,
        moduleId: review.recommendedModuleId,
        moduleTitle: review.recommendedModuleId,
        prompt: `Weak-area reinforcement: ${weakTopicLabels[review.topic] ?? review.topic}`,
        dueDateIso: review.dueDateIso,
        reviewType: 'weak-topic'
      });
    });

  progress.scenarioRuns
    .filter((run) => run.revisitDueDateIso && isDue(run.revisitDueDateIso))
    .forEach((run) => {
      items.push({
        id: `scenario:${run.id}`,
        type: 'scenario-note',
        topic: run.weakTopic ?? 'Scenario note quality',
        moduleId: run.recommendedModuleId ?? '',
        moduleTitle: run.scenarioId,
        prompt: `Revisit scenario note quality for ${run.scenarioId}`,
        dueDateIso: run.revisitDueDateIso!,
        reviewType: 'scenario-note'
      });
    });

  return items.sort((a, b) => new Date(a.dueDateIso).getTime() - new Date(b.dueDateIso).getTime());
}
