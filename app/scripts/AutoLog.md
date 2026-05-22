<%*
const logFile = "Logs/History.md";
const file = tp.file;
const now = tp.date.now("YYYY-MM-DD HH:mm");
const path = file.path;
const content = await tp.file.read();

let module = "inconnu";
const modules = ["Simulation","Diagnostic","ShowControl","Artistique","Réseau","Rigging","Électricité","DMX","HF","Policies","Versioning"];
modules.forEach(m => { if (path.includes(m)) module = m; });

let status = "inconnu";
const match = content.match(/^status:\s*(.*)$/m);
if (match) status = match[1];

const summary = content.split("\n").slice(0,3).join(" ").substring(0,120);

const entry = `
## ${now}
- **Fichier** : [[${path}]]
- **Module** : ${module}
- **Status** : ${status}
- **Résumé** : ${summary}...
- **Auteur** : Dimitri
---

`;

await app.vault.append(await app.vault.getAbstractFileByPath(logFile), entry);

tR += "✔️ Log ajouté dans History.md";
%>
