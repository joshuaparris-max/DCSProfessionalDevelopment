import { weakTopicLabels } from '../data/skillDomains';
import type { UserProgress } from './progress';

export type ReadinessScore = {
  id: string;
  label: string;
  note: string;
  score: number;
};

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getAssessmentAverage(progress: UserProgress): number | null {
  if (!progress.assessmentAttempts.length) {
    return null;
  }

  const scored = progress.assessmentAttempts.map((attempt) => attempt.scoreBreakdown.total * 100);
  return scored.reduce((sum, value) => sum + value, 0) / scored.length;
}

function getWeakTopicAverage(progress: UserProgress): number | null {
  const reviews = Object.values(progress.weakTopicReviews);
  if (!reviews.length) {
    return null;
  }

  return reviews.reduce((sum, review) => sum + review.averageScore, 0) / reviews.length;
}

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

export function getReadinessProfile(category: 'aPlus' | 'level2' | 'schoolItManager', progress: UserProgress) {
  const assessmentAverage = getAssessmentAverage(progress);
  const weakAverage = getWeakTopicAverage(progress);
  const assessmentEvidence = progress.assessmentAttempts.length >= 5;
  const weakEvidence = Object.keys(progress.weakTopicReviews).length >= 2;
  const evidenceBacked = assessmentEvidence && weakEvidence;

  const blendedAssessment = assessmentAverage ?? 48;
  const blendedWeak = weakAverage ?? 52;
  const base = (blendedAssessment + blendedWeak) / 2;

  const evidenceNote = evidenceBacked
    ? 'Grounded in recorded quiz attempts (≥5) and weak-topic reviews (≥2).'
    : 'Estimate until more quiz attempts and weak-topic reviews exist—scores blend conservative placeholders where data is missing.';

  if (category === 'aPlus') {
    return [
      {
        id: 'fundamentals',
        label: 'Fundamentals',
        note: `${evidenceNote} Weighted from assessment + weak-topic averages.`,
        score: clampScore(base * 0.9)
      },
      {
        id: 'technical-accuracy',
        label: 'Technical accuracy',
        note: `${evidenceNote} Emphasises practical troubleshooting signals.`,
        score: clampScore(base * 0.95)
      },
      {
        id: 'documentation',
        label: 'Documentation quality',
        note: `${evidenceNote} Still light without structured scenario-note scoring—use PD log + Scenario Lab consistently.`,
        score: clampScore(base * 0.8)
      }
    ];
  }

  if (category === 'level2') {
    return [
      {
        id: 'networking-depth',
        label: 'Networking depth',
        note: `${evidenceNote} Maps to networking-heavy quiz topics.`,
        score: clampScore(base * 0.85)
      },
      {
        id: 'escalation-judgement',
        label: 'Escalation judgement',
        note: `${evidenceNote} Influenced by scenario + ticket-quality question performance.`,
        score: clampScore(base * 0.8)
      },
      {
        id: 'endpoint-operations',
        label: 'Endpoint operations',
        note: `${evidenceNote} Reflects printer/display/device question patterns.`,
        score: clampScore(base * 0.9)
      }
    ];
  }

  return [
    {
      id: 'strategic-awareness',
      label: 'Strategic awareness',
      note: `${evidenceNote} Broad situational judgement from mixed assessments.`,
      score: clampScore(base * 0.8)
    },
    {
      id: 'privacy-risk',
      label: 'Privacy & risk',
      note: `${evidenceNote} Reinforced when privacy/security questions score well.`,
      score: clampScore(base * 0.85)
    },
    {
      id: 'process-adaptability',
      label: 'Process adaptability',
      note: `${evidenceNote} Strengthens as PD log + modules show sustained engagement.`,
      score: clampScore(base * 0.75)
    }
  ];
}
