import { weakTopicLabels } from '../data/skillDomains';
import { weakTopicCoaching } from '../data/supportCoach';
import type { WeakTopicKey } from '../types/assessment';
import type { UserProgress } from './progress';
import { isDue } from './spacedRepetition';

export type WeakAreaSignal = {
  topic: WeakTopicKey;
  label: string;
  priorityScore: number;
  evidenceCount: number;
  reasons: string[];
  dcsWhyItMatters: string;
  nextBestAction: string;
  recommendedHref: string;
  practicePrompt: string;
  safeBoundary: string;
};

const ALL_TOPICS = Object.keys(weakTopicLabels) as WeakTopicKey[];

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function topicScoreFromAttempts(progress: UserProgress, topic: WeakTopicKey) {
  const attempts = progress.assessmentAttempts.filter((attempt) => attempt.weakTopic === topic).slice(0, 10);
  const averagePercent = average(attempts.map((attempt) => attempt.scoreBreakdown.total * 100));
  const dueCount = attempts.filter((attempt) => isDue(attempt.nextReviewDateIso)).length;
  const revisitCount = attempts.filter((attempt) => attempt.shouldRevisit).length;

  return {
    attempts,
    averagePercent,
    dueCount,
    revisitCount
  };
}

export function getWeakAreaSignals(progress: UserProgress): WeakAreaSignal[] {
  return ALL_TOPICS.map((topic) => {
    const review = progress.weakTopicReviews[topic];
    const attemptSignal = topicScoreFromAttempts(progress, topic);
    const coaching = weakTopicCoaching[topic];
    const reasons: string[] = [];

    const evidenceCount = attemptSignal.attempts.length + (review ? review.reviewCount : 0);
    const reviewAverage = review?.averageScore ?? attemptSignal.averagePercent;
    const knownAverage = reviewAverage || attemptSignal.averagePercent;
    const weaknessFromScore = evidenceCount ? Math.max(0, 100 - knownAverage) : 15;
    const duePressure = attemptSignal.dueCount * 8;
    const revisitPressure = attemptSignal.revisitCount * 5;
    const lowEvidencePressure = evidenceCount < 2 ? 8 : 0;

    if (!evidenceCount) {
      reasons.push('No real practice evidence recorded yet.');
    }

    if (knownAverage && knownAverage < 75) {
      reasons.push(`Average evidence score is ${Math.round(knownAverage)}%.`);
    }

    if (attemptSignal.dueCount) {
      reasons.push(`${attemptSignal.dueCount} due review item${attemptSignal.dueCount === 1 ? '' : 's'} waiting.`);
    }

    if (attemptSignal.revisitCount) {
      reasons.push(`${attemptSignal.revisitCount} answer${attemptSignal.revisitCount === 1 ? '' : 's'} marked for revisit.`);
    }

    const priorityScore = Number(
      Math.min(100, weaknessFromScore + duePressure + revisitPressure + lowEvidencePressure).toFixed(1)
    );

    return {
      topic,
      label: weakTopicLabels[topic],
      priorityScore,
      evidenceCount,
      reasons: reasons.length ? reasons : ['Current evidence looks stable, but this remains part of the DCS support skill map.'],
      dcsWhyItMatters: coaching.dcsWhyItMatters,
      nextBestAction: coaching.nextBestAction,
      recommendedHref: coaching.recommendedHref,
      practicePrompt: coaching.practicePrompt,
      safeBoundary: coaching.safeBoundary
    };
  }).sort((left, right) => right.priorityScore - left.priorityScore);
}

export function getNextBestAction(progress: UserProgress) {
  const [top] = getWeakAreaSignals(progress);

  if (!top) {
    return {
      title: 'Start with one strict quiz',
      detail: 'No weak-area evidence exists yet. Complete one assessment session so the app can recommend a sharper next action.',
      href: '/strict-quiz',
      ctaLabel: 'Start assessment'
    };
  }

  return {
    title: `Focus on ${top.label}`,
    detail: `${top.nextBestAction} ${top.reasons[0]}`,
    href: top.recommendedHref,
    ctaLabel: 'Start recommended practice',
    signal: top
  };
}
