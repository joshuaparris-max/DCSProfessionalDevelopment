import type { PDLogEntry, UserProgress } from './progress';

export type MonthlyPdSummary = {
  monthKey: string;
  totalMinutes: number;
  entryCount: number;
  topicsCovered: string[];
  weakTopicsTouched: string[];
  suggestedNextFocus: string;
  entries: PDLogEntry[];
};

export function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function getMonthlyPdSummary(progress: UserProgress, monthKey: string): MonthlyPdSummary {
  const entries = progress.pdLogEntries.filter((entry) => entry.date.startsWith(monthKey));

  const topicsCovered = Array.from(
    new Set(entries.flatMap((entry) => [entry.topic, ...(entry.weakTopicsTouched ?? []), ...(entry.weakTopicsImproved ?? [])]).filter(Boolean))
  );

  const weakTopicsTouched = Array.from(new Set(entries.flatMap((entry) => entry.weakTopicsTouched ?? []).filter(Boolean)));

  const suggestedNextFocus = weakTopicsTouched.length
    ? weakTopicsTouched[0]
    : entries.length
    ? 'Continue logging your learning and watch for recurring weak areas.'
    : 'Start with your first PD entry to begin tracking progress.';

  return {
    monthKey,
    totalMinutes: entries.reduce((sum, entry) => sum + entry.minutes, 0),
    entryCount: entries.length,
    topicsCovered,
    weakTopicsTouched,
    suggestedNextFocus,
    entries
  };
}
