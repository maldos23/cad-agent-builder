# cad-agent-builder

[English](README.md) · [Español](README.es.md) · [中文](README.zh.md) · **日本語**

デザイナー向けの **スキル + エージェント** です。建築/CAD、UI/UX、プロダクト、ブランドに対応します。**非線形のライフサイクル**で、あいまいな依頼を検証済みの成果物に仕上げます。オープンな [Agent Skills](https://agentskills.io) 形式を採用しているため、Claude Code、Codex、ChatGPT、Gemini CLI、OpenCode、Hermes Agent などで動作します。

```
        ┌──────────── アイデア ────────────┐
        ▼                                  │
   リサーチ ⇄ 分析 ⇄ デザイン ⇄ 仕様 ⇄ 実行
        ▲                                  │
        └──── 前提が変わったら前の段階へ戻る ─┘
```

- **最初にトリアージ**：プロジェクトに本当に必要なフェーズから始めます。たとえば平面図がすでにあれば、そのまま仕様フェーズに進みます。
- **生きた作業計画**：`DESIGN_PLAN.md` を更新し続けます。ブリーフ、フェーズ表、決定事項、仮定、未解決の質問、前提条件、成果物を記録します。
- **あなたの言語で返答**：スキル自体は英語で書かれていますが、返答は常に話しかけた言語に合わせます。
- **行き詰まったら依頼**：まず必要なツール（CADCraft のアプリ/CLI/MCP、Figma MCP、`gh`、`python3`）を確認します。不足があれば具体的な操作をひとつだけ依頼し、代替案も示します。
- **正直な出力**：成果物に仮定を明記します。構造関連は予備設計であり、有資格の専門家による確認が必要だと明示します。報告前には図面や画面をすべて目視で確認します。

## 対応環境

| ホスト | 読み込み方法 | インストール |
|---|---|---|
| **Claude Code** | スキルと `design-lead` エージェント | `/plugin marketplace add maldos23/cad-agent-builder`、または `./install.sh claude` |
| **OpenAI Codex**（CLI・IDE） | `~/.agents/skills/` | `./install.sh agents` を実行し、`/skills` または `$design-lifecycle` で呼び出す |
| **ChatGPT デスクトップ** | Skills サイドバー | [リリース](https://github.com/maldos23/cad-agent-builder/releases)の `design-lifecycle.zip` をアップロード |
| **ChatGPT Web / カスタム GPT** | 指示とナレッジ | `platforms/instructions.md` を貼り付け、`SKILL.md` と `references/*.md` をナレッジとしてアップロード |
| **Gemini CLI** | `~/.agents/skills/` | `./install.sh agents` を実行し、`/skills list` で確認 |
| **OpenCode** | `~/.agents/skills/`（`~/.claude/skills/` も読み込み） | `./install.sh agents` |
| **Hermes Agent**（Nous Research） | `~/.hermes/skills/` | `./install.sh hermes` |
| **Cursor / Copilot / Windsurf / Aider** | ルールファイルまたは `AGENTS.md` | `platforms/instructions.md` を `.cursor/rules/`、`.github/copilot-instructions.md`、または `AGENTS.md` にコピー |

引数なしで `./install.sh` を実行すると、すべてのホストに一度にインストールします。

## 内容

| パス | 説明 |
|---|---|
| `skills/design-lifecycle/SKILL.md` | スキル本体：フェーズ、計画の書式、ルーティング、前提条件、検証 |
| `skills/design-lifecycle/references/` | `phases.md`、`disciplines.md`、`prerequisites.md` |
| `agents/design-lead.md` | Claude Code 用サブエージェント |
| `platforms/instructions.md` | スキル非対応ホスト向けのポータブル版 |
| `.claude-plugin/` | Claude Code のプラグインとマーケットプレイスのマニフェスト |
| `install.sh` | 複数ホスト対応のインストーラー |

## 使い方

- プロジェクトを説明するだけで使えます。例：「10×25 m の敷地に建つ 3 階建てデュプレックスのスラブリブを設計して」。スキルは自動で有効になります。名前で呼び出すこともできます：`/design-lifecycle`（Claude Code）、`$design-lifecycle`（Codex）。
- Claude Code では「design-lead エージェントでブランドアイデンティティを計画して」と頼むこともできます。

## 分野別のオプションツール

| 分野 | ツール |
|---|---|
| 建築 / CAD | [CADCraft](https://github.com/storytold/cadcraft)：MCP を使う場合はアプリを `--control 7979` で起動、またはヘッドレスの `cadcraft-cli` を使用 |
| UI/UX | Figma MCP |
| ブランド | ホストの画像生成ツール |

どれも必須ではありません。ツールが足りない場合は、何をインストール・実行すればよいかをエージェントが案内します。

## ライセンス

MIT
