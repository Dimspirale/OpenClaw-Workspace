<%*
const now = tp.date.now("YYYY-MM-DD_HH-mm");
const file = `Roadmaps/Roadmap_${now}.md`;

const pages = dv.pages('"Core"');

const modules = [...new Set(pages.map(p => p.file.folder.split("/")[1]))];

let roadmap = `# 🗺️ Roadmap OpenClaw Light — ${now}

`;

modules.forEach(mod => {
  const files = pages.filter(p => p.file.folder.includes(mod));
  const backlog = files.filter(p => p.status == "backlog");
  const inProgress = files.filter(p => p.status == "en_cours");
  const toValidate = files.filter(p => p.status == "a_valider");
  const done = files.filter(p => p.status == "termine");

  roadmap += `
## 📦 Module : ${mod}

- Backlog : ${backlog.length}
- En cours : ${inProgress.length}
- À valider : ${toValidate.length}
- Terminé : ${done.length}

### 🔥 Priorités
${files.filter(p => p.file.tags?.includes("prio/haute")).map(p => "- " + p.file.link).join("\n") || "Aucune"}

### 🎯 Prochaines actions
${inProgress.map(p => "- Continuer : " + p.file.link).join("\n") || "- Rien en cours"}

### 🧮 ETA estimé
${Math.round((files.length - done.length) / (inProgress.length * 0.5 + 1))} jours

---
`;
});

await app.vault.create(file, roadmap);

tR += "✔️ Roadmap générée.";
%>
