<%*
const pages = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Core/"));
let report = [];

for (const file of pages) {
  let content = await app.vault.read(file);
  let updated = content;

  // Supprimer sections vides
  updated = updated.replace(/## .*?\n\s*\n/g, "");

  // Normaliser titres
  updated = updated.replace(/^#\s+/gm, "# ");
  updated = updated.replace(/^##\s+/gm, "## ");
  updated = updated.replace(/^###\s+/gm, "### ");

  // Supprimer footers dupliqués
  updated = updated.replace(/# 🔗 Navigation rapide[\s\S]*$/m, "");
  updated += `

---

# 🔗 Navigation rapide
- [[Home]]
- [[Dashboard_OpenClaw]]
- [[Kanban_Master]]
`;

  // Compression automatique si > 3000 caractères
  if (updated.length > 3000) {
    const archivePath = "Archives/" + file.name;
    await app.vault.createFolder("Archives").catch(()=>{});
    await app.vault.create(archivePath, updated);
    updated = updated.substring(0, 1500) + "\n\n… (contenu archivé dans /Archives/)";
    report.push(`📦 Archivé : ${file.path}`);
  }

  if (updated != content) {
    await app.vault.modify(file, updated);
    report.push(`🔧 Optimisé : ${file.path}`);
  }
}

await app.vault.create("Logs/Optimize_Report.md", report.join("\n"));

tR += "✔️ Optimisation complète effectuée.";
%>
