<%*
const now = tp.date.now("YYYY-MM-DD_HH-mm");
const buildFile = `Builds/Build_${now}.md`;

const pages = dv.pages('"Core"');

const total = pages.length;
const done = pages.filter(p => p.status == "termine").length;
const percent = total > 0 ? Math.round((done / total) * 100) : 0;

const critical = pages.filter(p => p.file.tags?.includes("prio/haute")).length;
const toValidate = pages.filter(p => p.status == "a_valider").length;

const content = `# 🏗️ Build OpenClaw Light — ${now}

## 📊 KPIs
- Total fichiers : ${total}
- Terminés : ${done}
- Progression : ${percent}%
- Critiques : ${critical}
- À valider : ${toValidate}

---

## 🧩 Modules
${[...new Set(pages.map(p => p.file.folder.split("/")[1]))].join("\n")}

---

## ⚠️ Risques
${pages.filter(p => p.file.tags?.includes("prio/haute")).map(p => "- " + p.file.link).join("\n") || "Aucun"}

---

## 🔍 Anomalies
${pages.filter(p => !p.status || !p.file.tags).map(p => "- " + p.file.link).join("\n") || "Aucune"}

---

## 🧪 Qualité
- Sans status : ${pages.filter(p => !p.status).length}
- Sans tags : ${pages.filter(p => !p.file.tags).length}
- Sans footer : ${pages.filter(p => !p.file.content.includes("# 🔗 Navigation rapide")).length}

---

## ✍️ Auteur
Dimitri

`;

await app.vault.create(buildFile, content);

tR += `✔️ Build généré : ${buildFile}`;
%>
