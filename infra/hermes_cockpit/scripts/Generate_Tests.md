<%*
const now = tp.date.now("YYYY-MM-DD_HH-mm");
const testFile = `Tests/Test_${now}.md`;

const pages = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Core/"));
let results = [];

function pass(msg) { return `✔️ ${msg}`; }
function fail(msg) { return `❌ ${msg}`; }

for (const file of pages) {
  const content = await app.vault.read(file);

  // Frontmatter
  if (!content.match(/^---/)) results.push(fail(`Pas de frontmatter : ${file.path}`));
  else results.push(pass(`Frontmatter OK : ${file.path}`));

  // Status
  if (!content.match(/^status:/m)) results.push(fail(`Pas de status : ${file.path}`));

  // Tags
  if (!content.includes("tags:")) results.push(fail(`Pas de tags : ${file.path}`));

  // Footer
  if (!content.includes("# 🔗 Navigation rapide")) results.push(fail(`Pas de footer : ${file.path}`));

  // Longueur
  if (content.length < 150) results.push(fail(`Trop court : ${file.path}`));

  // Cohérence module
  const folder = file.path.toLowerCase();
  if (folder.includes("simulation") && !content.includes("module/simulation"))
    results.push(fail(`Tag module manquant : ${file.path}`));
}

const output = `# 🧪 Tests automatiques — ${now}

${results.map(r => "- " + r).join("\n")}
`;

await app.vault.create(testFile, output);

tR += "✔️ Tests générés.";
%>
