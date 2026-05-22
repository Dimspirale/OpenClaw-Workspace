<%*
const pages = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Core/"));
let report = [];

function normalizeName(name) {
  return name
    .replace(/ /g, "_")
    .replace(/[^\w\-]/g, "")
    .toLowerCase();
}

// Construire une map des noms actuels
let nameMap = {};
for (const file of pages) {
  const newName = normalizeName(file.name.replace(".md","")) + ".md";
  nameMap[file.name] = newName;
}

for (const file of pages) {
  let content = await app.vault.read(file);
  let updated = content;

  for (const oldName in nameMap) {
    const newName = nameMap[oldName];
    if (oldName != newName && content.includes(`[[${oldName}]]`)) {
      updated = updated.replaceAll(`[[${oldName}]]`, `[[${newName}]]`);
      report.push(`Lien mis à jour dans ${file.path} : ${oldName} → ${newName}`);
    }
  }

  if (updated != content) {
    await app.vault.modify(file, updated);
  }
}

const log = `# 🔗 Rapport de refactor des liens

${report.map(r => "- " + r).join("\n") || "✔️ Aucun lien à mettre à jour"}
`;

await app.vault.create("Logs/Refactor_Links_Report.md", log);

tR += "✔️ Refactor des liens terminé.";
%>
