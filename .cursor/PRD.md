# Product Requirements

## Problem

Prospective and current students of the FEU Institute of Technology College of Computer Studies and Multimedia Arts (CCSMA) cannot learn what the college offers without wading through a generic institutional page. On [feutech.edu.ph/academics/ccsma](https://www.feutech.edu.ph/academics/ccsma), all six degree programs sit behind a dense navigation tree with no hierarchy, no sense of what distinguishes one program from another, and nothing that communicates the creative or technical energy of the college. The recognized student organizations and the Student Activities and Development Office live on separate pages under different navigation sections, so a student researching CCSMA has no single place to understand the academic programs, the org culture, and the student-support office together.

The audience is prospective students choosing a college, current students looking for an org or the activities office, and FEU Tech staff who want a shareable link that represents the college well.

## Goals

- Present all six CCSMA programs (BSCS, BSIT, BMMA, BSCY, BDMM, BSFTE) as distinct, scannable units on a single landing page, using the official FEU Tech descriptions verbatim.
- Give each of the four CCSMA-affiliated recognized student organizations (ACM, AITS, JPCS, PRISM) and the Student Coordinating Council a dedicated section with identity, purpose, and a call to join.
- Present the Student Activities and Development Office — its vision, mission, roles, programs, and the Serve / Lead / Excel mantra — plus its real contact block, sourced from [feutech.edu.ph/campus_life/sa](https://www.feutech.edu.ph/campus_life/sa).
- Carry the three pages with one continuous Avatar-Pandora scrollytelling narrative so the site reads as a single descent through a bioluminescent world rather than three flat pages.
- Meet WCAG 2.1 AA and respect `prefers-reduced-motion`, so the experience degrades gracefully for every visitor.

## Scope

### Route `/` — Descent through the canopy

Canvas particle hero (woodsprites/spores), then six program sections in order: BSCS, BSIT, BMMA, BSCY, BDMM, BSFTE. Each section blooms into view and links outward to admission. Source: [feutech.edu.ph/academics/ccsma](https://www.feutech.edu.ph/academics/ccsma).

### Route `/organizations` — The clans

Sections for ACM, AITS, JPCS, and PRISM as four connected groves, with SCC presented as the linking body. RSO copy is marked placeholder pending official descriptions (see `.cursor/CONTENT.md`).

### Route `/student-activities` — The Tree of Souls

SADU vision, mission, roles and functions, Student Development programs, Student Activities responsibilities, and the Serve / Lead / Excel mantra. Ends on the real contact block: Room 1501, Monday to Friday 8:00 a.m.–5:00 p.m., trunkline (02) 8281 8888 local 128, sadu@feutech.edu.ph. Source: [feutech.edu.ph/campus_life/sa](https://www.feutech.edu.ph/campus_life/sa).

## Non-Goals

- No CMS, admin panel, or content-editing interface in v0.
- No authentication, student accounts, or enrollment forms.
- No admissions application or tuition calculator.
- No internationalization; English only.
- No real-time chat, comments, or social features.
- No backend API or database; the site is fully static.

## Success Metrics

- **Correctness:** All six programs, all five organizations, and the full SADU contact block are present and match their source pages.
- **Performance:** Largest Contentful Paint under 2.5 seconds and Cumulative Layout Shift under 0.1 on a mid-tier mobile device over 4G.
- **Accessibility:** Passes axe-core with zero critical violations; keyboard-navigable end to end; all content readable with animation disabled.
- **Motion discipline:** The page renders complete and legible with `prefers-reduced-motion` set; no content is gated behind an animation completing.

## Standing

This is an unofficial concept build. It is not endorsed by, affiliated with, or approved by FEU Institute of Technology unless and until FEU Tech provides that approval. All official copy is attributed to its source URL in `.cursor/CONTENT.md`, and the site must include a visible disclaimer and source links.
