import { beforeEach, describe, expect, it, vi } from 'vitest';
import { modules } from '../data/modules';
import { getStoredProgressSnapshot, STORAGE_VERSION } from '../lib/progress';

describe('progress storage migrations', () => {
  beforeEach(() => {
    const storage = new Map<string, string>();
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => {
          storage.set(key, value);
        },
        removeItem: (key: string) => {
          storage.delete(key);
        }
      }
    });
  });

  it('migrates legacy progress payloads to latest schema', () => {
    const legacyPayload = {
      modules: {},
      assessmentAttempts: [],
      weakTopicReviews: {},
      scenarioRuns: [
        {
          id: 'legacy-run',
          scenarioId: 'display-black-screen',
          startedAtIso: new Date().toISOString(),
          completedAtIso: new Date().toISOString(),
          stepChoices: [{ stepId: 'a', choiceId: 'b', correct: false }],
          completed: true
        }
      ],
      pdLogEntries: []
    };

    window.localStorage.setItem('dcsPrepProgress', JSON.stringify(legacyPayload));

    const migrated = getStoredProgressSnapshot(modules);

    expect(migrated.schemaVersion).toBe(STORAGE_VERSION);
    expect(migrated.dueReviewState).toBeDefined();
    expect(migrated.practicalOutputReviews).toBeDefined();
    expect(migrated.knowledgeBaseDrafts).toBeDefined();
    expect(migrated.evidencePackSettings).toBeDefined();
    expect(migrated.scenarioRuns[0]?.noteScore).toBeTypeOf('number');
  });

  it('creates defaults when storage is empty', () => {
    const snapshot = getStoredProgressSnapshot(modules);

    expect(snapshot.schemaVersion).toBe(STORAGE_VERSION);
    expect(Object.keys(snapshot.modules).length).toBeGreaterThan(0);
    expect(snapshot.assessmentAttempts).toEqual([]);
    expect(snapshot.scenarioRuns).toEqual([]);
    expect(snapshot.pdLogEntries).toEqual([]);
    expect(snapshot.evidencePackSettings.includeLinks).toBe(true);
  });
});
