import { weakTopicLabels } from '../data/skillDomains';
import type { UserProgress } from './progress';

export type DashboardRecommendation = {
  title: string;
  detail: string;
  ctaHref: string;
  ctaLabel: string;
};

export function getDashboardRecommendation(progress: UserProgress): DashboardRecommendation {
  const weakTopics = Object.values(progress.weakTopicReviews);
  if (weakTopics.length) {
    const lowest = weakTopics.reduce((current, next) => (next.averageScore < current.averageScore ? next : current));
    return {
      title: `Review ${weakTopicLabels[lowest.topic] ?? lowest.topic}`,
      detail: 'Focus on the weakest recorded area with a short supported module activity.',
      ctaHref: '/due-today',
      ctaLabel: 'Review due items'
    };
  }

  if (progress.assessmentAttempts.length) {
    return {
      title: 'Practice assessment review',
      detail: 'Use assessment questions to find the next weak topic and build evidence.',
      ctaHref: '/strict-quiz',
      ctaLabel: 'Start a quiz'
    };
  }

  return {
    title: 'Start with a module',
    detail: 'Open a core module to begin structured learning and build a progress baseline.',
    ctaHref: '/modules',
    ctaLabel: 'Browse modules'
  };
}

export function getCurrentWeakFocus(progress: UserProgress) {
  const weakReviews = Object.values(progress.weakTopicReviews);
  if (!weakReviews.length) {
    return 'Begin with a foundational module review.';
  }

  const weakest = weakReviews.reduce((current, next) => (next.averageScore < current.averageScore ? next : current));
  return weakTopicLabels[weakest.topic] ?? weakest.topic;
}
