<%*
const name = await tp.system.prompt("Nom du dashboard");
const file = `Dashboards/Dashboard_${name}.md`;

const template = `# 📊 Dashboard — ${name}

## 🔢 KPIs

\`\`\`dataviewjs
const pages = dv.pages('"Core"');
dv.table(
  ["KPI","Valeur"],
  [
    ["Total", pages.length],
    ["En cours", pages.filter(p=>p.status=="en_cours").length],
    ["À valider", pages.filter(p=>p.status=="a_valider").length],
    ["Terminés", pages.filter(p=>p.status=="termine").length]
  ]
);
\`\`\`

---

## 🔥 Risques

\`\`\`dataview
table file.link, file.tags
from "Core"
where contains(file.tags, "prio/haute")
\`\`\`

---

## ⚠️ Anomalies

\`\`\`dataview
table file.link, status
from "Core"
where !status or !file.tags
\`\`\`

---

## 📈 Progression par module

\`\`\`dataviewjs
const modules = [...new Set(pages.map(p=>p.file.folder.split("/")[1]))];
let rows = [];
modules.forEach(m=>{
  const f = pages.filter(p=>p.file.folder.includes(m));
  const done = f.filter(p=>p.status=="termine").length;
  rows.push([m, f.length, done]);
});
dv.table(["Module","Total","Terminé"], rows);
\`\`\`

---

## 🤖 Suggestions IA

\`\`\`dataviewjs
function suggest(p){
  if(!p.status) return "Ajouter un status";
  if(p.status=="backlog" && p.file.tags?.includes("prio/haute")) return "Passer en cours";
  if(p.status=="en_cours" && !p.file.tags?.includes("semaine/en_cours")) return "Ajouter au planning";
  return "";
}
dv.table(["Fichier","Suggestion"], pages.map(p=>[p.file.link, suggest(p)]).filter(r=>r[1]!=""));
\`\`\`

`;

await app.vault.create(file, template);

tR += "✔️ Dashboard généré.";
%>
