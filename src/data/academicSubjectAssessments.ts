import type { AssessmentQuestion } from '../types/assessment';

function mcq(question: Omit<Extract<AssessmentQuestion, { type: 'mcq' }>, 'type'>): AssessmentQuestion {
  return {
    type: 'mcq',
    ...question
  };
}

function explainItSimply(
  question: Omit<Extract<AssessmentQuestion, { type: 'explain-it-simply' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'explain-it-simply',
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

export const academicSubjectAssessments: Record<string, AssessmentQuestion[]> = {
  cse1iit: [
    mcq({
      id: 'cse1iit-mcq-1',
      prompt:
        'A classroom laptop powers on and the local desktop appears, but the school portal page will not load. Which answer best describes the likely issue?',
      domain: 'Hardware and network basics',
      difficulty: 'foundation',
      explanation:
        'If the device boots normally, the hardware is likely fine. A portal load failure is more often caused by a network or service access issue.',
      modelAnswer:
        'The device appears to be functioning, so the problem is probably in the network or the portal service rather than the computer hardware itself.',
      commonMistakes: [
        'Assuming the screen or keyboard is the cause',
        'Thinking the device must be broken because one website does not load'
      ],
      dcsContext: 'This kind of judgement helps focus troubleshooting on network and service dependencies instead of replacing working hardware.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'vlans-network-segmentation',
      weakTopic: 'rbc-hardware-network-web',
      options: [
        { id: 'a', label: 'The device hardware is fine, but the portal is blocked by network or service access' },
        { id: 'b', label: 'The keyboard or mouse is failing and preventing the page from loading' },
        { id: 'c', label: 'The portal page is down because the browser cache is full' },
        { id: 'd', label: 'The screen is not displaying the content correctly because of a video driver issue' }
      ],
      correctOptionId: 'a'
    }),
    explainItSimply({
      id: 'cse1iit-explain-1',
      prompt:
        'Explain simply why a laptop can look fine on the desktop but still fail to open a web-based school app.',
      domain: 'Hardware and network basics',
      difficulty: 'foundation',
      explanation:
        'A working desktop only proves the local device is operating. Web apps also require network connectivity, DNS, and the application server to be available.',
      modelAnswer:
        'The laptop can be fine locally, but the app still needs the network and the school service to work. So the issue is likely between the laptop and the website, not inside the laptop itself.',
      commonMistakes: [
        'Treating the problem as if the laptop hardware is broken',
        'Ignoring the difference between local apps and online services'
      ],
      dcsContext:
        'This clear explanation helps support staff avoid unnecessary hardware replacements when a network or service problem is the real cause.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'vlans-network-segmentation',
      weakTopic: 'rbc-hardware-network-web',
      rubric: [
        'Mentions the local device is working',
        'Mentions network or service dependency',
        'Keeps the explanation simple and practical'
      ],
      keywordHints: ['network', 'browser', 'service', 'device']
    })
  ],
  cse1icb: [
    mcq({
      id: 'cse1icb-mcq-1',
      prompt:
        'A teacher forwards a suspicious login alert to you. What is the safest first response for school IT support?',
      domain: 'Cybersecurity awareness',
      difficulty: 'foundation',
      explanation:
        'Suspicious login alerts should be documented and escalated because acting without the right permissions can create privacy and access risks.',
      modelAnswer:
        'Record the alert and escalate it to the authorised security or identity team rather than attempting to resolve it yourself.',
      commonMistakes: [
        'Trying to fix the account immediately without proper authorization',
        'Ignoring the alert because it looks like a simple login issue'
      ],
      dcsContext: 'This judgement protects student and staff accounts while keeping support within safe boundaries.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'ticket-notes-escalation-quality',
      weakTopic: 'rbc-cybersecurity',
      options: [
        { id: 'a', label: 'Document the alert and escalate to the authorised security or identity team' },
        { id: 'b', label: 'Reset the password yourself to stop the suspicious login' },
        { id: 'c', label: 'Ignore the alert because the teacher can still access the account' },
        { id: 'd', label: 'Ask the teacher to change the password immediately without recording the incident' }
      ],
      correctOptionId: 'a'
    }),
    explainItSimply({
      id: 'cse1icb-explain-1',
      prompt:
        'Explain in plain language why you should keep incident notes private when handling a suspicious email or login alert.',
      domain: 'Cybersecurity awareness',
      difficulty: 'foundation',
      explanation:
        'Sensitive incident details can contain student or staff data and should not be shared casually. Keep notes limited to what is needed for support and escalation.',
      modelAnswer:
        'Keep the note short and focused on the problem and next step. Do not copy real names, email content, or passwords into the PD notes.',
      commonMistakes: [
        'Including full message text or personal details in a support note',
        'Treating the PD app as a general incident report system'
      ],
      dcsContext:
        'Privacy-safe notes help you learn from security incidents without creating new data protection problems.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'ticket-notes-escalation-quality',
      weakTopic: 'rbc-cybersecurity',
      rubric: [
        'Mentions sensitive details should be limited',
        'Explains why privacy matters for incident notes',
        'Keeps the answer practical for school support'
      ],
      keywordHints: ['privacy', 'incident', 'sensitive', 'notes']
    })
  ],
  cse1pe: [
    mcq({
      id: 'cse1pe-mcq-1',
      prompt:
        'Which programming construct best describes a script that repeats the same device check for every laptop in a classroom list?',
      domain: 'Programming logic',
      difficulty: 'foundation',
      explanation:
        'Repeating the same action for each item in a list is an example of iteration.',
      modelAnswer:
        'That is iteration: doing the same process for each device in a set.',
      commonMistakes: ['Calling it sequence or selection instead of repetition', 'Confusing the list with the operation'],
      dcsContext:
        'Recognising iteration helps you understand how automation handles multiple devices or accounts.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
      weakTopic: 'rbc-programming-logic',
      options: [
        { id: 'a', label: 'Iteration: repeating a task for each item in a list' },
        { id: 'b', label: 'Selection: choosing one action based on a condition' },
        { id: 'c', label: 'Sequence: running steps one after another' },
        { id: 'd', label: 'Recursion: calling the same step from within itself' }
      ],
      correctOptionId: 'a'
    }),
    explainItSimply({
      id: 'cse1pe-explain-1',
      prompt:
        'In simple terms, explain why you should check what a script does before running it on school devices.',
      domain: 'Programming logic',
      difficulty: 'foundation',
      explanation:
        'Scripts can change many devices quickly. If you do not understand the steps, you may run something that causes unwanted changes.',
      modelAnswer:
        'Check the script first so you know what it will do and can avoid accidentally changing the wrong devices or settings.',
      commonMistakes: [
        'Assuming all scripts are safe if they look short',
        'Thinking only the person who wrote it needs to understand it'
      ],
      dcsContext:
        'This kind of safe script review is essential before using automation in a school environment.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
      weakTopic: 'rbc-programming-logic',
      rubric: [
        'Explains why understanding the script is important',
        'Mentions the risk of unintended changes',
        'Keeps the answer simple and practical'
      ],
      keywordHints: ['script', 'review', 'devices', 'risk']
    })
  ],
  sta1dct: [
    mcq({
      id: 'sta1dct-mcq-1',
      prompt:
        'A report shows a sudden spike in incident tickets on one day. Which conclusion is the safest from a first review?',
      domain: 'Data literacy and critical thinking',
      difficulty: 'foundation',
      explanation:
        'A single spike may be meaningful, but you should first check whether it is caused by a reporting change or one-off event.',
      modelAnswer:
        'It is a useful signal, but you should verify whether the spike reflects a real issue or a change in reporting before deciding.',
      commonMistakes: [
        'Treating the spike as proof of a system failure',
        'Ignoring the possibility of a measurement or reporting change'
      ],
      dcsContext:
        'This helps avoid overreacting to a report and encourages grounded support decisions.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'ticket-notes-escalation-quality',
      weakTopic: 'rbc-data-interpretation',
      options: [
        { id: 'a', label: 'Check whether the spike is due to a real issue or a reporting/data change' },
        { id: 'b', label: 'Assume the system failed and open an emergency ticket' },
        { id: 'c', label: 'Ignore the spike because reports are often wrong' },
        { id: 'd', label: 'Immediately notify all staff of a network outage' }
      ],
      correctOptionId: 'a'
    }),
    explainItSimply({
      id: 'sta1dct-explain-1',
      prompt:
        'Explain in plain language why one day’s data spike does not always mean there is a continuing problem.',
      domain: 'Data literacy and critical thinking',
      difficulty: 'foundation',
      explanation:
        'A one-day spike may be caused by a one-off event, a data update, or a reporting change. You need more information before calling it a lasting problem.',
      modelAnswer:
        'It could be a real issue, but it might also be a single event or a change in how the data was collected. So check more context before deciding.',
      commonMistakes: [
        'Turning a single number into a broad conclusion',
        'Forgetting that dashboards can change how they count things'
      ],
      dcsContext:
        'This kind of thinking keeps support decisions tied to evidence instead of panic.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'ticket-notes-escalation-quality',
      weakTopic: 'rbc-data-interpretation',
      rubric: [
        'Mentions that a single spike is not enough evidence',
        'Mentions need for context or follow-up',
        'Explains why caution is valuable'
      ],
      keywordHints: ['spike', 'context', 'one-off', 'evidence']
    })
  ],
  cse3pe: [
    mcq({
      id: 'cse3pe-mcq-1',
      prompt:
        'Which is the best professional decision when a support request feels risky and outside your scope?',
      domain: 'Professional practice',
      difficulty: 'foundation',
      explanation:
        'Professional conduct means escalating safely rather than improvising in uncertain areas.',
      modelAnswer:
        'Document the request and escalate it to the appropriate team with a clear note, rather than trying to solve it yourself.',
      commonMistakes: [
        'Trying to fix a risky request without a clear approval path',
        'Delaying escalation because you want to solve it quickly'
      ],
      dcsContext:
        'Keeping the boundary clear protects students and the school while still moving the issue forward.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'ticket-notes-escalation-quality',
      weakTopic: 'rbc-professional-practice',
      options: [
        { id: 'a', label: 'Escalate with a clear note and keep the request within safe professional boundaries' },
        { id: 'b', label: 'Solve it yourself quickly to avoid bothering anyone else' },
        { id: 'c', label: 'Ignore the risk and wait to see if it gets worse' },
        { id: 'd', label: 'Tell the requester you cannot help without offering next steps' }
      ],
      correctOptionId: 'a'
    }),
    explainItSimply({
      id: 'cse3pe-explain-1',
      prompt:
        'Explain simply why a support note should focus on impact and next steps rather than dramatic language.',
      domain: 'Professional practice',
      difficulty: 'foundation',
      explanation:
        'Clear, calm support notes help others understand the problem and action required. Drama can distract from the real issue.',
      modelAnswer:
        'A good note says what happened, who is affected, and what should happen next without exaggerated words.',
      commonMistakes: [
        'Using dramatic phrasing that confuses the real issue',
        'Missing a clear next step or impact statement'
      ],
      dcsContext:
        'This keeps handoff communication useful and professional for school IT teams.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'ticket-notes-escalation-quality',
      weakTopic: 'rbc-professional-practice',
      rubric: [
        'Keeps language calm and clear',
        'Identifies impact and next step',
        'Shows professional support judgement'
      ],
      keywordHints: ['impact', 'next step', 'clear', 'professional']
    })
  ],
  cse1is: [
    mcq({
      id: 'cse1is-mcq-1',
      prompt:
        'Which element is part of a simple school information system?',
      domain: 'Information systems',
      difficulty: 'foundation',
      explanation:
        'A school information system includes users, data, processes, and the tools that connect them.',
      modelAnswer:
        'It includes the people who use it, the data it stores, the processes it follows, and the software or hardware that supports it.',
      commonMistakes: [
        'Naming only hardware or only data without the connecting process',
        'Treating the system as a single device rather than a system of parts'
      ],
      dcsContext:
        'Understanding the system components helps you communicate with colleagues and avoid narrow assumptions.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
      weakTopic: 'rbc-information-systems',
      options: [
        { id: 'a', label: 'Users, data, processes, and the tools that connect them' },
        { id: 'b', label: 'Only the physical classroom devices' },
        { id: 'c', label: 'Only the report or dashboard display' },
        { id: 'd', label: 'Only the storage media used by the system' }
      ],
      correctOptionId: 'a'
    }),
    explainItSimply({
      id: 'cse1is-explain-1',
      prompt:
        'Why is it important to capture requirements before changing a school system?',
      domain: 'Information systems',
      difficulty: 'foundation',
      explanation:
        'Requirements describe the actual need. Changing a system without them can lead to the wrong solution or more work later.',
      modelAnswer:
        'Requirements make sure you solve the right problem. Without them, you can build or change something that does not help the school.',
      commonMistakes: [
        'Assuming the request itself is the full requirement',
        'Skipping requirements because the requested change seems simple'
      ],
      dcsContext:
        'Good requirements keep support and change aligned with school priorities and reduce repeated work.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: 'ticket-notes-escalation-quality',
      weakTopic: 'rbc-information-systems',
      rubric: [
        'Explains the role of requirements',
        'Mentions the risk of solving the wrong problem',
        'Keeps the answer simple and relevant'
      ],
      keywordHints: ['requirements', 'problem', 'solution', 'change']
    })
  ]
};
