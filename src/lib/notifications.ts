"use client";

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

export function scheduleReviewReminder(moduleTitle: string, delayInDays: number) {
  /**
   * NOTE: True background scheduling is NOT implemented.
   * This requires a persistent backend and a push subscription service.
   * Current behavior: Placeholder for future implementation.
   */
  console.log(`[PROTOTYPE] Scheduled reminder for "${moduleTitle}" in ${delayInDays} days.`);
}
