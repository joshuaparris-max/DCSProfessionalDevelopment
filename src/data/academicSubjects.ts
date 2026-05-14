import type { AcademicSubject } from '../types/academic';
import { academicAssessmentSummaries } from './academicAssessmentSummaries';
import { academicSubjectAssessments } from './academicSubjectAssessments';

const generatedAcademicSubjectConfigs: Record<
  string,
  {
    title: string;
    track: AcademicSubject['track'];
    yearLevel: string;
    summary: string;
    dcsArea: AcademicSubject['dcsBridges'][number]['dcsArea'];
    relatedDcsModuleIds: string[];
    practicalOutput: string;
    focusLabel: string;
  }
> = {
  cse1oof: {
    title: 'Office Software Fundamentals',
    track: 'RBC',
    yearLevel: 'Year 1',
    summary:
      'Object-oriented programming, testing, Unix environment awareness, and code explanation translated into safe script-reading and support troubleshooting practice.',
    dcsArea: 'Programming / Automation',
    relatedDcsModuleIds: ['rbc-scripting-code-reading', 'ticket-notes-escalation-quality'],
    practicalOutput: 'Code explanation and test evidence note',
    focusLabel: 'code reasoning and test evidence'
  },
  cse4002: {
    title: 'Artificial Intelligence Fundamentals',
    track: 'SMITB',
    yearLevel: 'SMITB',
    summary:
      'AI concepts, expert systems, responsible AI, and applied case-study thinking for safer school support decisions involving AI tools.',
    dcsArea: 'Data / Reporting',
    relatedDcsModuleIds: ['smitb-cloud-ai-school-it', 'smitb-ml-dl-evaluation-support-context'],
    practicalOutput: 'Responsible AI support case note',
    focusLabel: 'AI case-study evaluation'
  },
  cse5006: {
    title: 'Cloud Web Application Development',
    track: 'SMITB',
    yearLevel: 'SMITB',
    summary:
      'Cloud web architecture, deployment, storage, APIs, and CI/CD vocabulary mapped to SaaS support, dependency awareness, and escalation quality.',
    dcsArea: 'M365 / Cloud',
    relatedDcsModuleIds: ['smitb-cloud-ai-school-it', 'cloud-models-saas-paas-iaas-daas'],
    practicalOutput: 'Cloud service dependency map',
    focusLabel: 'cloud web dependency mapping'
  },
  cse5bdc: {
    title: 'Big Data in Cloud',
    track: 'SMITB',
    yearLevel: 'SMITB',
    summary:
      'Big-data and cloud-platform awareness for interpreting analytics pipelines, service dependencies, and evidence-rich outage notes.',
    dcsArea: 'Data / Reporting',
    relatedDcsModuleIds: ['smitb-big-data-cloud-context-school-it', 'smitb-cloud-ai-school-it'],
    practicalOutput: 'Analytics pipeline support map',
    focusLabel: 'big-data/cloud support context'
  },
  cse5dl: {
    title: 'Deep Learning',
    track: 'SMITB',
    yearLevel: 'SMITB',
    summary:
      'Deep-learning concepts, deployment awareness, and maintenance risks translated into AI limitation and verification practice.',
    dcsArea: 'Data / Reporting',
    relatedDcsModuleIds: ['smitb-ml-dl-evaluation-support-context', 'smitb-cloud-ai-school-it'],
    practicalOutput: 'AI deployment and maintenance risk note',
    focusLabel: 'deep-learning limitation review'
  },
  cse5ml: {
    title: 'Machine Learning',
    track: 'SMITB',
    yearLevel: 'SMITB',
    summary:
      'Machine-learning model evaluation, regression, classification, accuracy, and limitation awareness for school-data risk judgement.',
    dcsArea: 'Data / Reporting',
    relatedDcsModuleIds: ['smitb-ml-dl-evaluation-support-context', 'smitb-cloud-ai-school-it'],
    practicalOutput: 'Model limitation and evaluation note',
    focusLabel: 'ML evaluation practice'
  },
  cse5nlp: {
    title: 'Natural Language Processing',
    track: 'SMITB',
    yearLevel: 'SMITB',
    summary:
      'NLP, chatbot behaviour, fake-news classification, language models, and AI answer verification mapped to safe support practice.',
    dcsArea: 'Data / Reporting',
    relatedDcsModuleIds: ['smitb-cloud-ai-school-it', 'smitb-ml-dl-evaluation-support-context'],
    practicalOutput: 'AI answer verification checklist',
    focusLabel: 'NLP and chatbot reliability'
  },
  cse5cv: {
    title: 'Computer Vision',
    track: 'SMITB',
    yearLevel: 'SMITB',
    summary:
      'Computer-vision concepts, camera workflows, Azure vision awareness, and accessibility risk translated into first-line camera and Windows Hello triage.',
    dcsArea: 'DCS Level 1 Support',
    relatedDcsModuleIds: ['smitb-computer-vision-accessibility-support', 'accessibility-inclusive-design'],
    practicalOutput: 'Camera/vision feature risk note',
    focusLabel: 'computer-vision support triage'
  }
};

function buildAssessmentDrivenSubject(code: string): AcademicSubject {
  const key = code.toLowerCase();
  const config = generatedAcademicSubjectConfigs[key];
  const summary = academicAssessmentSummaries[key];

  return {
    id: key,
    code: code.toUpperCase(),
    title: config.title,
    provider: 'La Trobe',
    track: config.track,
    yearLevel: config.yearLevel,
    sourceType: 'SLG',
    sourceFileName: summary.sourceLabel,
    summary: config.summary,
    silos: [
      {
        id: `${key}-s1`,
        number: 1,
        text: `Explain the core ${config.focusLabel} concepts in plain English.`,
        plainEnglish: `Turn ${config.focusLabel} into language that helps school IT support rather than academic jargon.`,
        practicePrompts: [
          `Summarise one ${config.focusLabel} idea as a DCS support note.`,
          'Identify what evidence would make the support claim stronger.'
        ],
        quizItems: [
          `Explain one ${config.focusLabel} idea in school-support language.`,
          'Describe the safest escalation boundary for this topic.'
        ]
      },
      {
        id: `${key}-s2`,
        number: 2,
        text: 'Apply assessment tasks as practical DCSPrep evidence outputs.',
        plainEnglish:
          'Use the SLG assessment structure to produce privacy-safe notes, checklists, maps, or reflections that improve support judgement.',
        practicePrompts: [
          `Create a ${config.practicalOutput.toLowerCase()} from one assessment task.`,
          'State what should not be claimed as formal credit or production authority.'
        ],
        quizItems: [
          'What evidence output should be created from the assessment task?',
          'How can the output stay manager-safe and privacy-safe?'
        ]
      }
    ],
    dcsBridges: [
      {
        id: `${key}-bridge-1`,
        dcsArea: config.dcsArea,
        relevance: 'high',
        explanation:
          'This subject page converts extracted SLG assessment tasks into DCSPrep practice without claiming formal university credit.',
        relatedDcsModuleIds: config.relatedDcsModuleIds,
        practicalOutput: config.practicalOutput
      },
      {
        id: `${key}-bridge-2`,
        dcsArea: 'Professional Practice',
        relevance: 'medium',
        explanation:
          'Use the work as informal PD evidence: privacy-safe, reflective, and tied to support judgement rather than live production changes.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        practicalOutput: 'Manager-safe academic alignment reflection'
      }
    ],
    assessmentQuestions: academicSubjectAssessments[key],
    assessmentSections: [
      {
        id: `${key}-assessment-practice`,
        title: 'Per-assessment DCSPrep practice',
        timing: 'Use alongside each extracted SLG assessment task',
        purpose:
          'Convert each assessment into a practical support artifact while keeping academic alignment wording careful.',
        tasks: summary.tasks.map((task) => `Create: ${task.evidenceOutput}`),
        rubric: [
          'Explains the academic concept accurately.',
          'Connects the concept to a realistic school IT support situation.',
          'Avoids live confidential details and avoids claiming formal credit.',
          'Produces a practical note, checklist, map, or reflection.'
        ],
        relatedWeekIds: summary.tasks.map((task) => `${key}-${task.id}`)
      }
    ],
    weeklyModules: summary.tasks.map((task, index) => ({
      id: `${key}-${task.id}`,
      week: index + 1,
      topicNumber: index + 1,
      title: task.assessmentType,
      deliveryMode: 'Assessment-driven DCSPrep practice',
      sourceDetail: `${summary.sourceLabel}: ${task.timing}; due ${task.dueDate}; weight ${task.weight}%.`,
      summary: task.dcsPrepIntegration,
      dcsPrepFocus: task.evidenceOutput,
      linkedSiloIds: [`${key}-s1`, `${key}-s2`],
      relatedDcsModuleIds: task.relatedDcsModuleIds,
      resources: [],
      assessment: {
        id: `${task.id}-practice`,
        title: `${task.assessmentType} practice output`,
        prompt: `Create a privacy-safe DCSPrep artifact for this SLG task: ${task.dcsPrepIntegration}`,
        questionType: 'practical-output',
        rubric: [
          'Names the source task and support relevance.',
          'Produces the stated evidence output.',
          'Keeps wording informal and manager-safe.',
          'Does not include private school data or overstate formal credit.'
        ],
        evidenceOutput: task.evidenceOutput
      }
    })),
    slgAssessmentSummary: summary,
    recommendedNextAction: `Open one assessment-driven topic box and draft a ${config.practicalOutput.toLowerCase()}.`
  };
}

function buildAssessmentPracticeSection(subject: AcademicSubject): AcademicSubject['assessmentSections'] {
  const summary = academicAssessmentSummaries[subject.id];

  if (!summary) {
    return subject.assessmentSections;
  }

  if (subject.assessmentSections?.some((section) => section.id === `${subject.id}-assessment-practice`)) {
    return subject.assessmentSections;
  }

  return [
    ...(subject.assessmentSections ?? []),
    {
      id: `${subject.id}-assessment-practice`,
      title: 'Per-assessment DCSPrep practice',
      timing: 'Use alongside each extracted SLG assessment task',
      purpose:
        'Convert each assessment into a practical support artifact while keeping academic alignment wording careful.',
      tasks: summary.tasks.map((task) => `Create: ${task.evidenceOutput}`),
      rubric: [
        'Explains the academic concept accurately.',
        'Connects the concept to a realistic school IT support situation.',
        'Avoids live confidential details and avoids claiming formal credit.',
        'Produces a practical note, checklist, map, or reflection.'
      ],
      relatedWeekIds: summary.tasks.map((task) => `${subject.id}-${task.id}`)
    }
  ];
}

function buildAssessmentPracticeModules(subject: AcademicSubject): AcademicSubject['weeklyModules'] {
  if (subject.weeklyModules?.length) {
    return subject.weeklyModules;
  }

  const summary = academicAssessmentSummaries[subject.id];
  if (!summary) {
    return subject.weeklyModules;
  }

  return summary.tasks.map((task, index) => ({
    id: `${subject.id}-${task.id}`,
    week: index + 1,
    topicNumber: index + 1,
    title: task.assessmentType,
    deliveryMode: 'Assessment-driven DCSPrep practice',
    sourceDetail: `${summary.sourceLabel}: ${task.timing}; due ${task.dueDate}; weight ${task.weight}%.`,
    summary: task.dcsPrepIntegration,
    dcsPrepFocus: task.evidenceOutput,
    linkedSiloIds: subject.silos.slice(0, 2).map((silo) => silo.id),
    relatedDcsModuleIds: task.relatedDcsModuleIds,
    resources: [],
    assessment: {
      id: `${task.id}-practice`,
      title: `${task.assessmentType} practice output`,
      prompt: `Create a privacy-safe DCSPrep artifact for this SLG task: ${task.dcsPrepIntegration}`,
      questionType: 'practical-output',
      rubric: [
        'Names the source task and support relevance.',
        'Produces the stated evidence output.',
        'Keeps wording informal and manager-safe.',
        'Does not include private school data or overstate formal credit.'
      ],
      evidenceOutput: task.evidenceOutput
    }
  }));
}

function enrichAcademicSubjectWithAssessmentPractice(subject: AcademicSubject): AcademicSubject {
  if (!academicAssessmentSummaries[subject.id]) {
    return subject;
  }

  return {
    ...subject,
    assessmentQuestions: subject.assessmentQuestions ?? academicSubjectAssessments[subject.id],
    assessmentSections: buildAssessmentPracticeSection(subject),
    weeklyModules: buildAssessmentPracticeModules(subject),
    slgAssessmentSummary: subject.slgAssessmentSummary ?? academicAssessmentSummaries[subject.id]
  };
}

const baseAcademicSubjects: AcademicSubject[] = [
  {
    id: 'cse1iit',
    code: 'CSE1IIT',
    title: 'Inside Information Technology',
    provider: 'La Trobe',
    track: 'RBC',
    yearLevel: 'Year 1, Semester 1',
    sourceType: 'SLG',
    sourceFileName: 'DCSPrep_SLG_SILO_Reference.md',
    summary:
      'An introduction to hardware, software, networking, the web, and how IT systems connect in a practical school environment.',
    silos: [
      {
        id: 'cse1iit-s1',
        number: 1,
        text: 'Analyse how a computer and its input/output devices process and deliver data/information to users.',
        plainEnglish:
          'Understand how a school device, its screen, keyboard, storage, and network all need to work together for a classroom task.',
        practicePrompts: [
          'Describe the path from keyboard press to a lesson page loading on a classroom laptop.',
          'Explain why a printer, laptop screen, and internet connection are all part of the same support story.'
        ],
        quizItems: [
          'Describe the main hardware and network steps involved in opening a web page.',
          'Identify which component is likely at fault when a laptop powers on but cannot reach a site.'
        ]
      },
      {
        id: 'cse1iit-s2',
        number: 2,
        text: 'Explain the causes for the present information/digital age by advances in technologies in computer, information systems, computer networks, Internet, and the World Wide Web.',
        plainEnglish:
          'Use modern IT and web ideas to explain how school devices and services now depend on networks and online systems.',
        practicePrompts: [
          'Summarise why the school’s online portal depends on both local devices and cloud services.',
          'Explain the difference between a local file problem and an internet service problem.'
        ],
        quizItems: [
          'Explain why a cloud portal can fail even when the classroom laptop appears fine.',
          'Name two network developments that changed how school IT works.'
        ]
      },
      {
        id: 'cse1iit-s3',
        number: 3,
        text: 'Apply the knowledge in Internet, World Wide Web and HTML to designing and constructing a Web system.',
        plainEnglish:
          'Relate basic web page and website ideas to the school systems you support, without needing to build a website first.',
        practicePrompts: [
          'Describe how the school intranet or learning portal is built from pages, links, and servers.',
          'Explain why broken links or missing pages can look like a system error.'
        ],
        quizItems: [
          'Identify the practical difference between a web page and the network that delivers it.',
          'Explain why HTML errors can cause a web page to fail to load correctly.'
        ]
      },
      {
        id: 'cse1iit-s4',
        number: 4,
        text: 'Apply the knowledge in information technology to addressing/solving real-life problems.',
        plainEnglish:
          'Transfer IT ideas into real school support tasks such as device checks, network tests, and escalation notes.',
        practicePrompts: [
          'Turn a classroom internet report into a clear device-versus-network troubleshooting note.',
          'Explain how a support plan can use both hardware and network checks together.'
        ],
        quizItems: [
          'List the most useful first checks for a classroom device that cannot access a school website.',
          'Explain why one symptom may require both a hardware and a network test.'
        ]
      }
    ],
    dcsBridges: [
      {
        id: 'cse1iit-bridge-1',
        dcsArea: 'DCS Level 1 Support',
        relevance: 'high',
        explanation:
          'Use hardware, device, and connectivity knowledge to triage classroom incidents with confidence and make better escalation decisions.',
        relatedDcsModuleIds: ['rbc-cse1iit-hardware-network-web-basics', 'ticket-notes-escalation-quality'],
        practicalOutput: 'Classroom connection troubleshooting checklist'
      },
      {
        id: 'cse1iit-bridge-2',
        dcsArea: 'Networking',
        relevance: 'high',
        explanation:
          'Connect basic networking concepts to real school symptoms like Wi-Fi, DNS, gateway, and service access.',
        relatedDcsModuleIds: ['aplus-core1-networking-basics', 'dns-dhcp-gateway-ip-basics'],
        practicalOutput: 'Network symptom mapping sheet'
      },
      {
        id: 'cse1iit-bridge-3',
        dcsArea: 'M365 / Cloud',
        relevance: 'medium',
        explanation:
          'Understand why school web and cloud services depend on both local devices and online infrastructure.',
        relatedDcsModuleIds: ['cloud-models-saas-paas-iaas-daas'],
        practicalOutput: 'Cloud service dependency note'
      },
      {
        id: 'cse1iit-bridge-4',
        dcsArea: 'Professional Practice',
        relevance: 'medium',
        explanation:
          'Translate technical concepts into clear support language that helps others understand the issue without jargon.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        practicalOutput: 'Plain-English issue summary template'
      }
    ],
    assessmentQuestions: academicSubjectAssessments['cse1iit'],
    slgAssessmentSummary: academicAssessmentSummaries['cse1iit'],
    recommendedNextAction:
      'Review a classroom device fault and write a support note that separates hardware, network, and web symptoms.'
  },
  {
    id: 'cse1icb',
    code: 'CSE1ICB',
    title: 'Introduction to Cybersecurity',
    provider: 'La Trobe',
    track: 'RBC',
    yearLevel: 'Year 1, Semester 1',
    sourceType: 'SLG',
    sourceFileName: 'DCSPrep_SLG_SILO_Reference.md',
    summary:
      'Core cybersecurity concepts for protecting school systems, data, networks, and user accounts in a practical support role.',
    silos: [
      {
        id: 'cse1icb-s1',
        number: 1,
        text: 'Describe key emerging cybersecurity practices, regulations and standards.',
        plainEnglish:
          'Explain the basic rules and expectations that keep school systems safe and compliant.',
        practicePrompts: [
          'Describe why school account security and privacy standards matter even for simple support tasks.',
          'Name one security practice you would use when handling a suspicious report.'
        ],
        quizItems: [
          'Explain why a suspicious login email should be escalated rather than dealt with informally.',
          'List one school cybersecurity standard that affects first-line support.'
        ]
      },
      {
        id: 'cse1icb-s2',
        number: 2,
        text: 'Demonstrate foundation skills in safeguarding data, systems and networks.',
        plainEnglish:
          'Use basic safety habits to protect devices, services, and people while helping in a school environment.',
        practicePrompts: [
          'Describe how you would keep student data private when taking notes about an incident.',
          'Explain one simple network safeguard you can mention in an escalation note.'
        ],
        quizItems: [
          'Describe one way to keep a shared school device safer after a support visit.',
          'Explain why preserving evidence is important in a security incident.'
        ]
      },
      {
        id: 'cse1icb-s3',
        number: 3,
        text: 'Compare approaches for cyber risk management used to address real-world problems.',
        plainEnglish:
          'Discuss how different security responses help prevent or contain school IT incidents.',
        practicePrompts: [
          'Compare a quick safe escalation versus an improvised fix for a phishing report.',
          'Describe a low-risk first step for a suspicious device or login alert.'
        ],
        quizItems: [
          'Compare the risk of clicking a suspicious link to the risk of ignoring it.',
          'Explain why a school might choose containment over immediate correction.'
        ]
      },
      {
        id: 'cse1icb-s4',
        number: 4,
        text: 'Identify approaches to digital forensics, application security and network security in the context of cyberspace.',
        plainEnglish:
          'Recognise when a support problem is a suspicious incident, not a normal fault, and where to send it next.',
        practicePrompts: [
          'Explain when a suspicious email becomes a formal security incident.',
          'Describe how a network security concern should be reported rather than fixed immediately.'
        ],
        quizItems: [
          'Identify one sign that a problem may need security review instead of routine support.',
          'Explain why live incident handling should avoid preserving sensitive detail in a personal tool.'
        ]
      },
      {
        id: 'cse1icb-s5',
        number: 5,
        text: 'Show understanding of data security, web security and cryptography and possible solutions to cyber threats.',
        plainEnglish:
          'Understand why protecting data, web access, and passwords matters, even if you are not the one building the technology.',
        practicePrompts: [
          'Describe how password hygiene helps protect school accounts.',
          'Explain why a suspicious website link should never be opened from a classroom device.'
        ],
        quizItems: [
          'Explain one practical way to protect school account credentials.',
          'Describe why a suspicious link can be more dangerous than a broken website.'
        ]
      }
    ],
    dcsBridges: [
      {
        id: 'cse1icb-bridge-1',
        dcsArea: 'Cybersecurity',
        relevance: 'high',
        explanation:
          'This subject maps directly to phishing triage, suspicious login handling, and data protection in school support.',
        relatedDcsModuleIds: ['rbc-cse1icb-cybersecurity-awareness', 'ticket-notes-escalation-quality'],
        practicalOutput: 'Suspicious email triage checklist'
      },
      {
        id: 'cse1icb-bridge-2',
        dcsArea: 'Professional Practice',
        relevance: 'high',
        explanation:
          'It supports ethical incident reporting, privacy-safe notes, and escalation judgment.',
        relatedDcsModuleIds: ['rbc-cse3pe-professional-practice', 'ticket-notes-escalation-quality'],
        practicalOutput: 'Privacy-safe security incident note template'
      },
      {
        id: 'cse1icb-bridge-3',
        dcsArea: 'M365 / Cloud',
        relevance: 'medium',
        explanation:
          'Security awareness helps evaluate cloud account alerts, Teams visibility issues, and school identity risks.',
        relatedDcsModuleIds: ['m365-identity-offboarding-basics'],
        practicalOutput: 'Cloud account suspicion checklist'
      }
    ],
    assessmentQuestions: academicSubjectAssessments['cse1icb'],
    slgAssessmentSummary: academicAssessmentSummaries['cse1icb'],
    recommendedNextAction:
      'Review an example suspicious email and write a privacy-safe escalation note with the right scope and evidence.'
  },
  {
    id: 'cse1pe',
    code: 'CSE1PE',
    title: 'Programming Environment',
    provider: 'La Trobe',
    track: 'RBC',
    yearLevel: 'Year 1, Semester 1',
    sourceType: 'SLG',
    sourceFileName: 'DCSPrep_SLG_SILO_Reference.md',
    summary:
      'Fundamental programming thinking for reading automation, understanding script logic, and using simple helper tools safely in school IT work.',
    silos: [
      {
        id: 'cse1pe-s1',
        number: 1,
        text: 'Analyse a data processing problem to correctly identify both the data and high-level processing involved.',
        plainEnglish:
          'Understand what information a script needs and what it is meant to do before you look at the code.',
        practicePrompts: [
          'Read a simple device update script and describe what data it reads and what it changes.',
          'Explain in plain language what a batch process is doing.'
        ],
        quizItems: [
          'Describe the input, processing, and output for a simple automation task.',
          'Explain why it matters to identify data before running a script.'
        ]
      },
      {
        id: 'cse1pe-s2',
        number: 2,
        text: 'Apply the 3 basic programming constructs of sequence, selection, and iteration to design computational solutions.',
        plainEnglish:
          'Recognise step-by-step actions, condition-based choices, and repeated loops in a script or automation workflow.',
        practicePrompts: [
          'Explain whether a script is doing the same action each time or choosing different paths based on a condition.',
          'Describe one example of a repeated task in school IT support.'
        ],
        quizItems: [
          'Identify sequence, selection, or iteration in a simple automation description.',
          'Explain why repeated tasks are useful to automate carefully.'
        ]
      },
      {
        id: 'cse1pe-s3',
        number: 3,
        text: 'Use basic data structures such as lists and dictionaries to solve batch data processing problems.',
        plainEnglish:
          'Understand that scripts often work through lists of devices, accounts, or settings in a table-like way.',
        practicePrompts: [
          'Describe how a script might update many student devices using a list of names or IDs.',
          'Explain what a dictionary is in simple terms and why it is useful.'
        ],
        quizItems: [
          'Describe a list-like structure in a support automation task.',
          'Explain why a script might use key-value pairs when updating settings.'
        ]
      },
      {
        id: 'cse1pe-s4',
        number: 4,
        text: 'Implement executable code in the Python programming language to solve computational problems.',
        plainEnglish:
          'Build confidence reading Python-style examples, even if you do not run them yourself, so you can recognise automation intent.',
        practicePrompts: [
          'Read a short Python-like snippet and explain the outcome in plain English.',
          'Identify whether a helper script is designed to fix a device, collect logs, or update a list of settings.'
        ],
        quizItems: [
          'Explain what a short Python example is doing without referring to language-specific syntax.',
          'Describe the safe way to handle a script you were asked to run on school devices.'
        ]
      }
    ],
    dcsBridges: [
      {
        id: 'cse1pe-bridge-1',
        dcsArea: 'Programming / Automation',
        relevance: 'high',
        explanation:
          'This subject builds the core logic and script-reading skills needed to understand automation safely in a school environment.',
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness'],
        practicalOutput: 'Automation safety review checklist'
      },
      {
        id: 'cse1pe-bridge-2',
        dcsArea: 'DCS Level 1 Support',
        relevance: 'medium',
        explanation:
          'It helps first-line staff recognise when a request involves automation and whether it needs review or escalation.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        practicalOutput: 'Safe script request note'
      },
      {
        id: 'cse1pe-bridge-3',
        dcsArea: 'Professional Practice',
        relevance: 'medium',
        explanation:
          'It supports safer decision-making around running code on school devices and respecting approvals.',
        relatedDcsModuleIds: ['rbc-cse3pe-professional-practice'],
        practicalOutput: 'Automation approval checklist'
      }
    ],
    assessmentQuestions: academicSubjectAssessments['cse1pe'],
    slgAssessmentSummary: academicAssessmentSummaries['cse1pe'],
    assessmentSections: [
      {
        id: 'cse1pe-assess-weekly',
        title: 'Weekly topic checks',
        timing: 'Weeks 1-12',
        purpose: 'Check that each programming concept can be explained in school IT support language.',
        tasks: [
          'Complete the integrated prompt in each weekly topic box.',
          'Link the answer to at least one CSE1PE SILO.',
          'Write one DCS support example that uses the concept safely.'
        ],
        rubric: [
          'Identifies the programming concept correctly.',
          'Explains the concept in plain English.',
          'Connects the concept to school IT support or automation risk.',
          'Avoids unsafe advice such as running unknown scripts on production devices.'
        ],
        relatedWeekIds: [
          'cse1pe-w1',
          'cse1pe-w2',
          'cse1pe-w3',
          'cse1pe-w4',
          'cse1pe-w5',
          'cse1pe-w6',
          'cse1pe-w7',
          'cse1pe-w8',
          'cse1pe-w9',
          'cse1pe-w10',
          'cse1pe-w11',
          'cse1pe-w12'
        ]
      },
      {
        id: 'cse1pe-assess-lab',
        title: 'Lab and coding evidence',
        timing: 'During weekly lab/coding exercise work',
        purpose: 'Capture evidence that the weekly concept can be applied to a small task or automation example.',
        tasks: [
          'Summarise the lab task in input-process-output form.',
          'Identify sequence, selection, iteration, data structure, file, module, or error-handling concepts as relevant.',
          'Record a privacy-safe reflection about what would need approval before using a similar script at DCS.'
        ],
        rubric: [
          'Names the input, processing, and output.',
          'Names the relevant programming construct.',
          'Explains test evidence or expected behaviour.',
          'Separates learning notes from live school-system changes.'
        ],
        relatedWeekIds: ['cse1pe-w1', 'cse1pe-w2', 'cse1pe-w3', 'cse1pe-w4', 'cse1pe-w5', 'cse1pe-w6', 'cse1pe-w7', 'cse1pe-w8', 'cse1pe-w9']
      },
      {
        id: 'cse1pe-assess-assignment-readiness',
        title: 'Programming assignment readiness',
        timing: 'Week 8 onward',
        purpose: 'Prepare for the programming assignment release by checking debugging, structure, and documentation habits.',
        tasks: [
          'Use Week 8 error-handling content to describe how you would diagnose a script fault.',
          'Use Week 10 structure/documentation content to explain how another support person could understand the code.',
          'Use Week 11 algorithm design content to compare two possible solution paths.'
        ],
        rubric: [
          'Shows a clear debugging process.',
          'Uses readable structure and naming language.',
          'Compares solution choices instead of guessing.',
          'States what evidence would be needed before running code on school systems.'
        ],
        relatedWeekIds: ['cse1pe-w8', 'cse1pe-w10', 'cse1pe-w11']
      }
    ],
    weeklyModules: [
      {
        id: 'cse1pe-w1',
        week: 1,
        topicNumber: 1,
        dateLabel: '03/03/2025',
        title: 'Algorithms and Flowcharts',
        deliveryMode: 'Lecture; Lab; Coding exercise',
        contactHours: '2',
        sourceDetail: 'Session 1, Week 1, 03/03/2025: Algorithms and Flowcharts (Lecture; Lab; Coding exercise), 2 hours.',
        summary:
          'Introduce algorithms as ordered problem-solving steps and flowcharts as a visual way to describe decisions before code is written.',
        dcsPrepFocus:
          'Turn a support process, such as checking a classroom laptop, into a simple decision flow before changing settings.',
        linkedSiloIds: ['cse1pe-s1', 'cse1pe-s2'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading', 'ticket-notes-escalation-quality'],
        relatedScenarioIds: ['rbc-script-readiness-logic'],
        resources: [
          {
            id: 'cse1pe-w1-r1',
            title: 'Mermaid flowchart syntax',
            provider: 'Mermaid',
            url: 'https://mermaid.js.org/syntax/flowchart.html',
            description: 'Use text-based flowcharts to sketch algorithm and support-process decisions.'
          },
          {
            id: 'cse1pe-w1-r2',
            title: 'The Python Tutorial',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/index.html',
            description: 'Official Python tutorial index for beginner-friendly reference while moving from algorithm to code.'
          }
        ],
        assessment: {
          id: 'cse1pe-w1-a1',
          title: 'Flowchart a support decision',
          prompt:
            'Create a short flowchart or ordered algorithm for "classroom laptop cannot open a school website" and identify the input, decision points, and output.',
          questionType: 'practical-output',
          rubric: ['Has a clear start and end', 'Includes at least two decision points', 'Separates device, network, and web-service checks', 'Keeps actions safe and reversible'],
          evidenceOutput: 'A flowchart or numbered algorithm for a DCS support task.'
        }
      },
      {
        id: 'cse1pe-w2',
        week: 2,
        topicNumber: 2,
        title: 'Statements and Expressions',
        deliveryMode: 'Lecture; Lab; Coding exercise',
        sourceDetail: 'Week 2: Statements and Expressions.',
        summary:
          'Learn how a program expresses values, calculations, assignments, and actions in small executable steps.',
        dcsPrepFocus:
          'Read simple script lines and separate values being checked from actions that change school devices or data.',
        linkedSiloIds: ['cse1pe-s1', 'cse1pe-s4'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading'],
        relatedScenarioIds: ['rbc-script-readiness-logic'],
        resources: [
          {
            id: 'cse1pe-w2-r1',
            title: 'An Informal Introduction to Python',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/introduction.html',
            description: 'Official reference for basic Python values, text, lists, and first programming steps.'
          }
        ],
        assessment: {
          id: 'cse1pe-w2-a1',
          title: 'Read a script line safely',
          prompt:
            'Given a simple line such as `status = device["wifi"]`, explain what value is being stored and why that matters before running automation.',
          questionType: 'short-answer',
          rubric: ['Identifies the assigned value', 'Explains the source data', 'States whether the line reads or changes data', 'Connects the answer to safe script review'],
          evidenceOutput: 'A plain-English explanation of one expression or assignment.'
        }
      },
      {
        id: 'cse1pe-w3',
        week: 3,
        topicNumber: 3,
        title: 'Booleans and Conditional Execution',
        deliveryMode: 'Lecture; Lab; Coding exercise',
        sourceDetail: 'Week 3: Booleans and Conditional Execution.',
        summary:
          'Use true/false values and if/else decisions to choose different actions based on conditions.',
        dcsPrepFocus:
          'Understand how a script decides whether to skip, report, or change a device based on a condition.',
        linkedSiloIds: ['cse1pe-s2', 'cse1pe-s4'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading'],
        relatedScenarioIds: ['rbc-script-readiness-logic'],
        resources: [
          {
            id: 'cse1pe-w3-r1',
            title: 'Python if statements',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/controlflow.html#if-statements',
            description: 'Official Python tutorial section on conditional execution.'
          }
        ],
        assessment: {
          id: 'cse1pe-w3-a1',
          title: 'Explain an if/else support rule',
          prompt:
            'Write an if/else rule for "if the device is on guest Wi-Fi, do not install internal printers; otherwise continue normal printer checks."',
          questionType: 'practical-output',
          rubric: ['Uses a true/false condition', 'Has a safe branch for guest Wi-Fi', 'Has a normal branch', 'Explains why the condition protects the school network'],
          evidenceOutput: 'A short conditional rule written in plain English or pseudocode.'
        }
      },
      {
        id: 'cse1pe-w4',
        week: 4,
        topicNumber: 4,
        title: 'Iteration',
        deliveryMode: 'Lecture; Lab; Coding exercise',
        sourceDetail: 'Week 4: Iteration. Mid-semester break follows in the SLG reference.',
        summary:
          'Use loops to repeat checks or actions over items such as files, devices, users, or records.',
        dcsPrepFocus:
          'Notice when automation will affect many devices or accounts, and check the target list before any production action.',
        linkedSiloIds: ['cse1pe-s2', 'cse1pe-s3'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading'],
        relatedScenarioIds: ['rbc-script-readiness-logic'],
        resources: [
          {
            id: 'cse1pe-w4-r1',
            title: 'Python for statements and range',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/controlflow.html#for-statements',
            description: 'Official Python tutorial section on looping through sequences.'
          }
        ],
        assessment: {
          id: 'cse1pe-w4-a1',
          title: 'Loop blast-radius check',
          prompt:
            'A script loops through every device in a list and removes an old setting. What must Josh confirm before this is approved or escalated?',
          questionType: 'scenario-response',
          rubric: ['Mentions the target list', 'Mentions what changes', 'Mentions test or dry-run evidence', 'Mentions rollback or escalation'],
          evidenceOutput: 'A loop safety checklist for automation that touches multiple devices.'
        }
      },
      {
        id: 'cse1pe-w5',
        week: 5,
        topicNumber: 5,
        title: 'Functions and Objects',
        deliveryMode: 'Lecture; Lab; Coding exercise',
        sourceDetail: 'Week 5: Functions and Objects.',
        summary:
          'Package repeatable actions into functions and recognise objects as bundles of data and behaviour.',
        dcsPrepFocus:
          'Read function names as clues about intent, and treat device/account objects as structured records with properties.',
        linkedSiloIds: ['cse1pe-s2', 'cse1pe-s4'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading'],
        resources: [
          {
            id: 'cse1pe-w5-r1',
            title: 'Python defining functions',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
            description: 'Official Python tutorial section on defining repeatable functions.'
          },
          {
            id: 'cse1pe-w5-r2',
            title: 'Python classes',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/classes.html',
            description: 'Official Python tutorial section for object concepts.'
          }
        ],
        assessment: {
          id: 'cse1pe-w5-a1',
          title: 'Function intent review',
          prompt:
            'Given a function called `disable_inactive_accounts(accounts)`, explain what input it probably expects, what it might change, and why approval matters.',
          questionType: 'short-answer',
          rubric: ['Identifies expected input', 'Infers likely change', 'Names access/privacy risk', 'States approval or escalation need'],
          evidenceOutput: 'A plain-English function review note.'
        }
      },
      {
        id: 'cse1pe-w6',
        week: 6,
        topicNumber: 6,
        title: 'Strings and Files',
        deliveryMode: 'Lecture; Lab; Coding exercise',
        sourceDetail: 'Week 6: Strings and Files.',
        summary:
          'Work with text and files, including reading, writing, formatting, and preserving content safely.',
        dcsPrepFocus:
          'Understand log files, CSV exports, usernames, paths, and why scripts that write files need care.',
        linkedSiloIds: ['cse1pe-s1', 'cse1pe-s4'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'ticket-notes-escalation-quality'],
        resources: [
          {
            id: 'cse1pe-w6-r1',
            title: 'Python input and output',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/inputoutput.html',
            description: 'Official Python tutorial section on formatted output and reading/writing files.'
          }
        ],
        assessment: {
          id: 'cse1pe-w6-a1',
          title: 'File handling risk note',
          prompt:
            'A script writes a report file from student device data. What should be checked before saving or sharing the output?',
          questionType: 'scenario-response',
          rubric: ['Mentions file location', 'Mentions sensitive data', 'Mentions authorised storage/sharing', 'Mentions checking the output before distribution'],
          evidenceOutput: 'A privacy-safe file output review note.'
        }
      },
      {
        id: 'cse1pe-w7',
        week: 7,
        topicNumber: 7,
        title: 'Data Structures',
        deliveryMode: 'Lecture; Lab; Coding exercise',
        sourceDetail: 'Week 7: Data Structures.',
        summary:
          'Use lists, dictionaries, sets, tuples, and related structures to organise data for processing.',
        dcsPrepFocus:
          'Recognise device lists, account dictionaries, lookup tables, and status mappings in school automation.',
        linkedSiloIds: ['cse1pe-s3', 'cse1pe-s4'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading'],
        resources: [
          {
            id: 'cse1pe-w7-r1',
            title: 'Python data structures',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/datastructures.html',
            description: 'Official Python tutorial section covering lists, dictionaries, sets, and looping techniques.'
          }
        ],
        assessment: {
          id: 'cse1pe-w7-a1',
          title: 'Choose the right structure',
          prompt:
            'Explain whether a list or dictionary is a better fit for storing device names and their assigned rooms, and why.',
          questionType: 'short-answer',
          rubric: ['Identifies list versus dictionary use', 'Explains key-value mapping', 'Connects structure to support lookup', 'Uses clear school IT language'],
          evidenceOutput: 'A data-structure choice explanation.'
        }
      },
      {
        id: 'cse1pe-w8',
        week: 8,
        topicNumber: 8,
        title: 'Software Errors',
        deliveryMode: 'Lecture; Lab; Coding exercise',
        sourceDetail: 'Week 8: Software Errors. Programming assignment released.',
        summary:
          'Identify syntax errors, runtime exceptions, and debugging evidence that helps explain why code failed.',
        dcsPrepFocus:
          'Capture the exact error, action taken, affected data, and safe reproduction path before escalating a script issue.',
        linkedSiloIds: ['cse1pe-s1', 'cse1pe-s4'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading', 'ticket-notes-escalation-quality'],
        relatedScenarioIds: ['rbc-script-readiness-logic'],
        resources: [
          {
            id: 'cse1pe-w8-r1',
            title: 'Python errors and exceptions',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/errors.html',
            description: 'Official Python tutorial section on syntax errors, exceptions, and handling failures.'
          }
        ],
        assessment: {
          id: 'cse1pe-w8-a1',
          title: 'Debugging escalation note',
          prompt:
            'Write a note for a failed automation run that includes the error, when it happened, what input was used, and what should happen next.',
          questionType: 'practical-output',
          rubric: ['Includes exact error or symptom', 'Includes timing and input/context', 'Includes safe steps already tried', 'States escalation or next review path'],
          evidenceOutput: 'A debugging escalation note template.'
        }
      },
      {
        id: 'cse1pe-w9',
        week: 9,
        topicNumber: 9,
        title: 'Using Modules',
        deliveryMode: 'Lecture; Lab; Coding exercise',
        sourceDetail: 'Week 9: Using Modules.',
        summary:
          'Use imported code and libraries to reuse existing functionality rather than writing everything from scratch.',
        dcsPrepFocus:
          'Check where a script dependency comes from and whether it is trusted before running automation on school systems.',
        linkedSiloIds: ['cse1pe-s4'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading'],
        resources: [
          {
            id: 'cse1pe-w9-r1',
            title: 'Python modules',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/modules.html',
            description: 'Official Python tutorial section on importing and using modules.'
          }
        ],
        assessment: {
          id: 'cse1pe-w9-a1',
          title: 'Dependency trust check',
          prompt:
            'A script imports a module you do not recognise. What should you check before recommending that it be run?',
          questionType: 'scenario-response',
          rubric: ['Mentions source/trust of the module', 'Mentions installed environment', 'Mentions change impact', 'Escalates if uncertain'],
          evidenceOutput: 'A dependency review checklist.'
        }
      },
      {
        id: 'cse1pe-w10',
        week: 10,
        topicNumber: 10,
        title: 'Structuring and Documenting Code',
        deliveryMode: 'Lecture; Lab; Coding exercise',
        sourceDetail: 'Week 10: Structuring and Documenting Code.',
        summary:
          'Organise code and comments so another person can understand the intent, inputs, outputs, and safe use.',
        dcsPrepFocus:
          'Write notes that help another support person understand what an automation does and what it must not do.',
        linkedSiloIds: ['cse1pe-s1', 'cse1pe-s4'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'ticket-notes-escalation-quality'],
        resources: [
          {
            id: 'cse1pe-w10-r1',
            title: 'Python coding style',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/controlflow.html#intermezzo-coding-style',
            description: 'Official Python tutorial section that introduces readable coding style.'
          },
          {
            id: 'cse1pe-w10-r2',
            title: 'PEP 8 style guide',
            provider: 'Python Enhancement Proposals',
            url: 'https://peps.python.org/pep-0008/',
            description: 'Official Python style guide for readable, maintainable Python code.'
          }
        ],
        assessment: {
          id: 'cse1pe-w10-a1',
          title: 'Document a support script',
          prompt:
            'Write a header note for a script that states purpose, owner, input data, output, safe test method, and escalation owner.',
          questionType: 'practical-output',
          rubric: ['States purpose', 'Names owner or approval path', 'Names input/output', 'Includes test or rollback note'],
          evidenceOutput: 'A script header/documentation template.'
        }
      },
      {
        id: 'cse1pe-w11',
        week: 11,
        topicNumber: 11,
        title: 'Algorithm Design Strategies',
        deliveryMode: 'Lecture; Lab; Coding exercise',
        sourceDetail: 'Week 11: Algorithm Design Strategies.',
        summary:
          'Compare different ways to solve a problem and choose a clear, testable, low-risk path.',
        dcsPrepFocus:
          'Choose the simplest safe troubleshooting or automation path before trying broad changes.',
        linkedSiloIds: ['cse1pe-s1', 'cse1pe-s2'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'aplus-core1-troubleshooting'],
        resources: [
          {
            id: 'cse1pe-w11-r1',
            title: 'Python control flow tools',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/controlflow.html',
            description: 'Official Python reference for control-flow structures used in algorithm design.'
          }
        ],
        assessment: {
          id: 'cse1pe-w11-a1',
          title: 'Compare two solution paths',
          prompt:
            'Compare two approaches to collecting device status: manually checking each device versus running a report-only script. Which is safer first, and what evidence is needed?',
          questionType: 'scenario-response',
          rubric: ['Compares two paths', 'Mentions safety and scope', 'Mentions evidence needed', 'Chooses a practical next step'],
          evidenceOutput: 'A solution-comparison note.'
        }
      },
      {
        id: 'cse1pe-w12',
        week: 12,
        topicNumber: 12,
        title: 'Revision',
        deliveryMode: 'Lecture; Lab; Revision',
        sourceDetail: 'Week 12: Revision.',
        summary:
          'Review programming foundations and connect them back to SILOs, lab evidence, assignment readiness, and DCS support use.',
        dcsPrepFocus:
          'Build a final evidence summary showing how programming concepts improve safe automation and escalation judgement.',
        linkedSiloIds: ['cse1pe-s1', 'cse1pe-s2', 'cse1pe-s3', 'cse1pe-s4'],
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading', 'ticket-notes-escalation-quality'],
        resources: [
          {
            id: 'cse1pe-w12-r1',
            title: 'Python tutorial overview',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/index.html',
            description: 'Official Python tutorial index for revision across syntax, flow, data structures, files, errors, and modules.'
          }
        ],
        assessment: {
          id: 'cse1pe-w12-a1',
          title: 'CSE1PE evidence summary',
          prompt:
            'Write a one-page summary connecting input-process-output, sequence/selection/iteration, data structures, errors, modules, and documentation to one DCS automation scenario.',
          questionType: 'reflection',
          rubric: ['References all major CSE1PE concepts', 'Uses one coherent DCS scenario', 'Includes safety and approval boundaries', 'Links reflection to at least two SILOs'],
          evidenceOutput: 'A CSE1PE-to-DCS revision evidence note.'
        }
      }
    ],
    recommendedNextAction:
      'Review a simple automation example and write a safe first-line question before running it.'
  },
  {
    id: 'sta1dct',
    code: 'STA1DCT',
    title: 'Data-Based Critical Thinking',
    provider: 'La Trobe',
    track: 'RBC',
    yearLevel: 'Year 1, Semester 1',
    sourceType: 'SLG',
    sourceFileName: 'DCSPrep_SLG_SILO_Reference.md',
    summary:
      'Develop skills to read data carefully, judge evidence, and make better decisions from school IT metrics and reports.',
    silos: [
      {
        id: 'sta1dct-s1',
        number: 1,
        text: 'Critique data-based conclusions that are reported in the media and similar outlets.',
        plainEnglish:
          'Recognise when a report or dashboard is making a claim that is too broad or unsupported.',
        practicePrompts: [
          'Review a school usage report and note which claims are backed by data and which are not.',
          'Explain why a single spike in a dashboard may not prove a real outage.'
        ],
        quizItems: [
          'Identify one reason why a report can be misleading.',
          'Explain why you should ask for the data source before accepting a claim.'
        ]
      },
      {
        id: 'sta1dct-s2',
        number: 2,
        text: 'Interpret/derive simple numeric and graphical statistical summary measures of data.',
        plainEnglish:
          'Use basic numbers and charts to understand what is really happening in school IT data.',
        practicePrompts: [
          'Explain whether a graph showing “more errors today” is actually meaningful.',
          'Describe what a percentage or average means for a support metric.'
        ],
        quizItems: [
          'Interpret a simple chart showing incident counts over time.',
          'Explain why an average alone may not tell the whole story.'
        ]
      },
      {
        id: 'sta1dct-s3',
        number: 3,
        text: 'Calculate probabilities in a variety of scenarios that may be used for informed decision making.',
        plainEnglish:
          'Use simple likelihood thinking to judge whether a fault is likely to repeat or if a report is a one-off.',
        practicePrompts: [
          'Estimate how likely a classroom issue will happen again this week based on past data.',
          'Describe whether one error message means the whole system is likely to fail.',
        ],
        quizItems: [
          'Explain the difference between “possible” and “likely.”',
          'Describe a simple way to judge whether an issue is common or rare.'
        ]
      },
      {
        id: 'sta1dct-s4',
        number: 4,
        text: 'Identify and discuss common misconceptions of probability that can lead to poor decisions.',
        plainEnglish:
          'Avoid jumping to conclusions from a few data points or a single metric.',
        practicePrompts: [
          'Explain why you should not assume a single report means the whole school is affected.',
          'Describe one common data misconception in school IT support.',
        ],
        quizItems: [
          'Explain why a few incidents do not always mean a system is unreliable.',
          'Identify a misleading interpretation of a dashboard spike.'
        ]
      }
    ],
    dcsBridges: [
      {
        id: 'sta1dct-bridge-1',
        dcsArea: 'Data / Reporting',
        relevance: 'high',
        explanation:
          'Helps school IT staff read dashboards and reports more carefully and avoid bad assumptions from incomplete data.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        practicalOutput: 'Support data interpretation guide'
      },
      {
        id: 'sta1dct-bridge-2',
        dcsArea: 'Professional Practice',
        relevance: 'medium',
        explanation:
          'Supports better decision-making and communication about risk and evidence.',
        relatedDcsModuleIds: ['rbc-cse3pe-professional-practice'],
        practicalOutput: 'Evidence-based note template'
      },
      {
        id: 'sta1dct-bridge-3',
        dcsArea: 'DCS Level 1 Support',
        relevance: 'medium',
        explanation:
          'Improves the quality of escalations and follow-up by grounding them in real evidence rather than assumptions.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        practicalOutput: 'Incident evidence checklist'
      }
    ],
    assessmentQuestions: academicSubjectAssessments['sta1dct'],
    slgAssessmentSummary: academicAssessmentSummaries['sta1dct'],
    recommendedNextAction:
      'Review a school incident dashboard and note what it does and does not prove about the issue.'
  },
  {
    id: 'cse3pe',
    code: 'CSE3PE',
    title: 'Professional Environment',
    provider: 'La Trobe',
    track: 'RBC',
    yearLevel: 'Year 3',
    sourceType: 'Study Plan',
    sourceFileName: 'Study Plan example provided in conversation',
    summary:
      'Professional practice and ethics for IT support, with a focus on privacy, safe escalation, and workplace behaviour.',
    silos: [
      {
        id: 'cse3pe-s1',
        number: 1,
        text: 'Demonstrate ethical responsibility and professional conduct in IT tasks.',
        plainEnglish:
          'Understand when to escalate, how to keep sensitive information safe, and how to act professionally in a school IT role.',
        practicePrompts: [
          'Describe how you would keep a sensitive incident note private while still learning from it.',
          'Explain why professionalism matters when working with teachers and students.'
        ],
        quizItems: [
          'Explain a privacy-safe way to record a security incident.',
          'Describe one professional boundary to keep in school IT support.'
        ]
      },
      {
        id: 'cse3pe-s2',
        number: 2,
        text: 'Reflect on workplace decisions and the impact of those decisions on users and systems.',
        plainEnglish:
          'Think about how your support actions affect students, staff, and school operations.',
        practicePrompts: [
          'Reflect on a time when a quick fix could have caused more disruption later.',
          'Explain how you would balance speed with safety during class time.'
        ],
        quizItems: [
          'Describe one reason why you might pause before making a support change.',
          'Explain why impact on learning is a key part of support judgement.'
        ]
      },
      {
        id: 'cse3pe-s3',
        number: 3,
        text: 'Apply professional standards to communication, documentation, and escalation.',
        plainEnglish:
          'Use clear, respectful, and accurate language in notes and support conversations.',
        practicePrompts: [
          'Write a short escalation note that is informative and privacy-safe.',
          'Explain how to say no to an unsafe request without being unhelpful.'
        ],
        quizItems: [
          'Identify the most important detail to include in an escalation note.',
          'Explain why vague or dramatic language hurts support handoff.'
        ]
      }
    ],
    dcsBridges: [
      {
        id: 'cse3pe-bridge-1',
        dcsArea: 'Professional Practice',
        relevance: 'high',
        explanation:
          'Provides a foundation for ethical behaviour, documentation quality, and safer escalation in school IT work.',
        relatedDcsModuleIds: ['rbc-cse3pe-professional-practice', 'ticket-notes-escalation-quality'],
        practicalOutput: 'Ethical incident reflection sheet'
      },
      {
        id: 'cse3pe-bridge-2',
        dcsArea: 'Cybersecurity',
        relevance: 'medium',
        explanation:
          'Supports the safe handling of security-related incidents and privacy-sensitive events.',
        relatedDcsModuleIds: ['rbc-cse1icb-cybersecurity-awareness'],
        practicalOutput: 'Privacy-safe security incident guideline'
      },
      {
        id: 'cse3pe-bridge-3',
        dcsArea: 'DCS Level 1 Support',
        relevance: 'medium',
        explanation:
          'Strengthens the judgement needed for first-line action versus escalation.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        practicalOutput: 'Safe first-line decision checklist'
      }
    ],
    assessmentQuestions: academicSubjectAssessments['cse3pe'],
    slgAssessmentSummary: academicAssessmentSummaries['cse3pe'],
    recommendedNextAction:
      'Write a brief support note that keeps privacy safe and focuses on impact, scope, and escalation.'
  },
  {
    id: 'cse1is',
    code: 'CSE1IS',
    title: 'Information Systems',
    provider: 'La Trobe',
    track: 'RBC',
    yearLevel: 'Year 1',
    sourceType: 'SLG',
    sourceFileName: 'DCSPrep_SLG_SILO_Reference.md',
    summary:
      'Introductory systems thinking for understanding how school software and data systems are designed, implemented, and secured.',
    silos: [
      {
        id: 'cse1is-s1',
        number: 1,
        text: 'Use a generalised model of an information system to analyse and describe components of a real-life information system.',
        plainEnglish:
          'Recognise the parts of a school system: users, data, processes, and the tools that connect them.',
        practicePrompts: [
          'Sketch the main components of a school portal or student data system.',
          'Describe who uses the system, what data it holds, and what it does.'
        ],
        quizItems: [
          'Identify the key parts of a simple school information system.',
          'Explain why it is useful to name the people, data, and processes involved.'
        ]
      },
      {
        id: 'cse1is-s2',
        number: 2,
        text: 'Describe the Systems Development Life Cycle approach to developing information systems.',
        plainEnglish:
          'Understand the stages a system goes through from idea to deployment and support.',
        practicePrompts: [
          'Explain why a software change request should be captured before any development starts.',
          'Describe the support value of knowing a system’s lifecycle stage.'
        ],
        quizItems: [
          'Name one stage of the systems development lifecycle.',
          'Explain why requirements matter before building or changing a system.'
        ]
      },
      {
        id: 'cse1is-s3',
        number: 3,
        text: 'Use established fact-finding techniques to elicit information system requirements for a simple business scenario.',
        plainEnglish:
          'Ask the right questions to understand what a school system needs to do before someone starts changing it.',
        practicePrompts: [
          'List the questions you would ask before approving a new school app integration.',
          'Explain why “what problem are we solving?” is the first question.'
        ],
        quizItems: [
          'Name one fact-finding method useful in school IT change requests.',
          'Explain why missing requirements can cause support headaches later.'
        ]
      },
      {
        id: 'cse1is-s4',
        number: 4,
        text: 'Use Context and Level 0 Data Flow Diagrams and a System Dictionary to describe requirements for a simple information system.',
        plainEnglish:
          'Use simple diagrams and lists to explain how data moves through a system.',
        practicePrompts: [
          'Draw a basic flow of how student attendance data moves from a classroom device to a school system.',
          'List the main inputs and outputs of a school booking system.',
        ],
        quizItems: [
          'Describe one way to show how data moves through a school system.',
          'Explain why a data flow diagram helps with support assumptions.'
        ]
      },
      {
        id: 'cse1is-s5',
        number: 5,
        text: 'Use Entity-Relationship Diagrams to design the database for a simple information system.',
        plainEnglish:
          'Understand how data entities relate to each other in a system, like students, classes, and devices.',
        practicePrompts: [
          'Describe how student records and device records might link in a school system.',
          'Explain why relationships matter for reporting and support.'
        ],
        quizItems: [
          'Explain the idea of related data entities in simple terms.',
          'Describe why linked records matter in a school system.'
        ]
      },
      {
        id: 'cse1is-s6',
        number: 6,
        text: 'Critique the design of the user interface of a simple information system.',
        plainEnglish:
          'Evaluate whether a system is easy and safe to use for the teachers and students who depend on it.',
        practicePrompts: [
          'Note one interface issue that might cause a teacher to make a mistake.',
          'Explain why support should include usability concerns, not only technical faults.'
        ],
        quizItems: [
          'Explain one sign of a confusing user interface in support notes.',
          'Describe why a poor interface can create support tickets.'
        ]
      },
      {
        id: 'cse1is-s7',
        number: 7,
        text: 'Justify the choice of an implementation approach and security requirements for a new information system.',
        plainEnglish:
          'Understand why some system choices are safer or better for a school based on risk and requirements.',
        practicePrompts: [
          'Explain why a cloud tool might be chosen over a local application for a school system.',
          'Describe one security requirement you would expect for a student data system.',
        ],
        quizItems: [
          'Explain one good reason to choose a cloud school system.',
          'Name one security requirement that should be checked before launch.'
        ]
      }
    ],
    dcsBridges: [
      {
        id: 'cse1is-bridge-1',
        dcsArea: 'Professional Practice',
        relevance: 'high',
        explanation:
          'Helps translate system-change requests, requirements, and security considerations into support-aware notes.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        practicalOutput: 'Change request support note template'
      },
      {
        id: 'cse1is-bridge-2',
        dcsArea: 'M365 / Cloud',
        relevance: 'medium',
        explanation:
          'Builds awareness of how school systems are designed and why cloud or hybrid choices matter.',
        relatedDcsModuleIds: ['cloud-models-saas-paas-iaas-daas'],
        practicalOutput: 'System design awareness memo'
      },
      {
        id: 'cse1is-bridge-3',
        dcsArea: 'Data / Reporting',
        relevance: 'medium',
        explanation:
          'Supports better understanding of data flow and how system design affects reporting and logs.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        practicalOutput: 'Data flow summary for support'
      }
    ],
    assessmentQuestions: academicSubjectAssessments['cse1is'],
    slgAssessmentSummary: academicAssessmentSummaries['cse1is'],
    recommendedNextAction:
      'Map a simple school system in plain English and identify the support implications for data and security.'
  },
  buildAssessmentDrivenSubject('cse1oof'),
  buildAssessmentDrivenSubject('cse4002'),
  buildAssessmentDrivenSubject('cse5006'),
  buildAssessmentDrivenSubject('cse5bdc'),
  buildAssessmentDrivenSubject('cse5dl'),
  buildAssessmentDrivenSubject('cse5ml'),
  buildAssessmentDrivenSubject('cse5nlp'),
  buildAssessmentDrivenSubject('cse5cv')
];

export const academicSubjects: AcademicSubject[] = baseAcademicSubjects.map(enrichAcademicSubjectWithAssessmentPractice);

export function getAcademicSubjectByCode(code: string) {
  return academicSubjects.find((subject) => subject.code.toLowerCase() === code.toLowerCase());
}

export function getAcademicSubjectById(id: string) {
  return academicSubjects.find((subject) => subject.id === id);
}
