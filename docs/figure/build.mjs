// Fig 1 — Waffle slab (losa reticular): ribs (nervaduras) between recoverable casetones.
// node docs/figure/build.mjs            -> slab.html (dark)
// node docs/figure/build.mjs --light    -> slab-light.html (light, what the landing page embeds)
// Kit: docs/figure/kit/iso-kit.mjs, copied from the Anatomy skill (MIT, see kit/LICENSE).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "./kit/iso-kit.mjs";
import * as T from "./model.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--light") ? "light" : "dark";
const kitScript = () => readFileSync(join(HERE, "kit/iso-kit.mjs"), "utf8").replace(/^export /gm, "");

const W = 760, H = 540;
const { M, RIB, RIB_H, SLAB } = T;
const X0 = -6, X1 = 4.5 * M, Y0 = -6, Y1 = 3.5 * M; // panel: a piece of a larger slab, cut on its near faces
const XJ = 2.5 * M;                                    // pour joint: concrete for x ≥ XJ, still open for x < XJ
const COL = [4 * M, 3 * M], COL_HALF = 15;             // 30 × 30 column under the solid zone
const ABACUS = { x: 3 * M - RIB / 2, y: 2 * M - RIB / 2 };
const FZ = -110;                                       // floor (storey height shortened)
const LIFT = { mesh: 56, cas: 36 };                    // explode: mesh first, then the casetones
const SPRING = { stiffness: 64, damping: 14.2, stagger: 0.28 };

const P = k.fitProjection(
  [
    ...k.boxCorners({ x: -40, y: -40, w: 404, d: 332, r: 10 }, FZ - 14, FZ),
    ...k.boxCorners({ x: X0, y: Y0, w: X1 - X0, d: Y1 - Y0, r: 0 }, 0, SLAB),
    ...k.boxCorners({ x: X0, y: Y0, w: XJ - X0, d: Y1 - Y0, r: 0 }, 0, 20 + LIFT.mesh + 4),
  ],
  W, H, { pad: 26, azimuth: 52, elevation: 32 },
);

const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const path = (pts, closed = false) => k.pathOf(pts.map(at), closed);
const depth = (p) => k.depthOf(p, P);
const LIFT_PER_UNIT = depth([0, 0, 1]) - depth([0, 0, 0]);
const byDepth = (pts) => [...pts].sort((a, b) => depth([a[0], a[1], 0]) - depth([b[0], b[1], 0]));
const rand = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();

// ---------- base: the bench this bay stands on ----------
const PLATE = { x: -40, y: -40, w: 404, d: 332, r: 10 };
function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, FZ - 14, 14, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 26))) {
    out.push(S(k.cylinder(x, y, 9, FZ - 14, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 7, FZ - 12.4, 0.4, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, FZ - 12, 12, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 6), FZ, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 13);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.6, FZ, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, FZ])), { size: 0.5 }));
  const strip = { x: -14, y: PLATE.y + PLATE.d - 15, w: 352, d: 8, r: 1 };
  out.push(S(k.slabOf(strip, FZ, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(0, 324, 12, 6, strip.y + 0.8, FZ + 0.6, [2.4, 4.6], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 3, strip.y + 4, FZ + 0.6]), at([strip.x + strip.w - 3, strip.y + 4, FZ + 0.6])], { size: 0.45 }));
  const label = { x: -30, y: 248, w: 46, d: 18, r: 1.5 };
  out.push(S(k.slabOf(label, FZ, 0.8, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.6), FZ + 0.8, P, 4), { tone: "faint" }));
  [[30], [22], [26]].forEach(([len], i) => out.push(L(k.lineOnTop([label.x + 5, label.y + 5 + i * 4], [label.x + 5 + len, label.y + 5 + i * 4], FZ + 0.8, P), { tone: "lo", free: true })));
  return out.join("");
}

// ---------- under the slab: column, shores (puntales) and formwork beams ----------
function shore(x, y, top) {
  const out = [];
  const collar = FZ + 58;
  out.push(S(k.cylinder(x, y, 5, FZ, 1, P, 24), { tone: "lo" }));
  out.push(S(k.cylinder(x, y, 2.4, FZ + 1, collar - FZ - 1, P, 20), { tone: "mid", crease: "none" }));
  out.push(L(k.sideArc(x, y, 2.4, FZ + 20, P, 12), { tone: "faint" }));
  out.push(S(k.cylinder(x, y, 3.3, collar, 3.4, P, 20), { tone: "mid" }));
  out.push(S(k.slabOf({ x: x - 0.7, y: y + 3.3, w: 1.4, d: 3, r: 0.4 }, collar + 1.1, 1.2, P, 2), { tone: "hi", crease: "none" }));
  out.push(S(k.cylinder(x, y, 1.8, collar + 3.4, top - 2 - collar - 3.4, P, 16), { tone: "mid", crease: "none" }));
  out.push(S(k.slabOf({ x: x - 5, y: y - 5, w: 10, d: 10, r: 0.6 }, top - 2, 2, P, 2, 0.3), { tone: "mid" }));
  out.push(D([at([x - 3, y - 3, top]), at([x + 3, y + 3, top])], { size: 0.4 }));
  return out.join("");
}
function under() {
  const out = [];
  const ped = { x: COL[0] - 22, y: COL[1] - 22, w: 44, d: 44, r: 1 };
  out.push(S(k.slabOf(ped, FZ, 4, P, 3, 0.6), { tone: "mid" }));
  const col = { x: COL[0] - COL_HALF, y: COL[1] - COL_HALF, w: 30, d: 30, r: 0.6 };
  const seam = k.sideSeam(col, FZ + 58, P, 2);
  out.push(S(k.slabOf(col, FZ + 4, -2 - FZ - 4, P, 2), { tone: "hi", crease: "none", inner: L(seam, { tone: "faint" }) }));
  const B2 = { x: 308, y: -10, w: 8, d: 266, r: 0.4 };
  const B1 = { x: -10, y: 236, w: 338, d: 8, r: 0.4 };
  for (const y of [36, 108, 180]) out.push(shore(312, y, -22));
  out.push(S(k.slabOf(B2, -22, 10, P, 2, 0.3), { tone: "mid" }));
  for (const x of [36, 108, 180, 252]) out.push(shore(x, 240, -12));
  out.push(S(k.slabOf(B1, -12, 10, P, 2, 0.3), { tone: "mid" }));
  return out.join("");
}

// ---------- formwork deck and edge boards ----------
const deck = () => S(k.slabOf({ x: -10, y: -10, w: X1 + 14, d: Y1 + 14, r: 0.5 }, -2, 2, P, 2, 0.4), { tone: "lo" });
const boardsFar = () =>
  S(k.slabOf({ x: -8, y: -8, w: 2, d: Y1 + 10, r: 0.2 }, 0, SLAB, P, 2), { tone: "lo" }) +
  S(k.slabOf({ x: -6, y: -8, w: XJ + 6, d: 2, r: 0.2 }, 0, SLAB, P, 2), { tone: "lo" });
const boardNear = () => S(k.slabOf({ x: -8, y: Y1, w: XJ + 8, d: 2, r: 0.2 }, 0, SLAB, P, 2, 0.3), { tone: "lo" });

// ---------- open zone: casetones and the rib steel in the channels between them ----------
const items = []; // { key, ride, svg }
function caseton(i, j) {
  const x0 = i * M + 6, y0 = j * M + 6;
  const x1 = Math.min((i + 1) * M - 6, XJ), y1 = Math.min((j + 1) * M - 6, Y1);
  const plan = { x: x0, y: y0, w: x1 - x0, d: y1 - y0, r: 2.4 };
  const full = x1 - x0 === T.CASETON && y1 - y0 === T.CASETON;
  const out = [S(k.slabOf(plan, 0, RIB_H, P, 4, 0.8), { tone: "mid" })];
  const inner = k.insetPlan(plan, 5);
  out.push(L(k.planOutline(inner, RIB_H, P, 4), { tone: "faint" }));
  if (full) {
    const cx = x0 + 30, cy = y0 + 30;
    out.push(L(k.lineOnTop([inner.x, cy], [cx - 3.5, cy], RIB_H, P) + k.lineOnTop([cx + 3.5, cy], [inner.x + inner.w, cy], RIB_H, P), { tone: "faint" }));
    out.push(L(k.lineOnTop([cx, inner.y], [cx, cy - 3.5], RIB_H, P) + k.lineOnTop([cx, cy + 3.5], [cx, inner.y + inner.d], RIB_H, P), { tone: "faint" }));
    out.push(L(k.ring(cx, cy, 3.5, RIB_H, P, 20), { tone: "lo" }));
    out.push(D([at([cx, cy, RIB_H])], { size: 0.55, tone: "mid" }));
  }
  items.push({ key: depth([(x0 + x1) / 2, (y0 + y1) / 2, 10]), ride: "cas", svg: out.join("") });
}
// One channel span between two nodes: spacers, the back of each stirrup, two bars, the near legs.
function channel(axis, c, a, b, lastSpan, firstSpan) {
  const zb = axis === "x" ? 2 : 3.2, zt = 18, zbar = axis === "x" ? 3 : 4.2;
  const pt = (s, o, z) => (axis === "x" ? [s, c + o, z] : [c + o, s, z]);
  const stirrups = [];
  for (let s = 12; s < Y1; s += 24) if (s > a + 4 && s < b - 4) stirrups.push(s);
  const out = [];
  for (const s of stirrups) {
    const plan = axis === "x" ? { x: s - 2, y: c - 3.5, w: 4, d: 7, r: 0.5 } : { x: c - 3.5, y: s - 2, w: 7, d: 4, r: 0.5 };
    out.push(S(k.slabOf(plan, 0, zb, P, 2), { tone: "lo", crease: "none" }));
  }
  const back = stirrups.map((s) => path([pt(s, 3.5, zb), pt(s, -3.5, zb), pt(s, -3.5, zt), pt(s, 3.5, zt)])).join("");
  out.push(L(back, { tone: "mid" }));
  const bars = [-2.5, 2.5].map((o) => path([pt(a, o, zbar), pt(b, o, zbar)])).join("");
  out.push(L(bars, { tone: "hi" }));
  if (firstSpan) out.push(D([-2.5, 2.5].map((o) => at(pt(a, o, zbar))), { size: 0.5, tone: "hi" }));
  out.push(L(stirrups.map((s) => path([pt(s, 3.5, zt), pt(s, 3.5, zb)])).join(""), { tone: "mid" }));
  const mid = (a + b) / 2;
  items.push({ key: depth(pt(mid, 0, 8)) + (axis === "y" ? 0.05 : 0), ride: null, svg: out.join("") });
}
function openZone() {
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) caseton(i, j);
  const xs = [X0, 0, M, 2 * M, XJ], ys = [Y0, 0, M, 2 * M, 3 * M, Y1];
  for (const c of [0, M, 2 * M, 3 * M]) xs.slice(1).forEach((b, n) => channel("x", c, xs[n], b, n === xs.length - 2, n === 0));
  for (const c of [0, M, 2 * M]) ys.slice(1).forEach((b, n) => channel("y", c, ys[n], b, n === ys.length - 2, n === 0));
}

// The welded mesh 6x6-10/10 (15 × 15 cm) sits on chairs 2.5 cm above the casetones.
function mesh() {
  const z = RIB_H + 2.5, ends = [], lines = [];
  for (let y = 0; y < Y1; y += T.MESH) { lines.push(path([[X0, y, z], [XJ, y, z]])); ends.push(at([X0, y, z]), at([XJ, y, z])); }
  for (let x = 0; x < XJ; x += T.MESH) { lines.push(path([[x, Y0, z], [x, Y1, z]])); ends.push(at([x, Y0, z]), at([x, Y1, z])); }
  return L(lines.join(""), { tone: "lo" }) + D(ends, { size: 0.4, tone: "mid" });
}

// ---------- poured zone: one monolithic block, its two near faces cut to show the section ----------
function sectionOnFace(axis, plane, from, to) {
  // axis "x": face x = plane, running along y. axis "y": face y = plane, running along x.
  const pt = (s, z) => (axis === "x" ? [plane, s, z] : [s, plane, z]);
  const out = [];
  const shell = [], voids = [];
  const cells = [];
  for (let c = 0; c * M < to; c++) {
    const a = Math.max(c * M + 6, from), b = Math.min((c + 1) * M - 6, to);
    const solid = axis === "x" ? c * M + 6 >= ABACUS.y : c * M + 6 >= ABACUS.x;
    if (b > a && !solid) cells.push([a, b, c * M + 6 >= from]);
  }
  for (const [a, b, wallA] of cells) {
    shell.push(path([pt(a, 0), pt(a, RIB_H), pt(b, RIB_H), pt(b, 0)], true));
    voids.push(path([pt(wallA ? a + 1.2 : a, 0), pt(wallA ? a + 1.2 : a, RIB_H - 1.2), pt(b - 1.2, RIB_H - 1.2), pt(b - 1.2, 0)], true));
  }
  out.push(`<path class="sx-shell" d="${shell.join("")}"/>`, `<path class="sx-void" d="${voids.join("")}"/>`);
  out.push(L(shell.join("") + voids.join(""), { tone: "lo" }));
  const ribs = [], bars = [], top = [], meshDots = [];
  const solidFrom = axis === "x" ? ABACUS.y : ABACUS.x;
  for (let c = 0; c * M <= to + 6; c++) {
    const s = c * M;
    if (s - 6 < from - 0.1 || s > to) continue;
    if (s < solidFrom) ribs.push(path([pt(s - 3.5, 2.5), pt(s + 3.5, 2.5), pt(s + 3.5, RIB_H - 2.5), pt(s - 3.5, RIB_H - 2.5)], true));
    const zb = axis === "x" ? 3 : 4.2;
    bars.push(at(pt(s - 2.5, zb)), at(pt(s + 2.5, zb)));
  }
  for (let s = solidFrom + 6; s < to - 3; s += 12) top.push(at(pt(s, RIB_H - 3)));
  for (let s = from + 4; s < to - 2; s += T.MESH) meshDots.push(at(pt(s, RIB_H + 2.5)));
  out.push(L(ribs.join(""), { tone: "mid" }));
  out.push(D(bars, { size: 0.75, tone: "hi" }), D(top, { size: 0.55, tone: "mid" }), D(meshDots, { size: 0.4, tone: "mid" }));
  return out.join("");
}
function block() {
  const plan = { x: XJ, y: Y0, w: X1 - XJ, d: Y1 - Y0, r: 0 };
  const out = [S(k.slabOf(plan, 0, SLAB, P, 1, 0.6), { tone: "mid" })];
  // stucco: a sparse hand-troweled stipple on the topping, kept inside the face
  const stip = [];
  for (let n = 0; n < 260; n++) stip.push(at([XJ + 3 + rand() * (X1 - XJ - 6), Y0 + 3 + rand() * (Y1 - Y0 - 6), SLAB]));
  out.push(`<g class="stip">${D(stip, { size: 0.32, tone: "lo" })}</g>`);
  out.push(sectionOnFace("x", X1, Y0, Y1), sectionOnFace("y", Y1, XJ, X1));
  return out.join("");
}

// ---------- assemble ----------
openZone();
items.sort((a, b) => a.key - b.key);
const far = items.map((it, n) => `<g data-k="${it.key.toFixed(2)}"${it.ride ? ` data-ride="${it.ride}" data-l="${(LIFT[it.ride] * LIFT_PER_UNIT).toFixed(3)}"` : ""}>${it.svg}</g>`).join("");

const LANES = [
  [[XJ, M, SLAB], [COL[0], M, SLAB], [COL[0], COL[1], SLAB]],
  [[XJ, 3 * M, SLAB], [COL[0], COL[1], SLAB]],
  [[3 * M, Y0, SLAB], [3 * M, ABACUS.y, SLAB], [COL[0], COL[1], SLAB]],
  [[COL[0], Y0, SLAB], [COL[0], COL[1], SLAB]],
];
const pool = Array.from({ length: LANES.length * 3 * 3 }, () => `<circle class="pulse" r="1.5" cx="0" cy="0" opacity="0"/>`).join("");

const svg = k.figureSvg({
  width: W, height: H,
  label: "A waffle slab under construction. Plastic casetones sit on a formwork deck held by shores; the 12 cm channels between them carry the rib steel, two bars and stirrups, under a welded mesh. The near part is already poured: its cut faces show the ribs, the casetón voids and the solid zone over the column.",
  body: [
    base(), under(), deck(), boardsFar(),
    `<g data-layer="far">${far}</g>`,
    `<g data-part="mesh">${mesh()}</g>`,
    boardNear(), block(),
    `<g data-part="pulses">${pool}</g>`,
  ],
});

const STR = {
  en: { title: "Waffle slab", hint: "Hover to lift the casetones", rest: "q {q} kN/m² · {r} kN/m per rib", up: "lifting casetones", down: "closing up", apart: "casetones out · ribs 12×20 @ 72 cm",
    keys: ["Load path: ribs to the solid zone and column", "Ribs: 2 #3 bars and stirrups in each channel", "Casetones: recoverable 60×60 cm plastic forms"],
    caption: "A waffle slab (losa reticular) under construction. Casetones sit on the formwork deck; the 12 cm channels between them hold the rib steel under a 6x6-10/10 mesh. Poured, ribs and the 5 cm topping become one 25 cm slab that uses {s}% less concrete than a solid one, and the load runs along the ribs to the solid zone over the column. Storey height shortened." },
  es: { title: "Losa reticular", hint: "Pasa el cursor para levantar los casetones", rest: "q {q} kN/m² · {r} kN/m por nervadura", up: "levantando casetones", down: "cerrando", apart: "casetones fuera · nervaduras 12×20 @ 72 cm",
    keys: ["Ruta de la carga: nervaduras a la zona maciza y la columna", "Nervaduras: 2 varillas #3 y estribos en cada canal", "Casetones: moldes de plástico recuperables de 60×60 cm"],
    caption: "Una losa reticular en construcción. Los casetones se apoyan en la cimbra; los canales de 12 cm entre ellos alojan el acero de las nervaduras bajo una malla 6x6-10/10. Ya colada, nervaduras y capa de compresión de 5 cm forman una losa de 25 cm con {s}% menos concreto que una maciza, y la carga viaja por las nervaduras hasta la zona maciza sobre la columna. Altura de entrepiso reducida." },
  zh: { title: "密肋楼板", hint: "悬停以抬起模壳", rest: "q {q} kN/m² · 每根肋 {r} kN/m", up: "正在抬起模壳", down: "正在合拢", apart: "模壳已取出 · 肋 12×20 @ 72 cm",
    keys: ["荷载路径：肋 → 实心区 → 柱", "肋：每条槽内 2 根 #3 钢筋和箍筋", "模壳：可回收的 60×60 cm 塑料模具"],
    caption: "施工中的密肋楼板。模壳放在模板上，模壳之间 12 cm 的槽内放置肋的钢筋，上面铺 6x6-10/10 钢筋网。浇筑后，肋与 5 cm 面层形成 25 cm 楼板，比实心板少用 {s}% 混凝土，荷载沿肋传到柱上方的实心区。层高已缩短。" },
  ja: { title: "ワッフルスラブ", hint: "ホバーで型枠を持ち上げる", rest: "q {q} kN/m² · リブ1本 {r} kN/m", up: "型枠を持ち上げ中", down: "閉じています", apart: "型枠を外した状態 · リブ 12×20 @ 72 cm",
    keys: ["荷重の流れ：リブ → 充実部 → 柱", "リブ：各溝に #3 鉄筋2本とスターラップ", "型枠：再利用できる 60×60 cm の樹脂製"],
    caption: "施工中のワッフルスラブ。樹脂型枠を床型枠の上に並べ、その間の 12 cm の溝にリブの鉄筋を配し、上に 6x6-10/10 の溶接金網を敷きます。打設後はリブと 5 cm のトッピングが一体の 25 cm スラブとなり、ベタスラブより {s}% 少ないコンクリートで、荷重はリブを通って柱上の充実部へ流れます。階高は縮めて表示。" },
};

const live = `
const P = ${JSON.stringify(P)};
const LANES = ${JSON.stringify(LANES)};
const SPRING = ${JSON.stringify(SPRING)};
const LIFT = ${JSON.stringify(LIFT)};
const STR = ${JSON.stringify(STR)};
const NUM = { q: ${JSON.stringify(T.Q.toFixed(1))}, r: ${JSON.stringify(T.PER_RIB.toFixed(1))}, s: ${JSON.stringify((T.SAVING * 100).toFixed(0))} };
const fill = (t) => t.replace("{q}", NUM.q).replace("{r}", NUM.r).replace("{s}", NUM.s);
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const layer = svg.querySelector('[data-layer="far"]');
const nodes = [...layer.children].map((el) => ({ el, k: +el.dataset.k, l: +(el.dataset.l || 0), ride: el.dataset.ride || null }));
const meshEl = svg.querySelector('[data-part="mesh"]');
const dots = [...svg.querySelectorAll(".pulse")];
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
const pick = (l) => (STR[l] ? l : "en");
let lang = pick(new URLSearchParams(location.search).get("lng") || (navigator.language || "en").slice(0, 2).toLowerCase());
function setLang(l) {
  lang = pick(l);
  const t = STR[lang];
  document.documentElement.lang = lang;
  document.querySelector('[data-corner="title"]').textContent = t.title;
  document.querySelector('[data-corner="hint"]').textContent = t.hint;
  document.querySelectorAll(".iso-key").forEach((el, i) => { el.lastChild.textContent = t.keys[i]; });
  const cap = document.querySelector(".iso-caption"); if (cap) cap.textContent = fill(t.caption);
  said = "";
  draw();
}
addEventListener("message", (e) => { if (e.data && e.data.type === "lng") setLang(e.data.lng); });
const sp = { mesh: { x: 0, v: 0, t: 0 }, cas: { x: 0, v: 0, t: 0 } };
let pending = [], apart = false, clock = 0, touring = !still.matches, tourAt = 0, frame = 0, last = 0, visible = false, idle = 0, on = 1, said = "";
const ORDER = ["mesh", "cas"];
function setApart(next) {
  if (next === apart) return;
  apart = next;
  const seq = next ? ORDER : [...ORDER].reverse();
  pending = seq.map((name, i) => ({ name, value: next ? 1 : 0, at: clock + i * SPRING.stagger }));
  run();
}
function step(s, dt, calm) {
  if (calm) { s.x = s.t; s.v = 0; return false; }
  for (let i = 0; i < 4; i++) { const h = dt / 4; s.v += ((s.t - s.x) * SPRING.stiffness - s.v * SPRING.damping) * h; s.x += s.v * h; }
  if (Math.abs(s.t - s.x) < 5e-4 && Math.abs(s.v) < 5e-4) { s.x = s.t; s.v = 0; return false; }
  return true;
}
let order = nodes.map((_, i) => i);
function place() {
  for (const n of nodes) {
    if (!n.ride) continue;
    const share = sp[n.ride].x;
    if (share) n.el.setAttribute("transform", translateAlong(P, [0, 0, LIFT[n.ride] * share])); else n.el.removeAttribute("transform");
  }
  if (sp.mesh.x) meshEl.setAttribute("transform", translateAlong(P, [0, 0, LIFT.mesh * sp.mesh.x])); else meshEl.removeAttribute("transform");
  const next = nodes.map((_, i) => i).sort((a, b) => key(a) - key(b));
  if (next.some((v, i) => v !== order[i])) { const f = document.createDocumentFragment(); next.forEach((i) => f.appendChild(nodes[i].el)); layer.appendChild(f); order = next; }
}
const key = (i) => nodes[i].k + (nodes[i].ride ? nodes[i].l * sp[nodes[i].ride].x : 0);
const lens = LANES.map((lane) => lane.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - lane[i][0], p[1] - lane[i][1]), 0));
function along(lane, s) {
  for (let i = 1; i < lane.length; i++) {
    const a = lane[i - 1], b = lane[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (s <= d) { const f = s / d; return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2]]; }
    s -= d;
  }
  return lane[lane.length - 1];
}
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
function pulses() {
  let n = 0;
  const speed = 70, every = 1.7;
  LANES.forEach((lane, li) => {
    const len = lens[li];
    for (let p = 0; p < 3; p++) {
      const age = ((clock + li * 0.55) % (every * 3)) - p * every;
      const s0 = (((age % (every * 3)) + every * 3) % (every * 3)) * speed;
      [0, 7, 14].forEach((back, tail) => {
        const el = dots[n++];
        const s = s0 - back;
        const a = still.matches || s < 0 || s > len ? 0 : smooth(0, 24, s) * (1 - smooth(len - 30, len, s)) * on * (1 - tail * 0.32);
        if (a < 0.01) { el.setAttribute("opacity", "0"); return; }
        const [x, y] = iso(along(lane, s), P);
        el.setAttribute("cx", x.toFixed(1)); el.setAttribute("cy", y.toFixed(1));
        el.setAttribute("r", (1.5 - tail * 0.35).toFixed(2));
        el.setAttribute("opacity", a.toFixed(2));
      });
    }
  });
}
function phase() {
  const moving = pending.length || sp.mesh.x !== sp.mesh.t || sp.cas.x !== sp.cas.t;
  if (moving) return apart ? "up" : "down";
  return apart ? "apart" : "rest";
}
function draw() {
  place();
  pulses();
  const ph = phase();
  const text = fill(STR[lang][ph]);
  if (readout.textContent !== text) readout.textContent = text;
  if (ph !== said && (ph === "rest" || ph === "apart")) { said = ph; stage.setAttribute("aria-valuetext", text); }
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now; clock += dt;
  const calm = still.matches;
  if (touring) { tourAt += dt; const t = tourAt % 11; setApart(t > 6 && t < 9.6); }
  pending = pending.filter((p) => (clock >= p.at ? ((sp[p.name].t = p.value), false) : true));
  let moving = false;
  for (const name of ORDER) moving = step(sp[name], dt, calm) || moving;
  const want = !apart && sp.cas.x < 0.02 ? 1 : 0;
  on = calm ? want : on + (want - on) * (1 - Math.exp(-dt / 0.35));
  draw();
  const busy = moving || pending.length || touring || (!calm && on > 0.01);
  frame = visible && busy ? requestAnimationFrame(tick) : 0;
}
function run() { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } }
function takeOver() { touring = false; clearTimeout(idle); idle = setTimeout(() => { touring = !still.matches; tourAt = 0; run(); }, 3600); }
new IntersectionObserver((e) => { visible = e[e.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
stage.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { takeOver(); setApart(true); } });
stage.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") { takeOver(); setApart(false); } });
stage.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") { takeOver(); setApart(!apart); } });
stage.addEventListener("keydown", (e) => {
  let to = null;
  if (e.key === "ArrowRight" || e.key === "ArrowUp") to = true;
  if (e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "Escape") to = false;
  if (e.key === " " || e.key === "Enter") to = !apart;
  if (to === null) return;
  e.preventDefault(); takeOver(); setApart(to);
});
setLang(lang);
`;

const t0 = STR.en;
const body = k.plateHtml({
  fig: "Fig 1",
  title: t0.title,
  hint: t0.hint,
  readout: t0.rest.replace("{q}", T.Q.toFixed(1)).replace("{r}", T.PER_RIB.toFixed(1)),
  keys: [{ mark: "lit", label: t0.keys[0] }, { mark: "raised", label: t0.keys[1] }, { mark: "flat", label: t0.keys[2] }],
  caption: t0.caption.replace("{s}", (T.SAVING * 100).toFixed(0)),
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Waffle slab: arrow keys or Space lift the casetones out and put them back" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0">${svg}</div>`,
});

// Embedding: transparent page, card fills the iframe. Light is the shipping theme: white paper, black ink,
// one terracotta accent for the load path (Barragán), voids in a deep stucco shadow.
const EXTRA = `
body{background:var(--anatomy-card)}
.iso-page{width:100%;margin:0}
.iso-figure{margin:0}
.iso-stage{outline:none;touch-action:pan-y}
.iso-stage:focus-visible{outline:1px solid var(--anatomy-muted);outline-offset:6px}
.iso-svg{width:100%;height:auto;display:block}
.iso{--pulse:#ffffff;--void:#070707;--shell:#1d1d1d}
.iso[data-theme="light"]{--anatomy-card:#ffffff;--anatomy-paper:#ffffff;--anatomy-face:#ffffff;--anatomy-top:#ffffff;--anatomy-page:transparent;
  --anatomy-hi:#111113;--anatomy-mid:#5c5c61;--anatomy-lo:#a3a3a8;--anatomy-faint:#d2d2d4;--anatomy-dot:#1a1a1c;
  --pulse:#c2410c;--void:#c4c4c1;--shell:#ededea}
.iso[data-theme="light"] .iso-plate{box-shadow:0 0 0 1px #e4e4e1}
.iso-swatch[data-mark="lit"] path{stroke:var(--pulse)}
.pulse{fill:var(--pulse)}
.sx-shell{fill:var(--shell)}
.sx-void{fill:var(--void)}
.iso:not([data-theme="light"]) .stip circle{opacity:.07}
.iso-legend{padding:0 2px}
`;
const html = k.pageHtml({ title: "Waffle slab", theme, body, script: kitScript() + live, width: 760 }).replace("</head>", `<style>${EXTRA}</style></head>`);
const file = theme === "light" ? "slab-light.html" : "slab.html";
writeFileSync(join(HERE, file), html);
console.log("wrote", file, `· ${items.length} sorted items · q ${T.Q.toFixed(2)} kN/m²`);
