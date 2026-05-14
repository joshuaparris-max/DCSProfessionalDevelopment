"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { requestNotificationPermission, showNotification } from '../../src/lib/notifications';
import { useAuth, type UserRole } from '../../src/contexts/AuthContext';
import { ProgressBackup } from '../../src/components/ProgressBackup';
import {
  defaultSchedulerSettings,
  loadSchedulerSettings,
  saveSchedulerSettings,
  type SchedulerBlockTemplate,
  type SchedulerSettings
} from '../../src/hooks/useScheduler';
import {
  resetProgress,
  saveProgress,
  getStoredProgressSnapshot,
  type UserProgress
} from '../../src/lib/progress';
import {
  clearUsageEvents,
  exportUsageEvents,
  getUsageEvents,
  getUsageTrackingEnabled,
  setUsageTrackingEnabled
} from '../../src/lib/usageAnalytics';
import { modules } from '../../src/data/modules';

export default function SettingsPage() {
  const [schedulerSettings, setSchedulerSettings] = useState<SchedulerSettings>(defaultSchedulerSettings);
  const [schedulerSaved, setSchedulerSaved] = useState(false);
  const [usageTrackingEnabled, setUsageTrackingState] = useState(true);
  const [usageEventCount, setUsageEventCount] = useState(0);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const { user, role, login, logout } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setSchedulerSettings(loadSchedulerSettings());
    setUsageTrackingState(getUsageTrackingEnabled());
    setUsageEventCount(getUsageEvents().length);
    setProgress(getStoredProgressSnapshot(modules));
    if (!('Notification' in window)) {
      setNotificationPermission('unsupported');
    } else {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  async function handleRequestNotifications() {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotificationPermission('granted');
    } else {
      setNotificationPermission(Notification.permission);
    }
  }

  function handleTestNotification() {
    showNotification('Test Notification', {
      body: 'This is a test notification from DCSPrep.',
      tag: 'test-notification'
    });
  }

  function handleRestore(newProgress: UserProgress) {
    saveProgress(newProgress);
    setProgress(newProgress);
    window.location.reload(); // Refresh to apply restored state globally
  }

  function handleReset() {
    if (window.confirm('Reset all DCSPrep local progress and logs? This cannot be undone.')) {
      resetProgress();
      window.location.reload();
    }
  }

  function updateBlock(index: number, field: keyof Pick<SchedulerBlockTemplate, 'start' | 'end'>, value: string) {
    setSchedulerSettings((current) => ({
      ...current,
      blocks: current.blocks.map((block, blockIndex) =>
        blockIndex === index
          ? {
              ...block,
              [field]: value
            }
          : block
      )
    }));
    setSchedulerSaved(false);
  }

  function updateStudyContext(field: keyof SchedulerSettings['studyContext'], value: string) {
    setSchedulerSettings((current) => ({
      ...current,
      studyContext: {
        ...current.studyContext,
        [field]: value
      }
    }));
    setSchedulerSaved(false);
  }

  function saveScheduler() {
    saveSchedulerSettings(schedulerSettings);
    setSchedulerSaved(true);
  }

  function resetSchedulerDefaults() {
    setSchedulerSettings(defaultSchedulerSettings);
    saveSchedulerSettings(defaultSchedulerSettings);
    setSchedulerSaved(true);
  }

  function downloadUsageExport() {
    const blob = new Blob([exportUsageEvents()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `dcsprep-usage-analytics-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function toggleUsageTracking() {
    const next = !usageTrackingEnabled;
    setUsageTrackingEnabled(next);
    setUsageTrackingState(next);
  }

  function clearUsageAnalytics() {
    if (!window.confirm('Clear local usage analytics? This does not clear module progress, PD logs, or scheduler settings.')) {
      return;
    }

    clearUsageEvents();
    setUsageEventCount(0);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Identity & Demo Roles</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Local Role Simulation</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              Select a role to simulate UI behavior (e.g., restricted content or educator views). 
              <span className="block mt-1 font-bold text-rose-600">WARNING: This is a local-only simulation. Roles are stored in LocalStorage and do not provide security for sensitive data.</span>
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Current Simulated Role: <span className="font-semibold text-slate-900 capitalize">{role}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {(['learner', 'educator', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => login(r)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  role === r
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)} (Simulated)
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="text-2xl">⚠️</div>
          <div>
            <h2 className="text-lg font-bold text-rose-900">Privacy & Data Security Notice</h2>
            <p className="mt-2 text-sm text-rose-800 leading-relaxed">
              DCSPrep is a client-side learning tool. All data is stored locally in your browser. 
              <strong>NEVER</strong> enter real student names, staff credentials, parent contact details, or sensitive school network configurations into this application.
            </p>
          </div>
        </div>
      </section>

      {progress && <ProgressBackup progress={progress} onRestore={handleRestore} />}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Notifications</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Push Notifications</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              Enable notifications to receive reminders for due reviews, new modules, and certification milestones.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Status: <span className="font-semibold text-slate-900 capitalize">{notificationPermission}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleRequestNotifications}
              disabled={notificationPermission === 'granted' || notificationPermission === 'unsupported'}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                notificationPermission === 'granted'
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-900 text-white'
              } ${notificationPermission === 'unsupported' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {notificationPermission === 'granted' ? 'Notifications Enabled' : 'Enable Notifications'}
            </button>
            {notificationPermission === 'granted' && (
              <button
                type="button"
                onClick={handleTestNotification}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Send Test
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Settings</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Local-only storage, operational boundaries, and privacy reminders.
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            DCSPrep stores progress locally in the browser. There is no external auth or backend in this version.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Privacy notice</div>
        <p className="mt-3 text-sm leading-7 text-amber-900">
          This app is for personal PD. Do not enter sensitive DCS, student, staff, parent, network, credential,
          or incident details.
        </p>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Usage analytics</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Local-only Usage Insights</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              Tracking is metadata-only and stays in this browser. It records routes, content IDs, event types,
              categories, durations, completion states, and existing scores where available. It does not record full
              notes, reflections, roleplay messages, ticket text, credentials, or private typed content.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Current local event count: <span className="font-semibold text-slate-900">{usageEventCount}</span>.
              Tracking is <span className="font-semibold text-slate-900">{usageTrackingEnabled ? 'enabled' : 'disabled'}</span>.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/usage-insights" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              View Usage Insights
            </Link>
            <button
              type="button"
              onClick={downloadUsageExport}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Export usage analytics JSON
            </button>
            <button
              type="button"
              onClick={toggleUsageTracking}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              {usageTrackingEnabled ? 'Disable tracking' : 'Enable tracking'}
            </button>
            <button
              type="button"
              onClick={clearUsageAnalytics}
              className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700"
            >
              Clear usage analytics
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">PD Scheduler</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Timetable and study context</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              These settings feed the real-time scheduler at /scheduler. Times use the system clock; there is no
              manual time override.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetSchedulerDefaults}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Restore defaults
            </button>
            <button
              type="button"
              onClick={saveScheduler}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              {schedulerSaved ? 'Saved' : 'Save scheduler settings'}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {schedulerSettings.blocks.map((block, index) => (
            <div key={block.id} className="rounded-3xl bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">
                {block.dayLabel} {block.blockLabel}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-sm text-slate-700">
                  Start
                  <input
                    type="time"
                    value={block.start}
                    onChange={(event) => updateBlock(index, 'start', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  />
                </label>
                <label className="text-sm text-slate-700">
                  End
                  <input
                    type="time"
                    value={block.end}
                    onChange={(event) => updateBlock(index, 'end', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(
            [
              ['coreProgress', 'Core 2 progress'],
              ['primaryVideoSource', 'Primary video source'],
              ['flashcardSource', 'Flashcard/SRS'],
              ['applicationTasks', 'Application tasks'],
              ['buildingTasks', 'Building tasks'],
              ['writingTasks', 'Writing tasks'],
              ['breakActivities', 'Break activities']
            ] as const
          ).map(([field, label]) => (
            <label key={field} className="text-sm text-slate-700 md:col-span-2">
              <span className="font-semibold text-slate-900">{label}</span>
              <textarea
                value={schedulerSettings.studyContext[field]}
                onChange={(event) => updateStudyContext(field, event.target.value)}
                className="mt-2 min-h-20 w-full rounded-2xl border border-slate-200 px-4 py-3"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Reset local data</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Use this if you want to clear modules, assessment attempts, due items, scenario logs, and PD entries from
          this browser.
        </p>
        <button onClick={handleReset} className="mt-5 rounded-full bg-red-600 px-4 py-2 text-sm text-white">
          Reset local progress
        </button>
      </section>
    </div>
  );
}
