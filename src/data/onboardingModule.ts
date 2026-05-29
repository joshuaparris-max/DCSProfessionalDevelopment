import type { TrainingModule } from '../types/training';

const reviewSchedule = 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.';

export const onboardingModule: TrainingModule = {
  id: 'new-user-onboarding-access-checks',
  title: 'New User Onboarding and Missing Access Checks',
  description: 'Triage for new staff, students, and prac teachers who are missing access or have incomplete account readiness.',
  domain: 'Operations',
  level: 'L1',
  estimatedMinutes: 20,
  tags: ['Onboarding', 'Account Readiness', 'Access', 'Entra ID'],
  learningObjectives: [
    'Verify account readiness across laptop, email, and school portals.',
    'Identify missing group memberships that block access to shared resources.',
    'Communicate clearly with new staff about the status of their access requests.',
    'Escalate cleanly when a request is missing from the HR/Business office source.'
  ],
  dcsRelevance: [
    'New staff onboarding is a high-visibility process. Errors here impact the teacher\'s first impression of DCS IT.',
    'Understanding the "readiness checklist" prevents Josh from attempting technical fixes for what might be a missing HR approval.',
    'L1 triage should separate "Technical Error" from "Access Not Yet Granted".'
  ],
  sections: [
    {
      id: 'onboarding-1',
      title: 'The Onboarding Flow',
      bodyMarkdown: `At DCS, a new account usually follows this path:\n\n1. **HR/Business Office**: Triggers the request.\n2. **ICT (Paul/Admin)**: Creates the account and assigns groups.\n3. **The User**: Receives credentials and logs in.\n\n**Triage Rule:** If a user exists but has no access, check if the "New User Checklist" was completed for their specific role (Staff, Student, or Prac).`
    },
    {
      id: 'onboarding-2',
      title: 'Missing Access: Group Thinking',
      bodyMarkdown: `Most access at DCS (Shared drives, Teams, Portals) is governed by **Security Groups** in Entra ID.\n\nIf a user says "I can see the folder but it says Access Denied," they likely have the mapping but are not in the group. If they can't see the folder at all, the mapping itself might be missing or delayed by sync lag.`
    },
    {
      id: 'onboarding-3',
      title: 'Account Readiness vs Device Readiness',
      bodyMarkdown: `Just because an account exists doesn't mean the device is ready. \n\n**Checklist for Day One:**\n- Can they log in to the laptop?\n- Does Outlook/Email work?\n- Can they reach Sentral/Parent Portal?\n- Are they in the correct Staff/Student Teams?\n- Is PaperCut (Printing) active?`
    },
    {
      id: 'onboarding-4',
      title: 'The "Helpfully Welcoming" Boundary',
      bodyMarkdown: `New staff are often stressed. Your job is to be the "Helpfully Welcoming" face of IT while maintaining security boundaries.\n\n**Josh's Boundary:** You can check group membership and verify login. Do not manually grant access to sensitive folders or create accounts without a formal request from the Business Office.`
    }
  ],
  interactiveLabs: [
    {
      id: 'lab-missing-teams-access',
      title: 'Missing Teams Access',
      scenario: 'A new teacher says, "I can log in to Teams, but I can\'t see the Year 7 Science Team that I\'m supposed to be teaching today."',
      decisionPoints: [
        {
          id: 'd1',
          question: 'What is the FIRST thing you should check?',
          options: [
            { id: 'o1', label: 'Check if they are a member of the Team in the Teams app or Entra ID.', feedback: 'Correct. This is the most likely cause for a missing Team.', isCorrect: true },
            { id: 'o2', label: 'Tell them to wait 24 hours for sync.', feedback: 'Risky. If they need it for a class today, "wait" is not a good answer without checking the membership first.', isCorrect: false },
            { id: 'o3', label: 'Ask the Principal to add them.', feedback: 'Too high an escalation for a simple membership check.', isCorrect: false }
          ]
        },
        {
          id: 'd2',
          question: 'They are NOT in the Team. What is the safest next step?',
          options: [
            { id: 'o1', label: 'Add them to the Team yourself (if you have permissions).', feedback: 'Correct, if it matches their assigned timetable/role. If unsure, check with Paul or the Team Owner.', isCorrect: true },
            { id: 'o2', label: 'Ask for their password to see what they see.', feedback: 'NEVER ask for a password.', isCorrect: false }
          ]
        }
      ],
      dcsApplication: 'At DCS, Team membership is usually managed by the Head of Department or ICT Admin. Verify the request exists before adding.',
      retrievalQuestion: 'What is the name of the tool used to manage DCS user groups?',
      reflectionPrompt: 'How do you handle a teacher who is feeling "forgotten" because their access isn\'t ready yet?'
    }
  ],
  flashcards: [
    { id: 'onboarding-f1', front: 'Who triggers a new staff account at DCS?', back: 'The HR or Business Office.' },
    { id: 'onboarding-f2', front: 'What is the most common reason for missing file access?', back: 'Missing security group membership in Entra ID.' },
    { id: 'onboarding-f3', front: 'What is the difference between account and device readiness?', back: 'Account is the digital identity; device is the physical laptop/setup.' },
    { id: 'onboarding-f4', front: 'Why shouldn\'t Josh create accounts manually?', back: 'It bypasses the formal HR/Business Office workflow and security audit.' },
    { id: 'onboarding-f5', front: 'Name 3 things on a Day One checklist.', back: 'Laptop login, Email, Teams access, Portal access, Printing.' },
    { id: 'onboarding-f6', front: 'What should you do if an onboarding request is missing?', back: 'Politely explain that the request hasn\'t reached ICT yet and direct them to the Business Office.' },
    { id: 'onboarding-f7', front: 'What is "Sync Lag"?', back: 'The delay between a change in the admin portal and it appearing on the user\'s device.' },
    { id: 'onboarding-f8', front: 'How do you balance security and being welcoming?', back: 'Verify identity and requests strictly, but communicate with calm and helpful language.' }
  ],
  quiz: [
    {
      type: 'mcq',
      id: 'onboarding-q1',
      prompt: 'A new Prac teacher says they can\'t log in. You find no record of them in the system. What is the correct L1 response?',
      domain: 'Operations',
      difficulty: 'foundation',
      explanation: 'ICT cannot create accounts without a formal request.',
      modelAnswer: 'Politely explain that the account hasn\'t been created yet and check if the Business Office has processed their paperwork.',
      options: [
        { id: 'a', label: 'Create a temporary guest account for them.' },
        { id: 'b', label: 'Tell them to use another teacher\'s login for today.' },
        { id: 'c', label: 'Explain that the account setup starts with the Business Office and check the status of the request.' },
        { id: 'd', label: 'Tell them to go home until it\'s fixed.' }
      ],
      correctOptionId: 'c',
      dcsContext: 'Prac teachers at DCS must follow the same onboarding security as regular staff.',
      reviewSchedule,
      recommendedModuleId: 'new-user-onboarding-access-checks',
      weakTopic: 'new-user-onboarding'
    }
  ]
};
