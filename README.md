# cad-agent-builder

**English** · [Español](README.es.md) · [中文](README.zh.md) · [日本語](README.ja.md)

A **skill and agent for designers**: architecture/CAD, UI/UX, product and brand. They take a request from a vague idea to verified deliverables through a **non-linear lifecycle**. The skill uses the open [Agent Skills](https://agentskills.io) format, so it runs in Claude Code, Codex, ChatGPT, Gemini CLI, OpenCode, Hermes Agent and more.

```
        ┌──────────── Idea ────────────┐
        ▼                              │
   Research ⇄ Analysis ⇄ Design ⇄ Specifications ⇄ Execution
        ▲                                              │
        └──────── loop back when facts change ─────────┘
```

- **Triage first.** It enters at the phase your project actually needs. For example, if you already have a floor plan, it skips straight to Specifications.
- **Living work plan.** It keeps a `DESIGN_PLAN.md` with the brief, a phase table, decisions, assumptions, open questions, prerequisites and deliverables.
- **Replies in your language.** The skill is written in English, but answers always follow the language you write in.
- **Asks when it is blocked.** It checks its tools first (CADCraft app/CLI/MCP, Figma MCP, `gh`, `python3`). If something is missing, it asks you for one concrete action and offers a fallback.
- **Honest output.** It labels assumptions on the deliverables, marks structural work as pre-design that a licensed professional must validate, and checks every drawing or screen visually before reporting.

## Compatibility

| Host | How it loads | Install |
|---|---|---|
| **Claude Code** | Skill and `design-lead` agent | `/plugin marketplace add maldos23/cad-agent-builder`, or `./install.sh claude` |
| **OpenAI Codex** (CLI, IDE) | `~/.agents/skills/` | `./install.sh agents`, then `/skills` or `$design-lifecycle` |
| **ChatGPT desktop** | Skills sidebar | Upload `design-lifecycle.zip` from the [release](https://github.com/maldos23/cad-agent-builder/releases) |
| **ChatGPT web / Custom GPT** | Instructions and Knowledge | Paste `platforms/instructions.md`, then upload `SKILL.md` and `references/*.md` as knowledge |
| **Gemini CLI** | `~/.agents/skills/` | `./install.sh agents`, then `/skills list` |
| **OpenCode** | `~/.agents/skills/` (it also reads `~/.claude/skills/`) | `./install.sh agents` |
| **Hermes Agent** (Nous Research) | `~/.hermes/skills/` | `./install.sh hermes` |
| **Cursor / Copilot / Windsurf / Aider** | Rules or `AGENTS.md` | Copy `platforms/instructions.md` into `.cursor/rules/`, `.github/copilot-instructions.md` or `AGENTS.md` |

Run `./install.sh` with no arguments to install for every host at once.

## Contents

| Path | What |
|---|---|
| `skills/design-lifecycle/SKILL.md` | The skill: phases, plan format, routing, prerequisites, verification |
| `skills/design-lifecycle/references/` | `phases.md`, `disciplines.md`, `prerequisites.md` |
| `agents/design-lead.md` | Claude Code subagent |
| `platforms/instructions.md` | Portable version for hosts without skills |
| `.claude-plugin/` | Claude Code plugin and marketplace manifests |
| `install.sh` | Installer for multiple hosts |

## Use

- Describe your project, for example *"design the slab ribs for a 3-storey duplex on a 10×25 lot"*. The skill activates automatically, or you can call it by name: `/design-lifecycle` (Claude Code) or `$design-lifecycle` (Codex).
- In Claude Code you can also ask: *"use the design-lead agent to plan my brand identity"*.

## Optional tools by discipline

| Discipline | Tools |
|---|---|
| Architecture / CAD | [CADCraft](https://github.com/storytold/cadcraft): the app with `--control 7979` for the MCP, or `cadcraft-cli` for headless use |
| UI/UX | The Figma MCP |
| Brand | Image-generation tools in your host |

None of these are required. When a tool is missing, the agent tells you what to install or run.

## License

MIT
