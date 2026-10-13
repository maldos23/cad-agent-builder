# 🏗️ cad-agent-builder

**English** · [Español](README.es.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [🌐 Website](https://maldos23.github.io/cad-agent-builder/)

A **skill and agent for designers**: architecture/CAD, UI/UX, product and brand. They take a request from a vague idea to verified deliverables through a **non-linear lifecycle**. The skill uses the open [Agent Skills](https://agentskills.io) format, so it runs in Claude Code, Codex, ChatGPT, Gemini CLI, OpenCode, Hermes Agent and more.

> 🌐 **Website:** [https://maldos23.github.io/cad-agent-builder/](https://maldos23.github.io/cad-agent-builder/)

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

## 🧰 Compatibility

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

## 📦 Installation

Clone the repo first (all local installs start here):

```bash
git clone https://github.com/maldos23/cad-agent-builder.git
cd cad-agent-builder
```

### 🚀 All hosts at once

Installs the skill for Claude Code, Codex, Gemini CLI, OpenCode and Hermes.

```bash
./install.sh
```

### 🟠 Claude Code

Option A, plugin (recommended), from inside Claude Code:

```text
/plugin marketplace add maldos23/cad-agent-builder
/plugin install cad-agent-builder@cad-agent-builder
```

Option B, manual:

```bash
./install.sh claude
```

### 🟢 OpenAI Codex (CLI / IDE)

```bash
./install.sh agents   # -> ~/.agents/skills/design-lifecycle
```

Then in Codex type `/skills` or mention `$design-lifecycle`.

### 🔵 Gemini CLI

```bash
./install.sh agents   # -> ~/.agents/skills/design-lifecycle
```

Check it with `/skills list` inside Gemini CLI.

### ⚪ OpenCode

```bash
./install.sh agents   # -> ~/.agents/skills/design-lifecycle
```

OpenCode also reads `~/.claude/skills/`, so the Claude Code install works too.

### 🟣 Hermes Agent (Nous Research)

```bash
./install.sh hermes   # -> ~/.hermes/skills/design-lifecycle
```

The skill becomes the `/design-lifecycle` slash command.

### 💬 ChatGPT desktop

```bash
curl -LO https://github.com/maldos23/cad-agent-builder/releases/latest/download/design-lifecycle.zip
```

Download the zip, then open **Skills** in the sidebar and upload it.

### 🌐 ChatGPT web / Custom GPT

1. Create a GPT (or Project) and paste the content of `platforms/instructions.md` into **Instructions**.
2. Upload `skills/design-lifecycle/SKILL.md` and `skills/design-lifecycle/references/*.md` as **Knowledge**.

### 🖱️ Cursor

Run it in your project root:

```bash
mkdir -p .cursor/rules
printf -- '---\ndescription: Design lifecycle for design projects\nalwaysApply: false\n---\n' > .cursor/rules/design-lifecycle.mdc
curl -L https://raw.githubusercontent.com/maldos23/cad-agent-builder/main/platforms/instructions.md >> .cursor/rules/design-lifecycle.mdc
```

### 🤖 GitHub Copilot

Run it in your project root:

```bash
mkdir -p .github
curl -L https://raw.githubusercontent.com/maldos23/cad-agent-builder/main/platforms/instructions.md >> .github/copilot-instructions.md
```

### 🧩 Windsurf / Aider / Zed / other AGENTS.md hosts

Run it in your project root:

```bash
curl -L https://raw.githubusercontent.com/maldos23/cad-agent-builder/main/platforms/instructions.md >> AGENTS.md
```

### 🧹 Uninstall

```bash
rm -rf ~/.claude/skills/design-lifecycle ~/.claude/agents/design-lead.md \
       ~/.agents/skills/design-lifecycle ~/.hermes/skills/design-lifecycle
```

## 📁 Contents

| Path | What |
|---|---|
| `skills/design-lifecycle/SKILL.md` | The skill: phases, plan format, routing, prerequisites, verification |
| `skills/design-lifecycle/references/` | `phases.md`, `disciplines.md`, `prerequisites.md` |
| `agents/design-lead.md` | Claude Code subagent |
| `platforms/instructions.md` | Portable version for hosts without skills |
| `.claude-plugin/` | Claude Code plugin and marketplace manifests |
| `install.sh` | Installer for multiple hosts |

## 🎯 Use

- Describe your project, for example *"design the slab ribs for a 3-storey duplex on a 10×25 lot"*. The skill activates automatically, or you can call it by name: `/design-lifecycle` (Claude Code) or `$design-lifecycle` (Codex).
- In Claude Code you can also ask: *"use the design-lead agent to plan my brand identity"*.

## 🛠️ Optional tools by discipline

| Discipline | Tools |
|---|---|
| Architecture / CAD | [CADCraft](https://github.com/storytold/cadcraft): the app with `--control 7979` for the MCP, or `cadcraft-cli` for headless use |
| UI/UX | The Figma MCP |
| Brand | Image-generation tools in your host |

None of these are required. When a tool is missing, the agent tells you what to install or run.

## 📄 License

MIT
