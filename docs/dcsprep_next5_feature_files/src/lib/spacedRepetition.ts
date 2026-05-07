export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export function isDue(dateIso: string) {
  return new Date(dateIso).getTime() <= Date.now();
}
