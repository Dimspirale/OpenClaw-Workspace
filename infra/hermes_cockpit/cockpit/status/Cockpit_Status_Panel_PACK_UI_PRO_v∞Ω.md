---
tags:
  - cockpit
  - status
  - monitoring
  - pack_ui_pro
  - animations
---

# 🛠️ COCKPIT_STATUS_PANEL — PACK UI PRO v∞.Ω  
> Version animée, organique, auto‑réactive — cockpit‑grade  
> Influence globale : PACK UI PRO v∞.Ω (champ harmonique, pulsation, cohérence dynamique)

<style>
/* ============================================================
   PACK UI PRO v∞.Ω — ANIMATIONS COCKPIT (version monolithique)
   ============================================================ */

/* --- Global breathing field --- */
.cockpit-breath {
  animation: cockpitBreath 6s ease-in-out infinite;
  transform-origin: center;
}
@keyframes cockpitBreath {
  0%   { opacity: 0.85; filter: drop-shadow(0 0 2px var(--color-accent)); }
  50%  { opacity: 1;    filter: drop-shadow(0 0 6px var(--color-accent)); }
  100% { opacity: 0.85; filter: drop-shadow(0 0 2px var(--color-accent)); }
}

/* --- Intelligent pulse --- */
.cockpit-pulse {
  animation: cockpitPulse 2.4s cubic-bezier(.4,0,.2,1) infinite;
}
@keyframes cockpitPulse {
  0%   { transform: scale(1);   opacity: 0.9; }
  50%  { transform: scale(1.03); opacity: 1; }
  100% { transform: scale(1);   opacity: 0.9; }
}

/* --- Hover cinematic --- */
.cockpit-hover:hover {
  transform: translateY(-2px) scale(1.01);
  transition: 0.25s ease;
  filter: brightness(1.15);
}

/* --- Table styling --- */
.cockpit-table table {
  border-radius: 8px;
  overflow: hidden;
  animation: cockpitBreath 8s ease-in-out infinite;
}
.cockpit-table th {
  background: var(--color-accent);
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.cockpit-table td {
  backdrop-filter: blur(4px);
}

/* --- Section headers --- */
.cockpit-section {
  padding: 6px 0;
  font-weight: 700;
  font-size: 1.2em;
  color: var(--color-accent);
  animation: cockpitPulse 3s ease-in-out infinite;
}
</style>

<div class="cockpit-breath">

## 🔵 COCKPIT_OVERVIEW
```dataviewjs
const files = dv.pages('"OpenClaw_Light"').where(p => p.file.name.endsWith(".md"));
const overview = [
  ["Total fichiers cockpit", files.length],
  ["Dernière mise à jour", new Date().toLocaleString()],
  ["Fichiers CORE", files.where(f => f.file.folder.includes("CORE")).length],
  ["Fichiers COCKPIT", files.where(f => f.file.folder.includes("COCKPIT")).length],
  ["Fichiers FX/AI", files.where(f => f.file.folder.includes("FX") || f.file.folder.includes("AI")).length],
];
dv.table(["ÉLÉMENT", "VALEUR"], overview);
const essential = [
  "Plan_Fusion_4_Eres.md",
  "Cockpit_Architecture_A1-A22_V17-V∴.md",
  "Schema_Global_Arborescence.md",
  "Carte_Mentale_Cockpit.md",
  "Dashboard_ERA_Modules_Outils.md",
  "Index_Cockpit.md",
  "Index_Cockpit_Auto.md"
];
const integrity = essential.map(f => {
  const exists = dv.page(`"OpenClaw_Light/${f}"`);
  return [f, exists ? "🟢 OK" : "🔴 Manquant"];
});
dv.table(["Fichier", "État"], integrity);
const recent = dv.pages('"OpenClaw_Light/COCKPIT"')
  .sort(p => p.file.mtime, "desc")
  .limit(10)
  .map(p => [p.file.name, p.file.folder, p.file.mtime]);
dv.table(["Fichier", "Dossier", "Modifié"], recent);
const pagesAll = dv.pages('"OpenClaw_Light"');
let broken = [];
for (let p of pagesAll) {
  const links = p.file.inlinks.concat(p.file.outlinks);
  for (let l of links) {
    if (!app.metadataCache.getFirstLinkpathDest(l.path, p.file.path)) {
      broken.push([p.file.name, l.path]);
    }
  }
}
dv.table(["Fichier", "Lien cassé"], broken);
const cockpit = dv.page('"OpenClaw_Light/COCKPIT/Structure/Cockpit_Architecture_A1-A22_V17-V∴"');
if (cockpit) {
  const lines = cockpit.file.content.split("\n");
  const A = lines.filter(l => l.trim().startsWith("A")).length;
  const V = lines.filter(l => l.trim().startsWith("V")).length;
  dv.table(["Section", "Nombre"], [
    ["A1–A22 (CORE cockpit)", A],
    ["V17–V∴ (Vision cockpit)", V]
  ]);
} else {
  dv.paragraph("⚠️ Fichier Cockpit_Architecture_A1-A22_V17-V∴ introuvable.");
}
const expected = {
  "ERA I": ["Architecture", "Pipelines", "États", "Modules", "Protocoles"],
  "ERA II": ["Plan", "Rigging", "Lumière", "Patch", "Console", "Prévisualisation", "Photométrie"],
  "ERA III": ["Monitoring", "Diagnostics", "Réseau", "Vidéo", "Mapping", "Overlays", "Alert Engine"],
  "ERA IV": ["Agents", "Analyse", "Génération", "Auto", "API", "Intégration"]
};
let missing = [];
for (let era in expected) {
  for (let m of expected[era]) {
    const found = pagesAll.where(p => p.file.name.toLowerCase().includes(m.toLowerCase())).length > 0;
    if (!found) missing.push([era, m]);
  }
}
dv.table(["Ère", "Module manquant"], missing);
const totalModules = 22 + (51 - 17 + 1);
const existing = pagesAll.where(p => p.file.folder.includes("COCKPIT")).length;
const percent = Math.min(100, Math.round((existing / totalModules) * 100));
dv.paragraph(`**Progression cockpit : ${percent}%**`);
dv.paragraph("[[Index_Cockpit]] · [[Index_Cockpit_Auto]] · [[Plan_Fusion_4_Eres]] · [[Cockpit_Architecture_A1-A22_V17-V∴]] · [[Schema_Global_Arborescence]] · [[Carte_Mentale_Cockpit]] · [[Dashboard_ERA_Modules_Outils]]");
