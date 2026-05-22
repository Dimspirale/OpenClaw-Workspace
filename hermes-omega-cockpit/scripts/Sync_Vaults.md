<%*
const source = await tp.system.prompt("Chemin du Vault source (ex: ../OpenClaw_Master)");
const target = "Core/";

let report = [];

const sourceFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith(source));
const targetFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith(target));

for (const file of sourceFiles) {
  const relative = file.path.replace(source, "");
  const targetPath = target + relative;

  const content = await app.vault.read(file);

  const existing = app.vault.getAbstractFileByPath(targetPath);

  if (!existing) {
    await app.vault.create(targetPath, content);
    report.push(`➕ Copié : ${relative}`);
  } else {
    await app.vault.modify(existing, content);
    report.push(`🔄 Mis à jour : ${relative}`);
  }
}

const log = `# 🔁 Rapport de synchronisation

${report.map(r => "- " + r).join("\n")}
`;

await app.vault.create("Logs/Sync_Report.md", log);

tR += "✔️ Synchronisation terminée.";
%>
