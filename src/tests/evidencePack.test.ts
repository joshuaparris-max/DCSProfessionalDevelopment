import { describe, expect, it } from 'vitest';
import { buildEvidencePackMarkdown } from '../lib/evidencePack';
import { buildMonthlyPdMarkdown } from '../lib/exportMarkdown';
import { getMonthKey } from '../lib/pdSummary';
import type { UserProgress } from '../lib/progress';

const monthKey = getMonthKey(new Date());
const progressBase = {
  schemaVersion: 2,
  modules: {},
  assessmentAttempts: [],
  weakTopicReviews: {},
  scenarioRuns: [],
  pdLogEntries: [
    {
      id: 'pd-log-1',
      date: `${monthKey}-15`,
      minutes: 25,
      type: 'reflection',
      resource: 'Scenario Lab',
      topic: 'Scenario practice',
      dcsRelevance: 'Practice escalation notes',
      learned: 'I identified the correct escalation point.',
      reflection: 'This helped me notice the importance of clear scope.',
      nextStep: 'Review ticket note rubric.',
      evidenceLink: 'https://example.com/reflection',
      moduleIds: ['rbc-cse1icb-cybersecurity-awareness'],
      scenarioIds: ['display-black-screen'],
      weakTopicsTouched: ['scenario-note-quality'],
      weakTopicsImproved: ['scenario-note-quality'],
      templateId: 'ticket-reflection',
      sensitiveConfirmed: true
    }
  ],
  dueReviewState: {},
  practicalOutputReviews: {},
  knowledgeBaseDrafts: {},
  evidencePackSettings: {
    includeCertificates: true,
    includeLinks: true,
    privacyReminderAccepted: true
  }
} as UserProgress;

describe('manager-safe markdown exports', () => {
  it('includes reflection content in the monthly PD markdown', () => {
    const markdown = buildMonthlyPdMarkdown(progressBase);

    expect(markdown).toContain('**Reflection:** This helped me notice the importance of clear scope.');
    expect(markdown).toContain('**What I learned:** I identified the correct escalation point.');
    expect(markdown).toContain('**Next step:** Review ticket note rubric.');
  });

  it('includes evidence links when includeLinks is enabled', () => {
    const markdown = buildEvidencePackMarkdown(progressBase, monthKey);

    expect(markdown).toContain('- Include optional links: Yes');
    expect(markdown).toContain('- **Evidence:** https://example.com/reflection');
  });

  it('omits raw evidence links when includeLinks is disabled', () => {
    const progressWithoutLinks = {
      ...progressBase,
      evidencePackSettings: {
        ...progressBase.evidencePackSettings,
        includeLinks: false
      }
    };
    const markdown = buildEvidencePackMarkdown(progressWithoutLinks, monthKey);

    expect(markdown).toContain('- Include optional links: No');
    expect(markdown).toContain('(links omitted as requested)');
  });
});
