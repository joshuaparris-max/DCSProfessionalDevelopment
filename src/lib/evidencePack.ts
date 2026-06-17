import { getMonthlyPdSummary } from './pdSummary';
import { getOverallProgress, getModuleCompletion } from './moduleMath';
import { modules as moduleCatalogue } from '../data/modules';
import { mspEvidenceBridge } from '../data/mspTransition';
import { deriveGamificationState, loadGamificationState, getLevelTitle } from './gamification';
import type { PDLogEntry, UserProgress } from './progress';

function hasAcademicAlignmentEvidence(entries: PDLogEntry[]) {
  return entries.some((entry) => {
    const text = `${entry.resource} ${entry.topic} ${entry.learned}`.toLowerCase();
    return (
      entry.templateId === 'academic-pd' ||
      text.includes('rbc') ||
      text.includes('smitb') ||
      text.includes('academic pd') ||
      entry.moduleIds?.some((moduleId) => moduleId.startsWith('rbc-') || moduleId.startsWith('smitb-'))
    );
  });
}

export function buildEvidencePackMarkdown(progress: UserProgress, monthKey: string) {
  const summary = getMonthlyPdSummary(progress, monthKey);
  const includesAcademicAlignment = hasAcademicAlignmentEvidence(summary.entries);
  const overallProgress = Math.round(getOverallProgress(moduleCatalogue, progress));
  
  const gamificationState = deriveGamificationState(progress, moduleCatalogue, loadGamificationState());
  const levelTitle = getLevelTitle(gamificationState.level, gamificationState.specialization);

  const completedModules = moduleCatalogue.filter(m => getModuleCompletion(m.id, progress, m) >= 100);
  const completedScenarios = progress.scenarioRuns.filter(r => r.completed);

  const settings = progress.evidencePackSettings ?? {
    includeCertificates: true,
    includeLinks: true,
    privacyReminderAccepted: false
  };

  const lines = [
    `# SupportOps Career Lab — Career Evidence Pack`,
    `**Reporting Period:** ${summary.monthKey}`,
    `**Current Level:** ${gamificationState.level} (${levelTitle})`,
    `**Overall Readiness:** ${overallProgress}%`,
    '',
    '> This summary is a privacy-safe export of local IT career development activity. It contains no sensitive student, staff, network, or incident data.',
    '',
    '## Executive Summary',
    '',
    `- **Total PD Time:** ${summary.totalMinutes} minutes`,
    `- **Activity Count:** ${summary.entryCount} sessions`,
    `- **Primary Focus:** ${summary.topicsCovered.length ? summary.topicsCovered.slice(0, 3).join(', ') : 'Foundational Learning'}`,
    `- **Next Recommended Mission:** ${summary.suggestedNextFocus}`,
    '',
    '## Career Readiness & Skill Growth',
    '',
    '### Strongest Skill Areas',
    ...Object.entries(gamificationState.attributes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([attr, val]) => `- **${attr.charAt(0).toUpperCase() + attr.slice(1)}:** Level ${Math.floor(val / 10)} (${val} XP)`),
    '',
    '### Career Track Progress',
    `- **Active Track:** ${gamificationState.specialization.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
    `- **Module Completion:** ${completedModules.length} modules verified`,
    `- **Mission Success:** ${completedScenarios.length} practical scenarios completed`,
    `- **MSP Transition Focus:** ${progress.selectedWorkContext === 'MSP Support' ? 'Active' : 'Available'}`,
    '',
    '## DCS-to-MSP Transferable Evidence',
    '',
    'Use this section to explain previous school IT work as general MSP-ready capability. Keep examples anonymised and do not include real tickets, people, IP addresses, device names, screenshots, client details, or confidential procedures.',
    '',
    ...mspEvidenceBridge.flatMap((item) => [
      `### ${item.mspCapability}`,
      `- **Transferable source:** ${item.dcsExperience}`,
      `- **Evidence prompt:** ${item.evidencePrompt}`,
      ''
    ]),
    '',
    '## Practical Output & Verification',
    '',
    '### Completed Modules',
    completedModules.length 
      ? completedModules.map(m => `- ${m.title} (${m.estimatedMinutes}m)`).join('\n')
      : 'No modules completed in this period.',
    '',
    '### Scenario Missions & Ticket Quality',
    completedScenarios.length
      ? completedScenarios.map(r => {
          const score = typeof r.noteScore === 'number' ? ` (Quality: ${Math.round(r.noteScore * 100)}%)` : '';
          return `- ${r.scenarioId}${score}`;
        }).join('\n')
      : 'No scenarios completed in this period.',
    '',
    '## Academic & Certification Alignment',
    '',
    includesAcademicAlignment
      ? 'Informal alignment with RBC/SMITB academic frameworks detected. These references are for PD tracking and do not represent formal university credit unless separately verified.'
      : 'No specific academic or formal certification alignment logged this period.',
    '',
    '## Detailed Activity Log',
    ''
  ];

  if (!summary.entries.length) {
    lines.push('No detailed activities logged for this month.');
  } else {
    summary.entries.forEach((entry) => {
      lines.push(`### ${entry.date} — ${entry.minutes} min`);
      lines.push(`- **Action:** ${entry.topic || 'General Learning'}`);
      if (entry.resource) lines.push(`- **Resource:** ${entry.resource}`);
      lines.push(`- **Practical Output:** ${entry.learned}`);
      if (entry.reflection) lines.push(`- **Reflection:** ${entry.reflection}`);
      if (entry.evidenceLink && settings.includeLinks) {
        lines.push(`- **Evidence Reference:** ${entry.evidenceLink}`);
      }
      lines.push('');
    });
  }

  lines.push('', '---', '', 'Generated by SupportOps Career Lab — Local-First IT Career Growth.');
  return lines.join('\n');
}
