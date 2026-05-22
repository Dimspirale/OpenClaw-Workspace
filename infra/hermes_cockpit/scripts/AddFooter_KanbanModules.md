<%*
const folder = "Core";
const footer = "\n\n---\n\n# 🔗 Navigation rapide\n- [[Home]]\n- [[Kanban_Master]]\n- [[Kanban_Automatique]]\n- [[Core/README]]\n- [[Core/OpenClaw_Light_PRD_v5.2]]\n";

const files = app.vault.getFiles().filter(f =>
    f.path.startsWith(folder) && f.basename.startsWith("Kanban_")
);

for (const f of files) {
    let content = await app.vault.read(f);

    if (!content.includes("# 🔗 Navigation rapide")) {
        await app.vault.modify(f, content + footer);
        tR += "Footer ajouté : " + f.path + "\n";
    } else {
        tR += "Déjà présent : " + f.path + "\n";
    }
}
%>
