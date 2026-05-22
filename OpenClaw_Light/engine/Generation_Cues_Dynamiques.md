# 🎬 Génération automatique de Cues dynamiques — Moteur A6

```dataviewjs
/* ============================================================
   MOTEUR A6 — GENERATION DE CUES DYNAMIQUES
   FX + Color + Position
   ============================================================ */

const fixtures = dv.pages('"Lumière/Fixtures"')
  .where(p => p.type == "projecteur");

function extractFunctions(p) {
  const mode = p.modes_dmx?.[0];
  if (!mode || !mode.details) return [];
  return mode.details;
}

/* ============================================================
   DETECTION DES CAPACITES
   ============================================================ */

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
   GENERATION DES CUES DYNAMIQUES
   ============================================================ */

function generateDynamicCues(cap) {
  const cues = [];

  /* --- Cues FX Pan/Tilt --- */
  if (cap.panTilt) {
    cues.push("Cue FX : Circle Slow + Fade 2s");
    cues.push("Cue FX : Tilt Wave + Fade 1s");
    cues.push("Cue FX : Random Movement + Fade 3s");
  }

  /* --- Cues Color --- */
  if (cap.color) {
    cues.push("Cue Color : Rainbow Slow + Fade 2s");
    cues.push("Cue Color : Pulse White + Fade 0.5s");
    cues.push("Cue Color : Chase Saturated + Fade 1s");
  }

  /* --- Cues Strobe --- */
  if (cap.strobe) {
    cues.push("Cue Strobe : Random + Fade 0.2s");
    cues.push("Cue Strobe : Pulse + Fade 0.3s");
  }

  /* --- Cues Beam --- */
  if (cap.beam) {
    cues.push("Cue Beam : Zoom Sweep + Fade 1s");
    cues.push("Cue Beam : Focus Pulse + Fade 1s");
  }

  /* --- Combinaisons intelligentes --- */
  if (cap.panTilt && cap.color) {
    cues.push("Cue Combo : Circle Slow + Rainbow Slow");
    cues.push("Cue Combo : Tilt Wave + Pulse White");
  }

  if (cap.panTilt && cap.strobe) {
    cues.push("Cue Combo : Random Movement + Strobe Fast");
  }

  if (cap.color && cap.beam) {
    cues.push("Cue Combo : Chase Saturated + Zoom Pulse");
  }

  return cues;
}

/* ============================================================
   RENDER
   ============================================================ */

dv.header(2, "Génération automatique de Cues dynamiques");

fixtures.forEach(p => {
  const funcs = extractFunctions(p);
  const cap = detectCapabilities(funcs);
  const cues = generateDynamicCues(cap);

  dv.header(3, `${p.marque} ${p.modele}`);

  dv.el("div", `
  <div class="cue-block">

    <h4>Cues dynamiques générées</h4>
    ${cues.length ? cues.map(x => `<div>- ${x}</div>`).join("") : "<div>Aucune</div>"}

  </div>
  `);
});
```
