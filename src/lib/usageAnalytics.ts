import { academicSubjects } from '../data/academicSubjects';
import { modules } from '../data/modules';
import { scenarios } from '../data/scenarios';
import type {
  UsageActivityCategory,
  UsageAnalyticsExport,
  UsageContentType,
  UsageEvent,
  UsageEventType,
  UsageSuggestion,
  UsageSummary
} from '../types/usageAnalytics';

export const USAGE_STORAGE_KEY = 'dcsprep_usage_events';
export const USAGE_TRACKING_ENABLED_KEY = 'dcsprep_usage_tracking_enabled';

const MAX_EVENTS = 5000;
const MAX_AGE_DAYS = 180;

type UsageEventInput = Omit<UsageEvent, 'id' | 'timestamp'> & { timestamp?: string };

function hasLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeUuid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `usage-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isUsageEvent(value: unknown): value is UsageEvent {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.timestamp === 'string' &&
    typeof value.eventType === 'string' &&
    typeof value.route === 'string' &&
    typeof value.activityCategory === 'string'
  );
}

function daysAgo(days: number) {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

function sanitizeEvent(event: UsageEvent): UsageEvent {
  return {
    id: event.id,
    timestamp: event.timestamp,
    eventType: event.eventType,
    route: event.route,
    label: event.label?.slice(0, 160),
    contentType: event.contentType,
    contentId: event.contentId?.slice(0, 160),
    activityCategory: event.activityCategory,
    durationSeconds:
      typeof event.durationSeconds === 'number' && Number.isFinite(event.durationSeconds)
        ? Math.max(0, Math.round(event.durationSeconds))
        : undefined,
    completed: event.completed,
    score: typeof event.score === 'number' && Number.isFinite(event.score) ? event.score : undefined,
    metadata: event.metadata
      ? {
          domain: event.metadata.domain?.slice(0, 80),
          level: event.metadata.level?.slice(0, 80),
          weakTopic: event.metadata.weakTopic?.slice(0, 120),
          source: event.metadata.source,
          resultCount: event.metadata.resultCount,
          interruptionType: event.metadata.interruptionType?.slice(0, 120),
          hourBucket: event.metadata.hourBucket?.slice(0, 20)
        }
      : undefined
  };
}

export function cleanupUsageEvents(events: UsageEvent[]) {
  const cutoff = daysAgo(MAX_AGE_DAYS);

  return events
    .filter((event) => {
      const time = Date.parse(event.timestamp);
      return Number.isFinite(time) && time >= cutoff;
    })
    .slice(-MAX_EVENTS);
}

export function getUsageTrackingEnabled() {
  if (!hasLocalStorage()) {
    return true;
  }

  return window.localStorage.getItem(USAGE_TRACKING_ENABLED_KEY) !== 'false';
}

export function setUsageTrackingEnabled(enabled: boolean) {
  if (!hasLocalStorage()) {
    return;
  }

  window.localStorage.setItem(USAGE_TRACKING_ENABLED_KEY, String(enabled));
}

export function getUsageEvents(): UsageEvent[] {
  if (!hasLocalStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(USAGE_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return cleanupUsageEvents(parsed.filter(isUsageEvent).map(sanitizeEvent));
  } catch {
    return [];
  }
}

export function saveUsageEvents(events: UsageEvent[]) {
  if (!hasLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(cleanupUsageEvents(events).map(sanitizeEvent)));
  } catch {
    // Local analytics should never break the learning app.
  }
}

export function recordUsageEvent(event: UsageEventInput) {
  if (!getUsageTrackingEnabled()) {
    return;
  }

  const timestamp = event.timestamp ?? new Date().toISOString();
  const nextEvent = sanitizeEvent({
    ...event,
    id: safeUuid(),
    timestamp,
    metadata: {
      ...event.metadata,
      hourBucket: new Date(timestamp).getHours().toString().padStart(2, '0')
    }
  });

  saveUsageEvents([...getUsageEvents(), nextEvent]);
}

export function clearUsageEvents() {
  if (!hasLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(USAGE_STORAGE_KEY);
}

export function exportUsageEvents() {
  const payload: UsageAnalyticsExport = {
    app: 'DCSPrep',
    type: 'usage-analytics-export',
    version: 1,
    exportedAt: new Date().toISOString(),
    events: getUsageEvents()
  };

  return JSON.stringify(payload, null, 2);
}

export function importUsageEvents(json: string) {
  const parsed = JSON.parse(json) as Partial<UsageAnalyticsExport>;

  if (
    parsed.app !== 'DCSPrep' ||
    parsed.type !== 'usage-analytics-export' ||
    parsed.version !== 1 ||
    !Array.isArray(parsed.events)
  ) {
    throw new Error('This is not a valid DCSPrep usage analytics export.');
  }

  saveUsageEvents(parsed.events.filter(isUsageEvent).map(sanitizeEvent));
}

function aggregate<T extends string>(
  events: UsageEvent[],
  keyFor: (event: UsageEvent) => T | undefined
): Array<{ key: T; count: number; totalSeconds: number }> {
  const map = new Map<T, { key: T; count: number; totalSeconds: number }>();

  events.forEach((event) => {
    const key = keyFor(event);
    if (!key) {
      return;
    }

    const existing = map.get(key) ?? { key, count: 0, totalSeconds: 0 };
    existing.count += 1;
    existing.totalSeconds += event.durationSeconds ?? 0;
    map.set(key, existing);
  });

  return Array.from(map.values()).sort((a, b) => b.count - a.count || b.totalSeconds - a.totalSeconds);
}

function sumSeconds(events: UsageEvent[]) {
  return events.reduce((sum, event) => sum + (event.durationSeconds ?? 0), 0);
}

function uniqueCount(events: UsageEvent[], contentType: UsageContentType) {
  return new Set(events.filter((event) => event.contentType === contentType && event.contentId).map((event) => event.contentId))
    .size;
}

function latestByContent(events: UsageEvent[], contentType: UsageContentType) {
  const latest = new Map<string, UsageEvent>();
  events
    .filter((event) => event.contentType === contentType && event.contentId)
    .forEach((event) => {
      const id = event.contentId as string;
      const existing = latest.get(id);
      if (!existing || Date.parse(event.timestamp) > Date.parse(existing.timestamp)) {
        latest.set(id, event);
      }
    });
  return latest;
}

function suggestion(input: Omit<UsageSuggestion, 'id'>): UsageSuggestion {
  return {
    id: `${input.category}-${input.route ?? input.contentId ?? input.title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    ...input
  };
}

export function getUsageSuggestions(events: UsageEvent[]): UsageSuggestion[] {
  const activeSeconds = Math.max(1, sumSeconds(events));
  const secondsByCategory = new Map<UsageActivityCategory, number>();

  events.forEach((event) => {
    secondsByCategory.set(event.activityCategory, (secondsByCategory.get(event.activityCategory) ?? 0) + (event.durationSeconds ?? 0));
  });

  const intakeSeconds = (secondsByCategory.get('reading') ?? 0) + (secondsByCategory.get('video') ?? 0);
  const retrievalSeconds =
    (secondsByCategory.get('retrieval') ?? 0) +
    (secondsByCategory.get('quiz') ?? 0) +
    (secondsByCategory.get('flashcards') ?? 0);
  const scenarioEvents = events.filter((event) => event.activityCategory === 'scenario').length;
  const moduleEvents = events.filter((event) => event.contentType === 'module').length;
  const evidenceEvents = events.filter((event) => event.activityCategory === 'evidence').length;
  const roleplayLatest = latestByContent(events, 'roleplay');
  const schedulerEvents = events.filter((event) => event.activityCategory === 'scheduler').length;

  const suggestions: UsageSuggestion[] = [];

  if (intakeSeconds / activeSeconds > 0.6 && retrievalSeconds / activeSeconds < 0.15) {
    suggestions.push(
      suggestion({
        title: 'Pair intake with retrieval',
        reason: 'Your recorded mix is mostly reading or watching, with lower quiz, flashcard, and recall activity.',
        priority: 'high',
        suggestedAction: 'A useful next move would be one due review or a short quiz after the next module section.',
        route: '/due-today',
        category: 'learning-balance'
      })
    );
  }

  if (moduleEvents >= 5 && scenarioEvents < 2) {
    suggestions.push(
      suggestion({
        title: 'Add one scenario lab',
        reason: 'Module use is stronger than scenario practice, so application evidence is underrepresented.',
        priority: 'medium',
        suggestedAction: 'Try one scenario and finish with a ticket-note self-check.',
        route: '/scenarios',
        category: 'underused-feature'
      })
    );
  }

  if (scenarioEvents >= 2 && evidenceEvents < 1) {
    suggestions.push(
      suggestion({
        title: 'Turn practice into evidence',
        reason: 'Scenario practice is visible, but evidence-pack activity is low.',
        priority: 'medium',
        suggestedAction: 'Open Evidence Pack and create a manager-safe summary of one scenario run.',
        route: '/evidence-pack',
        category: 'evidence'
      })
    );
  }

  if ((secondsByCategory.get('building') ?? 0) > retrievalSeconds && retrievalSeconds < activeSeconds * 0.2) {
    suggestions.push(
      suggestion({
        title: 'Anchor building with review',
        reason: 'Building activity is useful, but pairing it with retrieval protects long-term retention.',
        priority: 'medium',
        suggestedAction: 'After the next building block, answer five flashcards or one strict quiz prompt.',
        route: '/strict-quiz',
        category: 'learning-balance'
      })
    );
  }

  if (roleplayLatest.size === 0 || Date.now() - Math.max(...Array.from(roleplayLatest.values()).map((event) => Date.parse(event.timestamp))) > 30 * 24 * 60 * 60 * 1000) {
    suggestions.push(
      suggestion({
        title: 'Use a short roleplay soon',
        reason: 'Soft-skill simulation has not appeared recently in the usage log.',
        priority: 'low',
        suggestedAction: 'Try a 10-minute teacher-support roleplay or communication drill.',
        route: '/simulations/roleplay',
        category: 'underused-feature'
      })
    );
  }

  if (schedulerEvents === 0) {
    suggestions.push(
      suggestion({
        title: 'Let the scheduler choose the next block',
        reason: 'The PD Scheduler is underused compared with other sections.',
        priority: 'low',
        suggestedAction: 'Open the scheduler during the next Thursday or Friday PD block.',
        route: '/scheduler',
        category: 'scheduler'
      })
    );
  }

  return suggestions.slice(0, 8);
}

export function summariseUsage(events: UsageEvent[]): UsageSummary {
  const cleanEvents = cleanupUsageEvents(events).sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
  const routeAgg = aggregate(cleanEvents, (event) => event.route);
  const moduleAgg = aggregate(cleanEvents, (event) => (event.contentType === 'module' ? event.contentId : undefined));
  const categoryAgg = aggregate(cleanEvents, (event) => event.activityCategory);
  const contentAgg = aggregate(cleanEvents, (event) => event.contentType ?? 'unknown');
  const hourAgg = aggregate(cleanEvents, (event) => event.metadata?.hourBucket);
  const moduleTitles = new Map(modules.map((module) => [module.id, module.title]));
  const openedModules = new Set(moduleAgg.map((item) => item.key));
  const latestModules = latestByContent(cleanEvents, 'module');
  const suggestions = getUsageSuggestions(cleanEvents);
  const staleCutoff = Date.now() - 14 * 24 * 60 * 60 * 1000;

  const staleContentSuggestions = Array.from(latestModules.entries())
    .filter(([, event]) => Date.parse(event.timestamp) < staleCutoff)
    .slice(0, 5)
    .map(([id, event]) =>
      suggestion({
        title: `Revisit ${moduleTitles.get(id) ?? id}`,
        reason: `You last touched this module on ${new Date(event.timestamp).toLocaleDateString()}.`,
        priority: 'low',
        suggestedAction: 'Do a five-minute recall check before rereading.',
        route: `/modules/${id}`,
        contentId: id,
        category: 'revisit'
      })
    );

  const leastUsedModules = modules
    .filter((module) => !openedModules.has(module.id))
    .slice(0, 12)
    .map((module) => ({
      id: module.id,
      title: module.title,
      reason: 'No usage event has opened this module yet.'
    }));

  const leastUsedLearningMode = (
    ['retrieval', 'quiz', 'flashcards', 'scenario', 'roleplay', 'writing', 'building', 'evidence'] as UsageActivityCategory[]
  )
    .map((category) => ({
      category,
      totalSeconds: categoryAgg.find((item) => item.key === category)?.totalSeconds ?? 0
    }))
    .sort((a, b) => a.totalSeconds - b.totalSeconds)[0]?.category;

  const neverTouchedFeatureSuggestions = [
    scenarios.length && !cleanEvents.some((event) => event.contentType === 'scenario')
      ? suggestion({
          title: 'Scenario Lab is available for application practice',
          reason: 'No scenario attempts are recorded in the local usage log.',
          priority: 'medium',
          suggestedAction: 'Start one short troubleshooting scenario and capture the escalation boundary.',
          route: '/scenarios',
          category: 'underused-feature'
        })
      : null,
    academicSubjects.length && !cleanEvents.some((event) => event.contentType === 'academic-subject')
      ? suggestion({
          title: 'Academic PD has not been touched yet',
          reason: 'Academic subject bridging is useful for connecting RBC study to DCS support practice.',
          priority: 'low',
          suggestedAction: 'Open one academic subject and choose a small bridge task.',
          route: '/academic-pd',
          category: 'underused-feature'
        })
      : null
  ].filter(Boolean) as UsageSuggestion[];

  return {
    totalEvents: cleanEvents.length,
    totalActiveSeconds: sumSeconds(cleanEvents),
    firstSeenAt: cleanEvents[0]?.timestamp,
    lastSeenAt: cleanEvents[cleanEvents.length - 1]?.timestamp,
    mostActiveHour: hourAgg[0]?.key,
    mostUsedRoutes: routeAgg.slice(0, 8).map((item) => ({
      route: item.key,
      count: item.count,
      totalSeconds: item.totalSeconds
    })),
    mostUsedModules: moduleAgg.slice(0, 8).map((item) => ({
      id: item.key,
      title: moduleTitles.get(item.key),
      count: item.count,
      totalSeconds: item.totalSeconds
    })),
    leastUsedModules,
    activityMix: categoryAgg.map((item) => ({
      category: item.key,
      count: item.count,
      totalSeconds: item.totalSeconds
    })),
    contentTypeMix: contentAgg.map((item) => ({
      contentType: item.key as UsageContentType | 'unknown',
      count: item.count,
      totalSeconds: item.totalSeconds
    })),
    recentActivity: cleanEvents.slice(-12).reverse(),
    modulesOpened: uniqueCount(cleanEvents, 'module'),
    scenariosAttempted: uniqueCount(cleanEvents, 'scenario'),
    evidenceOutputsCreated: cleanEvents.filter((event) => event.eventType === 'evidence_export_created' || event.activityCategory === 'evidence').length,
    leastUsedLearningMode,
    staleContentSuggestions,
    underusedFeatureSuggestions: neverTouchedFeatureSuggestions.concat(
      suggestions.filter((item) => item.category === 'underused-feature' || item.category === 'scheduler')
    ),
    learningBalanceSuggestions: suggestions.filter(
      (item) => item.category === 'learning-balance' || item.category === 'avoidance-pattern' || item.category === 'evidence'
    )
  };
}

export function categoryForRoute(route: string): UsageActivityCategory {
  if (route.startsWith('/modules')) return 'reading';
  if (route.startsWith('/scenarios')) return 'scenario';
  if (route.startsWith('/simulations/roleplay')) return 'roleplay';
  if (route.startsWith('/due-today')) return 'retrieval';
  if (route.startsWith('/strict-quiz') || route.startsWith('/assessment-feedback')) return 'quiz';
  if (route.startsWith('/scheduler')) return 'scheduler';
  if (route.startsWith('/pd-log')) return 'reflection';
  if (route.startsWith('/evidence-pack')) return 'evidence';
  if (route.startsWith('/support-tools')) return 'support-tool';
  if (route.startsWith('/settings')) return 'settings';
  if (route.startsWith('/search')) return 'search';
  return 'navigation';
}

export function contentTypeForRoute(route: string): UsageContentType {
  if (route.startsWith('/modules')) return 'module';
  if (route.startsWith('/scenarios')) return 'scenario';
  if (route.startsWith('/simulations/roleplay')) return 'roleplay';
  if (route.startsWith('/academic-pd')) return 'academic-subject';
  if (route.startsWith('/scheduler')) return 'scheduler';
  if (route.startsWith('/search')) return 'search';
  if (route.startsWith('/settings')) return 'settings';
  if (route.startsWith('/evidence-pack')) return 'evidence';
  if (route.startsWith('/support-tools')) return 'support-tool';
  return 'other';
}

export function eventTypeForRoute(route: string): UsageEventType {
  if (route.startsWith('/modules/') && route !== '/modules') return 'module_open';
  if (route.startsWith('/scenarios')) return 'scenario_open';
  if (route.startsWith('/simulations/roleplay')) return 'roleplay_open';
  if (route.startsWith('/academic-pd/subjects/')) return 'academic_subject_open';
  if (route.startsWith('/support-tools')) return 'support_tool_open';
  return 'page_view';
}
