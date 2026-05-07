import type { SlgAssessmentSummary } from '../types/academic';

export const academicAssessmentSummaries: Record<string, SlgAssessmentSummary> = {
  cse1iit: {
    subjectCode: 'CSE1IIT',
    sourceLabel: '2023 CSE1IIT Bendigo SLG',
    sourceNote: 'The extracted table has layout artefacts around the weekly LMS tasks row; weights and task names are preserved from the SLG.',
    hurdleSummary: 'No hurdle requirements listed in the extracted SLG section.',
    tasks: [
      {
        id: 'cse1iit-early-term-test',
        timing: 'End of Week 4',
        dueDate: 'Early term test at the end of Week 4',
        weight: 15,
        assessmentType: 'Quizzes on Information Technology',
        sourceCriteria: ['Information technology quiz coverage'],
        feedbackMethod: 'LMS',
        silosAssessed: ['1', '2'],
        dcsPrepIntegration: 'Use as a Week 4 readiness checkpoint for device, hardware, network, and web fundamentals.',
        relatedDcsModuleIds: ['rbc-cse1iit-hardware-network-web-basics', 'aplus-core1-hardware-fundamentals'],
        evidenceOutput: 'Short diagnostic quiz attempt plus a hardware/network support note.'
      },
      {
        id: 'cse1iit-end-term-test',
        timing: 'End of Week 11 or 12',
        dueDate: 'End-of-term test at the end of Week 11 or 12',
        weight: 25,
        assessmentType: 'Quizzes on Information Technology',
        sourceCriteria: ['Information technology quiz coverage across hardware, networks, web, and problem solving'],
        feedbackMethod: 'LMS',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Use as a cumulative subject check before revision and evidence-pack reflection.',
        relatedDcsModuleIds: ['rbc-cse1iit-hardware-network-web-basics', 'dns-dhcp-gateway-ip-basics', 'cloud-models-saas-paas-iaas-daas'],
        evidenceOutput: 'End-term concept checklist with weak areas tagged for review.'
      },
      {
        id: 'cse1iit-web-design-assignment',
        timing: 'TBA',
        dueDate: 'TBA',
        weight: 20,
        assessmentType: 'Web Design assignment',
        sourceCriteria: ['Apply internet, web, and HTML knowledge', 'Solve a practical information technology problem'],
        feedbackMethod: 'LMS',
        silosAssessed: ['3', '4'],
        dcsPrepIntegration: 'Convert into a school web-system awareness task: identify page, link, browser, service, and support risks.',
        relatedDcsModuleIds: ['rbc-cse1iit-hardware-network-web-basics', 'cloud-models-saas-paas-iaas-daas'],
        evidenceOutput: 'A simple web-system support map for a school portal or intranet.'
      },
      {
        id: 'cse1iit-weekly-lms-tasks',
        timing: 'Weekly',
        dueDate: 'Weekly',
        weight: 20,
        assessmentType: 'Weekly LMS Tasks',
        sourceCriteria: ['Ongoing LMS learning tasks'],
        feedbackMethod: 'LMS',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Use each weekly topic box as a small retrieval and support-application task.',
        relatedDcsModuleIds: ['rbc-cse1iit-hardware-network-web-basics', 'ticket-notes-escalation-quality'],
        evidenceOutput: 'Weekly topic completion note linked to the relevant DCS support module.'
      },
      {
        id: 'cse1iit-exam',
        timing: 'Exam period',
        dueDate: 'Exam period',
        weight: 20,
        assessmentType: 'Exam',
        sourceCriteria: ['Final examination coverage'],
        feedbackMethod: 'Final result',
        silosAssessed: ['2', '3', '4'],
        dcsPrepIntegration: 'Use as final revision across digital age, web, and real-world IT problem solving.',
        relatedDcsModuleIds: ['rbc-cse1iit-hardware-network-web-basics', 'aplus-core1-networking-basics'],
        evidenceOutput: 'Final revision summary of IT fundamentals applied to school support.'
      }
    ]
  },
  cse1icb: {
    subjectCode: 'CSE1ICB',
    sourceLabel: '2023 CSE1ICB Bendigo/Bundoora SLG',
    lmsRubricNote: 'Detailed instructions and rubrics are in the LMS two weeks before classes commence.',
    hurdleSummary: 'Achieve at least 50% in internal assessments.',
    tasks: [
      {
        id: 'cse1icb-week5-quiz',
        timing: 'Week 5',
        dueDate: 'Week 5',
        weight: 10,
        assessmentType: 'Quiz',
        sourceCriteria: ['None listed in summary table'],
        feedbackMethod: 'LMS/quiz feedback',
        silosAssessed: ['1'],
        dcsPrepIntegration: 'Use as an early cybersecurity vocabulary and standards check.',
        relatedDcsModuleIds: ['rbc-cse1icb-cybersecurity-awareness'],
        evidenceOutput: 'Short quiz review on cybersecurity practices, standards, and school risk language.'
      },
      {
        id: 'cse1icb-week6-written',
        timing: 'Week 6',
        dueDate: 'Week 6',
        weight: 20,
        assessmentType: 'Written Assignment',
        sourceCriteria: ['Malware analysis', 'Network simulation'],
        feedbackMethod: 'Written',
        silosAssessed: ['1', '2'],
        dcsPrepIntegration: 'Translate into a safe first-line malware/network incident triage exercise.',
        relatedDcsModuleIds: ['rbc-cse1icb-cybersecurity-awareness', 'vlans-network-segmentation'],
        evidenceOutput: 'Privacy-safe malware/network simulation incident note.'
      },
      {
        id: 'cse1icb-week10-written',
        timing: 'Week 10',
        dueDate: 'Week 10',
        weight: 20,
        assessmentType: 'Written Assignment',
        sourceCriteria: ['Data breach analysis', 'Network simulation'],
        feedbackMethod: 'Written',
        silosAssessed: ['1', '2', '3'],
        dcsPrepIntegration: 'Use as a data-breach scenario response with escalation, containment, and school-data boundaries.',
        relatedDcsModuleIds: ['rbc-cse1icb-cybersecurity-awareness', 'rbc-cse3pe-professional-practice'],
        evidenceOutput: 'Data-breach scenario analysis with safe DCS escalation language.'
      },
      {
        id: 'cse1icb-week12-quiz',
        timing: 'Week 12',
        dueDate: 'Week 12',
        weight: 10,
        assessmentType: 'Quiz',
        sourceCriteria: ['None listed in summary table'],
        feedbackMethod: 'LMS/quiz feedback',
        silosAssessed: ['1', '2', '3', '4', '5'],
        dcsPrepIntegration: 'Use as a final cyber-awareness check across data, web, cryptography, forensics, and network security awareness.',
        relatedDcsModuleIds: ['rbc-cse1icb-cybersecurity-awareness'],
        evidenceOutput: 'Final cybersecurity readiness quiz reflection.'
      }
    ]
  },
  cse1pe: {
    subjectCode: 'CSE1PE',
    sourceLabel: '2023 CSE1PE Bendigo SLG',
    lmsRubricNote: 'Detailed instructions and rubrics are in the LMS two weeks before classes commence.',
    hurdleSummary: 'No hurdle requirements listed in the extracted SLG section.',
    tasks: [
      {
        id: 'cse1pe-weekly-coding-exercises',
        timing: 'Weeks 1-8',
        dueDate: 'Before next week',
        weight: 10,
        assessmentType: 'Eight weekly coding exercises',
        sourceCriteria: ['Solutions automatically evaluated using hidden test cases', 'Total mark calculated from top five individual exercises'],
        feedbackMethod: 'Immediate feedback in the online tool',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Use each weekly topic box as a coding-logic and safe automation review exercise.',
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading'],
        evidenceOutput: 'Weekly coding exercise reflection with hidden-test failure lessons translated to DCS automation safety.'
      },
      {
        id: 'cse1pe-programming-assignment',
        timing: 'Week 8',
        dueDate: '12 May',
        weight: 40,
        assessmentType: 'Programming assignment',
        sourceCriteria: ['Solutions manually marked according to how well they satisfy task requirements'],
        feedbackMethod: 'Comprehensive mark breakdown within three weeks',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Turn into a larger automation-readiness artifact: input-process-output, tests, documentation, and safe-run boundaries.',
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading', 'ticket-notes-escalation-quality'],
        evidenceOutput: 'Programming assignment readiness checklist and code-review reflection.'
      },
      {
        id: 'cse1pe-final-exam',
        timing: 'Final assessment period',
        dueDate: 'TBA',
        weight: 50,
        assessmentType: '2-hour final examination',
        sourceCriteria: ['Demonstration of understanding across all subject topics taught throughout the semester'],
        feedbackMethod: 'Final mark as reported by the university',
        silosAssessed: ['1', '2', '3'],
        dcsPrepIntegration: 'Use as cumulative revision across algorithms, flow, data structures, files, modules, and error handling.',
        relatedDcsModuleIds: ['rbc-cse1pe-programming-readiness', 'rbc-scripting-code-reading'],
        evidenceOutput: 'Final CSE1PE revision evidence note connected to one school automation scenario.'
      }
    ]
  },
  sta1dct: {
    subjectCode: 'STA1DCT',
    sourceLabel: '2023 STA1DCT Bendigo/Bundoora SLG',
    tasks: [
      {
        id: 'sta1dct-exam',
        timing: 'Official first semester exam period',
        dueDate: 'Official first semester exam period',
        weight: 60,
        assessmentType: '2-hour examination',
        sourceCriteria: ['Equivalent to 2000 words'],
        feedbackMethod: 'Exam result',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Use as a final data-literacy check for evaluating dashboard claims and incident evidence.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        evidenceOutput: 'Final evidence-interpretation reflection using a support dashboard example.'
      },
      {
        id: 'sta1dct-assignments',
        timing: 'Odd weeks from Week 3',
        dueDate: 'No later than Friday 11:59pm in odd weeks starting from Week 3',
        weight: 30,
        assessmentType: 'Five assignments',
        sourceCriteria: ['Equivalent to 1500 words'],
        feedbackMethod: 'Assignment feedback',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Turn into recurring short dashboard/log interpretation tasks.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        evidenceOutput: 'Five data-based reasoning notes on support metrics or vendor claims.'
      },
      {
        id: 'sta1dct-numeracy-quizzes',
        timing: 'By Week 12',
        dueDate: 'No later than Friday 11:59pm in Week 12',
        weight: 10,
        assessmentType: 'Online numeracy skills quizzes',
        sourceCriteria: ['Seven online quizzes', 'Equivalent to 500 words'],
        feedbackMethod: 'Online quiz feedback',
        silosAssessed: ['2'],
        dcsPrepIntegration: 'Use as small numeracy checks for percentages, counts, and chart interpretation in support data.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        evidenceOutput: 'Numeracy quiz reflection linked to one DCS support metric.'
      }
    ]
  },
  cse1oof: {
    subjectCode: 'CSE1OOF',
    sourceLabel: '2020 CSE1OOF Bendigo SLG',
    sourceNote: 'Older SLG; treat as directional until a current SLG is confirmed.',
    tasks: [
      {
        id: 'cse1oof-assignment-a',
        timing: 'Week 6',
        dueDate: 'Week 6',
        weight: 10,
        assessmentType: 'Programming assignment, Part A',
        sourceCriteria: ['Program compiles and runs in the required Unix environment', 'Student can explain submitted code'],
        feedbackMethod: 'Face-to-face marking with student in lab',
        silosAssessed: ['1', '2', '6'],
        dcsPrepIntegration: 'Use as a small code-understanding and test-plan checkpoint.',
        relatedDcsModuleIds: ['rbc-scripting-code-reading'],
        evidenceOutput: 'Part A code explanation and test evidence note.'
      },
      {
        id: 'cse1oof-assignment-b',
        timing: 'Week 9',
        dueDate: 'Week 9',
        weight: 15,
        assessmentType: 'Programming assignment, Part B',
        sourceCriteria: ['Program compiles and runs in the required Unix environment', 'Uses existing code/library components appropriately'],
        feedbackMethod: 'Face-to-face marking with student in lab',
        silosAssessed: ['1', '2', '4', '6'],
        dcsPrepIntegration: 'Use as a dependency and environment-readiness review task.',
        relatedDcsModuleIds: ['rbc-scripting-code-reading'],
        evidenceOutput: 'Environment-specific run/test note.'
      },
      {
        id: 'cse1oof-assignment-c',
        timing: 'Week 12',
        dueDate: 'Week 12',
        weight: 15,
        assessmentType: 'Programming assignment, Part C',
        sourceCriteria: ['Object-oriented concepts', 'Testing and code explanation'],
        feedbackMethod: 'Face-to-face marking with student in lab',
        silosAssessed: ['1', '2', '3', '6'],
        dcsPrepIntegration: 'Use as a final code-reasoning and reproduction-step exercise.',
        relatedDcsModuleIds: ['rbc-scripting-code-reading'],
        evidenceOutput: 'Part C code reasoning and test-plan artifact.'
      },
      {
        id: 'cse1oof-online-programming-test',
        timing: 'Week 13',
        dueDate: 'Week 13',
        weight: 20,
        assessmentType: '1.5-hour online programming test',
        sourceCriteria: ['8-hour completion window', '3-hour time limit once begun'],
        feedbackMethod: 'Marks made available on LMS',
        silosAssessed: ['1', '2', '3', '4', '5'],
        dcsPrepIntegration: 'Use as timed code-reading and troubleshooting practice.',
        relatedDcsModuleIds: ['rbc-scripting-code-reading'],
        evidenceOutput: 'Timed programming-test reflection on weak concepts.'
      },
      {
        id: 'cse1oof-week8-exam',
        timing: 'Week 8',
        dueDate: 'Week 8',
        weight: 20,
        assessmentType: '1-hour online LMS examination',
        sourceCriteria: ['8-hour completion window'],
        feedbackMethod: 'LMS/exam feedback',
        silosAssessed: ['2', '3', '5', '6'],
        dcsPrepIntegration: 'Use as mid-semester OOP, control-flow, and testing revision.',
        relatedDcsModuleIds: ['rbc-scripting-code-reading'],
        evidenceOutput: 'Mid-semester code reasoning revision note.'
      },
      {
        id: 'cse1oof-final-exam',
        timing: 'Exam period',
        dueDate: 'Exam period',
        weight: 20,
        assessmentType: '1-hour online LMS examination',
        sourceCriteria: ['4-hour completion window'],
        feedbackMethod: 'LMS/exam feedback',
        silosAssessed: ['2', '3', '5', '6'],
        dcsPrepIntegration: 'Use as final OOP and testing revision.',
        relatedDcsModuleIds: ['rbc-scripting-code-reading'],
        evidenceOutput: 'Final code/testing reflection.'
      }
    ]
  },
  cse1is: {
    subjectCode: 'CSE1IS',
    sourceLabel: '2018 CSE1IS Bendigo SLG',
    sourceNote: 'Older SLG; treat as directional until a current SLG is confirmed.',
    tasks: [
      {
        id: 'cse1is-assignment-1',
        timing: '21 September',
        dueDate: '21/9',
        weight: 20,
        assessmentType: 'Assignment 1',
        sourceCriteria: ['Equivalent to 1000 words'],
        feedbackMethod: 'Assignment feedback sheet with mark breakdown and comments',
        silosAssessed: ['Requirements and systems analysis outcomes'],
        dcsPrepIntegration: 'Use as a school system intake and requirements summary task.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality', 'cloud-models-saas-paas-iaas-daas'],
        evidenceOutput: 'School system requirements intake note.'
      },
      {
        id: 'cse1is-assignment-2',
        timing: '18 October',
        dueDate: '18/10',
        weight: 20,
        assessmentType: 'Assignment 2',
        sourceCriteria: ['Equivalent to 1000 words'],
        feedbackMethod: 'Assignment feedback sheet with mark breakdown and comments',
        silosAssessed: ['Design, modelling, and implementation outcomes'],
        dcsPrepIntegration: 'Use as a data-flow, UI, and security-requirements mapping task.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality', 'cloud-models-saas-paas-iaas-daas'],
        evidenceOutput: 'School information-system design/support map.'
      },
      {
        id: 'cse1is-exam',
        timing: 'Exam period',
        dueDate: 'Exam period',
        weight: 60,
        assessmentType: 'One 2.5-hour examination',
        sourceCriteria: ['Cumulative information systems examination'],
        feedbackMethod: 'Examination script review available on request after subject results are released',
        silosAssessed: ['Cumulative information systems outcomes'],
        dcsPrepIntegration: 'Use as final revision across systems components, SDLC, requirements, data, UI, and security.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality', 'cloud-models-saas-paas-iaas-daas'],
        evidenceOutput: 'Final information-systems revision checklist.'
      }
    ]
  },
  cse3pe: {
    subjectCode: 'CSE3PE',
    sourceLabel: '2018 CSE3PE SLG',
    sourceNote: 'Older SLG; treat as directional until a current SLG is confirmed.',
    tasks: [
      {
        id: 'cse3pe-individual-presentation',
        timing: 'Weeks 3 and 4',
        dueDate: 'Weeks 3 and 4',
        weight: 15,
        assessmentType: 'Individual presentation',
        sourceCriteria: ['Professional presentation of an ethical/professional topic'],
        feedbackMethod: 'Written and oral comments by subject staff and peers',
        silosAssessed: ['Professional ethics and communication outcomes'],
        dcsPrepIntegration: 'Use as a short presentation on a school IT ethical support dilemma.',
        relatedDcsModuleIds: ['rbc-cse3pe-professional-practice'],
        evidenceOutput: 'Privacy-safe presentation outline on a DCS support ethics issue.'
      },
      {
        id: 'cse3pe-ethical-case-reflection',
        timing: 'Weeks 2-8',
        dueDate: 'Weeks 2-8',
        weight: 10,
        assessmentType: 'Ethical Case Reflection',
        sourceCriteria: ['Submitted online through LMS'],
        feedbackMethod: 'Online feedback for responses',
        silosAssessed: ['Ethical reasoning and reflective practice outcomes'],
        dcsPrepIntegration: 'Use as recurring reflection on support boundaries, data privacy, and escalation judgement.',
        relatedDcsModuleIds: ['rbc-cse3pe-professional-practice', 'ticket-notes-escalation-quality'],
        evidenceOutput: 'Ethical case reflection note using risk, duty, boundary, action, and next improvement.'
      },
      {
        id: 'cse3pe-group-presentation',
        timing: 'Weeks 10 and 11',
        dueDate: 'Weeks 10 and 11',
        weight: 15,
        assessmentType: 'Group Presentation',
        sourceCriteria: ['Collaborative presentation'],
        feedbackMethod: 'Written and oral comments by subject staff and peers',
        silosAssessed: ['Professional communication and social/legal/ethical analysis outcomes'],
        dcsPrepIntegration: 'Use as a collaborative review of an IT policy or school support scenario.',
        relatedDcsModuleIds: ['rbc-cse3pe-professional-practice'],
        evidenceOutput: 'Group presentation brief on a school IT policy or ethical decision.'
      },
      {
        id: 'cse3pe-participation',
        timing: 'All weeks',
        dueDate: 'All weeks',
        weight: 10,
        assessmentType: 'Group and Class Participation',
        sourceCriteria: ['Participation in group and class activities'],
        feedbackMethod: 'Face-to-face comments by peers and tutorial supervisor',
        silosAssessed: ['Professional participation and communication outcomes'],
        dcsPrepIntegration: 'Use as a weekly professional-practice participation log.',
        relatedDcsModuleIds: ['rbc-cse3pe-professional-practice'],
        evidenceOutput: 'Weekly participation/reflection log with privacy-safe examples.'
      },
      {
        id: 'cse3pe-written-exam',
        timing: 'Semester 2 exam period',
        dueDate: 'Semester 2 exam period',
        weight: 50,
        assessmentType: 'Written Examination',
        sourceCriteria: ['Cumulative professional environment examination'],
        feedbackMethod: 'Final exam result',
        silosAssessed: ['Cumulative professional environment outcomes'],
        dcsPrepIntegration: 'Use as final revision for ethics, law, professional duty, and reflection.',
        relatedDcsModuleIds: ['rbc-cse3pe-professional-practice'],
        evidenceOutput: 'Final professional-practice revision summary.'
      }
    ]
  },
  cse4002: {
    subjectCode: 'CSE4002',
    sourceLabel: '2025 CSE4002 Bundoora SLG',
    sourceNote: 'A 2024 Bendigo variant also exists with a different assessment split; this entry uses the latest 2025 SLG extracted locally.',
    tasks: [
      {
        id: 'cse4002-case-study',
        timing: 'LMS',
        dueDate: 'LMS',
        weight: 20,
        assessmentType: 'Case Study',
        sourceCriteria: ['Practical assignment applying AI theory and technology to solve a real-world problem'],
        feedbackMethod: 'Written feedback',
        silosAssessed: ['1', '3'],
        dcsPrepIntegration: 'Use as an AI-in-school-support case study with responsible AI and escalation boundaries.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'AI support case study with data-boundary and verification notes.'
      },
      {
        id: 'cse4002-quizzes',
        timing: 'LMS',
        dueDate: 'LMS',
        weight: 30,
        assessmentType: 'Five quizzes',
        sourceCriteria: ['Quiz coverage of AI concepts'],
        feedbackMethod: 'LMS quiz feedback',
        silosAssessed: ['2', '4'],
        dcsPrepIntegration: 'Use as spaced retrieval for AI vocabulary, reasoning, and ML awareness.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'AI concept quiz review log.'
      },
      {
        id: 'cse4002-final-exam',
        timing: 'LMS/final period',
        dueDate: 'LMS',
        weight: 50,
        assessmentType: 'Final Exam',
        sourceCriteria: ['Assess all knowledge learned in the subject'],
        feedbackMethod: 'Final exam result',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Use as cumulative AI awareness revision for search, expert systems, ML, and responsible use.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Final AI-awareness revision note.'
      }
    ]
  },
  cse5006: {
    subjectCode: 'CSE5006',
    sourceLabel: '2024 CSE5006 Bendigo SLG',
    tasks: [
      {
        id: 'cse5006-assignment-1',
        timing: 'Week 3 / Session W6',
        dueDate: 'W6',
        weight: 15,
        assessmentType: 'Assignment 1',
        sourceCriteria: ['Cloud/web application concepts'],
        feedbackMethod: 'Written feedback within three weeks',
        silosAssessed: ['1', '2', '4'],
        dcsPrepIntegration: 'Use as a cloud web-app dependency mapping task.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it', 'cloud-models-saas-paas-iaas-daas'],
        evidenceOutput: 'Cloud service dependency map.'
      },
      {
        id: 'cse5006-assignment-2',
        timing: 'Week 8 / Session W10',
        dueDate: 'W10',
        weight: 25,
        assessmentType: 'Assignment 2',
        sourceCriteria: ['Backend, requirements, deployment, and scalable web concepts'],
        feedbackMethod: 'Written feedback within three weeks',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Use as a SaaS feature-failure and deployment-risk scenario.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it', 'aplus-core1-virtualization-cloud'],
        evidenceOutput: 'SaaS deployment/support risk note.'
      },
      {
        id: 'cse5006-exam',
        timing: 'Exam period',
        dueDate: 'Exam period',
        weight: 60,
        assessmentType: 'Exam',
        sourceCriteria: ['Cumulative cloud web application examination'],
        feedbackMethod: 'Written feedback within three weeks',
        silosAssessed: ['1', '2', '3', '4', '5'],
        dcsPrepIntegration: 'Use as final cloud architecture, API, storage, and CI/CD revision.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it', 'cloud-models-saas-paas-iaas-daas'],
        evidenceOutput: 'Final cloud/web service revision checklist.'
      }
    ]
  },
  cse5bdc: {
    subjectCode: 'CSE5BDC',
    sourceLabel: 'CSE5BDC SLG',
    tasks: [
      {
        id: 'cse5bdc-lab-quizzes',
        timing: 'Weeks 4-9 labs',
        dueDate: 'Sunday following the week of the lab',
        weight: 10,
        assessmentType: 'Quizzes linked to labs',
        sourceCriteria: ['Only for labs in weeks 4 to 9'],
        feedbackMethod: 'Quiz feedback',
        silosAssessed: ['3', '4'],
        dcsPrepIntegration: 'Use as big-data/cloud lab concept checks.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Big-data lab quiz reflection.'
      },
      {
        id: 'cse5bdc-assignment',
        timing: '24 May 2024',
        dueDate: '24/5/2024',
        weight: 30,
        assessmentType: 'Assignment',
        sourceCriteria: ['Big-data analytics/cloud solution task'],
        feedbackMethod: 'Marking sheet',
        silosAssessed: ['4'],
        dcsPrepIntegration: 'Use as an analytics pipeline support scenario.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Analytics pipeline support map.'
      },
      {
        id: 'cse5bdc-exam',
        timing: 'Exam period',
        dueDate: 'Exam period',
        weight: 60,
        assessmentType: 'Exam',
        sourceCriteria: ['Cumulative big-data/cloud exam'],
        feedbackMethod: 'Exam mark',
        silosAssessed: ['1', '2', '3', '4', '5'],
        dcsPrepIntegration: 'Use as advanced cloud data revision.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Big-data/cloud revision summary.'
      }
    ]
  },
  cse5dl: {
    subjectCode: 'CSE5DL',
    sourceLabel: '2024 CSE5DL Bundoora SLG',
    tasks: [
      {
        id: 'cse5dl-lab-quizzes',
        timing: 'Following lab weeks',
        dueDate: 'Sunday following the week of the lab',
        weight: 10,
        assessmentType: 'Quizzes linked to labs',
        sourceCriteria: ['Lab-linked quizzes'],
        feedbackMethod: 'Quiz feedback',
        silosAssessed: ['3', '5'],
        dcsPrepIntegration: 'Use as deep-learning concept checks for computer vision/NLP deployment awareness.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Deep-learning lab quiz reflection.'
      },
      {
        id: 'cse5dl-assignment',
        timing: '31 May 2024',
        dueDate: '31/5/2024',
        weight: 40,
        assessmentType: 'Assignment',
        sourceCriteria: ['Deep learning implementation task'],
        feedbackMethod: 'Marking sheet',
        silosAssessed: ['3'],
        dcsPrepIntegration: 'Use as an AI deployment and maintenance awareness scenario rather than production model building.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'AI model deployment/maintenance risk note.'
      },
      {
        id: 'cse5dl-exam',
        timing: 'Exam period',
        dueDate: 'Exam period',
        weight: 50,
        assessmentType: 'Exam',
        sourceCriteria: ['Cumulative deep-learning exam'],
        feedbackMethod: 'Exam mark',
        silosAssessed: ['1', '2', '3', '4', '5', '6'],
        dcsPrepIntegration: 'Use as advanced AI limitation and cloud production revision.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Deep-learning awareness revision summary.'
      }
    ]
  },
  cse5ml: {
    subjectCode: 'CSE5ML',
    sourceLabel: '2024 CSE5ML T2 SLG',
    tasks: [
      {
        id: 'cse5ml-regression',
        timing: 'Week 3',
        dueDate: 'Week 3',
        weight: 20,
        assessmentType: 'Design regression models',
        sourceCriteria: ['Regression model design'],
        feedbackMethod: 'Written feedback within three weeks',
        silosAssessed: ['4'],
        dcsPrepIntegration: 'Use as an AI prediction-limit and model-evaluation exercise.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Regression model limitation explanation.'
      },
      {
        id: 'cse5ml-digits',
        timing: 'Week 7',
        dueDate: 'Week 7',
        weight: 30,
        assessmentType: 'Handwritten digits recognition',
        sourceCriteria: ['Classification model implementation/evaluation'],
        feedbackMethod: 'Written feedback within three weeks',
        silosAssessed: ['4'],
        dcsPrepIntegration: 'Use as image/classification accuracy and limitation awareness.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Classification model evaluation note.'
      },
      {
        id: 'cse5ml-exam',
        timing: 'Week 7',
        dueDate: 'Week 7',
        weight: 50,
        assessmentType: 'Three-hour exam',
        sourceCriteria: ['Cumulative ML theory and practice'],
        feedbackMethod: 'Final mark',
        silosAssessed: ['1', '2', '3'],
        dcsPrepIntegration: 'Use as final machine-learning awareness revision.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'ML concepts and limitations revision summary.'
      }
    ]
  },
  cse5nlp: {
    subjectCode: 'CSE5NLP',
    sourceLabel: '2024 CSE5NLP T3 SLG',
    tasks: [
      {
        id: 'cse5nlp-assessment-1',
        timing: 'Week 3',
        dueDate: 'Sunday 12 May 2024 by 23:59 Melbourne time',
        weight: 20,
        assessmentType: 'Assessment 1: Implementing solutions using Python, part 1',
        sourceCriteria: ['Build a chatbot using NLP subtasks', 'Apply author attribution using an n-gram language model', 'Classify fake news versus real news'],
        feedbackMethod: 'Written feedback by Sunday at the end of Week 4, 23:59',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Use as a chatbot reliability, authorship, and misinformation-risk awareness task.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'NLP chatbot/fake-news limitation note.'
      },
      {
        id: 'cse5nlp-assessment-2',
        timing: 'Week 5',
        dueDate: 'Sunday 26 May 2024 by 23:59 Melbourne time',
        weight: 30,
        assessmentType: 'Assessment 2: Implementing solutions using Python, part 2',
        sourceCriteria: ['Clean data with TF-IDF', 'Implement word embeddings for classification accuracy and F1 score', 'Enable chatbot commands', 'Critically evaluate chatbot limitations'],
        feedbackMethod: 'Written feedback by Sunday at the end of Week 6, 23:59',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Use as an AI answer-verification and evaluation-metrics exercise for school tools.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'AI answer verification and limitation checklist.'
      },
      {
        id: 'cse5nlp-final-exam',
        timing: 'Week 7',
        dueDate: 'TBA, centrally scheduled',
        weight: 50,
        assessmentType: 'Assessment 3: Final exam',
        sourceCriteria: ['Apply NLP subtasks to real-world problems', 'Critically evaluate methods, algorithms, and results'],
        feedbackMethod: 'Automated feedback once quiz is submitted in LMS',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Use as final NLP/Copilot/search verification revision.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Final NLP awareness revision summary.'
      }
    ]
  },
  cse5cv: {
    subjectCode: 'CSE5CV',
    sourceLabel: '2023 CSE5CV Bundoora SLG',
    tasks: [
      {
        id: 'cse5cv-week2-assignment',
        timing: 'Week 2',
        dueDate: '25 August',
        weight: 10,
        assessmentType: 'Individual assignment',
        sourceCriteria: ['Length equivalent to 500 words'],
        feedbackMethod: 'Comprehensive mark breakdown within three weeks',
        silosAssessed: ['1', '2'],
        dcsPrepIntegration: 'Use as a computer-vision concept and design-issue awareness task.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Computer-vision feature risk note.'
      },
      {
        id: 'cse5cv-week8-assignment',
        timing: 'Week 8',
        dueDate: '20 October',
        weight: 40,
        assessmentType: 'Individual assignment',
        sourceCriteria: ['Length equivalent to 2000 words', 'One-on-one demonstration of work'],
        feedbackMethod: 'Comprehensive mark breakdown within three weeks, feedback during demo',
        silosAssessed: ['3', '4'],
        dcsPrepIntegration: 'Use as a camera/vision model demonstration and school-data risk scenario.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Computer-vision demo review with privacy and reliability limits.'
      },
      {
        id: 'cse5cv-final-exam',
        timing: 'Final assessment period',
        dueDate: 'TBA',
        weight: 50,
        assessmentType: '2-hour final examination',
        sourceCriteria: ['Length equivalent to 2000 words'],
        feedbackMethod: 'Final mark as reported by the university',
        silosAssessed: ['1', '2', '3', '4'],
        dcsPrepIntegration: 'Use as final computer-vision and Azure vision awareness revision.',
        relatedDcsModuleIds: ['smitb-cloud-ai-school-it'],
        evidenceOutput: 'Final computer-vision awareness revision summary.'
      }
    ]
  }
};

export const academicAssessmentSummaryList = Object.values(academicAssessmentSummaries);
