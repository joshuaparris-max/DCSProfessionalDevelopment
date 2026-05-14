import { describe, expect, it } from 'vitest';
import { academicAssessmentSummaries } from '../data/academicAssessmentSummaries';
import { academicSubjects } from '../data/academicSubjects';

describe('academic PD subject pages', () => {
  it('has a full subject page for every extracted SLG assessment summary', () => {
    const subjectCodes = new Set(academicSubjects.map((subject) => subject.id));

    Object.keys(academicAssessmentSummaries).forEach((summaryCode) => {
      expect(subjectCodes.has(summaryCode), summaryCode).toBe(true);
    });
  });

  it('turns extracted assessment tasks into interactive topic practice', () => {
    Object.entries(academicAssessmentSummaries).forEach(([summaryCode, summary]) => {
      const subject = academicSubjects.find((candidate) => candidate.id === summaryCode);

      expect(subject?.assessmentSections?.[0]?.tasks.length, summaryCode).toBe(summary.tasks.length);
    });
  });

  it('turns overview-only subject summaries into assessment-driven topic boxes', () => {
    ['cse1oof', 'cse4002', 'cse5006', 'cse5bdc', 'cse5dl', 'cse5ml', 'cse5nlp', 'cse5cv'].forEach((summaryCode) => {
      const summary = academicAssessmentSummaries[summaryCode];
      const subject = academicSubjects.find((candidate) => candidate.id === summaryCode);

      expect(subject?.weeklyModules?.length, summaryCode).toBe(summary.tasks.length);

      subject?.weeklyModules?.forEach((weeklyModule) => {
        expect(weeklyModule.assessment.prompt, weeklyModule.id).toContain('privacy-safe DCSPrep artifact');
        expect(weeklyModule.assessment.evidenceOutput, weeklyModule.id).toBeTruthy();
        expect(weeklyModule.relatedDcsModuleIds.length, weeklyModule.id).toBeGreaterThan(0);
      });
    });
  });

  it('includes the new CSE1OOF and SMITB subject pages', () => {
    expect(academicSubjects.map((subject) => subject.id)).toEqual(
      expect.arrayContaining(['cse1oof', 'cse4002', 'cse5006', 'cse5bdc', 'cse5dl', 'cse5ml', 'cse5nlp', 'cse5cv'])
    );
  });
});
