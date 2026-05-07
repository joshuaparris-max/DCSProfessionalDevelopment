import { describe, expect, it } from 'vitest';
import { modules } from '../data/modules';
import { getDueReviewItems } from '../lib/dueReview';
import type { UserProgress } from '../lib/progress';

function isoInPast(hours = 1) {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

describe('due review aggregation', () => {
  it('merges flashcards, weak topics, scenario notes, practical outputs, and assessment attempts', () => {
    const trainingModule = modules[0];
    const flashcard = trainingModule.flashcards[0];
    const practical = trainingModule.practicalOutputs[0];

    const progress: UserProgress = {
      schemaVersion: 2,
      modules: {
        [trainingModule.id]: {
          sectionsRead: Object.fromEntries(trainingModule.sections.map((section) => [section.id, false])),
          flashcards: {
            [flashcard.id]: {
              state: 'learning',
              reviewCount: 1,
              dueDateIso: isoInPast()
            }
          },
          quizAttempts: [],
          practicalOutputs: Object.fromEntries(trainingModule.practicalOutputs.map((output) => [output.id, false]))
        }
      },
      assessmentAttempts: [
        {
          id: 'attempt-1',
          questionId: 'q1',
          questionType: 'mcq',
          prompt: 'Prompt',
          domain: 'Domain',
          weakTopic: 'ticket-quality',
          recommendedModuleId: trainingModule.id,
          source: 'strict-quiz',
          confidence: 1,
          answerSummary: 'A',
          reasoningSummary: 'R',
          judgementSummary: 'J',
          selfRating: { correctness: 1, reasoning: 1, judgement: 1 },
          scoreBreakdown: { correctness: 0.2, reasoning: 0.2, judgement: 0.2, total: 0.6, autoMarked: true },
          feedback: {
            correctness: 'c',
            reasoning: 'r',
            judgement: 'j',
            correctedConcept: 'm',
            nextReviewDateIso: isoInPast()
          },
          timestampIso: new Date().toISOString(),
          shouldRevisit: true,
          nextReviewDateIso: isoInPast()
        }
      ],
      weakTopicReviews: {
        'ticket-quality': {
          topic: 'ticket-quality',
          averageScore: 60,
          dueDateIso: isoInPast(),
          recommendedModuleId: trainingModule.id
        }
      },
      scenarioRuns: [
        {
          id: 'run-1',
          scenarioId: 'display-black-screen',
          startedAtIso: new Date().toISOString(),
          completedAtIso: new Date().toISOString(),
          stepChoices: [],
          noteScore: 0.5,
          revisitDueDateIso: isoInPast(),
          completed: true
        }
      ],
      pdLogEntries: [],
      dueReviewState: {},
      practicalOutputReviews: {
        [`${trainingModule.id}:${practical.id}`]: {
          completed: false,
          reviewCount: 1,
          dueDateIso: isoInPast()
        }
      },
      knowledgeBaseDrafts: {},
      evidencePackSettings: {
        includeCertificates: true,
        includeLinks: true,
        privacyReminderAccepted: false
      }
    };

    const due = getDueReviewItems(progress);
    const types = new Set(due.map((item) => item.type));

    expect(types.has('flashcard')).toBe(true);
    expect(types.has('assessment')).toBe(true);
    expect(types.has('weak-topic')).toBe(true);
    expect(types.has('scenario-note')).toBe(true);
    expect(types.has('practical-output')).toBe(true);
  });
});
