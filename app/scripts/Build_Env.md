<%*
const env = await tp.system.prompt("Environnement (dev / test / prod)");
const now = tp.date.now("YYYY-MM-DD_HH-mm");
const file = `Builds/Build_${env}_${now}.md`;

const pages = dv.pages('"Core"');

let filtered;

if (env == "dev") {
  filtered = pages.filter(p => ["backlog","en_cours","a_valider"].includes(p.status));
}
else if (env == "test") {
  filtered = pages.filter(p => ["en_cours","a_valider"].includes(p.status));
}
else if (env == "prod") {
  filtered = pages.filter(p => p.status == "termine");
}
else {
  tR += "❌ Environnement inconnu.";
  return;
}

const content = `# 🏗️ Build ${env.toUpperCase()} — ${now}

## 📊 Contenu (${filtered.length} fichiers)
${filtered.map(p => "- " + p.file.link).join("\n")}

---

## 📝 Résumés
${filtered.map(p => `### ${p.file.name}\n${p.file.content.split("\n").slice(0,3).join(" ")}...`).join("\n\n")}
`;

await app.vault.create(file, content);

tR += `✔️ Build ${env.toUpperCase()} généré : ${file}`;
%>
