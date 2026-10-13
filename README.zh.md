# cad-agent-builder

[English](README.md) · [Español](README.es.md) · **中文** · [日本語](README.ja.md)

面向设计师的 **Skill + 智能体**，覆盖建筑/CAD、UI/UX、产品与品牌。它通过**非线性生命周期**把模糊的需求变成经过验证的交付物。采用开放的 [Agent Skills](https://agentskills.io) 格式，可在 Claude Code、Codex、ChatGPT、Gemini CLI、OpenCode、Hermes Agent 等平台运行。

```
        ┌──────────── 构思 ────────────┐
        ▼                              │
     调研 ⇄ 分析 ⇄ 设计 ⇄ 规格说明 ⇄ 执行
        ▲                              │
        └────── 信息变化时回到前一阶段 ──┘
```

- **先分诊**：直接进入项目真正需要的阶段。例如已有平面图时，直接进入规格说明。
- **动态工作计划**：维护一份 `DESIGN_PLAN.md`，包含需求简报、阶段表、决策、假设、待解决问题、前置条件和交付物。
- **用你的语言回复**：Skill 本身用英文编写，但始终用你提问时使用的语言回答。
- **受阻时向你求助**：先检查所需工具（CADCraft 应用/CLI/MCP、Figma MCP、`gh`、`python3`）。缺少时，会请你执行一个具体操作，并提供替代方案。
- **如实输出**：在交付物上标注假设，注明结构相关内容只是初步设计、必须由持证专业人员审核，并在汇报前目视检查每张图纸或界面。

## 兼容性

| 平台 | 加载方式 | 安装 |
|---|---|---|
| **Claude Code** | Skill 与 `design-lead` 智能体 | `/plugin marketplace add maldos23/cad-agent-builder`，或 `./install.sh claude` |
| **OpenAI Codex**（CLI、IDE） | `~/.agents/skills/` | `./install.sh agents`，然后使用 `/skills` 或 `$design-lifecycle` |
| **ChatGPT 桌面版** | Skills 侧边栏 | 上传 [Release](https://github.com/maldos23/cad-agent-builder/releases) 中的 `design-lifecycle.zip` |
| **ChatGPT 网页版 / 自定义 GPT** | 指令与知识库 | 粘贴 `platforms/instructions.md`，并把 `SKILL.md` 和 `references/*.md` 上传为知识文件 |
| **Gemini CLI** | `~/.agents/skills/` | `./install.sh agents`，然后运行 `/skills list` |
| **OpenCode** | `~/.agents/skills/`（也读取 `~/.claude/skills/`） | `./install.sh agents` |
| **Hermes Agent**（Nous Research） | `~/.hermes/skills/` | `./install.sh hermes` |
| **Cursor / Copilot / Windsurf / Aider** | 规则文件或 `AGENTS.md` | 把 `platforms/instructions.md` 复制到 `.cursor/rules/`、`.github/copilot-instructions.md` 或 `AGENTS.md` |

不带参数运行 `./install.sh`，即可一次性安装到所有平台。

## 内容

| 路径 | 说明 |
|---|---|
| `skills/design-lifecycle/SKILL.md` | Skill 主体：阶段、计划格式、路由、前置条件、验证 |
| `skills/design-lifecycle/references/` | `phases.md`、`disciplines.md`、`prerequisites.md` |
| `agents/design-lead.md` | Claude Code 子智能体 |
| `platforms/instructions.md` | 供不支持 Skill 的平台使用的通用版本 |
| `.claude-plugin/` | Claude Code 插件与市场清单 |
| `install.sh` | 多平台安装脚本 |

## 使用

- 直接描述你的项目，例如「为 10×25 米地块上的三层复式公寓设计楼板肋梁」。Skill 会自动启用，也可以按名称调用：`/design-lifecycle`（Claude Code）或 `$design-lifecycle`（Codex）。
- 在 Claude Code 中还可以说：「用 design-lead 智能体规划我的品牌形象」。

## 各专业的可选工具

| 专业 | 工具 |
|---|---|
| 建筑 / CAD | [CADCraft](https://github.com/storytold/cadcraft)：用 `--control 7979` 启动应用以使用 MCP，或使用无界面的 `cadcraft-cli` |
| UI/UX | Figma MCP |
| 品牌 | 所在平台的图像生成工具 |

这些都不是必需的。缺少某个工具时，智能体会告诉你要安装或运行什么。

## 许可证

MIT
