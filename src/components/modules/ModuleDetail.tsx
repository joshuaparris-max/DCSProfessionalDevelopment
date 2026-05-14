"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { trackUsageInteraction } from '../../hooks/useUsageTracking';
import { getModuleCompletion } from '../../lib/moduleMath';
import {
  getStoredProgressSnapshot,
  saveProgress,
  type UserProgress,
  updateModulePracticalOutput
} from '../../lib/progress';
import type { AssessmentQuestion } from '../../types/assessment';
import type { TrainingModule } from '../../types/training';

const AssessmentSession = dynamic(() => import('../assessment/AssessmentSession'), {
  loading: () => (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-600">
      Loading assessment tools…
    </div>
  ),
  ssr: false
});

function renderMarkdownParagraphs(markdown: string) {
  return markdown.split(/\n\n+/).map((paragraph, index) => (
    <p key={index} className="mt-4 leading-7 text-slate-700">
      {paragraph}
    </p>
  ));
}

export default function ModuleDetail({
  moduleData,
  quizQuestions
}: {
  moduleData: TrainingModule;
  quizQuestions: AssessmentQuestion[];
}) {
  const [activeTab, setActiveTab] = useState<'Start Here' | 'Learn' | 'Review' | 'Assessment'>('Start Here');
  const [diagnosticResponses, setDiagnosticResponses] = useState<Record<string, string>>({});
  const [revealedDiagnostics, setRevealedDiagnostics] = useState<Record<string, boolean>>({});
  const [activeRecallRevealed, setActiveRecallRevealed] = useState(false);
  const [feynmanRubric, setFeynmanRubric] = useState({ clarity: 0, correctness: 0, relevance: 0 });
  const [progress, setProgress] = useState<UserProgress>(() => getStoredProgressSnapshot([moduleData]));
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const questions = quizQuestions;

  useEffect(() => {
    setProgress(getStoredProgressSnapshot([moduleData]));
    setHasHydratedProgress(true);
    trackUsageInteraction({
      eventType: 'module_open',
      route: `/modules/${moduleData.id}`,
      label: moduleData.title,
      contentType: 'module',
      contentId: moduleData.id,
      activityCategory: 'reading',
      metadata: { domain: moduleData.domain, level: moduleData.level, source: 'built-in' }
    });
  }, [moduleData]);

  useEffect(() => {
    trackUsageInteraction({
      eventType: 'module_section_view',
      route: `/modules/${moduleData.id}`,
      label: activeTab,
      contentType: 'module',
      contentId: moduleData.id,
      activityCategory:
        activeTab === 'Assessment'
          ? 'quiz'
          : activeTab === 'Review'
          ? 'retrieval'
          : activeTab === 'Learn'
          ? 'reading'
          : 'retrieval',
      metadata: { domain: moduleData.domain, level: moduleData.level, source: 'built-in' }
    });
  }, [activeTab, moduleData.domain, moduleData.id, moduleData.level]);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    saveProgress(progress);
  }, [hasHydratedProgress, progress]);

  const moduleProgress = progress.modules[moduleData.id] ?? {
    sectionsRead: {},
    flashcards: {},
    practicalOutputs: {}
  };

  const moduleCompletion = Math.round(getModuleCompletion(moduleData.id, progress, moduleData));

  function togglePracticalOutput(outputId: string) {
    setProgress((current) => {
      const currentCompleted = Boolean(current.modules[moduleData.id]?.practicalOutputs?.[outputId]);
      trackUsageInteraction({
        eventType: 'section_view',
        route: `/modules/${moduleData.id}`,
        label: 'Module practical output',
        contentType: 'module',
        contentId: moduleData.id,
        activityCategory: 'building',
        completed: !currentCompleted,
        metadata: { domain: moduleData.domain, source: 'built-in' }
      });
      return updateModulePracticalOutput(current, moduleData.id, outputId, !currentCompleted);
    });
  }

  const hasAssessment = questions.length > 0;
  const diagnosticQuestions = questions.slice(0, Math.min(2, questions.length));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const key = `module-study-technique:${moduleData.id}`;
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw) as { feynmanRubric?: { clarity: number; correctness: number; relevance: number } };
      if (parsed.feynmanRubric) {
        setFeynmanRubric(parsed.feynmanRubric);
      }
    } catch {
      // ignore invalid cache entries
    }
  }, [moduleData.id]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const key = `module-study-technique:${moduleData.id}`;
    window.localStorage.setItem(
      key,
      JSON.stringify({
        feynmanRubric,
        updatedAtIso: new Date().toISOString()
      })
    );
  }, [feynmanRubric, moduleData.id]);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Module detail</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{moduleData.title}</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">{moduleData.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1">{moduleData.domain}</span>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1">{moduleData.level}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
              {moduleData.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            Estimated {moduleData.estimatedMinutes} minutes · {moduleCompletion}% complete
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {(['Start Here', 'Learn', 'Review', 'Assessment'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm ${
                activeTab === tab ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
              } ${tab === 'Assessment' && !hasAssessment ? 'cursor-not-allowed opacity-60' : ''}`}
              disabled={tab === 'Assessment' && !hasAssessment}
            >
              {tab}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-600">
          {activeTab === 'Start Here'
            ? 'Begin with a short diagnostic before reading so the module starts with retrieval, not passive content.'
            : activeTab === 'Learn'
            ? 'Explore module learning outcomes, sections, flashcards, and practical outputs.'
            : activeTab === 'Review'
            ? 'Review the module with flashcards, prompts, and progress-oriented notes.'
            : 'Answer module-specific questions to lock in learning and capture review strength.'}
        </p>
      </section>

      {activeTab === 'Start Here' ? (
        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Diagnostic first</div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Start with what you would do</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Attempt the prompt first, then reveal the guided answer. This keeps the module question-first even when
                the explanation content sits later in the flow.
              </p>
            </div>

            {diagnosticQuestions.length ? (
              diagnosticQuestions.map((question, index) => {
                const isRevealed = Boolean(revealedDiagnostics[question.id]);

                return (
                  <article key={question.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Prompt {index + 1}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900">{question.prompt}</h3>
                    <textarea
                      value={diagnosticResponses[question.id] ?? ''}
                      onChange={(event) =>
                        setDiagnosticResponses((current) => ({
                          ...current,
                          [question.id]: event.target.value
                        }))
                      }
                      placeholder="Write your first response before revealing the guided answer."
                      className="mt-4 min-h-32 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                    />
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedDiagnostics((current) => ({
                            ...current,
                            [question.id]: !current[question.id]
                          }))
                        }
                        className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                      >
                        {isRevealed ? 'Hide guided answer' : 'Reveal guided answer'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('Learn')}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                      >
                        Continue to learn tab
                      </button>
                    </div>
                    {isRevealed ? (
                      <div className="mt-5 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
                        <div className="font-semibold text-slate-900">Guided answer</div>
                        <p className="mt-2 leading-7">{question.modelAnswer}</p>
                        <div className="mt-4 font-semibold text-slate-900">Why it matters</div>
                        <p className="mt-2 leading-7">{question.dcsContext}</p>
                      </div>
                    ) : null}
                  </article>
                );
              })
            ) : (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                This module does not yet include diagnostic prompts. Use the assessment tab once questions are added.
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Start here checklist</div>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="rounded-3xl bg-slate-50 p-4">Attempt the question before reading.</li>
                <li className="rounded-3xl bg-slate-50 p-4">Reveal the guided answer only after you commit to a response.</li>
                <li className="rounded-3xl bg-slate-50 p-4">Move into Learn once you know what you missed.</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick links</div>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveTab('Learn')}
                  className="block w-full rounded-3xl bg-slate-50 px-4 py-3 text-left"
                >
                  Open learning content
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('Assessment')}
                  className="block w-full rounded-3xl bg-slate-50 px-4 py-3 text-left disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!hasAssessment}
                >
                  {hasAssessment ? 'Start module assessment' : 'Assessment unavailable'}
                </button>
                <Link href="/due-today" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Review due items
                </Link>
              </div>
            </div>
          </aside>
        </section>
      ) : activeTab === 'Learn' ? (
        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">What you will learn</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.learningObjectives.map((objective) => (
                  <li key={objective} className="rounded-3xl bg-slate-50 p-4">
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Why this matters in DCS</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.dcsRelevance.map((point) => (
                  <li key={point} className="rounded-3xl bg-slate-50 p-4">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {moduleData.sourceSubjects?.length ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">Linked subject outcomes</h2>
                <div className="mt-4 space-y-4 text-sm text-slate-700">
                  {moduleData.sourceSubjects.map((subject) => (
                    <article key={subject.code} className="rounded-3xl bg-slate-50 p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                          {subject.code}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                          {subject.course}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-slate-900">{subject.title}</h3>
                      <p className="mt-2 leading-7 text-slate-600">{subject.alignmentNote}</p>
                      <p className="mt-2 text-xs text-slate-500">{subject.slgCurrency}</p>
                      <ul className="mt-4 space-y-2">
                        {subject.silos.map((silo) => (
                          <li key={silo} className="rounded-2xl bg-white px-4 py-3 text-slate-700">
                            {silo}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Module sections</h2>
              <div className="mt-4 space-y-6 text-sm text-slate-700">
                {moduleData.sections.map((section) => (
                  <article key={section.id} className="rounded-3xl bg-slate-50 p-6">
                    <h3 className="text-xl font-semibold text-slate-900">{section.title}</h3>
                    {renderMarkdownParagraphs(section.bodyMarkdown)}
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Flashcards</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.flashcards.map((card) => (
                  <div key={card.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="font-semibold text-slate-900">{card.front}</div>
                    <div className="mt-2 text-slate-600">{card.back}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick links</div>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <Link href="/due-today" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Review due items
                </Link>
                <Link href="/strict-quiz" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Retake quiz
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveTab('Assessment')}
                  className="w-full rounded-3xl bg-slate-50 px-4 py-3 text-left text-sm text-slate-700"
                  disabled={!hasAssessment}
                >
                  {hasAssessment ? 'Start module assessment' : 'Assessment unavailable'}
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Scenario prompts</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.scenarioPrompts.map((prompt) => (
                  <li key={prompt.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="font-semibold text-slate-900">{prompt.title}</div>
                    <div className="mt-2 text-slate-600">{prompt.prompt}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Practical outputs</h2>
              <p className="mt-2 text-sm text-slate-600">
                Mark each practical output when you have completed the task or drafted the evidence artifact.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.practicalOutputs.map((output) => {
                  const completed = Boolean(moduleProgress.practicalOutputs?.[output.id]);
                  return (
                    <li key={output.id} className="rounded-3xl bg-slate-50 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold text-slate-900">{output.title}</div>
                          <div className="mt-2 text-slate-600">{output.description}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => togglePracticalOutput(output.id)}
                          className={`rounded-full px-4 py-2 text-sm ${
                            completed
                              ? 'bg-emerald-900 text-white'
                              : 'border border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {completed ? 'Completed' : 'Mark completed'}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </section>
      ) : activeTab === 'Review' ? (
        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Review this module</h2>
              <p className="mt-3 text-sm text-slate-600">
                Revisit core concepts and practice recall with module-specific review tools.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Flashcard review</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.flashcards.map((card) => (
                  <div key={card.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="font-semibold text-slate-900">{card.front}</div>
                    <div className="mt-2 text-slate-600">{card.back}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Scenario review</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.scenarioPrompts.map((prompt) => (
                  <li key={prompt.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="font-semibold text-slate-900">{prompt.title}</div>
                    <div className="mt-2 text-slate-600">{prompt.prompt}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">What to revisit</h2>
              <p className="mt-3 text-sm text-slate-700">
                Review the module’s core themes: questions, judgement, and safe escalation.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.learningObjectives.map((objective) => (
                  <li key={objective} className="rounded-3xl bg-slate-50 p-4">{objective}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Feynman explain-back</h2>
              <p className="mt-3 text-sm text-slate-700">
                Explain this module as if teaching a new L1 tech in under 90 seconds: what it is, when it appears in
                school support, and what to escalate.
              </p>
              <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                Prompt: “If {moduleData.title} fails during class time, what are the first safe checks, what evidence
                should be captured, and when should you escalate?”
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveRecallRevealed((current) => !current)}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                >
                  {activeRecallRevealed ? 'Hide rubric hints' : 'Reveal rubric hints'}
                </button>
              </div>
              {activeRecallRevealed ? (
                <div className="mt-4 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-900">
                  Active Recall mode: keep hints hidden until after your first attempt, then score your response.
                </div>
              ) : null}
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {(
                  [
                    ['clarity', 'Clarity'],
                    ['correctness', 'Correctness'],
                    ['relevance', 'Practical relevance']
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    <div className="font-semibold text-slate-900">{label}</div>
                    <select
                      value={feynmanRubric[key]}
                      onChange={(event) =>
                        setFeynmanRubric((current) => ({
                          ...current,
                          [key]: Number(event.target.value)
                        }))
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                    >
                      <option value={0}>Needs work</option>
                      <option value={1}>Developing</option>
                      <option value={2}>Strong</option>
                    </select>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Concept-sorting drill</h2>
              <p className="mt-3 text-sm text-slate-700">
                Sort these categories before opening tools: <strong>System</strong>, <strong>Symptom</strong>,{' '}
                <strong>Owner</strong>, <strong>Escalation boundary</strong>.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="rounded-2xl bg-slate-50 px-4 py-3">System: Which platform or service is involved?</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Symptom: What exactly is observable?</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Owner: Who has authority to change this safely?</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">
                  Escalation: What evidence tells you to hand off now?
                </li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Memory tools (mnemonic + sheet)</h2>
              <p className="mt-3 text-sm text-slate-700">
                Build a short mnemonic for this module and capture a one-page memory sheet with commands, checks, and
                escalation phrases.
              </p>
              <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                Template: Trigger phrase / First checks / Do-not-do actions / Escalation sentence.
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Cornell + SQ3R reflection</h2>
              <p className="mt-3 text-sm text-slate-700">
                Use Cornell notes on the left for cues and questions, right side for key ideas, and finish with a
                3-line summary. For source reading: Survey, Question, Read, Recite, Review.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Survey: Scan the section titles and key terms.</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Question: Write 3 retrieval questions before reading.</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Read + Recite: Answer from memory, then check.</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Review: Tag weak points for strict quiz revisit.</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Review actions</div>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveTab('Assessment')}
                  className="block w-full rounded-3xl bg-slate-50 px-4 py-3 text-left text-sm text-slate-700"
                  disabled={!hasAssessment}
                >
                  {hasAssessment ? 'Go to assessment' : 'Assessment unavailable'}
                </button>
                <Link href="/due-today" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Review due items
                </Link>
                <Link href="/strict-quiz" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Retake strict quiz
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Review notes</h2>
              <p className="mt-3 text-sm text-slate-600">
                Focus on the module’s key actions and judgement patterns rather than memorizing every detail.
              </p>
            </div>
          </aside>
        </section>
      ) : (
        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Module assessment</h2>
              <p className="mt-3 text-sm text-slate-600">
                Practice with module-specific questions that map back to the same topics and judgement style used in DCS review.
              </p>
            </div>

            {hasAssessment ? (
              <AssessmentSession
                questions={questions}
                source="module-quiz"
                title={`${moduleData.title} assessment`}
                description="Answer each prompt, review the model response, and use self-rating to capture weakness for later review."
              />
            ) : (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                This module does not yet include assessment questions.
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Module quick actions</div>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <Link href="/due-today" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Review due items
                </Link>
                <Link href="/strict-quiz" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Retake strict quiz
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Assessment notes</h2>
              <p className="mt-3 text-sm text-slate-600">
                The assessment experience is built to help you reflect on risk, judgement, and technical reasoning for this module.
              </p>
            </div>
          </aside>
        </section>
      )}
    </div>
  );
}
