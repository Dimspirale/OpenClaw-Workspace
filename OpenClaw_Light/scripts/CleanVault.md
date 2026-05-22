<%*
const validTags = [
  "prio/haute", "prio/moyenne", "prio/basse",
  "type/dev", "type/doc", "type/test", "type/ia",
  "semaine/en_cours", "semaine/prochaine", "semaine/attente",
  "module/simulation", "module/diagnostic", "module/showcontrol",
  "module/artistique", "module/reseau", "module/rigging",
  "module/electricite", "module/dmx", "module/hf",
  "module/policies", "module/versioning"
];

const coreFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Core/"));

for (const file of coreFiles) {
    let content = await app.vault.read(file);

    // Ajouter status si absent
    if (!content.match(/^status:/m)) {
        content = content.replace(/^---([\s\S]*?)---/, (match, yaml) => {
            return `---${yaml}\nstatus: backlog\n---`;
        });
    }

    // Nettoyer tags morts
    content = content.replace(/tags:\s*

\[([^\]

]*)\]

/, (match, list) => {
        const tags = list.split(",").map(t => t.trim());
        const cleaned = tags.filter(t => validTags.some(v => t.includes(v)));
        return `tags: [${cleaned.join(", ")}]`;
    });

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

tR += "✔️ Nettoyage complet effectué : status, tags, footers, cohérence.";
%>
