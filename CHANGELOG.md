# Changelog

## v1.2.0 — 2026-10-16
- Refocused on **CADCraft and civil engineering / architectural design**: floor plans, structural framing and slabs, reinforcement details, installations, site plans, specifications and quantities.
- Removed UI/UX, product and brand routing (Figma, brandkit) from the skill, agent, references, READMEs and website.
- New discipline patterns: framing plans with section marks (e.g. TR15X20C25), slab/rib layouts, installations, site works.

## v1.1.0 — 2026-10-13
- Multi-host support: Codex, ChatGPT (desktop skills zip + Custom GPT instructions), Gemini CLI, OpenCode (`~/.agents/skills`), Hermes Agent (`~/.hermes/skills`), Cursor/Copilot/Windsurf/Aider (`platforms/instructions.md`).
- `install.sh [all|claude|agents|hermes]` installs into every host.
- Skill made host-agnostic (no hard dependency on Claude Code-only tools).
- READMEs in Chinese (`README.zh.md`) and Japanese (`README.ja.md`).

## v1.0.0 — 2026-10-13
- `design-lifecycle` skill: non-linear Idea / Research / Analysis / Design / Specifications / Execution with a living `DESIGN_PLAN.md`.
- `design-lead` agent: multidisciplinary design lead, always replies in the user's language.
- Prerequisite checks (CADCraft app/CLI/MCP, Figma MCP, gh, python3) that ask the user for one concrete action when something is missing.
- Discipline routing: architecture/CAD (CADCraft), UI/UX (Figma), brand, product.
- Claude Code plugin manifest + marketplace, plus `install.sh` for manual install.
