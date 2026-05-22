<%*
const file = tp.file;
let content = await tp.file.read();
let updated = content;

// Améliorer les titres
updated = updated.replace(/^# /gm, "# ");
updated = updated.replace(/^## /gm, "## ");
updated = updated.replace(/^### /gm, "### ");

// Ajouter introduction si absente
if (!updated.includes("## 🎯 Objectif")) {
  updated = updated.replace(/# .*\n/, match => `${match}\n## 🎯 Objectif\nDécrire ici l’objectif du document.\n\n`);
}

// Enrichir sections trop courtes
updated = updated.replace(/## .*?\n([^\n]{0,80})\n/g, (m, section) => {
  return m.replace(section, section + "\n\nAjouter détails supplémentaires ici.");
});

// Standardiser listes
updated = updated.replace(/^- /gm, "- ");

// Ajouter footer si absent
if (!updated.includes("# 🔗 Navigation rapide")) {
  updated += `

---

# 🔗 Navigation rapide
- [[Home]]
- [[Dashboard_OpenClaw]]
- [[Kanban_Master]]
`;
}

await tp.file.write(updated);

tR += "✔️ Contenu refactorisé.";
%>
