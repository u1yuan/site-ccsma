# Architecture Decision Log

*Template file — fill in for your cloned project. Add new entries at the top.*

Record significant technical and product decisions here so agents and humans share the same history.

---

> **EXAMPLE ENTRY — delete this block before use**

## [2026-01-15] — Use PostgreSQL for primary persistence

- **Context:** The app needs relational queries, transactions, and a mature ecosystem. Team is familiar with SQL.
- **Decision:** Adopt PostgreSQL as the primary database. Use an ORM or query layer as defined in ARCHITECTURE.md.
- **Consequences:** Requires local Postgres (or Docker) for development. Migrations must be tracked in SCHEMA.md. SQLite is not supported for production.

---

[Add your first real decision below using the same format: `## [Date] — [Decision Title]` with Context / Decision / Consequences bullets.]
