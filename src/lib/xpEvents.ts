/**
 * Utility to trigger XP gain events across the application
 * without requiring a direct dependency on UI components.
 */
export function triggerXPGain(amount: number, reason: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('gain-xp', {
        detail: { amount, reason }
      })
    );
  }
}
