"use client";

import { useEffect, useState } from 'react';
import { scenarios } from '../../src/data/scenarios';
import { mspTicketNoteCriteria } from '../../src/data/mspTransition';
import { trackUsageInteraction } from '../../src/hooks/useUsageTracking';
import {
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  saveProgress,
  saveScenarioRun,
  saveReflectionEntry,
  type UserProgress
} from '../../src/lib/progress';
import {
  calculateScenarioNoteScore,
  getScenarioRecommendedModuleId,
  scenarioNoteRubric
} from '../../src/lib/scenarioReview';
import type { ScenarioChoice, ScenarioRunChoice } from '../../src/types/scenarios';
import { MindfulnessPause } from '../../src/components/MindfulnessPause';
import { ReflectionJournal } from '../../src/components/ReflectionJournal';

export default function ScenariosPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0]?.id || '');
  const [stepIndex, setStepIndex] = useState(0);
  const [runChoices, setRunChoices] = useState<ScenarioRunChoice[]>([]);
  const [revealedChoice, setRevealedChoice] = useState<ScenarioChoice | null>(null);
  const [rubricSelfCheck, setRubricSelfCheck] = useState<Record<string, boolean>>({});
  const [ticketNoteDraft, setTicketNoteDraft] = useState('');
  const [scenarioSaved, setScenarioSaved] = useState(false);

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
  const currentNoteScore = calculateScenarioNoteScore(rubricSelfCheck);
  const currentNoteScorePercent = Math.round(currentNoteScore * 100);

  function restartScenario(nextScenarioId = scenario.id) {
    setSelectedScenarioId(nextScenarioId);
    setStepIndex(0);
    setRunChoices([]);
    setRevealedChoice(null);
    setRubricSelfCheck({});
    setTicketNoteDraft('');
    setScenarioSaved(false);
    const nextScenario = scenarios.find((entry) => entry.id === nextScenarioId);
    trackUsageInteraction({
      eventType: 'scenario_open',
      route: '/scenarios',
      label: nextScenario?.title,
      contentType: 'scenario',
      contentId: nextScenarioId,
      activityCategory: 'scenario',
      metadata: { source: 'built-in' }
    });
  }

  function handleSaveReflection(entry: { content: string; emotions: string[] }) {
    if (!scenario || !progress) return;
    const newProgress = saveReflectionEntry(progress, scenario.id, entry);
    saveProgress(newProgress);
    setProgress(newProgress);
  }

  function handleChoice(choice: ScenarioChoice) {
    setRevealedChoice(choice);
    trackUsageInteraction({
      eventType: 'scenario_step_choice',
      route: '/scenarios',
      label: currentStep?.title,
      contentType: 'scenario',
      contentId: scenario.id,
      activityCategory: 'scenario',
      completed: Boolean(choice.correct),
      score: choice.correct ? 1 : 0,
      metadata: { source: 'built-in' }
    });
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
      setRunChoices(nextChoices);
      setStepIndex(stepIndex + 1);
      setRevealedChoice(null);
      return;
    }

    setRunChoices(nextChoices);
    setStepIndex(stepIndex + 1);
    setRevealedChoice(null);
  }

  function saveScenarioResult() {
    if (!scenario || scenarioSaved) {
      return;
    }

    const noteScore = calculateScenarioNoteScore(rubricSelfCheck);
    const revisitDueDateIso =
      noteScore < 0.85 ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() : undefined;

    setProgress((current) =>
      saveScenarioRun(current, {
        id: `${scenario.id}-${Date.now()}`,
        scenarioId: scenario.id,
        startedAtIso: new Date().toISOString(),
        completedAtIso: new Date().toISOString(),
        stepChoices: runChoices,
        noteRubricChecks: rubricSelfCheck,
        noteScore,
        revisitDueDateIso,
        recommendedModuleId: getScenarioRecommendedModuleId(scenario.id),
        weakTopic: 'scenario-note-quality',
        completed: true
      })
    );
    trackUsageInteraction({
      eventType: 'scenario_completed',
      route: '/scenarios',
      label: scenario.title,
      contentType: 'scenario',
      contentId: scenario.id,
      activityCategory: 'scenario',
      completed: true,
      score: noteScore,
      metadata: { weakTopic: 'scenario-note-quality', source: 'built-in' }
    });
    setScenarioSaved(true);
  }

  if (!scenario) {
    return null;
  }

  const finished = stepIndex >= scenario.steps.length;
  const ticketNoteSignals = [
    {
      label: 'Scope or affected service',
      met: /\b(client|user|device|service|mailbox|backup|workstation|outlook|m365|site|server)\b/i.test(ticketNoteDraft)
    },
    {
      label: 'Impact or urgency',
      met: /\b(impact|urgent|blocked|affected|business|teaching|unable|failed|risk)\b/i.test(ticketNoteDraft)
    },
    {
      label: 'Checks completed',
      met: /\b(checked|confirmed|verified|tested|compared|scoped|reviewed)\b/i.test(ticketNoteDraft)
    },
    {
      label: 'Next action or escalation',
      met: /\b(next|escalat|awaiting|follow|review|handoff|monitor)\b/i.test(ticketNoteDraft)
    },
    {
      label: 'Privacy-safe wording',
      met: !/\b(password|secret|token|student name|staff name|ip address|credential)\b/i.test(ticketNoteDraft)
    }
  ];
  const ticketNoteSignalCount = ticketNoteSignals.filter((signal) => signal.met).length;
  const canLogScenario = ticketNoteDraft.trim().length >= 30 && ticketNoteSignalCount >= 4;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Missions</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              IT Support Missions
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Complete practical troubleshooting missions to build your support skills. 
              Each mission tests your triage, documentation, and technical judgement.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700 font-bold">
            {completedScenarios} Missions Accomplished
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Available Missions</div>
          {scenarios.map((entry) => (
            <button
              key={entry.id}
              onClick={() => restartScenario(entry.id)}
              className={`w-full rounded-[2rem] border p-6 text-left shadow-sm transition-all active:scale-95 group ${
                entry.id === scenario.id
                  ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-slate-400'
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${entry.id === scenario.id ? 'text-indigo-300' : 'text-slate-400'}`}>
                  {entry.missionType || 'Triage Mission'}
                </div>
                <div className="text-[10px] font-bold opacity-60">{entry.estimatedMinutes} min</div>
              </div>
              <div className="mt-4 text-xl font-bold leading-tight group-hover:text-indigo-500 transition-colors">{entry.title}</div>
              <p className={`mt-2 text-sm leading-relaxed ${entry.id === scenario.id ? 'opacity-80' : 'text-slate-500'}`}>{entry.summary}</p>
            </button>
          ))}
        </aside>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          {!finished ? (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {scenario.missionType || 'Triage Mission'}
                </div>
                <h2 className="mt-4 text-3xl font-bold text-slate-900">{scenario.initialReport}</h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {scenario.contextBullets.map((item) => (
                    <span key={item} className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-2 text-xs text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                    Step {stepIndex + 1} of {scenario.steps.length}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold">{currentStep?.title}</h3>
                  {currentStep?.newInformation ? (
                    <div className="mt-4 p-4 rounded-2xl bg-white/10 border border-white/10 text-sm leading-relaxed">
                      {currentStep.newInformation}
                    </div>
                  ) : null}
                  <p className="mt-6 text-lg text-slate-300">{currentStep?.prompt}</p>
                </div>
                <div className="absolute right-[-10px] top-[-10px] text-8xl opacity-10 select-none pointer-events-none">
                  🎯
                </div>
              </div>

              <div className="grid gap-3">
                {currentStep?.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoice(choice)}
                    className={`w-full rounded-3xl border p-6 text-left transition-all ${
                      revealedChoice?.id === choice.id
                        ? choice.correct 
                          ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg' 
                          : 'border-rose-500 bg-rose-500 text-white shadow-lg'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                        revealedChoice?.id === choice.id ? 'border-white' : 'border-slate-300'
                      }`}>
                        {revealedChoice?.id === choice.id ? (choice.correct ? '✓' : '✗') : ''}
                      </div>
                      <span className="font-medium">{choice.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {revealedChoice ? (
                <div className={`rounded-[2rem] border p-6 animate-in slide-in-from-bottom-4 duration-500 ${
                  revealedChoice.correct ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'
                }`}>
                  <div className={`text-sm font-bold uppercase tracking-widest ${
                    revealedChoice.correct ? 'text-emerald-700' : 'text-rose-700'
                  }`}>
                    {revealedChoice.correct ? 'Positive Outcome' : 'Risk Identified'}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{revealedChoice.outcome}</p>
                  {revealedChoice.riskNote && (
                    <div className="mt-4 p-3 rounded-xl bg-white/50 text-xs italic text-slate-600 border border-black/5">
                      Note: {revealedChoice.riskNote}
                    </div>
                  )}
                  <button
                    onClick={saveChoiceAndContinue}
                    className="mt-6 w-full rounded-full bg-slate-900 py-4 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-all active:scale-95"
                  >
                    Continue Mission ⚔️
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-slate-900">Mission Accomplished!</h2>
                <p className="mt-2 text-slate-500">You have successfully navigated the {scenario.title} mission.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 border border-slate-100 p-6 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">XP Earned</div>
                  <div className="mt-2 text-3xl font-bold text-indigo-600">+50 XP</div>
                </div>
                <div className="rounded-3xl bg-slate-50 border border-slate-100 p-6 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Attribute Up</div>
                  <div className="mt-2 text-xl font-bold text-slate-900">⚡ Agility +5</div>
                </div>
                <div className="rounded-3xl bg-slate-50 border border-slate-100 p-6 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Outcome</div>
                  <div className="mt-2 text-sm font-bold text-emerald-600">SUCCESS</div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
                <h3 className="text-xl font-bold text-slate-900">Mission Feedback</h3>
                <div className="mt-6 space-y-6">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Ideal Path</div>
                    <ul className="space-y-2">
                      {scenario.idealTroubleshootingPath.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-600">
                          <span className="text-indigo-500 font-bold">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                    <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">Escalation Boundary</div>
                    <p className="text-sm text-amber-800 leading-relaxed">{scenario.escalationPoint}</p>
                  </div>
                </div>
              </div>

              {!scenarioSaved ? (
                <div className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-8">
                  <h3 className="text-xl font-bold text-slate-900">MSP Ticket Note Coach</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Draft a short privacy-safe support note before logging this mission. The draft is used only for this
                    on-screen check and is not saved into your progress record.
                  </p>

                  <div className="mt-6 rounded-3xl border border-white bg-white/80 p-5">
                    <label htmlFor="ticket-note-draft" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Draft support note
                    </label>
                    <textarea
                      id="ticket-note-draft"
                      value={ticketNoteDraft}
                      onChange={(event) => setTicketNoteDraft(event.target.value)}
                      rows={5}
                      className="mt-3 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      placeholder="Example: Fictional client issue scoped to one workstation. Confirmed other devices working, checked adapter/IP/DNS symptoms, and escalating endpoint policy path with scope evidence."
                    />
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {ticketNoteSignals.map((signal) => (
                        <div
                          key={signal.label}
                          className={`rounded-2xl border px-3 py-2 text-xs font-semibold ${
                            signal.met
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                              : 'border-slate-200 bg-slate-50 text-slate-500'
                          }`}
                        >
                          {signal.met ? 'Met: ' : 'Missing: '}
                          {signal.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-3xl border border-white bg-white/80 p-5">
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-500">MSP criteria</div>
                      <ul className="mt-4 space-y-2">
                        {mspTicketNoteCriteria.map((criterion) => (
                          <li key={criterion} className="text-sm leading-6 text-slate-700">
                            - {criterion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl border border-white bg-white/80 p-5">
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Model note</div>
                      <p className="mt-4 text-sm leading-7 text-slate-700">{scenario.ticketNoteExample}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    {scenarioNoteRubric.map((check) => (
                      <button
                        key={check.id}
                        onClick={() =>
                          setRubricSelfCheck((prev) => ({
                            ...prev,
                            [check.id]: !prev[check.id]
                          }))
                        }
                        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                          rubricSelfCheck[check.id]
                            ? 'border-indigo-500 bg-white shadow-md'
                            : 'border-slate-200 bg-white/50 text-slate-500'
                        }`}
                      >
                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                          rubricSelfCheck[check.id] ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                        }`}>
                          {rubricSelfCheck[check.id] && '✓'}
                        </div>
                        <span className="text-sm font-medium">{check.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-700">Documentation Quality: {currentNoteScorePercent}%</div>
                      <div className="mt-1 text-xs font-semibold text-slate-500">
                        MSP note readiness: {ticketNoteSignalCount}/5 signals
                      </div>
                    </div>
                    <button
                      onClick={saveScenarioResult}
                      disabled={!canLogScenario}
                      className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none hover:bg-indigo-700"
                    >
                      Log Mission Results
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-[2rem] bg-emerald-600 p-8 text-white shadow-xl text-center">
                    <h3 className="text-2xl font-bold">Evidence Recorded!</h3>
                    <p className="mt-2 opacity-90 text-sm">Your career attributes and progress have been updated.</p>
                  </div>
                  
                  <ReflectionJournal 
                    scenarioId={scenario.id}
                    onSave={handleSaveReflection}
                  />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => restartScenario()}
                      className="flex-1 rounded-full border border-slate-200 bg-white py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      Retry Mission 🔄
                    </button>
                    <button
                      onClick={() => {
                        const nextIndex = (scenarios.indexOf(scenario) + 1) % scenarios.length;
                        restartScenario(scenarios[nextIndex].id);
                      }}
                      className="flex-1 rounded-full bg-slate-900 py-4 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-all"
                    >
                      Next Mission ⚔️
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
