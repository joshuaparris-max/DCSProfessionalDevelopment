"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  clearUsageEvents,
  exportUsageEvents,
  getUsageEvents,
  getUsageTrackingEnabled,
  setUsageTrackingEnabled,
  summariseUsage
} from '../../src/lib/usageAnalytics';
import type { UsageEvent, UsageSummary, UsageSuggestion } from '../../src/types/usageAnalytics';

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function formatDate(value?: string) {
  if (!value) {
    return 'Not recorded yet';
  }

  return new Date(value).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}

function percentage(part: number, total: number) {
  if (!total) {
    return 0;
  }

  return Math.round((part / total) * 100);
}

function downloadJson(filename: string, text: string) {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function buildPerspectiveNotes(summary: UsageSummary) {
  const retrievalSeconds = summary.activityMix
    .filter((item) => ['retrieval', 'quiz', 'flashcards'].includes(item.category))
    .reduce((sum, item) => sum + item.totalSeconds, 0);
  const intakeSeconds = summary.activityMix
    .filter((item) => ['reading', 'video'].includes(item.category))
    .reduce((sum, item) => sum + item.totalSeconds, 0);
  const scenarioSeconds = summary.activityMix.find((item) => item.category === 'scenario')?.totalSeconds ?? 0;

  return [
    {
      role: 'Learning scientist',
      note:
        intakeSeconds > retrievalSeconds * 2
          ? 'Your use is intake-heavy. Add more retrieval and production after reading.'
          : 'Your mix includes useful retrieval or production signals. Keep pairing intake with recall.'
    },
    {
      role: 'Level 2 IT mentor',
      note:
        scenarioSeconds === 0
          ? 'Scenario practice is light. A short troubleshooting scenario would strengthen escalation judgement.'
          : 'Scenario practice is present. Keep ending scenarios with clean ticket-note evidence.'
    },
    {
      role: 'SupportOps coach',
      note:
        summary.evidenceOutputsCreated === 0
          ? 'Evidence logging is low. Create a weekly manager-safe summary from completed PD.'
          : 'Evidence outputs are appearing. Keep them privacy-safe and outcome-focused.'
    },
    {
      role: 'CompTIA exam coach',
      note:
        retrievalSeconds === 0
          ? 'Core 2 study should be paired with quizzes or flashcards within 24-48 hours.'
          : 'You are creating some testing effect data. Use weak answers to choose the next review.'
    },
    {
      role: 'Productivity / ADHD-friendly coach',
      note:
        summary.mostActiveHour !== undefined
          ? `You tend to use SupportOps Career Lab around ${summary.mostActiveHour}:00. Use that window for the smallest next action.`
          : 'Start with one tiny action: one flashcard, one scenario step, or one PD log sentence.'
    },
    {
      role: 'Privacy and safeguarding reviewer',
      note: 'Good: analytics stores metadata only. It does not capture ticket notes, reflections, roleplay messages, or private typed content.'
    }
  ];
}

function SuggestionCard({ suggestion }: { suggestion: UsageSuggestion }) {
  const tone =
    suggestion.priority === 'high'
      ? 'border-rose-200 bg-rose-50'
      : suggestion.priority === 'medium'
      ? 'border-amber-200 bg-amber-50'
      : 'border-slate-200 bg-slate-50';

  return (
    <article className={`rounded-3xl border p-5 ${tone}`}>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{suggestion.priority} priority</div>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{suggestion.title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-700">{suggestion.reason}</p>
      <p className="mt-3 text-sm font-semibold text-slate-900">{suggestion.suggestedAction}</p>
      {suggestion.route ? (
        <Link href={suggestion.route} className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
          Open suggested area
        </Link>
      ) : null}
    </article>
  );
}

export default function UsageInsightsPage() {
  const [events, setEvents] = useState<UsageEvent[]>([]);
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEvents(getUsageEvents());
    setTrackingEnabled(getUsageTrackingEnabled());
  }, []);

  const summary = useMemo(() => summariseUsage(events), [events]);
  const totalActivitySeconds = Math.max(1, summary.totalActiveSeconds);
  const allSuggestions = [
    ...summary.learningBalanceSuggestions,
    ...summary.underusedFeatureSuggestions,
    ...summary.staleContentSuggestions
  ];
  const mostUsedSection = summary.mostUsedRoutes[0]?.route ?? 'Not enough data yet';

  function handleExport() {
    downloadJson(`supportops-usage-analytics-${new Date().toISOString().slice(0, 10)}.json`, exportUsageEvents());
  }

  async function handleCopyExport() {
    await navigator.clipboard.writeText(exportUsageEvents());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  function handleClear() {
    if (!window.confirm('Clear local usage analytics events? Existing progress and PD logs will not be changed.')) {
      return;
    }

    clearUsageEvents();
    setEvents([]);
  }

  function toggleTracking() {
    const next = !trackingEnabled;
    setUsageTrackingEnabled(next);
    setTrackingEnabled(next);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Usage Insights</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Local-only learning analytics</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              See how SupportOps Career Lab is actually being used over time, then choose small next actions that improve retention,
              scenario practice, evidence capture, and professional support judgement.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-800">
            Tracking is {trackingEnabled ? 'enabled' : 'disabled'}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">Privacy card</div>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">No data leaves this browser</h2>
        <p className="mt-3 text-sm leading-7 text-emerald-950">
          Usage Insights stores local interaction metadata only: route, content ID, event type, timestamp, duration,
          category, completion state, and existing scores when available. It does not store full ticket notes,
          reflections, roleplay messages, private typed content, credentials, student details, or network secrets.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={toggleTracking} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            {trackingEnabled ? 'Disable tracking' : 'Enable tracking'}
          </button>
          <button onClick={handleExport} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
            Export JSON
          </button>
          <button onClick={handleCopyExport} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
            {copied ? 'Copied' : 'Copy export'}
          </button>
          <button onClick={handleClear} className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700">
            Clear usage analytics
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total active time', formatDuration(summary.totalActiveSeconds)],
          ['Events tracked', String(summary.totalEvents)],
          ['First usage date', formatDate(summary.firstSeenAt)],
          ['Most active time', summary.mostActiveHour ? `${summary.mostActiveHour}:00` : 'Not enough data'],
          ['Most used section', mostUsedSection],
          ['Least used mode', summary.leastUsedLearningMode ?? 'Not enough data'],
          ['Modules opened', String(summary.modulesOpened)],
          ['Scenarios attempted', String(summary.scenariosAttempted)],
          ['Evidence outputs', String(summary.evidenceOutputsCreated)]
        ].map(([label, value]) => (
          <div key={label} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-3 text-2xl font-semibold text-slate-900">{value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Activity mix</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          A healthy PD pattern includes intake, retrieval, application, written explanation, and evidence capture.
        </p>
        <div className="mt-5 space-y-3">
          {summary.activityMix.length ? (
            summary.activityMix.map((item) => {
              const width = percentage(item.totalSeconds, totalActivitySeconds);
              return (
                <div key={item.category} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold capitalize text-slate-900">{item.category}</span>
                    <span className="text-slate-600">
                      {item.count} events / {formatDuration(item.totalSeconds)}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-slate-900" style={{ width: `${Math.max(4, width)}%` }} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
              No usage data yet. Open a few modules, scenarios, or scheduler activities and return here.
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Most used modules</h2>
          <div className="mt-4 space-y-3">
            {summary.mostUsedModules.length ? (
              summary.mostUsedModules.map((item) => (
                <Link key={item.id} href={`/modules/${item.id}`} className="block rounded-3xl bg-slate-50 p-4">
                  <div className="font-semibold text-slate-900">{item.title ?? item.id}</div>
                  <div className="mt-1 text-sm text-slate-600">
                    {item.count} events / {formatDuration(item.totalSeconds)}
                  </div>
                </Link>
              ))
            ) : (
              <p className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">No module usage recorded yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Most used routes</h2>
          <div className="mt-4 space-y-3">
            {summary.mostUsedRoutes.map((item) => (
              <Link key={item.route} href={item.route} className="block rounded-3xl bg-slate-50 p-4">
                <div className="font-semibold text-slate-900">{item.route}</div>
                <div className="mt-1 text-sm text-slate-600">
                  {item.count} events / {formatDuration(item.totalSeconds)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Underused</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          This is framed as opportunity, not failure. Use it to find small next actions.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {summary.leastUsedModules.slice(0, 8).map((item) => (
            <Link key={item.id} href={`/modules/${item.id}`} className="rounded-3xl bg-slate-50 p-5">
              <div className="font-semibold text-slate-900">{item.title ?? item.id}</div>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.reason}</p>
            </Link>
          ))}
          {!summary.leastUsedModules.length ? (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
              Every built-in module has at least one usage event.
            </div>
          ) : null}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Suggestions</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {allSuggestions.length ? (
            allSuggestions.slice(0, 8).map((item) => <SuggestionCard key={item.id} suggestion={item} />)
          ) : (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
              Not enough usage data yet. A useful next move would be one module, one retrieval check, and one evidence note.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Analyse my use from different perspectives</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {buildPerspectiveNotes(summary).map((item) => (
            <article key={item.role} className="rounded-3xl bg-slate-50 p-5">
              <div className="font-semibold text-slate-900">{item.role}</div>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Recent activity</h2>
        <div className="mt-4 space-y-3">
          {summary.recentActivity.length ? (
            summary.recentActivity.map((event) => (
              <div key={event.id} className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">{event.eventType.replace(/_/g, ' ')}</div>
                <div className="mt-1">
                  {event.route} / {event.activityCategory} / {formatDate(event.timestamp)}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">No recent activity recorded.</div>
          )}
        </div>
      </section>
    </div>
  );
}
