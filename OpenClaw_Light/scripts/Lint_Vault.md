<%*
const pages = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Core/"));
let report = [];

for (const file of pages) {
  const content = await app.vault.read(file);

  if (!content.match(/^---/)) report.push(`❌ Pas de frontmatter : ${file.path}`);
  if (!content.match(/^status:/m)) report.push(`❌ Pas de status : ${file.path}`);
  if (!content.includes("tags:")) report.push(`❌ Pas de tags : ${file.path}`);
  if (!content.includes("# 🔗 Navigation rapide")) report.push(`❌ Pas de footer : ${file.path}`);
  if (content.length < 150) report.push(`⚠️ Trop court : ${file.path}`);

  // Cohérence module / tags
  const folder = file.path.toLowerCase();
  if (folder.includes("simulation") && !content.includes("module/simulation"))
    report.push(`⚠️ Tag module manquant : ${file.path}`);
}

const log = `# 🧪 Rapport de linting

${report.map(r => "- " + r).join("\n") || "✔️ Aucun problème détecté"}
`;

await app.vault.create("Logs/Lint_Report.md", log);

tR += "✔️ Linting terminé. Rapport généré.";
%>
