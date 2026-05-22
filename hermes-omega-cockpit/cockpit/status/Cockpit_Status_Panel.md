---
tags:
  - cockpit
  - status
  - monitoring
---

# 🛠️ COCKPIT_STATUS_PANEL — OpenClaw_Light
> Monitoring cockpit dynamique — version assemblée, monolithique, PRO, zéro pollution

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

// CORE_FILES_INTEGRITY
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

// COCKPIT_ACTIVITY_LOG
const recent = dv.pages('"OpenClaw_Light/COCKPIT"')
  .sort(p => p.file.mtime, "desc")
  .limit(10)
  .map(p => [p.file.name, p.file.folder, p.file.mtime]);
dv.table(["Fichier", "Dossier", "Modifié"], recent);

// LINK_INTEGRITY_SCAN
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

// COCKPIT_STRUCTURE_CHECK
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

// ERA_MODULE_GAPS
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

// COCKPIT_PROGRESS
const totalModules = 22 + (51 - 17 + 1);
const existing = pagesAll.where(p => p.file.folder.includes("COCKPIT")).length;
const percent = Math.min(100, Math.round((existing / totalModules) * 100));
dv.paragraph(`**Progression cockpit : ${percent}%**`);

// NAVIGATION_HUB
dv.paragraph("[[Index_Cockpit]] · [[Index_Cockpit_Auto]] · [[Plan_Fusion_4_Eres]] · [[Cockpit_Architecture_A1-A22_V17-V∴]] · [[Schema_Global_Arborescence]] · [[Carte_Mentale_Cockpit]] · [[Dashboard_ERA_Modules_Outils]]");
