---
id: A-23
module: Cockpit_Status_Panel
version: v∞.Ω
tags:
  - cockpit
  - module
  - status
  - hud
  - pack_ui_pro
---

# 🛠️ A‑23 — COCKPIT STATUS PANEL  
> Module cockpit officiel — HUD dynamique, auto‑réactif, PACK UI PRO v∞.Ω  
> Rôle : Synthèse vivante de l’état du cockpit (CORE + HUD + FX + AI)

<style>
/* ============================================================
   A‑23 — PACK UI PRO v∞.Ω — ANIMATIONS COCKPIT (monolithique)
   ============================================================ */

.a23-breath { animation: a23Breath 6s ease-in-out infinite; }
@keyframes a23Breath {
  0% { opacity: .85; filter: drop-shadow(0 0 2px var(--color-accent)); }
  50% { opacity: 1; filter: drop-shadow(0 0 6px var(--color-accent)); }
  100% { opacity: .85; filter: drop-shadow(0 0 2px var(--color-accent)); }
}

.a23-section {
  font-weight: 700;
  font-size: 1.2em;
  color: var(--color-accent);
  animation: a23Pulse 3s ease-in-out infinite;
}
@keyframes a23Pulse {
  0% { transform: scale(1); opacity: .9; }
  50% { transform: scale(1.03); opacity: 1; }
  100% { transform: scale(1); opacity: .9; }
}

.a23-table table {
  border-radius: 8px;
  overflow: hidden;
  animation: a23Breath 8s ease-in-out infinite;
}
.a23-table th {
  background: var(--color-accent);
  color: white;
  text-transform: uppercase;
}
.a23-table td {
  backdrop-filter: blur(4px);
}
</style>

<div class="a23-breath">

```dataviewjs
// ============================================================
// A‑23 — COCKPIT STATUS PANEL (monolithique)
// ============================================================

// --- 1. OVERVIEW -------------------------------------------------
const files = dv.pages('"OpenClaw_Light"').where(p => p.file.name.endsWith(".md"));
dv.header(3, "🔵 OVERVIEW");
dv.table(["ÉLÉMENT", "VALEUR"], [
  ["Total fichiers cockpit", files.length],
  ["Dernière mise à jour", new Date().toLocaleString()],
  ["Fichiers CORE", files.where(f => f.file.folder.includes("CORE")).length],
  ["Fichiers COCKPIT", files.where(f => f.file.folder.includes("COCKPIT")).length],
  ["Fichiers FX/AI", files.where(f => f.file.folder.includes("FX") || f.file.folder.includes("AI")).length],
]);

// --- 2. CORE FILES INTEGRITY -------------------------------------
dv.header(3, "🟢 CORE FILES INTEGRITY");
const essential = [
  "Plan_Fusion_4_Eres.md",
  "Cockpit_Architecture_A1-A22_V17-V∴.md",
  "Schema_Global_Arborescence.md",
  "Carte_Mentale_Cockpit.md",
  "Dashboard_ERA_Modules_Outils.md",
  "Index_Cockpit.md",
  "Index_Cockpit_Auto.md"
];
dv.table(["Fichier", "État"], essential.map(f => {
  const exists = dv.page(`"OpenClaw_Light/${f}"`);
  return [f, exists ? "🟢 OK" : "🔴 Manquant"];
}));

// --- 3. ACTIVITY LOG ---------------------------------------------
dv.header(3, "🟡 ACTIVITY LOG");
const recent = dv.pages('"OpenClaw_Light/COCKPIT"')
  .sort(p => p.file.mtime, "desc")
  .limit(10)
  .map(p => [p.file.name, p.file.folder, p.file.mtime]);
dv.table(["Fichier", "Dossier", "Modifié"], recent);

// --- 4. LINK INTEGRITY -------------------------------------------
dv.header(3, "🟣 LINK INTEGRITY");
let broken = [];
for (let p of files) {
  const links = p.file.inlinks.concat(p.file.outlinks);
  for (let l of links) {
    if (!app.metadataCache.getFirstLinkpathDest(l.path, p.file.path)) {
      broken.push([p.file.name, l.path]);
    }
  }
}
dv.table(["Fichier", "Lien cassé"], broken);

// --- 5. STRUCTURE CHECK (A1–A22 / V17–V∴) ------------------------
dv.header(3, "🟠 STRUCTURE CHECK");
const cockpit = dv.page('"OpenClaw_Light/COCKPIT/Structure/Cockpit_Architecture_A1-A22_V17-V∴"');
if (cockpit) {
  const lines = cockpit.file.content.split("\n");
  dv.table(["Section", "Nombre"], [
    ["A1–A22", lines.filter(l => l.trim().startsWith("A")).length],
    ["V17–V∴", lines.filter(l => l.trim().startsWith("V")).length]
  ]);
} else {
  dv.paragraph("⚠️ Fichier structure introuvable.");
}

// --- 6. ERA MODULE GAPS ------------------------------------------
dv.header(3, "🔴 ERA MODULE GAPS");
const expected = {
  "ERA I": ["Architecture", "Pipelines", "États", "Modules", "Protocoles"],
  "ERA II": ["Plan", "Rigging", "Lumière", "Patch", "Console", "Prévisualisation", "Photométrie"],
  "ERA III": ["Monitoring", "Diagnostics", "Réseau", "Vidéo", "Mapping", "Overlays", "Alert Engine"],
  "ERA IV": ["Agents", "Analyse", "Génération", "Auto", "API", "Intégration"]
};
let missing = [];
for (let era in expected) {
  for (let m of expected[era]) {
    const found = files.where(p => p.file.name.toLowerCase().includes(m.toLowerCase())).length > 0;
    if (!found) missing.push([era, m]);
  }
}
dv.table(["Ère", "Module manquant"], missing);

// --- 7. PROGRESS --------------------------------------------------
dv.header(3, "🟩 PROGRESS");
const totalModules = 22 + (51 - 17 + 1);
const existing = files.where(p => p.file.folder.includes("COCKPIT")).length;
dv.paragraph(`**Progression cockpit : ${Math.round((existing / totalModules) * 100)}%**`);

// --- 8. NAVIGATION ------------------------------------------------
dv.header(3, "🧭 NAVIGATION");
dv.paragraph("[[Index_Cockpit]] · [[Index_Cockpit_Auto]] · [[Plan_Fusion_4_Eres]] · [[Cockpit_Architecture_A1-A22_V17-V∴]] · [[Schema_Global_Arborescence]] · [[Carte_Mentale_Cockpit]] · [[Dashboard_ERA_Modules_Outils]]");
