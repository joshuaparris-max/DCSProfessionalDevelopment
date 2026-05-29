import type { TrainingModule } from '../types/training';

const reviewSchedule = 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.';

export const dcsWorkflowModules: TrainingModule[] = [
  {
    id: 'parent-portal-registration',
    title: 'Parent Portal Registration',
    description:
      'First-line triage for parent portal account creation and access-key issues with clear escalation to administration owners.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 22,
    careerTrack: 'School IT',
    attributeFocus: 'Spirit',
    tags: ['Parent Portal', 'registration', 'access key', 'escalation'],
    learningObjectives: [
      'Separate ICT connectivity problems from administration-owned enrolment or identity workflows.',
      'Collect access-key, timing, and device-scope evidence without handling authoritative record changes.',
      'Draft parent-facing wording that is calm, privacy-safe, and escalation-ready.'
    ],
    dcsRelevance: [
      'Reduces rework when registration symptoms are actually workflow or data completeness problems.',
      'Keeps student and parent detail out of improvised ICT fixes.'
    ],
    sections: [
      {
        id: 'ppr-1',
        title: 'Diagnose registration vs technical blocker',
        bodyMarkdown:
          'Ask whether the parent completed the expected invitation flow, received any confirmation message, and whether the symptom is “cannot start”, “code rejected”, or “cannot log in after success”. Capture browser/device scope without requesting passwords.'
      },
      {
        id: 'ppr-2',
        title: 'Access-key and timing clues',
        bodyMarkdown:
          'Capture whether the key expired, was reused, or looks truncated when read aloud. Note timezone/date confusion gently and confirm which campus or cohort the parent expects.'
      },
      {
        id: 'ppr-3',
        title: 'Ownership boundary',
        bodyMarkdown:
          'ICT validates obvious technical blockers and captures evidence; authoritative enrolment or demographic corrections usually belong with administration. Escalate with who/when/what tried and privacy-safe wording.'
      }
    ],
    interactiveLabs: [
      {
        id: 'lab-offboarding-sequence',
        title: 'Identity Offboarding Logic',
        scenario: 'A staff member left DCS on Friday. Today is Monday, and their former team says "They are still showing up as Available in Teams!"',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is the FIRST question Josh should ask to clarify the situation?',
            options: [
              { id: 'o1', label: 'Have you tried messaging them to see if they reply?', feedback: 'Risky. If they are still logged in, you might be leaking school info.', isCorrect: false },
              { id: 'o2', label: 'Is this just in the search bar, or can you see their status icon?', feedback: 'Good. Search results are often cached longer than real-time status.', isCorrect: true },
              { id: 'o3', label: 'Did they take their laptop with them?', feedback: 'Important later, but status visibility is the immediate concern.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'Which safe first check should you perform (if you have read-only access)?',
            options: [
              { id: 'o1', label: 'Check the "Account Enabled" status in the Entra ID portal.', feedback: 'Correct. This is the source of truth for the account state.', isCorrect: true },
              { id: 'o2', label: 'Delete the user from the Teams Admin Center.', feedback: 'Too early and too invasive. Follow the sequence.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'Offboarding at DCS involves Paul, the Business Office, and specific M365 checklists. Level 1 captures the "Available" symptom as evidence.',
        retrievalQuestion: 'Why do Microsoft services sometimes show different account states?',
        reflectionPrompt: 'How do you explain "service lag" to a staff member who is worried about security?'
      },
      {
        id: 'lab-parent-portal-reg',
        title: 'Parent Portal Registration',
        scenario: 'A parent calls saying the registration code from the letter "doesn\'t work". They sound frustrated.',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is the FIRST question Josh should ask?',
            options: [
              { id: 'o1', label: 'Are you getting a specific error message?', feedback: 'Correct. Knowing if it is "Invalid Code", "Expired", or "Already Used" changes the triage.', isCorrect: true },
              { id: 'o2', label: 'Are you sure you typed it correctly?', feedback: 'Risky. Can sound condescending. Ask for the error first.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'What should you NOT change too early?',
            options: [
              { id: 'o1', label: 'Generate a new code in Sentral.', feedback: 'Correct. If the parent is on the wrong URL, a new code won\'t help and might invalidate the old one.', isCorrect: true },
              { id: 'o2', label: 'The parent\'s browser cache.', feedback: 'Safe but usually not the issue for registration codes.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'Sentral Parent Portal is the DCS source of truth for parent comms. Verify the URL they are using first (DCS specific Sentral URL).',
        retrievalQuestion: 'What are the three main symptom buckets for portal registration?',
        reflectionPrompt: 'How do you balance "security verification" with being "helpfully welcoming" to a new parent?'
      },
      {
        id: 'lab-student-169-ip',
        title: 'Student Laptop 169.254 IP',
        scenario: 'A student says their internet is "broken". You run ipconfig and see an IPv4 address starting with 169.254.',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What does this IP address immediately tell you?',
            options: [
              { id: 'o1', label: 'The DNS server is down.', feedback: 'Incorrect. 169.254 is an APIPA address meaning DHCP failed.', isCorrect: false },
              { id: 'o2', label: 'The laptop failed to get a DHCP lease.', feedback: 'Correct. This narrows the issue to Wi-Fi connectivity or DHCP server reachability.', isCorrect: true }
            ]
          },
          {
            id: 'd2',
            question: 'What is a safe first check?',
            options: [
              { id: 'o1', label: 'Toggle Wi-Fi off and back on.', feedback: 'Good. A simple re-association can often trigger a successful DHCP request.', isCorrect: true },
              { id: 'o2', label: 'Assign a static IP address.', feedback: 'NEVER do this on a student laptop. It will break when they move to another room or home.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'At DCS, check if other students in the same room are affected. If it is just one, focus on that laptop adapter/profile.',
        retrievalQuestion: 'What does 169.254 stand for in networking terms?',
        reflectionPrompt: 'How do you explain to a student that "bars" on Wi-Fi don\'t always mean "internet"?'
      },
      {
        id: 'lab-slow-laptop-triage',
        title: 'Slow Laptop Triage',
        scenario: 'A staff member says their laptop is "unusable" and "taking forever to do anything".',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is the FIRST question Josh should ask?',
            options: [
              { id: 'o1', label: 'When did you last restart?', feedback: 'Classic but essential. Uptime often explains "slowness".', isCorrect: true },
              { id: 'o2', label: 'How many Chrome tabs do you have open?', feedback: 'Good, but restart is a more comprehensive first check.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'You check Task Manager. Disk usage is at 100% but CPU is 5%. What does this suggest?',
            options: [
              { id: 'o1', label: 'The hard drive is failing or a Windows Update is indexing.', feedback: 'Correct. High disk with low CPU usually points to I/O bottlenecks.', isCorrect: true },
              { id: 'o2', label: 'The RAM is full.', feedback: 'Incorrect. Full RAM usually causes high "Memory" usage and CPU paging, not just disk.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'At DCS, slow laptops might be running a background BitLocker encryption or a large OneDrive sync. Check the taskbar icons.',
        retrievalQuestion: 'What is the "uptime" command in CMD/PowerShell?',
        reflectionPrompt: 'How do you handle a teacher who wants a new laptop immediately because their current one is "slow"?'
      },
      {
        id: 'lab-new-staff-access',
        title: 'New Staff Access Triage',
        scenario: 'A new staff member can log in to their laptop but says they "can\'t see the shared drive" and "Teams is empty".',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is the FIRST question Josh should ask?',
            options: [
              { id: 'o1', label: 'Which shared drive specifically are you looking for?', feedback: 'Good. We need to know which security group they might be missing.', isCorrect: true },
              { id: 'o2', label: 'What is your password?', feedback: 'NEVER ask for a password. DCS policy.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'Which safe first check should you perform?',
            options: [
              { id: 'o1', label: 'Check their group memberships in the Entra ID portal.', feedback: 'Correct. Most access at DCS is group-based.', isCorrect: true },
              { id: 'o2', label: 'Manually map the drive on their laptop using your own credentials.', feedback: 'BAD. This creates a security risk and doesn\'t fix the underlying permission issue.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'At DCS, new staff onboarding is a coordinated process. Check if the HR/Business office request was completed fully.',
        retrievalQuestion: 'What is RBAC?',
        reflectionPrompt: 'How do you handle a new staff member who is feeling "forgotten" because their access isn\'t ready yet?'
      },
      {
        id: 'lab-suspicious-email',
        title: 'Suspicious Email Triage',
        scenario: 'A staff member says "I got this weird email from the Principal asking for my mobile number, but it looks a bit off."',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is the FIRST question Josh should ask?',
            options: [
              { id: 'o1', label: 'Did you click any links or download any attachments?', feedback: 'Critical. This determines if we are in "Report" mode or "Incident Response" mode.', isCorrect: true },
              { id: 'o2', label: 'What is the sender\'s email address?', feedback: 'Good, but click-status is the immediate priority for containment.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'The sender address is "principal.dcs@gmail.com". What does this tell you?',
            options: [
              { id: 'o1', label: 'It is a phishing attempt. DCS staff use @dcs.edu.au.', feedback: 'Correct. External domains impersonating staff is a common tactic.', isCorrect: true },
              { id: 'o2', label: 'The Principal is just using their personal email today.', feedback: 'NEVER assume this. Treat as suspicious.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'At DCS, phishing should be reported via the "Report Message" button in Outlook and Paul should be notified if it looks like a targeted campaign.',
        retrievalQuestion: 'What is "Spear Phishing"?',
        reflectionPrompt: 'How do you praise the staff member for reporting the email without making them feel silly for being "almost" tricked?'
      },
      {
        id: 'lab-wireless-casting-lag',
        title: 'Wireless Casting Lag',
        scenario: 'A teacher is using the ViewBoard wireless casting (e.g. vCast or AirPlay) and says "It\'s so laggy and blurry, I can\'t teach like this."',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is a safe first check?',
            options: [
              { id: 'o1', label: 'Check if the laptop and ViewBoard are on the same Wi-Fi frequency (e.g. 5GHz).', feedback: 'Good. Mixed frequencies or weak signals cause high latency in casting.', isCorrect: true },
              { id: 'o2', label: 'Reboot the entire school network.', feedback: 'Extremely invasive. Do not do this for one classroom issue.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'What is the "DCS fallback" advice if wireless remains unstable?',
            options: [
              { id: 'o1', label: 'Switch to a physical HDMI cable.', feedback: 'Correct. For high-bandwidth tasks like video, HDMI is the reliable DCS standard.', isCorrect: true },
              { id: 'o2', label: 'Tell the teacher to stop using video in class.', feedback: 'Unhelpful. Provide a technical alternative instead.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'Wireless casting at DCS depends on signal density in the room. HDMI is always the recommended "Plan B" for important lessons.',
        retrievalQuestion: 'Why is HDMI preferred over wireless for video playback?',
        reflectionPrompt: 'How do you set expectations for wireless technology without sounding like you are making excuses?'
      }
    ],
    flashcards: [
      { id: 'ppr-f1', front: 'What three symptom buckets help Parent Portal registration triage?', back: 'Cannot start flow, code or link rejected, or login fails after apparent success.' },
      { id: 'ppr-f2', front: 'Why avoid collecting passwords in chat?', back: 'Passwords are secrets; use safer flows and escalate compromise suspicion properly.' },
      { id: 'ppr-f3', front: 'Who usually owns authoritative enrolment record fixes?', back: 'School administration or designated enrolment owners—not ICT improvisation.' },
      { id: 'ppr-f4', front: 'What evidence proves scope?', back: 'Whether multiple parents fail or only one household/device.' },
      { id: 'ppr-f5', front: 'What should a parent-facing reply prioritise?', back: 'Calm clarity, next safe step, and realistic timeframe without blaming.' },
      { id: 'ppr-f6', front: 'Why capture exact error text or screen?', back: 'It distinguishes validation faults from connectivity faults faster.' },
      { id: 'ppr-f7', front: 'When should Josh escalate instead of retry loops?', back: 'When evidence shows administrative action or repeated failures after safe checks.' },
      { id: 'ppr-f8', front: 'What is wrong with “Portal broken”?', back: 'It hides workflow stage and blocks the next owner from acting.' },
      { id: 'ppr-f9', front: 'Why confirm campus/cohort context?', back: 'Different cohorts can use different instructions or timing windows.' },
      { id: 'ppr-f10', front: 'Safe escalation tone includes?', back: 'Facts, scope, urgency for learning, and privacy-safe identifiers only.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'ppr-q1',
        prompt: 'A parent says the portal code “does nothing”. What is the safest first framing?',
        domain: 'Parent Portal registration',
        difficulty: 'foundation',
        explanation: 'Separate workflow completion from device/browser symptoms.',
        modelAnswer:
          'Clarify whether they opened the link, whether any confirmation appeared, and whether another device shows the same symptom before assuming infrastructure failure.',
        commonMistakes: ['Resetting passwords immediately', 'Claiming the portal is globally down without scope'],
        dcsContext: 'Registration calls mix emotions with imperfect technical detail.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'dcs-parent-portal',
        options: [
          { id: 'a', label: 'Declare the portal offline school-wide' },
          { id: 'b', label: 'Capture workflow stage, device/browser scope, and exact symptom wording' },
          { id: 'c', label: 'Ask the parent to send their password so you can test' },
          { id: 'd', label: 'Tell them to wait a week without recording evidence' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'ppr-q2',
        prompt: 'List four privacy-safe facts to capture before escalating a registration failure.',
        domain: 'Parent Portal registration',
        difficulty: 'stretch',
        explanation: 'Good notes avoid secrets yet remain actionable.',
        modelAnswer:
          'Reporter relationship to student, time of failure, browser/device type, exact error or behaviour, whether others are affected, and what steps already failed safely.',
        commonMistakes: ['Copying parent emails verbatim with unnecessary detail', 'Skipping scope'],
        dcsContext: 'Admin teams need crisp boundaries between ICT and enrolment actions.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'dcs-parent-portal',
        rubric: ['Avoids passwords', 'Shows scope', 'Shows timing', 'Shows steps tried'],
        keywordHints: ['scope', 'browser', 'error', 'others affected']
      },
      {
        type: 'order-steps',
        id: 'ppr-q3',
        prompt: 'Order first-line registration triage steps.',
        domain: 'Parent Portal registration',
        difficulty: 'foundation',
        explanation: 'Confirm workflow evidence before deeper checks.',
        modelAnswer: 'Clarify symptom bucket → confirm scope → capture safe evidence → escalate with boundary note if admin-owned.',
        commonMistakes: ['Starting with password resets', 'Skipping scope'],
        dcsContext: 'Keeps parents oriented while protecting boundaries.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'dcs-parent-portal',
        steps: [
          { id: 'bucket', label: 'Clarify which registration stage fails' },
          { id: 'scope', label: 'Confirm whether one household/device or wider' },
          { id: 'evidence', label: 'Capture privacy-safe error evidence' },
          { id: 'boundary', label: 'Escalate with admin boundary if record workflow is likely' }
        ],
        correctOrder: ['bucket', 'scope', 'evidence', 'boundary'],
        rubric: ['Orders workflow before guesses', 'Ends with safe escalation']
      },
      {
        type: 'scenario-response',
        id: 'ppr-q4',
        prompt:
          'Parent insists ICT “just fix enrolment.” Explain how you acknowledge urgency while protecting the correct ownership boundary.',
        domain: 'Parent Portal registration',
        difficulty: 'stretch',
        explanation: 'Tone plus boundary preserves trust.',
        modelAnswer:
          'Acknowledge impact on communication, explain what ICT can verify now, document evidence, and route authoritative record issues to administration while keeping the ticket moving.',
        commonMistakes: ['Arguing with the parent', 'Promising enrolment fixes ICT cannot own'],
        dcsContext: 'Parents interpret ICT as owning all systems.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'dcs-parent-portal',
        rubric: ['Acknowledges urgency', 'States ICT scope', 'Hands off cleanly']
      },
      {
        type: 'mcq',
        id: 'ppr-q5',
        prompt: 'Which parent-facing statement is most appropriate?',
        domain: 'Parent Portal registration',
        difficulty: 'foundation',
        explanation: 'Avoid blaming users while staying factual.',
        modelAnswer:
          'Transparent status with next steps beats vague reassurance or blaming.',
        commonMistakes: ['Overpromising timelines', 'Technical jargon overload'],
        dcsContext: 'Parent trust affects adoption of self-service flows.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'dcs-parent-portal',
        options: [
          { id: 'a', label: 'You must have done it wrong—try again harder.' },
          { id: 'b', label: 'Thanks—here is what we can check today and who owns the next step if it persists.' },
          { id: 'c', label: 'ICT cannot help with portals at all.' },
          { id: 'd', label: 'Send your passwords so we can reproduce it.' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'explain-it-simply',
        id: 'ppr-q6',
        prompt: 'Explain access-key expiry to a parent using plain language.',
        domain: 'Parent Portal registration',
        difficulty: 'foundation',
        explanation: 'Plain language reduces repeated failures.',
        modelAnswer:
          'Many invites expire for safety; a fresh code from the school restores access without sharing passwords.',
        commonMistakes: ['Blaming parents', 'Technical RFC language'],
        dcsContext: 'Parents may not understand invite lifetimes.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'dcs-parent-portal',
        rubric: ['Mentions expiry safety', 'Offers constructive path'],
        keywordHints: ['expire', 'invite', 'fresh']
      },
      {
        type: 'mcq',
        id: 'ppr-q7',
        prompt: 'When should suspicion of account compromise change your path?',
        domain: 'Parent Portal registration',
        difficulty: 'stretch',
        explanation: 'Compromise reporting needs authorised handling.',
        modelAnswer:
          'Escalate through security-sensitive pathways instead of improvising resets.',
        commonMistakes: ['Ignoring unusual MFA prompts', 'Testing phishing links'],
        dcsContext: 'School credentials intersect with personal devices.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'dcs-parent-portal',
        options: [
          { id: 'a', label: 'Continue normal registration retries silently' },
          { id: 'b', label: 'Treat as possible security signal and escalate via authorised process' },
          { id: 'c', label: 'Ask the parent to screenshot passwords' },
          { id: 'd', label: 'Disable accounts yourself immediately' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'ppr-q8',
        prompt: 'Draft one sentence for a ticket noting ICT vs admin ownership on registration.',
        domain: 'Parent Portal registration',
        difficulty: 'stretch',
        explanation: 'Crisp ownership prevents rework.',
        modelAnswer:
          'ICT verified safe connectivity/device behaviour; enrolment record or invitation reissue requires administration confirmation.',
        commonMistakes: ['Vague ownership', 'Including sensitive identifiers unnecessarily'],
        dcsContext: 'Handoffs should read well for non-ICT readers.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'dcs-parent-portal',
        rubric: ['States ICT checks done', 'Names admin next step'],
        keywordHints: ['ICT verified', 'administration', 'invitation']
      }
    ],
    scenarioPrompts: [
      {
        id: 'ppr-s1',
        title: 'Registration invitation fails only on mobile',
        prompt: 'Describe evidence capture and escalation split between ICT troubleshooting and admin invitation workflow.'
      }
    ],
    practicalOutputs: [
      {
        id: 'ppr-p1',
        title: 'Parent-facing registration update template',
        description:
          'Draft a short template acknowledging receipt, stating safe checks underway, and outlining realistic next milestones without sensitive detail.'
      }
    ]
  },
  {
    id: 'parent-portal-details-updates',
    title: 'Parent Portal Details Updates',
    description:
      'Triage requests to change household or student details with safe evidence capture and clean administration handoff.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 20,
    tags: ['Parent Portal', 'records', 'privacy', 'administration'],
    learningObjectives: [
      'Tell observable ICT symptoms from authoritative demographic updates.',
      'Capture urgency and safeguarding-sensitive context without over-collecting detail.',
      'Produce escalation notes that administration can action quickly.'
    ],
    dcsRelevance: [
      'Prevents ICT from becoming an unauthorised records desk.',
      'Keeps urgent safeguarding pathways visible.'
    ],
    sections: [
      {
        id: 'ppd-1',
        title: 'What ICT can observe vs what admin changes',
        bodyMarkdown:
          'ICT may confirm account visibility or obvious workflow errors; authoritative amendments to family structure typically belong with administration. Never promise timeline unless confirmed.'
      },
      {
        id: 'ppd-2',
        title: 'Urgent exceptions',
        bodyMarkdown:
          'Custody, safety, or legal-timing scenarios need calm prioritisation language and routed escalation—not improvised database edits.'
      },
      {
        id: 'ppd-3',
        title: 'Privacy-safe capture',
        bodyMarkdown:
          'Record categories of change requested, urgency reason category, and verification evidence—not unnecessary narrative.'
      }
    ],
    flashcards: [
      { id: 'ppd-f1', front: 'Who owns authoritative parent/student record edits?', back: 'School administration or designated records owners.' },
      { id: 'ppd-f2', front: 'Why avoid promising instant fixes?', back: 'Verification and authority pathways protect everyone legally.' },
      { id: 'ppd-f3', front: 'What belongs in an escalation note?', back: 'Requested change category, urgency driver, evidence location, and ICT checks performed.' },
      { id: 'ppd-f4', front: 'Should ICT paste full legal documents into tickets?', back: 'Usually no—route according to policy with minimal necessary reference.' },
      { id: 'ppd-f5', front: 'Good empathy phrase?', back: 'Acknowledge impact first, then explain verified next step.' },
      { id: 'ppd-f6', front: 'Why clarify portal vs admin workflow?', back: 'Parents may confuse display bugs with data amendment queues.' },
      { id: 'ppd-f7', front: 'ICT-safe checks?', back: 'Confirm account context visible to parent without altering authoritative fields.' },
      { id: 'ppd-f8', front: 'Safeguarding urgency signals?', back: 'Safety risk, legal deadlines, or inability to contact verified guardians.' },
      { id: 'ppd-f9', front: 'Tone trap?', back: 'Dismissive tech jargon when emotions run high.' },
      { id: 'ppd-f10', front: 'Escalation hygiene?', back: 'Single narrative plus pointers—not duplicated contradictory threads.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'ppd-q1',
        prompt: 'A parent demands immediate surname correction during class photos week. Best first move?',
        domain: 'Parent Portal updates',
        difficulty: 'stretch',
        explanation: 'Empathy plus routing beats improvisation.',
        modelAnswer:
          'Acknowledge downstream impact, capture verified change request category, and escalate via authorised administration pathway without altering records.',
        commonMistakes: ['Editing records directly', 'Debating custody'],
        dcsContext: 'Peak-season emotion amplifies urgency.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'dcs-parent-portal',
        options: [
          { id: 'a', label: 'Change it immediately in any admin tool you can reach' },
          { id: 'b', label: 'Acknowledge urgency, capture authorised change pathway, escalate to administration owner' },
          { id: 'c', label: 'Tell them portals never handle names' },
          { id: 'd', label: 'Ask them to post copies of IDs in chat' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'ppd-q2',
        prompt: 'Give two reasons ICT avoids improvising demographic edits.',
        domain: 'Parent Portal updates',
        difficulty: 'foundation',
        explanation: 'Authority and audit trails matter.',
        modelAnswer:
          'Authoritative data integrity requires verified owners, and ICT improvisation can break compliance or dual-record truth.',
        commonMistakes: ['Speed-only justification'],
        dcsContext: 'School records tie to legal and safeguarding workflows.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'dcs-parent-portal',
        rubric: ['Names authority', 'Names audit/compliance'],
        keywordHints: ['authority', 'audit', 'verified']
      },
      {
        type: 'order-steps',
        id: 'ppd-q3',
        prompt: 'Order a safe details-update workflow.',
        domain: 'Parent Portal updates',
        difficulty: 'foundation',
        explanation: 'Evidence before routing.',
        modelAnswer: 'Acknowledge → clarify category → capture minimal evidence → ICT-safe observation → admin escalation.',
        commonMistakes: ['Routing before understanding'],
        dcsContext: 'Clean narratives reduce parent repetition.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'dcs-parent-portal',
        steps: [
          { id: 'ack', label: 'Acknowledge impact and timeframe uncertainty' },
          { id: 'cat', label: 'Clarify what change is requested at category level' },
          { id: 'ev', label: 'Capture privacy-safe evidence pointers' },
          { id: 'route', label: 'Escalate through authorised administration channel' }
        ],
        correctOrder: ['ack', 'cat', 'ev', 'route'],
        rubric: ['Shows empathy early', 'Ends with authorised routing']
      },
      {
        type: 'scenario-response',
        id: 'ppd-q4',
        prompt: 'Staff forwards angry email chain with identifiers visible. What do you do?',
        domain: 'Parent Portal updates',
        difficulty: 'stretch',
        explanation: 'Protect privacy while progressing work.',
        modelAnswer:
          'Stop proliferation of unnecessary identifiers, summarise categories needed for action, route via secure pathway, and advise sender on safer forwarding.',
        commonMistakes: ['Ignoring privacy spill'],
        dcsContext: 'Email chains accumulate oversharing.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'dcs-parent-portal',
        rubric: ['Reduces overshare', 'Keeps ticket actionable']
      },
      {
        type: 'mcq',
        id: 'ppd-q5',
        prompt: 'Which detail should usually stay out of a PD reflection note?',
        domain: 'Parent Portal updates',
        difficulty: 'foundation',
        explanation: 'PD notes teach principles, not living records.',
        modelAnswer: 'Student legal names, custody schedules, or medical specifics.',
        commonMistakes: ['Duplicating incident specifics'],
        dcsContext: 'Mirrors phishing-module guidance.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'dcs-parent-portal',
        options: [
          { id: 'a', label: 'General principle about authorised records ownership' },
          { id: 'b', label: 'Full names and addresses copied from email' },
          { id: 'c', label: 'Lesson learned about routing urgency' },
          { id: 'd', label: 'Reminder not to edit authoritative fields casually' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'explain-it-simply',
        id: 'ppd-q6',
        prompt: 'Explain why portals show stale details.',
        domain: 'Parent Portal updates',
        difficulty: 'foundation',
        explanation: 'Caches and workflows explain mismatch calmly.',
        modelAnswer:
          'Displayed information may lag verification pipelines or rely on separate authoritative updates—ICT confirms symptom category without guessing timelines.',
        commonMistakes: ['Blaming parents'],
        dcsContext: 'Stale UI drives angry tickets.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'dcs-parent-portal',
        rubric: ['Mentions verification lag', 'Avoids blame'],
        keywordHints: ['verification', 'pipeline', 'lag']
      },
      {
        type: 'mcq',
        id: 'ppd-q7',
        prompt: 'Safeguarding-sensitive urgency should prompt?',
        domain: 'Parent Portal updates',
        difficulty: 'stretch',
        explanation: 'Follow school safeguarding escalation routes.',
        modelAnswer: 'Immediate routing via safeguarding pathway rather than casual queue.',
        commonMistakes: ['Downplaying keywords'],
        dcsContext: 'ICT sees forwarded distress signals.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'dcs-parent-portal',
        options: [
          { id: 'a', label: 'Standard fortnightly admin backlog' },
          { id: 'b', label: 'Safeguarding-aware escalation per policy' },
          { id: 'c', label: 'Ask parent to wait silently' },
          { id: 'd', label: 'Discuss details openly in staff kitchen' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'ppd-q8',
        prompt: 'Write a neutral ticket sentence separating ICT observation from admin action.',
        domain: 'Parent Portal updates',
        difficulty: 'stretch',
        explanation: 'Neutral clarity aids routing.',
        modelAnswer:
          'ICT confirmed portal reflects outdated household detail after login; authoritative amendment queued for administration verification.',
        commonMistakes: ['Accusatory tone'],
        dcsContext: 'Multi-team readability matters.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'dcs-parent-portal',
        rubric: ['ICT observation', 'Admin action'],
        keywordHints: ['confirmed', 'administration']
      }
    ],
    scenarioPrompts: [
      {
        id: 'ppd-s1',
        title: 'Custody-sensitive correction',
        prompt: 'Outline verification boundaries and escalation without improvising legal judgements.'
      }
    ],
    practicalOutputs: [
      {
        id: 'ppd-p1',
        title: 'Administration handoff snippet library',
        description: 'Draft three neutral sentences routing demographic updates without oversharing identifiers.'
      }
    ]
  },
  {
    id: 'sentral-support',
    title: 'Sentral Support (First-Line)',
    description:
      'Markbook visibility, access-key, and reporting-period symptoms with respectful boundaries toward Sentral administration owners.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 22,
    tags: ['Sentral', 'markbook', 'access key', 'reporting'],
    learningObjectives: [
      'Gather structured symptom detail for admin workflows.',
      'Avoid implying ICT performs authoritative Sentral configuration.',
      'Communicate impact on reporting timelines clearly.'
    ],
    dcsRelevance: ['Reporting deadlines create predictable spikes.', 'Clean notes reduce ping-pong with admin.'],
    sections: [
      {
        id: 'sen-1',
        title: 'Symptom categories',
        bodyMarkdown:
          'Separate login failures, missing classes or subjects, mark entry visibility, sync/export symptoms, and timeline questions about reporting windows.'
      },
      {
        id: 'sen-2',
        title: 'Evidence parents and teachers can supply',
        bodyMarkdown:
          'Screenshots with minimal student identifiers, exact labels missing, timeframe, and whether others share the symptom.'
      },
      {
        id: 'sen-3',
        title: 'Escalation handshake',
        bodyMarkdown:
          'Summarise ICT-performed checks, cite urgency driver (report cut-off), and attach pointers—not bulky narratives.'
      }
    ],
    flashcards: [
      { id: 'sen-f1', front: 'Who owns authoritative Sentral configuration?', back: 'Designated administration/Sentral owners—not ICT improvisation.' },
      { id: 'sen-f2', front: 'Why capture reporting-period context?', back: 'Deadlines change prioritisation language legitimately.' },
      { id: 'sen-f3', front: 'ICT-safe checks?', back: 'Browser basics, account context visibility, obvious connectivity—not roster edits.' },
      { id: 'sen-f4', front: 'Avoid claiming?', back: '"Fixed forever" without verified admin closure.' },
      { id: 'sen-f5', front: 'Good escalation opener?', back: 'Impact → scope → evidence → asks.' },
      { id: 'sen-f6', front: 'Why screenshots curated?', back: 'Reduce accidental overshare of student rows.' },
      { id: 'sen-f7', front: 'Many users symptom?', back: 'Signals systemic vs isolated records issue.' },
      { id: 'sen-f8', front: 'Parent expectation trap?', back: 'Assuming ICT can silently edit grades or timelines.' },
      { id: 'sen-f9', front: 'Staff emotion cue?', back: 'Reporting pressure—respond with calm sequencing.' },
      { id: 'sen-f10', front: 'Ticket outcome?', back: 'Clear owner plus verification expectation.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'sen-q1',
        prompt: 'Teacher cannot see class in markbook after timetable change. First-line stance?',
        domain: 'Sentral support',
        difficulty: 'foundation',
        explanation: 'Capture structured evidence for admin workflow.',
        modelAnswer:
          'Document scope, timing versus change, and escalate to Sentral owner—avoid roster edits.',
        commonMistakes: ['Promising instant roster edits'],
        dcsContext: 'Post-timetable churn spikes tickets.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'dcs-sentral-support',
        options: [
          { id: 'a', label: 'Tell them ICT never touches Sentral' },
          { id: 'b', label: 'Capture timing, scope, and escalate with reporting urgency context' },
          { id: 'c', label: 'Edit classes directly if you know how' },
          { id: 'd', label: 'Ask them to reinstall Windows' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'sen-q2',
        prompt: 'List four facts for an access-key fault.',
        domain: 'Sentral support',
        difficulty: 'stretch',
        explanation: 'Keys need expiry and reuse clarity.',
        modelAnswer: 'Recipient, delivery channel, approximate time sent, error wording, retries, alternate inbox/device scope.',
        commonMistakes: ['No scope'],
        dcsContext: 'Keys bounce silently.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'dcs-sentral-support',
        rubric: ['Shows timing', 'Shows channel', 'Shows error'],
        keywordHints: ['expiry', 'inbox', 'scope']
      },
      {
        type: 'order-steps',
        id: 'sen-q3',
        prompt: 'Order Sentral triage.',
        domain: 'Sentral support',
        difficulty: 'foundation',
        explanation: 'Understand before routing.',
        modelAnswer: 'Clarify symptom category → confirm scope → ICT-safe checks → escalate with deadline context.',
        commonMistakes: ['Routing vague tickets'],
        dcsContext: 'Admin queues sort by evidence quality.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'dcs-sentral-support',
        steps: [
          { id: 'sym', label: 'Clarify symptom category' },
          { id: 'scp', label: 'Determine single vs many users' },
          { id: 'chk', label: 'Perform ICT-safe visibility checks' },
          { id: 'esc', label: 'Escalate with reporting-period urgency if relevant' }
        ],
        correctOrder: ['sym', 'scp', 'chk', 'esc'],
        rubric: ['Logical flow']
      },
      {
        type: 'scenario-response',
        id: 'sen-q4',
        prompt: 'Leadership pings for instant Sentral fix during reporting freeze. Response?',
        domain: 'Sentral support',
        difficulty: 'challenge',
        explanation: 'Balance urgency with honest boundaries.',
        modelAnswer:
          'Acknowledge cutoff pressure, relay captured evidence to authorised owner, avoid faux certainty, offer parallel communication template.',
        commonMistakes: ['Ghosting leadership'],
        dcsContext: 'Executive pings spike anxiety.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'dcs-sentral-support',
        rubric: ['Acknowledges urgency', 'Honest boundary']
      },
      {
        type: 'mcq',
        id: 'sen-q5',
        prompt: 'Screenshots for Sentral tickets should?',
        domain: 'Sentral support',
        difficulty: 'foundation',
        explanation: 'Minimise student exposure.',
        modelAnswer: 'Crop or anonymise where possible while remaining actionable.',
        commonMistakes: ['Whole roster dumps'],
        dcsContext: 'Privacy obligations persist under pressure.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'dcs-sentral-support',
        options: [
          { id: 'a', label: 'Include every student name for completeness' },
          { id: 'b', label: 'Prefer minimal necessary fields with redaction mindset' },
          { id: 'c', label: 'Avoid screenshots entirely always' },
          { id: 'd', label: 'Post in public Teams channel for speed' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'explain-it-simply',
        id: 'sen-q6',
        prompt: 'Explain reporting-period freeze to a stressed teacher.',
        domain: 'Sentral support',
        difficulty: 'foundation',
        explanation: 'Plain timelines reduce repeated contacts.',
        modelAnswer:
          'Some windows lock edits so reports stay consistent—your note captures urgency for the owner authorised to adjust inside rules.',
        commonMistakes: ['Blaming teacher procrastination'],
        dcsContext: 'Tone affects adoption.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'dcs-sentral-support',
        rubric: ['Plain language', 'No blame'],
        keywordHints: ['window', 'authorised']
      },
      {
        type: 'mcq',
        id: 'sen-q7',
        prompt: 'Multiple staff lose Sentral access simultaneously—likely?',
        domain: 'Sentral support',
        difficulty: 'stretch',
        explanation: 'Think systemic.',
        modelAnswer: 'Service/authentication incident vs isolated credential.',
        commonMistakes: ['Infinite individual resets'],
        dcsContext: 'Correlated outages deserve consolidated escalation.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'dcs-sentral-support',
        options: [
          { id: 'a', label: 'Ignore correlation' },
          { id: 'b', label: 'Treat as potential systemic signal and escalate with correlated evidence' },
          { id: 'c', label: 'Re-image laptops' },
          { id: 'd', label: 'Tell staff browsers are always broken' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'sen-q8',
        prompt: 'One sentence stating ICT boundary on roster edits.',
        domain: 'Sentral support',
        difficulty: 'stretch',
        explanation: 'Explicit boundaries reduce assumptions.',
        modelAnswer:
          'ICT captured connectivity/account visibility symptoms; authoritative timetable or cohort corrections belong with Sentral administration.',
        commonMistakes: ['Waffle'],
        dcsContext: 'Copy-paste friendly.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'dcs-sentral-support',
        rubric: ['ICT vs admin'],
        keywordHints: ['authoritative', 'administration']
      }
    ],
    scenarioPrompts: [{ id: 'sen-s1', title: 'Reporting eve visibility fault', prompt: 'Capture urgency without owning unauthorised edits.' }],
    practicalOutputs: [{ id: 'sen-p1', title: 'Sentral escalation checklist', description: 'Checklist: symptom bucket, scope, deadlines, evidence pointers.' }]
  },
  {
    id: 'ourdcs-schoolbox-support',
    title: 'OurDCS / Schoolbox Support',
    description:
      'Separate LMS/content/login faults for staff and student workflows while capturing classroom-impact evidence.',
    domain: 'Cloud and Platforms',
    level: 'L1',
    estimatedMinutes: 21,
    tags: ['Schoolbox', 'OurDCS', 'LMS', 'portal'],
    learningObjectives: [
      'Differentiate browser/session faults from content authoring problems.',
      'Identify when escalation belongs with digital learning owners.',
      'Communicate triage steps teachers can retry safely.'
    ],
    dcsRelevance: ['High-touch classroom moments.', 'Reduces “everything broken” noise.'],
    sections: [
      {
        id: 'odb-1',
        title: 'Login vs content symptom fork',
        bodyMarkdown:
          'Ask whether authentication fails, pages partially render, attachments fail, or class tiles missing—each implies different owners.'
      },
      {
        id: 'odb-2',
        title: 'Safe teacher retries',
        bodyMarkdown:
          'Second browser, incognito with caution, network check, known-good device compares—without deleting profiles blindly.'
      },
      {
        id: 'odb-3',
        title: 'Escalation packaging',
        bodyMarkdown:
          'Exact URL/page name, role context, class impacted, timestamp, screenshot cropped—plus student impact statement.'
      }
    ],
    flashcards: [
      { id: 'odb-f1', front: 'Login fault vs content fault?', back: 'Auth/session versus missing tile/asset/upload path.' },
      { id: 'odb-f2', front: 'Why capture URL?', back: 'Many issues are page-specific configurations.' },
      { id: 'odb-f3', front: 'ICT-first checks?', back: 'Browser basics, session, simple connectivity compares.' },
      { id: 'odb-f4', front: 'Avoid?', back: 'Clearing caches blindly during class without backup plan.' },
      { id: 'odb-f5', front: 'Student bulk symptom?', back: 'May indicate service—not one laptop.' },
      { id: 'odb-f6', front: 'Teacher authoring issue?', back: 'May need LMS champion—not ICT guessing pedagogy.' },
      { id: 'odb-f7', front: 'Attachments failing?', back: 'Think size, format, storage quota signals.' },
      { id: 'odb-f8', front: 'Mobile vs desktop?', back: 'Scoped symptom narrows responsive bugs.' },
      { id: 'odb-f9', front: 'Communication tone?', back: 'Offer interim workaround if safe.' },
      { id: 'odb-f10', front: 'Escalation includes?', back: 'Impact minutes + workaround status.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'odb-q1',
        prompt: 'Staff sees blank Schoolbox page after login elsewhere works. Likely first bucket?',
        domain: 'Schoolbox triage',
        difficulty: 'foundation',
        explanation: 'Differentiate session versus page asset.',
        modelAnswer: 'Page-specific rendering or permission scoped to class tile.',
        commonMistakes: ['Declaring entire internet down'],
        dcsContext: 'Blank pages scare teachers mid-lesson.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'dcs-schoolbox-portal',
        options: [
          { id: 'a', label: 'Assume core switch failure' },
          { id: 'b', label: 'Capture exact page/URL, compare session/device, escalate with scope' },
          { id: 'c', label: 'Rebuild laptop image immediately' },
          { id: 'd', label: 'Tell them teaching should avoid tech' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'odb-q2',
        prompt: 'Two safe compares for LMS issues.',
        domain: 'Schoolbox triage',
        difficulty: 'stretch',
        explanation: 'Comparison isolates layers.',
        modelAnswer: 'Known-good staff device or browser profile; alternate network path if policy-safe.',
        commonMistakes: ['No compares'],
        dcsContext: 'Fast classroom triage.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'dcs-schoolbox-portal',
        rubric: ['Names compares'],
        keywordHints: ['browser', 'device']
      },
      {
        type: 'order-steps',
        id: 'odb-q3',
        prompt: 'Order LMS triage.',
        domain: 'Schoolbox triage',
        difficulty: 'foundation',
        explanation: 'Understand symptom location early.',
        modelAnswer: 'Confirm login success → capture URL → compare device/browser → note impact → escalate with artefacts.',
        commonMistakes: ['Random cache nukes'],
        dcsContext: 'Keeps class moving.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'dcs-schoolbox-portal',
        steps: [
          { id: 'auth', label: 'Confirm authentication layer vs content layer' },
          { id: 'url', label: 'Capture exact page and timestamp' },
          { id: 'cmp', label: 'Compare device/browser safely' },
          { id: 'pkg', label: 'Package escalation with cropped evidence' }
        ],
        correctOrder: ['auth', 'url', 'cmp', 'pkg'],
        rubric: ['Logical']
      },
      {
        type: 'scenario-response',
        id: 'odb-q4',
        prompt: 'Teacher demands projector swap blaming Schoolbox. Response framework?',
        domain: 'Schoolbox triage',
        difficulty: 'stretch',
        explanation: 'Politely decouple display chain issues.',
        modelAnswer:
          'Acknowledge urgency, verify LMS layer evidence separately from HDMI/audio chain, coordinate dual-track troubleshooting without blaming.',
        commonMistakes: ['Merging unrelated symptom chains'],
        dcsContext: 'Composite failures occur under stress.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'dcs-schoolbox-portal',
        rubric: ['Separates layers']
      },
      {
        type: 'mcq',
        id: 'odb-q5',
        prompt: 'Student devices fail uploads while staff OK—signal?',
        domain: 'Schoolbox triage',
        difficulty: 'stretch',
        explanation: 'Segment roles/policies.',
        modelAnswer: 'Possible permission/quota/policy segmentation affecting student cohort.',
        commonMistakes: ['Assuming identical configs'],
        dcsContext: 'BYOD vs managed nuances.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'dcs-schoolbox-portal',
        options: [
          { id: 'a', label: 'Ignore student cohort segmentation' },
          { id: 'b', label: 'Escalate noting role segmentation suspicion with examples' },
          { id: 'c', label: 'Ban uploads school-wide' },
          { id: 'd', label: 'Tell students Wi-Fi is luxury' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'explain-it-simply',
        id: 'odb-q6',
        prompt: 'Explain cached stale page.',
        domain: 'Schoolbox triage',
        difficulty: 'foundation',
        explanation: 'Simple mental model.',
        modelAnswer:
          'Browsers sometimes reuse old page fragments; controlled refresh or second browser tests whether content truly missing versus stuck cache.',
        commonMistakes: ['Unsafe jargon'],
        dcsContext: 'Teachers blame LMS unfairly.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'dcs-schoolbox-portal',
        rubric: ['Plain explanation'],
        keywordHints: ['cache', 'refresh']
      },
      {
        type: 'mcq',
        id: 'odb-q7',
        prompt: 'Which escalation artefact is weakest?',
        domain: 'Schoolbox triage',
        difficulty: 'foundation',
        explanation: 'Specificity matters.',
        modelAnswer: '“Schoolbox broken” without URL/time/role.',
        commonMistakes: [],
        dcsContext: 'Classic vague ticket.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'dcs-schoolbox-portal',
        options: [
          { id: 'a', label: 'Cropped screenshot with page title and timestamp' },
          { id: 'b', label: '“Schoolbox broken” without specifics' },
          { id: 'c', label: 'Role plus class plus reproduction steps' },
          { id: 'd', label: 'Second staff confirms same page fault' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'odb-q8',
        prompt: 'Draft teacher-facing micro-steps before escalation.',
        domain: 'Schoolbox triage',
        difficulty: 'stretch',
        explanation: 'Empowers safe retries.',
        modelAnswer:
          'Retry page after noting time; try second browser; confirm correct account; if persists capture screenshot—ICT escalates with bundle.',
        commonMistakes: ['Unsafe advanced tweaks'],
        dcsContext: 'Micro-scripts reduce repeat contacts.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'dcs-schoolbox-portal',
        rubric: ['Safe steps'],
        keywordHints: ['browser', 'screenshot']
      }
    ],
    scenarioPrompts: [{ id: 'odb-s1', title: 'Tile missing for one class only', prompt: 'Determine LMS vs timetable ownership cues.' }],
    practicalOutputs: [{ id: 'odb-p1', title: 'LMS triage micro-script', description: 'Teacher-facing 5-line retry list with escalation boundary.' }]
  },
  {
    id: 'login-password-support',
    title: 'Login and Password Support',
    description:
      'Username checks, lockouts, expired passwords, self-service reset failures, and compromise suspicion—without ever collecting passwords.',
    domain: 'Identity and Access',
    level: 'L1',
    estimatedMinutes: 23,
    tags: ['password', 'MFA', 'lockout', 'identity'],
    learningObjectives: [
      'Apply safe verification prompts consistent with school identity policies.',
      'Differentiate client faults from directory-side signals needing escalation.',
      'Phrase escalation without alarming users unnecessarily.'
    ],
    dcsRelevance: ['Daily volume driver.', 'Security-sensitive mis-steps costly.'],
    sections: [
      {
        id: 'lpw-1',
        title: 'Never ask for passwords',
        bodyMarkdown:
          'Use sanctioned reset portals and escalation pathways; coach users through screens verbally without capturing secrets in tickets.'
      },
      {
        id: 'lpw-2',
        title: 'Lockout vs expiry vs wrong context',
        bodyMarkdown:
          'Wrong username domain, stale cached credential, clock skew, MFA fatigue, or actual compromise—capture symptom timestamps.'
      },
      {
        id: 'lpw-3',
        title: 'Compromise suspicion pathway',
        bodyMarkdown:
          'Unexpected MFA pushes, unfamiliar geography prompts, or mass spam sending—preserve evidence and escalate urgently via security route.'
      }
    ],
    flashcards: [
      { id: 'lpw-f1', front: 'Collect passwords in tickets?', back: 'No—use approved flows only.' },
      { id: 'lpw-f2', front: 'Expired password symptom?', back: 'Grace prompts until hard lock depending on policy.' },
      { id: 'lpw-f3', front: 'Lockout symptom?', back: 'Repeated failures despite knowing password—time-bound.' },
      { id: 'lpw-f4', front: 'Stale credential?', back: 'Old cached username dominating new attempts.' },
      { id: 'lpw-f5', front: 'MFA loop?', back: 'Device trust vs method drift—escalate if systemic.' },
      { id: 'lpw-f6', front: 'Clock skew relevance?', back: 'Auth may fail mysteriously—basic sanity check.' },
      { id: 'lpw-f7', front: 'Self-service reset fails?', back: 'Recovery info stale—authorised identity assist.' },
      { id: 'lpw-f8', front: 'Bulk simultaneous failures?', back: 'Possible identity dependency outage signal.' },
      { id: 'lpw-f9', front: 'Tone when suspicious?', back: 'Calm, factual, fast escalation—not panic accusation.' },
      { id: 'lpw-f10', front: 'Documentation gold?', back: 'Exact error strings + timestamps + scope.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'lpw-q1',
        prompt: 'User offers password to speed ticket up.',
        domain: 'Login support',
        difficulty: 'foundation',
        explanation: 'Reject secret capture politely.',
        modelAnswer: 'Decline, redirect to approved authentication pathway immediately.',
        commonMistakes: ['Accepting “just this once”'],
        dcsContext: 'Social engineering pressure.',
        reviewSchedule,
        recommendedModuleId: 'login-password-support',
        weakTopic: 'dcs-login-password',
        options: [
          { id: 'a', label: 'Paste it into ticket notes for debugging' },
          { id: 'b', label: 'Politely refuse and guide sanctioned reset steps' },
          { id: 'c', label: 'Ask them to email password privately' },
          { id: 'd', label: 'Share your admin password pattern for empathy' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'lpw-q2',
        prompt: 'Three clues separating compromise suspicion from forgetfulness.',
        domain: 'Login support',
        difficulty: 'stretch',
        explanation: 'Safety judgement.',
        modelAnswer: 'Unexpected MFA prompts, unfamiliar locations, mailbox rule changes, outbound spam reports despite knowing password.',
        commonMistakes: ['Ignoring MFA anomalies'],
        dcsContext: 'School accounts attacked routinely.',
        reviewSchedule,
        recommendedModuleId: 'login-password-support',
        weakTopic: 'dcs-login-password',
        rubric: ['Security signals'],
        keywordHints: ['MFA', 'spam', 'rules']
      },
      {
        type: 'order-steps',
        id: 'lpw-q3',
        prompt: 'Order password triage.',
        domain: 'Login support',
        difficulty: 'foundation',
        explanation: 'Evidence-driven.',
        modelAnswer: 'Verify identity context → confirm exact error → attempt sanctioned reset guidance → escalate if systemic/suspicious.',
        commonMistakes: ['Random resets'],
        dcsContext: 'Avoid churn.',
        reviewSchedule,
        recommendedModuleId: 'login-password-support',
        weakTopic: 'dcs-login-password',
        steps: [
          { id: 'ctx', label: 'Verify account context (username/domain/device)' },
          { id: 'err', label: 'Capture exact error text/time' },
          { id: 'self', label: 'Coach sanctioned self-service reset' },
          { id: 'esc', label: 'Escalate identity/security route if signals warrant' }
        ],
        correctOrder: ['ctx', 'err', 'self', 'esc'],
        rubric: ['Logical']
      },
      {
        type: 'scenario-response',
        id: 'lpw-q4',
        prompt: 'Teacher overseas suddenly blocked—possible travel vs compromise?',
        domain: 'Login support',
        difficulty: 'challenge',
        explanation: 'Avoid blaming travel.',
        modelAnswer:
          'Gather MFA prompts, unfamiliar login notices, recent forwarding rules suspicion; escalate via security-aware pathway without accusing.',
        commonMistakes: ['Ignoring geo anomalies'],
        dcsContext: 'School staff travel patterns vary.',
        reviewSchedule,
        recommendedModuleId: 'login-password-support',
        weakTopic: 'dcs-login-password',
        rubric: ['Balanced judgement']
      },
      {
        type: 'mcq',
        id: 'lpw-q5',
        prompt: 'Cached credential issue suspicion?',
        domain: 'Login support',
        difficulty: 'stretch',
        explanation: 'Windows loves stale identities.',
        modelAnswer: 'Mismatch between logged-on identity and attempted resource identity.',
        commonMistakes: [],
        dcsContext: 'Shared classroom laptops.',
        reviewSchedule,
        recommendedModuleId: 'login-password-support',
        weakTopic: 'dcs-login-password',
        options: [
          { id: 'a', label: 'Always motherboard fault' },
          { id: 'b', label: 'Different username displayed vs attempting login resource expects' },
          { id: 'c', label: 'Printer VLAN mismatch' },
          { id: 'd', label: 'SMARTBoard firmware exclusively' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'explain-it-simply',
        id: 'lpw-q6',
        prompt: 'Explain MFA prompt fatigue calmly.',
        domain: 'Login support',
        difficulty: 'foundation',
        explanation: 'Reduce panic clicks.',
        modelAnswer:
          'Extra prompts often mean your account is verifying unusual activity—pause approvals until context confirmed via authorised channel.',
        commonMistakes: ['Technical overwhelm'],
        dcsContext: 'Teachers rushed.',
        reviewSchedule,
        recommendedModuleId: 'login-password-support',
        weakTopic: 'dcs-login-password',
        rubric: ['Plain calm wording'],
        keywordHints: ['verify', 'pause']
      },
      {
        type: 'mcq',
        id: 'lpw-q7',
        prompt: 'Mass password failures at bell—think?',
        domain: 'Login support',
        difficulty: 'stretch',
        explanation: 'Correlated outage.',
        modelAnswer: 'Dependency outage vs coincidence.',
        commonMistakes: ['Individual-only framing'],
        dcsContext: 'Bell curve spikes.',
        reviewSchedule,
        recommendedModuleId: 'login-password-support',
        weakTopic: 'dcs-login-password',
        options: [
          { id: 'a', label: 'Ignore correlation entirely' },
          { id: 'b', label: 'Raise correlated outage suspicion with timestamps + counts' },
          { id: 'c', label: 'Tell everyone passwords expired maliciously' },
          { id: 'd', label: 'Disable Wi-Fi' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'lpw-q8',
        prompt: 'Ticket sentence escalating suspected compromise.',
        domain: 'Login support',
        difficulty: 'stretch',
        explanation: 'Signal without drama.',
        modelAnswer:
          'Unexpected MFA prompts and unfamiliar login notices reported—request authorised identity/security review; user coached not to approve unknown prompts.',
        commonMistakes: [],
        dcsContext: 'Triggers SOC analogues.',
        reviewSchedule,
        recommendedModuleId: 'login-password-support',
        weakTopic: 'dcs-login-password',
        rubric: ['Signals urgency', 'Safe interim guidance'],
        keywordHints: ['MFA', 'review']
      }
    ],
    scenarioPrompts: [{ id: 'lpw-s1', title: 'Self-service reset loop', prompt: 'Balance empathy vs escalation triggers.' }],
    practicalOutputs: [{ id: 'lpw-p1', title: 'Login triage script', description: 'Coach-through checklist without secret capture.' }]
  },
  {
    id: 'permissions-access-requests',
    title: 'Permissions and Access Requests',
    description:
      'Shared drives, groups, software installs—capture approvals, least privilege, and clean managerial visibility.',
    domain: 'Identity and Access',
    level: 'L1',
    estimatedMinutes: 22,
    tags: ['permissions', 'groups', 'least privilege', 'approvals'],
    learningObjectives: [
      'Gather approver, role context, data sensitivity, and duration.',
      'Spot risky shortcuts conflicting with policy.',
      'Document deny paths professionally.'
    ],
    dcsRelevance: ['Access creep creates audit risk.', 'Managers expect crisp rationale.'],
    sections: [
      {
        id: 'perm-1',
        title: 'Request completeness',
        bodyMarkdown:
          'Who needs access, to what resource, why now, for how long, existing alternatives tried, business owner endorsement.'
      },
      {
        id: 'perm-2',
        title: 'Least privilege lens',
        bodyMarkdown:
          'Prefer scoped shares or role groups over blanket admin adjacent rights unless justified.'
      },
      {
        id: 'perm-3',
        title: 'Software installs',
        bodyMarkdown:
          'Licensing, deployment channel (Company Portal vs ad hoc), classroom urgency vs compliance packaging.'
      }
    ],
    flashcards: [
      { id: 'perm-f1', front: 'Why capture duration?', back: 'Temporary project access should expire conceptually.' },
      { id: 'perm-f2', front: 'Business owner?', back: 'Data steward signs risk—not only requester.' },
      { id: 'perm-f3', front: 'Deny gracefully?', back: 'Policy citation + alternative pathway.' },
      { id: 'perm-f4', front: 'Emergency exceptions?', back: 'Document urgency + retro approval expectation.' },
      { id: 'perm-f5', front: 'Shared mailbox pitfalls?', back: 'Delegated access creep—monitor scope.' },
      { id: 'perm-f6', front: 'Student data shares?', back: 'Higher scrutiny—minimise blast radius.' },
      { id: 'perm-f7', front: 'Local admin asks?', back: 'Usually tightly controlled—avoid silent yes.' },
      { id: 'perm-f8', front: 'Ticket clarity?', back: 'Readable by auditor months later.' },
      { id: 'perm-f9', front: 'Pattern detection?', back: 'Repeated shortcuts may indicate training gap.' },
      { id: 'perm-f10', front: 'ICT stance?', back: 'Implement authorised changes—not invent policy.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'perm-q1',
        prompt: 'Staff asks “same access as colleague”. Issue?',
        domain: 'Access requests',
        difficulty: 'foundation',
        explanation: 'Jobs differ—least privilege breaks.',
        modelAnswer: 'Need role-based justification rather than cloning.',
        commonMistakes: ['Rubber stamping'],
        dcsContext: 'Lazy requests.',
        reviewSchedule,
        recommendedModuleId: 'permissions-access-requests',
        weakTopic: 'dcs-permissions-access',
        options: [
          { id: 'a', label: 'Always mirror colleague groups instantly' },
          { id: 'b', label: 'Ask for role/task justification vs blanket cloning' },
          { id: 'c', label: 'Grant Domain Admin to reduce tickets' },
          { id: 'd', label: 'Ignore manager approval' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'perm-q2',
        prompt: 'Four fields documenting software request.',
        domain: 'Access requests',
        difficulty: 'stretch',
        explanation: 'Operational clarity.',
        modelAnswer: 'Application name/version, device scope, license pathway, urgency instructional driver, approver.',
        commonMistakes: ['Vague “need app”'],
        dcsContext: 'Deployment pipelines.',
        reviewSchedule,
        recommendedModuleId: 'permissions-access-requests',
        weakTopic: 'dcs-permissions-access',
        rubric: ['Concrete fields'],
        keywordHints: ['license', 'approver']
      },
      {
        type: 'order-steps',
        id: 'perm-q3',
        prompt: 'Order safe access workflow.',
        domain: 'Access requests',
        difficulty: 'foundation',
        explanation: 'Governance order.',
        modelAnswer: 'Validate completeness → verify approver → assess least privilege → schedule change → confirm outcome.',
        commonMistakes: ['Change before approval'],
        dcsContext: 'Audit trails.',
        reviewSchedule,
        recommendedModuleId: 'permissions-access-requests',
        weakTopic: 'dcs-permissions-access',
        steps: [
          { id: 'cmp', label: 'Confirm request completeness' },
          { id: 'apr', label: 'Verify business approver' },
          { id: 'lpl', label: 'Apply least-privilege design' },
          { id: 'chg', label: 'Execute via authorised change path' }
        ],
        correctOrder: ['cmp', 'apr', 'lpl', 'chg'],
        rubric: ['Governance']
      },
      {
        type: 'scenario-response',
        id: 'perm-q4',
        prompt: 'Leader pressures bypass approval tonight.',
        domain: 'Access requests',
        difficulty: 'challenge',
        explanation: 'Professional backbone.',
        modelAnswer:
          'Acknowledge instructional urgency, document risk, seek delegated emergency approver or interim least-scope workaround instead of silent bypass.',
        commonMistakes: ['Silent bypass'],
        dcsContext: 'Leadership pressure spikes.',
        reviewSchedule,
        recommendedModuleId: 'permissions-access-requests',
        weakTopic: 'dcs-permissions-access',
        rubric: ['Risk awareness']
      },
      {
        type: 'mcq',
        id: 'perm-q5',
        prompt: 'Temporary contractor access should?',
        domain: 'Access requests',
        difficulty: 'stretch',
        explanation: 'Time-bound mindset.',
        modelAnswer: 'Include planned review/removal expectation.',
        commonMistakes: ['Permanent drift'],
        dcsContext: 'Contract cycles.',
        reviewSchedule,
        recommendedModuleId: 'permissions-access-requests',
        weakTopic: 'dcs-permissions-access',
        options: [
          { id: 'a', label: 'Persist silently forever' },
          { id: 'b', label: 'Include timeframe + review expectation in ticket' },
          { id: 'c', label: 'Grant student-level rights for simplicity' },
          { id: 'd', label: 'Avoid documenting contractor presence' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'explain-it-simply',
        id: 'perm-q6',
        prompt: 'Explain least privilege to impatient teacher.',
        domain: 'Access requests',
        difficulty: 'foundation',
        explanation: 'Non-jargony.',
        modelAnswer:
          'You receive the smallest door needed for today’s teaching task—wider access waits until someone accountable signs off.',
        commonMistakes: [],
        dcsContext: 'Pedagogy vs risk.',
        reviewSchedule,
        recommendedModuleId: 'permissions-access-requests',
        weakTopic: 'dcs-permissions-access',
        rubric: ['Plain metaphor'],
        keywordHints: ['smallest', 'sign-off']
      },
      {
        type: 'mcq',
        id: 'perm-q7',
        prompt: 'Shared drive “need everything” ask?',
        domain: 'Access requests',
        difficulty: 'stretch',
        explanation: 'Probe folders.',
        modelAnswer: 'Request specific path + rationale.',
        commonMistakes: [],
        dcsContext: 'Data sprawl.',
        reviewSchedule,
        recommendedModuleId: 'permissions-access-requests',
        weakTopic: 'dcs-permissions-access',
        options: [
          { id: 'a', label: 'Grant root drive blindly' },
          { id: 'b', label: 'Ask which folders map to actual lesson workflow' },
          { id: 'c', label: 'Email ZIP of entire drive' },
          { id: 'd', label: 'Tell them use USB sticks only' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'perm-q8',
        prompt: 'Professional deny sentence citing policy.',
        domain: 'Access requests',
        difficulty: 'stretch',
        explanation: 'Tone matters.',
        modelAnswer:
          'Policy requires sponsor approval for that sensitivity tier—happy to route via [approver]; meanwhile here’s interim workaround X if safe.',
        commonMistakes: ['Abrasive denial'],
        dcsContext: 'Relationship preservation.',
        reviewSchedule,
        recommendedModuleId: 'permissions-access-requests',
        weakTopic: 'dcs-permissions-access',
        rubric: ['Policy + empathy'],
        keywordHints: ['approval', 'workaround']
      }
    ],
    scenarioPrompts: [{ id: 'perm-s1', title: 'Emergency exam folder access', prompt: 'Least scope temporary fix narrative.' }],
    practicalOutputs: [{ id: 'perm-p1', title: 'Access request completeness form', description: 'Bulleted intake fields for tickets.' }]
  },
  {
    id: 'website-filtering-unblock-requests',
    title: 'Website Filtering and Unblock Requests',
    description:
      'Capture URLs, audience, curriculum justification, timing, and approvals for filtering workflows—without promising instant blanket unblocks.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 19,
    tags: ['filtering', 'safeguarding', 'unblock', 'web'],
    learningObjectives: [
      'Treat filtering as policy workflow—not personal improvisation.',
      'Collect evidence suitable for curriculum approvers.',
      'Explain student-impact timelines honestly.'
    ],
    dcsRelevance: ['Lesson plans halt suddenly.', 'Safeguarding intersections real.'],
    sections: [
      {
        id: 'wf-1',
        title: 'Exact URL granularity',
        bodyMarkdown:
          'Protocol, full hostname, path fragments matter—avoid “the blue science site”.'
      },
      {
        id: 'wf-2',
        title: 'Audience & supervision context',
        bodyMarkdown:
          'Age band, supervised lab vs take-home BYOD, alternative resources attempted.'
      },
      {
        id: 'wf-3',
        title: 'Lead time honesty',
        bodyMarkdown:
          'Approval queues vary—offer interim sanctioned alternative when possible.'
      }
    ],
    flashcards: [
      { id: 'wf-f1', front: 'Why exact URL?', back: 'Different paths hit different categories.' },
      { id: 'wf-f2', front: 'Screenshot value?', back: 'Shows block category message—not vague.' },
      { id: 'wf-f3', front: 'Bypass morally?', back: 'No informal tunnels—follow approvals.' },
      { id: 'wf-f4', front: 'Curriculum justification?', back: 'Links syllabus outcome → resource.' },
      { id: 'wf-f5', front: 'BYOD nuance?', back: 'Policy may differ from managed fleet.' },
      { id: 'wf-f6', front: 'Safeguarding escalation?', back: 'If content risk ambiguous—route specialist.' },
      { id: 'wf-f7', front: 'Temporary teaching workaround?', back: 'Downloaded sanctioned bundle vs rogue hotspot.' },
      { id: 'wf-f8', front: 'Communication?', back: 'Transparent ETA ranges—not fantasy instant.' },
      { id: 'wf-f9', front: 'Duplicate tickets?', back: 'Merge narratives reduce fatigue.' },
      { id: 'wf-f10', front: 'Ticket closes with?', back: 'Approver reference + scope of unblock.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'wf-q1',
        prompt: 'Teacher demands VPN install to bypass filter.',
        domain: 'Web filtering',
        difficulty: 'stretch',
        explanation: 'Unsafe improvisation.',
        modelAnswer: 'Decline; route formal unblock or sanctioned alternative.',
        commonMistakes: [],
        dcsContext: 'Shadow IT pressure.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-unblock-requests',
        weakTopic: 'dcs-web-filtering',
        options: [
          { id: 'a', label: 'Install personal VPN immediately' },
          { id: 'b', label: 'Explain policy pathway and capture unblock evidence bundle' },
          { id: 'c', label: 'Tell students filters optional' },
          { id: 'd', label: 'Disable filtering centrally yourself' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'wf-q2',
        prompt: 'Minimum unblock evidence bundle.',
        domain: 'Web filtering',
        difficulty: 'stretch',
        explanation: 'Approver-ready.',
        modelAnswer: 'Exact URLs, block screen category/time, cohort/year level, lesson date, learning outcome link, approver name.',
        commonMistakes: ['Only saying blocked'],
        dcsContext: 'Queues reject vagueness.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-unblock-requests',
        weakTopic: 'dcs-web-filtering',
        rubric: ['Concrete bundle'],
        keywordHints: ['URL', 'year level']
      },
      {
        type: 'order-steps',
        id: 'wf-q3',
        prompt: 'Order unblock intake.',
        domain: 'Web filtering',
        difficulty: 'foundation',
        explanation: 'Structured empathy.',
        modelAnswer: 'Acknowledge lesson impact → capture URLs → capture cohort/time → identify approver pathway → set expectation → attach artefacts.',
        commonMistakes: [],
        dcsContext: 'Teachers stressed.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-unblock-requests',
        weakTopic: 'dcs-web-filtering',
        steps: [
          { id: 'imp', label: 'Acknowledge instructional impact' },
          { id: 'url', label: 'Record exact URLs + block evidence' },
          { id: 'coh', label: 'Capture cohort/timeframe' },
          { id: 'apr', label: 'Identify approval routing' }
        ],
        correctOrder: ['imp', 'url', 'coh', 'apr'],
        rubric: ['Empathy early']
      },
      {
        type: 'scenario-response',
        id: 'wf-q4',
        prompt: 'Surprising block labelled malware—possible compromise vs false positive?',
        domain: 'Web filtering',
        difficulty: 'challenge',
        explanation: 'Dual pathways.',
        modelAnswer:
          'Preserve teacher context but escalate security review if malware categorisation suggests compromised asset behaviour—not silent unblock.',
        commonMistakes: [],
        dcsContext: 'Interesting overlaps.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-unblock-requests',
        weakTopic: 'dcs-web-filtering',
        rubric: ['Balances instructional + security']
      },
      {
        type: 'mcq',
        id: 'wf-q5',
        prompt: 'Wildcard unblock entire domain requested?',
        domain: 'Web filtering',
        difficulty: 'stretch',
        explanation: 'Blast radius.',
        modelAnswer: 'Prefer scoped paths unless risk accepted.',
        commonMistakes: [],
        dcsContext: 'Minimal exposure mindset.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-unblock-requests',
        weakTopic: 'dcs-web-filtering',
        options: [
          { id: 'a', label: 'Always approve domain-wide instantly' },
          { id: 'b', label: 'Prefer narrowed URLs unless documented broad approval exists' },
          { id: 'c', label: 'Tell teacher internet forbidden' },
          { id: 'd', label: 'Ask students to use cellular hotspots unsupervised' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'explain-it-simply',
        id: 'wf-q6',
        prompt: 'Explain filtering delay.',
        domain: 'Web filtering',
        difficulty: 'foundation',
        explanation: 'Expectation alignment.',
        modelAnswer:
          'Automated categories update for safety; humans verify exceptions so classrooms stay both safe and intentional.',
        commonMistakes: [],
        dcsContext: 'Reduces anger.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-unblock-requests',
        weakTopic: 'dcs-web-filtering',
        rubric: ['Balanced explanation'],
        keywordHints: ['safety', 'review']
      },
      {
        type: 'mcq',
        id: 'wf-q7',
        prompt: 'Student psychological counselling resource blocked—tone?',
        domain: 'Web filtering',
        difficulty: 'challenge',
        explanation: 'Sensitivity.',
        modelAnswer: 'Fast-track language with safeguarding-aware routing—not sarcasm.',
        commonMistakes: [],
        dcsContext: 'High stakes.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-unblock-requests',
        weakTopic: 'dcs-web-filtering',
        options: [
          { id: 'a', label: 'Laugh it off as filtering nonsense' },
          { id: 'b', label: 'Treat as priority safeguarding-sensitive escalation with calm urgency' },
          { id: 'c', label: 'Tell student figure it out alone' },
          { id: 'd', label: 'Disable all filtering silently' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'wf-q8',
        prompt: 'Interim workaround examples (safe).',
        domain: 'Web filtering',
        difficulty: 'stretch',
        explanation: 'Creativity within guardrails.',
        modelAnswer:
          'Teacher downloads sanctioned offline package via alternate approved machine; uses curated substitute resource; schedules lab slot after approval ETA if unavoidable.',
        commonMistakes: ['Unsafe hotspot suggestions'],
        dcsContext: 'Keeps class moving legally.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-unblock-requests',
        weakTopic: 'dcs-web-filtering',
        rubric: ['Safe interim paths'],
        keywordHints: ['offline', 'substitute']
      }
    ],
    scenarioPrompts: [{ id: 'wf-s1', title: 'Exam morning surprise block', prompt: 'Transparent urgency note without policy breach.' }],
    practicalOutputs: [{ id: 'wf-p1', title: 'Unblock intake snippet', description: 'Copy-ready ticket skeleton.' }]
  },
  {
    id: 'new-user-onboarding',
    title: 'New User Onboarding Checks',
    description:
      'Staff, student, and prac teacher readiness—accounts, groups, devices, and software completeness before day one.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 24,
    tags: ['onboarding', 'accounts', 'groups', 'devices'],
    learningObjectives: [
      'Standardise day-one validation checks ICT can perform safely.',
      'Recognise missing upstream HR/academic signals.',
      'Package escalation when provisioning sequencing breaks.'
    ],
    dcsRelevance: ['Bad first days erode trust.', 'Cross-team dependencies frequent.'],
    sections: [
      {
        id: 'onb-1',
        title: 'Role-specific checklist mindset',
        bodyMarkdown:
          'Teachers need Teams/SPO paths; students need timetable-linked access patterns; pracs need constrained scopes—avoid one-size flows.'
      },
      {
        id: 'onb-2',
        title: 'Dependency sequencing',
        bodyMarkdown:
          'HR record → directory object → licensing → group memberships → device enrollment—failure upstream cascades.'
      },
      {
        id: 'onb-3',
        title: 'Friendly verification scripts',
        bodyMarkdown:
          'Guided login tests, sample file save locations, print release trial—bounded time boxed.'
      }
    ],
    flashcards: [
      { id: 'onb-f1', front: 'Why compare HR start date?', back: 'Automations often time-gated.' },
      { id: 'onb-f2', front: 'Missing groups symptom?', back: 'Partial resource visibility.' },
      { id: 'onb-f3', front: 'Device enrollment fails?', back: 'Could be timing/licensing—not “bad laptop only”.' },
      { id: 'onb-f4', front: 'Prac boundaries?', back: 'Least privilege + supervision expectations.' },
      { id: 'onb-f5', front: 'Student bulk onboarding?', back: 'Watch correlated template failures.' },
      { id: 'onb-f6', front: 'Communicate delays?', back: 'Honest ETA + interim workaround.' },
      { id: 'onb-f7', front: 'Managers expect?', back: 'Visibility ticket trail—not verbal-only promises.' },
      { id: 'onb-f8', front: 'Password day-one confusing?', back: 'Coach sanctioned change flows calmly.' },
      { id: 'onb-f9', front: 'Software gaps?', back: 'License queue vs packaging bug distinction.' },
      { id: 'onb-f10', front: 'Close ticket with?', back: 'Verification checklist outcomes snapshot.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'onb-q1',
        prompt: 'New teacher missing Teams team membership day one.',
        domain: 'Onboarding',
        difficulty: 'foundation',
        explanation: 'Think sequencing.',
        modelAnswer: 'Verify directory group mappings vs manual add drift.',
        commonMistakes: ['Adding random teams manually without governance'],
        dcsContext: 'Common churn.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'dcs-onboarding',
        options: [
          { id: 'a', label: 'Always blame teacher patience' },
          { id: 'b', label: 'Trace provisioning signals and escalate missing authoritative mappings' },
          { id: 'c', label: 'Grant global admin to expedite' },
          { id: 'd', label: 'Ignore correlation with start date' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'onb-q2',
        prompt: 'Four checks in student lab login validation.',
        domain: 'Onboarding',
        difficulty: 'stretch',
        explanation: 'Concrete.',
        modelAnswer: 'Correct username format, password change success, home drive/map visibility, printer release trial if applicable.',
        commonMistakes: [],
        dcsContext: 'Mass lab scenarios.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'dcs-onboarding',
        rubric: ['Concrete checks'],
        keywordHints: ['username', 'printer']
      },
      {
        type: 'order-steps',
        id: 'onb-q3',
        prompt: 'Order onboarding triage.',
        domain: 'Onboarding',
        difficulty: 'foundation',
        explanation: 'Upstream before device rabbit holes.',
        modelAnswer: 'Confirm HR/start signals → directory presence → licensing → group memberships → device enrollment validation.',
        commonMistakes: [],
        dcsContext: 'Avoid laptop Imaging obsession prematurely.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'dcs-onboarding',
        steps: [
          { id: 'hr', label: 'Verify upstream HR/start readiness signals' },
          { id: 'dir', label: 'Confirm directory account presence' },
          { id: 'grp', label: 'Validate group memberships / licensing' },
          { id: 'dev', label: 'Validate device enrollment & login smoke tests' }
        ],
        correctOrder: ['hr', 'dir', 'grp', 'dev'],
        rubric: ['Logical sequencing']
      },
      {
        type: 'scenario-response',
        id: 'onb-q4',
        prompt: 'Contractor starts Monday 7am—nothing provisioned Sunday 11pm ping.',
        domain: 'Onboarding',
        difficulty: 'challenge',
        explanation: 'Human limits.',
        modelAnswer:
          'Acknowledge urgency, verify earliest actionable window, document minimal interim access risks accepted by delegate approver, escalate provisioning owners.',
        commonMistakes: ['Silent hero burnout'],
        dcsContext: 'After-hours moral hazard.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'dcs-onboarding',
        rubric: ['Boundaries + urgency']
      },
      {
        type: 'mcq',
        id: 'onb-q5',
        prompt: 'Prac teacher overscoped access discovered.',
        domain: 'Onboarding',
        difficulty: 'stretch',
        explanation: 'Correct downward safely.',
        modelAnswer: 'Escalate adjustment via governance—not silent removal chaos.',
        commonMistakes: [],
        dcsContext: 'Safeguarding optics.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'dcs-onboarding',
        options: [
          { id: 'a', label: 'Ignore for semester simplicity' },
          { id: 'b', label: 'Raise correction via authorised adjustment pathway with audit-friendly note' },
          { id: 'c', label: 'Publicly shame prac in staffroom' },
          { id: 'd', label: 'Grant more access “balance universe”' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'explain-it-simply',
        id: 'onb-q6',
        prompt: 'Explain upstream dependency delay to anxious principal.',
        domain: 'Onboarding',
        difficulty: 'foundation',
        explanation: 'Executive clarity.',
        modelAnswer:
          'Digital accounts often chain off roster approvals—one missing link blocks automation until authoritative data arrives.',
        commonMistakes: [],
        dcsContext: 'Reduce blame spirals.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'dcs-onboarding',
        rubric: ['Plain dependency metaphor'],
        keywordHints: ['chain', 'data']
      },
      {
        type: 'mcq',
        id: 'onb-q7',
        prompt: 'Successful smoke test includes?',
        domain: 'Onboarding',
        difficulty: 'foundation',
        explanation: 'Evidence closure.',
        modelAnswer: 'Bounded realistic login + resource touch verification.',
        commonMistakes: [],
        dcsContext: 'Avoid infinite scope creep.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'dcs-onboarding',
        options: [
          { id: 'a', label: 'Teaching entire curriculum trial' },
          { id: 'b', label: 'Sanctioned login + key resource path verification snapshot' },
          { id: 'c', label: 'Deleting profile repeatedly' },
          { id: 'd', label: 'Ignoring errors “might fix itself”' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'onb-q8',
        prompt: 'Ticket closure summary lines.',
        domain: 'Onboarding',
        difficulty: 'stretch',
        explanation: 'Future audits.',
        modelAnswer:
          'Provisioning verified through step X; residual dependency Y owned by team Z; interim workaround A until ETA B.',
        commonMistakes: [],
        dcsContext: 'Readable retrospectives.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'dcs-onboarding',
        rubric: ['Ownership clarity'],
        keywordHints: ['workaround', 'ETA']
      }
    ],
    scenarioPrompts: [{ id: 'onb-s1', title: 'Late roster sync', prompt: 'Explain dependency without blaming humans.' }],
    practicalOutputs: [{ id: 'onb-p1', title: 'Day-one verification card', description: 'Printable quick checklist by role.' }]
  },
  {
    id: 'teams-sharepoint-onedrive-support',
    title: 'Teams, SharePoint, and OneDrive Support',
    description:
      'First-line triage for collaboration sync, sharing links, channel membership confusion, and recoverable file paths.',
    domain: 'Cloud and Platforms',
    level: 'L1',
    estimatedMinutes: 24,
    tags: ['Teams', 'SharePoint', 'OneDrive', 'sync'],
    learningObjectives: [
      'Separate Teams client faults from SharePoint permission faults.',
      'Coach safe link-sharing patterns aligned with school policy.',
      'Recognise when escalation requires tenant-level investigation.'
    ],
    dcsRelevance: ['Collaboration outages feel existential.', 'Privacy mistakes propagate fast.'],
    sections: [
      {
        id: 'tso-1',
        title: 'Three-layer mental model',
        bodyMarkdown:
          'Identity sign-in → Teams shell → underlying SharePoint/OneDrive storage paths.'
      },
      {
        id: 'tso-2',
        title: 'Sync and cache clues',
        bodyMarkdown:
          'Stuck files, version conflicts, naming length limits—capture client versions.'
      },
      {
        id: 'tso-3',
        title: 'Sharing boundaries',
        bodyMarkdown:
          'Anyone links vs org-only; accidental external exposure—coach review before send.'
      }
    ],
    flashcards: [
      { id: 'tso-f1', front: 'SharePoint vs OneDrive quick?', back: 'Team/department persistence vs personal working library.' },
      { id: 'tso-f2', front: 'Channel files location?', back: 'SharePoint site underpinning—not magical separate disk.' },
      { id: 'tso-f3', front: 'Sync stuck?', back: 'Conflict files/version history angles.' },
      { id: 'tso-f4', front: 'Missing team?', back: 'Group membership vs favourite pinning distinction.' },
      { id: 'tso-f5', front: 'External sharing risk?', back: 'Accidental guest invites—review dial.' },
      { id: 'tso-f6', front: 'Mobile symptom variance?', back: 'Different cache lifecycle.' },
      { id: 'tso-f7', front: 'Search confusion?', back: 'Indexing delays vs actual missing permissions.' },
      { id: 'tso-f8', front: 'Large file moves?', back: 'Think throttling or alternate sanctioned transfer.' },
      { id: 'tso-f9', front: 'Deleted channel panic?', back: 'Recovery windows concept—escalate appropriately.' },
      { id: 'tso-f10', front: 'Client updates?', back: 'Sometimes first safe mitigation.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'tso-q1',
        prompt: 'Staff cannot open Teams file tab—others OK.',
        domain: 'Teams collaboration',
        difficulty: 'foundation',
        explanation: 'Scoped permission investigation.',
        modelAnswer: 'Likely membership or channel-specific SharePoint permission drift.',
        commonMistakes: ['Blaming entire Teams outage'],
        dcsContext: 'Partial faults common.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'dcs-teams-sharepoint-onedrive',
        options: [
          { id: 'a', label: 'Assume Microsoft globally down' },
          { id: 'b', label: 'Investigate membership + SharePoint permissions for that channel resource' },
          { id: 'c', label: 'Delete team to reset vibes' },
          { id: 'd', label: 'Tell them email files only forever' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'tso-q2',
        prompt: 'Three questions diagnosing sync conflict.',
        domain: 'Teams collaboration',
        difficulty: 'stretch',
        explanation: 'Version awareness.',
        modelAnswer: 'Edited offline simultaneously? Same filename recursion? Different libraries crossed?',
        commonMistakes: [],
        dcsContext: 'Staff blame tech ghosts.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'dcs-teams-sharepoint-onedrive',
        rubric: ['Conflict angles'],
        keywordHints: ['offline', 'duplicate']
      },
      {
        type: 'order-steps',
        id: 'tso-q3',
        prompt: 'Order collaboration triage.',
        domain: 'Teams collaboration',
        difficulty: 'foundation',
        explanation: 'Layer order.',
        modelAnswer: 'Verify sign-in identity → verify membership → reproduce path → capture client versions → escalate if tenant-wide.',
        commonMistakes: [],
        dcsContext: 'Avoid reinstall obsession immediately.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'dcs-teams-sharepoint-onedrive',
        steps: [
          { id: 'sig', label: 'Confirm signed-in identity context' },
          { id: 'mem', label: 'Verify Teams/SharePoint membership' },
          { id: 'rep', label: 'Reproduce resource path + timestamps' },
          { id: 'ten', label: 'Escalate if correlated tenant-wide signal' }
        ],
        correctOrder: ['sig', 'mem', 'rep', 'ten'],
        rubric: ['Layered']
      },
      {
        type: 'scenario-response',
        id: 'tso-q4',
        prompt: 'Accidental public link shared containing assessment drafts.',
        domain: 'Teams collaboration',
        difficulty: 'challenge',
        explanation: 'Incident framing.',
        modelAnswer:
          'Stop propagation coaching, revoke/modify link per policy guidance, escalate privacy-sensitive exposure, document calmly.',
        commonMistakes: [],
        dcsContext: 'Exam integrity stakes.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'dcs-teams-sharepoint-onedrive',
        rubric: ['Containment mindset']
      },
      {
        type: 'mcq',
        id: 'tso-q5',
        prompt: 'Tenant-wide search outage suspicion?',
        domain: 'Teams collaboration',
        difficulty: 'stretch',
        explanation: 'Correlation.',
        modelAnswer: 'Multiple unrelated teams/users simultaneously search broken.',
        commonMistakes: [],
        dcsContext: 'Shift escalation upward.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'dcs-teams-sharepoint-onedrive',
        options: [
          { id: 'a', label: 'Ignore if one VIP quiet' },
          { id: 'b', label: 'Capture correlated evidence across roles + escalate service-wide' },
          { id: 'c', label: 'Delete indexes locally only joke' },
          { id: 'd', label: 'Ban search feature school-wide humor' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'explain-it-simply',
        id: 'tso-q6',
        prompt: 'Explain personal vs team library quickly.',
        domain: 'Teams collaboration',
        difficulty: 'foundation',
        explanation: 'Reduce mis-saves.',
        modelAnswer:
          'OneDrive is your draft notebook; team libraries are the shared cupboard everyone authorised can reach.',
        commonMistakes: [],
        dcsContext: 'Pedagogy metaphor.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'dcs-teams-sharepoint-onedrive',
        rubric: ['Metaphor clarity'],
        keywordHints: ['draft', 'shared']
      },
      {
        type: 'mcq',
        id: 'tso-q7',
        prompt: 'Coach safer sharing default?',
        domain: 'Teams collaboration',
        difficulty: 'foundation',
        explanation: 'Least exposure.',
        modelAnswer: 'Org-only unless explicit curriculum need.',
        commonMistakes: [],
        dcsContext: 'Reduce data leaks.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'dcs-teams-sharepoint-onedrive',
        options: [
          { id: 'a', label: 'Anyone with link always fastest' },
          { id: 'b', label: 'Prefer organisation-scoped links unless external collaboration approved' },
          { id: 'c', label: 'Screenshots on Instagram fastest' },
          { id: 'd', label: 'USB modem sneakernet default' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'tso-q8',
        prompt: 'Escalation sentence for persistent sync failure after client update.',
        domain: 'Teams collaboration',
        difficulty: 'stretch',
        explanation: 'Evidence dense.',
        modelAnswer:
          'Reproduced on second device post-update; conflicts cleared; still failing—likely tenant-side investigation needed with logs captured.',
        commonMistakes: [],
        dcsContext: 'Signals preparation depth.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'dcs-teams-sharepoint-onedrive',
        rubric: ['Evidence + ask'],
        keywordHints: ['reproduced', 'tenant']
      }
    ],
    scenarioPrompts: [{ id: 'tso-s1', title: 'Mystery disappearing channel files', prompt: 'Differentiate deletion vs permission drift.' }],
    practicalOutputs: [{ id: 'tso-p1', title: 'Collaboration triage one-pager', description: 'Teams/SharePoint layers quick diagram notes.' }]
  },
  {
    id: 'ipad-jamf-workflow-basics',
    title: 'iPad and Jamf Workflow Basics',
    description:
      'First-line triage for supervised devices: enrollment state, app installs, restrictions, and evidence capture before MDM escalation.',
    domain: 'Endpoint Support',
    level: 'L1',
    estimatedMinutes: 21,
    tags: ['iPad', 'Jamf', 'MDM', 'mobile'],
    learningObjectives: [
      'Read supervision/enrollment cues safely.',
      'Differentiate policy restriction messages from network faults.',
      'Package MDM escalation with identifiers minus oversharing.'
    ],
    dcsRelevance: ['Class sets amplify correlated failures.', 'MDM moves slowly—notes matter.'],
    sections: [
      {
        id: 'jamf-1',
        title: 'Enrollment mental model',
        bodyMarkdown:
          'Devices receive profiles and apps from MDM; missing profiles produce patterned restrictions or absent apps.'
      },
      {
        id: 'jamf-2',
        title: 'Safe classroom checks',
        bodyMarkdown:
          'Restart, verify Wi-Fi, confirm storage headroom, validate policy banner messaging—no jailbreak snake oil.'
      },
      {
        id: 'jamf-3',
        title: 'Escalation identifiers',
        bodyMarkdown:
          'Serial patterns, iOS version, last successful push timestamps if visible, scope counts.'
      }
    ],
    flashcards: [
      { id: 'jamf-f1', front: 'MDM scope?', back: 'Admin-defined profiles—not arbitrary toggles.' },
      { id: 'jamf-f2', front: 'App missing?', back: 'Assignment vs device scope vs licensing layers.' },
      { id: 'jamf-f3', front: 'Restriction screen?', back: 'Policy—not random glitch.' },
      { id: 'jamf-f4', front: 'Network vs MDM?', back: 'Online but policies not updating—different path.' },
      { id: 'jamf-f5', front: 'Storage pressure?', back: 'Updates fail mysteriously.' },
      { id: 'jamf-f6', front: 'Correlation?', back: 'Whole class suggests assignment push failure.' },
      { id: 'jamf-f7', front: 'Privacy?', back: 'Don’t screenshot student lock screens casually.' },
      { id: 'jamf-f8', front: 'Lost mode?', back: 'Security-sensitive—authorised only.' },
      { id: 'jamf-f9', front: 'User expectation?', back: 'Explain realistic MDM propagation delays.' },
      { id: 'jamf-f10', front: 'Ticket clarity?', back: 'Counts + versions + timeline.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'jamf-q1',
        prompt: 'Single iPad lacks mandated app while peers OK.',
        domain: 'Jamf basics',
        difficulty: 'foundation',
        explanation: 'Device-specific investigation.',
        modelAnswer: 'Check enrollment health + targeted assignment vs group drift.',
        commonMistakes: [],
        dcsContext: 'Individual outliers.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'dcs-ipad-jamf',
        options: [
          { id: 'a', label: 'Erase school without approval' },
          { id: 'b', label: 'Verify enrollment/app assignment signals before MDM deep dive escalation' },
          { id: 'c', label: 'Tell student buy Android' },
          { id: 'd', label: 'Disable MDM yourself' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'jamf-q2',
        prompt: 'Evidence bundle for MDM escalation.',
        domain: 'Jamf basics',
        difficulty: 'stretch',
        explanation: 'Actionable.',
        modelAnswer: 'Serial last four digits pattern substitute list, iOS version, symptom category, failed install message text, scope count, timestamp.',
        commonMistakes: [],
        dcsContext: 'Avoid listing full student roster unnecessarily.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'dcs-ipad-jamf',
        rubric: ['Concrete artefacts'],
        keywordHints: ['version', 'timestamp']
      },
      {
        type: 'order-steps',
        id: 'jamf-q3',
        prompt: 'Order classroom iPad triage.',
        domain: 'Jamf basics',
        difficulty: 'foundation',
        explanation: 'Safe cheap moves first.',
        modelAnswer: 'Confirm Wi-Fi → storage → reboot → compare peer devices → capture restriction message → escalate MDM if correlated.',
        commonMistakes: [],
        dcsContext: 'Student patience thin.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'dcs-ipad-jamf',
        steps: [
          { id: 'wifi', label: 'Verify connectivity basics' },
          { id: 'stor', label: 'Check storage headroom' },
          { id: 'reb', label: 'Controlled reboot' },
          { id: 'mdm', label: 'Escalate with correlated evidence if persists' }
        ],
        correctOrder: ['wifi', 'stor', 'reb', 'mdm'],
        rubric: ['Low-risk first']
      },
      {
        type: 'scenario-response',
        id: 'jamf-q4',
        prompt: 'Teacher demands immediate wipe of student iPad found unlocked.',
        domain: 'Jamf basics',
        difficulty: 'challenge',
        explanation: 'Safeguarding device handling.',
        modelAnswer:
          'Pause—follow authorised safeguarding/device-loss playbook; remote wipe is sensitive; coordinate leadership/security—not solo impulse.',
        commonMistakes: [],
        dcsContext: 'Legal/safety nuances.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'dcs-ipad-jamf',
        rubric: ['Policy-first']
      },
      {
        type: 'mcq',
        id: 'jamf-q5',
        prompt: 'Whole class missing app after push?',
        domain: 'Jamf basics',
        difficulty: 'stretch',
        explanation: 'Correlation.',
        modelAnswer: 'Likely assignment/scoping push failure upstream.',
        commonMistakes: [],
        dcsContext: 'Efficiency—don’t loop per kid endlessly.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'dcs-ipad-jamf',
        options: [
          { id: 'a', label: 'Student discipline issue obviously' },
          { id: 'b', label: 'Treat as probable MDM deployment scope failure & escalate with counts' },
          { id: 'c', label: 'Ask kids reinstall personally Apple IDs improperly' },
          { id: 'd', label: 'Ignore correlation magic' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'explain-it-simply',
        id: 'jamf-q6',
        prompt: 'Explain profile installation delay.',
        domain: 'Jamf basics',
        difficulty: 'foundation',
        explanation: 'Expectations.',
        modelAnswer:
          'The management server queues commands—devices check in periodically; urgent class impact belongs in escalation note.',
        commonMistakes: [],
        dcsContext: 'Teachers want instant.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'dcs-ipad-jamf',
        rubric: ['Plain queued metaphor'],
        keywordHints: ['check-in', 'queue']
      },
      {
        type: 'mcq',
        id: 'jamf-q7',
        prompt: 'Restriction message screenshots?',
        domain: 'Jamf basics',
        difficulty: 'foundation',
        explanation: 'Privacy cautious cropping.',
        modelAnswer: 'Crop tightly to message chrome.',
        commonMistakes: [],
        dcsContext: 'Student wallpapers etc.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'dcs-ipad-jamf',
        options: [
          { id: 'a', label: 'Full student photo backgrounds okay always' },
          { id: 'b', label: 'Prefer minimal crop showing restriction dialog text only' },
          { id: 'c', label: 'Never screenshot even dialog' },
          { id: 'd', label: 'Post to social media for laughs never real answer' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'jamf-q8',
        prompt: 'Differentiate network fault vs MDM push fault quickly.',
        domain: 'Jamf basics',
        difficulty: 'stretch',
        explanation: 'Decision clarity.',
        modelAnswer:
          'If web browsing fails broadly on device independent of managed apps—network layer first; if online yet managed profiles/apps stale across cohort—MDM push suspicion.',
        commonMistakes: [],
        dcsContext: 'Layer isolation.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'dcs-ipad-jamf',
        rubric: ['Layer reasoning'],
        keywordHints: ['online', 'push']
      }
    ],
    scenarioPrompts: [{ id: 'jamf-s1', title: 'Cart of iPads outdated profiles', prompt: 'Correlation escalation storyline.' }],
    practicalOutputs: [{ id: 'jamf-p1', title: 'MDM escalation snapshot template', description: 'Minimal fields list for Jamf owners.' }]
  },
  {
    id: 'device-imaging-deployment-workflows',
    title: 'Device Imaging and Deployment Workflows',
    description:
      'First-line awareness for imaging, provisioning, reference builds, driver readiness, and deployment evidence without pretending to own production rollout tooling.',
    domain: 'Endpoint Support',
    level: 'L2',
    estimatedMinutes: 24,
    tags: ['imaging', 'deployment', 'provisioning', 'drivers', 'Windows'],
    learningObjectives: [
      'Separate imaging, provisioning, and app deployment as related but different endpoint workflows.',
      'Recognise why reference builds, driver packs, test groups, and rollback notes matter before rollout.',
      'Capture useful Level 1 evidence when a newly deployed device is not ready for staff or students.'
    ],
    dcsRelevance: [
      'New or rebuilt devices are common school support touchpoints.',
      'Good first-line notes reduce rework for deployment owners.',
      'Deployment vocabulary helps Josh escalate without unsafe production changes.'
    ],
    sections: [
      {
        id: 'imaging-1',
        title: 'Imaging vs provisioning',
        bodyMarkdown:
          'Imaging usually applies a prepared operating-system build to a device. Provisioning configures a device into the right managed state with accounts, policies, apps, certificates, and compliance expectations.\n\nIn modern fleets the two ideas can overlap, but they are not identical. A device can have a working OS image and still be missing apps, policies, drivers, or group membership.'
      },
      {
        id: 'imaging-2',
        title: 'Why reference builds need testing',
        bodyMarkdown:
          'A reference build should be tested on the actual hardware family before wider rollout. Driver mismatch, BIOS/UEFI settings, storage mode, Wi-Fi drivers, display adapters, and activation/licensing can turn a technically successful deployment into an unusable classroom device.'
      },
      {
        id: 'imaging-3',
        title: 'Level 1 deployment evidence',
        bodyMarkdown:
          'Josh does not need to own the deployment server to be useful. He can capture device model, asset tag, build version, deployment stage, missing app or driver symptom, whether peers are affected, and the class or staff impact. That creates a better handoff to the imaging or endpoint owner.'
      }
    ],
    flashcards: [
      { id: 'img-f1', front: 'Imaging in plain English?', back: 'Applying a prepared operating-system build to a device.' },
      { id: 'img-f2', front: 'Provisioning in plain English?', back: 'Putting the device into the right managed state with apps, policies, accounts, and compliance.' },
      { id: 'img-f3', front: 'Why can a device boot but still not be ready?', back: 'It may be missing apps, drivers, policies, activation, certificates, or group assignment.' },
      { id: 'img-f4', front: 'Reference build risk?', back: 'A build that works on one hardware family may fail or degrade on another.' },
      { id: 'img-f5', front: 'Driver pack evidence includes?', back: 'Device model, missing device category, error text, and build version.' },
      { id: 'img-f6', front: 'Why test small groups first?', back: 'Pilot testing catches deployment problems before they affect a full class or cohort.' },
      { id: 'img-f7', front: 'Rollback note should capture?', back: 'What changed, who approved it, affected scope, and fallback path.' },
      { id: 'img-f8', front: 'Level 1 should avoid?', back: 'Changing production images or deployment rules without authority.' },
      { id: 'img-f9', front: 'Best new-device readiness check?', back: 'Login, Wi-Fi, core apps, printing, browser, and management/policy status.' },
      { id: 'img-f10', front: 'Deployment handoff value?', back: 'Precise scope and stage reduce repeated rebuilds and guesswork.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'img-q1',
        prompt: 'A newly imaged laptop boots but has no required classroom apps. Best first classification?',
        domain: 'Device deployment',
        difficulty: 'foundation',
        explanation: 'OS readiness and app provisioning are separate readiness layers.',
        modelAnswer: 'The OS image may have succeeded, but app provisioning or assignment may still be incomplete.',
        commonMistakes: ['Calling the whole image corrupt', 'Rebuilding before checking assignment/provisioning stage'],
        dcsContext: 'New device readiness often depends on several systems finishing in sequence.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment-workflows',
        weakTopic: 'endpoint-deployment',
        options: [
          { id: 'a', label: 'The laptop is definitely physically broken' },
          { id: 'b', label: 'The OS image may be complete while app provisioning is incomplete' },
          { id: 'c', label: 'Delete all deployment records and start again' },
          { id: 'd', label: 'Ignore the missing apps until the teacher complains twice' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'img-q2',
        prompt: 'List five fields Josh should capture when a deployed device is not classroom-ready.',
        domain: 'Device deployment',
        difficulty: 'stretch',
        explanation: 'Deployment owners need stage, scope, and symptom evidence.',
        modelAnswer:
          'Asset tag, device model, build/version, missing app or driver symptom, deployment stage if visible, user role/class impact, and whether peer devices are affected.',
        commonMistakes: ['Only writing “new laptop broken”', 'Skipping model or build information'],
        dcsContext: 'Good handoffs reduce rebuild loops.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment-workflows',
        weakTopic: 'endpoint-deployment',
        rubric: ['Device identity', 'Build/stage', 'Symptom', 'Scope', 'Impact'],
        keywordHints: ['asset', 'model', 'build', 'scope', 'impact']
      },
      {
        type: 'order-steps',
        id: 'img-q3',
        prompt: 'Order a safe first-line response to a newly deployed laptop with Wi-Fi missing.',
        domain: 'Device deployment',
        difficulty: 'stretch',
        explanation: 'Confirm scope before assuming bad image or bad network.',
        modelAnswer:
          'Confirm hardware/model and build, compare peer devices from same rollout, check whether Wi-Fi adapter/driver is visible, then escalate with deployment evidence.',
        commonMistakes: ['Resetting network infrastructure first', 'Reimaging immediately without scope'],
        dcsContext: 'A driver issue can look like a network issue until scoped.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment-workflows',
        weakTopic: 'endpoint-deployment',
        steps: [
          { id: 'device', label: 'Confirm device model and build version' },
          { id: 'scope', label: 'Compare peer devices from the same rollout' },
          { id: 'adapter', label: 'Check whether the Wi-Fi adapter or driver is visible' },
          { id: 'handoff', label: 'Escalate with rollout evidence and impact' }
        ],
        correctOrder: ['device', 'scope', 'adapter', 'handoff'],
        rubric: ['Starts with device/build', 'Scopes rollout', 'Escalates with evidence']
      },
      {
        type: 'scenario-response',
        id: 'img-q4',
        prompt: 'A teacher says the rebuilt laptop is “not set up properly” five minutes before class. Write the support posture.',
        domain: 'Device deployment',
        difficulty: 'challenge',
        explanation: 'Classroom urgency changes the response, but not the authority boundary.',
        modelAnswer:
          'Acknowledge class impact, check login and one or two core readiness items quickly, provide a fallback if available, and escalate missing deployment items with asset/build/scope evidence.',
        commonMistakes: ['Attempting deep deployment fixes during class', 'Ignoring immediate teaching impact'],
        dcsContext: 'Front-of-class deployment failures need both triage and handoff discipline.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment-workflows',
        weakTopic: 'endpoint-deployment',
        rubric: ['Acknowledges urgency', 'Uses quick readiness checks', 'Escalates missing deployment layer']
      },
      {
        type: 'mcq',
        id: 'img-q5',
        prompt: 'Why is a pilot group useful before a wider device rollout?',
        domain: 'Device deployment',
        difficulty: 'foundation',
        explanation: 'Small-scope testing contains deployment defects.',
        modelAnswer: 'It catches build, driver, app, and policy problems before they affect a full cohort.',
        commonMistakes: ['Assuming deployment either works everywhere or nowhere'],
        dcsContext: 'Schools have tight class timing and limited spare-device tolerance.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment-workflows',
        weakTopic: 'endpoint-deployment',
        options: [
          { id: 'a', label: 'It makes documentation unnecessary' },
          { id: 'b', label: 'It catches rollout problems before broad impact' },
          { id: 'c', label: 'It proves no rollback plan is needed' },
          { id: 'd', label: 'It lets Level 1 bypass change ownership' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'explain-it-simply',
        id: 'img-q6',
        prompt: 'Explain imaging vs provisioning to a non-technical staff member.',
        domain: 'Device deployment',
        difficulty: 'foundation',
        explanation: 'Plain language reduces false expectations.',
        modelAnswer:
          'Imaging is like putting the base setup on the laptop. Provisioning is the follow-up that gives it the right school apps, settings, and access.',
        commonMistakes: ['Using deployment jargon with no distinction'],
        dcsContext: 'Staff often see one “new laptop setup” process even when several systems are involved.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment-workflows',
        weakTopic: 'endpoint-deployment',
        rubric: ['Distinguishes base setup', 'Mentions apps/settings/access'],
        keywordHints: ['base', 'apps', 'settings', 'access']
      },
      {
        type: 'mcq',
        id: 'img-q7',
        prompt: 'Which action stays inside a Level 1-safe deployment role?',
        domain: 'Device deployment',
        difficulty: 'foundation',
        explanation: 'First-line value is evidence and safe checks, not unauthorised image changes.',
        modelAnswer: 'Capture asset, model, build, scope, and exact readiness failure before escalating.',
        commonMistakes: ['Editing task sequences or image sources casually'],
        dcsContext: 'Deployment systems can affect many devices quickly.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment-workflows',
        weakTopic: 'endpoint-deployment',
        options: [
          { id: 'a', label: 'Change the production image to test a guess' },
          { id: 'b', label: 'Capture asset/model/build/scope and escalate the readiness failure' },
          { id: 'c', label: 'Disable management policies for speed' },
          { id: 'd', label: 'Delete the device record without approval' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'img-q8',
        prompt: 'Write one sentence for a deployment-owner handoff.',
        domain: 'Device deployment',
        difficulty: 'stretch',
        explanation: 'A useful handoff includes stage, scope, symptom, and impact.',
        modelAnswer:
          'Three Year 8 laptops from today’s rollout boot successfully but lack the required classroom app; same model/build, class starts 10:15, requesting provisioning assignment review.',
        commonMistakes: ['No scope', 'No requested next owner action'],
        dcsContext: 'Deployment handoffs should point to the likely owner without blame.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment-workflows',
        weakTopic: 'endpoint-deployment',
        rubric: ['Scope', 'Build/stage', 'Symptom', 'Impact/request'],
        keywordHints: ['rollout', 'build', 'scope', 'review']
      }
    ],
    scenarioPrompts: [
      {
        id: 'img-s1',
        title: 'New laptop not classroom-ready',
        prompt: 'Separate OS image success from missing provisioning, driver, or app assignment evidence.'
      }
    ],
    practicalOutputs: [
      {
        id: 'img-p1',
        title: 'Deployment readiness evidence card',
        description: 'Create a one-page checklist for asset, model, build, apps, drivers, policy status, scope, and class impact.'
      }
    ],
    interactiveLabs: [
      {
        id: 'lab-imaging-decision',
        title: 'Deployment Strategy',
        scenario: 'A batch of 30 brand new identical laptops just arrived from the supplier. They already have Windows 11 Pro installed.',
        decisionPoints: [
          {
            id: 'd0',
            question: 'What is a safe first check before deciding on a deployment method?',
            options: [
              { id: 'o1', label: 'Check if the serial numbers are already in the Autopilot portal.', feedback: 'Correct. If they are already registered, provisioning is the natural choice.', isCorrect: true },
              { id: 'o2', label: 'Boot one up and start installing Chrome manually.', feedback: 'Inefficient. We want an automated process.', isCorrect: false }
            ]
          },
          {
            id: 'd1',
            question: 'Which method is more efficient for modern school deployment?',
            options: [
              { id: 'o1', label: 'Wipe and re-image via WDS', feedback: 'Traditional but slow. Requires capturing and maintaining a heavy base image.', isCorrect: false },
              { id: 'o2', label: 'Provision via Autopilot', feedback: 'Correct. Since they have a clean OS, we only need to apply DCS-specific configurations and apps.', isCorrect: true }
            ]
          }
        ],
        dcsApplication: 'Autopilot provisioning saves hours of technician time compared to manual imaging for new hardware.',
        retrievalQuestion: 'When would you still choose Imaging over Provisioning?',
        reflectionPrompt: 'How does modern provisioning change the way you prepare for a new term?'
      },
      {
        id: 'lab-viewboard-no-display',
        title: 'ViewBoard Display Triage',
        scenario: 'A teacher is frustrated in class because their laptop "won\'t connect" to the ViewBoard.',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is the FIRST question Josh should ask?',
            options: [
              { id: 'o1', label: 'Are you using HDMI or wireless casting?', feedback: 'Essential. Triage steps differ completely between physical and wireless connections.', isCorrect: true },
              { id: 'o2', label: 'When did you last restart your laptop?', feedback: 'Good general check, but identifying the connection type is more urgent.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'The teacher says "HDMI". Audio works but no video. What is a safe first check?',
            options: [
              { id: 'o1', label: 'Try a different HDMI cable and port on the ViewBoard.', feedback: 'Correct. Rule out the simplest hardware failure first.', isCorrect: true },
              { id: 'o2', label: 'Update the ViewBoard firmware.', feedback: 'Too invasive mid-class.', isCorrect: false }
            ]
          },
          {
            id: 'd3',
            question: 'What should you NOT change too early?',
            options: [
              { id: 'o1', label: 'The display resolution or graphics drivers.', feedback: 'Correct. This can make the laptop screen itself unreadable if wrong.', isCorrect: true },
              { id: 'o2', label: 'The HDMI cable.', feedback: 'Cables are safe and easy to swap.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'ViewBoards at DCS are critical for teaching. Always carry a known-good HDMI cable for fast testing.',
        retrievalQuestion: 'What should you NOT change too early during a display fault?',
        reflectionPrompt: 'How do you keep the teacher calm while you are crawling under the desk to check cables?'
      }
    ]
  },
  {
    id: 'soft-skills-dcs-support',
    title: 'Soft Skills for DCS Support',
    description:
      'Develop communication, empathy, problem-solving, and time-management skills essential for effective IT support in a school environment.',
    domain: 'Professional Practice',
    level: 'L1',
    estimatedMinutes: 25,
    tags: ['Communication', 'Empathy', 'Problem-solving', 'Time management', 'Professional development'],
    learningObjectives: [
      'Practice clear, empathetic communication with diverse school stakeholders.',
      'Apply structured problem-solving approaches to IT issues.',
      'Manage time effectively during busy support periods.',
      'Build rapport and trust with teachers, students, and staff.'
    ],
    dcsRelevance: [
      'IT support involves as much people skills as technical skills.',
      'Clear communication reduces misunderstandings and repeat calls.',
      'Empathy helps de-escalate frustrated users.',
      'Structured problem-solving prevents rushed, ineffective fixes.'
    ],
    sections: [
      {
        id: 'ss-1',
        title: 'Empathetic communication basics',
        bodyMarkdown:
          'Start with acknowledgment: "I understand this is disrupting your class." Use active listening: repeat back what you heard. Avoid jargon; explain in plain language. End with next steps and realistic timelines.'
      },
      {
        id: 'ss-2',
        title: 'Structured problem-solving',
        bodyMarkdown:
          'Gather facts first, then symptoms, then scope. Test one change at a time. Document what you try. If stuck, escalate with complete evidence rather than guessing.'
      },
      {
        id: 'ss-3',
        title: 'Time management in support',
        bodyMarkdown:
          'Prioritize by impact: class in session > urgent admin > non-urgent. Use quiet windows for complex tasks. Set expectations: "This may take 15 minutes." Batch similar issues.'
      },
      {
        id: 'ss-4',
        title: 'Building trust and rapport',
        bodyMarkdown:
          'Follow through on commitments. Admit when you don\'t know but will find out. Share progress updates. Celebrate successful resolutions.'
      }
    ],
    flashcards: [
      { id: 'ss-f1', front: 'Empathy first response?', back: 'Acknowledge the disruption and show understanding.' },
      { id: 'ss-f2', front: 'Active listening includes?', back: 'Repeating back what the user said to confirm understanding.' },
      { id: 'ss-f3', front: 'Avoid jargon by?', back: 'Explaining technical terms in simple, everyday language.' },
      { id: 'ss-f4', front: 'Problem-solving order?', back: 'Facts → symptoms → scope → test one change → document → escalate if needed.' },
      { id: 'ss-f5', front: 'Time priority hierarchy?', back: 'Class in session > urgent admin > non-urgent tasks.' },
      { id: 'ss-f6', front: 'Set expectations with?', back: 'Realistic timelines and progress updates.' },
      { id: 'ss-f7', front: 'Batch similar issues to?', back: 'Increase efficiency and reduce context switching.' },
      { id: 'ss-f8', front: 'Build trust by?', back: 'Following through, admitting unknowns, sharing progress, celebrating wins.' },
      { id: 'ss-f9', front: 'De-escalate frustration with?', back: 'Calm tone, empathy, clear next steps.' },
      { id: 'ss-f10', front: 'Document everything because?', back: 'It helps future you and enables proper escalation.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'ss-q1',
        prompt: 'A teacher is frustrated because their projector won\'t work during class. Best first response?',
        domain: 'Soft skills',
        difficulty: 'foundation',
        explanation: 'Empathy de-escalates while gathering facts.',
        modelAnswer: 'Acknowledge the urgency and disruption, then ask for specific symptoms.',
        commonMistakes: ['Jumping straight to technical questions', 'Minimizing the problem'],
        dcsContext: 'Class disruptions create immediate stress.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'rbc-professional-practice',
        options: [
          { id: 'a', label: 'Tell them to wait until after class' },
          { id: 'b', label: 'Acknowledge the class disruption and ask what exactly is happening' },
          { id: 'c', label: 'Start troubleshooting the projector immediately' },
          { id: 'd', label: 'Explain HDMI technical details' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'ss-q2',
        prompt: 'List three ways to show empathy during IT support.',
        domain: 'Soft skills',
        difficulty: 'foundation',
        explanation: 'Empathy builds rapport and reduces tension.',
        modelAnswer: 'Acknowledge the problem\'s impact, use a calm tone, repeat back understanding, offer realistic timelines.',
        commonMistakes: ['Focusing only on technical fixes', 'Using dismissive language'],
        dcsContext: 'School users often face time pressure.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'rbc-professional-practice',
        rubric: ['Acknowledgment', 'Tone', 'Understanding'],
        keywordHints: ['acknowledge', 'calm', 'timeline']
      },
      {
        type: 'order-steps',
        id: 'ss-q3',
        prompt: 'Order steps for handling a complex issue during a busy period.',
        domain: 'Soft skills',
        difficulty: 'stretch',
        explanation: 'Structured approach prevents overwhelm.',
        modelAnswer: 'Assess urgency and impact, set user expectations, gather facts, test changes one at a time, document progress.',
        commonMistakes: ['Trying multiple fixes at once', 'Not communicating progress'],
        dcsContext: 'Busy periods require efficient prioritization.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'rbc-professional-practice',
        steps: [
          { id: 'assess', label: 'Assess urgency and impact' },
          { id: 'expect', label: 'Set user expectations' },
          { id: 'facts', label: 'Gather complete facts' },
          { id: 'test', label: 'Test one change at a time' },
          { id: 'doc', label: 'Document everything' }
        ],
        correctOrder: ['assess', 'expect', 'facts', 'test', 'doc'],
        rubric: ['Prioritizes urgency', 'Sets expectations', 'Documents']
      },
      {
        type: 'scenario-response',
        id: 'ss-q4',
        prompt: 'A staff member calls about a password issue but is clearly stressed about a deadline. How do you respond?',
        domain: 'Soft skills',
        difficulty: 'challenge',
        explanation: 'Balance technical help with emotional support.',
        modelAnswer: 'Acknowledge the stress and deadline pressure, confirm you\'ll work efficiently, walk through password reset calmly, offer to follow up if needed.',
        commonMistakes: ['Ignoring the stress', 'Rushing through without explanation'],
        dcsContext: 'School work often has tight deadlines.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'rbc-professional-practice',
        rubric: ['Acknowledges stress', 'Offers efficient help', 'Provides follow-up']
      },
      {
        type: 'explain-it-simply',
        id: 'ss-q5',
        prompt: 'Explain to a non-technical teacher why you need to test one thing at a time.',
        domain: 'Soft skills',
        difficulty: 'foundation',
        explanation: 'Clear communication builds trust.',
        modelAnswer: 'Testing one change at a time helps us know exactly what fixed the problem, so we can prevent it happening again and not waste time on unnecessary steps.',
        commonMistakes: ['Using technical jargon', 'Not explaining the benefit'],
        dcsContext: 'Teachers appreciate efficiency explanations.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'rbc-professional-practice',
        rubric: ['Explains method', 'Gives benefit', 'Avoids jargon'],
        keywordHints: ['one change', 'prevent', 'waste time']
      }
    ],
    scenarioPrompts: [
      {
        id: 'ss-s1',
        title: 'Frustrated teacher during class',
        prompt: 'Practice empathetic communication and structured problem-solving when a teacher\'s laptop won\'t connect to the projector mid-lesson.'
      },
      {
        id: 'ss-s2',
        title: 'Multiple urgent requests',
        prompt: 'Demonstrate time management and prioritization when three teachers need help simultaneously during a busy morning.'
      }
    ],
    practicalOutputs: [
      {
        id: 'ss-p1',
        title: 'Empathy checklist',
        description: 'Create a personal checklist of empathetic phrases and active listening techniques for support interactions.'
      },
      {
        id: 'ss-p2',
        title: 'Problem-solving template',
        description: 'Design a template for documenting facts, symptoms, scope, attempted fixes, and escalation notes.'
      }
    ]
  },
  {
    id: 'microsoft-intune-fundamentals',
    title: 'Microsoft Intune and MDM Fundamentals',
    description: 'Learn to manage, secure, and deploy school devices and apps using Microsoft Intune and modern MDM workflows.',
    domain: 'Endpoint Support',
    level: 'L2',
    estimatedMinutes: 28,
    tags: ['Intune', 'MDM', 'Endpoint Manager', 'provisioning', 'compliance'],
    learningObjectives: [
      'Explain the role of MDM in modern school IT environments.',
      'Navigate Intune enrollment, compliance, and configuration workflows.',
      'Deploy applications and security policies to managed devices.',
      'Perform remote management tasks like wiping lost devices safely.'
    ],
    dcsRelevance: [
      'Intune is the primary tool for managing student and staff Windows devices.',
      'Understanding enrollment helps troubleshoot "not set up" complaints.',
      'Compliance policies ensure only secure devices access school data.'
    ],
    sections: [
      {
        id: 'intune-1',
        title: 'What is Intune and MDM?',
        bodyMarkdown: 'Microsoft Intune is a cloud-based service that focuses on mobile device management (MDM) and mobile application management (MAM). In schools, it allows IT to control how devices are used, including mobile phones, tablets, and laptops.'
      },
      {
        id: 'intune-2',
        title: 'Device Enrollment',
        bodyMarkdown: 'Enrollment is the process of adding a device to Intune. Once enrolled, the device can receive policies, certificates, and apps. Common methods include Autopilot for Windows and Company Portal for BYOD.'
      },
      {
        id: 'intune-3',
        title: 'Compliance and Configuration',
        bodyMarkdown: 'Compliance policies define the rules a device must follow (e.g., must have a PIN, must be encrypted). Configuration profiles allow you to manage settings like Wi-Fi, VPN, and email automatically.'
      },
      {
        id: 'intune-4',
        title: 'Remote Actions',
        bodyMarkdown: 'Intune allows for remote actions such as Restart, Remote Wipe (erases all data), and Fresh Start (removes pre-installed apps and reinstalls Windows).'
      }
    ],
    interactiveLabs: [
      {
        id: 'lab-intune-wipe',
        title: 'Stolen Device Triage',
        scenario: 'A teacher calls to report their school-issued Windows laptop was stolen from their car an hour ago. It contains sensitive student reports.',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is the FIRST question Josh should ask the teacher?',
            options: [
              { id: 'o1', label: 'Did you have student data saved locally or in OneDrive?', feedback: 'Good. We need to know the scope of potential data loss beyond just the hardware.', isCorrect: true },
              { id: 'o2', label: 'What color was the laptop bag?', feedback: 'Not critical for technical triage.', isCorrect: false },
              { id: 'o3', label: 'Have you called the police yet?', feedback: 'Important for them, but we need to secure the data first.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'Which safe first check should you perform in the Intune portal?',
            options: [
              { id: 'o1', label: 'Check "Last check-in" time and device location if enabled.', feedback: 'Correct. This tells us if the device has been online since the theft.', isCorrect: true },
              { id: 'o2', label: 'Change the teachers password immediately.', feedback: 'Wait. Changing the password might block our own remote wipe command if the device needs to sync.', isCorrect: false }
            ]
          },
          {
            id: 'd3',
            question: 'What is the immediate best action in the Intune portal?',
            options: [
              { id: 'o1', label: 'Retire the device', feedback: 'Incorrect. Retire only removes school data/management, leaving personal files and potential cached credentials.', isCorrect: false },
              { id: 'o2', label: 'Remote Wipe', feedback: 'Correct. Wipe erases all data on the drive to ensure no sensitive files are recoverable.', isCorrect: true },
              { id: 'o3', label: 'Fresh Start', feedback: 'Incorrect. Fresh Start is for performance resets, not immediate security containment.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'In DCS, any theft must also be reported to Paul and the business office immediately for insurance and legal compliance.',
        retrievalQuestion: 'What is the difference between Wipe and Retire?',
        reflectionPrompt: 'How would you handle the teachers anxiety while performing these technical steps?'
      }
    ],
    flashcards: [
      { id: 'int-f1', front: 'What is MDM?', back: 'Mobile Device Management—software that secures and manages mobile devices.' },
      { id: 'int-f2', front: 'What is Autopilot?', back: 'A collection of technologies used to set up and pre-configure new devices.' },
      { id: 'int-f3', front: 'Compliance Policy purpose?', back: 'Ensures devices meet security standards before accessing data.' },
      { id: 'int-f4', front: 'Remote Wipe vs Retire?', back: 'Wipe erases everything; Retire only removes school data and management.' },
      { id: 'int-f5', front: 'Company Portal?', back: 'The app users use to enroll devices and install school-approved apps.' },
      { id: 'int-f6', front: 'What does Last check-in tell you?', back: 'Whether the device recently contacted Intune and can receive management commands.' },
      { id: 'int-f7', front: 'What is a configuration profile?', back: 'A managed settings payload for Wi-Fi, certificates, security settings, or app behavior.' },
      { id: 'int-f8', front: 'What should L1 avoid in Intune?', back: 'Changing broad policies, wiping devices, or retiring devices without explicit approval and evidence.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'int-q1',
        prompt: 'A teacher’s laptop is stolen. Which Intune action is most appropriate to protect data?',
        domain: 'Intune management',
        difficulty: 'foundation',
        explanation: 'Wipe removes all data, protecting sensitive information.',
        modelAnswer: 'Remote Wipe',
        commonMistakes: ['Retire'],
        dcsContext: 'Theft requires immediate data destruction.',
        reviewSchedule,
        recommendedModuleId: 'microsoft-intune-fundamentals',
        weakTopic: 'endpoint-deployment',
        options: [
          { id: 'a', label: 'Retire device' },
          { id: 'b', label: 'Remote Wipe' },
          { id: 'c', label: 'Restart' },
          { id: 'd', label: 'Sync' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'int-q2',
        prompt: 'List three items a Compliance Policy might check.',
        domain: 'Intune management',
        difficulty: 'stretch',
        explanation: 'Security rules for devices.',
        modelAnswer: 'BitLocker encryption, OS version, Minimum password length, Antivirus status.',
        commonMistakes: [],
        dcsContext: 'Ensures classroom devices are secure.',
        reviewSchedule,
        recommendedModuleId: 'microsoft-intune-fundamentals',
        weakTopic: 'endpoint-deployment',
        rubric: ['Encryption', 'Version', 'Password'],
        keywordHints: ['encryption', 'version', 'password']
      },
      {
        type: 'order-steps',
        id: 'int-q3',
        prompt: 'Order a safe first-line check for an Autopilot enrollment failure.',
        domain: 'Intune management',
        difficulty: 'stretch',
        explanation: 'Enrollment faults need evidence before policy changes.',
        modelAnswer: 'Confirm device identity, network access, assigned profile, last error, then escalate with screenshots or error codes.',
        commonMistakes: ['Wiping the device before checking assignment', 'Ignoring network and identity evidence'],
        dcsContext: 'A clean handoff helps the endpoint owner decide whether the issue is device, assignment, or policy related.',
        reviewSchedule,
        recommendedModuleId: 'microsoft-intune-fundamentals',
        weakTopic: 'endpoint-deployment',
        steps: [
          { id: 'identity', label: 'Confirm serial/device identity' },
          { id: 'network', label: 'Confirm network can reach enrollment services' },
          { id: 'profile', label: 'Check profile assignment or expected group' },
          { id: 'error', label: 'Capture exact error and last check-in' },
          { id: 'escalate', label: 'Escalate to endpoint owner' }
        ],
        correctOrder: ['identity', 'network', 'profile', 'error', 'escalate'],
        rubric: ['Device identity first', 'Evidence before escalation', 'No risky policy change']
      },
      {
        type: 'scenario-response',
        id: 'int-q4',
        prompt: 'A managed student laptop is non-compliant and blocked from a cloud app. Write the first-line escalation note.',
        domain: 'Intune management',
        difficulty: 'challenge',
        explanation: 'Compliance issues should be described with scope and evidence, not guessed fixes.',
        modelAnswer:
          'Include device/user context, app affected, compliance message, last check-in if known, safe checks tried, impact, and request endpoint owner review policy/device state.',
        commonMistakes: ['Promising policy changes', 'Leaving out the compliance message', 'Including sensitive data unnecessarily'],
        dcsContext: 'Compliance blocks affect learning access and need privacy-safe, owner-ready evidence.',
        reviewSchedule,
        recommendedModuleId: 'microsoft-intune-fundamentals',
        weakTopic: 'endpoint-deployment',
        rubric: ['Device/user context', 'Compliance evidence', 'Owner-ready escalation']
      }
    ],
    scenarioPrompts: [
      {
        id: 'int-s1',
        title: 'Device enrollment failure',
        prompt: 'Troubleshoot a Windows laptop that fails to enroll during Autopilot setup.'
      }
    ],
    practicalOutputs: [
      {
        id: 'int-p1',
        title: 'Intune enrollment guide',
        description: 'Create a one-page guide for staff on how to enroll their BYOD devices via Company Portal.'
      }
    ]
  },
  {
    id: 'cybersecurity-incident-response-nist',
    title: 'Cybersecurity and Incident Response (NIST 800-61)',
    description: 'Understand modern cyber threats and the structured phases of incident response for school environments.',
    domain: 'Cybersecurity',
    level: 'L2',
    estimatedMinutes: 30,
    tags: ['cybersecurity', 'NIST', 'incident response', 'phishing', 'ransomware'],
    learningObjectives: [
      'Identify common cyber threats facing K-12 schools.',
      'Explain the four phases of the NIST 800-61 incident response lifecycle.',
      'Recognize signs of phishing and ransomware early.',
      'Report incidents correctly according to school policy.'
    ],
    dcsRelevance: [
      'Schools are high-value targets for ransomware.',
      'Staff are the first line of defense against phishing.',
      'Structured response prevents panic and data loss.'
    ],
    sections: [
      {
        id: 'nist-1',
        title: 'Modern School Threats',
        bodyMarkdown: 'Schools face phishing, ransomware, data breaches, and insider threats. Attackers often target student records or financial data.'
      },
      {
        id: 'nist-2',
        title: 'NIST Incident Response Lifecycle',
        bodyMarkdown: 'The NIST 800-61 framework defines four phases:\n1. **Preparation**: Hardening systems and training staff.\n2. **Detection & Analysis**: Identifying a potential incident.\n3. **Containment, Eradication & Recovery**: Stopping the threat and restoring service.\n4. **Post-Incident Activity**: Learning from the event.'
      },
      {
        id: 'nist-3',
        title: 'Phishing and Social Engineering',
        bodyMarkdown: 'Phishing uses deceptive emails to steal credentials. Social engineering manipulates people into performing actions or divesting confidential information.'
      }
    ],
    interactiveLabs: [
      {
        id: 'lab-nist-containment',
        title: 'Ransomware Containment',
        scenario: 'A student mentions they clicked a "cool link" on a school PC, and now the screen is flashing red and files are disappearing.',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is the FIRST action to contain the threat?',
            options: [
              { id: 'o1', label: 'Run a full virus scan', feedback: 'Too slow. Ransomware spreads through the network in minutes.', isCorrect: false },
              { id: 'o2', label: 'Unplug the ethernet cable / Disable Wi-Fi', feedback: 'Correct. Physically isolating the device prevents the malware from reaching school servers or other PCs.', isCorrect: true },
              { id: 'o3', label: 'Call the student parent', feedback: 'Incorrect priority. Secure the network first.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'At DCS, isolating the machine immediately protects the shared drives and SLG data from being encrypted.',
        retrievalQuestion: 'What are the 4 phases of the NIST incident response lifecycle?',
        reflectionPrompt: 'How would you explain the students mistake without making them feel blamed?'
      }
    ],
    flashcards: [
      { id: 'nist-f1', front: 'NIST 800-61?', back: 'Computer Security Incident Handling Guide.' },
      { id: 'nist-f2', front: 'Containment goal?', back: 'Stop the incident from spreading and causing more damage.' },
      { id: 'nist-f3', front: 'Preparation phase?', back: 'Building capacity to respond before an incident occurs.' },
      { id: 'nist-f4', front: 'Ransomware?', back: 'Malware that encrypts files and demands payment for the key.' },
      { id: 'nist-f5', front: 'Detection and analysis means?', back: 'Identify indicators, confirm scope, preserve evidence, and avoid premature conclusions.' },
      { id: 'nist-f6', front: 'Post-incident activity means?', back: 'Record lessons learned and improve controls, communication, and training.' },
      { id: 'nist-f7', front: 'First phishing triage evidence?', back: 'Sender, subject, time received, link or attachment indicator, and who else received it.' },
      { id: 'nist-f8', front: 'Privacy-safe incident note?', back: 'Describe impact and evidence without copying credentials, student data, or unnecessary personal details.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'nist-q1',
        prompt: 'What is the first phase of the NIST Incident Response Lifecycle?',
        domain: 'Cybersecurity',
        difficulty: 'foundation',
        explanation: 'Preparation happens before an incident starts.',
        modelAnswer: 'Preparation',
        commonMistakes: ['Detection'],
        dcsContext: 'Preparation includes staff training like this.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-incident-response-nist',
        weakTopic: 'security-risk-judgement',
        options: [
          { id: 'a', label: 'Detection & Analysis' },
          { id: 'b', label: 'Preparation' },
          { id: 'c', label: 'Recovery' },
          { id: 'd', label: 'Containment' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'mcq',
        id: 'nist-q2',
        prompt: 'A staff member reports a suspicious email with a link. What should Josh capture first?',
        domain: 'Cybersecurity',
        difficulty: 'foundation',
        explanation: 'Phishing triage starts with evidence and scope.',
        modelAnswer: 'Capture sender, subject, time received, link/attachment indicator, and whether other users received it.',
        commonMistakes: ['Clicking the link to test it', 'Forwarding the email broadly', 'Deleting evidence immediately'],
        dcsContext: 'Security owners need indicators and scope to block or investigate safely.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-incident-response-nist',
        weakTopic: 'security-risk-judgement',
        options: [
          { id: 'a', label: 'Click the link from a school device to see what happens' },
          { id: 'b', label: 'Capture sender, subject, time, link/attachment indicator, and scope' },
          { id: 'c', label: 'Delete the message and close the ticket' },
          { id: 'd', label: 'Reply to the sender asking if it is real' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'order-steps',
        id: 'nist-q3',
        prompt: 'Order the first response to suspected ransomware on a school PC.',
        domain: 'Cybersecurity',
        difficulty: 'stretch',
        explanation: 'Containment and reporting come before normal troubleshooting.',
        modelAnswer: 'Isolate device, preserve evidence, notify the right owner, capture scope, then follow recovery direction.',
        commonMistakes: ['Running random cleanup tools first', 'Reconnecting to test', 'Letting the user keep working'],
        dcsContext: 'Fast isolation protects shared resources and reduces blast radius.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-incident-response-nist',
        weakTopic: 'security-risk-judgement',
        steps: [
          { id: 'isolate', label: 'Isolate network connection' },
          { id: 'preserve', label: 'Preserve screenshots and visible indicators' },
          { id: 'notify', label: 'Notify security/IT owner immediately' },
          { id: 'scope', label: 'Capture who/where/device/scope' },
          { id: 'recover', label: 'Follow authorised recovery direction' }
        ],
        correctOrder: ['isolate', 'preserve', 'notify', 'scope', 'recover'],
        rubric: ['Containment first', 'Evidence preserved', 'Owner notified']
      },
      {
        type: 'scenario-response',
        id: 'nist-q4',
        prompt: 'Write a privacy-safe incident note for a suspected credential phishing email.',
        domain: 'Cybersecurity',
        difficulty: 'challenge',
        explanation: 'Incident notes need useful indicators without spreading sensitive content.',
        modelAnswer:
          'Include reporter role, time received, sender/domain indicator, subject summary, link/attachment presence, whether credentials were entered if known, scope, and escalation request.',
        commonMistakes: ['Pasting passwords or full sensitive message content', 'No scope', 'No escalation ask'],
        dcsContext: 'Clean notes help security response without increasing exposure.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-incident-response-nist',
        weakTopic: 'security-risk-judgement',
        rubric: ['Indicators included', 'Scope included', 'Privacy-safe wording']
      }
    ],
    scenarioPrompts: [
      {
        id: 'nist-s1',
        title: 'Suspected Ransomware',
        prompt: 'A teacher reports they cannot open any files and sees a strange message on their desktop. Walk through the initial response.'
      }
    ],
    practicalOutputs: [
      {
        id: 'nist-p1',
        title: 'Incident reporting template',
        description: 'Create a clear template for staff to use when reporting a suspected security incident.'
      }
    ]
  },
  {
    id: 'accessibility-inclusive-design',
    title: 'Accessibility and Inclusive Design',
    description: 'Learn to create and support digital content that is accessible to all users, including those with impairments.',
    domain: 'Professional Practice',
    level: 'L1',
    estimatedMinutes: 22,
    tags: ['accessibility', 'WCAG', 'inclusive design', 'alt-text'],
    learningObjectives: [
      'Explain the importance of accessibility in e-learning and school IT.',
      'Apply WCAG 2.1 principles to digital content.',
      'Write effective alt-text for images.',
      'Ensure clear color contrast and keyboard navigability.'
    ],
    dcsRelevance: [
      'Inclusive design ensures all students can access learning materials.',
      'Accessibility is often a legal and ethical requirement.',
      'Good design benefits everyone, not just those with impairments.'
    ],
    sections: [
      {
        id: 'a11y-1',
        title: 'WCAG Principles (POUR)',
        bodyMarkdown: 'Web Content Accessibility Guidelines are built on four principles:\n- **Perceivable**: Information must be presentable to users in ways they can perceive.\n- **Operable**: Interface components and navigation must be operable.\n- **Understandable**: Information and operation must be understandable.\n- **Robust**: Content must be robust enough to be interpreted by various user agents.'
      },
      {
        id: 'a11y-2',
        title: 'Alt-Text and Contrast',
        bodyMarkdown: 'Alt-text provides a text description for images for screen readers. Color contrast ensures that text is readable against its background.'
      },
      {
        id: 'a11y-3',
        title: 'Keyboard and Plain-Language Support',
        bodyMarkdown:
          'Accessible classroom resources should work without a mouse, have visible focus states, use clear headings, and avoid relying on colour alone. First-line support should suggest practical improvements without collecting sensitive student details.'
      }
    ],
    interactiveLabs: [
      {
        id: 'lab-a11y-audit',
        title: 'Classroom Resource Audit',
        scenario: 'A teacher shows you a slide deck they created. It uses light yellow text on a white background and has many images without descriptions.',
        decisionPoints: [
          {
            id: 'd0',
            question: 'What is the FIRST question Josh should ask the teacher?',
            options: [
              { id: 'o1', label: 'Do you have any students with identified vision impairments in this class?', feedback: 'Good. This contextualizes the need for accessibility immediately.', isCorrect: true },
              { id: 'o2', label: 'Which version of PowerPoint did you use?', feedback: 'Not the priority for accessibility triage.', isCorrect: false }
            ]
          },
          {
            id: 'd1',
            question: 'Which WCAG principle is most directly violated by the yellow-on-white text?',
            options: [
              { id: 'o1', label: 'Operable', feedback: 'Incorrect. Operable refers to navigation and interface interaction.', isCorrect: false },
              { id: 'o2', label: 'Perceivable', feedback: 'Correct. Low contrast makes the information difficult or impossible to perceive for many users.', isCorrect: true },
              { id: 'o3', label: 'Understandable', feedback: 'Incorrect. Understandable refers to clear language and predictable behavior.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'Ensuring classroom slides are perceivable helps students with vision impairments participate fully in the lesson.',
        retrievalQuestion: 'What does the acronym POUR stand for?',
        reflectionPrompt: 'How can you suggest these changes to a teacher without sounding like you are critiquing their teaching style?'
      }
    ],
    flashcards: [
      { id: 'a11y-f1', front: 'WCAG?', back: 'Web Content Accessibility Guidelines.' },
      { id: 'a11y-f2', front: 'POUR?', back: 'Perceivable, Operable, Understandable, Robust.' },
      { id: 'a11y-f3', front: 'Alt-Text?', back: 'Text description of an image for accessibility.' },
      { id: 'a11y-f4', front: 'Colour contrast helps who?', back: 'Everyone, especially users with low vision, glare, tiredness, or poor display conditions.' },
      { id: 'a11y-f5', front: 'Keyboard accessibility means?', back: 'A user can reach and operate content without needing a mouse.' },
      { id: 'a11y-f6', front: 'Avoid colour-only meaning because?', back: 'Users may not perceive colour differences or may use assistive technology.' },
      { id: 'a11y-f7', front: 'Privacy-safe accessibility note?', back: 'Describe functional need and impact without unnecessary disability or medical details.' },
      { id: 'a11y-f8', front: 'Accessible headings help?', back: 'They make content easier to scan visually and easier to navigate with screen readers.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'a11y-q1',
        prompt: 'Which WCAG principle ensures users can navigate using only a keyboard?',
        domain: 'Accessibility',
        difficulty: 'foundation',
        explanation: 'Operable covers navigation and interface interaction.',
        modelAnswer: 'Operable',
        commonMistakes: ['Perceivable'],
        dcsContext: 'Keyboard navigation is vital for users with motor impairments.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-inclusive-design',
        weakTopic: 'rbc-professional-practice',
        options: [
          { id: 'a', label: 'Perceivable' },
          { id: 'b', label: 'Operable' },
          { id: 'c', label: 'Understandable' },
          { id: 'd', label: 'Robust' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'mcq',
        id: 'a11y-q2',
        prompt: 'A slide uses red text alone to show urgent steps. What is the accessibility issue?',
        domain: 'Accessibility',
        difficulty: 'foundation',
        explanation: 'Meaning should not rely on colour alone.',
        modelAnswer: 'Add text labels, icons, ordering, or emphasis so the meaning is available without relying only on colour.',
        commonMistakes: ['Only making the red brighter', 'Assuming all users perceive colour the same way'],
        dcsContext: 'Classroom resources need to be readable across students, devices, and room conditions.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-inclusive-design',
        weakTopic: 'rbc-professional-practice',
        options: [
          { id: 'a', label: 'No issue if most users can see red' },
          { id: 'b', label: 'Meaning relies on colour alone' },
          { id: 'c', label: 'It is only a printing issue' },
          { id: 'd', label: 'It only matters for websites, not slides' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'order-steps',
        id: 'a11y-q3',
        prompt: 'Order a quick accessibility check for a classroom document.',
        domain: 'Accessibility',
        difficulty: 'stretch',
        explanation: 'A simple sequence catches the highest-impact issues first.',
        modelAnswer: 'Check headings, reading order, alt text, contrast, and keyboard or screen-reader friendliness.',
        commonMistakes: ['Only checking spelling', 'Asking for personal student details first'],
        dcsContext: 'A repeatable checklist gives teachers practical help without overstepping privacy.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-inclusive-design',
        weakTopic: 'rbc-professional-practice',
        steps: [
          { id: 'headings', label: 'Check headings and structure' },
          { id: 'order', label: 'Check reading order' },
          { id: 'alt', label: 'Check alt text for meaningful images' },
          { id: 'contrast', label: 'Check colour contrast and colour-only meaning' },
          { id: 'operate', label: 'Check keyboard or assistive access path' }
        ],
        correctOrder: ['headings', 'order', 'alt', 'contrast', 'operate'],
        rubric: ['Structure first', 'Images covered', 'Contrast and operation covered']
      },
      {
        type: 'scenario-response',
        id: 'a11y-q4',
        prompt: 'Write a tactful response to a teacher whose resource has low contrast and missing image descriptions.',
        domain: 'Accessibility',
        difficulty: 'challenge',
        explanation: 'Accessibility support works best when it is practical and respectful.',
        modelAnswer:
          'Acknowledge the resource goal, explain the functional impact, suggest higher contrast and short image descriptions, and offer a quick checklist without asking for sensitive student details.',
        commonMistakes: ['Criticising teaching style', 'Mentioning student disability details unnecessarily', 'Giving vague advice only'],
        dcsContext: 'Support should improve inclusion while preserving trust with teaching staff.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-inclusive-design',
        weakTopic: 'rbc-professional-practice',
        rubric: ['Respectful tone', 'Functional impact', 'Practical next steps']
      }
    ],
    scenarioPrompts: [
      {
        id: 'a11y-s1',
        title: 'Accessible slide deck review',
        prompt: 'Review a classroom resource for contrast, alt text, headings, and privacy-safe support wording.'
      }
    ],
    practicalOutputs: [
      {
        id: 'a11y-p1',
        title: 'Accessibility Audit Checklist',
        description: 'Create a simple checklist for teachers to use when creating classroom digital materials.'
      }
    ]
  },
  {
    id: 'itil-foundations-service-management',
    title: 'ITIL Foundations for School IT',
    description: 'An introduction to ITIL service management concepts adapted for school IT support environments.',
    domain: 'Professional Practice',
    level: 'L2',
    estimatedMinutes: 25,
    tags: ['ITIL', 'service management', 'incident', 'change'],
    learningObjectives: [
      'Define the core concepts of ITIL service management.',
      'Differentiate between an Incident and a Service Request.',
      'Explain the importance of Change Management in reducing downtime.',
      'Apply ITIL principles to daily school support tasks.'
    ],
    dcsRelevance: [
      'ITIL provides a standard vocabulary for IT professionals.',
      'Clear incident vs. request handling improves efficiency.',
      'Change management protects teaching time from unexpected outages.'
    ],
    sections: [
      {
        id: 'itil-1',
        title: 'What is ITIL?',
        bodyMarkdown: 'ITIL (Information Technology Infrastructure Library) is a set of best practices for IT service management (ITSM). It focuses on aligning IT services with the needs of the business (or school).'
      },
      {
        id: 'itil-2',
        title: 'Incident vs. Service Request',
        bodyMarkdown: '- **Incident**: An unplanned interruption to a service or reduction in the quality of a service (e.g., "The projector is broken").\n- **Service Request**: A request for something to be provided (e.g., "I need a new laptop").'
      },
      {
        id: 'itil-3',
        title: 'Change Management',
        bodyMarkdown: 'Change management ensures that standardized methods and procedures are used for efficient and prompt handling of all changes to IT infrastructure.'
      }
    ],
    interactiveLabs: [
      {
        id: 'lab-itil-triage',
        title: 'Helpdesk Intake Triage',
        scenario: 'A staff member emails: "I want to install a new specialized music software on my laptop for next term."',
        decisionPoints: [
          {
            id: 'd0',
            question: 'What is the FIRST question Josh should ask the staff member?',
            options: [
              { id: 'o1', label: 'Do you have a license or budget code for this?', feedback: 'Practical. Software requires licensing verification at DCS.', isCorrect: true },
              { id: 'o2', label: 'Is your laptop slow?', feedback: 'Irrelevant to the request.', isCorrect: false }
            ]
          },
          {
            id: 'd1',
            question: 'According to ITIL foundations, what is this request?',
            options: [
              { id: 'o1', label: 'Incident', feedback: 'Incorrect. An incident is an unplanned interruption to service.', isCorrect: false },
              { id: 'o2', label: 'Service Request', feedback: 'Correct. This is a request for a new service or provision of a standard item.', isCorrect: true },
              { id: 'o3', label: 'Problem', feedback: 'Incorrect. A problem is the underlying cause of one or more incidents.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'At DCS, keeping requests separate from incidents helps Paul report on team workload and plan for software licensing.',
        retrievalQuestion: 'What is the primary goal of Change Management?',
        reflectionPrompt: 'Why might a staff member get frustrated if you call their request a "Service Request" instead of just "fixing" it?'
      },
      {
        id: 'lab-papercut-stuck',
        title: 'PaperCut Printer Triage',
        scenario: 'A teacher is at the copier and says "My print job just isn\'t coming out, but I have plenty of credit."',
        decisionPoints: [
          {
            id: 'd0',
            question: 'What is the FIRST question Josh should ask?',
            options: [
              { id: 'o1', label: 'Did you swipe your card and select the job on the screen?', feedback: 'Good. Many "stuck" jobs are just waiting for manual release.', isCorrect: true },
              { id: 'o2', label: 'What are you trying to print?', feedback: 'Less relevant than the release process.', isCorrect: false }
            ]
          },
          {
            id: 'd1',
            question: 'What is a safe first check?',
            options: [
              { id: 'o1', label: 'Check the PaperCut dashboard for the job status.', feedback: 'Correct. This tells you if the server received the job or if it\'s stuck in the queue.', isCorrect: true },
              { id: 'o2', label: 'Reinstall the printer driver on the laptop.', feedback: 'Too early. This is an invasive change.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'What should you NOT change too early?',
            options: [
              { id: 'o1', label: 'The IP address of the printer.', feedback: 'Correct. Changing the IP will break printing for everyone else.', isCorrect: true },
              { id: 'o2', label: 'The PaperCut client on the laptop.', feedback: 'Also too early, but less damaging than the IP.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'Printer issues at DCS often relate to VLAN routing or PaperCut server sync. Check the server first.',
        retrievalQuestion: 'Where do you check for a stuck print job at DCS?',
        reflectionPrompt: 'How do you handle the line of people forming behind the teacher at the copier?'
      },
      {
        id: 'lab-local-vs-microsoft-account',
        title: 'Local vs Microsoft Account Setup',
        scenario: 'A staff member is setting up a new laptop at home and says "It\'s asking me to sign in with a Microsoft account, but I just want a local one like my old PC."',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is the FIRST question Josh should ask?',
            options: [
              { id: 'o1', label: 'Are you using a personal laptop or a school-issued one?', feedback: 'Critical. School laptops MUST use the @dcs.edu.au account for management and security.', isCorrect: true },
              { id: 'o2', label: 'Do you have internet access right now?', feedback: 'Relevant for the setup flow, but account type is the priority.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'The laptop is school-issued. What is the safe first check/action?',
            options: [
              { id: 'o1', label: 'Explain that the @dcs.edu.au account is required for Intune and school apps.', feedback: 'Correct. Aligning with policy ensures the device remains managed.', isCorrect: true },
              { id: 'o2', label: 'Show them how to bypass the Microsoft login using a fake email.', feedback: 'NEVER do this for school devices. It breaks management.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'At DCS, we use Microsoft accounts to enable "zero-touch" provisioning via Autopilot.',
        retrievalQuestion: 'Why do we prefer Microsoft accounts over local ones for school laptops?',
        reflectionPrompt: 'How do you explain the benefits of a "managed" account (like self-service resets) to a reluctant user?'
      },
      {
        id: 'lab-usb-formatting',
        title: 'USB Formatting / Disk Management',
        scenario: 'A teacher has a USB drive with "important files" that won\'t open on their school laptop. It says "You need to format the disk before you can use it."',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is the FIRST question Josh should ask?',
            options: [
              { id: 'o1', label: 'Do you have a backup of these files anywhere else?', feedback: 'Critical. Formatting WILL erase everything on the drive.', isCorrect: true },
              { id: 'o2', label: 'What size is the USB drive?', feedback: 'Less relevant than data safety.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'What should you NOT change too early?',
            options: [
              { id: 'o1', label: 'Clicking "Format" in the Windows prompt.', feedback: 'Correct. This is destructive. We should try to recover or check on another machine first.', isCorrect: true },
              { id: 'o2', label: 'Plugging it into a different USB port.', feedback: 'Safe and recommended.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'DCS encourages using OneDrive for "important files" to avoid USB failure risks.',
        retrievalQuestion: 'What does "formatting" a disk actually do?',
        reflectionPrompt: 'How do you gently transition a teacher from "USB-first" to "Cloud-first" for their teaching resources?'
      },
      {
        id: 'lab-windows-update-driver',
        title: 'Windows Update / Driver Triage',
        scenario: 'A laptop is behaving strangely—the Wi-Fi keeps cutting out and the trackpad is "jumpy" after a recent update.',
        decisionPoints: [
          {
            id: 'd1',
            question: 'What is a safe first check?',
            options: [
              { id: 'o1', label: 'Check "Update History" in Windows Settings.', feedback: 'Correct. Identify if a specific driver or quality update was recently installed.', isCorrect: true },
              { id: 'o2', label: 'Reset Windows to factory settings.', feedback: 'Extremely invasive. Do not do this yet.', isCorrect: false }
            ]
          },
          {
            id: 'd2',
            question: 'If a specific driver update caused the issue, what is the next safe step?',
            options: [
              { id: 'o1', label: 'Use "Roll Back Driver" in Device Manager.', feedback: 'Correct. This reverts to the previous known-good driver.', isCorrect: true },
              { id: 'o2', label: 'Disable the device in Device Manager.', feedback: 'Unhelpful—it just stops the feature from working entirely.', isCorrect: false }
            ]
          }
        ],
        dcsApplication: 'At DCS, we use Intune to manage update rings. Report any "bad" updates to Paul so they can be paused for others.',
        retrievalQuestion: 'Where do you go to roll back a specific hardware driver?',
        reflectionPrompt: 'How do you explain to a teacher that "updates" are for security even when they cause temporary bugs?'
      }
    ],
    flashcards: [
      { id: 'itil-f1', front: 'ITIL?', back: 'Information Technology Infrastructure Library.' },
      { id: 'itil-f2', front: 'Incident?', back: 'Unplanned interruption to an IT service.' },
      { id: 'itil-f3', front: 'Service Request?', back: 'Formal request for something new or changed.' },
      { id: 'itil-f4', front: 'Problem in ITIL?', back: 'The underlying cause of one or more incidents.' },
      { id: 'itil-f5', front: 'Change management protects?', back: 'Service stability, teaching time, and predictable communication.' },
      { id: 'itil-f6', front: 'Why classify request type?', back: 'It routes work to the right workflow, owner, expectation, and priority.' },
      { id: 'itil-f7', front: 'Emergency change means?', back: 'A high-risk urgent change handled through an approved emergency path, not improvisation.' },
      { id: 'itil-f8', front: 'Good service request note includes?', back: 'Requested item, business reason, approval/licensing status, timeframe, and owner.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'itil-q1',
        prompt: 'A teacher asks for a software update to be installed on their laptop. This is an example of:',
        domain: 'ITIL concepts',
        difficulty: 'foundation',
        explanation: 'It is a formal request for a change/provision, not a failure.',
        modelAnswer: 'Service Request',
        commonMistakes: ['Incident'],
        dcsContext: 'Requests should follow the formal intake path.',
        reviewSchedule,
        recommendedModuleId: 'itil-foundations-service-management',
        weakTopic: 'rbc-professional-practice',
        options: [
          { id: 'a', label: 'Incident' },
          { id: 'b', label: 'Service Request' },
          { id: 'c', label: 'Problem' },
          { id: 'd', label: 'Emergency Change' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'mcq',
        id: 'itil-q2',
        prompt: 'A projector fails during class and teaching is blocked. What ITIL category best fits the initial ticket?',
        domain: 'ITIL concepts',
        difficulty: 'foundation',
        explanation: 'An unplanned service interruption is an incident.',
        modelAnswer: 'Incident',
        commonMistakes: ['Treating it as a service request', 'Ignoring impact on teaching'],
        dcsContext: 'Incident classification helps urgent classroom faults get the right priority.',
        reviewSchedule,
        recommendedModuleId: 'itil-foundations-service-management',
        weakTopic: 'rbc-professional-practice',
        options: [
          { id: 'a', label: 'Incident' },
          { id: 'b', label: 'Service Request' },
          { id: 'c', label: 'Standard change' },
          { id: 'd', label: 'Knowledge article' }
        ],
        correctOptionId: 'a'
      },
      {
        type: 'order-steps',
        id: 'itil-q3',
        prompt: 'Order a safe service request intake for new classroom software.',
        domain: 'ITIL concepts',
        difficulty: 'stretch',
        explanation: 'Service requests need approval and licensing clarity before installation.',
        modelAnswer: 'Capture need, confirm licence/approval, check device/platform fit, identify owner, then schedule or escalate.',
        commonMistakes: ['Installing before licence approval', 'Skipping owner and timing'],
        dcsContext: 'Software requests can affect compliance, support load, and classroom readiness.',
        reviewSchedule,
        recommendedModuleId: 'itil-foundations-service-management',
        weakTopic: 'rbc-professional-practice',
        steps: [
          { id: 'need', label: 'Capture teaching need and timeframe' },
          { id: 'licence', label: 'Confirm licence or budget approval' },
          { id: 'fit', label: 'Check platform/device requirements' },
          { id: 'owner', label: 'Identify approval or system owner' },
          { id: 'schedule', label: 'Schedule work or escalate' }
        ],
        correctOrder: ['need', 'licence', 'fit', 'owner', 'schedule'],
        rubric: ['Need first', 'Approval/licence included', 'Owner-aware handoff']
      },
      {
        type: 'scenario-response',
        id: 'itil-q4',
        prompt: 'Write a concise note that separates an incident from a related problem trend.',
        domain: 'ITIL concepts',
        difficulty: 'challenge',
        explanation: 'Incident handling restores service; problem thinking identifies repeated root cause patterns.',
        modelAnswer:
          'State the immediate incident, impact and restoration action, then note repeated pattern, examples, scope, and request review for underlying cause.',
        commonMistakes: ['Calling every repeated issue a problem without evidence', 'Skipping immediate service impact'],
        dcsContext: 'Clear wording helps support restore class service while still spotting repeated faults.',
        reviewSchedule,
        recommendedModuleId: 'itil-foundations-service-management',
        weakTopic: 'rbc-professional-practice',
        rubric: ['Incident impact', 'Pattern evidence', 'Review request']
      }
    ],
    scenarioPrompts: [
      {
        id: 'itil-s1',
        title: 'Incident or request classification',
        prompt: 'Classify a mixed inbox of classroom faults and software requests, then write the next action for each.'
      }
    ],
    practicalOutputs: [
      {
        id: 'itil-p1',
        title: 'Ticket classification cheat sheet',
        description: 'Create a one-page guide for incident, service request, problem trend, and change language in school IT.'
      }
    ]
  }
];
