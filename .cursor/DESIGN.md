# Design Reference

The theme is Avatar's Pandora: a bioluminescent alien biosphere at night. Everything reads as deep shadow lit by living light. Content is the glowing thing; the night is the ground it glows against.

## Design Principles

1. **Glow on shadow.** The night base is near-black and cool. Light only ever comes from content — flora, sprites, vines — never from flat white panels.
2. **One living world.** The three routes are one continuous descent, not three decorated pages. Shared background gradient, shared vine progress indicator, consistent glow language.
3. **Motion means alive.** Animation mimics Pandoran biology: flora blooms when touched (scrolled into view), sprites drift, light breathes. Nothing slides or fades for its own sake.
4. **Content first.** With animation off or on a low-end device, every word is present, legible, and correctly ordered. The theme is a layer, not a gate.

## Design Tokens

Define these once in `tailwind.config` and as CSS custom properties in `src/app/globals.css`. Reference them by token name, never by raw hex, in components.

### Palette

| Token          | Value     | Use                                                                        |
| -------------- | --------- | -------------------------------------------------------------------------- |
| `night-950`    | `#04070F` | page background                                                            |
| `night-900`    | `#071018` | raised surface / section ground                                            |
| `navi-600`     | `#1B3A6B` | Na'vi indigo, deep accent, borders                                         |
| `bio-400`      | `#22E6D2` | bioluminescent cyan, primary glow                                          |
| `sprite-100`   | `#CFF9FF` | woodsprite pale, highlights, headings glow                                 |
| `flora-500`    | `#8A4FFF` | flora violet, secondary accent                                             |
| `heli-400`     | `#FF7BAC` | helicoradian pink, sparing highlight                                       |
| `ink-100`      | `#E8F4F8` | body text                                                                  |
| `campus-green` | `#0F6B4F` | subdued institutional micro-accent; not claimed as an exact official color |
| `campus-gold`  | `#C8A84E` | subdued institutional micro-accent for provenance and disclaimer details   |

Body text uses `ink-100` on `night-950`/`night-900` (contrast ratio well above the 4.5:1 AA floor). Accent colors are used for glow and small UI elements, not body copy.

### Type

- **Display:** Poppins — section titles, hero, program abbreviations.
- **Body:** Inter — all prose and descriptions.
- **Mono:** JetBrains Mono — a deliberate computing nod for code-flavored labels, the BSCS/cybersecurity accents, and the contact block.
- **Banned:** Papyrus, in every weight and context. It is the wrong Pandora reference and is never acceptable.

### Motion primitives

Three named primitives in `src/lib/motion/`, used consistently instead of ad-hoc tweens:

- **`bloom`** — a section glows into full visibility as it enters the viewport, the way Pandoran flora lights up when touched. Opacity + soft glow + slight upward settle, driven by `useInView`/`useTransform`.
- **`drift`** — slow vertical parallax on background layers, like floating spores. Low amplitude, continuous.
- **`pulse`** — a gentle ambient breathing glow on already-visible elements. Subtle, low-contrast oscillation.
- **Progress vine** — a thin vertical line at the viewport edge fills with a glowing gradient tied to `useScroll` progress, reading as a growing vine.
- **Route branching** — the progress vine remains the one signature device, but its branch positions encode the current route's programs, organizations, or SADU sections. It becomes a simplified narrow-edge indicator on mobile and a fully grown static vine under reduced motion.

Easings are defined once in `src/lib/motion/tokens.ts`. All primitives read `usePrefersReducedMotion` and render their final state instantly when reduced motion is requested.

## Component Patterns

- **Section** (`src/components/scroll/Section.tsx`) — the unit of scroll storytelling; a full-height block with a consistent heading treatment and a `Bloom` wrapper.
- **Flora** (`ProgramFlora`, `GlowFlora`) — decorative SVG/CSS organisms; each program gets a distinct flora silhouette color-coded by palette token.
- **OrgCard / MantraRoots** — presentational cards with a glow border (`navi-600` base, `bio-400` hover/focus glow) and a clear focus ring.
- Use a pattern from `src/components/pandora/` before inventing a new one; new shared patterns belong there, not inline in a route.

## Per-route scroll narrative

- `/` — Descent through the canopy: canvas sprite hero, then six program flora blooming in order, ending in a link toward admission.
- `/organizations` — The clans: four groves (ACM, AITS, JPCS, PRISM) connected by SCC rendered as the Tree of Voices that links them.
- `/student-activities` — The Tree of Souls: vision, mission, roles, programs, then the Serve / Lead / Excel mantra as three glowing roots, ending on the contact block.

## Accessibility Requirements

- **Target:** WCAG 2.1 AA, verified with axe-core in the Playwright smoke tests; zero critical violations.
- **Reduced motion:** full `prefers-reduced-motion` fallback. Every primitive renders its end state; the canvas hero is replaced by a static gradient; content order and completeness are unchanged.
- **Keyboard:** all interactive elements reachable and operable by keyboard, with a visible `bio-400` focus ring. A skip link jumps to main content on every route.
- **Contrast:** body text and headings meet at least 4.5:1 against their background; large display text at least 3:1. Verify any new accent/background pairing before use.
- **Semantics:** one `<h1>` per route, logical heading order, sections in `<section>` landmarks with accessible names, canvas marked `aria-hidden` with a text alternative.

## Open Questions

- Real logos, officer names, and official descriptions for ACM, AITS, JPCS, and PRISM — pending the orgs/SADU supplying them (see `.cursor/CONTENT.md` placeholders).
- Official FEU Tech endorsement and permission to ship publicly — currently an unofficial concept (see PRD "Standing").
- Final photography/illustration assets — v0 uses CSS/SVG-only visuals; real artwork is out of scope until supplied.

## Internal concept references

Three image-generated desktop boards live in `design/concepts/`. They are internal composition references only and remain outside `public/`; the shipped interface recreates their geometry with semantic HTML, CSS, a capped 2D canvas, and lightweight SVG.
