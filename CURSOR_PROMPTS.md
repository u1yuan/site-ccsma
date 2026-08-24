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

---

# PROMPT 5 — org constellation redesign + wire real logos + finish landing

Paste this after the one-shot build. It amends Phase 2 (organizations hub) and closes the Phase 4
landing gap. Reason: the current `/organizations` hub uses big organic "oval" cards (`.org-card`
blob shapes) with full descriptions crammed inside — the adviser flagged them as hard to read.

```
Read CURSOR_GUIDE.md again. Stay on branch feat/adviser-round. Keep all guardrails: no new deps, no
WebGL, tokens only (no raw hex), no invented copy, accessibility floor + reduced-motion, run the full
test gate at the end and paste output. Three tasks:

TASK A — Redesign the /organizations HUB into a logo constellation (fixes the "big ovals / hard to
read" adviser flag):
- Replace the big organic oval .org-card layout on the /organizations hub. Each org becomes a COMPACT
  LOGO NODE (the org's logo, with the existing OrgMark monogram as fallback), showing only the logo +
  abbr on the hub — NOT the full description.
- SCC stays the CENTER connector node: larger/highlighted, with the existing bio-vine lines
  (organizations-map__branches) connecting the four grove orgs to it. Keep array order; SCC stays
  role "connector" in the middle.
- HOVER = animation: gentle scale + bio-glow pulse on the node, using existing motion tokens. Under
  prefers-reduced-motion, show a static highlight instead (no movement). Keyboard focus gets the SAME
  highlight as hover.
- CLICK / Enter = navigate to that org's detail page /organizations/<slug>/ where the full
  description, mission, vision, motto, values already live. Each node is a real next/link, focusable,
  keyboard-activatable, axe-clean.
- Move the descriptions OFF the hub entirely — the hub is now logos only; descriptions live on the
  detail pages. Update any test that asserted description text on /organizations/ to instead assert
  it on the /organizations/<slug>/ detail route, and assert the hub shows each org's abbr/logo node.
  Do NOT weaken assertions — move them to the correct place.

TASK B — Wire the REAL logos + directors image (files are already in public/, added by the human):
- public/logos/orgs/acm.jpg, aits.jpg, jpcs.jpg, prism.jpg, scc.jpg  → set each org's `logo` field in
  src/content/organizations.ts to these paths.
- These are JPGs (no transparency). Put every logo inside a subtle rounded token panel/chip (bio-glow
  ring + deep base fill, same language as OrgMark) so the square photo edges look intentional on the
  dark background. Contain the image; don't distort aspect ratios.
- public/logos/orgs/sadu.png → use as the SADU/SADO logo on the /student-activities hero or section.
- public/directors/sadu/directors.png is ONE combined graphic of SADO Sr Directors & Directors. Add it
  to the `directors` manifest as a single sadu entry { src: "/directors/sadu/directors.png", alt:
  "SADO Senior Directors and Directors" } and render it in the directors gallery as one labelled image
  (do not try to split it into per-person cards; do not invent names).

TASK C — Finish the Paraverse LANDING (Phase 4 gap — app/page.tsx is still the untouched MVP):
- Restructure app/page.tsx / ProgramsHero into the Paraverse LAYOUT: large hero headline, one short
  supporting line, calm token-based starfield/bio background using existing scroll components. LAYOUT
  ONLY — no full interactivity, no new libs, no WebGL. Keep the six program sections below the hero.

TASK D — Fully surface the Student Activities (SADU) page from real FEU Tech content:
- Source of truth: https://www.feutech.edu.ph/campus_life/sa . The data already lives in
  src/content/sadu.ts and MATCHES that page — do NOT invent or rewrite copy. Your job is to make the
  /student-activities page RENDER ALL of it, clearly labelled, in this order, mirroring the FEU page:
    1. Vision  (sadu.vision)
    2. Mission  (sadu.mission[] — render as a list)
    3. Roles and Function  (sadu.roles[])
    4. Student Development Programs  (sadu.developmentPrograms[] — these are the click-to-illustrate
       triggers from Phase 3; keep that behavior)
    5. Student Activities Responsibilities  (sadu.activityResponsibilities[])
    6. Mantra: Serve, Lead, Excel  (the existing MantraRoots)
    7. Contact  (sadu.contact — room, hours, trunkline, email, address, ALL shown)
- If any of these sections is currently not rendered on /student-activities, add it using existing
  components/tokens. Use the SADU logo (public/logos/orgs/sadu.png) in the hero/section header.
  Keep the directors gallery (Task B) on this page too. Do not add facts beyond sadu.ts.

TASK E — Redesign the nav bar (SiteHeader) to match the new landing vibe:
- The header is already position:sticky. Make it SCROLL-AWARE: at the top of the page it's tall and
  transparent-ish; once the user scrolls down past ~1 viewport-ish / a threshold, it CONDENSES —
  shorter height, stronger backdrop blur + darker token background, subtle shadow — and smoothly
  transitions back when scrolled to top. (SiteHeader is already a client component; add a scroll
  listener that toggles a `data-scrolled`/condensed class — NO new dependencies.) Under
  prefers-reduced-motion, switch states instantly with no transition. Keep it keyboard-reachable with
  a visible focus ring; the skip-to-content link and aria-current behavior must still work.
- Style the nav to feel cohesive with the Paraverse landing (Task C) — same token palette, glow
  language, and type scale. Tokens only, no raw hex.
- REPLACE the generic "C/" wordmark mark: remove the literal "C/" text box entirely. In its place
  build a small CREATIVE inline-SVG brand mark using existing bio/flora tokens and the same glow
  language as GlowTree/Pulse (e.g. a glowing seed / sprout / vine-node — a bio-digital motif, not a
  letter). It must be crisp at ~2rem, decorative (aria-hidden) since the adjacent "CCSMA" text carries
  the accessible name. Keep the "CCSMA" wordmark and refine the "Bio-digital campus" tagline styling to
  match. Keep the whole wordmark a link to home with an aria-label.

TASK F — Confirm the tree HOVER reveals pictures (Doc Hazel: "Once pointer is hovered, pictures of
school activities must appear"):
- On GlowTree, HOVERING a light node must reveal that branch's school-activity pictures (from
  activityMedia). Hover is the primary interaction the adviser asked for — make it work on
  mouseenter/focus, showing a small image panel/preview near the node.
- Because hover alone is not accessible, the SAME reveal must also open on keyboard focus + Enter/Space
  and be Escape-dismissible, and render statically under prefers-reduced-motion (per §2.4). Hover =
  adviser's requirement; keyboard/click = the accessible equivalent. Both show the same pictures.
- Each node maps to an org (or sadu) key in activityMedia. When that key's array is empty, show the
  §2.3 "Photos coming soon" placeholder in the same panel — so the mechanism is provably working even
  before real photos exist, and real photos appear automatically once added to
  public/activities/<key>/ + media.ts.

Update .cursor/CONTENT.md and .cursor/DESIGN.md to describe the new hub-as-constellation, the landing,
the fully-surfaced SADU page, the scroll-aware header + new brand mark, and the tree hover/focus
picture reveal.

Then run, in order, and paste output: npm run format:write, npm run lint, npm run typecheck, npm test,
npm run build, npm run test:e2e. Do NOT auto-update e2e/visual.spec.ts snapshots (hub + landing moved
pixels) — flag them and wait for me. Do NOT weaken assertions.

DO NOT commit, DO NOT push, DO NOT open a PR — leave ALL changes unstaged in the working tree. The
human will review and commit everything themselves.
```
