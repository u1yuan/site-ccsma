# CCSMA Site — Cursor Build Guide (Adviser Round)

**Author:** Senior dev / overseer (Claude). **Executor:** Cursor. **Human:** prepares images, pastes prompts, ships.

This guide turns adviser **Doc Hazel's** comments into four buildable phases. It supersedes
`IMPLEMENTATION_PLAN.md` for this round. Where this guide and the old plan disagree, **this guide wins**.
Where a `.cursor/*.md` doc describes old behavior this guide changes, update that doc as instructed.

Read this whole file before starting. Do the phases **in order**, but in **one build on one branch**
(see §0.5).

---

## 0.5 BUILD MODE — placeholders first, one branch, one pass

The human is short on time and will build **everything at once**, then upload real images afterward.
So:

- **Placeholders-first is the whole point.** Build every logo/photo/director slot now with its
  **fallback showing** (monogram for logos, themed "coming soon" panel for photos — see §2.3). Every
  media manifest in `src/content/media.ts` starts **empty**. The site must look **complete and
  intentional with zero real images present** — that is the deliverable of this pass. Real images get
  added later by editing the manifest + dropping files into `public/`; nothing else changes.
- **One branch for all four phases.** The started Phase-1 work is **already uncommitted in the working
  tree** on branch `feat/organizations-content`. Preserve it: run `git switch -c feat/adviser-round`
  (this carries the uncommitted changes onto the new branch). **Do NOT run `git switch main` first** —
  that is unnecessary and risks the in-progress work. Do Phases 1→2→3→4 in order on this single branch.
  (Normally one branch per feature; we're consolidating deliberately because the human is time-boxed
  and wants one review.)
- **One commit at the end** (or one commit per phase if convenient), then push. Do **not** open the PR
  until the human confirms.
- **Run the full test gate once at the very end** (§1) and paste all output. For `e2e/visual.spec.ts`
  snapshots: the landing (Phase 4) moves pixels — **do not auto-update snapshots**; flag it and wait.
- Everything else in this guide still applies unchanged.

---

## 0. Doc Hazel's comments → where they land

| #   | Adviser comment                                        | Phase | Lands in                                                        |
| --- | ------------------------------------------------------ | ----- | --------------------------------------------------------------- |
| 1   | Absence of logos                                       | 1     | Org logo slots + accreditation logos on `/` programs            |
| 2   | Font size formatting                                   | 4     | Global type scale audit                                         |
| 3   | SADO/SADU information missing / not illustrated        | 3 + 4 | Dev-program illustrations, director photos, fuller SADU section |
| 4   | Landing page like Paraverse (layout only)              | 4     | `app/page.tsx` hero/layout                                      |
| 5   | Organization pages are missing                         | 2     | New `/organizations/[slug]` routes                              |
| 6   | On hover, school-activity pictures appear              | 3     | GlowTree light nodes                                            |
| 7   | On click, pic illustrates Student Development Programs | 3     | SADU dev-programs section                                       |
| 8   | Put pictures of Sr Directors and Directors             | 3     | Directors gallery on org pages + SADU                           |

---

## 1. Guardrails (non-negotiable — a violation = revert)

- **Stack is locked.** Next.js static export (`output: "export"`, `images.unoptimized: true`).
  **No new runtime dependencies, no WebGL, no CMS, no data fetching, no backend.** If you think you need
  a dependency, STOP and write an ADR entry in `.cursor/DECISIONS.md` proposing it instead of installing.
- **One feature, one branch**, branched off `main` (except Phase 1, already in progress on its branch).
  Never commit to `main` directly.
- **Design tokens only.** No raw hex in components. Reuse existing Pandora tokens in `app/globals.css`
  and Tailwind token classes. Match the visual language already in `OrgCard`, `ProgramSection`, `GlowTree`.
- **No invented content.** Do not invent, paraphrase, or augment any org fact, mission, vision, motto,
  value, name, date, or statistic beyond what is in this file or already in `src/content/*`. If copy is
  missing, leave `// TODO(human): supply copy for X` — do **not** guess. Do **not** scrape or generate logos.
- **No invented images.** You build **slots + fallbacks only**. Real image files are added by the human.
  Never download, generate, or embed a real photo/logo. See the Image Contract (§2).
- **Accessibility floor holds.** Every new UI renders fully and legibly with `prefers-reduced-motion` set,
  is keyboard reachable, and has alt text. No content gated behind hover/animation alone (see §2.4). WCAG 2.1 AA.
- **Tests gate every phase.** Run in order and all must pass before you claim done:
  `npm run format:write` → `npm run lint` → `npm run typecheck` → `npm test` → `npm run build` → `npm run test:e2e`.
  Never weaken an assertion to get green. Update assertions only where a phase explicitly says to, and make
  the new assertion check the **new correct behavior**, not nothing.
- **Docs stay truthful.** When a phase changes behavior described in `.cursor/CONTENT.md`, `.cursor/DESIGN.md`,
  or `.cursor/DECISIONS.md`, update that doc in the same branch.

---

## 2. Image Contract (READ THIS — the human supplies all images)

The human drops image files into `public/` after (or before) you build the slots. Your job: build UI that
**reads from these exact paths**, degrades gracefully when a file is absent, and never hardcodes a missing
file in a way that 404s loudly.

### 2.1 Folders & naming

```
public/
  logos/
    orgs/            acm.png  aits.png  jpcs.png  prism.png  scc.png
    accreditation/   picab.png  paascu.png  cisco.png  sap.png  oracle-academy.png  mie.png  autocad.png
  activities/
    <org-slug>/      01.webp  02.webp  03.webp        (school-activity photos, per org)
    sadu/            01.webp  02.webp  03.webp        (SADU / general campus activities)
  programs/
    <program-id>/    01.webp  02.webp                 (Student Development Program illustrations)
  directors/
    <org-slug>/      <role-slug>.webp                 (e.g. president.webp, adviser.webp)
    sadu/            director.webp  sr-director.webp
```

- **Logos:** `PNG` with transparency. `org-slug` = the org `id` (`acm`,`aits`,`jpcs`,`prism`,`scc`).
- **Photos (activities, programs, directors):** `WebP`. Target ~1600px longest edge, <300KB each.
- **Filenames are lowercase-kebab, zero-padded numbers.** No spaces.

### 2.2 Manifest, not filesystem globbing

Static export can't read the filesystem at request time, so **do not** try to glob `public/`. Instead each
image set is declared in a typed manifest in `src/content/`, and the human keeps the manifest in sync with the
files they drop. Build the manifests as part of the relevant phase:

- `src/content/media.ts` — exports typed arrays keyed by org-slug / program-id, e.g.
  ```ts
  export interface MediaItem {
    src: string;
    alt: string;
    caption?: string;
  }
  export const activityMedia: Record<string, MediaItem[]> = {
    acm: [],
    aits: [] /* ... */,
  };
  export const programIllustrations: Record<string, MediaItem[]> = {
    /* program-id: [] */
  };
  export const directors: Record<string, DirectorItem[]> = {
    /* org-slug/sadu: [] */
  };
  ```
- Start every array **empty**. Empty array → the UI shows its fallback (see §2.3), never a broken `<img>`.
- Add a `// TODO(human): add entries as image files land in public/...` comment above each map.

### 2.3 Fallback rules (mandatory)

- **Org logo absent** → render the existing **monogram** (abbr in a Pandora-themed mark). Already implemented
  in `OrgCard`; reuse that exact pattern everywhere a logo appears.
- **Activity/program/director photo set empty** → render a quiet themed placeholder block (token-based, e.g.
  a soft bio-glow panel with a short label like "Photos coming soon"), **not** a broken image and **not**
  a hard error. It must look intentional.
- Every `<img>` gets meaningful `alt` from the manifest `alt` field. Decorative-only glow imagery stays
  `aria-hidden`.

### 2.4 Interaction accessibility (hover/click reveals — comment #6, #7)

Doc Hazel wants photos to appear on **hover** (GlowTree nodes) and on **click** (dev programs). Hover alone
is not accessible, so implement reveal as: **focusable + clickable trigger** (button or link), revealing a
panel/lightbox that is also reachable by keyboard (Tab + Enter/Space), dismissible by Escape, and that renders
its content statically when `prefers-reduced-motion` is set (no motion-gated content). Hover is an
enhancement on top of the click/focus behavior, never the only way in.

---

## 3. Phases

### Phase 1 — org content + logo slots (finish what's started)

**Branch:** `feat/adviser-round` (per §0.5 — do not create a separate branch per phase in this pass).

**Status:** the real org copy + `OrgCard` rewrite + monogram fallback + updated tests are ALREADY in the
working tree. **Do not redo them — finish and continue.**

**Do:**

1. Reorganize the logo path to the contract: org logos live under `public/logos/orgs/`. Update the
   `logo` field convention in `src/content/organizations.ts` so each org can set
   `logo: "/logos/orgs/acm.png"` (leave unset for now → monogram; the human adds files later).
2. Add `public/logos/orgs/.gitkeep` and `public/logos/accreditation/.gitkeep`.
3. Add an **accreditation logo strip** to the programs page hero area (`app/page.tsx` / `ProgramsHero`):
   a row of accreditation marks (PAASCU, PICAB, Cisco, SAP, Oracle Academy, MIE, AutoCAD) driven by a small
   typed array; each item falls back to a text chip (the label) when its PNG is absent. This directly answers
   Doc Hazel comment #1. Do not assert any accreditation the school doesn't hold — use only the labels above.
4. Confirm `.cursor/CONTENT.md` + a `.cursor/DECISIONS.md` ADR reflect: summary-status copy, monogram fallback,
   logos-by-hand-no-scraping, and the new `public/` image contract.
5. Run the full gate. Commit + push. Open PR to `main`.

**Acceptance:** `/organizations/` shows 0 "Content coming soon"; each org card shows its description; ACM shows
its 3 values; SCC stays centered "connector". Programs page shows the accreditation strip (chips until PNGs land).

---

### Phase 2 — org detail pages (Doc Hazel #5: "Organization pages are missing")

**Branch:** continue on `feat/adviser-round`.

**Goal:** each org gets a dedicated route `/organizations/<slug>/` with full detail. The map cards on
`/organizations/` become **links** into these pages.

**Do:**

1. Create `app/organizations/[slug]/page.tsx` as a **statically generated** route:
   - Export `generateStaticParams()` returning every org `id` (required under `output: "export"`).
   - Per-route `metadata` via `generateMetadata` (title = org name; distinct description = first sentence of
     `description`).
   - Render: logo/monogram, name, abbr, role label, `Community description` provenance label (when
     `status === "summary"`), description, mission/vision/motto/values (each only when present), links.
   - Add slots (from `media.ts`, §2) for: **activity photo gallery** and **directors gallery** — both showing
     the §2.3 placeholder until the human adds entries. Wire but leave arrays empty.
2. In `OrgCard` (used on the map), make the card title/mark a `next/link` to `/organizations/<slug>/` while
   keeping the map layout and SCC's centered connector position unchanged. Keep the full copy on the card too
   (the detail page is additive, the map stays readable).
3. Add a "back to all organizations" link on the detail page.
4. Tests: add an e2e assertion that each org slug route renders (title + description visible), axe-critical
   empty, keyboard reachable from the map card. Extend `tests/content.test.tsx` if you add helpers.
5. Update `.cursor/CONTENT.md` (new routes) and `.cursor/ARCHITECTURE.md` (dynamic static route + manifest).

**Acceptance:** `/organizations/acm/` … `/organizations/scc/` all build in the static export, each reachable by
clicking its card, each keyboard-navigable, all a11y-clean. Galleries show placeholders, no broken images.

---

### Phase 3 — activity media + directors (Doc Hazel #6, #7, #8)

**Branch:** continue on `feat/adviser-round`.

**Goal:** wire the reveal interactions and director galleries onto the manifests from §2. No real images yet —
you prove the mechanism with placeholders; images light up when the human fills `media.ts`.

**Do:**

1. **GlowTree hover/click (#6):** make each light node on `GlowTree` a focusable trigger that opens a small
   panel/lightbox of that branch's activity photos (`activityMedia`). Map each of the existing light positions
   to an org (or SADU) key. Follow §2.4 exactly — keyboard + Escape + reduced-motion-static. When the set is
   empty, the trigger shows the §2.3 placeholder panel, and is still focusable/labelled.
2. **Dev-program click-to-illustrate (#7):** in the SADU narrative dev-programs list
   (`sadu.developmentPrograms`), make each program a trigger that reveals its illustration set
   (`programIllustrations`). Same interaction contract.
3. **Directors gallery (#8):** add a directors section to org detail pages and the SADU/student-activities page,
   driven by `directors` manifest (name, role, photo, alt). Placeholder until filled. **Do not invent names or
   titles** — leave the manifest empty with a `// TODO(human)` and render the placeholder.
4. Tests: e2e for keyboard-open/Escape-close of one reveal; axe clean; motion test that content is present
   under reduced motion.
5. Update `.cursor/DESIGN.md` (reveal interaction pattern) and `.cursor/CONTENT.md` (media manifests).

**Acceptance:** every node/program/director slot is keyboard-operable, announces properly, shows placeholder
when empty, and renders the human's images once manifest entries exist — all under static export + reduced motion.

---

### Phase 4 — landing + polish (Doc Hazel #2, #3, #4)

**Branch:** continue on `feat/adviser-round`.

**Goal:** Paraverse-style landing layout, global font-size cleanup, fuller SADU/SADO surfacing.

**Do:**

1. **Landing layout (#4):** restructure `app/page.tsx` / `ProgramsHero` to the Paraverse **layout** — large
   hero headline ("Programs that grow futures" style), short supporting line, calm starfield/bio background
   using **existing tokens and existing scroll components only**. **Layout/composition only — do NOT add the
   full interactive experience**, no new libs, no WebGL. Keep the six programs below.
2. **Font size formatting (#2):** audit the type scale in `app/globals.css`. The adviser flagged inconsistent
   heading sizes (e.g. the SADU mantra headlines rendering huge/uneven). Consolidate to a coherent token-based
   scale (define/verify `--font-size-*` steps), apply consistently to hero/section/card headings, and ensure
   `clamp()` responsive sizing so nothing overflows on mobile. Do not change copy — only sizing/rhythm.
3. **SADO/SADU info (#3):** surface the already-existing `sadu.ts` data more fully on `/student-activities` —
   ensure vision, mission, roles, development programs, activity responsibilities, and the full contact block
   (room, hours, trunkline, email, address) are all visibly rendered and clearly labelled. If the human has
   additional SADO office details to add, leave `// TODO(human)` slots; do not invent.
4. Tests: keep visual/perf specs green (Phase 4 will move pixels — update `e2e/visual.spec.ts` snapshots only
   after the human confirms the new landing looks right; note it in the PR). a11y + typecheck + build must pass.
5. Update `.cursor/DESIGN.md` (landing + type scale) and `.cursor/CONTENT.md` (SADU surfacing).

**Acceptance:** landing reads like the Paraverse layout without new deps; headings use one consistent scale
with no mobile overflow; the full SADU block is visible; all gates green.

---

## 4. Explicitly OUT of scope

- No reordering orgs; SCC stays centered.
- No real logo/photo files committed by Cursor (human owns image rights).
- No new dependencies, backend, CMS, or WebGL.
- No rewriting the programs or SADU **copy** (surfacing/sizing only).
- No "fixing" doc-vs-code naming drift not named here.
- No weakening/deleting tests to go green.

---

## 5. Overseer review gate (Claude checks after each phase)

Before the human merges a phase, the overseer verifies:

1. Diff touches only files the phase names (plus its docs) — no scope creep.
2. No new deps in `package.json`; no raw hex; tokens respected.
3. All slots have §2.3 fallbacks; no hardcoded paths that 404; manifests start empty with TODOs.
4. Keyboard + reduced-motion + axe pass for any new interaction.
5. Full test gate is green in Cursor's own run (paste the output).
6. `.cursor/*` docs updated to match.

If any fail, the overseer reports exactly what to fix; the human relays it to Cursor before merge.
