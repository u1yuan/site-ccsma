# CCSMA site map (read-only)

Inspection date: 2026-08-17. Source-of-truth docs were read first (`.cursor/CONTEXT.md` through `.cursor/AGENTS.md`). This report maps what exists. It does not propose refactors.

Working tree at inspection: clean, on `main`, up to date with `origin/main`. This file is the only write from this pass; it was not staged or committed.

---

## 1. GIT STATE

**Default branch:** `main` (`origin/HEAD` → `origin/main`).

**`git branch -a`:**

```
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
```

**`git log --oneline -15`:**

```
0435599 feat: built MVP
f186dc3 first commit
5a1c3e9 Scaffold AI agent context template with nine markdown files.
```

(Only three commits exist; `-15` cannot show more.)

**Current working tree status (at inspection, before this file):**

```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

Remote: `origin` → `https://github.com/u1yuan/site-ccsma.git`.

**Remote branches other than the default:** none. The only remote branch is `origin/main`.

---

## 2. FILE TREE

### `app/`

- `app/globals.css` — Global styles: CSS custom properties for the Pandora palette, layout, route compositions, and a site-wide `prefers-reduced-motion` override.
- `app/layout.tsx` — Root layout: fonts, skip link, shared header/footer, root `metadata` (title + one description).
- `app/page.tsx` — Route `/`: living data vine, programs hero, six `ProgramSection`s from `programs`.
- `app/organizations/page.tsx` — Route `/organizations`: vine, organizations hero, org map. Exports title-only metadata.
- `app/student-activities/page.tsx` — Route `/student-activities`: vine, SADU hero, narrative, contact. Exports title-only metadata.

No `app/icon`, `app/favicon`, `app/opengraph-image`, `app/sitemap`, or `app/robots` files exist.

### `src/content/`

- `src/content/types.ts` — Shared `ContentStatus` union and `SourceAttribution` interface.
- `src/content/programs.ts` — Six official program records plus `programsSource`.
- `src/content/organizations.ts` — Five organization records plus `organizationsSources`.
- `src/content/sadu.ts` — SADU copy object plus `saduSource`. No exported interface; typed via `as const`.

### `src/components/pandora/`

- `src/components/pandora/HeroFrame.tsx` — Shared route-hero shell (`h1`, intro, visual slot, “Descend” cue).
- `src/components/pandora/ProgramsHero.tsx` — `/` hero: woodsprite visual + program abbreviation index.
- `src/components/pandora/WoodspriteHero.tsx` — The single `<canvas>` 2D particle hero; static canopy fallback when motion is reduced or the performance guard trips.
- `src/components/pandora/ProgramSection.tsx` — One program: official description, source link, drifting flora.
- `src/components/pandora/ProgramFlora.tsx` — Per-program SVG silhouette, color via Tailwind token classes.
- `src/components/pandora/OrganizationsHero.tsx` — `/organizations` hero with grove `GlowTree`.
- `src/components/pandora/OrganizationsMap.tsx` — Splits groves vs connector and lays out five `OrgCard`s.
- `src/components/pandora/OrgCard.tsx` — One organization heading + hardcoded “Content coming soon”.
- `src/components/pandora/GlowTree.tsx` — Decorative SVG tree wrapped in `Pulse`; variants `"groves"` | `"souls"`.
- `src/components/pandora/StudentActivitiesHero.tsx` — `/student-activities` hero with souls `GlowTree`.
- `src/components/pandora/SaduNarrative.tsx` — Vision, mission, roles, programs, responsibilities, then `MantraRoots`.
- `src/components/pandora/MantraRoots.tsx` — Serve / Lead / Excel cards with hardcoded “Editorial summary” badge.
- `src/components/pandora/SaduContact.tsx` — Verbatim SADU contact block plus official-page link.

### `src/components/scroll/`

- `src/components/scroll/Bloom.tsx` — In-view glow/settle; static + `inert` handling when reduced motion or off-screen.
- `src/components/scroll/Drift.tsx` — Scroll-linked vertical parallax; disabled under reduced motion.
- `src/components/scroll/Pulse.tsx` — Ambient brightness oscillation; static under reduced motion.
- `src/components/scroll/Section.tsx` — Landmark section with heading + `Bloom` wrapper.
- `src/components/scroll/ScrollProgressVine.tsx` — Edge vine tied to scroll progress; fully grown when reduced motion.

### `src/components/shell/`

- `src/components/shell/ExperienceProvider.tsx` — Starts Lenis smooth-scroll unless reduced motion.
- `src/components/shell/SiteHeader.tsx` — Wordmark + primary nav for the three routes.
- `src/components/shell/SiteFooter.tsx` — Source links + unofficial-concept disclaimer (all routes).
- `src/components/shell/SourceLinks.tsx` — Renders a list of `SourceAttribution` URLs.

### `src/lib/motion/`

- `src/lib/motion/tokens.ts` — Bloom/drift/pulse durations, easing, offsets.
- `src/lib/motion/usePrefersReducedMotion.ts` — Wrapper around Framer Motion `useReducedMotion`.

**Unused / unimported files in `app/` and `src/`:** none found. Every file above is imported from a route, another component, or (for types) a content module. `Drift` is used by `ProgramSection`; `Pulse` by `GlowTree`; `Section` by `ProgramSection` and `SaduNarrative`.

**Docs vs code (named files that do not exist):**

- `ARCHITECTURE.md` lists `GlowFlora`, `VineDivider`, and a `src/lib/` `cn` classnames helper. Those files are not in the tree. `GlowTree` and `ProgramFlora` exist instead. `src/lib/` contains only `motion/`.
- `DESIGN.md` says tokens live in `src/app/globals.css`. The file is `app/globals.css`.
- `CONVENTIONS.md` folder diagram does not mention `src/components/shell/`, which is where the layout shell actually lives.

---

## 3. CONTENT LAYER

### `src/content/organizations.ts` (complete)

```1:58:src/content/organizations.ts
import type { ContentStatus, SourceAttribution } from "./types";

export interface Organization {
  id: string;
  abbr: string;
  name: string;
  status: Extract<ContentStatus, "placeholder">;
  role: "grove" | "connector";
}

export const organizationsSources: SourceAttribution[] = [
  {
    label: "FEU Tech recognized student organizations list",
    url: "https://www.feutech.edu.ph/campus_life/so",
  },
  {
    label: "FEU Tech CCSMA academics page",
    url: "https://www.feutech.edu.ph/academics/ccsma",
  },
];

export const organizations: Organization[] = [
  {
    id: "acm",
    abbr: "ACM",
    name: "Association for Computing Machinery",
    status: "placeholder",
    role: "grove",
  },
  {
    id: "aits",
    abbr: "AITS",
    name: "Alliance of Information Technology Students",
    status: "placeholder",
    role: "grove",
  },
  {
    id: "jpcs",
    abbr: "JPCS",
    name: "Junior Philippine Computer Society",
    status: "placeholder",
    role: "grove",
  },
  {
    id: "prism",
    abbr: "PRISM",
    name: "Pioneers of Relentless and Innovative Storytellers in Multimedia Arts",
    status: "placeholder",
    role: "grove",
  },
  {
    id: "scc",
    abbr: "SCC",
    name: "Student Coordinating Council",
    status: "placeholder",
    role: "connector",
  },
];
```

### Types it uses

```1:5:src/content/types.ts
export type ContentStatus = "official" | "placeholder" | "summary";

export interface SourceAttribution {
  label: string;
  url: string;
}
```

`Organization` itself is defined in `organizations.ts` (quoted above). `role` is `"grove" | "connector"`.

### What `status` accepts on an organization

**In the type system, only `"placeholder"`.**

`status: Extract<ContentStatus, "placeholder">` collapses the union to the single string `"placeholder"`. Assigning `"official"` or `"summary"` is a TypeScript error unless that field’s type is changed.

**Docs vs code:** `.cursor/CONTENT.md` and `.cursor/DECISIONS.md` say that when official copy arrives, set `status: "official"`. The current `Organization` type does not allow that value.

### `programs.ts` (types only)

```3:10:src/content/programs.ts
export interface Program {
  id: string;
  abbr: string;
  title: string;
  description: string;
  status: Extract<ContentStatus, "official">;
  flora: "crystal" | "mushroom" | "blossom" | "fern" | "berries" | "petals";
}
```

Also uses `SourceAttribution` for `programsSource`. `Program.status` accepts only `"official"`.

### `sadu.ts` (types only)

No exported interface for the SADU payload. It imports `ContentStatus` and `SourceAttribution`, types `saduSource` as `SourceAttribution`, and freezes the payload with `as const`.

Mantra `status` is annotated as only `"summary"`:

```44:44:src/content/sadu.ts
      status: "summary" as Extract<ContentStatus, "summary">,
```

(same annotation on the Lead and Excel entries at lines 51 and 59).

Inferred shape of `sadu`: `vision: string`; `mission`, `roles`, `developmentPrograms`, `activityResponsibilities`: string arrays; `mantras`: `{ label, headline, summary, status: "summary" }[]`; `contact`: `{ room, hours, trunkline, email, address }`.

---

## 4. PLACEHOLDER RENDERING

### Every place `status` is read

The content field `.status` is **not read by any render component**. Grep of `*.ts` / `*.tsx` for `.status` hits only tests.

**1. `tests/content.test.tsx` — data assertions, not UI branching**

```19:21:tests/content.test.tsx
    expect(programs.every((program) => program.status === "official")).toBe(
      true,
    );
```

```30:33:tests/content.test.tsx
      organizations.every(
        (organization) => organization.status === "placeholder",
      ),
```

```51:53:tests/content.test.tsx
    expect(sadu.mantras.every((mantra) => mantra.status === "summary")).toBe(
      true,
    );
```

**2. `OrgCard.tsx` does not read `organization.status`.** The word `status` appears only as an ARIA role:

```27:30:src/components/pandora/OrgCard.tsx
        <p className="placeholder-state" role="status">
          <span aria-hidden="true">○</span>
          Content coming soon
        </p>
```

That is `role="status"` (live-region role), not a read of the content field. There is no `if (organization.status === "placeholder")` anywhere in the repo.

`ProgramSection` does not read `program.status`; it hardcodes the eyebrow `"Official description"`. `MantraRoots` does not read `mantra.status`; it always renders the badge `"Editorial summary"`.

### What renders when `status` is `"placeholder"` vs any other value

**There is no render branch on `status`.** `OrgCard` always emits the placeholder note for every organization it receives. Because `Organization.status` can only be `"placeholder"`, “any other value” cannot be stored on an org without a type change, and even then the card would still show the same note until `OrgCard` is changed.

### Where “Content coming soon” comes from

**Hardcoded in the component**, not from content data. The string is the literal in `OrgCard.tsx` lines 27–30 (quoted above). It does not appear in `organizations.ts`.

**Docs vs code:** `AGENTS.md` / `CONTENT.md` say render any `status: "placeholder"` block with a visible “Content coming soon” note rather than the placeholder text. The code never consults `status`; it always shows that note and never shows a description field (organizations have no description field at all).

---

## 5. METADATA

Checked: `app/layout.tsx`, `app/page.tsx`, `app/organizations/page.tsx`, `app/student-activities/page.tsx`; glob for `icon` / `favicon` / `opengraph-image` / `sitemap` / `robots`; live HTML on https://site-ccsma.vercel.app/ for `/`, `/organizations/`, and `/student-activities/` via `document.querySelectorAll('meta')`. Live 404s: `/favicon.ico`, `/robots.txt`, `/sitemap.xml`, `/icon`.

### Code that defines metadata

Root (all routes inherit description; title uses default or template):

```33:40:app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "CCSMA — Bio-digital campus concept",
    template: "%s | CCSMA",
  },
  description:
    "An unofficial scrollytelling concept for FEU Tech's College of Computer Studies and Multimedia Arts.",
};
```

`/` does not export `metadata`. It uses the default title.

```7:9:app/organizations/page.tsx
export const metadata: Metadata = {
  title: "Organizations",
};
```

```8:10:app/student-activities/page.tsx
export const metadata: Metadata = {
  title: "Student Activities",
};
```

No `openGraph`, `twitter`, `metadataBase`, or `generateMetadata` exists in the repo.

### Tags actually emitted (live HTML, all three routes)

| Tag                                                                                                                                        | `/`                                | `/organizations/`      | `/student-activities/`      |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | ---------------------- | --------------------------- |
| `<title>`                                                                                                                                  | CCSMA — Bio-digital campus concept | Organizations \| CCSMA | Student Activities \| CCSMA |
| `<meta charset="utf-8">`                                                                                                                   | yes                                | yes                    | yes                         |
| `<meta name="viewport" content="width=device-width, initial-scale=1">`                                                                     | yes                                | yes                    | yes                         |
| `<meta name="description" content="An unofficial scrollytelling concept for FEU Tech's College of Computer Studies and Multimedia Arts.">` | yes                                | yes                    | yes                         |
| `<meta name="next-size-adjust" content="">`                                                                                                | yes                                | yes                    | yes                         |
| Open Graph (`og:*`)                                                                                                                        | **none**                           | **none**               | **none**                    |
| Twitter card (`twitter:*`)                                                                                                                 | **none**                           | **none**               | **none**                    |

`charset`, `viewport`, and `next-size-adjust` are Next.js defaults; they are not declared in this repo’s metadata objects.

**`og:image`:** does not exist. No Open Graph tags are emitted.

**Descriptions:** the three routes share **one** description (the root-layout string). Organizations and student-activities only override `title`.

**`app/icon`, favicon, `opengraph-image`, sitemap, robots:** none of these files exist. Live `/favicon.ico`, `/robots.txt`, `/sitemap.xml`, and `/icon` return 404. There is no `public/` directory.

---

## 6. TOOLING

From `package.json`:

```5:41:package.json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint .",
    "format": "prettier --check .",
    "format:write": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "framer-motion": "^12.23.12",
    "lenis": "^1.3.8",
    "next": "^16.1.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4.10.2",
    "@playwright/test": "^1.54.2",
    "@testing-library/jest-dom": "^6.6.4",
    "@testing-library/react": "^16.3.0",
    "@types/node": "^24.2.1",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react": "^5.0.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.33.0",
    "eslint-config-next": "^16.1.6",
    "jsdom": "^26.1.0",
    "postcss": "^8.5.6",
    "prettier": "^3.6.2",
    "prettier-plugin-tailwindcss": "^0.6.14",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.9.2",
    "vitest": "^3.2.4"
  }
```

**Node version required:** UNKNOWN. Checked `package.json` (no `engines`), `.nvmrc`, `.node-version`, `.tool-versions`, and `README.md`. None specify a Node version. `@types/node` is a type package, not a runtime requirement.

**`next.config` `output: "export"`:** yes.

```3:8:next.config.ts
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
```

---

## 7. TEST COVERAGE

Vitest include: `tests/**/*.test.{ts,tsx}`. Playwright dir: `e2e/`. `tests/setup.ts` is setup only (jsdom `matchMedia` always reports reduced motion, ResizeObserver / IntersectionObserver stubs); it asserts nothing.

### Vitest

**`tests/content.test.tsx`**

- “contains all six official programs in the required order” — abbr order BSCS→BSFTE; every `status === "official"`; every description length `> 100`. Does not render program UI.
- “models every organization as a visible placeholder” — length 5; every `status === "placeholder"`; each `OrgCard` shows the org name heading and the string “Content coming soon”.
- “renders the exact SADU contact block and summary provenance” — `SaduContact` shows each `sadu.contact` line; every mantra `status === "summary"` and non-empty headline. Does not render vision/mission/roles/mantra UI.

**`tests/motion.test.tsx`** (hooks `usePrefersReducedMotion` to `true` for the whole file)

- `it.each` Bloom / Drift / Pulse — child text is visible and parent has `data-motion-state="static"`.
- “keeps Section content visible” — heading and paragraph visible (does not assert `data-motion-state`).
- “uses the complete static canopy alternative and omits canvas” — `WoodspriteHero` `role="img"` has `data-canvas-state="static"`; no `<canvas>` in the document.

**`tests/debug-bugs.test.tsx`** (motion mock set to `false`)

- “bug 1: guard viewport flip starts RAF when canvas mounts” — at 390px / DPR 2 there is no canvas; after resize to 1200px a canvas mounts and `requestAnimationFrame` has been called.
- “bug 3: bloom blocks focus on off-screen content until in view” — with `useInView` mocked `false`, Bloom has `inert` and computed opacity `< 1`.

Not covered by Vitest: `ScrollProgressVine`, Lenis/`ExperienceProvider`, `OrganizationsMap` layout, route pages, header/footer/disclaimer, `MantraRoots` copy, keyboard/axe, animated (non-reduced) Bloom/Drift/Pulse happy paths except the two debug cases.

### Playwright

**`e2e/routes.spec.ts`**

- For each of `/`, `/organizations/`, `/student-activities/`: page loads; expected `<h1>`; primary nav; footer (`contentinfo`); disclaimer complementary; each listed `h2` attached and visible after scroll; axe-core **critical** violations array is `[]` (non-critical axe issues are not asserted).
- “keyboard navigation…” — Tab focuses skip link, Enter goes to `#main-content`, next Tab target has a visible outline ≥ 2px.
- “organization placeholders and SADU details remain exact” — `/organizations/` has exactly 5 “Content coming soon”; `/student-activities/` has the five contact strings exact.
- reduced-motion on `/`: no canvas; static canopy present; zero `data-motion-state="animated"`; BMMA heading attached; no static motion node is `display:none` / `visibility:hidden` / `opacity:0`.

**`e2e/visual.spec.ts`**

- Three tests (`programs`, `organizations`, `student-activities`): viewport 1440×900, reduced motion, force-visible sections; **asserts `scrollWidth - clientWidth <= 1`**. Writes a PNG under `test-results/visual/` but does **not** compare screenshots (`toHaveScreenshot` is not used).

**`e2e/performance.spec.ts`**

- One test, Chromium only: landing `/` under 4× CPU + 4G-shaped network, 390×844; asserts LCP `> 0` and `< 2500` ms, CLS `< 0.1`. Other routes are not measured.

---

## 8. CONVENTION COMPLIANCE

Scope: `AGENTS.md` — raw hex in **components**; animated components with no `prefers-reduced-motion` path; dependencies not listed in `ARCHITECTURE.md`.

### Raw hex in components

**None found.** Grep of `*.ts` / `*.tsx` for `#[0-9A-Fa-f]{3,8}` and for Tailwind arbitrary `bg-[#…]` / `text-[#…]` returned no matches. `WoodspriteHero` reads `--sprite-100` and `--bio-400` via `getComputedStyle`. Hex values exist only as token definitions in `app/globals.css` `:root` (allowed by `DESIGN.md`, not a component).

### Animated components without a reduced-motion path

**None found.** Every Framer/canvas/Lenis animated component branches on `usePrefersReducedMotion()`:

- `Bloom.tsx` (initial `false` / duration 0)
- `Drift.tsx` (omits `y` transform)
- `Pulse.tsx` (static opacity/brightness)
- `ScrollProgressVine.tsx` (`scaleY: 1`)
- `WoodspriteHero.tsx` (no canvas; static canopy)
- `ExperienceProvider.tsx` (does not construct Lenis)

`GlowTree` animates only through `Pulse`. `app/globals.css` also has `@media (prefers-reduced-motion: reduce)` that force-disables CSS animation/transition and the canvas class. No `@keyframes` exist outside that reduce block.

### Dependencies not listed in `ARCHITECTURE.md`

`ARCHITECTURE.md` names Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lenis, Vitest, Testing Library, and Playwright.

Present in `package.json` but **not named** there:

- `@axe-core/playwright`
- `@testing-library/jest-dom`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@vitejs/plugin-react`
- `autoprefixer`
- `eslint`
- `eslint-config-next`
- `jsdom`
- `postcss`
- `prettier`
- `prettier-plugin-tailwindcss`

(`@playwright/test`, `@testing-library/react`, `vitest`, `next`, `react`, `react-dom`, `framer-motion`, `lenis`, `tailwindcss`, `typescript` match named stack items.)

Axe is named in `DESIGN.md` / `CONVENTIONS.md`; Prettier and ESLint are named in `CONVENTIONS.md`. `AGENTS.md` still points at `ARCHITECTURE.md` for the dependency allow-list. No WebGL / react-three-fiber / CMS / runtime-fetch packages are present.

---

## 9. DISCLAIMER AND ATTRIBUTION

### Unofficial-concept disclaimer

**Defined in** `src/components/shell/SiteFooter.tsx`:

```21:33:src/components/shell/SiteFooter.tsx
        <aside
          className="disclaimer"
          aria-label="Unofficial concept disclaimer"
        >
          <span aria-hidden="true">◇</span>
          <div>
            <p className="utility-label">Unofficial concept</p>
            <p>
              This site is an independent design concept. It is not endorsed by,
              affiliated with, or approved by FEU Institute of Technology.
            </p>
          </div>
        </aside>
```

**Routes that render it:** all three. `SiteFooter` is mounted once in `app/layout.tsx` around `{children}`, so `/`, `/organizations`, and `/student-activities` all include it. Confirmed on the live pages (complementary “Unofficial concept disclaimer”). Related phrasing also appears in root `metadata.description` (`app/layout.tsx` lines 38–39) as the shared meta description, not as the visible disclaimer block.

### Source URL attributions

**Data lives in the content modules:**

- `src/content/programs.ts` — `programsSource` → `https://www.feutech.edu.ph/academics/ccsma`
- `src/content/organizations.ts` — `organizationsSources` → `https://www.feutech.edu.ph/campus_life/so` and `https://www.feutech.edu.ph/academics/ccsma`
- `src/content/sadu.ts` — `saduSource` → `https://www.feutech.edu.ph/campus_life/sa`

**Rendered in the footer on all routes** by `SiteFooter` passing `[programsSource, ...organizationsSources, saduSource]` into `SourceLinks` (`src/components/shell/SourceLinks.tsx`).

**Also in-body:**

- `ProgramSection.tsx` hardcodes the CCSMA academics URL on “Read at the official source”.
- `SaduContact.tsx` uses `saduSource.url` on “Verify on the official page”.

Organizations have no per-card source link.

---

## 10. ORGANIZATION ORDER

Array order in `organizations.ts`:

1. ACM — Association for Computing Machinery (`role: "grove"`)
2. AITS — Alliance of Information Technology Students (`role: "grove"`)
3. JPCS — Junior Philippine Computer Society (`role: "grove"`)
4. PRISM — Pioneers of Relentless and Innovative Storytellers in Multimedia Arts (`role: "grove"`)
5. SCC — Student Coordinating Council (`role: "connector"`)

**SCC sits last in the array**, after ACM, AITS, JPCS, and PRISM.

It is **not** a separate TypeScript type. It is a fifth `Organization` peer with a different `role` discriminant (`"connector"` vs `"grove"`).

**Render difference (role, not a distinct component type):** `OrganizationsMap` pulls `role === "connector"` into the center and the four groves into two pairs (`slice(0, 2)` then `slice(2)`), so **on-screen order is ACM, AITS, SCC, JPCS, PRISM**. `OrgCard` adds `org-card--connector` and the label “Linking body” for SCC versus “Connected grove” for the other four. Placeholder UI is the same for all five.

**Docs vs code:** `PRD.md` / `DESIGN.md` describe four groves with SCC as the linking body / Tree of Voices. The code matches that via `role`, not via a separate SCC component. `CONTENT.md` lists all five as equivalent placeholders; the code’s only structural distinction is `role`.

---

## Impact lists (files only)

### (a) Replace the ACM placeholder with real copy and re-tag it as official

- `src/content/organizations.ts`
- `src/components/pandora/OrgCard.tsx`
- `src/components/pandora/OrganizationsHero.tsx`
- `tests/content.test.tsx`
- `e2e/routes.spec.ts`
- `.cursor/CONTENT.md`

(`Organization.status` currently cannot be `"official"`; `OrgCard` never reads `status` and always shows “Content coming soon”; the hero intro states that every entry is forthcoming; tests require all five orgs to be placeholders and exactly five “Content coming soon” strings. `src/content/types.ts` already includes `"official"` in `ContentStatus` and would not have to change for that union.)

### (b) Add per-route Open Graph metadata and a social preview image

- `app/layout.tsx`
- `app/page.tsx`
- `app/organizations/page.tsx`
- `app/student-activities/page.tsx`
- a new social-preview image file that does not exist today (conventional locations would be `app/opengraph-image.png` and/or per-route `app/organizations/opengraph-image.png` and `app/student-activities/opengraph-image.png`; none of these files exist)

---

## Docs vs code (index of explicit disagreements)

| Docs say                                                                         | Code does                                                              |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Org `status: "official"` when copy arrives (`CONTENT.md`, `DECISIONS.md`)        | `Organization.status` is typed as only `"placeholder"`                 |
| Render placeholder **if** `status === "placeholder"` (`AGENTS.md`, `CONTENT.md`) | `OrgCard` always hardcodes “Content coming soon”; never reads `status` |
| `GlowFlora`, `VineDivider`, `cn` helper (`ARCHITECTURE.md`, `DESIGN.md`)         | Those files do not exist                                               |
| Tokens in `src/app/globals.css` (`DESIGN.md`)                                    | Tokens are in `app/globals.css`                                        |
| Hero canvas lazy-initialized below the fold (`ARCHITECTURE.md`)                  | `WoodspriteHero` is the above-the-fold `/` hero visual                 |
| `src/lib/` misc utilities (`ARCHITECTURE.md`)                                    | `src/lib/` contains only `motion/`                                     |
