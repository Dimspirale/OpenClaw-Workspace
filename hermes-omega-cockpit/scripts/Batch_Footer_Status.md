<%*
const coreFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Core/"));

for (const file of coreFiles) {
    let content = await app.vault.read(file);

    // Ajouter status si absent
    if (!content.match(/^status:/m)) {
        content = content.replace(/^---([\s\S]*?)---/, (match, yaml) => {
            return `---${yaml}\nstatus: backlog\n---`;
        });
    }

    // Ajouter footer si absent
    if (!content.includes("# 🔗 Navigation rapide")) {
        content += `

---

# 🔗 Navigation rapide
- [[Home]]
- [[Kanban_Master]]
- [[Kanban_Automatique]]
- [[Dashboard_OpenClaw]]
`;
    }

    await app.vault.modify(file, content);
}

tR += "✔️ Footers + status ajoutés automatiquement à tous les fichiers du dossier /Core/";
%>
