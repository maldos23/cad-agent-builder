# cad-agent-builder

[English](README.md) · **Español** · [中文](README.zh.md) · [日本語](README.ja.md)

Una **skill y un agente para diseñadores**: arquitectura/CAD, UI/UX, producto y marca. Llevan un encargo desde una idea vaga hasta entregables verificados mediante un **ciclo de vida no lineal**. La skill usa el formato abierto [Agent Skills](https://agentskills.io), así que funciona en Claude Code, Codex, ChatGPT, Gemini CLI, OpenCode, Hermes Agent y otros.

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
- **Pide ayuda cuando se bloquea.** Primero revisa sus herramientas (app, CLI y MCP de CADCraft, MCP de Figma, `gh`, `python3`). Si falta algo, te pide una acción concreta y te ofrece una alternativa.
- **Resultados honestos.** Marca los supuestos en los entregables, indica que lo estructural es un prediseño que debe validar un DRO o calculista, y revisa visualmente cada plano o pantalla antes de reportar.

## Compatibilidad

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

## Contenido

| Ruta | Qué es |
|---|---|
| `skills/design-lifecycle/SKILL.md` | La skill: fases, formato del plan, enrutamiento, requisitos, verificación |
| `skills/design-lifecycle/references/` | `phases.md`, `disciplines.md`, `prerequisites.md` |
| `agents/design-lead.md` | Subagente para Claude Code |
| `platforms/instructions.md` | Versión portable para plataformas sin skills |
| `.claude-plugin/` | Manifiestos del plugin y del marketplace de Claude Code |
| `install.sh` | Instalador para varias plataformas |

## Uso

- Describe tu proyecto, por ejemplo *"diseña las nervaduras de un dúplex de 3 pisos en un terreno de 10×25"*. La skill se activa sola, o puedes llamarla por su nombre: `/design-lifecycle` (Claude Code) o `$design-lifecycle` (Codex).
- En Claude Code también puedes pedir: *"usa el agente design-lead para planear mi identidad de marca"*.

## Herramientas opcionales por disciplina

| Disciplina | Herramientas |
|---|---|
| Arquitectura / CAD | [CADCraft](https://github.com/storytold/cadcraft): la app con `--control 7979` para el MCP, o `cadcraft-cli` sin interfaz |
| UI/UX | El MCP de Figma |
| Marca | Las herramientas de generación de imágenes de tu plataforma |

Ninguna es obligatoria. Si falta alguna, el agente te dice qué instalar o qué ejecutar.

## Licencia

MIT
