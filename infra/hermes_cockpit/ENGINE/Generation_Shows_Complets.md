# 🎭 Génération automatique de Shows complets — Moteur A7

```dataviewjs
/* ============================================================
   MOTEUR A7 — GENERATION DE SHOWS COMPLETS
   Scenes + Transitions + FX
   ============================================================ */

const fixtures = dv.pages('"Lumière/Fixtures"')
  .where(p => p.type == "projecteur");

function extractFunctions(p) {
  const mode = p.modes_dmx?.[0];
  if (!mode || !mode.details) return [];
  return mode.details;
}

function detectCapabilities(funcs) {
  return {
    panTilt: funcs.some(f => f.fonction.toLowerCase() === "pan") &&
             funcs.some(f => f.fonction.toLowerCase() === "tilt"),

    color: funcs.some(f => f.fonction.toLowerCase() === "color wheel") ||
           funcs.some(f => ["red","green","blue"].includes(f.fonction.toLowerCase())),

    strobe: funcs.some(f => f.fonction.toLowerCase() === "shutter"),

    beam: funcs.some(f => ["zoom","focus"].includes(f.fonction.toLowerCase()))
  };
}

/* ============================================================
   TEMPLATES DE SCENES
   ============================================================ */

const SCENES_TEMPLATES = [
  {
    name: "Scene 1 — Intro Soft",
    mood: "slow",
    desc: "Positions statiques, couleurs douces, pas de strobe",
    needs: { panTilt: true, color: true, strobe: false, beam: false }
  },
  {
    name: "Scene 2 — Groove Mid",
    mood: "mid",
    desc: "Légers mouvements, color chase lent, pas de strobe agressif",
    needs: { panTilt: true, color: true, strobe: false, beam: false }
  },
  {
    name: "Scene 3 — Chorus Full",
    mood: "fast",
    desc: "FX Pan/Tilt + Color + Strobe + Beam si dispo",
    needs: { panTilt: true, color: true, strobe: true, beam: false }
  },
  {
    name: "Scene 4 — Break Atmos",
    mood: "slow",
    desc: "Beam FX + couleurs froides / chaudes, peu de mouvement",
    needs: { panTilt: false, color: true, strobe: false, beam: true }
  },
  {
    name: "Scene 5 — Final",
    mood: "fast",
    desc: "Tout ce qui est disponible : FX + Color + Strobe + Beam",
    needs: { panTilt: true, color: true, strobe: true, beam: true }
  }
];

/* ============================================================
   GENERATION DES SHOWS
   ============================================================ */

function generateShowForRig(fixturesCaps) {
  const show = [];

  SCENES_TEMPLATES.forEach(scene => {
    const usableFixtures = fixturesCaps.filter(fc => {
      const c = fc.cap;
      const n = scene.needs;
      return (!n.panTilt || c.panTilt) &&
             (!n.color   || c.color) &&
             (!n.strobe  || c.strobe) &&
             (!n.beam    || c.beam);
    });

    if (usableFixtures.length === 0) return;

    show.push({
      sceneName: scene.name,
      mood: scene.mood,
      desc: scene.desc,
      fixturesCount: usableFixtures.length,
      notes: buildSceneNotes(scene, usableFixtures)
    });
  });

  return show;
}

function buildSceneNotes(scene, usableFixtures) {
  const names = usableFixtures.map(f => `${f.page.marque} ${f.page.modele}`);
  return [
    `Mood : ${scene.mood}`,
    `Fixtures utilisés : ${names.join(", ")}`,
    `Description : ${scene.desc}`
  ];
}

/* ============================================================
   PREPARATION DES CAPACITES PAR PROJECTEUR
   ============================================================ */

const fixturesCaps = fixtures.map(p => {
  const funcs = extractFunctions(p);
  const cap = detectCapabilities(funcs);
  return { page: p, cap };
});

/* ============================================================
   RENDER
   ============================================================ */

dv.header(2, "Génération automatique de Shows complets");

const show = generateShowForRig(fixturesCaps);

if (show.length === 0) {
  dv.paragraph("Aucun show générable avec les capacités actuelles du parc.");
} else {
  show.forEach((scene, index) => {
    dv.header(3, `${index + 1}. ${scene.sceneName}`);

    dv.list([
      `Mood : ${scene.mood}`,
      `Fixtures utilisés : ${scene.fixturesCount}`,
      `Description : ${scene.desc}`
    ]);

    dv.paragraph("Notes détaillées :");
    dv.list(scene.notes);
  });
}
```
