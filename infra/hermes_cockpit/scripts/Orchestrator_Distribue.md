<%*
const sources = await tp.system.prompt("Liste des Vaults sources (séparés par ;) ex: ../VaultA;../VaultB");
const list = sources.split(";").map(s=>s.trim());
const target = "Core/";
let report = [];

for (const src of list) {
  const files = app.vault.getMarkdownFiles().filter(f => f.path.startsWith(src));
  for (const file of files) {
    const rel = file.path.replace(src, "");
    const dest = target + rel;

    const content = await app.vault.read(file);
    const existing = app.vault.getAbstractFileByPath(dest);

    if (!existing) {
      await app.vault.create(dest, content);
      report.push(`➕ Copié depuis ${src} : ${rel}`);
    } else {
      await app.vault.modify(existing, content);
      report.push(`🔄 Mis à jour depuis ${src} : ${rel}`);
    }
  }
}

await app.vault.create("Logs/Distributed_Orchestration.md", report.join("\n"));

tR += "✔️ Orchestration distribuée terminée.";
%>
