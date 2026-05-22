# 🔍 Analyse Projecteurs — Moteur A1‑E

```dataviewjs
/* ============================================================
   MOTEUR A1‑E — ANALYSE DES FICHES PROJECTEURS
   ============================================================ */

const fixtures = dv.pages('"Lumière/Fixtures"')
  .where(p => p.type == "projecteur");

function checkFixture(p) {
  const errors = [];
  const warnings = [];

  /* Champs obligatoires */
  if (!p.marque) errors.push("Marque manquante");
  if (!p.modele) errors.push("Modèle manquant");
  if (!p.source) errors.push("Source manquante");
  if (!p.puissance_w) warnings.push("Puissance non renseignée");
  if (!p.optique || !p.optique.type) warnings.push("Optique non définie");

  /* Modes DMX */
  if (!p.modes_dmx || p.modes_dmx.length === 0) {
    errors.push("Aucun mode DMX défini");
  } else {
    p.modes_dmx.forEach((m, i) => {
      if (!m.mode) errors.push(`Mode DMX #${i+1} sans nom`);
      if (!m.canaux) errors.push(`Mode DMX ${m.mode} sans nombre de canaux`);
      if (!m.details || m.details.length === 0)
        errors.push(`Mode DMX ${m.mode} sans détails de canaux`);

      /* Vérification des canaux */
      if (m.details) {
        const canalList = m.details.map(c => c.canal);
        const duplicates = canalList.filter((c, idx) => canalList.indexOf(c) !== idx);
        if (duplicates.length > 0)
          errors.push(`Mode ${m.mode} : doublons canaux ${duplicates.join(", ")}`);

        const maxCanal = Math.max(...canalList);
        if (maxCanal !== m.canaux)
          warnings.push(`Mode ${m.mode} : nombre de canaux incohérent (déclaré ${m.canaux}, trouvé ${maxCanal})`);

        m.details.forEach(c => {
          if (c.min < 0 || c.max > 255)
            errors.push(`Mode ${m.mode} : canal ${c.canal} hors plage DMX`);
          if (!c.fonction)
            warnings.push(`Mode ${m.mode} : canal ${c.canal} sans fonction`);
        });
      }
    });
  }

  /* Fonctions critiques */
  const allFunctions = p.modes_dmx?.flatMap(m => m.details?.map(c => c.fonction)) || [];
  if (!allFunctions.includes("Dimmer")) warnings.push("Pas de Dimmer détecté");
  if (allFunctions.includes("Pan") && !allFunctions.includes("Tilt"))
    warnings.push("Pan présent sans Tilt");
  if (allFunctions.includes("Tilt") && !allFunctions.includes("Pan"))
    warnings.push("Tilt présent sans Pan");

  return { errors, warnings };
}

/* Analyse globale */
let results = fixtures.map(p => {
  const check = checkFixture(p);
  return {
    file: p.file.name,
    marque: p.marque,
    modele: p.modele,
    errors: check.errors,
    warnings: check.warnings
  };
});

/* Affichage */
dv.header(2, "Résultats de l'analyse des projecteurs");

results.forEach(r => {
  dv.header(3, `${r.marque || "?"} ${r.modele || "?"} — ${r.file}`);

  if (r.errors.length === 0 && r.warnings.length === 0) {
    dv.paragraph("✔️ **Aucune erreur — fiche conforme**");
  } else {
    if (r.errors.length > 0) {
      dv.paragraph("❌ **Erreurs**");
      dv.list(r.errors);
    }
    if (r.warnings.length > 0) {
      dv.paragraph("⚠️ **Avertissements**");
      dv.list(r.warnings);
    }
  }
});
```
