'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  mspEvidenceBridge,
  mspRoadmapItems,
  mspThirtyDayTasks,
  mspThirtyDayPlan,
  mspTicketNoteCriteria
} from '../../src/data/mspTransition';

const MSP_TASKS_KEY = 'supportOpsMspThirtyDayTasks';

function loadCompletedTasks() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(MSP_TASKS_KEY) ?? '{}') as Record<string, boolean>;
  } catch {
    return {};
  }
}

export default function MspTransitionPage() {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCompletedTasks(loadCompletedTasks());
  }, []);

  const completedCount = useMemo(
    () => mspThirtyDayTasks.filter((task) => completedTasks[task.id]).length,
    [completedTasks]
  );

  function toggleTask(taskId: string) {
    setCompletedTasks((current) => {
      const next = { ...current, [taskId]: !current[taskId] };
      window.localStorage.setItem(MSP_TASKS_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-4xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">MSP transition</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Avance MSP readiness cockpit
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Shift the app from DCS-first practice into client-facing MSP support readiness. DCS work remains useful
            as transferable evidence, but the next learning focus is ticket quality, client communication,
            Microsoft 365 support, endpoint triage, backups, security alerts, and clean escalation.
          </p>
          <div className="mt-6 inline-flex rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900">
            First 30 days progress: {completedCount}/{mspThirtyDayTasks.length} tasks complete
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Next upgrades</div>
          <div className="mt-5 grid gap-4">
            {mspRoadmapItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-400 hover:bg-white"
              >
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Outcome: {item.outcome}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Ticket note standard</div>
          <h2 className="mt-3 text-2xl font-semibold">MSP-quality notes</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            The strongest first upgrade is a note coach that scores support notes against MSP expectations.
          </p>
          <ul className="mt-5 space-y-3">
            {mspTicketNoteCriteria.map((criterion) => (
              <li key={criterion} className="rounded-2xl bg-white/10 p-3 text-sm leading-6 text-slate-100">
                {criterion}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">First 30 days</div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {mspThirtyDayPlan.map((block) => (
            <div key={block.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">{block.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{block.focus}</p>
              <ul className="mt-4 space-y-2">
                {block.drills.map((drill) => (
                  <li key={drill} className="text-sm leading-6 text-slate-700">
                    - {drill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Interactive 30-day task list
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Track the habits that matter at an MSP</h2>
          </div>
          <Link
            href="/client-communication"
            className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Practise client updates
          </Link>
        </div>
        <div className="mt-5 grid gap-3">
          {mspThirtyDayTasks.map((task) => (
            <div key={task.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className="flex flex-1 items-start gap-3 text-left"
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-sm font-bold ${
                    completedTasks[task.id] ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white text-white'
                  }`}
                >
                  {completedTasks[task.id] ? '✓' : ''}
                </span>
                <span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">{task.week}</span>
                  <span className="mt-1 block text-base font-semibold text-slate-900">{task.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">{task.detail}</span>
                </span>
              </button>
              <Link href={task.href} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                Open practice
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          DCS-to-MSP evidence bridge
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {mspEvidenceBridge.map((item) => (
            <div key={item.dcsExperience} className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Transferable experience
              </div>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">{item.dcsExperience}</h2>
              <p className="mt-2 text-sm font-semibold text-blue-700">{item.mspCapability}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.evidencePrompt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Privacy boundary</div>
        <p className="mt-3 text-sm leading-7 text-amber-950">
          Use fictional clients and generic support patterns. Do not enter real DCS, Avance, client, student, staff,
          credential, ticket, IP, endpoint, private record, internal URL, or confidential procedure details.
        </p>
      </section>
    </div>
  );
}
