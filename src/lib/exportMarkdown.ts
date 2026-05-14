import type { UserProgress } from './progress';

export function buildMonthlyPdMarkdown(progress: UserProgress) {
  if (!progress.pdLogEntries.length) {
    return '# Monthly PD summary\n\nNo entries recorded yet.';
  }

  const lines = ['# Monthly PD summary', ''];
  const entries = progress.pdLogEntries.slice(0, 10);

  entries.forEach((entry) => {
    lines.push(`## ${entry.date} — ${entry.minutes} min`);
    lines.push('');
    lines.push(`- **Resource:** ${entry.resource}`);
    lines.push(`- **Topic:** ${entry.topic}`);
    if (entry.dcsRelevance) {
      lines.push(`- **DCS relevance:** ${entry.dcsRelevance}`);
    }
    lines.push('');
    lines.push(`**What I learned:** ${entry.learned}`);
    if (entry.reflection) {
      lines.push('');
      lines.push(`**Reflection:** ${entry.reflection}`);
    }
    lines.push('');
    lines.push(`**Next step:** ${entry.nextStep}`);
    if (entry.evidenceLink) {
      lines.push(`- **Evidence:** ${entry.evidenceLink}`);
    }
    lines.push('');
  });

  return lines.join('\n');
}
