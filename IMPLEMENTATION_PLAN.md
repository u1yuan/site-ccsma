# Implementation Plan — CCSMA site

**For the executing agent (Cursor):** This plan is the task. Follow it exactly. Do not
expand scope, refactor unrelated code, or "improve" things not listed here. Where this
plan and the `.cursor/*.md` docs agree, follow both. Where a `.cursor/` doc describes the
_old_ placeholder behavior that this plan deliberately changes, this plan wins — and you
must update the affected doc as instructed so the docs stay truthful.

All copy needed for this work is embedded in this file. **Do not invent, paraphrase, or
augment any organization fact, statistic, mission, vision, motto, or value beyond what is
written here** (`AGENTS.md` rule). If something you need is not in this file, stop and
leave a `// TODO(human): …` note rather than guessing.

---

## 0. Guardrails (read first)

- **Stack is locked.** No new runtime dependencies, no WebGL, no CMS, no data fetching, no
  backend. Static export stays. If you think you need a new dependency, stop and write an
  ADR entry instead of installing it.
- **Branch convention is strict.** One feature, one branch, branched off `main`, named
  `feat/<name>`. Do the two branches below in order. Do not commit to `main` directly.
- **Design tokens only.** No raw hex in components. Use the existing Pandora tokens from
  `app/globals.css` and Tailwind token classes. Match the visual language already in
  `OrgCard`, `ProgramSection`, and the grove layout.
- **Accessibility floor holds.** Every new piece of UI must render fully and legibly with
  `prefers-reduced-motion` set and be keyboard reachable. No content gated behind an
  animation. WCAG 2.1 AA.
- **Tests must pass before you claim done.** Run, in order:
  `npm run format:write` → `npm run lint` → `npm run typecheck` → `npm test` →
  `npm run build` → `npm run test:e2e`. Do not weaken an assertion to make it pass; update
  assertions only where this plan explicitly says to, and make the new assertion check the
  _new correct behavior_, not nothing.
- **Record the decision.** Add one dated entry to the top of `.cursor/DECISIONS.md`
  capturing the copy-provenance decision (see §1.1) — new ADR, do not edit old ones.

---

## Branch 1 — `feat/organizations-content`

**Goal:** Replace the five "Content coming soon" placeholders with real, structured copy
for ACM, AITS, JPCS, PRISM, and SCC, and give each org a logo slot that falls back to a
themed monogram when no logo file is present. SCC stays the centered "connector" — its
layout position and "Linking body" label do **not** change.

```
git switch -c feat/organizations-content
```

### 1.1 Copy provenance — status tagging (decision baked in)

These descriptions are **authored/compiled from public sources** (org Facebook/Instagram
pages, FEU Tech pages), not verbatim official FEU copy. Therefore:

- Tag every org `status: "summary"` — **not** `"official"`. The `"summary"` value already
  exists in `ContentStatus` and is already used by the SADU mantras, so this is honest and
  consistent, not a new concept.
- The card shows a subtle provenance label — the string **`Community description`** — in
  the same restrained style as the existing eyebrow/badge labels. It must be visible but
  quiet. Do **not** present this copy as FEU's official verbatim text.
- Keep the existing footer source-attribution links exactly as they are.

> If the human later marks a specific org's copy as officially blessed, they will change
> that org's `status` to `"official"` and the card should then drop the "Community
> description" label. Support both states; do not hardcode the label for all orgs
> regardless of status.

### 1.2 Data model — `src/content/types.ts`

Leave `ContentStatus` as-is (it already is `"official" | "placeholder" | "summary"`). No
change needed here unless a type error forces it; if so, note it, don't silently widen
anything else.

### 1.3 Data model — `src/content/organizations.ts`

Replace the `Organization` interface and the `organizations` array. New interface:

```ts
import type { ContentStatus, SourceAttribution } from "./types";

export interface OrgLink {
  label: string;
  url: string;
}

export interface Organization {
  id: string;
  abbr: string;
  name: string;
  status: ContentStatus; // widened from the old placeholder-only Extract<>
  role: "grove" | "connector"; // unchanged — SCC stays "connector"
  description: string; // NEW — required, the "what is" prose
  mission?: string; // NEW — optional
  vision?: string; // NEW — optional
  motto?: string; // NEW — optional
  values?: string[]; // NEW — optional (e.g. ACM's three values)
  links?: OrgLink[]; // NEW — optional FB/IG links
  logo?: string; // NEW — optional path under /logos, e.g. "/logos/acm.png"
  //       when absent, the card renders a monogram fallback
}
```

Keep `organizationsSources` exactly as it is.

**The five records, in this array order (ACM, AITS, JPCS, PRISM, SCC):** SCC stays last in
the array — `OrganizationsMap` is what pulls the `role: "connector"` entry to the center,
so array order must remain ACM → AITS → JPCS → PRISM → SCC for the on-screen order to stay
ACM, AITS, **SCC**, JPCS, PRISM. Do not reorder.

Use this copy verbatim. Do not add facts.

```ts
export const organizations: Organization[] = [
  {
    id: "acm",
    abbr: "ACM",
    name: "Association for Computing Machinery — FEU Tech Student Chapter",
    status: "summary",
    role: "grove",
    description:
      "Driven by innovation and united by passion, the FEU Tech ACM Student Chapter is a recognized student organization that stands as the mother organization of the Computer Science department of the institution and the Philippines' second internationally accredited ACM student chapter — empowering students to explore their passion for technology, spark innovation, and shape the future, one line of code at a time.",
    mission:
      "Organized and operated exclusively for educational and scientific purposes: to promote increased knowledge of and greater interest in the science, design, development, construction, languages, management, and applications of modern computing; to foster greater interest in computing and its applications; and to provide a means of communication between persons interested in computing.",
    vision:
      "To help students become future-ready and grow both academically and personally by creating platforms that develop technical skills, foster innovation, and build confidence in real-world applications — being the voice of the students, opening opportunities inside and outside the school, and growing ACM as a strong, supportive community of learners and future professionals.",
    values: ["Aptitude", "Competence", "Magnanimity"],
    role_note: undefined, // (delete this line — placeholder to remind you not to add stray fields)
  },
  {
    id: "aits",
    abbr: "AITS",
    name: "Alliance of Information Technology Students",
    status: "summary",
    role: "grove",
    description:
      "The Alliance of Information Technology Students (AITS) is the official academic organization for IT students at the FEU Institute of Technology. Established in 2014, AITS creates an inclusive space for growth by offering technical seminars, coding challenges, and peer-led tutorials. Driven by its mission to empower student growth and its vision to foster a passion-driven IT community, the organization shapes future-ready tech leaders while upholding the university values of Fortitude, Excellence, and Uprightness.",
  },
  {
    id: "jpcs",
    abbr: "JPCS",
    name: "Junior Philippine Computer Society — FEU Tech",
    status: "summary",
    role: "grove",
    description:
      "The Junior Philippine Computer Society – FEU Tech (JPCS–FEU Tech) is the student chapter of the national Philippine Computer Society. Recognized as one of the oldest student organizations at the FEU Institute of Technology, it serves students in IT, Computer Science, Multimedia Arts, and Engineering, bridging classroom knowledge, industry standards, and emerging technologies through real-world networking, hackathons, and corporate partnerships.",
    mission:
      "To enhance the knowledge, leadership, and technical skills of the youth in Information and Communication Technology (ICT), providing the critical, complementary real-life experiences needed to shape students into world-class IT professionals.",
    vision:
      "To bridge academic knowledge with industry demand, building a deeply connected community where students and industry partners actively collaborate on technological advancements.",
  },
  {
    id: "prism",
    abbr: "PRISM",
    name: "Pioneers of Relentless and Innovative Storytellers in Multimedia Arts",
    status: "summary",
    role: "grove",
    description:
      "The Pioneers of Relentless and Innovative Storytellers in Multimedia Arts (PRISM) is the official academic organization of the Multimedia Arts Department at the FEU Institute of Technology. Serving students majoring in animation and digital film, PRISM is a creative hub that connects freshmen and senior student-artists — helping them navigate their art journeys, master creative tools, and showcase visual storytelling.",
    mission:
      "Empowering multimedia arts students to push creative boundaries and master digital landscapes across graphic design, photography, video, and animation.",
    vision: "Fostering an inventive, highly collaborative artistic ecosystem.",
    motto: "Beyond Mastery, Magnifying Artistry",
  },
  {
    id: "scc",
    abbr: "SCC",
    name: "Student Coordinating Council",
    status: "summary",
    role: "connector",
    description:
      "The FEU Tech Student Coordinating Council (SCC) is the highest governing student body and the official student representative at the FEU Institute of Technology. Run by student leaders, it serves as the voice of the student body — bridging the gap between the university administration and the learners, and overseeing the Recognized Student Organizations on campus.",
    mission:
      "To foster a progressive campus environment where critical thinking prevails, uniting the student population to assert student rights and systematically address welfare concerns.",
    vision:
      "To build an empowered community of principled servant leaders through student-led activities, leadership initiatives, and civic service projects.",
    motto: "Serve. Lead. Excel.",
  },
];
```

> **Note for the human, not the agent:** the `role_note: undefined` line inside the ACM
> record is intentionally a mistake-magnet — delete it. It's there so you eyeball the array
> instead of pasting blind. SCC's motto "Serve. Lead. Excel." is identical to the SADU
> mantra already on `/student-activities` — this is **intentional shared FEU institutional
> language**, not an error. Both bodies carry it, and both should surface it: SADU via its
> existing MantraRoots, SCC via its `motto` field. Do not "deduplicate" it or treat it as a
> mistake.

### 1.4 Logos — slot + monogram fallback (no scraping)

- Create `public/logos/` (the repo has no `public/` dir yet — creating it is fine and
  standard for Next static export; `next.config.ts` already has `images.unoptimized: true`,
  so plain `<img>` or `next/image` both work).
- Add a `.gitkeep` so the empty dir is tracked.
- **Do not fetch, scrape, or generate any real logo.** Logo files are added by hand later
  by the human, with the orgs' permission. Your job is only the slot and the fallback.
- In `OrgCard`, render logic:
  - If `org.logo` is set → render that image (alt text = `${org.name} logo`), sized and
    contained so varied aspect ratios don't break the card.
  - If `org.logo` is absent → render a **monogram**: the `abbr` centered in a Pandora-themed
    circular/rounded mark built from existing tokens (bio-glow ring, deep base fill). It must
    look intentional, not like a broken image. Reuse the glow language already in
    `GlowTree`/`Pulse` where sensible, but keep it static-safe under reduced motion.

### 1.5 Rendering — `src/components/pandora/OrgCard.tsx`

Currently `OrgCard` ignores `status` and always prints "Content coming soon." Rewrite it to
render real content:

- **Logo/monogram** (per §1.4) at the top of the card.
- **Name** (`org.name`) and **abbr** as they're styled now.
- **Role label** unchanged: "Linking body" for `role: "connector"`, "Connected grove"
  otherwise.
- **Provenance label**: if `status === "summary"`, show the quiet `Community description`
  label. If `status === "official"`, show nothing (or the existing official treatment). If
  `status === "placeholder"` (shouldn't occur now, but keep the branch), fall back to the
  old "Content coming soon" note so the type stays honest.
- **Description** (`org.description`) as body copy.
- **Mission / Vision / Motto / Values** — render each only when present. Use small, quiet
  section labels ("Mission", "Vision", "Motto", "Core values") consistent with the site's
  restrained typographic style. Values render as a short inline list.
- **Links** (`org.links`) — render only if present; none are provided in the copy above, so
  this branch is dormant for now, but wire it so a later link addition just works.
- Keep the `role="status"` live-region **only** if a placeholder is actually shown; a real,
  static description should not be announced as a live status region. Use a normal heading +
  prose structure for real content.

Match the existing motion/reduced-motion handling in the card's wrapper. No new animation
types.

### 1.6 Hero intro — `src/components/pandora/OrganizationsHero.tsx`

The hero intro currently states that every org entry is forthcoming/coming soon. Rewrite
that sentence so it reflects reality: the orgs now have descriptions. Keep it short, keep
the Pandora "clans / groves" framing, and do **not** claim official FEU endorsement. One or
two sentences. Do not touch the `GlowTree` visual.

### 1.7 Tests — update to assert the NEW correct behavior

Two files currently assert the placeholder state and will go red. Update them to assert the
real content instead of deleting coverage:

- **`tests/content.test.tsx`**
  - The org test currently asserts length 5 and every `status === "placeholder"` and each
    card shows "Content coming soon". Change it to: length 5; every `status === "summary"`
    (or the mix, if the human upgraded any to "official" — assert against the actual data,
    e.g. every status is one of `"summary" | "official"` and none is `"placeholder"`); every
    org has a non-empty `description` longer than ~60 chars; ACM has exactly the three values
    `["Aptitude","Competence","Magnanimity"]`; SCC has `role === "connector"` and the other
    four `role === "grove"`.
  - Add an assertion that rendering an `OrgCard` for an org shows its `description` text.

- **`e2e/routes.spec.ts`**
  - The spec asserts `/organizations/` has **exactly 5** "Content coming soon". Change it to
    assert **0** "Content coming soon" strings, and instead assert each org's `abbr` (or a
    distinctive phrase from each description) is present and visible on the page. Keep the
    existing axe-critical-is-empty and keyboard-nav assertions untouched and passing.

Do not modify `tests/motion.test.tsx`, `tests/debug-bugs.test.tsx`, `e2e/visual.spec.ts`, or
`e2e/performance.spec.ts` unless one genuinely breaks; if it does, report why before
changing it.

### 1.8 Docs — keep them truthful

- `.cursor/CONTENT.md`: update the organizations section to reflect that the five orgs now
  carry `status: "summary"` compiled descriptions with the "Community description" label,
  not placeholders. Note the copy is compiled-from-public-sources, not verbatim official.
- `.cursor/DECISIONS.md`: add a new dated ADR at the top recording this copy-provenance
  decision (summary status + visible provenance label, logos added by hand with permission,
  no scraping).

### 1.9 Verify, then open the PR

Run the full gate in §0. When green:

```
git add -A
git commit -m "feat: real compiled copy + logo slots for the five CCSMA orgs"
git push -u origin feat/organizations-content
```

Open a PR against `main`. In the description, list: the provenance decision, that the
SCC/SADU "Serve. Lead. Excel." overlap is intentional shared FEU language (both surface it
by design), and that logo files are still to be added by hand.

---

## Branch 2 — `feat/social-metadata` (optional, do only if time remains)

**Why it matters:** the whole point of this site is a shareable link. Right now all three
routes emit one shared description and **no** Open Graph tags, so pasting the link into
Messenger/Discord/Slack renders a bare grey box. This branch fixes that. It is fully
independent of Branch 1.

```
git switch main
git switch -c feat/social-metadata
```

- **`app/layout.tsx`**: add `metadataBase: new URL("https://site-ccsma.vercel.app")` to the
  root `metadata`. **This is the critical gotcha** — under `output: "export"` with no
  `metadataBase`, Open Graph image URLs resolve relative and silently fail to render as
  previews. Also add root-level `openGraph` (title, description, url, siteName, type) and
  `twitter` (`card: "summary_large_image"`) defaults.
- **Per route** — give `/`, `/organizations/page.tsx`, and `/student-activities/page.tsx`
  their own distinct `description` and `openGraph.title`/`description`, so each shared link
  reads correctly. Today they share one description; give each a real one.
- **Social preview image**: add `app/opengraph-image.png` (1200×630) as the default OG image,
  themed to the Pandora look. If producing a real PNG is out of scope for the agent, create
  `app/opengraph-image.tsx` using Next's built-in `ImageResponse` to generate one from tokens
  and text — no new dependency, works under export. If neither is feasible in time, leave a
  `// TODO(human)` and ship the text OG tags alone (still a large improvement over nothing).
- Optionally add `app/icon.png` (favicon) and `app/sitemap.ts` / `app/robots.ts` — all four
  currently 404. Low effort, nice polish, but skip if time is tight.

Verify with the §0 gate, then commit and push as its own PR.

---

## Explicitly OUT of scope (do not do)

- Do not reorder the organizations or move SCC out of center.
- Do not add real logo image files (permission/ownership — human handles this).
- Do not change the stack, add dependencies, or add a backend.
- Do not touch the programs or SADU content.
- Do not "fix" the doc-vs-code naming drift noted in the report (`GlowFlora`, `cn`, etc.) —
  out of scope for today.
- Do not weaken or delete tests to get green; update them to the new correct behavior only
  where §1.7 says.
