# cad-agent-builder

[Español](README.es.md)

A **Claude Code skill and agent for designers**: architecture/CAD, UI/UX, product and brand. They take a request from a vague idea to verified deliverables through a **non-linear lifecycle**:

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
- **Asks when it is blocked.** It checks its tools first (CADCraft app/CLI/MCP, Figma MCP, `gh`, `python3`). If something is missing, it asks you for one concrete action, for example `! open -n -a CADCraft --args --control 7979`, and offers a fallback.
- **Honest output.** It labels assumptions on the deliverables, marks structural work as pre-design that a licensed professional must validate, and checks every drawing or screen visually before reporting.

## Contents

| Path | What |
|---|---|
| `skills/design-lifecycle/SKILL.md` | The skill: phases, plan format, routing, prerequisites, verification |
| `skills/design-lifecycle/references/` | `phases.md` (entry/exit criteria), `disciplines.md` (deliverables and tools), `prerequisites.md` (checks and how to ask) |
| `agents/design-lead.md` | Subagent that runs the lifecycle |
| `.claude-plugin/` | Plugin and marketplace manifests |
| `install.sh` | Manual install into `~/.claude` |

## Install

**As a plugin (recommended):**
```
/plugin marketplace add maldos23/cad-agent-builder
/plugin install cad-agent-builder@cad-agent-builder
```

**Manually:**
```bash
git clone https://github.com/maldos23/cad-agent-builder.git
cd cad-agent-builder && ./install.sh
```

## Use

- Run `/design-lifecycle` and describe your project, or just say *"design the slab ribs for a 3-storey duplex on a 10×25 lot"*.
- To run it as a subagent, ask: *"use the design-lead agent to plan my brand identity"*.

## Optional tools by discipline

| Discipline | Tools |
|---|---|
| Architecture / CAD | [CADCraft](https://github.com/storytold/cadcraft): the app with `--control 7979` for the MCP, or `cadcraft-cli` for headless use |
| UI/UX | The Figma MCP and its skills |
| Brand | `brandkit` and the `higgsfield-*` skills |

None of these are required. When a tool is missing, the agent tells you what to install or run.

## License

MIT
