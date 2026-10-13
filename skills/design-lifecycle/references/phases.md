# Phases — entry, work, exit

Enter a phase when its **entry** condition holds. Leave it only when its **exit** criteria are met, or when the user explicitly accepts the gap (log that gap as an assumption).

## Idea
- **Entry:** a new request, or the goal changed.
- **Work:** restate the goal in one sentence. Identify who it is for, the hard constraints (budget, site, platform, deadline) and what "done" looks like.
- **Exit:** a brief in DESIGN_PLAN.md that the user did not contradict.

## Research
- **Entry:** you need facts you don't have, such as norms, references, competitors, commercial products, or user data.
- **Work:** search the web and local files, and read what the user provides. Cite sources. Separate *verified* facts from *assumed* ones.
- **Exit:** every fact the design depends on is either sourced or listed under Assumptions.

## Analysis
- **Entry:** the facts are available.
- **Work:** turn the facts into requirements. Examples: an architectural program with areas, spans, loads, setbacks and coverage ratio (COS/CUS); user flows; information architecture; brand attributes. Identify risks and trade-offs.
- **Exit:** a numbered requirements list that the design can be checked against.

## Design
- **Entry:** the requirements exist.
- **Work:** produce the solution with the cheapest artifact that answers the question: a sketch, then a plan or wireframe, then a detailed drawing. Iterate with the user.
- **Exit:** the user accepts the layout or concept, or it passes the requirement checks.

## Specifications
- **Entry:** the design is accepted.
- **Work:** define exactly how it is built. Examples: materials, commercial sizes, thicknesses, standards (NMX/ASTM/ISO), reinforcement details, quantities, design tokens, component states, typography scales.
- **Exit:** someone else could build or implement it without asking you.

## Execution
- **Entry:** the prerequisites are OK and the specs (or a design) exist.
- **Work:** produce the files. Render or take a screenshot, look at the result, fix it, then deliver.
- **Exit:** the deliverables are verified and listed in DESIGN_PLAN.md with their paths or links.

## Typical loops
- Execution reveals an overlap or a wrong unit → stay in Execution and fix it.
- Specifications needs a norm → go to Research.
- The user changes a constraint (lot size, platform) → go to Analysis, then Design.
- The user dislikes the concept → go to Design, or to Idea if the goal itself was misunderstood.
