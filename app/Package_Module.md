
<%*
const module = await tp.system.prompt("Nom du module à packager (ex: Simulation)");
const now = tp.date.now("YYYY-MM-DD_HH-mm");
const folder = `Packages/${module}_${now}/`;

await app.vault.createFolder(folder).catch(()=>{});

const pages = dv.pages('"Core"').filter(p => p.file.folder.toLowerCase().includes(module.toLowerCase()));

let index = `# 📦 Package ${module} — ${now}

## Contenu
${pages.map(p => "- " + p.file.link).join("\n")}

---

## Résumé global
${pages.map(p => `### ${p.file.name}\n${p.file.content.split("\n").slice(0,3).join(" ")}...`).join("\n\n")}
`;

await app.vault.create(folder + "INDEX.md", index);

// Copier les fichiers
for (const p of pages) {
  const content = await app.vault.read(p.file);
  await app.vault.create(folder + p.file.name, content);
}

tR += `✔️ Package généré dans ${folder}`;
%>
