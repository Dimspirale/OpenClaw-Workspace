# 🛑 Analyse de risques avancée — OpenClaw Light

```dataviewjs
const pages = dv.pages('"Core"');

function riskScore(p) {
  let prob = 1;
  let impact = 1;

  // Probabilité
  if (p.status == "backlog") prob += 1;
  if (p.status == "en_cours") prob += 2;
  if (p.status == "a_valider") prob += 1;

  // Impact
  if (p.file.tags?.includes("prio/haute")) impact += 3;
  if (p.file.tags?.includes("prio/moyenne")) impact += 1;

  return prob * impact;
}

let rows = [];

pages.forEach(p => {
  rows.push([p.file.link, p.status, riskScore(p)]);
});

rows.sort((a,b) => b[2] - a[2]);

dv.table(["Fichier", "Statut", "Score"], rows);
```

---

## 🧮 Matrice de risques (Probabilité × Impact)

```dataviewjs
dv.paragraph(`
| Impact ↓ / Probabilité → | Faible | Moyenne | Haute |
|---------------------------|--------|---------|--------|
| Faible                    | 🟩     | 🟨      | 🟧     |
| Moyen                     | 🟨     | 🟧      | 🟥     |
| Élevé                     | 🟧     | 🟥      | 🟥     |
`);
```

---

## 🔥 Risques critiques (score ≥ 8)

```dataviewjs
dv.table(
  ["Fichier", "Score"],
  rows.filter(r => r[2] >= 8)
);
```
