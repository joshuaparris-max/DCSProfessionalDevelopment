"use client";

import { useEffect, useState } from 'react';
import { modules } from '../../src/data/modules';
import { scenarios } from '../../src/data/scenarios';
import { weakTopicLabels } from '../../src/data/skillDomains';
import { buildMonthlyPdMarkdown } from '../../src/lib/exportMarkdown';
import { trackUsageInteraction } from '../../src/hooks/useUsageTracking';
import { getCurrentWeakFocus } from '../../src/lib/readinessMath';
import { getMonthKey, getMonthlyPdSummary } from '../../src/lib/pdSummary';
import {
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  savePdLogEntry,
  saveProgress,
  type PDLogEntry,
  type UserProgress
} from '../../src/lib/progress';

const templates = [
  {
    id: 'a-plus-video',
    label: 'A+ video watched',
    resource: 'A+ video',
    topic: 'A+ concept review',
    learned: 'I reviewed one support concept and linked it to a DCS classroom or device situation.'
  },
  {
    id: 'cisco-lesson',
    label: 'Cisco Networking lesson',
    resource: 'Cisco Networking Basics',
    topic: 'Networking concepts',
    learned: 'I clarified a networking idea and documented where it would appear during school support.'
  },
  {
    id: 'microsoft-learn',
    label: 'Microsoft Learn lesson',
    resource: 'Microsoft Learn',
    topic: 'M365 or identity concept',
    learned: 'I mapped a Microsoft concept to a DCS support scenario within operational boundaries.'
  },
  {
    id: 'scenario-practice',
    label: 'DCS scenario practice',
    resource: 'DCSPrep Scenario Lab',
    topic: 'Scenario practice',
    learned: 'I completed a multi-step support scenario and identified an area for further review.'
  },
  {
    id: 'ticket-reflection',
    label: 'Ticket reflection, no private details',
    resource: 'Personal reflection',
    topic: 'Support reflection',
    learned: 'I reflected on the support pattern without copying private operational details.'
  },
  {
    id: 'sop-created',
    label: 'SOP or checklist created',
    resource: 'Personal SOP drafting',
    topic: 'Process improvement',
    learned: 'I converted an unclear support area into a cleaner checklist or quick-reference document.'
  }
];

function getTodayDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export default function PdLogPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<Omit<PDLogEntry, 'id'>>({
    date: '',
    minutes: 20,
    type: 'reflection',
    resource: '',
    topic: '',
    dcsRelevance: '',
    learned: '',
    reflection: '',
    nextStep: '',
    evidenceLink: '',
    moduleIds: [],
    scenarioIds: [],
    weakTopicsTouched: [],
    weakTopicsImproved: [],
    templateId: undefined,
    sensitiveConfirmed: false
  });

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
    setHasHydratedProgress(true);
    setForm((current) => ({
      ...current,
      date: current.date || getTodayDateKey()
    }));
  }, []);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    saveProgress(progress);
  }, [hasHydratedProgress, progress]);

  const monthKey = getMonthKey(new Date());
  const monthlySummary = getMonthlyPdSummary(progress, monthKey);
  const monthlyEntries = monthlySummary.entries;
  const monthlyMinutes = monthlySummary.totalMinutes;
  const modulesTouched = Object.values(progress.modules).filter((module) =>
    Object.values(module.sectionsRead).some(Boolean)
  ).length;
  const summaryMarkdown = buildMonthlyPdMarkdown(progress);

  function applyTemplate(templateId: string) {
    const template = templates.find((entry) => entry.id === templateId);
    if (!template) {
      return;
    }

    setForm((current) => ({
      ...current,
      resource: template.resource,
      topic: template.topic,
      learned: template.learned,
      templateId: template.id
    }));
  }

  function submitEntry() {
    if (!form.resource || !form.topic || !form.learned || !form.nextStep || !form.sensitiveConfirmed) {
      return;
    }

    setProgress((current) =>
      savePdLogEntry(current, {
        id: `pd-log-${Date.now()}`,
        ...form
      })
    );
    trackUsageInteraction({
      eventType: 'pd_log_entry_created',
      route: '/pd-log',
      label: form.type,
      activityCategory: 'reflection',
      completed: true,
      durationSeconds: form.minutes * 60,
      metadata: { source: 'built-in' }
    });

    setForm({
      date: getTodayDateKey(),
      minutes: 20,
      type: 'reflection',
      resource: '',
      topic: '',
      dcsRelevance: '',
      learned: '',
      reflection: '',
      nextStep: '',
      evidenceLink: '',
      moduleIds: [],
      scenarioIds: [],
      weakTopicsTouched: [],
      weakTopicsImproved: [],
      templateId: undefined,
      sensitiveConfirmed: false
    });
  }

  async function copyMarkdown() {
    await navigator.clipboard.writeText(summaryMarkdown);
    trackUsageInteraction({
      eventType: 'evidence_export_created',
      route: '/pd-log',
      label: 'Monthly PD Markdown',
      contentType: 'evidence',
      activityCategory: 'evidence',
      completed: true,
      metadata: { source: 'built-in' }
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">PD log</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Record professional development activity that improves support quality.
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Keep entries short, practical, and privacy-safe. This is evidence of learning progress, not a place to
            record confidential ticket detail.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Privacy reminder</div>
        <p className="mt-3 text-sm leading-7 text-amber-900">
          Do not enter sensitive DCS, student, staff, parent, network, credential, or incident details. Reflect on
          the learning pattern, not the confidential record.
        </p>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">End-of-session reflection prompts</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Answer privately on paper or capture high-level lessons here—never paste confidential ticket content.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          <li>Which support judgement felt least certain today, and what would evidence look like next time?</li>
          <li>Where did triage sequencing save time—or cost class minutes?</li>
          <li>What boundary (Level 1 vs escalation) did you respect even under pressure?</li>
          <li>Which module topic deserves five extra flashcards this week?</li>
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Add PD log entry</h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => applyTemplate(template.id)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
              >
                {template.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-700">
              Date
              <input
                type="date"
                value={form.date}
                onChange={(event) => setForm({ ...form, date: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              />
            </label>
            <label className="text-sm text-slate-700">
              Minutes
              <input
                type="number"
                min={5}
                step={5}
                value={form.minutes}
                onChange={(event) => setForm({ ...form, minutes: Number(event.target.value) })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Resource
              <input
                value={form.resource}
                onChange={(event) => setForm({ ...form, resource: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="Microsoft Learn, A+ video, Scenario Lab, SOP draft..."
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Topic
              <input
                value={form.topic}
                onChange={(event) => setForm({ ...form, topic: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="Ports and protocols, ViewBoard troubleshooting, offboarding sequence..."
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              DCS relevance
              <textarea
                value={form.dcsRelevance}
                onChange={(event) => setForm({ ...form, dcsRelevance: event.target.value })}
                className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="Where would this show up at DCS?"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              What I learned
              <textarea
                value={form.learned}
                onChange={(event) => setForm({ ...form, learned: event.target.value })}
                className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="What changed in your understanding?"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Reflection note (optional)
              <textarea
                value={form.reflection}
                onChange={(event) => setForm({ ...form, reflection: event.target.value })}
                className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="Optional reflection: why this matters and what you will do differently."
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Next step
              <textarea
                value={form.nextStep}
                onChange={(event) => setForm({ ...form, nextStep: event.target.value })}
                className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="What is the next action?"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Evidence link (optional)
              <input
                value={form.evidenceLink}
                onChange={(event) => setForm({ ...form, evidenceLink: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="Optional: certificate, note file, or resource URL"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Linked modules
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {modules.slice(0, 16).map((module) => (
                  <label key={module.id} className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-xs">
                    <input
                      type="checkbox"
                      checked={Boolean(form.moduleIds?.includes(module.id))}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          moduleIds: event.target.checked
                            ? [...(current.moduleIds ?? []), module.id]
                            : (current.moduleIds ?? []).filter((id) => id !== module.id)
                        }))
                      }
                    />
                    <span>{module.title}</span>
                  </label>
                ))}
              </div>
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Linked scenarios
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {scenarios.slice(0, 10).map((scenario) => (
                  <label key={scenario.id} className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-xs">
                    <input
                      type="checkbox"
                      checked={Boolean(form.scenarioIds?.includes(scenario.id))}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          scenarioIds: event.target.checked
                            ? [...(current.scenarioIds ?? []), scenario.id]
                            : (current.scenarioIds ?? []).filter((id) => id !== scenario.id)
                        }))
                      }
                    />
                    <span>{scenario.title}</span>
                  </label>
                ))}
              </div>
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Weak topics touched
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {Object.entries(weakTopicLabels).slice(0, 16).map(([key, label]) => (
                  <label key={key} className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-xs">
                    <input
                      type="checkbox"
                      checked={Boolean(form.weakTopicsTouched?.includes(key))}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          weakTopicsTouched: event.target.checked
                            ? [...(current.weakTopicsTouched ?? []), key]
                            : (current.weakTopicsTouched ?? []).filter((id) => id !== key)
                        }))
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Weak topics improved
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {Object.entries(weakTopicLabels).slice(0, 16).map(([key, label]) => (
                  <label key={key} className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-xs">
                    <input
                      type="checkbox"
                      checked={Boolean(form.weakTopicsImproved?.includes(key))}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          weakTopicsImproved: event.target.checked
                            ? [...(current.weakTopicsImproved ?? []), key]
                            : (current.weakTopicsImproved ?? []).filter((id) => id !== key)
                        }))
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </label>
          </div>

          <label className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.sensitiveConfirmed}
              onChange={(event) => setForm({ ...form, sensitiveConfirmed: event.target.checked })}
              className="mt-1 h-4 w-4"
            />
            <span>I confirm this contains no student or staff private details.</span>
          </label>

          <button onClick={submitEntry} className="mt-5 rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
            Save PD entry
          </button>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Monthly summary</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">Total minutes</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">{monthlyMinutes}</div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">Entries logged</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">{monthlySummary.entryCount}</div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">Topics covered</div>
                <div className="mt-2 text-slate-700">{monthlySummary.topicsCovered.length ? monthlySummary.topicsCovered.join(', ') : 'No topics recorded yet'}</div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">Weak areas touched</div>
                <div className="mt-2 text-slate-700">{monthlySummary.weakTopicsTouched.length ? monthlySummary.weakTopicsTouched.join(', ') : 'No weak topics recorded yet'}</div>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-700">
              <div>Suggested next focus: {monthlySummary.suggestedNextFocus}</div>
              <div>Current weak focus: {getCurrentWeakFocus(progress)}</div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={copyMarkdown}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
              >
                {copied ? 'Markdown copied' : 'Export summary as Markdown'}
              </button>
              <a
                href="/evidence-pack"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
              >
                Open Evidence Pack
              </a>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">This month&apos;s entries</h2>
            <div className="mt-5 space-y-4">
              {monthlyEntries.length ? (
                monthlyEntries.map((entry) => (
                  <div key={entry.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">{entry.date} | {entry.minutes} min | {entry.topic}</div>
                    <p className="mt-2 text-sm text-slate-700">{entry.learned}</p>
                    {entry.reflection ? (
                      <p className="mt-2 text-sm text-slate-700">Reflection: {entry.reflection}</p>
                    ) : null}
                    <p className="mt-2 text-sm text-slate-600">Next step: {entry.nextStep}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">No PD entries logged yet this month.</div>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
