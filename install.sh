#!/usr/bin/env bash
# Install the design-lifecycle skill (and the Claude Code agent) for every supported agent host.
# Usage: ./install.sh [all|claude|agents|hermes]   (default: all)
#   claude -> ~/.claude/skills + ~/.claude/agents   (Claude Code)
#   agents -> ~/.agents/skills                      (Codex, ChatGPT desktop via Codex, Gemini CLI, OpenCode)
#   hermes -> ~/.hermes/skills                      (Hermes Agent)
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
target="${1:-all}"
put() { mkdir -p "$1"; rm -rf "$1/design-lifecycle"; cp -R "$here/skills/design-lifecycle" "$1/"; echo "✔ skill -> $1/design-lifecycle"; }
case "$target" in all|claude) put ~/.claude/skills; mkdir -p ~/.claude/agents; cp "$here/agents/design-lead.md" ~/.claude/agents/; echo "✔ agent -> ~/.claude/agents/design-lead.md";; esac
case "$target" in all|agents) put ~/.agents/skills;; esac
case "$target" in all|hermes) put ~/.hermes/skills;; esac
case "$target" in all|claude|agents|hermes) ;; *) echo "unknown target: $target (use all|claude|agents|hermes)"; exit 1;; esac
echo "ChatGPT web / Cursor / Copilot / Windsurf: see platforms/instructions.md"
