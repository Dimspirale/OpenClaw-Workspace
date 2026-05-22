# 📤 Export automatique des Shows — Moteur A8

```dataviewjs
/* ============================================================
   MOTEUR A8 — EXPORT SHOWS
   JSON • CueList • Timeline
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

/* --- Templates de scènes (alignés avec A7) --- */

const SCENES_TEMPLATES = [
  {
    id: "intro_soft",
    name: "Intro Soft",
    mood: "slow",
    duration: 20,
    needs: { panTilt: true, color: true, strobe: false, beam: false }
  },
  {
    id: "groove_mid",
    name: "Groove Mid",
    mood: "mid",
    duration: 30,
    needs: { panTilt: true, color: true, strobe: false, beam: false }
  },
  {
    id: "chorus_full",
    name: "Chorus Full",
    mood: "fast",
    duration: 40,
    needs: { panTilt: true, color: true, strobe: true, beam: false }
  },
  {
    id: "break_atmos",
    name: "Break Atmos",
    mood: "slow",
    duration: 25,
    needs: { panTilt: false, color: true, strobe: false, beam: true }
  },
  {
    id: "final_full",
    name: "Final",
    mood: "fast",
    duration: 45,
    needs: { panTilt: true, color: true, strobe: true, beam: true }
  }
];

/* ============================================================
   PREPARATION DES CAPACITES PAR PROJECTEUR
   ============================================================ */

const fixturesCaps = fixtures.map(p => {
  const funcs = extractFunctions(p);
  const cap = detectCapabilities(funcs);
  return { page: p, cap };
});

/* ============================================================
   GENERATION DU SHOW (SCENES + FIXTURES)
   ============================================================ */

function generateShow(fixturesCaps) {
  const scenes = [];
  let currentTime = 0;

  SCENES_TEMPLATES.forEach(scene => {
    const usable = fixturesCaps.filter(fc => {
      const c = fc.cap;
      const n = scene.needs;
      return (!n.panTilt || c.panTilt) &&
             (!n.color   || c.color) &&
             (!n.strobe  || c.strobe) &&
             (!n.beam    || c.beam);
    });

    if (usable.length === 0) return;

    const sceneStart = currentTime;
    const sceneEnd = currentTime + scene.duration;

    scenes.push({
      id: scene.id,
      name: scene.name,
      mood: scene.mood,
      start: sceneStart,
      end: sceneEnd,
      duration: scene.duration,
      fixtures: usable.map(f => `${f.page.marque} ${f.page.modele}`)
    });

    currentTime = sceneEnd;
  });

  return {
    showName: "AutoShow_1",
    totalDuration: currentTime,
    scenes
  };
}

const show = generateShow(fixturesCaps);

/* ============================================================
   EXPORT JSON
   ============================================================ */

dv.header(2, "Export JSON");

if (!show.scenes.length) {
  dv.paragraph("Aucun show générable avec les capacités actuelles.");
} else {
  const jsonExport = JSON.stringify(show, null, 2);
  dv.el("pre", `<code>${jsonExport}</code>`);
}

/* ============================================================
   EXPORT CUELIST (TYPE CONSOLE)
   ============================================================ */

dv.header(2, "Export CueList");

if (show.scenes.length) {
  const cueLines = show.scenes.map((s, i) =>
    `Cue ${i + 1} — ${s.name} [${s.mood}] ` +
    `Start: ${s.start}s • Durée: ${s.duration}s • Fixtures: ${s.fixtures.length}`
  );
  dv.list(cueLines);
}

/* ============================================================
   EXPORT TIMELINE
   ============================================================ */

dv.header(2, "Export Timeline");

if (show.scenes.length) {
  const timelineLines = show.scenes.map(s =>
    `${s.start}s → ${s.end}s : ${s.name} (${s.mood})`
  );
  dv.list(timelineLines);
}
```
