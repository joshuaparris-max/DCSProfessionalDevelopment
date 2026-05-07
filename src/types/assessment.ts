export type ConfidenceLevel = 1 | 2 | 3;

export type WeakTopicKey =
  | 'a-plus-mobile-devices'
  | 'a-plus-hardware'
  | 'a-plus-cables-connectors'
  | 'a-plus-troubleshooting'
  | 'a-plus-networking'
  | 'a-plus-network-services'
  | 'a-plus-printers'
  | 'a-plus-virtualization-cloud'
  | 'ports-protocols'
  | 'dns-dhcp-gateway'
  | 'vlan-firewall-rules'
  | 'cloud-models'
  | 'offboarding-sequence'
  | 'mdm-group-policy'
  | 'printer-symptoms'
  | 'ticket-quality'
  | 'security-risk-judgement'
  | 'rbc-cybersecurity'
  | 'rbc-programming-logic'
  | 'rbc-professional-practice'
  | 'rbc-hardware-network-web'
  | 'rbc-data-interpretation'
  | 'rbc-information-systems'
  | 'rbc-data-literacy'
  | 'smitb-cloud-ai'
  | 'cybersecurity-incident-triage'
  | 'hardware-network-web'
  | 'script-literacy'
  | 'professional-practice'
  | 'dcs-parent-portal'
  | 'dcs-sentral-support'
  | 'dcs-schoolbox-portal'
  | 'dcs-login-password'
  | 'dcs-permissions-access'
  | 'dcs-web-filtering'
  | 'dcs-onboarding'
  | 'dcs-teams-sharepoint-onedrive'
  | 'dcs-ipad-jamf';

export type AssessmentSource = 'strict-quiz' | 'module-quiz';

export type AssessmentDifficulty = 'foundation' | 'stretch' | 'challenge';

export type AssessmentOption = {
  id: string;
  label: string;
};

export type BaseAssessmentQuestion = {
  id: string;
  type: 'mcq' | 'short-answer' | 'order-steps' | 'scenario-response' | 'explain-it-simply';
  prompt: string;
  domain: string;
  difficulty: AssessmentDifficulty;
  explanation: string;
  modelAnswer: string;
  commonMistakes: string[];
  dcsContext: string;
  reviewSchedule: string;
  recommendedModuleId: string;
  weakTopic: WeakTopicKey;
};

export type MCQAssessmentQuestion = BaseAssessmentQuestion & {
  type: 'mcq';
  options: AssessmentOption[];
  correctOptionId: string;
};

export type ShortAnswerAssessmentQuestion = BaseAssessmentQuestion & {
  type: 'short-answer';
  rubric: string[];
  keywordHints: string[];
};

export type OrderStepsAssessmentQuestion = BaseAssessmentQuestion & {
  type: 'order-steps';
  steps: AssessmentOption[];
  correctOrder: string[];
  rubric: string[];
};

export type ScenarioResponseAssessmentQuestion = BaseAssessmentQuestion & {
  type: 'scenario-response';
  rubric: string[];
};

export type ExplainItSimplyAssessmentQuestion = BaseAssessmentQuestion & {
  type: 'explain-it-simply';
  rubric: string[];
  keywordHints: string[];
};

export type AssessmentQuestion =
  | MCQAssessmentQuestion
  | ShortAnswerAssessmentQuestion
  | OrderStepsAssessmentQuestion
  | ScenarioResponseAssessmentQuestion
  | ExplainItSimplyAssessmentQuestion;

export type SelfRatingBand = 0 | 1 | 2;

export type AssessmentResponse = {
  questionId: string;
  confidence: ConfidenceLevel;
  selectedOptionId?: string;
  answerText?: string;
  orderedStepIds?: string[];
  reasoning: string;
  judgement: string;
};

export type AssessmentSelfRating = {
  correctness: SelfRatingBand;
  reasoning: SelfRatingBand;
  judgement: SelfRatingBand;
};

export type AssessmentScoreBreakdown = {
  correctness: number;
  reasoning: number;
  judgement: number;
  total: number;
  autoMarked: boolean;
};

export type AssessmentFeedback = {
  correctness: string;
  reasoning: string;
  judgement: string;
  correctedConcept: string;
  nextReviewDateIso: string;
};

export type AssessmentAttempt = {
  id: string;
  questionId: string;
  questionType: AssessmentQuestion['type'];
  prompt: string;
  domain: string;
  weakTopic: WeakTopicKey;
  recommendedModuleId: string;
  source: AssessmentSource;
  confidence: ConfidenceLevel;
  answerSummary: string;
  reasoningSummary: string;
  judgementSummary: string;
  selfRating: AssessmentSelfRating;
  scoreBreakdown: AssessmentScoreBreakdown;
  feedback: AssessmentFeedback;
  timestampIso: string;
  shouldRevisit: boolean;
  nextReviewDateIso: string;
};
