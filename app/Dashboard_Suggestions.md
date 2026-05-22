# 🤖 Suggestions intelligentes — OpenClaw Light

```dataviewjs
const pages = dv.pages('"Core"');

function suggest(p) {
  let s = [];

  if (!p.status) s.push("Ajouter un status");
  if (p.status == "backlog" && p.file.tags?.includes("prio/haute"))
    s.push("Passer en 'en_cours' (prio haute)");
  if (p.status == "en_cours" && !p.file.tags?.includes("semaine/en_cours"))
    s.push("Ajouter au planning de la semaine");
  if (p.status == "a_valider")
    s.push("Procéder à la validation");
  if (p.file.tags?.includes("type/doc") && p.file.content.length < 200)
    s.push("Document trop court : enrichir");

  return s.join(", ");
}

let rows = [];

pages.forEach(p => {
  const s = suggest(p);
  if (s.length > 0) rows.push([p.file.link, p.status, s]);
});

dv.table(["Fichier", "Statut", "Suggestions"], rows);
```
