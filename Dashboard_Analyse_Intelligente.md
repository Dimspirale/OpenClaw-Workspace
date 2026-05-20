# 🧠 Analyse intelligente — OpenClaw Light

```dataviewjs
const pages = dv.pages('"Core"');

function analyse(p) {
  let issues = [];

  if (!p.status) issues.push("❗ Pas de status");
  if (p.status == "en_cours" && !p.file.tags?.includes("semaine/en_cours"))
    issues.push("⚠️ En cours mais pas dans le planning");
  if (p.status == "a_valider" && !p.file.tags?.includes("check/a_valider"))
    issues.push("🔍 À valider mais pas taggé");
  if (p.file.tags?.includes("prio/haute") && p.status == "backlog")
    issues.push("🔥 Prio haute mais en backlog");

  return issues.join(", ");
}

let rows = [];

pages.forEach(p => {
  const issues = analyse(p);
  if (issues.length > 0) {
    rows.push([p.file.link, p.status, issues]);
  }
});

dv.table(["Fichier", "Statut", "Problèmes détectés"], rows);
```
