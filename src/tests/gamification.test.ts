import { describe, expect, it } from 'vitest';
import { modules } from '../data/modules';
import {
  deriveGamificationState,
  getGamificationSummary,
  getInitialGamificationState
} from '../lib/gamification';
import { getInitialProgressSnapshot } from '../lib/progress';

describe('gamification', () => {
  it('derives local points, streaks, and badges from progress', () => {
    const progress = getInitialProgressSnapshot(modules);
    const firstModule = modules[0];
    const firstPracticalOutput = firstModule.practicalOutputs[0];

    progress.pdLogEntries = [
      {
        id: 'pd-1',
        date: '2026-05-11',
        minutes: 25,
        type: 'module-study',
        title: 'Module study',
        resource: 'DCS Prep App',
        topic: 'Foundations',
        dcsRelevance: 'Level 1 support judgement',
        learned: 'Triage before changing settings',
        nextStep: 'Practice a scenario',
        evidenceLink: '',
        sensitiveConfirmed: true
      },
      {
        id: 'pd-2',
        date: '2026-05-12',
        minutes: 30,
        type: 'scenario',
        title: 'Scenario practice',
        resource: 'DCS Prep App',
        topic: 'Ticket notes',
        dcsRelevance: 'Cleaner escalation notes',
        learned: 'Capture exact scope and impact',
        nextStep: 'Review note rubric',
        evidenceLink: '',
        sensitiveConfirmed: true
      }
    ];
    progress.scenarioRuns = [
      {
        id: 'run-1',
        scenarioId: 'projector-no-display',
        startedAtIso: '2026-05-13T08:00:00.000Z',
        completedAtIso: '2026-05-13T08:12:00.000Z',
        stepChoices: [],
        noteScore: 0.9,
        completed: true
      }
    ];
    progress.modules[firstModule.id].sectionsRead[firstModule.sections[0].id] = true;
    progress.modules[firstModule.id].practicalOutputs = {
      [firstPracticalOutput.id]: true
    };

    const state = deriveGamificationState(
      progress,
      modules,
      getInitialGamificationState('2026-05-14T00:00:00.000Z'),
      { nowIso: '2026-05-14T00:00:00.000Z' }
    );
    const summary = getGamificationSummary(progress, modules, state);

    expect(summary.points).toBeGreaterThan(100);
    expect(summary.studyStreakDays).toBe(3);
    expect(summary.badges.find((badge) => badge.id === 'first-pd-log')?.earned).toBe(true);
    expect(summary.badges.find((badge) => badge.id === 'first-scenario')?.earned).toBe(true);
    expect(summary.badges.find((badge) => badge.id === 'strong-ticket-note')?.earned).toBe(true);
    expect(summary.badges.find((badge) => badge.id === 'first-practical-output')?.earned).toBe(true);
  });

  it('keeps original award dates when recalculating earned badges', () => {
    const progress = getInitialProgressSnapshot(modules);

    progress.pdLogEntries = [
      {
        id: 'pd-1',
        date: '2026-05-13',
        minutes: 10,
        type: 'reflection',
        resource: 'DCS Prep App',
        topic: 'Reflection',
        dcsRelevance: 'Study habit',
        learned: 'Small reviews count',
        nextStep: 'Continue tomorrow',
        evidenceLink: '',
        sensitiveConfirmed: true
      }
    ];

    const state = deriveGamificationState(
      progress,
      modules,
      {
        points: 0,
        studyStreakDays: 0,
        badges: {
          'first-pd-log': { awardedAtIso: '2026-05-10T00:00:00.000Z' }
        },
        lastCalculatedAtIso: '2026-05-10T00:00:00.000Z'
      },
      { nowIso: '2026-05-14T00:00:00.000Z' }
    );

    expect(state.badges['first-pd-log']?.awardedAtIso).toBe('2026-05-10T00:00:00.000Z');
  });
});
