export type ScenarioChoice = {
  id: string;
  label: string;
  outcome: string;
  riskNote: string;
  correct: boolean;
};

export type ScenarioStep = {
  id: string;
  title: string;
  prompt: string;
  choices: ScenarioChoice[];
  newInformation?: string;
};

export type ScenarioRunChoice = {
  stepId: string;
  choiceId: string;
  correct: boolean;
};

export type ScenarioRun = {
  id: string;
  scenarioId: string;
  startedAtIso: string;
  completedAtIso: string;
  stepChoices: ScenarioRunChoice[];
  completed: boolean;
};

export type Scenario = {
  id: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  initialReport: string;
  contextBullets: string[];
  steps: ScenarioStep[];
  idealTroubleshootingPath: string[];
  escalationPoint: string;
  riskNote: string;
  ticketNoteExample: string;
};
