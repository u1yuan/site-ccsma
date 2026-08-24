# Cursor prompt — ONE-SHOT BUILD (placeholders first)

Paste the single prompt below into Cursor. It builds all four phases in one branch with placeholders,
so the whole site structure is done and you upload real images afterward (just edit
`src/content/media.ts` + drop files into `public/` — no code changes needed later).

---

## THE PROMPT (paste this)

```
Read CURSOR_GUIDE.md IN FULL before writing any code, and obey §0.5 (BUILD MODE), §1 (Guardrails),
and §2 (Image Contract) exactly. This is a single, one-pass, placeholders-first build.

CORE RULE: build the ENTIRE site structure now with EVERY image slot showing its fallback. All media
manifests start EMPTY. The site must look complete and intentional with ZERO real images present —
that is the deliverable. Real images are added later by editing src/content/media.ts and dropping
files into public/; your code must require no further changes when that happens.

BRANCH: the started Phase-1 work is already uncommitted in the working tree. Run
`git switch -c feat/adviser-round` to carry it onto a new branch. Do NOT `git switch main` first.

Then do Phases 1→2→3→4 from CURSOR_GUIDE.md in order, on this one branch:

PHASE 1 — org content + logos:
- Keep the existing org copy / OrgCard / monogram / tests (already in the tree). Do not redo them.
- Org logo path = public/logos/orgs/ (leave each org `logo` unset → monogram shows). Add .gitkeep in
  public/logos/orgs/ and public/logos/accreditation/.
- Add an accreditation strip to ProgramsHero/app/page.tsx: typed array of {label, src} for PAASCU,
  PICAB, Cisco, SAP, Oracle Academy, MIE, AutoCAD; render PNG if present else a text chip. Tokens only.

PHASE 2 — org detail pages:
- app/organizations/[slug]/page.tsx, statically generated: generateStaticParams over every org id,
  generateMetadata per org. Render logo/monogram, name, abbr, role label, "Community description"
  label when status==="summary", description, mission/vision/motto/values/links (each only if present).
- Create src/content/media.ts with typed EMPTY manifests (activityMedia, programIllustrations,
  directors) keyed by org-slug/program-id, each with // TODO(human). Add activity-gallery + directors
  slots on the detail page showing the §2.3 placeholder while empty.
- Make OrgCard link to /organizations/<slug>/ ; keep map layout + SCC centered connector unchanged;
  keep full copy on the card. Add a "back to all organizations" link.

PHASE 3 — activity media + directors (follow §2.4 accessibility EXACTLY: keyboard-openable,
Escape-dismiss, content static under prefers-reduced-motion, hover is enhancement only):
- GlowTree light nodes → focusable triggers opening that branch's activityMedia panel/lightbox (map
  each light position to an org or SADU key); empty → §2.3 placeholder, still focusable + labelled.
- SADU developmentPrograms items → triggers revealing programIllustrations.
- Directors gallery on org detail pages and /student-activities driven by the directors manifest;
  empty + // TODO(human); invent NO names or titles.

PHASE 4 — landing + polish:
- Restructure app/page.tsx/ProgramsHero into the Paraverse LAYOUT only (big hero headline, short
  support line, calm starfield/bio bg) using existing tokens + existing scroll components. NO full
  interactivity, NO new libs, NO WebGL. Keep the six programs below.
- Audit app/globals.css type scale into coherent token-based --font-size-* steps with clamp()
  responsive sizing, applied consistently to hero/section/card/mantra headings; no mobile overflow.
  Change sizing/rhythm ONLY, no copy.
- Surface the full existing sadu.ts data on /student-activities (vision, mission, roles,
  developmentPrograms, activityResponsibilities, full contact block), clearly labelled. // TODO(human)
  for any extra SADO details; invent nothing.

HARD CONSTRAINTS: no new dependencies, no backend/CMS/WebGL, no raw hex (tokens only), no invented
copy, no real/scraped/generated images. Every slot has a §2.3 fallback; no path that 404s. Update
.cursor/CONTENT.md, .cursor/DESIGN.md, .cursor/ARCHITECTURE.md, and add a dated ADR to the top of
.cursor/DECISIONS.md.

FINISH: run and paste output for, in order: npm run format:write, npm run lint, npm run typecheck,
npm test, npm run build, npm run test:e2e. Do NOT weaken assertions. Do NOT auto-update
e2e/visual.spec.ts snapshots — the landing moved pixels; flag it and wait for me. Commit and push.
Do NOT open the PR until I confirm.
```

---

## After Cursor finishes

Paste its full test-gate output back to the overseer for the §5 review before merging.

To add real images later (no code change): put files in the `public/...` paths from §2.1, then add the
matching `{ src, alt }` entries to `src/content/media.ts` (and set each org's `logo` field). Done.

---

## Fallback: phased prompts (only if the one-shot is too big for one run)

If Cursor struggles to do it all at once, split at the phase boundaries above — run Phase 1, then 2,
then 3, then 4 as separate messages, all on the same `feat/adviser-round` branch, running the full
test gate only after Phase 4.

```

```
