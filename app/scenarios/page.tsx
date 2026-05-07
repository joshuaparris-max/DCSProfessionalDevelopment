"use client";

import { useEffect, useState } from 'react';
import { scenarios } from '../../src/data/scenarios';
import {
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  saveProgress,
  saveScenarioRun,
  type UserProgress
} from '../../src/lib/progress';
import type { ScenarioChoice, ScenarioRunChoice } from '../../src/types/scenarios';

const noteRubric = [
  { id: 'symptom', label: 'Symptom clarity (exact observable behaviour)', weight: 0.25 },
  { id: 'scope', label: 'Scope (who/where/device counts)', weight: 0.2 },
  { id: 'steps', label: 'Steps tried + results captured', weight: 0.2 },
  { id: 'urgency', label: 'Urgency / learning impact stated', weight: 0.2 },
  { id: 'privacy', label: 'Privacy-safe wording (no secrets or unnecessary identifiers)', weight: 0.15 }
];

const scenarioRevisitModuleMap: Record<string, string> = {
  'display-black-screen': 'classroom-display-viewboard-troubleshooting',
  'classroom-wifi-no-internet': 'dns-dhcp-gateway-ip-basics',
  'staff-offboarding-m365-visibility': 'm365-identity-offboarding-basics',
  'printer-jobs-stuck': 'printer-troubleshooting'
};

export default function ScenariosPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0]?.id || '');
  const [stepIndex, setStepIndex] = useState(0);
  const [runChoices, setRunChoices] = useState<ScenarioRunChoice[]>([]);
  const [revealedChoice, setRevealedChoice] = useState<ScenarioChoice | null>(null);
  const [rubricSelfCheck, setRubricSelfCheck] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
    setHasHydratedProgress(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    saveProgress(progress);
  }, [hasHydratedProgress, progress]);

  const scenario = scenarios.find((entry) => entry.id === selectedScenarioId) || scenarios[0];

  const currentStep = scenario?.steps[stepIndex];
  const completedScenarios = progress.scenarioRuns.filter((run) => run.completed).length;
  const currentNoteScore = noteRubric.reduce(
    (sum, item) => sum + (rubricSelfCheck[item.id] ? item.weight : 0),
    0
  );
  const currentNoteScorePercent = Math.round(currentNoteScore * 100);

  function restartScenario(nextScenarioId = scenario.id) {
    setSelectedScenarioId(nextScenarioId);
    setStepIndex(0);
    setRunChoices([]);
    setRevealedChoice(null);
    setRubricSelfCheck({});
  }

  function handleChoice(choice: ScenarioChoice) {
    setRevealedChoice(choice);
  }

  function saveChoiceAndContinue() {
    if (!currentStep || !revealedChoice) {
      return;
    }

    const nextChoices = [
      ...runChoices,
      {
        stepId: currentStep.id,
        choiceId: revealedChoice.id,
        correct: Boolean(revealedChoice.correct)
      }
    ];

    if (stepIndex === scenario.steps.length - 1) {
      const noteScore = noteRubric.reduce((sum, item) => sum + (rubricSelfCheck[item.id] ? item.weight : 0), 0);
      const revisitDueDateIso =
        noteScore < 0.85 ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() : undefined;
      setProgress((current) =>
        saveScenarioRun(current, {
          id: `${scenario.id}-${Date.now()}`,
          scenarioId: scenario.id,
          startedAtIso: new Date().toISOString(),
          completedAtIso: new Date().toISOString(),
          stepChoices: nextChoices,
          noteRubricChecks: rubricSelfCheck,
          noteScore: Number(noteScore.toFixed(2)),
          revisitDueDateIso,
          recommendedModuleId: scenarioRevisitModuleMap[scenario.id],
          weakTopic: 'scenario-note-quality',
          completed: true
        })
      );
      setRunChoices(nextChoices);
      setStepIndex(stepIndex + 1);
      setRevealedChoice(null);
      return;
    }

    setRunChoices(nextChoices);
    setStepIndex(stepIndex + 1);
    setRevealedChoice(null);
  }

  if (!scenario) {
    return null;
  }

  const finished = stepIndex >= scenario.steps.length;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Scenario lab</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Scenario-based practice for DCS IT support
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use structured scenarios to review incident handling, decision sequencing, escalation boundaries, and
              documentation standards for common DCS support situations.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            {completedScenarios} scenario exercises recorded.
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-4">
          {scenarios.map((entry) => (
            <button
              key={entry.id}
              onClick={() => restartScenario(entry.id)}
              className={`w-full rounded-[2rem] border p-5 text-left shadow-sm ${
                entry.id === scenario.id
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <div className="text-xs uppercase tracking-[0.2em] opacity-70">{entry.estimatedMinutes} min</div>
              <div className="mt-3 text-xl font-semibold">{entry.title}</div>
              <p className="mt-2 text-sm leading-6 opacity-80">{entry.summary}</p>
            </button>
          ))}
        </aside>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          {!finished ? (
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{scenario.title}</div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">{scenario.initialReport}</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {scenario.contextBullets.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Step {stepIndex + 1} of {scenario.steps.length}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{currentStep?.title}</h3>
                {currentStep?.newInformation ? (
                  <p className="mt-3 text-sm leading-7 text-slate-700">{currentStep.newInformation}</p>
                ) : null}
                <p className="mt-3 text-sm leading-7 text-slate-700">{currentStep?.prompt}</p>
              </div>

              <div className="space-y-3">
                {currentStep?.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoice(choice)}
                    className={`w-full rounded-3xl border p-5 text-left ${
                      revealedChoice?.id === choice.id
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-800'
                    }`}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>

              {revealedChoice ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-slate-900">Outcome</div>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{revealedChoice.outcome}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    <span className="font-semibold text-slate-900">Risk note:</span> {revealedChoice.riskNote}
                  </p>
                  <button
                    onClick={saveChoiceAndContinue}
                    className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                  >
                    {stepIndex === scenario.steps.length - 1 ? 'Complete scenario' : 'Continue'}
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Scenario complete</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{scenario.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Compare your response with the recommended workflow and confirm that the escalation note remains
                  clear, concise, and appropriate for operational review.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="font-semibold text-slate-900">Ideal troubleshooting path</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {scenario.idealTroubleshootingPath.map((step) => (
                    <li key={step}>- {step}</li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="font-semibold text-slate-900">Escalation point</div>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{scenario.escalationPoint}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="font-semibold text-slate-900">Risk or privacy note</div>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{scenario.riskNote}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="font-semibold text-slate-900">Ticket note example</div>
                <p className="mt-3 text-sm leading-7 text-slate-700">{scenario.ticketNoteExample}</p>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="font-semibold text-emerald-900">Jira-style note rubric (self-check)</div>
                <p className="mt-2 text-sm leading-7 text-emerald-900">
                  Tick what your own draft note covered—this stays local and trains escalation muscle memory.
                </p>
                <div className="mt-3 rounded-2xl bg-white p-4 text-sm text-slate-700">
                  <div className="font-semibold text-slate-900">Weighted note score</div>
                  <p className="mt-2">{currentNoteScorePercent}% of note quality criteria met.</p>
                  <p className="mt-2 text-slate-600">
                    A strong escalation note should score 85% or higher. Lower scores suggest a second pass to add clarity, scope, or safe wording.
                  </p>
                </div>
                <div className="mt-4 space-y-3">
                  {noteRubric.map((item) => (
                    <label key={item.id} className="flex items-start gap-3 text-sm text-emerald-950">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-emerald-400"
                        checked={Boolean(rubricSelfCheck[item.id])}
                        onChange={() =>
                          setRubricSelfCheck((current) => ({
                            ...current,
                            [item.id]: !current[item.id]
                          }))
                        }
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={() => restartScenario()} className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
                Restart scenario
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
