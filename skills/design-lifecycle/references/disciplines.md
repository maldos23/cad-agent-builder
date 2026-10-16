# Disciplines — deliverables and CADCraft patterns

## Architectural and structural (CADCraft)
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

## Structural details
- **Deliverables:** framing plans with section marks (for example TR15X20C25), cuadros de trabes y columnas, slab plans with rib direction and spacing, foundation plans, details of cadenas, castillos, bastones and stirrups.
- **Pattern:** draw each beam as a double line at its real width with its label. Draw slabs with the vigueta direction arrow and dashed viguetas at their spacing. Mark voids with an X.

## Installations
- **Deliverables:** hydraulic, sanitary, electrical and gas plans over the architectural base, with symbols, pipe diameters and slopes.
- **Pattern:** one layer per system, over the same axes as the architectural plan.

## Site / civil works
- **Deliverables:** site plan with lot, setbacks, coverage (COS/CUS), parking, levels and drainage.

## Mixed projects
Split the work plan into one track per discipline. Share the Idea, Research and Analysis phases and one set of axes across all drawings, and run Design, Specifications and Execution separately for each track.
