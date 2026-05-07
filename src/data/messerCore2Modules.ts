import type { AssessmentQuestion, WeakTopicKey } from '../types/assessment';
import type { TrainingModule } from '../types/training';

const reviewSchedule = 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.';
const courseUrl =
  'https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/';
const objectivesUrl =
  'https://partners.comptia.org/docs/default-source/resources/comptia-a-220-1202-exam-objectives-%282-0%29.pdf';

function mcq(question: Omit<Extract<AssessmentQuestion, { type: 'mcq' }>, 'type'>): AssessmentQuestion {
  return { type: 'mcq', ...question };
}

function shortAnswer(
  question: Omit<Extract<AssessmentQuestion, { type: 'short-answer' }>, 'type'>
): AssessmentQuestion {
  return { type: 'short-answer', ...question };
}

function orderSteps(
  question: Omit<Extract<AssessmentQuestion, { type: 'order-steps' }>, 'type'>
): AssessmentQuestion {
  return { type: 'order-steps', ...question };
}

function scenarioResponse(
  question: Omit<Extract<AssessmentQuestion, { type: 'scenario-response' }>, 'type'>
): AssessmentQuestion {
  return { type: 'scenario-response', ...question };
}

function explainItSimply(
  question: Omit<Extract<AssessmentQuestion, { type: 'explain-it-simply' }>, 'type'>
): AssessmentQuestion {
  return { type: 'explain-it-simply', ...question };
}

function topicSlug(topic: string) {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function core2TopicChecks({
  topics,
  moduleId,
  idPrefix,
  domain,
  weakTopic
}: {
  topics: string[];
  moduleId: string;
  idPrefix: string;
  domain: string;
  weakTopic: WeakTopicKey;
}): AssessmentQuestion[] {
  return topics.map((topic) =>
    mcq({
      id: `${idPrefix}-${topicSlug(topic)}`,
      prompt: `Core 2 topic check: after reading or watching "${topic}", what is the best DCSPrep learning outcome?`,
      domain,
      difficulty: 'foundation',
      explanation: 'Each Professor Messer topic should become practical, safe first-line support judgement.',
      modelAnswer:
        'Use the topic to recognise the symptom area, capture safer evidence, explain the likely support boundary, and escalate through the approved owner when required.',
      commonMistakes: [
        'Treating the topic as trivia only',
        'Using awareness content as permission to make production changes',
        'Skipping evidence capture because the video title sounds familiar'
      ],
      dcsContext:
        'DCSPrep turns the external Core 2 topic list into readable material, retrieval practice, and school-safe judgement.',
      reviewSchedule,
      recommendedModuleId: moduleId,
      weakTopic,
      options: [
        { id: 'a', label: 'Memorise the title only and move on' },
        { id: 'b', label: 'Connect the topic to safe evidence capture, boundaries, and escalation judgement' },
        { id: 'c', label: 'Use the topic as approval to change production settings immediately' },
        { id: 'd', label: 'Skip the topic because it is external to DCS' }
      ],
      correctOptionId: 'b'
    })
  );
}

const core2OperatingSystemTopics = [
  'Operating Systems Overview',
  'File Systems',
  'Installing Operating Systems',
  'Upgrading Windows',
  'An Overview of Windows',
  'Windows Features',
  'Task Manager',
  'The Microsoft Management Console',
  'Additional Windows Tools',
  'Windows Command Line Tools',
  'The Windows Network Command Line',
  'The Windows Control Panel',
  'Windows Settings',
  'Windows Network Technologies',
  'Configuring Windows Firewall',
  'Windows IP Address Configuration',
  'Windows Network Connections',
  'macOS Overview',
  'macOS System Preferences',
  'macOS Features',
  'Linux',
  'Linux Commands Part 1',
  'Linux Commands Part 2',
  'Installing Applications',
  'Cloud Productivity Tools'
];

const core2SecurityTopics = [
  'Physical Security',
  'Physical Access Security',
  'Logical Security',
  'Authentication and Access',
  'Defender Antivirus',
  'Windows Firewall',
  'Windows Security Settings',
  'Active Directory',
  'Wireless Encryption',
  'Authentication Methods',
  'Malware',
  'Anti-malware Tools',
  'Social Engineering',
  'Denial of Service',
  'On-Path Attacks',
  'Zero-Day Attacks',
  'Password Attacks',
  'Insider Threats',
  'SQL Injection Attacks',
  'Cross-site Scripting',
  'Business Email Compromise',
  'Supply Chain Attacks',
  'Security Vulnerabilities',
  'Removing Malware',
  'Security Best Practices',
  'Mobile Device Security',
  'Data Destruction',
  'Securing a SOHO Network',
  'Browser Security'
];

const core2TroubleshootingTopics = [
  'Troubleshooting Windows',
  'Troubleshooting Mobile Devices',
  'Troubleshooting Mobile Device Security',
  'Troubleshooting Security Issues'
];

const core2OperationalTopics = [
  'Ticketing Systems',
  'Asset Management',
  'Document Types',
  'Change Management',
  'Managing Backups',
  'Managing Electrostatic Discharge',
  'Safety Procedures',
  'Environmental Impacts',
  'Incident Response',
  'Privacy, Licensing, and Policies',
  'Professionalism',
  'Communication',
  'Scripting Languages',
  'Scripting Use Cases',
  'Remote Access',
  'Managing AI'
];

type Core2TopicGroup = {
  topics: string[];
  sectionLabel: string;
  domain: TrainingModule['domain'];
  weakTopic: WeakTopicKey;
  tag: string;
};

const topicSpecificNotes: Record<string, string> = {
  'File Systems':
    'Focus on what each file system implies in support: NTFS and ReFS for Windows-aware permissions and resilience, FAT32 and exFAT for removable-media compatibility, ext4 and XFS for Linux systems, and APFS for modern macOS storage.',
  'Scripting Use Cases':
    'Focus on when scripting is appropriate: automating repeated checks, restarting services or systems through approved tools, reimaging workflows, backup tasks, software deployment, and report generation. The boundary is just as important as the use case: never run an operational script against school systems without approval, testing, and rollback awareness.',
  'Scripting Languages':
    'Focus on recognising batch files, PowerShell, shell scripts, JavaScript, and Python. At Level 1, the goal is to read intent, spot risk, and ask better questions before anyone runs code.',
  'Managing AI':
    'Focus on appropriate and inappropriate AI use, bias, hallucinations, verification, and the difference between public and private AI environments. Do not paste live school data into public AI tools.',
  'Ticketing Systems':
    'Focus on ticket quality: exact symptom, scope, impact, timing, evidence, safe checks tried, owner, and next action. A useful ticket reduces back-and-forth during live school support.',
  'Remote Access':
    'Focus on authorisation, consent where required, correct tooling, privacy, and clear purpose before viewing or controlling another device.',
  'Active Directory':
    'Focus on identity boundaries: domains, users, groups, policies, folder redirection, and device join state. Level 1 should capture symptoms and route changes through authorised owners.',
  'Windows Firewall':
    'Focus on recognising firewall symptoms and policy boundaries. Level 1 can gather evidence and explain likely blocking, but should not improvise production firewall rules.',
  'Configuring Windows Firewall':
    'Focus on profile, rule, and application-blocking awareness. The safe DCSPrep outcome is evidence-rich escalation, not unauthorised firewall editing.'
};

function topicReadingNote(topic: string) {
  return (
    topicSpecificNotes[topic] ??
    `Focus on the practical meaning of "${topic}": what symptoms it helps explain, what evidence Josh should capture, what first-line checks are safe, and where the escalation boundary sits.`
  );
}

function topicModuleDescription(topic: string, sectionLabel: string) {
  return `Individual Professor Messer A+ 220-1202 Core 2 topic module for ${topic}, from ${sectionLabel}, with readable notes, source links, flashcards, and assessment.`;
}

function createCore2TopicModule(topic: string, group: Core2TopicGroup): TrainingModule {
  const slug = topicSlug(topic);
  const moduleId = `messer-core2-topic-${slug}`;
  const topicNote = topicReadingNote(topic);

  return {
    id: moduleId,
    title: `A+ Core 2: ${topic}`,
    description: topicModuleDescription(topic, group.sectionLabel),
    domain: group.domain,
    level: 'A+',
    estimatedMinutes: 10,
    tags: ['Professor Messer', 'CompTIA A+ 220-1202', group.tag, topic],
    learningObjectives: [
      `Read or watch the Professor Messer Core 2 topic "${topic}".`,
      `Explain how "${topic}" appears in first-line school IT support.`,
      `Answer assessed prompts that connect "${topic}" to safe evidence capture and escalation.`
    ],
    dcsRelevance: [
      `Turns the Core 2 topic "${topic}" into a DCSPrep learning item instead of a passive video title.`,
      'Keeps certification study tied to privacy-safe, Level 1 support judgement.',
      'Gives search, review, flashcards, and assessment a dedicated module target.'
    ],
    sections: [
      {
        id: `${slug}-read-watch`,
        title: 'Read and Watch',
        bodyMarkdown: `Primary resource: [Professor Messer A+ 220-1202 Core 2 training course](${courseUrl}).\n\nExam reference: [CompTIA A+ 220-1202 exam objectives](${objectivesUrl}).\n\nFind the video topic "${topic}" under ${group.sectionLabel}. Watch or read that topic first, then use this DCSPrep module for active recall and assessment.`
      },
      {
        id: `${slug}-topic-notes`,
        title: `${topic} Notes`,
        bodyMarkdown: `${topicNote}\n\nThe support-safe pattern is: identify the affected system, capture exact symptoms, compare with a known-good baseline when possible, avoid risky production changes, and escalate with a concise evidence-rich note when the issue crosses Josh's authority or confidence boundary.`
      },
      {
        id: `${slug}-dcs-application`,
        title: 'DCS Support Application',
        bodyMarkdown: `In DCSPrep, "${topic}" should be learned as applied judgement. Ask: who is affected, where is it happening, what changed, what can be checked safely, what should not be touched, and who owns the next action.\n\nDo not copy real student, staff, credential, incident, or network details into this module. Keep examples generic and privacy-safe.`
      }
    ],
    flashcards: [
      { id: `${slug}-f1`, front: `What source should you use for "${topic}"?`, back: 'The Professor Messer A+ 220-1202 Core 2 course and the official CompTIA objectives.' },
      { id: `${slug}-f2`, front: `What is the DCSPrep goal for "${topic}"?`, back: 'Turn the topic into safe first-line recognition, evidence capture, and escalation judgement.' },
      { id: `${slug}-f3`, front: `What should you capture for a "${topic}" support symptom?`, back: 'User, device, location, exact symptom, time, scope, recent change, and safe checks tried.' },
      { id: `${slug}-f4`, front: `What should you avoid when studying "${topic}"?`, back: 'Treating topic awareness as permission to change production systems.' },
      { id: `${slug}-f5`, front: `How should sensitive DCS examples be handled?`, back: 'Use generic examples; keep live details in authorised work systems only.' },
      { id: `${slug}-f6`, front: `When should "${topic}" be escalated?`, back: 'When it crosses authority, policy, security, privacy, or safe-confidence boundaries.' },
      { id: `${slug}-f7`, front: 'Why use a known-good comparison?', back: 'It narrows whether the issue is local, account-based, service-wide, network-related, or policy-related.' },
      { id: `${slug}-f8`, front: 'What makes the assessment useful?', back: 'It checks judgement, not just whether the video title was recognised.' }
    ],
    quiz: [
      mcq({
        id: `${slug}-q1`,
        prompt: `After studying "${topic}", what is the best DCSPrep outcome?`,
        domain: group.sectionLabel,
        difficulty: 'foundation',
        explanation: 'The topic should become practical support judgement, not just recognition.',
        modelAnswer:
          'Connect the topic to safe first-line evidence capture, likely symptom buckets, boundaries, and escalation language.',
        commonMistakes: ['Memorising only the title', 'Changing production settings without approval'],
        dcsContext: 'Certification study is useful at DCS when it improves safe support decisions.',
        reviewSchedule,
        recommendedModuleId: moduleId,
        weakTopic: group.weakTopic,
        options: [
          { id: 'a', label: 'Recognise the title only' },
          { id: 'b', label: 'Connect it to symptoms, evidence, safe boundaries, and escalation' },
          { id: 'c', label: 'Use it to bypass normal DCS procedures' },
          { id: 'd', label: 'Skip it because it is not DCS-specific' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: `${slug}-q2`,
        prompt: `List four details Josh should capture if a support issue appears related to "${topic}".`,
        domain: group.sectionLabel,
        difficulty: 'foundation',
        explanation: 'Good first-line notes make the topic operationally useful.',
        modelAnswer:
          'Capture user or role, device or service, location, exact symptom, time started, scope, recent changes, safe checks tried, and current impact.',
        commonMistakes: ['Writing only a vague label', 'Leaving out scope or impact'],
        dcsContext: 'DCS support needs enough context for the next owner to act safely.',
        reviewSchedule,
        recommendedModuleId: moduleId,
        weakTopic: group.weakTopic,
        rubric: ['Names symptom', 'Captures scope', 'Captures time or change', 'Captures safe checks or impact'],
        keywordHints: ['symptom', 'scope', 'time', 'impact']
      }),
      orderSteps({
        id: `${slug}-q3`,
        prompt: `Order the safe DCSPrep response flow for a "${topic}"-related support symptom.`,
        domain: group.sectionLabel,
        difficulty: 'stretch',
        explanation: 'Sequence protects users and systems.',
        modelAnswer:
          'Clarify symptom and scope, check safe basics, compare with known-good evidence, then escalate with boundaries and notes.',
        commonMistakes: ['Escalating with no evidence', 'Making risky changes before clarifying scope'],
        dcsContext: 'A consistent sequence keeps Level 1 support calm and useful.',
        reviewSchedule,
        recommendedModuleId: moduleId,
        weakTopic: group.weakTopic,
        steps: [
          { id: 'clarify', label: 'Clarify symptom and scope' },
          { id: 'safe-check', label: 'Perform safe first-line checks only' },
          { id: 'compare', label: 'Compare with known-good evidence where possible' },
          { id: 'escalate', label: 'Escalate with concise notes and boundaries' }
        ],
        correctOrder: ['clarify', 'safe-check', 'compare', 'escalate'],
        rubric: ['Scope first', 'Safe checks only', 'Escalates clearly']
      }),
      scenarioResponse({
        id: `${slug}-q4`,
        prompt: `Write a short escalation note for a classroom issue that may involve "${topic}". Keep it privacy-safe.`,
        domain: group.sectionLabel,
        difficulty: 'challenge',
        explanation: 'Scenario assessment checks communication quality.',
        modelAnswer:
          'State the generic role/location, exact symptom, impact on learning, time observed, safe checks tried, known-good comparison if available, and the specific owner/action requested without including sensitive details.',
        commonMistakes: ['Including real names or confidential data', 'Writing a vague escalation with no symptom detail'],
        dcsContext: 'Escalations should help without becoming a second privacy problem.',
        reviewSchedule,
        recommendedModuleId: moduleId,
        weakTopic: group.weakTopic,
        rubric: ['Privacy-safe', 'Exact symptom', 'Impact and checks', 'Clear escalation request']
      })
    ],
    scenarioPrompts: [
      {
        id: `${slug}-s1`,
        title: `${topic} support scenario`,
        prompt: `Apply "${topic}" to a realistic but privacy-safe DCS support symptom and decide what to check, avoid, and escalate.`
      }
    ],
    practicalOutputs: [
      {
        id: `${slug}-p1`,
        title: `${topic} one-page study card`,
        description: `Create a privacy-safe one-page card for "${topic}" with key terms, safe first checks, do-not-touch boundaries, and an escalation sentence.`
      }
    ]
  };
}

const core2TopicGroups: Core2TopicGroup[] = [
  {
    topics: core2OperatingSystemTopics,
    sectionLabel: 'Core 2 Section 1 Operating Systems',
    domain: 'Endpoint Support',
    weakTopic: 'a-plus-troubleshooting',
    tag: 'operating systems'
  },
  {
    topics: core2SecurityTopics,
    sectionLabel: 'Core 2 Section 2 Security',
    domain: 'Cybersecurity',
    weakTopic: 'security-risk-judgement',
    tag: 'security'
  },
  {
    topics: core2TroubleshootingTopics,
    sectionLabel: 'Core 2 Section 3 Software Troubleshooting',
    domain: 'Endpoint Support',
    weakTopic: 'a-plus-troubleshooting',
    tag: 'software troubleshooting'
  },
  {
    topics: core2OperationalTopics,
    sectionLabel: 'Core 2 Section 4 Operational Procedures',
    domain: 'Professional Practice',
    weakTopic: 'professional-practice',
    tag: 'operational procedures'
  }
];

const messerCore2TopicModules = core2TopicGroups.flatMap((group) =>
  group.topics.map((topic) => createCore2TopicModule(topic, group))
);

export const messerCore2Modules: TrainingModule[] = [
  {
    id: 'messer-core2-operating-systems-awareness',
    title: 'A+ Core 2 Operating Systems Awareness',
    description:
      'Readable CompTIA A+ 220-1202 Core 2 operating-system awareness based on Professor Messer Section 1, adapted for DCS first-line support judgement.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 35,
    tags: ['Professor Messer', 'CompTIA A+ 220-1202', 'operating systems', 'Windows', 'macOS', 'Linux'],
    learningObjectives: [
      'Recognise where Windows, macOS, Linux, Chrome OS, iOS, and Android fit in support triage.',
      'Explain file systems, installation choices, Windows tools, command-line utilities, and network settings at a first-line level.',
      'Use operating-system knowledge to capture better evidence before escalation.'
    ],
    dcsRelevance: [
      'DCS support work touches managed Windows devices, mobile devices, classroom peripherals, and cloud productivity tools.',
      'OS awareness helps Josh separate user, app, device, network, and policy symptoms.',
      'Command-line and system-tool literacy improves escalation notes without overstepping admin boundaries.'
    ],
    sections: [
      {
        id: 'messer-os-1',
        title: 'Read and Watch',
        bodyMarkdown: `Primary resource: [Professor Messer A+ 220-1202 Core 2 training course](${courseUrl}).\n\nExam reference: [CompTIA A+ 220-1202 exam objectives](${objectivesUrl}).\n\nUse the videos as the deeper reading path and this DCSPrep module as the retrieval and assessment layer. For Section 1, read/watch the topics on operating systems, file systems, installing and upgrading operating systems, Windows editions and features, Windows tools, command-line utilities, Windows settings, Windows networking, macOS, Linux, application installs, and cloud productivity.`
      },
      {
        id: 'messer-os-topic-index',
        title: 'Core 2 Section 1 Topic Index',
        bodyMarkdown: `Use this as the exact Section 1 reading checklist from the Professor Messer Core 2 course.\n\n1.1 Operating Systems: Operating Systems Overview; File Systems.\n\n1.2 Installing Operating Systems: Installing Operating Systems; Upgrading Windows.\n\n1.3 Microsoft Windows: An Overview of Windows; Windows Features.\n\n1.4 The Windows OS: Task Manager; The Microsoft Management Console; Additional Windows Tools.\n\n1.5 The Windows Command Line: Windows Command Line Tools; The Windows Network Command Line.\n\n1.6 Windows Settings: The Windows Control Panel; Windows Settings.\n\n1.7 Windows Networking: Windows Network Technologies; Configuring Windows Firewall; Windows IP Address Configuration; Windows Network Connections.\n\n1.8 macOS: macOS Overview; macOS System Preferences; macOS Features.\n\n1.9 Linux: Linux; Linux Commands Part 1; Linux Commands Part 2.\n\n1.10 Installing Applications: Installing Applications.\n\n1.11 Cloud Productivity: Cloud Productivity Tools.\n\nSearch terms covered here include NTFS, ReFS, FAT, FAT32, exFAT, ext4, XFS, APFS, Task Manager, MMC, Event Viewer, Disk Management, Device Manager, ipconfig, ping, nslookup, tracert, pathping, DHCP, APIPA, VPN, proxy, mapped drives, Keychain, Spotlight, Finder, systemd, chmod, grep, curl, dig, and cloud-based mail.`
      },
      {
        id: 'messer-os-2',
        title: 'Operating System and File System Basics',
        bodyMarkdown: `An operating system provides the user interface, hardware abstraction, process management, file access, security boundary, and application platform. A first-line technician does not need to be a specialist in every OS, but should know which platform they are looking at and what tools are safe to use.\n\nFile systems shape how storage is formatted, secured, and shared. NTFS and ReFS are common Windows-aware file systems; FAT32 and exFAT are useful for removable media compatibility; ext4 and XFS are common Linux choices; APFS is modern macOS storage. In support notes, name the file system only when it explains the symptom, such as permission behaviour, removable drive compatibility, or format choice.`
      },
      {
        id: 'messer-os-3',
        title: 'Installing, Upgrading, and Managing Windows',
        bodyMarkdown: `Installation choices include boot method, clean install versus upgrade, partition style, formatting, and deployment approach. Zero-touch deployment is an enterprise pattern where devices receive standard builds with limited manual setup.\n\nWindows support awareness includes editions, domain join capability, RDP availability, encryption, RAM support, and enterprise management features. Useful tools include Task Manager, Event Viewer, Disk Management, Task Scheduler, Device Manager, Performance Monitor, System Information, Resource Monitor, System Configuration, Disk Cleanup, defrag tools, and Registry Editor. Treat deeper changes as escalation territory unless they are approved.`
      },
      {
        id: 'messer-os-4',
        title: 'Command Line and Network Settings',
        bodyMarkdown: `Command-line literacy lets Josh gather evidence cleanly. Useful Windows commands include directory navigation, file copy commands, version and host information, Group Policy refresh checks, and security/status commands. Network triage commonly uses ipconfig, ping, netstat, nslookup, net view, net use, net user, tracert, and pathping.\n\nFor Windows networking, recognise shared resources, workgroups, domains, printer sharing, Windows Defender Firewall, DHCP, APIPA, static TCP/IP settings, alternate configurations, VPN, wireless, wired, WWAN, proxy, network locations, mapped drives, and metered connections. The first-line goal is to describe what is failing and where the path breaks, not to improvise firewall or policy changes.`
      },
      {
        id: 'messer-os-5',
        title: 'macOS, Linux, Apps, and Cloud Productivity',
        bodyMarkdown: `macOS awareness includes system folders, file types, the App Store, Time Machine-style backup thinking, System Preferences or System Settings, displays, network adapters, printers, accessibility, Mission Control, Spaces, Keychain, Spotlight, Finder, and Continuity.\n\nLinux awareness includes the bootloader, kernel, systemd, configuration files, and commands such as ls, pwd, mv, cp, rm, chmod, grep, ping, curl, dig, traceroute, cat, and top. Application installation requires checking CPU architecture, memory, OS requirements, distribution method, and ISO or installer source. Cloud productivity adds mail, collaboration, identity sync, browser state, and service-health dependencies to the support picture.`
      }
    ],
    flashcards: [
      { id: 'messer-os-f1', front: 'What does an operating system provide?', back: 'A user interface, hardware abstraction, process management, file access, security boundary, and application platform.' },
      { id: 'messer-os-f2', front: 'Why does file-system type matter?', back: 'It can affect permissions, compatibility, formatting, and removable media behaviour.' },
      { id: 'messer-os-f3', front: 'What is zero-touch deployment?', back: 'An enterprise deployment pattern where standard builds are applied with little manual setup.' },
      { id: 'messer-os-f4', front: 'What Windows tool is best for real-time process and performance checks?', back: 'Task Manager.' },
      { id: 'messer-os-f5', front: 'What does Event Viewer help investigate?', back: 'Logged application, system, security, and service events.' },
      { id: 'messer-os-f6', front: 'What does APIPA suggest on Windows?', back: 'The device could not obtain a normal DHCP lease and self-assigned an address.' },
      { id: 'messer-os-f7', front: 'Name two Windows network command-line tools.', back: 'Examples include ipconfig, ping, nslookup, netstat, tracert, and pathping.' },
      { id: 'messer-os-f8', front: 'What is the first-line value of Linux command literacy?', back: 'It helps gather evidence and understand basic file, process, and network state.' },
      { id: 'messer-os-f9', front: 'What should Josh avoid with Windows Firewall?', back: 'Unapproved production firewall rule changes.' },
      { id: 'messer-os-f10', front: 'What extra dependency do cloud productivity tools add?', back: 'Identity, browser, sync, and service-health dependencies.' }
    ],
    quiz: [
      mcq({
        id: 'messer-os-q1',
        prompt: 'A Windows laptop has a 169.254.x.x address. What is the best first-line interpretation?',
        domain: 'A+ Core 2 operating systems',
        difficulty: 'foundation',
        explanation: 'A 169.254.x.x address commonly points to APIPA after DHCP failure.',
        modelAnswer:
          'Treat it as evidence that the device did not receive a normal DHCP lease, then compare network context and escalate with scope if the issue repeats.',
        commonMistakes: ['Calling it proof of total internet outage', 'Changing firewall settings first'],
        dcsContext: 'This can explain a single classroom device with no network access.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-operating-systems-awareness',
        weakTopic: 'a-plus-troubleshooting',
        options: [
          { id: 'a', label: 'The device has probably self-assigned an APIPA address' },
          { id: 'b', label: 'The device is definitely infected with malware' },
          { id: 'c', label: 'The file system is corrupt' },
          { id: 'd', label: 'RDP has been disabled' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'messer-os-q2',
        prompt: 'List four Windows tools that can support first-line investigation before escalation.',
        domain: 'A+ Core 2 operating systems',
        difficulty: 'foundation',
        explanation: 'Tool recognition supports better evidence collection.',
        modelAnswer:
          'Examples include Task Manager, Event Viewer, Device Manager, Disk Management, Resource Monitor, System Information, Task Scheduler, Performance Monitor, and System Configuration.',
        commonMistakes: ['Listing only web browsers', 'Listing tools but not using them to gather evidence'],
        dcsContext: 'Clean tool output can save Paul or Level 2 time.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-operating-systems-awareness',
        weakTopic: 'a-plus-troubleshooting',
        rubric: ['Names real Windows tools', 'Includes at least four', 'Keeps to first-line investigation'],
        keywordHints: ['Task Manager', 'Event Viewer', 'Device Manager', 'Resource Monitor']
      }),
      orderSteps({
        id: 'messer-os-q3',
        prompt: 'Order a safe OS/network triage sequence for a staff laptop that cannot reach a web app.',
        domain: 'A+ Core 2 operating systems',
        difficulty: 'stretch',
        explanation: 'Scope and evidence should come before risky changes.',
        modelAnswer:
          'Confirm symptom and scope, check IP/DNS basics, compare with known-good network or device, then escalate with exact evidence if unresolved.',
        commonMistakes: ['Editing firewall rules first', 'Skipping scope checks'],
        dcsContext: 'A classroom web-app issue may be device, DNS, proxy, identity, or service related.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-operating-systems-awareness',
        weakTopic: 'a-plus-troubleshooting',
        steps: [
          { id: 'scope', label: 'Confirm user, device, location, and symptom scope' },
          { id: 'network', label: 'Check IP, DNS, gateway, and browser basics' },
          { id: 'compare', label: 'Compare with a known-good device or network' },
          { id: 'escalate', label: 'Escalate with evidence if still unresolved' }
        ],
        correctOrder: ['scope', 'network', 'compare', 'escalate'],
        rubric: ['Starts with scope', 'Checks network basics', 'Escalates with evidence']
      }),
      scenarioResponse({
        id: 'messer-os-q4',
        prompt: 'A teacher says the school portal works on another laptop but not theirs. Write the support judgement Josh should use.',
        domain: 'A+ Core 2 operating systems',
        difficulty: 'challenge',
        explanation: 'A known-good comparison narrows the likely fault area.',
        modelAnswer:
          'Treat it as likely local device, browser, profile, DNS, proxy, or identity state until proven otherwise. Capture the working comparison, check safe local basics, and avoid broad service-outage claims.',
        commonMistakes: ['Declaring the portal down', 'Skipping the known-good comparison'],
        dcsContext: 'School portals are often time-sensitive during class administration.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-operating-systems-awareness',
        weakTopic: 'a-plus-troubleshooting',
        rubric: ['Uses known-good comparison', 'Names plausible local causes', 'Avoids overclaiming']
      }),
      explainItSimply({
        id: 'messer-os-q5',
        prompt: 'Explain why command-line tools are useful even when Josh is not allowed to make admin changes.',
        domain: 'A+ Core 2 operating systems',
        difficulty: 'foundation',
        explanation: 'Evidence gathering is different from unauthorised change.',
        modelAnswer:
          'Command-line tools can show IP settings, name resolution, reachability, routes, and logged state. That helps Josh describe the fault clearly without changing production settings.',
        commonMistakes: ['Equating command-line use with risky admin action'],
        dcsContext: 'Evidence-rich escalation is a core Level 1 skill.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-operating-systems-awareness',
        weakTopic: 'a-plus-troubleshooting',
        rubric: ['Mentions evidence gathering', 'Mentions no unauthorised change', 'Uses plain language'],
        keywordHints: ['evidence', 'ipconfig', 'ping', 'nslookup']
      }),
      ...core2TopicChecks({
        topics: core2OperatingSystemTopics,
        moduleId: 'messer-core2-operating-systems-awareness',
        idPrefix: 'messer-os-topic-check',
        domain: 'A+ Core 2 operating systems',
        weakTopic: 'a-plus-troubleshooting'
      })
    ],
    scenarioPrompts: [
      {
        id: 'messer-os-s1',
        title: 'Portal works on one device, fails on another',
        prompt: 'Use OS, browser, network, and identity awareness to narrow a staff laptop issue without overstepping.'
      }
    ],
    practicalOutputs: [
      {
        id: 'messer-os-p1',
        title: 'OS evidence checklist',
        description: 'Draft a one-page checklist for Windows, macOS, Linux, network, browser, and cloud-productivity evidence fields.'
      }
    ]
  },
  {
    id: 'messer-core2-security-awareness',
    title: 'A+ Core 2 Security Awareness',
    description:
      'Readable CompTIA A+ 220-1202 Core 2 security awareness based on Professor Messer Section 2, focused on safe school IT judgement.',
    domain: 'Cybersecurity',
    level: 'A+',
    estimatedMinutes: 40,
    tags: ['Professor Messer', 'CompTIA A+ 220-1202', 'security', 'malware', 'social engineering'],
    learningObjectives: [
      'Recognise physical, logical, wireless, Windows, browser, mobile, and SOHO security controls.',
      'Describe common attack types and malware patterns without overclaiming.',
      'Apply safe first-line malware, incident, data destruction, and security best-practice judgement.'
    ],
    dcsRelevance: [
      'School IT support handles staff, student, parent, identity, and device risk daily.',
      'Security language must be accurate, privacy-safe, and escalation-ready.',
      'DCSPrep should assess recognition, safe containment, and communication rather than unsupported forensic claims.'
    ],
    sections: [
      {
        id: 'messer-sec-1',
        title: 'Read and Watch',
        bodyMarkdown: `Primary resource: [Professor Messer A+ 220-1202 Core 2 training course](${courseUrl}).\n\nExam reference: [CompTIA A+ 220-1202 exam objectives](${objectivesUrl}).\n\nFor Section 2, read/watch security measures, Windows security, wireless security, malware, anti-malware tools, social engineering, denial of service, on-path attacks, zero days, password attacks, insider threats, SQL injection, cross-site scripting, business email compromise, supply chain attacks, vulnerabilities, malware removal, best practices, mobile security, data destruction, SOHO networks, and browser security.`
      },
      {
        id: 'messer-sec-topic-index',
        title: 'Core 2 Section 2 Topic Index',
        bodyMarkdown: `Use this as the exact Section 2 reading checklist from the Professor Messer Core 2 course.\n\n2.1 Security Measures: Physical Security; Physical Access Security; Logical Security; Authentication and Access.\n\n2.2 Windows Security: Defender Antivirus; Windows Firewall; Windows Security Settings; Active Directory.\n\n2.3 Wireless Security: Wireless Encryption; Authentication Methods.\n\n2.4 Malware: Malware; Anti-malware Tools.\n\n2.5 Social Engineering: Social Engineering; Denial of Service; On-Path Attacks; Zero-Day Attacks; Password Attacks; Insider Threats; SQL Injection Attacks; Cross-site Scripting; Business Email Compromise; Supply Chain Attacks; Security Vulnerabilities.\n\n2.6 Malware Removal: Removing Malware.\n\n2.7 Security Best Practices: Security Best Practices.\n\n2.8 Mobile Device Security: Mobile Device Security.\n\n2.9 Data Destruction: Data Destruction.\n\n2.10 SOHO Networks: Securing a SOHO Network.\n\n2.11 Browser Security: Browser Security.\n\nSearch terms covered here include badge readers, video surveillance, key fobs, smart cards, biometrics, least privilege, ACLs, zero trust, MFA, SAML, SSO, JIT access, MDM, Defender, NTFS permissions, share permissions, WPA2, WPA3, AES, RADIUS, TACACS, Kerberos, ransomware, EDR, phishing, ARP poisoning, evil twins, BEC, SOE, EOSL, remote wipe, certificate of destruction, firmware updates, password managers, browser patching, and hash verification.`
      },
      {
        id: 'messer-sec-2',
        title: 'Controls and Access',
        bodyMarkdown: `Physical security controls include barricades, access control vestibules, badge readers, video surveillance, key fobs, smart cards, mobile keys, and biometrics. Logical controls include least privilege, access control lists, zero trust, MFA, SAML, SSO, just-in-time access, and MDM.\n\nWindows security awareness includes Defender Antivirus, Windows Firewall, users and groups, authentication options, passwordless sign-in, NTFS versus share permissions, Active Directory, Group Policy, domain joins, and folder redirection. At DCS, access changes should follow authorised owners and documented requests.`
      },
      {
        id: 'messer-sec-3',
        title: 'Wireless, Malware, and Attack Patterns',
        bodyMarkdown: `Wireless security includes WPA2, WPA3, AES, RADIUS, TACACS, and Kerberos. These concepts help Josh describe whether a problem looks like Wi-Fi access, authentication, policy, or device configuration.\n\nThreat awareness includes trojans, rootkits, spyware, keyloggers, ransomware, phishing, shoulder surfing, tailgating, impersonation, denial of service, on-path attacks, ARP poisoning, evil twins, zero days, password attacks, insider threats, SQL injection, cross-site scripting, business email compromise, supply chain attacks, unpatched systems, standard operating environment drift, and end-of-service-life risk. The first-line action is to stop unsafe interaction, preserve evidence in the right system, and escalate.`
      },
      {
        id: 'messer-sec-4',
        title: 'Removal, Best Practices, Mobile, Data, SOHO, and Browser Security',
        bodyMarkdown: `Malware removal awareness includes identifying symptoms, isolating or quarantining affected systems when instructed, using approved anti-malware tooling, remediation, and recovery. WinRE, EDR, email gateways, and software firewalls may all be part of the wider response.\n\nBest practices include encryption, password complexity, account disabling, locking screens, full-device encryption, screen locks, configuration profiles, remote wipe, secure data destruction, certificates of destruction, firmware updates, default-password removal, content filtering, browser patching, secure extensions, password managers, and hash verification.`
      }
    ],
    flashcards: [
      { id: 'messer-sec-f1', front: 'What is least privilege?', back: 'Giving users only the access needed for their role and task.' },
      { id: 'messer-sec-f2', front: 'What is MFA?', back: 'Authentication using more than one factor, such as password plus app approval.' },
      { id: 'messer-sec-f3', front: 'What is an evil twin?', back: 'A malicious wireless access point pretending to be a legitimate network.' },
      { id: 'messer-sec-f4', front: 'What should Josh avoid claiming too early?', back: 'That a breach, malware infection, or compromise is confirmed without authorised review.' },
      { id: 'messer-sec-f5', front: 'What is business email compromise?', back: 'A social-engineering attack using trusted email identity or context to trick users into unsafe actions.' },
      { id: 'messer-sec-f6', front: 'Why are unpatched systems risky?', back: 'Known vulnerabilities may remain exploitable.' },
      { id: 'messer-sec-f7', front: 'What is a safe first-line phishing response?', back: 'Do not click, preserve evidence in the authorised system, capture minimal details, and escalate.' },
      { id: 'messer-sec-f8', front: 'What is remote wipe used for?', back: 'Removing data from a lost, stolen, or retired managed mobile device.' },
      { id: 'messer-sec-f9', front: 'Why change SOHO default passwords?', back: 'Default credentials are widely known and easily abused.' },
      { id: 'messer-sec-f10', front: 'What does browser hash verification help confirm?', back: 'That a downloaded file matches the expected integrity value.' }
    ],
    quiz: [
      mcq({
        id: 'messer-sec-q1',
        prompt: 'A staff member reports an unexpected MFA prompt they did not initiate. What is the safest first-line response?',
        domain: 'A+ Core 2 security',
        difficulty: 'foundation',
        explanation: 'Unexpected MFA prompts can indicate credential risk.',
        modelAnswer:
          'Tell them not to approve it, capture minimal facts, preserve evidence in the authorised place, and escalate through the security/identity owner.',
        commonMistakes: ['Approving the prompt to see what happens', 'Dismissing it as harmless'],
        dcsContext: 'Identity incidents can expose school data.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-security-awareness',
        weakTopic: 'security-risk-judgement',
        options: [
          { id: 'a', label: 'Approve it and check whether login still works' },
          { id: 'b', label: 'Do not approve it; document and escalate as possible credential risk' },
          { id: 'c', label: 'Ignore it unless it happens three times' },
          { id: 'd', label: 'Post the screenshot in an informal chat for opinions' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'messer-sec-q2',
        prompt: 'List four social-engineering or attack patterns covered by Core 2 security awareness.',
        domain: 'A+ Core 2 security',
        difficulty: 'foundation',
        explanation: 'Recognition language matters before response.',
        modelAnswer:
          'Examples include phishing, impersonation, shoulder surfing, tailgating, business email compromise, on-path attacks, evil twins, password attacks, supply chain attacks, SQL injection, and cross-site scripting.',
        commonMistakes: ['Only listing malware families', 'Using dramatic labels without matching evidence'],
        dcsContext: 'Support staff need plain, accurate risk labels.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-security-awareness',
        weakTopic: 'security-risk-judgement',
        rubric: ['Names at least four patterns', 'Uses accurate terms', 'Avoids unsupported certainty'],
        keywordHints: ['phishing', 'BEC', 'tailgating', 'evil twin']
      }),
      orderSteps({
        id: 'messer-sec-q3',
        prompt: 'Order the first-line response to suspected malware on a school device.',
        domain: 'A+ Core 2 security',
        difficulty: 'stretch',
        explanation: 'Containment and evidence come before casual cleanup.',
        modelAnswer:
          'Stop unsafe use, preserve/report evidence, follow authorised isolation or anti-malware process, then escalate and document recovery needs.',
        commonMistakes: ['Deleting evidence immediately', 'Continuing normal use'],
        dcsContext: 'A school device may contain sensitive staff or student data.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-security-awareness',
        weakTopic: 'security-risk-judgement',
        steps: [
          { id: 'stop', label: 'Stop unsafe interaction with the device or content' },
          { id: 'preserve', label: 'Preserve minimal evidence in the authorised system' },
          { id: 'process', label: 'Follow approved isolation or anti-malware process' },
          { id: 'escalate', label: 'Escalate with symptom, scope, and recovery needs' }
        ],
        correctOrder: ['stop', 'preserve', 'process', 'escalate'],
        rubric: ['Stops unsafe action', 'Preserves evidence safely', 'Uses approved process']
      }),
      scenarioResponse({
        id: 'messer-sec-q4',
        prompt: 'A teacher asks Josh to quickly bypass browser filtering for a lesson site. Write the safe response.',
        domain: 'A+ Core 2 security',
        difficulty: 'challenge',
        explanation: 'Content filtering and browser security are governed controls.',
        modelAnswer:
          'Acknowledge the learning need, capture the site, class, timing, and educational purpose, then route it through the approved web-filter request path instead of bypassing controls directly.',
        commonMistakes: ['Bypassing controls to be helpful', 'Rejecting the teacher without a path forward'],
        dcsContext: 'Filtering decisions affect safeguarding and policy compliance.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-security-awareness',
        weakTopic: 'dcs-web-filtering',
        rubric: ['Acknowledges teaching need', 'Uses approved request path', 'Does not bypass controls']
      }),
      explainItSimply({
        id: 'messer-sec-q5',
        prompt: 'Explain why the PD app should not store live phishing email content.',
        domain: 'A+ Core 2 security',
        difficulty: 'foundation',
        explanation: 'The app is for learning, not incident evidence storage.',
        modelAnswer:
          'A real phishing email can include names, addresses, links, account clues, or sensitive school context. It belongs in the authorised incident system; DCSPrep should only store the general lesson and safe response pattern.',
        commonMistakes: ['Treating local notes as safe by default'],
        dcsContext: 'Privacy mistakes can turn one incident into two.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-security-awareness',
        weakTopic: 'security-risk-judgement',
        rubric: ['Mentions sensitive content', 'Names authorised system', 'Keeps PD notes generic'],
        keywordHints: ['sensitive', 'authorised', 'pattern']
      }),
      ...core2TopicChecks({
        topics: core2SecurityTopics,
        moduleId: 'messer-core2-security-awareness',
        idPrefix: 'messer-sec-topic-check',
        domain: 'A+ Core 2 security',
        weakTopic: 'security-risk-judgement'
      })
    ],
    scenarioPrompts: [
      {
        id: 'messer-sec-s1',
        title: 'Unexpected MFA and phishing report',
        prompt: 'Handle a security concern with accurate language, privacy-safe notes, and escalation discipline.'
      }
    ],
    practicalOutputs: [
      {
        id: 'messer-sec-p1',
        title: 'Security first-response note template',
        description: 'Create a template for suspected phishing, malware, MFA, or browser-filter reports without copying sensitive evidence into DCSPrep.'
      }
    ]
  },
  {
    id: 'messer-core2-software-troubleshooting-awareness',
    title: 'A+ Core 2 Software Troubleshooting Awareness',
    description:
      'Readable CompTIA A+ 220-1202 Core 2 software troubleshooting awareness based on Professor Messer Section 3.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 24,
    tags: ['Professor Messer', 'CompTIA A+ 220-1202', 'software troubleshooting', 'mobile troubleshooting'],
    learningObjectives: [
      'Recognise Windows, mobile, mobile-security, and desktop-security symptoms.',
      'Use symptom buckets to choose safe evidence gathering and escalation.',
      'Avoid risky fixes when the symptom suggests security, privacy, or policy involvement.'
    ],
    dcsRelevance: [
      'Windows and mobile issues often appear during class time and need quick, calm triage.',
      'Mobile device security symptoms can overlap with account, MDM, network, and policy issues.',
      'Good troubleshooting notes reduce repeated disruption.'
    ],
    sections: [
      {
        id: 'messer-trouble-1',
        title: 'Read and Watch',
        bodyMarkdown: `Primary resource: [Professor Messer A+ 220-1202 Core 2 training course](${courseUrl}).\n\nExam reference: [CompTIA A+ 220-1202 exam objectives](${objectivesUrl}).\n\nFor Section 3, read/watch troubleshooting Windows, troubleshooting mobile devices, troubleshooting mobile device security, and troubleshooting security issues.`
      },
      {
        id: 'messer-trouble-topic-index',
        title: 'Core 2 Section 3 Topic Index',
        bodyMarkdown: `Use this as the exact Section 3 reading checklist from the Professor Messer Core 2 course.\n\n3.1 Troubleshooting Windows: Troubleshooting Windows.\n\n3.2 Troubleshooting Mobile Devices: Troubleshooting Mobile Devices.\n\n3.3 Troubleshooting Mobile Device Security: Troubleshooting Mobile Device Security.\n\n3.4 Troubleshooting Security: Troubleshooting Security Issues.\n\nSearch terms covered here include blue screen stop errors, degraded performance, application crashes, low memory, update problems, OS patching, battery life, jailbreaking, app spoofing, degraded mobile performance, data usage limits, desktop alerts, false antivirus alerts, altered personal files, OS update failures, and certificate warnings.`
      },
      {
        id: 'messer-trouble-2',
        title: 'Windows Symptoms',
        bodyMarkdown: `Windows troubleshooting symptoms include blue screen stop errors, degraded performance, application crashes, low memory, services failing to start, missing devices, update problems, profile issues, and strange login or certificate behaviour.\n\nFirst-line support should capture exact wording, time, device, user, recent change, whether the problem repeats, and whether a known-good account or device behaves differently. Avoid reinstalling, resetting, or changing policy before scope is known.`
      },
      {
        id: 'messer-trouble-3',
        title: 'Mobile and Mobile Security Symptoms',
        bodyMarkdown: `Mobile troubleshooting includes app crashes, update failures, OS patching, battery drain, connectivity, data usage, account sync, and storage problems. Mobile security symptoms include jailbreaking or rooting indicators, app spoofing, unexpected permissions, degraded performance, excessive data use, and configuration profile issues.\n\nFor managed school devices, ownership and MDM matter. A personally owned device, a school-owned device, and a shared device can require different support boundaries.`
      },
      {
        id: 'messer-trouble-4',
        title: 'Security Troubleshooting Symptoms',
        bodyMarkdown: `Desktop security symptoms include alerts, false antivirus warnings, altered personal files, browser redirection, certificate warnings, OS update failures, unknown extensions, and unexpected prompts.\n\nThe safe judgement pattern is: do not dismiss the alert, do not panic, do not click through unknown prompts, capture minimal evidence, check for known-good comparison, and escalate when security or privacy may be involved.`
      }
    ],
    flashcards: [
      { id: 'messer-trouble-f1', front: 'What should a blue screen note include?', back: 'Stop code if visible, time, device, recent changes, and whether it repeats.' },
      { id: 'messer-trouble-f2', front: 'What does degraded performance require first?', back: 'Scope and symptom detail before random cleanup.' },
      { id: 'messer-trouble-f3', front: 'Why compare with a known-good device?', back: 'It separates local device symptoms from wider service or network symptoms.' },
      { id: 'messer-trouble-f4', front: 'What can app spoofing indicate?', back: 'A malicious or fake app pretending to be legitimate.' },
      { id: 'messer-trouble-f5', front: 'What does excessive mobile data use suggest?', back: 'Possible sync, app, malware, configuration, or policy issue.' },
      { id: 'messer-trouble-f6', front: 'How should certificate warnings be handled?', back: 'Do not click through casually; capture context and escalate if not clearly expected.' },
      { id: 'messer-trouble-f7', front: 'Why does device ownership matter?', back: 'It changes support authority, privacy boundaries, and MDM control.' },
      { id: 'messer-trouble-f8', front: 'What is a safe response to a false antivirus-style popup?', back: 'Do not interact with it; capture context and follow approved security guidance.' },
      { id: 'messer-trouble-f9', front: 'What should be captured for app crashes?', back: 'App name, version if known, user, device, OS, exact error, and repeatability.' },
      { id: 'messer-trouble-f10', front: 'What is the goal of symptom buckets?', back: 'To choose the next safe check and escalation route.' }
    ],
    quiz: [
      mcq({
        id: 'messer-trouble-q1',
        prompt: 'A browser shows a certificate warning for a school web tool. What is the safest first-line action?',
        domain: 'A+ Core 2 troubleshooting',
        difficulty: 'foundation',
        explanation: 'Certificate warnings can signal misconfiguration, time issues, interception, or risk.',
        modelAnswer:
          'Do not click through casually. Capture the URL, time, device, network context, screenshot if approved, and compare with a known-good device before escalating.',
        commonMistakes: ['Clicking through to finish quickly', 'Assuming the user caused it'],
        dcsContext: 'School portals and web tools may handle sensitive information.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-software-troubleshooting-awareness',
        weakTopic: 'a-plus-troubleshooting',
        options: [
          { id: 'a', label: 'Click through and tell the teacher it is probably fine' },
          { id: 'b', label: 'Capture context, compare safely, and escalate if not clearly expected' },
          { id: 'c', label: 'Reinstall Windows immediately' },
          { id: 'd', label: 'Disable antivirus so the site loads' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'messer-trouble-q2',
        prompt: 'List five details to capture for a repeated application crash.',
        domain: 'A+ Core 2 troubleshooting',
        difficulty: 'foundation',
        explanation: 'Repeatable crashes need reproducible evidence.',
        modelAnswer:
          'Capture app name, exact error, user, device, OS version if known, when it started, steps to reproduce, recent changes, and whether another user/device has the same issue.',
        commonMistakes: ['Writing only "app broken"', 'Leaving out repeatability'],
        dcsContext: 'Classroom apps need quick, reproducible escalation notes.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-software-troubleshooting-awareness',
        weakTopic: 'a-plus-troubleshooting',
        rubric: ['Names symptom', 'Captures device/user context', 'Captures repeatability', 'Captures known-good comparison'],
        keywordHints: ['app', 'error', 'device', 'repeat', 'known-good']
      }),
      orderSteps({
        id: 'messer-trouble-q3',
        prompt: 'Order a safe mobile-device troubleshooting sequence.',
        domain: 'A+ Core 2 troubleshooting',
        difficulty: 'stretch',
        explanation: 'Ownership and management context shape the safe path.',
        modelAnswer:
          'Confirm ownership/management, capture symptom and impact, check safe basics, then escalate if MDM/security/policy appears involved.',
        commonMistakes: ['Resetting a device before ownership is clear', 'Ignoring MDM context'],
        dcsContext: 'School-owned and personal devices carry different authority boundaries.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-software-troubleshooting-awareness',
        weakTopic: 'a-plus-mobile-devices',
        steps: [
          { id: 'ownership', label: 'Confirm ownership and management context' },
          { id: 'symptom', label: 'Capture symptom, scope, and learning impact' },
          { id: 'basics', label: 'Check safe basics such as app, update, network, and battery state' },
          { id: 'escalate', label: 'Escalate if MDM, security, or policy may be involved' }
        ],
        correctOrder: ['ownership', 'symptom', 'basics', 'escalate'],
        rubric: ['Ownership first', 'Symptom detail', 'Escalates policy/security issues']
      }),
      scenarioResponse({
        id: 'messer-trouble-q4',
        prompt: 'A staff laptop is slow and showing unknown popups. Write a balanced troubleshooting response.',
        domain: 'A+ Core 2 troubleshooting',
        difficulty: 'challenge',
        explanation: 'Performance symptoms can overlap with security symptoms.',
        modelAnswer:
          'Capture performance symptoms and popup wording without clicking, ask when it started and what changed, check safe basics if approved, and escalate as possible security concern rather than treating it as normal slowness only.',
        commonMistakes: ['Clicking the popup', 'Only running cleanup tools without noting security risk'],
        dcsContext: 'A staff laptop may contain sensitive school data.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-software-troubleshooting-awareness',
        weakTopic: 'security-risk-judgement',
        rubric: ['Captures symptoms safely', 'Mentions security overlap', 'Escalates appropriately']
      }),
      explainItSimply({
        id: 'messer-trouble-q5',
        prompt: 'Explain why “works on another device” is useful troubleshooting information.',
        domain: 'A+ Core 2 troubleshooting',
        difficulty: 'foundation',
        explanation: 'Known-good comparison narrows scope.',
        modelAnswer:
          'It shows the service may still be working and points attention back to the affected device, account, browser, app, network path, or profile. It prevents Josh from claiming a wider outage too early.',
        commonMistakes: ['Ignoring comparison evidence'],
        dcsContext: 'Known-good checks reduce classroom disruption and unnecessary escalation.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-software-troubleshooting-awareness',
        weakTopic: 'a-plus-troubleshooting',
        rubric: ['Explains scope', 'Names likely local areas', 'Avoids overclaiming'],
        keywordHints: ['scope', 'known-good', 'device', 'service']
      }),
      ...core2TopicChecks({
        topics: core2TroubleshootingTopics,
        moduleId: 'messer-core2-software-troubleshooting-awareness',
        idPrefix: 'messer-trouble-topic-check',
        domain: 'A+ Core 2 troubleshooting',
        weakTopic: 'a-plus-troubleshooting'
      })
    ],
    scenarioPrompts: [
      {
        id: 'messer-trouble-s1',
        title: 'Slow laptop with security-like popups',
        prompt: 'Triage a performance complaint that may also be a security issue.'
      }
    ],
    practicalOutputs: [
      {
        id: 'messer-trouble-p1',
        title: 'Software symptom capture sheet',
        description: 'Create a short template for Windows, mobile, mobile-security, and browser/certificate symptoms.'
      }
    ]
  },
  {
    id: 'messer-core2-operational-procedures-awareness',
    title: 'A+ Core 2 Operational Procedures Awareness',
    description:
      'Readable CompTIA A+ 220-1202 Core 2 operational-procedures awareness based on Professor Messer Section 4, mapped to DCS support practice.',
    domain: 'Professional Practice',
    level: 'A+',
    estimatedMinutes: 38,
    tags: ['Professor Messer', 'CompTIA A+ 220-1202', 'operations', 'documentation', 'AI'],
    learningObjectives: [
      'Recognise ticketing, asset, documentation, change, backup, safety, privacy, professionalism, scripting, remote access, and AI concepts.',
      'Apply operational procedures to school support without storing confidential detail in DCSPrep.',
      'Use scripts, remote tools, and AI only inside approved boundaries.'
    ],
    dcsRelevance: [
      'Operational discipline is what turns technical knowledge into safe school support.',
      'Ticket notes, change context, privacy, and professional communication matter in every DCS support interaction.',
      'AI and scripting can help learning but need verification and approval before operational use.'
    ],
    sections: [
      {
        id: 'messer-ops-1',
        title: 'Read and Watch',
        bodyMarkdown: `Primary resource: [Professor Messer A+ 220-1202 Core 2 training course](${courseUrl}).\n\nExam reference: [CompTIA A+ 220-1202 exam objectives](${objectivesUrl}).\n\nFor Section 4, read/watch ticketing systems, asset management, document types, change management, backup and recovery, ESD, safety, environmental impacts, incident response, privacy/licensing/policies, professionalism, communication, scripting languages, scripting use cases, remote access, and managing AI.`
      },
      {
        id: 'messer-ops-topic-index',
        title: 'Core 2 Section 4 Topic Index',
        bodyMarkdown: `Use this as the exact Section 4 reading checklist from the Professor Messer Core 2 course.\n\n4.1 Documentation and Support Systems: Ticketing Systems; Asset Management; Document Types.\n\n4.2 Change Management: Change Management.\n\n4.3 Backup and Recovery: Managing Backups.\n\n4.4 Safety: Managing Electrostatic Discharge; Safety Procedures.\n\n4.5 Environmental Impacts: Environmental Impacts.\n\n4.6 Privacy and Policies: Incident Response; Privacy, Licensing, and Policies.\n\n4.7 Communication and Professionalism: Professionalism; Communication.\n\n4.8 Scripting: Scripting Languages; Scripting Use Cases.\n\n4.9 Remote Access: Remote Access.\n\n4.10 Artificial Intelligence: Managing AI.\n\nSearch terms covered here include ticketing systems, CMDB, procurement lifecycle, incident reports, SOPs, onboarding, offboarding, SLAs, change boards, approvals, full backup, differential backup, incremental backup, synthetic backup, GFS, 3-2-1, ESD, MSDS, toxic waste, batteries, toner, chain of custody, order of volatility, EULA, software licensing, PowerShell, shell scripts, JavaScript, Python, VPN, RMM, AI bias, hallucinations, public AI, and private AI.`
      },
      {
        id: 'messer-ops-2',
        title: 'Documentation, Change, and Backup',
        bodyMarkdown: `Ticketing systems preserve work history, ownership, priority, impact, and evidence. Asset management and CMDB thinking connect devices, users, lifecycle, procurement, and support history. Document types include incident reports, SOPs, onboarding/offboarding notes, SLAs, and approved procedures.\n\nChange management reduces avoidable incidents by using requests, approvals, scheduling, communication, testing, rollback planning, and change boards where appropriate. Backup awareness includes full, differential, incremental, synthetic, GFS, and 3-2-1 strategies. First-line staff should understand the vocabulary and capture impact without pretending to own backup architecture.`
      },
      {
        id: 'messer-ops-3',
        title: 'Safety, Environment, Incident Response, and Privacy',
        bodyMarkdown: `Safety includes electrostatic discharge controls, anti-static tools, grounding, cable management, fire safety, and government or workplace requirements. Environmental responsibilities include MSDS awareness and correct disposal of toxic waste, batteries, toner, and retired hardware.\n\nIncident response concepts include chain of custody, drive copies, documentation, and order of volatility. Privacy and policy concepts include EULAs, software licensing, privacy agreements, and data-handling boundaries. DCSPrep learning notes should describe patterns, not store live sensitive records.`
      },
      {
        id: 'messer-ops-4',
        title: 'Professionalism, Communication, Scripting, Remote Access, and AI',
        bodyMarkdown: `Professionalism includes appearance, punctuality, avoiding unnecessary delays, managing expectations, staying calm, avoiding jargon, and using positive, accurate communication.\n\nScripting awareness includes batch files, PowerShell, shell scripts, JavaScript, Python, and use cases such as automation, restarts, reimaging, backups, and deployments. Remote access awareness includes RDP, VPN, and RMM with consent and authorisation. AI awareness includes useful integrations, inappropriate uses, bias, hallucination, verification, and public versus private AI boundaries.`
      }
    ],
    flashcards: [
      { id: 'messer-ops-f1', front: 'What makes a ticket useful?', back: 'Clear symptom, scope, impact, evidence, steps tried, owner, and next action.' },
      { id: 'messer-ops-f2', front: 'What is a CMDB?', back: 'A configuration management database connecting assets, relationships, and support context.' },
      { id: 'messer-ops-f3', front: 'What is the purpose of change management?', back: 'To reduce risk by approving, scheduling, testing, communicating, and backing out changes.' },
      { id: 'messer-ops-f4', front: 'What is the 3-2-1 backup idea?', back: 'Keep three copies, on two media/types, with one offsite or separated copy.' },
      { id: 'messer-ops-f5', front: 'What does ESD stand for?', back: 'Electrostatic discharge.' },
      { id: 'messer-ops-f6', front: 'What is chain of custody?', back: 'Documented control and handling history for evidence.' },
      { id: 'messer-ops-f7', front: 'Why avoid jargon with users?', back: 'It improves clarity, confidence, and shared expectations.' },
      { id: 'messer-ops-f8', front: 'What is a safe scripting boundary?', back: 'Read and test in low-risk contexts; do not run operational scripts without approval.' },
      { id: 'messer-ops-f9', front: 'What is required before remote access?', back: 'Authorisation, consent where required, correct tool, and clear purpose.' },
      { id: 'messer-ops-f10', front: 'Why verify AI output?', back: 'AI can hallucinate or reflect bias, so important actions need authoritative confirmation.' }
    ],
    quiz: [
      mcq({
        id: 'messer-ops-q1',
        prompt: 'Which ticket note is most useful for a classroom display fault?',
        domain: 'A+ Core 2 operational procedures',
        difficulty: 'foundation',
        explanation: 'Operational procedures turn symptoms into actionable records.',
        modelAnswer:
          'A useful note includes room, device, exact symptom, class impact, time, steps tried, known-good comparison, and escalation request.',
        commonMistakes: ['Writing only "display broken"', 'Leaving out learning impact'],
        dcsContext: 'Classroom support needs concise, evidence-rich notes.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-operational-procedures-awareness',
        weakTopic: 'ticket-quality',
        options: [
          { id: 'a', label: 'Display broken' },
          { id: 'b', label: 'Room 12 ViewBoard shows no HDMI input from teacher laptop; class blocked; cable reseated and another cable tested; needs escalation' },
          { id: 'c', label: 'Teacher says tech is bad' },
          { id: 'd', label: 'Probably a firewall issue' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'messer-ops-q2',
        prompt: 'List four operational areas covered in A+ Core 2 Section 4.',
        domain: 'A+ Core 2 operational procedures',
        difficulty: 'foundation',
        explanation: 'Section 4 is broad operational awareness.',
        modelAnswer:
          'Examples include ticketing, asset management, documentation, change management, backups, safety, environmental disposal, incident response, privacy, licensing, communication, scripting, remote access, and AI management.',
        commonMistakes: ['Listing only technical commands', 'Forgetting safety or communication'],
        dcsContext: 'School IT work is operational and professional, not just technical.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-operational-procedures-awareness',
        weakTopic: 'professional-practice',
        rubric: ['Names at least four areas', 'Includes operational concepts', 'Avoids only tool names'],
        keywordHints: ['ticketing', 'change', 'backup', 'privacy', 'AI']
      }),
      orderSteps({
        id: 'messer-ops-q3',
        prompt: 'Order a safe change-management thought process for a requested setting change.',
        domain: 'A+ Core 2 operational procedures',
        difficulty: 'stretch',
        explanation: 'Change risk should be understood before implementation.',
        modelAnswer:
          'Clarify request and impact, identify owner/approval path, plan testing and rollback, then communicate and implement only if authorised.',
        commonMistakes: ['Changing first and documenting later', 'Skipping rollback thinking'],
        dcsContext: 'School systems often affect many classes or users.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-operational-procedures-awareness',
        weakTopic: 'professional-practice',
        steps: [
          { id: 'clarify', label: 'Clarify request, scope, risk, and impact' },
          { id: 'approval', label: 'Identify owner and approval path' },
          { id: 'plan', label: 'Plan testing, communication, and rollback' },
          { id: 'implement', label: 'Implement only if authorised and document outcome' }
        ],
        correctOrder: ['clarify', 'approval', 'plan', 'implement'],
        rubric: ['Clarifies scope', 'Uses approval path', 'Includes rollback/communication']
      }),
      scenarioResponse({
        id: 'messer-ops-q4',
        prompt: 'Josh asks an AI tool how to fix a live school account issue. Explain the safe operational boundary.',
        domain: 'A+ Core 2 operational procedures',
        difficulty: 'challenge',
        explanation: 'AI can assist learning but cannot replace authorised process.',
        modelAnswer:
          'Use AI only with non-sensitive, generalised details for learning or drafting. Verify any advice against approved DCS procedures and do not paste account, student, staff, or incident details into a public AI tool.',
        commonMistakes: ['Pasting real account details', 'Treating AI advice as authority'],
        dcsContext: 'School data and identity work require privacy and approval discipline.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-operational-procedures-awareness',
        weakTopic: 'smitb-cloud-ai',
        rubric: ['Protects sensitive details', 'Requires approved verification', 'Separates learning from live action']
      }),
      explainItSimply({
        id: 'messer-ops-q5',
        prompt: 'Explain why remote access should not be started casually.',
        domain: 'A+ Core 2 operational procedures',
        difficulty: 'foundation',
        explanation: 'Remote access involves trust, privacy, and control.',
        modelAnswer:
          'Remote access lets a technician see or control another device, so it needs the right tool, permission, clear purpose, and privacy awareness. Casual access can expose information or break trust.',
        commonMistakes: ['Treating remote tools as harmless convenience'],
        dcsContext: 'Staff and student devices may show sensitive school information.',
        reviewSchedule,
        recommendedModuleId: 'messer-core2-operational-procedures-awareness',
        weakTopic: 'professional-practice',
        rubric: ['Mentions permission', 'Mentions privacy', 'Mentions clear purpose'],
        keywordHints: ['permission', 'privacy', 'purpose']
      }),
      ...core2TopicChecks({
        topics: core2OperationalTopics,
        moduleId: 'messer-core2-operational-procedures-awareness',
        idPrefix: 'messer-ops-topic-check',
        domain: 'A+ Core 2 operational procedures',
        weakTopic: 'professional-practice'
      })
    ],
    scenarioPrompts: [
      {
        id: 'messer-ops-s1',
        title: 'Operational judgement under classroom pressure',
        prompt: 'Write ticket, change, privacy, and communication notes for a classroom technology request.'
      }
    ],
    practicalOutputs: [
      {
        id: 'messer-ops-p1',
        title: 'Core 2 operations checklist',
        description: 'Draft a checklist covering ticket quality, assets, change, backup awareness, safety, privacy, remote access, scripting, and AI boundaries.'
      }
    ]
  },
  ...messerCore2TopicModules
];
