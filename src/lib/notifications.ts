"use client";

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications.');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export async function showNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification(title, {
      icon: '/icon.svg',
      badge: '/icon.svg',
      ...options
    });
  }
}

export function scheduleReviewReminder(moduleTitle: string, delayInDays: number) {
  // In a real app, this would be handled by a backend or a more complex sync service
  // For now, we'll just log it
  console.log(`Scheduled reminder for "${moduleTitle}" in ${delayInDays} days.`);
}
