// Truth model for the waffle slab figure. Units: cm for geometry, kN and m for loads.
export const M = 72;            // module: 60 cm casetón + 12 cm rib
export const CASETON = 60;      // recoverable plastic dome, 60 × 60 cm
export const RIB = 12;          // rib width
export const RIB_H = 20;        // rib depth below the topping
export const TOP = 5;           // topping (capa de compresión)
export const SLAB = RIB_H + TOP;// 25 cm total
export const COVER = 2.5;       // stirrup cover
export const BAR = "#3";        // 2 bars #3 (3/8") at the bottom of each rib
export const MESH = 15;         // welded mesh 6x6-10/10: 15 × 15 cm
export const GAMMA = 24;        // kN/m³ reinforced concrete
export const FINISH = 1.0;      // kN/m² floor finishes + ceiling
export const LIVE = 1.9;        // kN/m² housing live load (≈190 kg/m²)

const m = (cm) => cm / 100;
// Concrete per module: topping over the whole module + the rib frame around one casetón.
const area = m(M) ** 2;
const volume = m(TOP) * area + m(RIB_H) * (area - m(CASETON) ** 2);
export const SELF = (GAMMA * volume) / area;                // kN/m²
export const Q = SELF + FINISH + LIVE;                      // service load, kN/m²
export const PER_RIB = Q * m(M);                            // kN/m carried by each rib line
export const SAVING = 1 - volume / (m(SLAB) * area);        // vs a solid 25 cm slab

if (process.argv[1] && process.argv[1].endsWith("model.mjs")) {
  console.assert(Math.abs(SELF - 2.67) < 0.01, "self weight", SELF);
  console.assert(Math.abs(Q - 5.57) < 0.01, "q", Q);
  console.log({ SELF: SELF.toFixed(2), Q: Q.toFixed(2), PER_RIB: PER_RIB.toFixed(2), SAVING: (SAVING * 100).toFixed(0) + "%" });
}
