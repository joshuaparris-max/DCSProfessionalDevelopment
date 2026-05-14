# DCSPrep Fix Notes

Document of fixes applied to the DCSPrep IT PD Learning Cockpit.

---

## v0.2.0 - IT PD Cockpit (2026-04-30)

### Fixed Issues

1. **Spaced Repetition Module Conflict**
   - Issue: Original `spacedRepetition.ts` had different exports than new IT PD code needed
   - Fix: Added new PD-prefixed functions alongside original functions
   - Files: `src/lib/spacedRepetition.ts`

2. **Import Path Errors**
   - Issue: Dashboard importing `getDueCount` but file exported `getPDDueCount`
   - Fix: Updated imports to use new PD-prefixed function names
   - Files: `app/page.tsx`, `app/due-today/page.tsx`

3. **Module Progress / Test Compatibility**
   - Issue: `moduleMath.test.ts` still depended on `getNextReviewDate`, while progress defaults and module completion logic had drifted from the current module data model
   - Fix: Restored `getNextReviewDate` compatibility export, corrected default `sectionsRead` keys, added normalized defaults for flashcards/quiz/practical outputs, and updated module completion scoring to include sections, flashcards, quizzes, and practical outputs
   - Files: `src/lib/spacedRepetition.ts`, `src/lib/progress.ts`, `src/lib/moduleMath.ts`

4. **Build Warning - next.config.mjs**
   - Issue: `experimental.appDir` is deprecated in Next.js 14.2+
   - Status: Resolved
   - Fix: Removed the stale `experimental.appDir` setting; `next.config.mjs` now only enables React strict mode.

### Package Versions (Locked)

```json
{
  "next": "14.2.35",
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "lucide-react": "0.275.0",
  "zustand": "4.5.7",
  "zod": "3.25.76",
  "typescript": "5.9.3",
  "tailwindcss": "3.4.19",
  "vitest": "1.6.1"
}
```

---

## v0.1.0 - Original DCSPrep

### Original Fixes
- (Document any fixes from original app here)
