<%*
const file = tp.file;
const content = await tp.file.read();

const tagsToAdd = [
  "#prio/moyenne",
  "#type/doc",
  "#semaine/attente"
];

let newContent = content;

// Ajouter les tags seulement s'ils ne sont pas déjà présents
tagsToAdd.forEach(tag => {
  if (!content.includes(tag)) {
    newContent = newContent.replace(/^---([\s\S]*?)---/, (match, yaml) => {
      return `---${yaml}\ntags: [${tagsToAdd.join(", ")}]\n---`;
    });
  }
});

await tp.file.write(newContent);
%>
