import type { AssessmentQuestion } from './assessment';

export type DcsArea =
  | 'DCS Level 1 Support'
  | 'Networking'
  | 'Cybersecurity'
  | 'Programming / Automation'
  | 'Data / Reporting'
  | 'M365 / Cloud'
  | 'Professional Practice';

export type Relevance = 'high' | 'medium' | 'low';

export type AcademicSilo = {
  id: string;
  number: number;
  text: string;
  plainEnglish: string;
  practicePrompts: string[];
  quizItems: string[];
};

export type DcsBridge = {
  id: string;
  dcsArea: DcsArea;
  relevance: Relevance;
  explanation: string;
  relatedDcsModuleIds: string[];
  practicalOutput?: string;
};

export type CertificationBridge = {
  id: string;
  title: string;
  description: string;
  link: string;
};

export type AcademicResource = {
  id: string;
  title: string;
  provider: string;
  url: string;
  description: string;
};

export type AcademicTopicAssessment = {
  id: string;
  title: string;
  prompt: string;
  questionType: 'mcq' | 'short-answer' | 'scenario-response' | 'practical-output' | 'reflection';
  rubric: string[];
  evidenceOutput: string;
};

export type AcademicWeeklyModule = {
  id: string;
  week: number;
  topicNumber: number;
  dateLabel?: string;
  title: string;
  deliveryMode: string;
  contactHours?: string;
  sourceDetail: string;
  summary: string;
  dcsPrepFocus: string;
  linkedSiloIds: string[];
  relatedDcsModuleIds: string[];
  relatedScenarioIds?: string[];
  resources: AcademicResource[];
  assessment: AcademicTopicAssessment;
};

export type AcademicAssessmentSection = {
  id: string;
  title: string;
  timing: string;
  purpose: string;
  tasks: string[];
  rubric: string[];
  relatedWeekIds: string[];
};

export type SlgAssessmentTask = {
  id: string;
  timing: string;
  dueDate: string;
  weight: number;
  assessmentType: string;
  sourceCriteria: string[];
  feedbackMethod: string;
  silosAssessed: string[];
  dcsPrepIntegration: string;
  relatedDcsModuleIds: string[];
  evidenceOutput: string;
};

export type SlgAssessmentSummary = {
  subjectCode: string;
  sourceLabel: string;
  sourceNote?: string;
  lmsRubricNote?: string;
  hurdleSummary?: string;
  tasks: SlgAssessmentTask[];
};

export type AcademicSubject = {
  id: string;
  code: string;
  title: string;
  provider: 'La Trobe' | 'RMIT' | 'Other';
  track: 'RBC' | 'SMITB' | 'Other';
  yearLevel?: string;
  sourceType: 'SLG' | 'Study Plan' | 'Manual';
  sourceFileName?: string;
  summary: string;
  silos: AcademicSilo[];
  dcsBridges: DcsBridge[];
  assessmentQuestions?: AssessmentQuestion[];
  assessmentSections?: AcademicAssessmentSection[];
  weeklyModules?: AcademicWeeklyModule[];
  slgAssessmentSummary?: SlgAssessmentSummary;
  certificationLinks?: CertificationBridge[];
  recommendedNextAction?: string;
};
