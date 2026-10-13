# Disciplines — deliverables and tools

## Architecture / structural (CAD)
- **Deliverables:**
  - floor plans
  - framing and slab plans (for example vigueta-y-bovedilla rib layouts)
  - sections
  - reinforcement details
  - material and quantity tables
  - general notes
- **Tool:** CADCraft.
  - **Connected MCP:** `command_line` (AutoCAD syntax), `open`, `render`, `screenshot`.
  - **Headless:** `cadcraft-cli run --metric --script-file x.scr --save x.dxf --export x.png`, plus `cadcraft-cli convert x.dxf x.pdf`.
- **Pattern:** write a small Python generator that emits a `.scr` script, so the geometry stays parametric (lot size, spans, spacing).
- **Script gotchas we learned:**
  - In a script, `TEXT` keeps prompting for more lines. End each one with an empty line.
  - Set dimension variables with `SETVAR DIMTXT 0.15` (and similar) for drawings in meters.
  - Details drawn at an enlarged scale K need `SETVAR DIMLFAC 1/K` so the dimensions read in real units. Reset it to 1 afterwards.
  - Use layers per system: MUROS, CADENAS, VIGUETAS, HUECOS, COTAS, TEXTOS, ACERO, DETALLE.
- **Mexico:** NMX-C-406 (vigueta y bovedilla), NMX-B-506 (rebar), NMX-B-290 (welded mesh), NMX-C-404 (block). Commercial items include Armex 15x15-4 and 15x20-4, 12 m bars, and 2.5×40 m mesh rolls. Always add "pre-design — validate with DRO/calculista".

## UI/UX / digital product
- **Deliverables:** user flows, wireframes, high-fidelity screens, design system tokens, components and states, handoff notes.
- **Tools:** the Figma MCP. Load `figma:figma-use` before `use_figma`, and use `figma:figma-generate-design` for screens. Use `impeccable` and the other UI skills for critique and polish. Use Claude in Chrome to check live pages.

## Brand / graphic
- **Deliverables:** strategy (attributes, voice), logo system, palette, typography, applications, brandbook.
- **Tools:** `brandkit`, `higgsfield-brandkit`, `higgsfield-generate`.

## Product / industrial
- **Deliverables:** concept sketches, 2D/3D drawings, bill of materials, tolerances, manufacturing notes.
- **Tools:** CADCraft (its 3D/modeling commands), plus specification tables.

## Mixed projects
Split the work plan into one track per discipline. Share the Idea, Research and Analysis phases across the tracks, and run Design, Specifications and Execution separately for each track.
