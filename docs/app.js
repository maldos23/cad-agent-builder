import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import htm from "htm";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, useTranslation } from "react-i18next";
import {
  Theme, Container, Flex, Box, Grid, Heading, Text, Badge, Button, Card,
  Tabs, Select, Code, Tooltip, Link, Separator,
} from "@radix-ui/themes";

const html = htm.bind(React.createElement);
const LANGS = { en: "English", es: "Español", zh: "中文", ja: "日本語" };
const REPO = "https://github.com/maldos23/cad-agent-builder";
const RAW = "https://raw.githubusercontent.com/maldos23/cad-agent-builder/main/platforms/instructions.md";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

// --- i18n: ?lng= → localStorage → navigator.language → en
const resources = Object.fromEntries(await Promise.all(Object.keys(LANGS).map(async (l) =>
  [l, { translation: await (await fetch(`locales/${l}.json`)).json() }])));
await i18n.use(LanguageDetector).use(initReactI18next).init({
  resources, fallbackLng: "en", supportedLngs: Object.keys(LANGS), nonExplicitSupportedLngs: true, load: "languageOnly",
  detection: { order: ["querystring", "localStorage", "navigator"], lookupQuerystring: "lng", caches: ["localStorage"] },
  interpolation: { escapeValue: false },
});
const lang = () => (i18n.resolvedLanguage || "en");

// --- install commands (same as README.md)
const CLONE = "git clone https://github.com/maldos23/cad-agent-builder.git\ncd cad-agent-builder";
const HOSTS = [
  ["all", "∗", `${CLONE}\n./install.sh`],
  ["claude", "Claude Code", "/plugin marketplace add maldos23/cad-agent-builder\n/plugin install cad-agent-builder@cad-agent-builder\n\n# or manual\n./install.sh claude"],
  ["codex", "Codex", "./install.sh agents   # -> ~/.agents/skills/design-lifecycle"],
  ["gemini", "Gemini CLI", "./install.sh agents   # -> ~/.agents/skills/design-lifecycle"],
  ["opencode", "OpenCode", "./install.sh agents   # -> ~/.agents/skills/design-lifecycle"],
  ["hermes", "Hermes", "./install.sh hermes   # -> ~/.hermes/skills/design-lifecycle"],
  ["chatgpt", "ChatGPT", "curl -LO https://github.com/maldos23/cad-agent-builder/releases/latest/download/design-lifecycle.zip"],
  ["cursor", "Cursor", `mkdir -p .cursor/rules\nprintf -- '---\\ndescription: Design lifecycle for design projects\\nalwaysApply: false\\n---\\n' > .cursor/rules/design-lifecycle.mdc\ncurl -L ${RAW} >> .cursor/rules/design-lifecycle.mdc`],
  ["copilot", "Copilot", `mkdir -p .github\ncurl -L ${RAW} >> .github/copilot-instructions.md`],
  ["agentsmd", "AGENTS.md", `curl -L ${RAW} >> AGENTS.md`],
];

// Reveal-on-scroll: adds .in when visible
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  });
}

function Header() {
  const { t } = useTranslation();
  return html`<header className="top"><${Container} size="4" px="4">
    <${Flex} align="center" justify="between" py="3" gap="3">
      <${Flex} align="center" gap="2"><span className="logo" aria-hidden="true"><i></i><b></b><u></u></span><${Text} weight="bold">cad-agent-builder</${Text}></${Flex}>
      <${Flex} align="center" gap="2">
        <${Select.Root} value=${lang()} onValueChange=${(l) => i18n.changeLanguage(l)}>
          <${Select.Trigger} variant="surface" aria-label=${t("nav.lang")} />
          <${Select.Content}>${Object.entries(LANGS).map(([k, v]) => html`<${Select.Item} key=${k} value=${k}>${v}</${Select.Item}>`)}</${Select.Content}>
        </${Select.Root}>
        <${Button} asChild variant="outline" highContrast><a href=${REPO}>${t("nav.github")}</a></${Button}>
      </${Flex}>
    </${Flex}></${Container}></header>`;
}

function Figure() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [h, setH] = useState(null);
  const src = `figure/slab-light.html?lng=${lang()}`;
  useEffect(() => { ref.current?.contentWindow?.postMessage({ type: "lng", lng: lang() }, "*"); }, [i18n.language]);
  // mismo origen: ajusta la altura del iframe a su contenido
  const fit = () => {
    const d = ref.current?.contentDocument; if (!d?.body) return;
    const sync = () => setH(d.documentElement.scrollHeight);
    sync(); new ResizeObserver(sync).observe(d.body);
  };
  return html`<figure className="fig reveal">
    <iframe ref=${ref} src=${src} title=${t("hero.figcap")} loading="eager" onLoad=${fit} style=${h ? { height: h + "px", aspectRatio: "auto" } : null}></iframe>
    <figcaption><${Text} size="2" color="gray">${t("hero.figcap")}</${Text}></figcaption>
  </figure>`;
}

function Hero() {
  const { t } = useTranslation();
  return html`<section className="hero"><${Container} size="4" px="4">
    <${Flex} direction="column" align="center" gap="4" py="8" className="rise">
      <${Badge} size="2" variant="outline" highContrast>${t("hero.badge")}</${Badge}>
      <${Heading} as="h1" size=${{ initial: "8", md: "9" }} align="center" className="title">${t("hero.title")}</${Heading}>
      <${Text} as="p" size="4" color="gray" align="center" className="lead">${t("hero.sub")}</${Text}>
      <${Flex} gap="3" wrap="wrap" justify="center">
        <${Button} size="3" highContrast asChild><a href="#install">${t("hero.install")}</a></${Button}>
        <${Button} size="3" variant="outline" highContrast asChild><a href=${REPO}>${t("hero.repo")}</a></${Button}>
      </${Flex}>
    </${Flex}>
    <${Figure} />
  </${Container}></section>`;
}

function Cycle() {
  const { t } = useTranslation();
  const phases = t("cycle.phases", { returnObjects: true });
  const [active, setActive] = useState(0);
  useEffect(() => { if (reduced) return; const id = setInterval(() => setActive((a) => (a + 1) % phases.length), 2200); return () => clearInterval(id); }, [phases.length]);
  return html`<section><${Container} size="4" px="4" py="8">
    <${Box} className="reveal" mb="5"><${Heading} as="h2" size="7" mb="2">${t("cycle.title")}</${Heading}><${Text} color="gray" size="3">${t("cycle.sub")}</${Text}></${Box}>
    <div className="ring reveal">
      ${phases.map((p, i) => html`<${Card} key=${i} size="2" className=${"phase" + (i === active ? " on" : "")} onMouseEnter=${() => setActive(i)} style=${{ "--i": i }}>
        <${Flex} align="center" gap="2" mb="2"><span className="num">${i + 1}</span><${Heading} as="h3" size="4">${p.name}</${Heading}></${Flex}>
        <${Text} as="p" size="2" weight="medium" mb="1">${p.q}</${Text}>
        <${Text} as="p" size="2" color="gray">${p.out}</${Text}>
      </${Card}>`)}
      <svg className="loop" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5 H98" /></svg>
    </div>
  </${Container}></section>`;
}

function Features() {
  const { t } = useTranslation();
  const items = t("features.items", { returnObjects: true });
    return html`<section><${Container} size="4" px="4" py="8">
    <${Heading} as="h2" size="7" mb="5" className="reveal">${t("features.title")}</${Heading}>
    <${Grid} columns=${{ initial: "1", sm: "2", md: "3" }} gap="4">
      ${items.map((f, i) => html`<${Card} key=${i} size="3" className="reveal feat wall" style=${{ "--i": i }}>
        <span className=${"glyph g" + (i % 3)} aria-hidden="true"></span>
        <${Heading} as="h3" size="4" mb="2">${f.t}</${Heading}>
        <${Text} as="p" size="2" color="gray">${f.d}</${Text}>
      </${Card}>`)}
    </${Grid}>
  </${Container}></section>`;
}

function CopyBlock({ code }) {
  const { t } = useTranslation();
  const [ok, setOk] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(code); setOk(true); setTimeout(() => setOk(false), 1500); };
  return html`<div className="code"><pre><${Code} variant="ghost" size="2">${code}</${Code}></pre>
    <${Tooltip} content=${ok ? t("install.copied") : t("install.copy")}><${Button} size="1" variant="soft" className="copy" onClick=${copy}>${ok ? "✔" : "⧉"} ${t("install.copy")}</${Button}></${Tooltip}></div>`;
}

function Install() {
  const { t } = useTranslation();
  return html`<section id="install"><${Container} size="4" px="4" py="8">
    <${Box} className="reveal" mb="4"><${Heading} as="h2" size="7" mb="2">${t("install.title")}</${Heading}><${Text} color="gray">${t("install.sub")}</${Text}></${Box}>
    <${Box} className="reveal" mb="4"><${CopyBlock} code=${CLONE} /></${Box}>
    <${Card} size="3" className="reveal"><${Tabs.Root} defaultValue="all">
      <${Tabs.List} className="tabs" wrap="wrap">${HOSTS.map(([k, label]) => html`<${Tabs.Trigger} key=${k} value=${k}>${k === "all" ? t("install.all") : label}</${Tabs.Trigger}>`)}</${Tabs.List}>
      ${HOSTS.map(([k, , code]) => html`<${Tabs.Content} key=${k} value=${k} className="panel">
        <${Text} as="p" size="2" color="gray" my="3">${t("install.notes." + k)}</${Text}>
        <${CopyBlock} code=${code} />
      </${Tabs.Content}>`)}
    </${Tabs.Root}></${Card}>
  </${Container}></section>`;
}

function Footer() {
  const { t } = useTranslation();
  return html`<footer><${Container} size="4" px="4" py="6"><${Separator} size="4" mb="4" />
    <${Flex} justify="between" wrap="wrap" gap="3">
      <${Text} size="2" color="gray">${t("footer.made")}</${Text}>
      <${Flex} gap="4"><${Link} href=${REPO} size="2">${t("nav.github")}</${Link}><${Link} href=${REPO + "/releases/latest"} size="2">${t("nav.release")}</${Link}><${Text} size="2" color="gray">${t("footer.license")}</${Text}></${Flex}>
    </${Flex}></${Container}></footer>`;
}

function App() {
  const { t, i18n: i } = useTranslation();
  useEffect(() => { document.documentElement.lang = lang(); document.title = t("meta.title"); }, [i.language]);
  useReveal();
  return html`<${Theme} appearance="light" accentColor="gray" grayColor="gray" radius="none" panelBackground="solid">
    <${Header} /><div className="band" aria-hidden="true"></div><main><${Hero} /><${Cycle} /><div className="band" aria-hidden="true"></div><${Features} /><${Install} /></main><div className="band" aria-hidden="true"></div><${Footer} />
  </${Theme}>`;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
