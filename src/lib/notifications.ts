"use client";

const LOCAL_REVIEW_REMINDERS_KEY = 'dcsprep-local-review-reminders';
const DEFAULT_SYNC_TAG = 'dcsprep-progress-sync';

export type LocalReviewReminder = {
  id: string;
  moduleTitle: string;
  dueAtIso: string;
  createdAtIso: string;
};

/**
 * Browser support check for Notifications and Service Workers.
 */
export function isNotificationSupported() {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
}

export async function requestNotificationPermission() {
  if (!isNotificationSupported()) {
    console.warn('Notifications are not supported in this browser.');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

/**
 * PROTOTYPE: Currently triggers an immediate notification if permission is granted.
 * Real scheduled background notifications require a backend push service (VAPID/FCM).
 */
export async function showNotification(title: string, options?: NotificationOptions) {
  if (!isNotificationSupported()) return;

  if (Notification.permission === 'granted') {
    try {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification(title, {
        icon: '/icon.svg',
        badge: '/icon.svg',
        ...options
      });
    } catch (error) {
      console.error('Failed to show notification via Service Worker:', error);
      // Fallback to basic notification if SW fails
      new Notification(title, options);
    }
  }
}

export function getScheduledReviewReminders(): LocalReviewReminder[] {
  if (typeof window === 'undefined') return [];

  try {
    const rawValue = window.localStorage.getItem(LOCAL_REVIEW_REMINDERS_KEY);
    return rawValue ? (JSON.parse(rawValue) as LocalReviewReminder[]) : [];
  } catch (error) {
    console.error('Failed to load local review reminders:', error);
    return [];
  }
}

export function scheduleReviewReminder(moduleTitle: string, delayInDays: number) {
  const now = new Date();
  const dueAt = new Date(now);
  dueAt.setDate(now.getDate() + delayInDays);

  const reminder: LocalReviewReminder = {
    id: `${now.getTime()}-${moduleTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
    moduleTitle,
    dueAtIso: dueAt.toISOString(),
    createdAtIso: now.toISOString()
  };

  if (typeof window !== 'undefined') {
    const reminders = getScheduledReviewReminders();
    window.localStorage.setItem(LOCAL_REVIEW_REMINDERS_KEY, JSON.stringify([...reminders, reminder]));
  }

  return reminder;
}

export function clearScheduledReviewReminder(reminderId: string) {
  if (typeof window === 'undefined') return;

  const reminders = getScheduledReviewReminders().filter((reminder) => reminder.id !== reminderId);
  window.localStorage.setItem(LOCAL_REVIEW_REMINDERS_KEY, JSON.stringify(reminders));
}

export async function registerBackgroundSync(tag = DEFAULT_SYNC_TAG) {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return 'unsupported' as const;
  }

  try {
    const registration = (await navigator.serviceWorker.ready) as ServiceWorkerRegistration & {
      sync?: { register: (syncTag: string) => Promise<void> };
    };

    if (!registration.sync) {
      return 'unsupported' as const;
    }

    await registration.sync.register(tag);
    return 'registered' as const;
  } catch (error) {
    console.error('Failed to register background sync:', error);
    return 'failed' as const;
  }
}
