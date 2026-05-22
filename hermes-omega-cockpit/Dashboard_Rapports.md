# 📝 Générateur de rapports — OpenClaw Light

Clique sur le bouton pour générer un rapport complet.

```button
name Générer un rapport complet
type command
action Templater: Run script Generate_Report
```

---

## Script associé : `/Scripts/Generate_Report.md`

```markdown
<%*
const now = tp.date.now("YYYY-MM-DD_HH-mm");
const file = `Rapports/Rapport_${now}.md`;

const pages = dv.pages('"Core"');

const total = pages.length;
const done = pages.filter(p => p.status == "termine").length;
const percent = total > 0 ? Math.round((done / total) * 100) : 0;

const content = `# 📄 Rapport OpenClaw Light — ${now}

## 📊 KPIs
- Total fichiers : ${total}
- Terminés : ${done}
- Progression : ${percent}%

---

## ⚠️ Risques
${pages.filter(p => p.file.tags?.includes("prio/haute")).map(p => "- " + p.file.link).join("\n") || "Aucun"}

---

## 🔍 Anomalies
${pages.filter(p => !p.status || !p.file.tags).map(p => "- " + p.file.link).join("\n") || "Aucune"}

---

## 🎯 Priorités
${pages.filter(p => p.file.tags?.includes("prio/haute")).map(p => "- " + p.file.link).join("\n") || "Aucune"}

---

## 🧮 Charge
${pages.filter(p => p.status != "termine").length} tâches actives

---

## 📝 Résumé global
${pages.map(p => `### ${p.file.name}\n${p.file.content.split("\n").slice(0,3).join(" ")}...`).join("\n\n")}
`;

await app.vault.create(file, content);

tR += `✔️ Rapport généré : ${file}`;
%>
```
