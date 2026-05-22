<%*
const logFile = "Logs/Changelog.md";
const file = tp.file;
const now = tp.date.now("YYYY-MM-DD HH:mm");
const path = file.path;

const oldContent = await app.vault.read(file);
await tp.file.save(); // force save
const newContent = await app.vault.read(file);

// Diff simple ligne par ligne
function diff(oldText, newText) {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");

  let changes = [];

  newLines.forEach((line, i) => {
    if (!oldLines.includes(line)) changes.push(`➕ ${line}`);
  });

  oldLines.forEach((line, i) => {
    if (!newLines.includes(line)) changes.push(`➖ ${line}`);
  });

  return changes.join("\n");
}

const changes = diff(oldContent, newContent);

const entry = `
## ${now}
### Fichier : [[${path}]]

\`\`\`diff
${changes}
\`\`\`

---
`;

await app.vault.append(await app.vault.getAbstractFileByPath(logFile), entry);

tR += "✔️ Versioning mis à jour dans Changelog.md";
%>
