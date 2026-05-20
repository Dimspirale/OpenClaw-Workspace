<%*
const name = await tp.system.prompt("Nom du module à générer (ex: Simulation)");
const folder = `Core/${name}/`;

await app.vault.createFolder(folder).catch(()=>{});

const files = [
  "Overview.md",
  "Architecture.md",
  "Fonctionnement.md",
  "API.md",
  "Tests.md",
  "Changelog.md"
];

for (const f of files) {
  const path = folder + f;
  const content = `---
status: backlog
tags: [module/${name.toLowerCase()}, type/doc]
---

# ${name} — ${f.replace(".md","")}

## 🎯 Objectif
Décrire ici l’objectif de cette section.

## 🧩 Contenu
Ajouter le contenu technique.

---

# 🔗 Navigation rapide
- [[Home]]
- [[Dashboard_OpenClaw]]
- [[Kanban_Master]]
`;
  await app.vault.create(path, content);
}

const index = `# 📦 Module ${name}

## Fichiers
${files.map(f => "- [[" + name + "/" + f + "]]").join("\n")}

## Schéma

\`\`\`mermaid
flowchart TD
  A[Entrée] --> B[${name}]
  B --> C[Sortie]
\`\`\`
`;

await app.vault.create(folder + "Index.md", index);

tR += "✔️ Module généré.";
%>
