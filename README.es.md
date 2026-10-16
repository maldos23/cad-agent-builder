# 🏗️ cad-agent-builder

[English](README.md) · **Español** · [中文](README.zh.md) · [日本語](README.ja.md) · [🌐 Sitio web](https://maldos23.github.io/cad-agent-builder/)

Una **skill y un agente para ingeniería civil y diseño arquitectónico en [CADCraft](https://github.com/storytold/cadcraft)**: plantas, estructura (trabes, losas, nervaduras), detalles de armado, instalaciones, conjunto, especificaciones y cuantificación. Llevan un encargo desde una idea vaga hasta planos DXF/PDF verificados mediante un **ciclo de vida no lineal**. La skill usa el formato abierto [Agent Skills](https://agentskills.io), así que funciona en Claude Code, Codex, ChatGPT, Gemini CLI, OpenCode, Hermes Agent y otros.

> 🌐 **Sitio web:** [https://maldos23.github.io/cad-agent-builder/](https://maldos23.github.io/cad-agent-builder/)

```
        ┌──────────── Idea ────────────┐
        ▼                              │
 Investigación ⇄ Análisis ⇄ Diseño ⇄ Especificaciones ⇄ Ejecución
        ▲                                              │
        └──────── regresa cuando cambian los datos ────┘
```

- **Primero el triage.** Entra en la fase que tu proyecto realmente necesita. Por ejemplo, si ya tienes una planta, pasa directo a Especificaciones.
- **Plan de trabajo vivo.** Lleva un `DESIGN_PLAN.md` con el brief, una tabla de fases, decisiones, supuestos, preguntas abiertas, requisitos y entregables.
- **Responde en tu idioma.** La skill está escrita en inglés, pero las respuestas siempre siguen el idioma en que le escribes.
- **Pide ayuda cuando se bloquea.** Primero revisa sus herramientas (app, CLI y MCP de CADCraft, `python3`). Si falta algo, te pide una acción concreta y te ofrece una alternativa.
- **Resultados honestos.** Marca los supuestos en los entregables, indica que lo estructural es un prediseño que debe validar un DRO o calculista, y revisa visualmente cada plano antes de reportar.

## 🧰 Compatibilidad

| Plataforma | Cómo la carga | Instalación |
|---|---|---|
| **Claude Code** | Skill y agente `design-lead` | `/plugin marketplace add maldos23/cad-agent-builder`, o `./install.sh claude` |
| **OpenAI Codex** (CLI, IDE) | `~/.agents/skills/` | `./install.sh agents`, luego `/skills` o `$design-lifecycle` |
| **ChatGPT escritorio** | Panel de Skills | Sube `design-lifecycle.zip` de la [release](https://github.com/maldos23/cad-agent-builder/releases) |
| **ChatGPT web / Custom GPT** | Instrucciones y Knowledge | Pega `platforms/instructions.md` y sube `SKILL.md` y `references/*.md` como conocimiento |
| **Gemini CLI** | `~/.agents/skills/` | `./install.sh agents`, luego `/skills list` |
| **OpenCode** | `~/.agents/skills/` (también lee `~/.claude/skills/`) | `./install.sh agents` |
| **Hermes Agent** (Nous Research) | `~/.hermes/skills/` | `./install.sh hermes` |
| **Cursor / Copilot / Windsurf / Aider** | Reglas o `AGENTS.md` | Copia `platforms/instructions.md` en `.cursor/rules/`, `.github/copilot-instructions.md` o `AGENTS.md` |

Ejecuta `./install.sh` sin argumentos para instalarla en todas las plataformas a la vez.

## 📦 Instalación

Primero clona el repo (todas las instalaciones locales empiezan aquí):

```bash
git clone https://github.com/maldos23/cad-agent-builder.git
cd cad-agent-builder
```

### 🚀 Todas las plataformas a la vez

Instala la skill para Claude Code, Codex, Gemini CLI, OpenCode y Hermes.

```bash
./install.sh
```

### 🟠 Claude Code

Opción A, plugin (recomendado), dentro de Claude Code:

```text
/plugin marketplace add maldos23/cad-agent-builder
/plugin install cad-agent-builder@cad-agent-builder
```

Opción B, manual:

```bash
./install.sh claude
```

### 🟢 OpenAI Codex (CLI / IDE)

```bash
./install.sh agents   # -> ~/.agents/skills/design-lifecycle
```

Luego, en Codex, escribe `/skills` o menciona `$design-lifecycle`.

### 🔵 Gemini CLI

```bash
./install.sh agents   # -> ~/.agents/skills/design-lifecycle
```

Compruébalo con `/skills list` dentro de Gemini CLI.

### ⚪ OpenCode

```bash
./install.sh agents   # -> ~/.agents/skills/design-lifecycle
```

OpenCode también lee `~/.claude/skills/`, así que la instalación de Claude Code también sirve.

### 🟣 Hermes Agent (Nous Research)

```bash
./install.sh hermes   # -> ~/.hermes/skills/design-lifecycle
```

La skill queda disponible como el comando `/design-lifecycle`.

### 💬 ChatGPT escritorio

```bash
curl -LO https://github.com/maldos23/cad-agent-builder/releases/latest/download/design-lifecycle.zip
```

Descarga el zip, abre **Skills** en la barra lateral y súbelo.

### 🌐 ChatGPT web / Custom GPT

1. Crea un GPT (o un Proyecto) y pega el contenido de `platforms/instructions.md` en **Instrucciones**.
2. Sube `skills/design-lifecycle/SKILL.md` y `skills/design-lifecycle/references/*.md` como **Conocimiento**.

### 🖱️ Cursor

Ejecútalo en la raíz de tu proyecto:

```bash
mkdir -p .cursor/rules
printf -- '---\ndescription: Design lifecycle for design projects\nalwaysApply: false\n---\n' > .cursor/rules/design-lifecycle.mdc
curl -L https://raw.githubusercontent.com/maldos23/cad-agent-builder/main/platforms/instructions.md >> .cursor/rules/design-lifecycle.mdc
```

### 🤖 GitHub Copilot

Ejecútalo en la raíz de tu proyecto:

```bash
mkdir -p .github
curl -L https://raw.githubusercontent.com/maldos23/cad-agent-builder/main/platforms/instructions.md >> .github/copilot-instructions.md
```

### 🧩 Windsurf / Aider / Zed / otras plataformas con AGENTS.md

Ejecútalo en la raíz de tu proyecto:

```bash
curl -L https://raw.githubusercontent.com/maldos23/cad-agent-builder/main/platforms/instructions.md >> AGENTS.md
```

### 🧹 Desinstalar

```bash
rm -rf ~/.claude/skills/design-lifecycle ~/.claude/agents/design-lead.md \
       ~/.agents/skills/design-lifecycle ~/.hermes/skills/design-lifecycle
```

## 📁 Contenido

| Ruta | Qué es |
|---|---|
| `skills/design-lifecycle/SKILL.md` | La skill: fases, formato del plan, enrutamiento, requisitos, verificación |
| `skills/design-lifecycle/references/` | `phases.md`, `disciplines.md`, `prerequisites.md` |
| `agents/design-lead.md` | Subagente para Claude Code |
| `platforms/instructions.md` | Versión portable para plataformas sin skills |
| `.claude-plugin/` | Manifiestos del plugin y del marketplace de Claude Code |
| `install.sh` | Instalador para varias plataformas |

## 🎯 Uso

- Describe tu proyecto, por ejemplo *"diseña las nervaduras de un dúplex de 3 pisos en un terreno de 10×25"*. La skill se activa sola, o puedes llamarla por su nombre: `/design-lifecycle` (Claude Code) o `$design-lifecycle` (Codex).
- En Claude Code también puedes pedir: *"usa el agente design-lead para dibujar la planta de trabes de esta casa"*.

## 🛠️ Herramienta necesaria

| Uso | Herramienta |
|---|---|
| Dibujo (todas las disciplinas) | [CADCraft](https://github.com/storytold/cadcraft): la app con `--control 7979` para el MCP, o `cadcraft-cli` sin interfaz |

Si falta CADCraft, el agente te dice qué instalar o qué ejecutar.

## 📄 Licencia

MIT
