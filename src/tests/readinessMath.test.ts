import { describe, expect, it } from 'vitest';
import { getReadinessProfile } from '../lib/readinessMath';
import type { UserProgress } from '../lib/progress';

function buildProgress(noteScore?: number): UserProgress {
  return {
    schemaVersion: 2,
    modules: {},
    assessmentAttempts: [
      {
        id: 'a1',
        questionId: 'q1',
        questionType: 'mcq',
        prompt: 'Prompt',
        domain: 'Domain',
        weakTopic: 'ticket-quality',
        recommendedModuleId: 'dcs-it-support-foundations',
        source: 'strict-quiz',
        confidence: 1,
        answerSummary: 'summary',
        reasoningSummary: 'reasoning',
        judgementSummary: 'judgement',
        selfRating: { correctness: 1, reasoning: 1, judgement: 1 },
        scoreBreakdown: { correctness: 0.3, reasoning: 0.3, judgement: 0.3, total: 0.9, autoMarked: true },
        feedback: {
          correctness: 'ok',
          reasoning: 'ok',
          judgement: 'ok',
          correctedConcept: 'ok',
          nextReviewDateIso: new Date().toISOString()
        },
        timestampIso: new Date().toISOString(),
        shouldRevisit: false,
        nextReviewDateIso: new Date().toISOString()
      }
    ],
    weakTopicReviews: {
      'ticket-quality': {
        topic: 'ticket-quality',
        averageScore: 82,
        dueDateIso: new Date().toISOString(),
        recommendedModuleId: 'dcs-it-support-foundations'
      },
      'ports-protocols': {
        topic: 'ports-protocols',
        averageScore: 79,
        dueDateIso: new Date().toISOString(),
        recommendedModuleId: 'ports-and-protocols'
      }
    },
    scenarioRuns:
      noteScore === undefined
        ? []
        : [
            {
              id: 's1',
              scenarioId: 'display-black-screen',
              startedAtIso: new Date().toISOString(),
              completedAtIso: new Date().toISOString(),
              stepChoices: [],
              noteScore,
              completed: true
            }
          ],
    pdLogEntries: [],
    dueReviewState: {},
    practicalOutputReviews: {},
    knowledgeBaseDrafts: {},
    evidencePackSettings: {
      includeCertificates: true,
      includeLinks: true,
      privacyReminderAccepted: false
    }
  };
}

describe('readiness math', () => {
  it('uses scenario note evidence in score blending', () => {
    const withoutScenario = getReadinessProfile('aPlus', buildProgress(undefined));
    const withScenario = getReadinessProfile('aPlus', buildProgress(1));
    const withoutAverage = withoutScenario.reduce((sum, row) => sum + row.score, 0) / withoutScenario.length;
    const withAverage = withScenario.reduce((sum, row) => sum + row.score, 0) / withScenario.length;

    expect(withAverage).toBeGreaterThan(withoutAverage);
  });
});
