<%*
const pages = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Core/"));
let report = [];

function normalizeName(name) {
  return name
    .replace(/ /g, "_")
    .replace(/[^\w\-]/g, "")
    .toLowerCase();
}

for (const file of pages) {
  let content = await app.vault.read(file);
  let updated = content;

  // Ajouter status si absent
  if (!content.match(/^status:/m)) {
    updated = updated.replace(/^---([\s\S]*?)---/, (m,y) => `---${y}\nstatus: backlog\n---`);
    report.push(`Status ajouté : ${file.path}`);
  }

  // Ajouter footer si absent
  if (!content.includes("# 🔗 Navigation rapide")) {
    updated += `

---

# 🔗 Navigation rapide
- [[Home]]
- [[Dashboard_OpenClaw]]
- [[Kanban_Master]]
`;
    report.push(`Footer ajouté : ${file.path}`);
  }

  // Renommer fichier
  const newName = normalizeName(file.name.replace(".md","")) + ".md";
  if (newName != file.name) {
    await app.vault.rename(file, file.parent.path + "/" + newName);
    report.push(`Renommé : ${file.name} → ${newName}`);
  }

  // Écrire modifications
  if (updated != content) {
    await app.vault.modify(file, updated);
  }
}

const log = `# 🛠️ Rapport de migration

${report.map(r => "- " + r).join("\n")}`;

await app.vault.create("Logs/Migration_Report.md", log);

tR += "✔️ Migration complète effectuée.";
%>
