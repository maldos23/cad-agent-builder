# 🏗️ cad-agent-builder

[English](README.md) · [Español](README.es.md) · [中文](README.zh.md) · **日本語** · [🌐 ウェブサイト](https://maldos23.github.io/cad-agent-builder/)

**土木工学と建築設計** のためのスキル + エージェントです。[CADCraft](https://github.com/storytold/cadcraft) で作図します：平面図、構造（梁・スラブ・リブ）、配筋詳細、設備、配置図、仕様、数量。**非線形のライフサイクル**で、あいまいな依頼を検証済みの DXF/PDF 図面に仕上げます。オープンな [Agent Skills](https://agentskills.io) 形式を採用しているため、Claude Code、Codex、ChatGPT、Gemini CLI、OpenCode、Hermes Agent などで動作します。

> 🌐 **ウェブサイト:** [https://maldos23.github.io/cad-agent-builder/](https://maldos23.github.io/cad-agent-builder/)

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
- **行き詰まったら依頼**：まず必要なツール（CADCraft のアプリ/CLI/MCP、`python3`）を確認します。不足があれば具体的な操作をひとつだけ依頼し、代替案も示します。
- **正直な出力**：成果物に仮定を明記します。構造関連は予備設計であり、有資格の専門家による確認が必要だと明示します。報告前には図面をすべて目視で確認します。

## 🧰 対応環境

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

## 📦 インストール

まずリポジトリをクローンします（ローカルへのインストールはすべてここから）：

```bash
git clone https://github.com/maldos23/cad-agent-builder.git
cd cad-agent-builder
```

### 🚀 すべてのホストに一括インストール

Claude Code、Codex、Gemini CLI、OpenCode、Hermes にスキルをインストールします。

```bash
./install.sh
```

### 🟠 Claude Code

方法 A：プラグイン（推奨）。Claude Code 内で実行：

```text
/plugin marketplace add maldos23/cad-agent-builder
/plugin install cad-agent-builder@cad-agent-builder
```

方法 B：手動：

```bash
./install.sh claude
```

### 🟢 OpenAI Codex（CLI / IDE）

```bash
./install.sh agents   # -> ~/.agents/skills/design-lifecycle
```

Codex で `/skills` を入力するか、`$design-lifecycle` と書いて呼び出します。

### 🔵 Gemini CLI

```bash
./install.sh agents   # -> ~/.agents/skills/design-lifecycle
```

Gemini CLI で `/skills list` を実行して確認します。

### ⚪ OpenCode

```bash
./install.sh agents   # -> ~/.agents/skills/design-lifecycle
```

OpenCode は `~/.claude/skills/` も読み込むため、Claude Code 用のインストールでも動作します。

### 🟣 Hermes Agent（Nous Research）

```bash
./install.sh hermes   # -> ~/.hermes/skills/design-lifecycle
```

スキルは `/design-lifecycle` コマンドとして使えるようになります。

### 💬 ChatGPT デスクトップ

```bash
curl -LO https://github.com/maldos23/cad-agent-builder/releases/latest/download/design-lifecycle.zip
```

zip をダウンロードし、サイドバーの **Skills** を開いてアップロードします。

### 🌐 ChatGPT Web / カスタム GPT

1. GPT（またはプロジェクト）を作成し、`platforms/instructions.md` の内容を **Instructions** に貼り付けます。
2. `skills/design-lifecycle/SKILL.md` と `skills/design-lifecycle/references/*.md` を **Knowledge** にアップロードします。

### 🖱️ Cursor

プロジェクトのルートで実行：

```bash
mkdir -p .cursor/rules
printf -- '---\ndescription: Design lifecycle for design projects\nalwaysApply: false\n---\n' > .cursor/rules/design-lifecycle.mdc
curl -L https://raw.githubusercontent.com/maldos23/cad-agent-builder/main/platforms/instructions.md >> .cursor/rules/design-lifecycle.mdc
```

### 🤖 GitHub Copilot

プロジェクトのルートで実行：

```bash
mkdir -p .github
curl -L https://raw.githubusercontent.com/maldos23/cad-agent-builder/main/platforms/instructions.md >> .github/copilot-instructions.md
```

### 🧩 Windsurf / Aider / Zed / AGENTS.md 対応ツール

プロジェクトのルートで実行：

```bash
curl -L https://raw.githubusercontent.com/maldos23/cad-agent-builder/main/platforms/instructions.md >> AGENTS.md
```

### 🧹 アンインストール

```bash
rm -rf ~/.claude/skills/design-lifecycle ~/.claude/agents/design-lead.md \
       ~/.agents/skills/design-lifecycle ~/.hermes/skills/design-lifecycle
```

## 📁 内容

| パス | 説明 |
|---|---|
| `skills/design-lifecycle/SKILL.md` | スキル本体：フェーズ、計画の書式、ルーティング、前提条件、検証 |
| `skills/design-lifecycle/references/` | `phases.md`、`disciplines.md`、`prerequisites.md` |
| `agents/design-lead.md` | Claude Code 用サブエージェント |
| `platforms/instructions.md` | スキル非対応ホスト向けのポータブル版 |
| `.claude-plugin/` | Claude Code のプラグインとマーケットプレイスのマニフェスト |
| `install.sh` | 複数ホスト対応のインストーラー |

## 🎯 使い方

- プロジェクトを説明するだけで使えます。例：「10×25 m の敷地に建つ 3 階建てデュプレックスのスラブリブを設計して」。スキルは自動で有効になります。名前で呼び出すこともできます：`/design-lifecycle`（Claude Code）、`$design-lifecycle`（Codex）。
- Claude Code では「design-lead エージェントでこの住宅の梁伏図を描いて」と頼むこともできます。

## 🛠️ 必要なツール

| 用途 | ツール |
|---|---|
| 作図（全分野） | [CADCraft](https://github.com/storytold/cadcraft)：MCP を使う場合はアプリを `--control 7979` で起動、またはヘッドレスの `cadcraft-cli` を使用 |

CADCraft がない場合は、何をインストール・実行すればよいかをエージェントが案内します。

## 📄 ライセンス

MIT
