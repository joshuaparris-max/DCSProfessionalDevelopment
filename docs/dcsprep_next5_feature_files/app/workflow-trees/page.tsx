"use client";

import { useState } from 'react';
import { ownershipAreas, workflowTrees } from '../../src/data/supportCoach';
import { getWorkflowStep, getWorkflowTree } from '../../src/lib/workflowTrees';

export default function WorkflowTreesPage() {
  const [treeId, setTreeId] = useState(workflowTrees[0]?.id || '');
  const tree = getWorkflowTree(treeId);
  const [stepId, setStepId] = useState(tree.startingStepId);
  const [history, setHistory] = useState<string[]>([]);
  const step = getWorkflowStep(tree.id, stepId);
  const ownership = ownershipAreas.find((area) => area.id === tree.ownerAreaId);

  function selectTree(nextTreeId: string) {
    const nextTree = getWorkflowTree(nextTreeId);
    setTreeId(nextTree.id);
    setStepId(nextTree.startingStepId);
    setHistory([]);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">DCS workflow decision trees</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Practise safe first-line flow</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            These are short interactive support flows. Each one teaches first-line triage, evidence capture,
            ownership boundaries, and the final ticket note.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-3">
          {workflowTrees.map((entry) => (
            <button
              key={entry.id}
              onClick={() => selectTree(entry.id)}
              className={`w-full rounded-[2rem] border p-5 text-left shadow-sm ${
                entry.id === tree.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <div className="text-xs uppercase tracking-[0.2em] opacity-70">Decision tree</div>
              <div className="mt-3 text-lg font-semibold">{entry.title}</div>
              <p className="mt-2 text-sm leading-6 opacity-80">{entry.summary}</p>
            </button>
          ))}
        </aside>

        <main className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              {tree.relatedWeakTopics.map((topic) => (
                <span key={topic} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{topic}</span>
              ))}
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{tree.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{tree.summary}</p>
            {ownership ? (
              <div className="mt-4 rounded-3xl bg-amber-50 p-4 text-sm leading-7 text-amber-950">
                <span className="font-semibold">Boundary:</span> {ownership.joshRole}
              </div>
            ) : null}
          </section>

          {step ? (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Current step</div>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{step.prompt}</p>

              <div className="mt-5 space-y-3">
                {step.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => {
                      setHistory((current) => [...current, `${choice.label}: ${choice.outcome}`]);
                      if (choice.nextStepId) {
                        setStepId(choice.nextStepId);
                      }
                    }}
                    className={`w-full rounded-3xl border p-5 text-left ${
                      choice.recommended ? 'border-emerald-200 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="font-semibold">{choice.label}</div>
                    <p className="mt-2 text-sm leading-6 opacity-80">{choice.outcome}</p>
                  </button>
                ))}
              </div>

              {step.finalNote ? (
                <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                  <span className="font-semibold text-slate-900">Final decision point:</span> {step.finalNote}
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setStepId(tree.startingStepId);
                    setHistory([]);
                  }}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                >
                  Restart this tree
                </button>
              </div>
            </section>
          ) : null}

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Model ticket note</h3>
            <p className="mt-3 rounded-3xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{tree.modelTicketNote}</p>

            <h3 className="mt-6 text-xl font-semibold text-slate-900">Your path this run</h3>
            {history.length ? (
              <ol className="mt-3 space-y-2 text-sm text-slate-700">
                {history.map((item, index) => <li key={`${item}-${index}`}>{index + 1}. {item}</li>)}
              </ol>
            ) : (
              <p className="mt-3 text-sm text-slate-600">No choices made yet.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
