The **next 5 highest-impact features** after the ones we’ve already covered would be these:

## 1. Weak-area detector / next-best-action engine

This becomes the app’s “brain”.

It would look across:

* missed quiz questions
* weak scenario choices
* poor ticket-note scores
* flashcard struggles
* unfinished modules
* repeated topic gaps

Then it tells you:

> “Your weakest current area is access requests and permissions. Do one 10-minute drill next.”

**Why high impact:** it stops the app becoming a pile of pages. It tells you what to do next.

---

## 2. Error Log with “why it matters at DCS”

Not just:

> “You got DHCP wrong.”

But:

> “This matters because a 169.254 address on a student laptop tells you the device did not receive a usable network lease. At DCS, this affects Wi-Fi triage and escalation quality.”

**Why high impact:** this turns mistakes into practical workplace learning.

---

## 3. System ownership map

A visual map of:

* ICT-owned issues
* admin-owned issues
* teacher/content-owned issues
* leadership approval issues
* vendor/service-call issues
* “capture evidence and escalate” issues

Example:

```txt
Parent Portal login issue → triage symptoms → likely admin/Ruth handoff
ViewBoard no display → ICT first-line triage
Blocked website → capture URL + purpose + approval pathway
Sentral markbook visibility → awareness + escalation, not deep admin ownership
```

**Why high impact:** this protects you from over-owning things and helps you sound professional.

---

## 4. Privacy-safe wording trainer

A tool that rewrites messy notes into safe support wording.

Example:

Bad:

```txt
Sarah Smith in Year 8 couldn’t log in and her password might be wrong.
```

Better:

```txt
Student account login issue reported. User unable to authenticate. No password was requested or recorded. Further account check/escalation required.
```

**Why high impact:** school IT lives or dies on safe wording, especially around students, parents, accounts, access, and security.

---

## 5. DCS workflow decision trees

Interactive troubleshooting flows for common issues.

Examples:

* Parent can’t access portal
* Teacher laptop won’t display
* No sound on ViewBoard
* Website blocked
* One student can’t access Wi-Fi
* New staff member missing access
* Printer job not releasing
* Staff reports phishing email

Each decision tree should end with:

* next safe action
* what to record
* whether to escalate
* sample Jira note

**Why high impact:** this bridges learning and actual work better than normal quizzes.

---

## My ranked order

If I were building the app, I’d do them in this order:

1. **Weak-area detector / next-best-action engine**
2. **Error Log with DCS relevance**
3. **System ownership map**
4. **Workflow decision trees**
5. **Privacy-safe wording trainer**

These would make the app feel less like “study content” and more like a **safe, practical DCS IT support coach**.

Yes. I’ve made this concrete as a **drop-in feature patch** for your actual DCSPrep app structure.

Files here:

* [Download the patch file](sandbox:/mnt/data/dcsprep_next5_features.patch)
* [Download changed/new files as zip](sandbox:/mnt/data/dcsprep_next5_feature_files.zip)

I didn’t run `npm run build` because the extracted source copy I worked from did not include `node_modules`. But the implementation is written against your actual app folders and TypeScript structure.

---

## The 5 features implemented

These are the 5 highest-impact next features:

1. **Weak-area detector / next-best-action engine**
2. **Error Log with “why it matters at DCS”**
3. **System ownership map**
4. **Privacy-safe wording trainer**
5. **DCS workflow decision trees**

These line up strongly with your TODO’s emphasis on Level 1-safe support, escalation quality, privacy-safe wording, and practical DCS workflow training. 

---

## New directory/file structure

This is exactly what I added/changed:

```txt
app/
  page.tsx                              UPDATED
  error-log/
    page.tsx                            UPDATED
  next-best-action/
    page.tsx                            NEW
  ownership-map/
    page.tsx                            NEW
  privacy-wording/
    page.tsx                            NEW
  workflow-trees/
    page.tsx                            NEW

src/
  components/
    shell/
      navigation.ts                     UPDATED

  data/
    supportCoach.ts                     NEW

  lib/
    weakAreaEngine.ts                   NEW
    privacyWording.ts                   NEW
    workflowTrees.ts                    NEW
```

---

# 1. Weak-area detector / next-best-action engine

## What it adds

New route:

```txt
/next-best-action
```

New logic file:

```txt
src/lib/weakAreaEngine.ts
```

It looks at:

```txt
progress.assessmentAttempts
progress.weakTopicReviews
due review dates
revisit flags
average scores
evidence count
```

Then it ranks weak areas like:

```txt
DNS, DHCP, and gateway basics
Ticket quality
Printer symptoms
Security and risk judgement
VLAN and firewall rules
```

It produces:

```ts
{
  topic,
  label,
  priorityScore,
  evidenceCount,
  reasons,
  dcsWhyItMatters,
  nextBestAction,
  recommendedHref,
  practicePrompt,
  safeBoundary
}
```

## Core file

```txt
src/lib/weakAreaEngine.ts
```

Main functions:

```ts
getWeakAreaSignals(progress)
getNextBestAction(progress)
```

## Dashboard integration

I updated:

```txt
app/page.tsx
```

The dashboard now shows both:

```txt
Recommended 20-minute block
Weak-area engine
```

So the app can say:

> Focus on DNS, DHCP, and gateway basics. Review DHCP vs DNS vs gateway, then practise the 169.254 student laptop scenario.

---

# 2. Error Log with “why it matters at DCS”

## What it changes

Updated route:

```txt
/error-log
```

Before, the Error Log mainly showed the wrong answer and corrected concept.

Now each weak area includes:

```txt
Why this matters at DCS
Next practice action
Safe boundary
Recommended module link
Practise again link
```

Example:

```txt
Why it matters at DCS:
DNS, DHCP, gateway, and APIPA reasoning is core to Level 1 Wi-Fi and classroom connectivity triage. It helps separate one-device issues from network-wide issues.

Next practice:
Review DHCP vs DNS vs gateway, then practise the 169.254 student laptop scenario.

Safe boundary:
Do not change scopes, reservations, VLANs, or network infrastructure. Compare devices and escalate clearly.
```

## Main changed file

```txt
app/error-log/page.tsx
```

It now imports:

```ts
import { weakTopicCoaching } from '../../src/data/supportCoach';
```

That means your Error Log is no longer just a record of mistakes. It becomes a **DCS-relevance learning loop**.

---

# 3. System ownership map

## What it adds

New route:

```txt
/ownership-map
```

New source data:

```txt
src/data/supportCoach.ts
```

The ownership map covers:

```txt
Classroom AV / ViewBoards
Login / password / MFA
Parent Portal / Sentral
Files / Teams / SharePoint / OneDrive
Website filtering
Printers / photocopiers / PaperCut
```

Each ownership card includes:

```ts
primaryOwner
joshRole
examples
captureBeforeEscalation
avoid
escalationWording
```

Example:

```txt
Parent Portal and Sentral-style requests

Primary owner:
Admin

Josh role:
Awareness and triage only unless assigned: capture symptoms, confirm system/request type, identify whether it is access, family details, markbook/reporting, or admin-owned data.

Avoid:
- Changing family data
- Copying private parent/student details into notes
- Acting as if Sentral admin ownership sits with Josh
```

This is important because it keeps the app from training you to over-own systems that may not actually be your lane.

---

# 4. Privacy-safe wording trainer

## What it adds

New route:

```txt
/privacy-wording
```

New helper:

```txt
src/lib/privacyWording.ts
```

It gives you a textbox where you can paste a **fictional practice note**, then it returns:

```txt
risk level
warnings
safer wording
examples
```

Example input:

```txt
Sarah Smith in Year 8 cannot log in and thinks her password is wrong.
```

Safer output:

```txt
Account login issue reported. User unable to authenticate to the named system. No password was requested or recorded. Error/context captured and escalation required if first-line checks do not resolve it.
```

## Local rule-based only

This is deliberately **not AI-based** yet.

That is safer because it avoids sending potentially sensitive school data to an external API.

The rule function is:

```ts
reviewPrivacyWording(text)
```

It checks for:

```txt
password/passcode wording
student/parent/family details
IP address patterns
serial number wording
phishing/suspicious email wording
```

---

# 5. DCS workflow decision trees

## What it adds

New route:

```txt
/workflow-trees
```

New helper:

```txt
src/lib/workflowTrees.ts
```

It adds interactive decision trees for:

```txt
Teacher laptop will not display on ViewBoard
Student laptop has 169.254 IP address
Teacher requests blocked website be unblocked
Printer jobs stuck in queue
Staff member reports suspicious email
```

Each tree includes:

```txt
step prompt
possible choices
recommended choice
outcome
final decision point
model ticket note
ownership boundary
related weak topics
```

Example workflow:

```txt
Student laptop has 169.254 IP address

Step:
A student laptop has a 169.254.x.x address. What does that usually suggest?

Recommended:
The device did not receive a usable DHCP lease.

Model note:
Student device network issue: laptop showing 169.254.x.x address and cannot access network. Checked SSID and compared with another device/location where possible. Appears DHCP/connectivity related. Escalating with room/device/scope details.
```

This turns your app from “study and quiz” into “practise real support judgement”.

---

## Navigation updates

I updated:

```txt
src/components/shell/navigation.ts
```

Added:

```ts
{ href: '/next-best-action', label: 'Next Best Action' },
{ href: '/ownership-map', label: 'Ownership Map' },
{ href: '/workflow-trees', label: 'Workflow Trees' },
{ href: '/privacy-wording', label: 'Privacy Wording' },
```

---

## Exact implementation order for you / Copilot

Use this order:

```txt
1. Copy in src/data/supportCoach.ts
2. Copy in src/lib/weakAreaEngine.ts
3. Copy in src/lib/privacyWording.ts
4. Copy in src/lib/workflowTrees.ts
5. Add new app routes:
   - app/next-best-action/page.tsx
   - app/ownership-map/page.tsx
   - app/privacy-wording/page.tsx
   - app/workflow-trees/page.tsx
6. Replace app/error-log/page.tsx
7. Replace app/page.tsx
8. Replace src/components/shell/navigation.ts
9. Run:
   npm run lint
   npm run build
10. Fix any import/path issues if your local tree differs from the uploaded copy.
```

---

## Copy-paste Copilot prompt

```text
Implement the next 5 high-impact DCSPrep features using the attached patch/files:

1. Weak-area detector / next-best-action engine
2. Error Log with “why it matters at DCS”
3. System ownership map
4. Privacy-safe wording trainer
5. DCS workflow decision trees

Use the current Next.js app structure:
- app/page.tsx
- app/error-log/page.tsx
- src/components/shell/navigation.ts
- src/lib/progress.ts
- src/types/assessment.ts
- src/data/skillDomains.ts

Add these new files:
- src/data/supportCoach.ts
- src/lib/weakAreaEngine.ts
- src/lib/privacyWording.ts
- src/lib/workflowTrees.ts
- app/next-best-action/page.tsx
- app/ownership-map/page.tsx
- app/privacy-wording/page.tsx
- app/workflow-trees/page.tsx

Update:
- app/page.tsx
- app/error-log/page.tsx
- src/components/shell/navigation.ts

Keep everything local-first.
Do not add external dependencies.
Do not send data to AI.
Do not store real DCS ticket details, student names, parent names, staff names, passwords, IP addresses, serial numbers, or confidential procedures.

After implementation, run:
npm run lint
npm run build

Fix all TypeScript or import errors.
```

My strong recommendation: implement these before Groq/AI. These give the app a safer brain first. Then AI coaching can sit on top of a much better structure.
