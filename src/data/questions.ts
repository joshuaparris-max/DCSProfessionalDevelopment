import type { AssessmentQuestion } from '../types/assessment';
import { modules } from './modules';

function mcq(question: Omit<Extract<AssessmentQuestion, { type: 'mcq' }>, 'type'>): AssessmentQuestion {
  return {
    type: 'mcq',
    ...question
  };
}

function scenarioResponse(
  question: Omit<Extract<AssessmentQuestion, { type: 'scenario-response' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'scenario-response',
    ...question
  };
}

const extraStrictQuestions: AssessmentQuestion[] = [
  mcq({
    id: 'strict-guest-printer',
    prompt: 'Which statement best explains why guest Wi-Fi should usually not reach internal printers by default?',
    domain: 'VLAN and segmentation',
    difficulty: 'stretch',
    explanation: 'Guest access and internal service access are separate security questions.',
    modelAnswer:
      'Guest Wi-Fi is often isolated by design so visitors can reach the internet without reaching internal services such as printers, TVs, or staff resources.',
    commonMistakes: ['Assuming internet access should imply internal-device access', 'Treating segmentation as a bug'],
    dcsContext: 'This matters any time a visitor or event device needs classroom resources.',
    reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
    recommendedModuleId: 'vlans-network-segmentation',
    weakTopic: 'vlan-firewall-rules',
    options: [
      { id: 'a', label: 'Because guest networks usually need the same printer mappings as staff networks' },
      { id: 'b', label: 'Because guest access is often intentionally isolated from internal services' },
      { id: 'c', label: 'Because printer discovery often relies on internal network paths that guest devices should not reach' },
      { id: 'd', label: 'Because guest traffic is normally restricted until a matching access rule is approved' }
    ],
    correctOptionId: 'b'
  }),
  mcq({
    id: 'strict-teams-linger',
    prompt: 'A departed staff account still appears in Teams. Which answer shows the safest judgement?',
    domain: 'M365 offboarding',
    difficulty: 'stretch',
    explanation: 'One service view should not trigger improvised identity changes.',
    modelAnswer:
      'Capture the current state, note the departure context, and escalate through the authorised owner because service visibility can lag or sequencing may need review.',
    commonMistakes: ['Assuming Josh should force extra identity changes himself', 'Treating one symptom as proof of total failure'],
    dcsContext: 'Identity issues carry privacy and access risk.',
    reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
    recommendedModuleId: 'm365-identity-offboarding-basics',
    weakTopic: 'offboarding-sequence',
    options: [
      { id: 'a', label: 'Assume the offboarding failed completely and start removing memberships yourself' },
      { id: 'b', label: 'Document the symptom and escalate because visibility can lag or sequencing may need review' },
      { id: 'c', label: 'Wait a few weeks before mentioning it because Teams visibility is rarely urgent' },
      { id: 'd', label: 'Force a password reset on the departed account so the Teams entry disappears' }
    ],
    correctOptionId: 'b'
  }),
  scenarioResponse({
    id: 'strict-risk-note',
    prompt:
      'Josh wants to log a real phishing incident in the PD app so he remembers it. Explain the safer alternative and the risk he needs to notice.',
    domain: 'Security and ticket judgement',
    difficulty: 'challenge',
    explanation: 'Personal study tools should not carry live confidential incident detail.',
    modelAnswer:
      'Keep live incident details in the authorised work system only. In the PD app, record the high-level lesson, the escalation pathway, and the pattern recognised without copying real names, addresses, or message content.',
    commonMistakes: ['Copying the original email or sender detail into the PD app', 'Treating privacy as optional because the app is local'],
    dcsContext: 'The app is personal PD, not the incident system of record.',
    reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
    recommendedModuleId: 'ticket-notes-escalation-quality',
    weakTopic: 'security-risk-judgement',
    rubric: ['Protects sensitive detail', 'Uses the PD app appropriately', 'Names the safer documentation path']
  }),
  scenarioResponse({
    id: 'strict-display-judgement',
    prompt:
      'A teacher is waiting at the front of a class while Josh tests a ViewBoard. Explain the point where persistence stops helping and escalation becomes the better support move.',
    domain: 'Classroom display troubleshooting',
    difficulty: 'challenge',
    explanation: 'Front-of-class time is part of the risk calculation.',
    modelAnswer:
      'Persistence stops helping once the quick visible checks are exhausted and class time is continuing to burn. At that point, Josh should preserve the symptom, provide a fallback if possible, and escalate with a short evidence-rich note.',
    commonMistakes: ['Confusing stubbornness with professionalism', 'Ignoring class impact'],
    dcsContext: 'Public troubleshooting carries both teaching and relationship cost.',
    reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
    recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
    weakTopic: 'ticket-quality',
    rubric: ['Explains the time threshold', 'Protects class impact', 'Shows clean escalation judgement']
  })
];

export const strictQuestionBank: AssessmentQuestion[] = [
  // Weight strict practice toward DCS enquiry themes by sampling more from core workflow modules.
  ...modules.flatMap((module) => {
    const dcsPriorityModuleIds = new Set([
      'ticket-notes-escalation-quality',
      'login-password-support',
      'sentral-support',
      'new-user-onboarding',
      'permissions-access-requests',
      'teams-sharepoint-onedrive-support',
      'parent-portal-registration',
      'parent-portal-details-updates'
    ]);

    const takeCount = dcsPriorityModuleIds.has(module.id) ? 5 : 3;
    return module.quiz.slice(0, takeCount);
  }),
  ...extraStrictQuestions
];

export function getQuestionsByWeakTopic(weakTopic: string) {
  return strictQuestionBank.filter((question) => question.weakTopic === weakTopic);
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function getStrictQuizQuestions(weakTopic?: string | null, count = 12) {
  if (weakTopic) {
    const focused = getQuestionsByWeakTopic(weakTopic);
    const mixedContext = strictQuestionBank.filter((question) => question.weakTopic !== weakTopic);

    // Revisit weak topics in mixed contexts: mostly weak-topic items plus cross-domain questions.
    const focusedSlice = shuffle(focused).slice(0, Math.min(8, count));
    const remainder = count - focusedSlice.length;
    const mixedSlice = shuffle(mixedContext).slice(0, Math.max(0, remainder));
    return shuffle([...focusedSlice, ...mixedSlice]);
  }

  return shuffle(strictQuestionBank).slice(0, count);
}
