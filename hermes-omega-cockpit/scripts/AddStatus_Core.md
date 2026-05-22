<%*
const folder = "Core";
const files = app.vault.getFiles().filter(f => f.path.startsWith(folder));

for (const f of files) {
    let content = await app.vault.read(f);

    if (!content.startsWith("---")) {
        const updated = "---\nstatus: backlog\n---\n" + content;
        await app.vault.modify(f, updated);
        tR += "Status ajouté : " + f.path + "\n";
    } else if (!content.includes("status:")) {
        const updated = content.replace("---", "---\nstatus: backlog");
        await app.vault.modify(f, updated);
        tR += "Status ajouté dans frontmatter : " + f.path + "\n";
    } else {
        tR += "Déjà présent : " + f.path + "\n";
    }
}
%>
