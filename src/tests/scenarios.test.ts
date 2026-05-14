import { describe, expect, it } from 'vitest';
import { modules } from '../data/modules';
import { scenarios } from '../data/scenarios';
import {
  calculateScenarioNoteScore,
  getScenarioRecommendedModuleId,
  scenarioNoteRubric
} from '../lib/scenarioReview';

describe('scenario catalogue', () => {
  it('keeps scenario IDs and choice IDs unique', () => {
    const scenarioIds = scenarios.map((scenario) => scenario.id);
    expect(new Set(scenarioIds).size).toBe(scenarioIds.length);

    scenarios.forEach((scenario) => {
      const stepIds = scenario.steps.map((step) => step.id);
      expect(new Set(stepIds).size).toBe(stepIds.length);

      const choiceIds = scenario.steps.flatMap((step) => step.choices.map((choice) => choice.id));
      expect(new Set(choiceIds).size).toBe(choiceIds.length);
    });
  });

  it('maps every scenario revisit to an existing module', () => {
    const moduleIds = new Set(modules.map((module) => module.id));

    scenarios.forEach((scenario) => {
      const recommendedModuleId = getScenarioRecommendedModuleId(scenario.id);

      expect(recommendedModuleId, scenario.id).toBeTruthy();
      expect(moduleIds.has(recommendedModuleId!), scenario.id).toBe(true);
    });
  });

  it('calculates scenario note rubric scores after the self-check is completed', () => {
    expect(calculateScenarioNoteScore({})).toBe(0);

    const fullChecks = Object.fromEntries(scenarioNoteRubric.map((item) => [item.id, true]));
    expect(calculateScenarioNoteScore(fullChecks)).toBe(1);

    expect(calculateScenarioNoteScore({ symptom: true, privacy: true })).toBe(0.4);
  });
});
