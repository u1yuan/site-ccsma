# Project Context

_Living document — update each work session._

## Current Goal

Ship **v0**: a three-route, statically exported Next.js scrollytelling site for CCSMA, themed as Avatar's Pandora. The three routes are `/` (six programs), `/organizations` (ACM, AITS, JPCS, PRISM + SCC), and `/student-activities` (SADU). All content and constraints are defined in `.cursor/PRD.md`, `.cursor/CONTENT.md`, `.cursor/ARCHITECTURE.md`, and `.cursor/DESIGN.md`.

## Active Constraints

- **Stack is locked:** Next.js App Router + TypeScript, `output: "export"`, Tailwind, Framer Motion + Lenis, one canvas hero. See `.cursor/DECISIONS.md`.
- **Performance budget:** LCP < 2.5 s, CLS < 0.1 on mid-tier mobile over 4G.
- **Accessibility floor:** WCAG 2.1 AA; full `prefers-reduced-motion` fallback; keyboard navigable.
- **Content provenance:** official copy verbatim from source URLs; the five org entries are flagged placeholders until real copy arrives. See `.cursor/CONTENT.md`.
- **Standing:** unofficial concept build; no FEU Tech endorsement implied. Must carry a visible disclaimer and source links.
- **No runtime backend, no CMS, no auth, no i18n** in v0.

## In-Progress Work

- v0 implementation and verification are complete: all three routes, typed content, motion primitives, static export configuration, tests, and internal concept references are present.
- The production static export, axe checks, reduced-motion behavior, keyboard flow, desktop visual captures, and the documented mobile/4G LCP and CLS budgets all pass.

## Recently Changed

- **[2026-08-16]** Completed verification: formatting, ESLint, TypeScript, 10 Vitest checks, 10 Playwright checks, the static production export, zero critical axe findings, all-route desktop overflow captures, reduced motion, and the throttled LCP/CLS budget pass. Added focus-safe inert Bloom states and canvas guard-resume coverage.
- **[2026-08-16]** Implemented the bio-digital three-route experience from the approved plan. Added the living data vine, program flora, organization groves, SADU roots, accessible shell, static/reduced-motion canopy fallback, generated concept boards, typed content tests, and Playwright coverage.
- **[2026-08-16]** Authored the full `.cursor/` context layer from templates: `PRD.md`, `CONTENT.md`, `ARCHITECTURE.md`, `DESIGN.md`, `CONVENTIONS.md`, `DECISIONS.md`, `AGENTS.md`, and this file. Locked theme (Avatar's Pandora), stack, hybrid motion budget, TS content modules, and the verbatim-plus-flagged-placeholder copy policy.
