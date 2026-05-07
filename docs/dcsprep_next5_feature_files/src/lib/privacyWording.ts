const sensitivePatterns = [
  /password\s*(is|=|:)/i,
  /passcode\s*(is|=|:)/i,
  /student\s+name/i,
  /parent\s+name/i,
  /\b\d{1,3}(?:\.\d{1,3}){3}\b/,
  /serial\s*(number|no\.?|#)/i,
  /\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/
];

export type PrivacyWordingReview = {
  riskLevel: 'low' | 'medium' | 'high';
  warnings: string[];
  saferDraft: string;
};

export function findPrivacyWarnings(text: string): string[] {
  const warnings: string[] = [];

  if (/password|passcode/i.test(text)) {
    warnings.push('Do not request, record, or repeat passwords/passcodes.');
  }

  if (/student|parent|family|medical|diagnosis/i.test(text)) {
    warnings.push('Check whether student, parent, family, or sensitive wellbeing details are actually needed.');
  }

  if (/\b\d{1,3}(?:\.\d{1,3}){3}\b/.test(text)) {
    warnings.push('Avoid recording internal IP addresses in manager-safe or training notes unless there is an approved operational reason.');
  }

  if (/serial\s*(number|no\.?|#)/i.test(text)) {
    warnings.push('Device serials can be sensitive inventory data. Include only in the proper operational system.');
  }

  if (/clicked|attachment|phishing|suspicious/i.test(text)) {
    warnings.push('For suspicious email/security issues, preserve evidence and avoid copying message contents into general notes.');
  }

  return warnings;
}

export function makePrivacySafeDraft(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes('password') || lower.includes('login') || lower.includes('log in')) {
    return 'Account login issue reported. User unable to authenticate to the named system. No password was requested or recorded. Error/context captured and escalation required if first-line checks do not resolve it.';
  }

  if (lower.includes('parent') || lower.includes('family') || lower.includes('portal')) {
    return 'Parent portal or family-detail related request reported. Symptom/request type captured without private family details. Escalating to the appropriate admin or system-owner workflow.';
  }

  if (lower.includes('blocked') || lower.includes('website') || lower.includes('youtube')) {
    return 'Website access request received for curriculum use. Exact URL, visible block message, learning purpose, requester, and timeframe should be captured for filtering/approval review.';
  }

  if (lower.includes('phishing') || lower.includes('suspicious') || lower.includes('attachment')) {
    return 'Suspicious email reported by staff member. User advised not to click links or open attachments. Evidence should be preserved through the approved security escalation path.';
  }

  if (lower.includes('printer') || lower.includes('print')) {
    return 'Printer issue reported. Queue/release/device symptoms checked where appropriate. Location, printer name, scope, and impact captured for follow-up or escalation.';
  }

  return 'Support issue reported. Capture only the minimum necessary operational details: user type, system, location if relevant, exact symptom, scope, safe steps tried, urgency/impact, and next action. Avoid unnecessary personal, student, parent, credential, or confidential details.';
}

export function reviewPrivacyWording(text: string): PrivacyWordingReview {
  const warnings = findPrivacyWarnings(text);
  const hasHighRiskPattern = sensitivePatterns.some((pattern) => pattern.test(text));

  return {
    riskLevel: hasHighRiskPattern ? 'high' : warnings.length ? 'medium' : 'low',
    warnings,
    saferDraft: makePrivacySafeDraft(text)
  };
}
