export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export function isDue(dateIso: string) {
  return new Date(dateIso).getTime() <= Date.now();
}

export function scoreToReviewRating(score: number): ReviewRating {
  if (score < 0.25) {
    return 'again';
  }

  if (score < 0.65) {
    return 'hard';
  }

  if (score < 0.9) {
    return 'good';
  }

  return 'easy';
}

export function getNextReviewDateIso(rating: ReviewRating) {
  const next = new Date();

  switch (rating) {
    case 'again':
      next.setHours(next.getHours() + 2);
      break;
    case 'hard':
      next.setDate(next.getDate() + 1);
      break;
    case 'good':
      next.setDate(next.getDate() + 3);
      break;
    case 'easy':
      next.setDate(next.getDate() + 7);
      break;
  }

  return next.toISOString();
}

export const getNextReviewDate = getNextReviewDateIso;
