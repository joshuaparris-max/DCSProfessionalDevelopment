Yep. I’d pick these 5 next because they connect directly to the app you already have:

1. **Quiet-window dashboard / focus modes**
2. **Question-first module experience**
3. **Scenario Lab with Jira-note scoring**
4. **Unified Due Today review**
5. **Knowledge Base Lab**

Your TODO already names these as key missing pieces: quiet-window dashboard, question-first learning, Scenario Lab with Jira-style notes, unified review/error logging, and Knowledge Base Lab outputs.  

---

# 1. Quiet-window dashboard / focus modes

Your app already has:

```txt
app/page.tsx
app/due-today/page.tsx
app/scenarios/page.tsx
app/strict-quiz/page.tsx
app/pd-log/page.tsx
src/lib/readinessMath.ts
src/lib/progress.ts
```

## What to add

Turn the homepage into a proper **“what should I do with 5–20 quiet minutes?” cockpit**.

Add modes:

```ts
type FocusMode = "start-tiny" | "twenty-minute-focus" | "overwhelmed";
```

Add:

```txt
src/lib/focusModes.ts
src/components/dashboard/FocusModeCard.tsx
src/components/dashboard/NextBestActionPanel.tsx
src/components/focus/SingleTaskSession.tsx
```

## Logic

```ts
export function getFocusModeTask(mode: FocusMode, progress: UserProgress) {
  if (mode === "start-tiny") {
    return {
      title: "Do one due flashcard",
      href: "/due-today?mode=tiny",
      minutes: 5
    };
  }

  if (mode === "twenty-minute-focus") {
    return {
      title: "Complete one scenario step and write a note",
      href: "/scenarios?mode=focus",
      minutes: 20
    };
  }

  return {
    title: "One calm review item",
    href: "/due-today?mode=overwhelmed",
    minutes: 3
  };
}
```

## Homepage cards

Add buttons:

```txt
Start tiny
20-minute focus block
I’m overwhelmed
Review due flashcards
Do one scenario step
Log PD
```

Also add this reminder:

```txt
Tickets, walk-ups, calls, and Paul’s instructions come first.
```

## Acceptance test

You open `/`, click **Start tiny**, and land in a low-clutter single task view with one thing to do.

---

# 2. Question-first module experience

Your modules currently have sections, flashcards, quiz, scenario prompts, and practical outputs. Good base. But the TODO says the module should start with diagnostic questions, not passive reading. 

## Files to change

```txt
src/types/training.ts
src/components/modules/ModuleDetail.tsx
src/components/modules/ModuleTabs.tsx
src/lib/moduleMath.ts
src/data/modules.ts
```

## Extend `TrainingModule`

Add:

```ts
export type DiagnosticPrompt = {
  id: string;
  prompt: string;
  expectedAnswer: string;
  linkedSectionId?: string;
};

export type TrainingModule = {
  // existing fields...
  diagnosticPrompts?: DiagnosticPrompt[];
};
```

## New module flow

In `ModuleDetail.tsx`, reorder tabs:

```txt
1. Start here
2. Recall
3. Learn
4. Flashcards
5. Scenario
6. Practical output
7. Review
```

## “Start here” panel

Show 2–3 prompts:

```txt
Before reading:
A teacher says their laptop is plugged into HDMI but the ViewBoard shows nothing.
What are your first 3 checks?
```

Then after Josh answers, reveal:

```txt
Good first-line pattern:
1. Check ViewBoard input/source.
2. Check Windows + P.
3. Confirm cable/adaptor and whether the laptop detects the display.
```

## Store attempt

Add to progress:

```ts
diagnosticAttempts: {
  moduleId: string;
  promptId: string;
  answer: string;
  selfRating: "missed" | "partial" | "solid";
  createdAtIso: string;
}[];
```

## Acceptance test

A module can be completed without reading first. It starts by asking, “What would you do?”

---

# 3. Scenario Lab with Jira-note scoring

Your current Scenario Lab already has multi-step choices and saves `ScenarioRun`. The missing bit is the **written escalation note at the end** and scoring.

The TODO explicitly says every scenario should end with a Jira-style note and score who/where/device, symptom, scope, steps tried, urgency/impact, next action, and privacy-safe wording. 

## Files to change

```txt
src/types/scenarios.ts
src/lib/progress.ts
src/lib/scenarioNoteScoring.ts
app/scenarios/page.tsx
src/data/scenarios.ts
```

## Extend types

```ts
export type ScenarioNoteScore = {
  total: number;
  whoWhereDevice: number;
  exactSymptom: number;
  scope: number;
  stepsTried: number;
  urgencyImpact: number;
  nextAction: number;
  privacySafeWording: number;
  feedback: string[];
};

export type ScenarioRun = {
  id: string;
  scenarioId: string;
  startedAtIso: string;
  completedAtIso?: string;
  stepChoices: ScenarioRunChoice[];
  completed: boolean;
  ticketNote?: string;
  noteScore?: ScenarioNoteScore;
};
```

## Scoring function

```ts
export function scoreScenarioNote(note: string): ScenarioNoteScore {
  const lower = note.toLowerCase();

  const whoWhereDevice = scoreAny(lower, ["teacher", "student", "room", "device", "laptop", "viewboard"]);
  const exactSymptom = scoreAny(lower, ["no audio", "169.254", "stuck", "cannot", "error", "blocked"]);
  const scope = scoreAny(lower, ["one device", "multiple", "same room", "others affected", "only"]);
  const stepsTried = scoreAny(lower, ["checked", "tested", "tried", "confirmed", "restarted"]);
  const urgencyImpact = scoreAny(lower, ["class", "lesson", "exam", "urgent", "impact"]);
  const nextAction = scoreAny(lower, ["escalate", "next", "vendor", "paul", "follow up"]);
  const privacySafeWording = lower.includes("password") || lower.includes("student name") ? 0 : 1;

  const total =
    whoWhereDevice +
    exactSymptom +
    scope +
    stepsTried +
    urgencyImpact +
    nextAction +
    privacySafeWording;

  return {
    total: Math.round((total / 7) * 100),
    whoWhereDevice,
    exactSymptom,
    scope,
    stepsTried,
    urgencyImpact,
    nextAction,
    privacySafeWording,
    feedback: buildNoteFeedback(...)
  };
}
```

## UI flow

At scenario finish:

```txt
Step 1: Show choices score
Step 2: Ask Josh to write a Jira-style note
Step 3: Score note
Step 4: Show model note
Step 5: Save run
Step 6: Add weak note areas to Due Today / Error Log
```

## Acceptance test

A finished scenario is not complete until Josh writes the note.

---

# 4. Unified Due Today review

Your `/due-today` already shows flashcards, missed questions, and weak topics. Good start. The upgrade is to merge **flashcards + missed questions + weak scenario steps + note-writing weaknesses** into one queue.

The TODO says Due Today should merge these into one due-review system and show review items by topic, system, difficulty, and review type. 

## Files to change

```txt
src/lib/dueReview.ts
app/due-today/page.tsx
src/lib/progress.ts
src/lib/spacedRepetition.ts
```

## New type

```ts
export type DueReviewItem =
  | {
      id: string;
      type: "flashcard";
      dueDateIso: string;
      moduleId: string;
      title: string;
      prompt: string;
      answer: string;
      difficulty: "new" | "learning" | "solid";
      topicTags: string[];
    }
  | {
      id: string;
      type: "missed-question";
      dueDateIso: string;
      questionId: string;
      title: string;
      prompt: string;
      correctedConcept: string;
      weakTopic: WeakTopicKey;
    }
  | {
      id: string;
      type: "scenario-step";
      dueDateIso: string;
      scenarioId: string;
      title: string;
      prompt: string;
      correctPath: string;
    }
  | {
      id: string;
      type: "ticket-note";
      dueDateIso: string;
      scenarioRunId: string;
      title: string;
      weakNoteArea: string;
      prompt: string;
    };
```

## Central function

```ts
export function getDueReviewItems(progress: UserProgress): DueReviewItem[] {
  return [
    ...getDueFlashcards(progress),
    ...getDueMissedQuestions(progress),
    ...getDueScenarioSteps(progress),
    ...getDueTicketNoteWeaknesses(progress)
  ].sort((a, b) => a.dueDateIso.localeCompare(b.dueDateIso));
}
```

## UI

Replace separate sections with filters:

```txt
All | Flashcards | Missed questions | Scenarios | Ticket notes

Group by:
- topic
- system
- review type
- difficulty
```

## Acceptance test

If Josh misses a scenario step or writes a weak ticket note, it appears later in `/due-today`.

---

# 5. Knowledge Base Lab

This is one of the highest-value features: it turns learning into practical support artefacts.

Your TODO says to add `/knowledge-base-lab`, templates, Markdown export, article-quality rubric, local draft storage, and links from practical outputs. 

## Files to add

```txt
app/knowledge-base-lab/page.tsx
src/types/knowledgeBase.ts
src/data/practicalTemplates.ts
src/lib/knowledgeBase.ts
src/components/kb/KbDraftEditor.tsx
src/components/kb/KbRubricPanel.tsx
src/components/kb/KbTemplatePicker.tsx
```

Also update:

```txt
src/components/shell/navigation.ts
src/lib/progress.ts
src/components/modules/ModuleDetail.tsx
```

## Type

```ts
export type KnowledgeBaseDraft = {
  id: string;
  createdAtIso: string;
  updatedAtIso: string;
  title: string;
  audience: "staff" | "students" | "parents" | "ict-internal" | "mixed";
  sourceTheme: string;
  relatedModuleIds: string[];
  relatedScenarioIds: string[];
  bodyMarkdown: string;
  privacyChecked: boolean;
  rubricScores: {
    clearTitle: number;
    correctAudience: number;
    stepOrder: number;
    brevity: number;
    safetyPrivacy: number;
    likelyDeflectionValue: number;
  };
};
```

Add to `UserProgress`:

```ts
knowledgeBaseDrafts: KnowledgeBaseDraft[];
```

## Templates

Create templates for:

```txt
Password reset guide
Wi-Fi onboarding checklist
Website unblock request checklist
Sentral triage cheat sheet
OurDCS quick-reference guide
Teams / SharePoint / OneDrive issue guide
iPad / Jamf first-response checklist
Printer symptom matrix
Classroom AV quick-fix flow
```

## Example template

```ts
export const kbTemplates = [
  {
    id: "classroom-av-quick-fix",
    title: "Classroom AV quick-fix flow",
    audience: "staff",
    starterMarkdown: `# Classroom display quick checks

## Use this when
The laptop is connected but the classroom display is not working as expected.

## Try first
1. Check the display input/source.
2. Press Windows + P and choose Duplicate.
3. Check the cable or adapter is firmly connected.
4. Check audio output if picture works but sound does not.

## Contact ICT with
- Room
- Device
- What changed
- What you already tried
- Whether it affects one device or many

## Privacy note
Do not include student or confidential classroom details.`
  }
];
```

## Rubric function

```ts
export function scoreKbDraft(markdown: string, audience: string) {
  return {
    clearTitle: markdown.startsWith("# ") ? 1 : 0,
    correctAudience: audience ? 1 : 0,
    stepOrder: /1\./.test(markdown) ? 1 : 0,
    brevity: markdown.length < 2500 ? 1 : 0,
    safetyPrivacy: containsSensitivePattern(markdown) ? 0 : 1,
    likelyDeflectionValue: markdown.includes("Contact ICT with") ? 1 : 0
  };
}
```

## Acceptance test

Josh can open `/knowledge-base-lab`, choose “Printer symptom matrix”, draft a safe article, score it, save it locally, and export Markdown.

---

# Suggested implementation order

Do them in this order:

```txt
1. Scenario note scoring
2. Unified Due Today
3. Quiet-window dashboard
4. Question-first module flow
5. Knowledge Base Lab
```

Why? Scenario note scoring creates better evidence. Due Today makes that evidence reusable. The dashboard gives you quick access. Question-first modules improve learning quality. Knowledge Base Lab turns the learning into useful DCS artefacts.

---

# Copilot prompt

```text
Implement five SupportOps Career Lab upgrades in the existing Next.js / TypeScript app:

1. Quiet-window dashboard and focus modes
2. Question-first module experience
3. Scenario Lab Jira-note scoring
4. Unified Due Today review queue
5. Knowledge Base Lab

Use the existing app structure:
- app/page.tsx
- app/due-today/page.tsx
- app/scenarios/page.tsx
- app/modules/[moduleId]/page.tsx
- src/data/modules.ts
- src/data/scenarios.ts
- src/lib/progress.ts
- src/lib/readinessMath.ts
- src/lib/spacedRepetition.ts
- src/types/training.ts
- src/types/scenarios.ts
- src/components/shell/navigation.ts

General rules:
- Keep everything local-first using localStorage.
- Preserve existing progress with safe migrations/defaults.
- Do not copy or store confidential DCS data.
- Do not encourage unsafe production admin practice.
- Teach triage, first-line troubleshooting, evidence capture, privacy-safe wording, and escalation quality.

Feature 1: Quiet-window dashboard and focus modes
- Add src/lib/focusModes.ts.
- Add components:
  - src/components/dashboard/FocusModeCard.tsx
  - src/components/dashboard/NextBestActionPanel.tsx
  - src/components/focus/SingleTaskSession.tsx
- Add focus modes:
  - start-tiny
  - twenty-minute-focus
  - overwhelmed
- Update app/page.tsx with buttons:
  - Start tiny
  - 20-minute focus block
  - I’m overwhelmed
  - Review due flashcards
  - Do one scenario step
  - Log PD
- Add reminder: “Tickets, walk-ups, calls, and Paul’s instructions come first.”
- Recommendations should use weak topics, due review items, scenario completion, and practical output status.

Feature 2: Question-first module experience
- Extend TrainingModule with optional diagnosticPrompts.
- Add DiagnosticPrompt type:
  id, prompt, expectedAnswer, linkedSectionId.
- Add diagnosticAttempts to UserProgress.
- Update ModuleDetail so the first tab/action is “Start here”, not passive reading.
- New module order:
  1. Start here
  2. Recall
  3. Learn
  4. Flashcards
  5. Scenario
  6. Practical output
  7. Review
- Store diagnostic answers with selfRating: missed, partial, solid.
- Show weak areas, due items, and next best action at the top of the module page.

Feature 3: Scenario Lab Jira-note scoring
- Extend ScenarioRun with:
  ticketNote
  noteScore
- Add ScenarioNoteScore type:
  total, whoWhereDevice, exactSymptom, scope, stepsTried, urgencyImpact, nextAction, privacySafeWording, feedback.
- Add src/lib/scenarioNoteScoring.ts.
- At the end of every scenario, require a Jira-style note before marking complete.
- Score note against:
  who / where / device
  exact symptom
  scope
  steps tried
  urgency / impact
  next action
  privacy-safe wording
- Show model ticket note after submission.
- Store note score in localStorage.
- Create due-review items for weak scenario decisions and weak note areas.

Feature 4: Unified Due Today review
- Add src/lib/dueReview.ts.
- Add DueReviewItem union type for:
  flashcard
  missed-question
  scenario-step
  ticket-note
- Build getDueReviewItems(progress).
- Update app/due-today/page.tsx to use one unified queue.
- Add filters:
  All, Flashcards, Missed questions, Scenarios, Ticket notes.
- Show each item with topic, system, review type, difficulty, due date, and action.
- Keep Again / Hard / Good / Easy for flashcards.
- Link missed questions to strict quiz and modules.
- Link scenario-step and ticket-note reviews to Scenario Lab.

Feature 5: Knowledge Base Lab
- Add route app/knowledge-base-lab/page.tsx.
- Add navigation item.
- Add types:
  KnowledgeBaseDraft
  KnowledgeBaseRubricScores
- Add knowledgeBaseDrafts to UserProgress.
- Add src/data/practicalTemplates.ts with templates:
  Parent Portal registration guide
  Parent Portal detail-update guide
  password-reset guide
  Wi-Fi onboarding checklist
  website-unblock checklist
  onboarding request template
  Sentral triage cheat sheet
  OurDCS quick-reference guide
  Teams / SharePoint / OneDrive issue triage guide
  iPad / Jamf first-response checklist
  printer symptom matrix
  classroom AV quick-fix flow
- Add src/lib/knowledgeBase.ts with:
  saveKbDraft
  updateKbDraft
  deleteKbDraft
  scoreKbDraft
  exportKbDraftMarkdown
- Add components:
  KbTemplatePicker
  KbDraftEditor
  KbRubricPanel
- Rubric scores:
  clear title
  correct audience
  step order
  brevity
  safety/privacy
  likely deflection value
- Store drafts locally.
- Allow copy/export as Markdown.
- Add privacy reminder on the page.

Tests:
- Add tests for:
  focus mode recommendation logic
  diagnostic progress storage
  scenario note scoring
  due review item calculation
  knowledge base rubric scoring
- Run npm run lint.
- Run npm run build.
- Fix all TypeScript errors.
```

These 5 would make the app feel much more like a **work-integrated learning cockpit** rather than just a collection of study pages.
