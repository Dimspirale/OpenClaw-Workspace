# 🧠 Clustering intelligent — OpenClaw Light

```dataviewjs
const pages = dv.pages('"Core"');

function similarity(a, b) {
  let score = 0;

  // Similarité des tags
  const tagsA = a.file.tags || [];
  const tagsB = b.file.tags || [];
  score += tagsA.filter(t => tagsB.includes(t)).length * 2;

  // Similarité du module
  if (a.file.folder.split("/")[1] == b.file.folder.split("/")[1]) score += 3;

  // Similarité du statut
  if (a.status == b.status) score += 1;

  // Similarité du contenu (heuristique simple)
  const wordsA = a.file.content.split(" ");
  const wordsB = b.file.content.split(" ");
  score += wordsA.filter(w => wordsB.includes(w)).length / 20;

  return score;
}

let clusters = [];

pages.forEach(p => {
  let bestCluster = null;
  let bestScore = 0;

  clusters.forEach(c => {
    const s = similarity(p, c[0]);
    if (s > bestScore) {
      bestScore = s;
      bestCluster = c;
    }
  });

  if (bestScore > 5) bestCluster.push(p);
  else clusters.push([p]);
});

clusters = clusters.sort((a,b) => b.length - a.length);

clusters.forEach((cluster, i) => {
  dv.header(3, `Cluster ${i+1} (${cluster.length} fichiers)`);
  dv.list(cluster.map(p => p.file.link));
});
```
