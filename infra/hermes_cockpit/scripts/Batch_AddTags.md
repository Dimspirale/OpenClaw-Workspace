<%*
const coreFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Core/"));

for (const file of coreFiles) {
    await tp.user.AddTags_Core(file.path);
    await tp.user.AddModuleTags(file.path);
}

tR += "✔️ Tags appliqués automatiquement à tous les fichiers du dossier /Core/";
%>
