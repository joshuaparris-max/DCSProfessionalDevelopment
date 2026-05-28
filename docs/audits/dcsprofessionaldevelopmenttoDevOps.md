Yes — don’t delete it. **Reframe it.**

Right now the app’s structure is strong: it already has modules, scenarios, PD logging, readiness profiles, support tools, and an evidence-pack export. The problem is the **DCS identity layer**, not the learning engine. The live app is still framed around “DCS IT support” and “Paul’s instructions,” while the repo describes it as a local-first Next.js PD app for Josh’s DCS IT support growth. ([DCSPrep][1]) ([GitHub][2])

## Best pivot

Turn it from:

**DCSPrep**
→ “Help Josh grow in DCS school IT”

Into:

**IT Career Lab** / **SupportOps Career Lab**
→ “Help Josh grow from L1 support into stronger MSP, M365, endpoint, networking, cloud, security, and service-desk capability.”

Then make **DCS one profile**, not the whole app.

## What to keep

Keep these because they are still career-relevant:

| Current feature | Future use                               |
| --------------- | ---------------------------------------- |
| Modules         | IT skill learning                        |
| Scenario Lab    | Real-world support simulations           |
| PD Log          | Evidence of professional growth          |
| Error Log       | Track repeated weak spots                |
| Readiness       | Career/certification progress            |
| Evidence Pack   | Portfolio / manager-safe progress report |
| Support Tools   | Reusable checklists and templates        |

The evidence-pack feature is especially valuable because it already exports a privacy-safe Markdown summary for reflection, review, or portfolio sharing. That becomes useful for future managers, interviews, performance reviews, or your own confidence. ([DCSPrep][3])

## What to change

### 1. Rename the app

Use something broader:

**SupportOps Career Lab**
or
**Josh IT Career Lab**

I’d probably choose **SupportOps Career Lab** because it sounds professional and not locked to one workplace.

### 2. Add “career tracks”

Instead of only DCS modules, add tracks like:

1. **MSP Level 1 Support**
2. **MSP Level 2 Pathway**
3. **Microsoft 365 Admin**
4. **Endpoint / Intune / Device Management**
5. **Networking Foundations**
6. **Cybersecurity Triage**
7. **VoIP / 3CX Basics**
8. **Professional Communication and Ticket Notes**
9. **CompTIA A+ / Network+ / Security+ Prep**
10. **AI-Assisted IT Support — Safe Use**

The current app already has 126 modules across foundations, networking, endpoint support, identity, cloud, operations, cybersecurity, data/AI, professional practice, and automation, so this is a reframing more than a total rebuild. ([DCSPrep][4])

### 3. Convert DCS-specific topics into universal IT topics

| DCS-specific now         | Career-relevant version                      |
| ------------------------ | -------------------------------------------- |
| Parent Portal            | SaaS / line-of-business app support          |
| Sentral                  | School/health/business platform triage       |
| OurDCS / Schoolbox       | LMS / intranet / portal support              |
| ViewBoards               | AV / meeting room / display support          |
| PaperCut / Follow-Me     | Print management support                     |
| Jamf / iPad              | MDM and mobile device support                |
| Website unblock requests | Web filtering / security exception workflow  |
| New staff onboarding     | Identity, access, groups, devices, licensing |
| DCS privacy              | General privacy-safe IT documentation        |

This means your DCS learning still counts, but it gets translated into skills another employer will recognise.

### 4. Add an MSP mode

This is the big one for your next IT career step.

Add a setting:

**Work context**

* DCS / School IT
* MSP
* Healthcare practice IT
* General internal IT
* Certification study
* Job interview prep

Then the same scenario engine can generate different versions.

Example:

**Old scenario:**
“Teacher cannot display laptop on ViewBoard.”

**New career version:**
“Client reports meeting room display has no signal before a Teams meeting.”

Same skills. Broader relevance.

### 5. Upgrade readiness profiles

The current readiness page estimates CompTIA A+, Level 2 support, and School IT Manager readiness, but it says these are indicative only and need more quiz attempts, weak-topic reviews, and scenario note scores to become meaningful. ([DCSPrep][5])

Change readiness profiles to:

* CompTIA A+ readiness
* MSP L1 readiness
* MSP L2 readiness
* Microsoft 365 admin readiness
* Endpoint / Intune readiness
* Networking fundamentals readiness
* Cybersecurity triage readiness
* Ticket quality / documentation readiness
* AI-assisted support safety readiness

That directly supports your career after DCS.

## Priority rebuild order

Do it in this order:

1. **Rename and rebrand** from DCSPrep to SupportOps Career Lab.
2. **Add work-context profiles** so DCS becomes just one mode.
3. **Retag every module** as `universal`, `school-it`, `msp`, `m365`, `endpoint`, `networking`, `security`, `certification`.
4. **Rewrite dashboard copy** so it no longer says DCS is the main purpose.
5. **Add MSP scenarios** based on ticket triage, M365, printers, Wi-Fi, phishing, backups, 3CX, RMM, and client communication.
6. **Turn Evidence Pack into Career Portfolio Export.**
7. **Add Job Ad Gap Analyzer** later: paste a job ad, and the app tells you what modules/scenarios to practise.

## The key design principle

The app should stop asking:

> “Can Josh handle DCS support?”

And start asking:

> “Can Josh handle real-world IT support calmly, safely, accurately, and professionally?”

That lines up better with your next season.

## Prompt for Codex

```text
You are upgrading the DCSProfessionalDevelopment app so it remains useful after Josh finishes at Dubbo Christian School on 17 July 2026.

Goal:
Reframe the app from a DCS-specific professional development tool into a broader IT career development app called “SupportOps Career Lab”.

Do not remove DCS content. Instead, turn DCS into one selectable work-context profile.

Implement the following:

1. Rename user-facing branding:
- Replace “DCSPrep” with “SupportOps Career Lab”.
- Replace “Your DCS PD Dashboard” with “Your IT Career Growth Dashboard”.
- Remove language that implies DCS is the permanent centre of the app.
- Keep privacy warnings, but generalise them beyond DCS.

2. Add work-context profiles:
- DCS / School IT
- MSP Support
- Healthcare Practice IT
- General Internal IT
- Certification Study
- Job Interview Prep

Store selected profile locally.

3. Retag modules and scenarios:
Add metadata fields where needed:
- careerTags: string[]
- contextTags: string[]
- certificationTags: string[]
- transferableSkill: string

Examples:
- Parent Portal → SaaS / line-of-business app support
- Sentral → platform support and vendor escalation
- ViewBoard → AV / display troubleshooting
- PaperCut / Follow-Me → print management
- Jamf / iPad → MDM and mobile device support
- Website filtering → web security exception workflow
- New user onboarding → identity, access, groups, licensing, devices

4. Update dashboard recommendations:
Dashboard should recommend study based on:
- selected work context
- weakest readiness area
- due reviews
- recent errors
- short quiet-window availability

5. Expand readiness profiles:
Replace or supplement “School IT Manager readiness” with:
- MSP L1 readiness
- MSP L2 pathway readiness
- Microsoft 365 admin readiness
- Endpoint / Intune readiness
- Networking fundamentals readiness
- Cybersecurity triage readiness
- Ticket documentation readiness
- CompTIA A+ readiness

6. Rework Evidence Pack:
Rename to “Career Evidence Pack”.
It should export a privacy-safe Markdown summary including:
- modules completed
- scenarios completed
- strongest skill areas
- weakest skill areas
- practical outputs created
- ticket-note/documentation practice
- certification alignment
- portfolio-safe summary for interviews or managers

7. Add MSP scenario seeds:
Create scenario entries for:
- M365 password/MFA issue
- suspected phishing email
- printer not releasing jobs
- client Wi-Fi down in one area
- 3CX phone not registering
- endpoint alert from RMM
- device low disk space
- new user onboarding missing licence/groups
- SharePoint/OneDrive sync issue
- client asks to use AI with sensitive data

Keep all data local-first and privacy-safe. Do not add backend/auth unless absolutely necessary. Preserve the existing learning engine, scenario engine, progress storage, and privacy boundaries.
```

Bottom line: **this app can become more relevant after DCS than it is now** — if you make it about your IT career, not your current workplace.

[1]: https://dcs-professional-development.vercel.app/ "DCSPrep"
[2]: https://github.com/joshuaparris-max/DCSProfessionalDevelopment "GitHub - joshuaparris-max/DCSProfessionalDevelopment · GitHub"
[3]: https://dcs-professional-development.vercel.app/evidence-pack "DCSPrep"
[4]: https://dcs-professional-development.vercel.app/modules "DCSPrep"
[5]: https://dcs-professional-development.vercel.app/readiness "DCSPrep"
