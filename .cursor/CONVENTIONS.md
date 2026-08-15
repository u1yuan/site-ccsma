# Coding Conventions

## Naming

- **Components:** PascalCase files and exports — `ProgramFlora.tsx`, `OrgCard.tsx`. One component per file.
- **Routes and folders:** kebab-case — `app/student-activities/`, `src/lib/motion/`.
- **Hooks:** `use-` prefix, camelCase — `usePrefersReducedMotion.ts`.
- **Variables/functions:** camelCase; **types/interfaces:** PascalCase; **constants/tokens:** `SCREAMING_SNAKE` only for true constants, otherwise camelCase.
- **Branches:** `type/short-slug` (e.g. `feat/program-flora`). **Commits:** Conventional Commits — `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`.

## Folder Structure

```
app/                      # App Router routes + layout
  page.tsx                #   landing (Descent through the canopy)
  organizations/page.tsx  #   The clans
  student-activities/     #   The Tree of Souls
src/
  components/
    scroll/               # reusable scroll primitives (Bloom, Drift, Pulse, Section, ScrollProgressVine)
    pandora/              # themed presentational components
  content/                # typed data modules (programs.ts, organizations.ts, sadu.ts)
  lib/
    motion/               # motion tokens + usePrefersReducedMotion
```

New code goes in the matching folder above. Do not add components directly inside a route file; routes compose, they do not define. Content lives only in `src/content/` and must mirror `.cursor/CONTENT.md`.

## Style/Lint Rules

- **Formatter:** Prettier (defaults, no semicolon debates — follow `.prettierrc`).
- **Linter:** ESLint (`next/core-web-vitals` + TypeScript rules). No unused vars, no `any` without a comment justifying it.
- **Tailwind:** classes sorted with `prettier-plugin-tailwindcss`. Use design tokens from `tailwind.config` (`bg-night-950`, `text-bio-400`) — never raw hex or arbitrary color values in components.
- Run `npm run lint` and `npm run format` before considering any change done.

## Testing Requirements

- **Unit/render:** Vitest + Testing Library. Every content module must have a render test asserting its data appears; every motion primitive must have a test asserting it renders its final/visible state under reduced motion.
- **Smoke:** one Playwright test per route asserting the page loads, the `<h1>` is correct, all expected sections are present, and axe-core reports zero critical violations.
- **Run:** `npm test` (Vitest) and `npm run test:e2e` (Playwright). All tests pass before a change is complete. Coverage expectation: all of `src/content/` and all motion primitives tested.
