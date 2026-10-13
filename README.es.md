# cad-agent-builder

[English](README.md)

Una **skill y un agente de Claude Code para diseñadores**: arquitectura/CAD, UI/UX, producto y marca. Llevan un encargo desde una idea vaga hasta entregables verificados mediante un **ciclo de vida no lineal**:

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
- **Pide ayuda cuando se bloquea.** Primero revisa sus herramientas (app, CLI y MCP de CADCraft, MCP de Figma, `gh`, `python3`). Si falta algo, te pide una acción concreta, por ejemplo `! open -n -a CADCraft --args --control 7979`, y te ofrece una alternativa.
- **Resultados honestos.** Marca los supuestos en los entregables, indica que lo estructural es un prediseño que debe validar un DRO o calculista, y revisa visualmente cada plano o pantalla antes de reportar.

## Contenido

| Ruta | Qué es |
|---|---|
| `skills/design-lifecycle/SKILL.md` | La skill: fases, formato del plan, enrutamiento, requisitos, verificación |
| `skills/design-lifecycle/references/` | `phases.md` (criterios de entrada y salida), `disciplines.md` (entregables y herramientas), `prerequisites.md` (verificaciones y cómo pedir acciones) |
| `agents/design-lead.md` | Subagente que conduce el ciclo |
| `.claude-plugin/` | Manifiestos del plugin y del marketplace |
| `install.sh` | Instalación manual en `~/.claude` |

## Instalación

**Como plugin (recomendado):**
```
/plugin marketplace add maldos23/cad-agent-builder
/plugin install cad-agent-builder@cad-agent-builder
```

**Manual:**
```bash
git clone https://github.com/maldos23/cad-agent-builder.git
cd cad-agent-builder && ./install.sh
```

## Uso

- Escribe `/design-lifecycle` y describe tu proyecto, o simplemente di *"diseña las nervaduras de un dúplex de 3 pisos en un terreno de 10×25"*.
- Para usarlo como subagente, pide: *"usa el agente design-lead para planear mi identidad de marca"*.

## Herramientas opcionales por disciplina

| Disciplina | Herramientas |
|---|---|
| Arquitectura / CAD | [CADCraft](https://github.com/storytold/cadcraft): la app con `--control 7979` para el MCP, o `cadcraft-cli` sin interfaz |
| UI/UX | El MCP de Figma y sus skills |
| Marca | `brandkit` y las skills `higgsfield-*` |

Ninguna es obligatoria. Si falta alguna, el agente te dice qué instalar o qué ejecutar.

## Licencia

MIT
