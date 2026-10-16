# Prerequisites — check, then ask

Run read-only checks first. If a check fails, ask the user for **one concrete action**, written in their language. In Claude Code, suggest the `!` prefix. In other hosts, ask them to run the command in a terminal and paste the output.

| Need | Check | If missing, ask the user to… |
|---|---|---|
| CADCraft app | `ls /Applications/CADCraft.app` | Install CADCraft (github.com/storytold/cadcraft) |
| CADCraft CLI | `command -v cadcraft-cli \|\| ls ~/.local/bin/cadcraft-cli` | Download the CLI from the CADCraft releases and place it in `~/.local/bin` |
| CADCraft MCP live | the cadcraft MCP tools (`mcp__cadcraft__*` in Claude Code) exist and respond | `open -n -a CADCraft --args --control 7979`, then reconnect the MCP (Claude Code: `/mcp`). Offer the headless CLI as a fallback |
| GitHub | `gh auth status` | `gh auth login` |
| Python 3 | `command -v python3` | `xcode-select --install` (macOS) or install Python |
| Project data | a file or value exists | Share the file or path (plans, lot size, soil study, existing drawings), or confirm the stated assumption |

## How to ask (template)

> I need **<thing>** to <reason>. Please run: `<command>`
> When it's ready, tell me and I'll <next step>. Meanwhile I can <fallback>.

Translate the template into the user's language. Ask once, list everything that is missing in a single message, and do not loop. Record the status under **Prerequisites** in DESIGN_PLAN.md.
