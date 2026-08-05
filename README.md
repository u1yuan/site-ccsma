# AI Agent Context Quickstart

A documentation-only GitHub template repository that ships ready-to-use markdown context files for bootstrapping AI coding agents in new projects. There is no injection script, build step, or postinstall logic — the files simply exist in the repo and are meant to be filled in by your team.

## How to use this template

### Option 1: GitHub "Use this template" button

1. Open this repository on GitHub.
2. Click **Use this template** → **Create a new repository**.
3. Name your new repo and create it.
4. Clone your new repo and fill in the context files for your project.

### Option 2: GitHub CLI

```bash
gh repo create <your-repo-name> --template <owner>/<this-repo> --public
```

Replace `<your-repo-name>`, `<owner>`, and `<this-repo>` with your values.

## Context files

| File | Purpose |
|------|---------|
| [AGENTS.md](AGENTS.md) | Defines the AI agent's persona, operating rules, and hard boundaries. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Documents stack, data flow, key modules, and known constraints. |
| [CONTEXT.md](CONTEXT.md) | Living project-state doc: current goal, active work, and recent changes. |
| [CONVENTIONS.md](CONVENTIONS.md) | Coding standards: naming, folder structure, style/lint rules, and testing. |
| [DECISIONS.md](DECISIONS.md) | ADR-style log of architectural and product decisions. |
| [DESIGN.md](DESIGN.md) | UI/UX design reference: principles, patterns, and accessibility. |
| [PRD.md](PRD.md) | Product requirements: problem, goals, non-goals, and success metrics. |
| [SCHEMA.md](SCHEMA.md) | Data/schema reference: entities, relationships, fields, and migrations. |

## How to enable as a GitHub template

After pushing this repo to GitHub, enable template mode manually:

1. Go to your repository on GitHub.
2. Open **Settings**.
3. Under **General**, check **Template repository**.

This is a manual GitHub UI setting — it cannot be automated from files inside this repository.
