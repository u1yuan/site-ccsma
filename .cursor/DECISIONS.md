# Architecture Decision Log

Record significant technical and product decisions here so agents and humans share the same history. Add new entries at the top.

---

## [2026-08-16] — Campus micro-accents and the living data vine

- **Context:** The Pandora-inspired palette needed a restrained institutional anchor, and the three-route descent needed one recognizable interaction that would remain coherent across otherwise distinct compositions.
- **Decision:** Add `campus-green` (`#0F6B4F`) and `campus-gold` (`#C8A84E`) as subdued micro-accent tokens only. Use a single fixed living data vine as the signature scroll-progress device; its branch positions change per route while its visual language and edge placement stay continuous. On narrow screens it simplifies to a thin edge indicator. With reduced motion it renders fully grown and static.
- **Consequences:** Components may reference the campus colors only by token name and must not present them as exact official brand values. No second persistent progress device or competing signature animation is introduced. Route character comes from flora, grove, and root compositions around the shared vine.

---

## [2026-08-16] — Copy policy: verbatim FEU text, flagged placeholders for RSOs

- **Context:** FEU Tech publishes official descriptions for the six CCSMA programs and for SADU, but not for the four CCSMA-affiliated RSOs (ACM, AITS, JPCS, PRISM) or SCC. We needed a rule for what is verbatim vs. written.
- **Decision:** Official FEU copy is reproduced verbatim and attributed to its source URL. The five organization entries are placeholders: each carries `status: "placeholder"` in `src/content/` and renders a visible "Content coming soon" note, never fake copy. The convention and provenance live in `.cursor/CONTENT.md`.
- **Consequences:** Writers must not paraphrase official text. Placeholders must be replaced with official copy and re-tagged `status: "official"` before public launch. Nothing placeholder may ship looking real.

---

## [2026-08-16] — Theme interpretation: Avatar's Pandora

- **Context:** "Pandora" is ambiguous — it could mean Avatar's moon, the Greek myth, the jewelry brand, or the music service.
- **Decision:** Build around Avatar's Pandora: a bioluminescent night biosphere with a deep-shadow base and cyan/violet glow. The three routes form one continuous descent (canopy → clans → Tree of Souls).
- **Consequences:** All visual and motion decisions follow the tokens and principles in `.cursor/DESIGN.md`. Papyrus is banned. Warm/metallic (jewelry) and playlist (music) directions are rejected.

---

## [2026-08-16] — Content source: typed TypeScript modules over MDX or CMS

- **Context:** Page copy has to live somewhere. Options were MDX files or a headless CMS versus plain TS.
- **Decision:** Store all content as typed TypeScript modules in `src/content/` (`programs.ts`, `organizations.ts`, `sadu.ts`), mirroring `.cursor/CONTENT.md`.
- **Consequences:** Content is type-safe and validated at build time with zero extra build tooling or runtime fetch. Editing prose requires a code change, which is acceptable for a v0 with a small, stable copy set. No CMS backend or auth is introduced.

---

## [2026-08-16] — Motion budget: hybrid CSS/SVG + one canvas hero, not react-three-fiber

- **Context:** The Pandora bioluminescence could be done with pure CSS/SVG, a hybrid with one canvas, or full WebGL via react-three-fiber.
- **Decision:** Hybrid. All glow, bloom, and parallax effects are CSS/SVG and Framer Motion; exactly one `<canvas>` 2D particle hero (woodsprites) on the landing page. No WebGL, no react-three-fiber.
- **Consequences:** Keeps the bundle small and the performance budget (LCP < 2.5 s, CLS < 0.1) reachable on campus laptops and phones. The single canvas is capped and disabled under reduced motion, high-DPI small viewports, or a hidden tab. A future 3D upgrade would require a new ADR.

---

## [2026-08-16] — Framework: Next.js App Router with static export, over Vite or Astro

- **Context:** The site is content-driven and must deploy anywhere as static files. We weighed Next.js, Vite SPA, and Astro.
- **Decision:** Next.js (App Router) + TypeScript, configured with `output: "export"` for a fully static build, styled with Tailwind, animated with Framer Motion + Lenis.
- **Consequences:** Conventional React/App Router structure the team already knows, static hosting with no server, and an easy path to add dynamic features later. There is no runtime backend, so any future server need must be re-decided here.
