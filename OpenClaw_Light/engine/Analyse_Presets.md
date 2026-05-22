# 🔍 Analyse Presets DMX — Moteur A3

```dataviewjs
/* ============================================================
   MOTEUR A3 — ANALYSE DES PRESETS DMX
   ============================================================ */

const presets = dv.pages('"Presets"')
  .where(p => p.type == "preset");

const fixtures = dv.pages('"Lumière/Fixtures"')
  .where(p => p.type == "projecteur");

/* ============================================================
   OUTILS
   ============================================================ */

function findFixture(name) {
  return fixtures.find(f => `${f.marque} ${f.modele}`.toLowerCase() === name.toLowerCase());
}

function checkPreset(p) {
  const errors = [];
  const warnings = [];

  /* Champs obligatoires */
  if (!p.projecteur) errors.push("Aucun projecteur associé");
  if (!p.fonction) errors.push("Fonction non définie");
  if (p.valeur === undefined) errors.push("Valeur DMX manquante");

  /* Vérification du projecteur */
  const fixture = p.projecteur ? findFixture(p.projecteur) : null;
  if (!fixture) {
    errors.push(`Projecteur introuvable : ${p.projecteur}`);
    return { errors, warnings };
  }

  /* Vérification de la fonction */
  const mode = fixture.modes_dmx?.[0];
  if (!mode || !mode.details) {
    errors.push("Le projecteur n'a pas de mode DMX valide");
    return { errors, warnings };
  }

  const func = mode.details.find(c => c.fonction.toLowerCase() === p.fonction.toLowerCase());
  if (!func) {
    errors.push(`Fonction inconnue pour ce projecteur : ${p.fonction}`);
  } else {
    /* Vérification de la valeur DMX */
    if (p.valeur < 0 || p.valeur > 255)
      errors.push(`Valeur DMX hors plage (0–255) : ${p.valeur}`);

    /* Vérification du canal */
    if (!func.canal)
      warnings.push(`Canal non défini pour la fonction ${p.fonction}`);
  }

  return { errors, warnings };
}

/* ============================================================
   ANALYSE GLOBALE
   ============================================================ */

let results = presets.map(p => {
  const check = checkPreset(p);
  return {
    file: p.file.name,
    projecteur: p.projecteur,
    fonction: p.fonction,
    valeur: p.valeur,
    errors: check.errors,
    warnings: check.warnings
  };
});

/* ============================================================
   RENDER
   ============================================================ */

dv.header(2, "Analyse des Presets DMX");

results.forEach(r => {
  dv.header(3, `${r.file}`);

  if (r.errors.length === 0 && r.warnings.length === 0) {
    dv.paragraph("✔️ **Preset conforme**");
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
