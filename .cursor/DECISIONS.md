# Architecture Decision Log

Record significant technical and product decisions here so agents and humans share the same history. Add new entries at the top.

---

## [2026-08-24] — Adviser round: placeholders-first media, org detail routes, Paraverse landing

- **Context:** Doc Hazel asked for logos, org pages, hover/click activity pictures, director photos, a Paraverse-like landing, a coherent type scale, and fuller SADU surfacing — while the human is time-boxed and will supply images later.
- **Decision:** Build the full structure on one branch (`feat/adviser-round`) with every image slot showing its fallback. `src/content/media.ts` and accreditation `src` fields start empty so no missing file 404s. Org logos use `/logos/orgs/` and fall back to the existing monogram. Activity and director photos use a themed "Photos coming soon" panel. GlowTree lights and SADU development-program items are keyboard-openable dialogs (Escape to close); hover is enhancement only. Each org gets a static `/organizations/<id>/` route. The landing keeps existing copy and the woodsprite canvas but uses a calmer Paraverse layout. Type sizes go through `--font-size-*` tokens. No new dependencies, no invented names or extra SADO facts.
- **Consequences:** Real images light up by editing the manifest and dropping files in `public/`. Visual e2e snapshots will need a human review after the landing change and must not be auto-updated in this pass.

---

## [2026-08-17] — Organization copy provenance: compiled summaries, hand-added logos

- **Context:** The five CCSMA organizations (ACM, AITS, JPCS, PRISM, SCC) had no verbatim official descriptions on the CCSMA or SADU pages, but public org and campus sources do describe them. Shipping "Content coming soon" forever, inventing official-sounding copy, and scraping logos were all off the table.
- **Decision:** Author compiled community descriptions from those public sources and tag every org `status: "summary"` (the same provenance value SADU mantras already use). Each card shows a visible but quiet **Community description** label; if a later human marks an org `"official"`, that label drops. Logo files are added by hand under `public/logos/` only with the orgs' permission — no scraping, no generated marks pretending to be official. Until a `logo` path is set, the card renders a static themed monogram. SCC remains the centered `role: "connector"` linking body. SCC's motto "Serve. Lead. Excel." is shared FEU institutional language with SADU and both surfaces keep it.
- **Consequences:** Organization copy must not be presented as FEU's official verbatim text. Footer source-attribution links stay on the roster/academics pages they already cite. Placeholders remain a supported `status` for any future empty block, but none of the five orgs use it now.

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
