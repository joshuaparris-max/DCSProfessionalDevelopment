import { describe, expect, it } from 'vitest';
import { modules } from '../data/modules';

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
      expect(module.sections.length).toBeGreaterThanOrEqual(3);
      expect(module.flashcards.length).toBeGreaterThanOrEqual(8);
      expect(module.quiz.length).toBeGreaterThanOrEqual(4);
      expect(module.scenarioPrompts.length).toBeGreaterThanOrEqual(1);
      expect(module.practicalOutputs.length).toBeGreaterThanOrEqual(1);
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
});
