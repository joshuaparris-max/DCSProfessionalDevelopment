export const scenarioNoteRubric = [
  { id: 'symptom', label: 'Symptom clarity (exact observable behaviour)', weight: 0.25 },
  { id: 'scope', label: 'Scope (who/where/device counts)', weight: 0.2 },
  { id: 'steps', label: 'Steps tried + results captured', weight: 0.2 },
  { id: 'urgency', label: 'Urgency / learning impact stated', weight: 0.2 },
  { id: 'privacy', label: 'Privacy-safe wording (no secrets or unnecessary identifiers)', weight: 0.15 }
] as const;

export const scenarioRevisitModuleMap: Record<string, string> = {
  'display-black-screen': 'classroom-display-viewboard-troubleshooting',
  'classroom-wifi-no-internet': 'dns-dhcp-gateway-ip-basics',
  'staff-offboarding-m365-visibility': 'm365-identity-offboarding-basics',
  'rbc-cybersecurity-phishing-triage': 'rbc-cse1icb-cybersecurity-awareness',
  'rbc-hardware-network-troubleshooting': 'rbc-cse1iit-hardware-network-web-basics',
  'rbc-script-readiness-logic': 'rbc-cse1pe-programming-readiness',
  'rbc-ethical-reflection-privacy': 'rbc-cse3pe-professional-practice',
  'smitb-cloud-ai-saas-ai-risk': 'smitb-cloud-ai-school-it',
  'hdmi-picture-no-audio-classroom': 'classroom-display-viewboard-troubleshooting',
  'student-laptop-apipa-169254': 'dns-dhcp-gateway-ip-basics',
  'printer-queue-stuck-followme': 'printer-troubleshooting',
  'laser-toner-rubs-off': 'printer-troubleshooting',
  'guest-wifi-cannot-reach-printer': 'vlans-network-segmentation',
  'parent-portal-invite-not-arriving': 'parent-portal-registration',
  'sentral-markbook-row-missing': 'sentral-support',
  'password-lockout-after-travel': 'login-password-support',
  'new-staff-missing-teams-access': 'new-user-onboarding',
  'camera-windows-hello-accessibility-triage': 'smitb-computer-vision-accessibility-support',
  'dashboard-log-interpretation-trend-triage': 'rbc-data-literacy-dashboard-log-reasoning',
  'msp-m365-mfa-locked': 'login-password-lockout-mfa-account-basics',
  'msp-sharepoint-sync-conflict': 'rbc-cse1iit-hardware-network-web-basics',
  'msp-backup-alert-first-response': 'aplus-core1-troubleshooting',
  'msp-shared-mailbox-permission': 'login-password-lockout-mfa-account-basics',
  'msp-single-workstation-internet': 'rbc-cse1iit-hardware-network-web-basics',
  'msp-outlook-access-issue': 'login-password-lockout-mfa-account-basics',
  'msp-new-starter-setup': 'login-password-lockout-mfa-account-basics',
  'msp-onedrive-device-replacement': 'rbc-cse1iit-hardware-network-web-basics',
  'msp-suspicious-email-report': 'rbc-cse1icb-cybersecurity-awareness',
  'msp-device-performance-pressure': 'aplus-core1-troubleshooting'
};

export function calculateScenarioNoteScore(checks: Record<string, boolean>) {
  const score = scenarioNoteRubric.reduce((sum, item) => sum + (checks[item.id] ? item.weight : 0), 0);
  return Number(score.toFixed(2));
}

export function getScenarioRecommendedModuleId(scenarioId: string) {
  return scenarioRevisitModuleMap[scenarioId];
}
