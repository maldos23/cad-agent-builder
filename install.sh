#!/usr/bin/env bash
# Manual install (alternative to /plugin): copies the skill and agent into ~/.claude
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
mkdir -p ~/.claude/skills ~/.claude/agents
cp -R "$here/skills/design-lifecycle" ~/.claude/skills/
cp "$here/agents/design-lead.md" ~/.claude/agents/
echo "Installed: ~/.claude/skills/design-lifecycle and ~/.claude/agents/design-lead.md"
