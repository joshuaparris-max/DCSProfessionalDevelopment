import { describe, expect, it } from 'vitest';
import { academicSubjectAssessments } from '../data/academicSubjectAssessments';
import { modules } from '../data/modules';
import { strictQuestionBank } from '../data/questions';

describe('module catalogue', () => {
  it('includes the starter IT PD modules', () => {
    expect(modules.length).toBeGreaterThanOrEqual(10);

    expect(modules.map((module) => module.id)).toEqual(
      expect.arrayContaining([
        'dcs-it-support-foundations',
        'ports-and-protocols',
        'dns-dhcp-gateway-ip-basics',
        'printer-troubleshooting',
        'classroom-display-viewboard-troubleshooting',
        'm365-identity-offboarding-basics',
        'mdm-intune-group-policy-concepts',
        'vlans-network-segmentation',
        'cloud-models-saas-paas-iaas-daas',
        'ticket-notes-escalation-quality'
      ])
    );
  });

  it('keeps modules practical and fully populated', () => {
    modules.forEach((module) => {
      expect(module.sections.length, `${module.id} sections`).toBeGreaterThanOrEqual(3);
      expect(module.flashcards.length, `${module.id} flashcards`).toBeGreaterThanOrEqual(8);
      expect(module.quiz.length, `${module.id} quiz`).toBeGreaterThanOrEqual(1);
      expect(module.scenarioPrompts.length, `${module.id} scenarios`).toBeGreaterThanOrEqual(1);
      expect(module.practicalOutputs.length, `${module.id} outputs`).toBeGreaterThanOrEqual(1);
    });
  });

  it('uses the richer assessment metadata on module questions', () => {
    const question = modules[0]?.quiz[0];

    expect(question).toBeDefined();
    expect(question?.domain).toBeTruthy();
    expect(question?.difficulty).toBeTruthy();
    expect(question?.modelAnswer).toBeTruthy();
    expect(question?.commonMistakes.length).toBeGreaterThan(0);
    expect(question?.dcsContext).toBeTruthy();
    expect(question?.reviewSchedule).toBeTruthy();
  });

  it('exposes Professor Messer Core 2 video topics as individual modules', () => {
    const core2TopicModules = modules.filter((module) => module.id.startsWith('messer-core2-topic-'));

    expect(core2TopicModules.length).toBe(74);
    expect(modules.map((module) => module.id)).toEqual(
      expect.arrayContaining(['messer-core2-topic-file-systems', 'messer-core2-topic-scripting-use-cases'])
    );
    expect(modules.map((module) => module.title)).toEqual(
      expect.arrayContaining(['A+ Core 2: File Systems', 'A+ Core 2: Scripting Use Cases'])
    );

    const scriptingUseCases = modules.find((module) => module.id === 'messer-core2-topic-scripting-use-cases');
    expect(scriptingUseCases?.sections.length).toBeGreaterThanOrEqual(3);
    expect(scriptingUseCases?.flashcards.length).toBeGreaterThanOrEqual(8);
    expect(scriptingUseCases?.quiz.length).toBeGreaterThanOrEqual(4);
  });

  it('keeps recommended module IDs resolvable across assessment content', () => {
    const moduleIds = new Set(modules.map((module) => module.id));
    const moduleQuestions = modules.flatMap((module) => module.quiz);
    const academicQuestions = Object.values(academicSubjectAssessments).flat();

    [...moduleQuestions, ...strictQuestionBank, ...academicQuestions].forEach((question) => {
      expect(moduleIds.has(question.recommendedModuleId), question.id).toBe(true);
    });
  });

  it('includes the advanced technical depth called out in the TODO docs', () => {
    const modulesById = new Map(modules.map((module) => [module.id, module]));

    expect(modulesById.get('m365-identity-offboarding-basics')?.sections.map((section) => section.id)).toContain(
      'offboarding-4'
    );
    expect(modulesById.get('mdm-intune-group-policy-concepts')?.sections.map((section) => section.id)).toContain(
      'mdm-4'
    );
    expect(modulesById.get('vlans-network-segmentation')?.sections.map((section) => section.id)).toContain('vlan-4');
    expect(modulesById.get('cloud-models-saas-paas-iaas-daas')?.sections.map((section) => section.id)).toContain(
      'cloud-4'
    );
  });

  it('keeps DCS workflow modules at full scored-practice depth', () => {
    const dcsWorkflowModuleIds = [
      'parent-portal-registration',
      'parent-portal-details-updates',
      'sentral-support',
      'ourdcs-schoolbox-support',
      'login-password-support',
      'permissions-access-requests',
      'website-filtering-unblock-requests',
      'new-user-onboarding',
      'teams-sharepoint-onedrive-support',
      'ipad-jamf-workflow-basics',
      'device-imaging-deployment-workflows'
    ];

    dcsWorkflowModuleIds.forEach((moduleId) => {
      const moduleData = modules.find((module) => module.id === moduleId);

      expect(moduleData, moduleId).toBeDefined();
      expect(moduleData?.quiz.length, moduleId).toBeGreaterThanOrEqual(8);
      expect(moduleData?.flashcards.length, moduleId).toBeGreaterThanOrEqual(10);
    });
  });
});
