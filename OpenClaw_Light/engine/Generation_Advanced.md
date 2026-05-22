# 🎨 Génération avancée — Palettes, Cues, Positions (A2‑G)

```dataviewjs
/* ============================================================
   MOTEUR A2‑G — GENERATION AVANCEE
   Palettes • Positions • Cues
   ============================================================ */

const fixtures = dv.pages('"Lumière/Fixtures"')
  .where(p => p.type == "projecteur");

function extractMode(p) {
  return p.modes_dmx?.[0] || null;
}

function extractFunctions(p) {
  const mode = extractMode(p);
  if (!mode || !mode.details) return [];
  return mode.details;
}

/* ============================================================
   GENERATION PALETTES
   ============================================================ */

function generatePalettes(p) {
  const funcs = extractFunctions(p);
  const palettes = [];

  const hasColor = funcs.some(f => f.fonction.toLowerCase() === "color wheel");
  const hasGobo = funcs.some(f => f.fonction.toLowerCase() === "gobo wheel");
  const hasZoom = funcs.some(f => f.fonction.toLowerCase() === "zoom");
  const hasFocus = funcs.some(f => f.fonction.toLowerCase() === "focus");

  if (hasColor) {
    palettes.push("Palette Color : White");
    palettes.push("Palette Color : Saturé");
  }

  if (hasGobo) {
    palettes.push("Palette Gobo : Open");
    palettes.push("Palette Gobo : Gobo 1");
  }

  if (hasZoom) {
    palettes.push("Palette Beam : Wide");
    palettes.push("Palette Beam : Tight");
  }

  if (hasFocus) {
    palettes.push("Palette Focus : Near");
    palettes.push("Palette Focus : Far");
  }

  return palettes;
}

/* ============================================================
   GENERATION POSITIONS
   ============================================================ */

function generatePositions(p) {
  const funcs = extractFunctions(p);
  const positions = [];

  const pan = funcs.find(f => f.fonction.toLowerCase() === "pan");
  const tilt = funcs.find(f => f.fonction.toLowerCase() === "tilt");

  if (pan && tilt) {
    positions.push("Position : Center");
    positions.push("Position : Up");
    positions.push("Position : Down");
    positions.push("Position : Left");
    positions.push("Position : Right");
  }

  return positions;
}

/* ============================================================
   GENERATION CUES
   ============================================================ */

function generateCues(p) {
  const cues = [];

  cues.push("Cue 1 : Full White — Position Center");
  cues.push("Cue 2 : Saturé — Beam Tight");
  cues.push("Cue 3 : Gobo Open — Focus Far");

  return cues;
}

/* ============================================================
   RENDER
   ============================================================ */

dv.header(2, "Génération avancée — Palettes, Cues, Positions");

fixtures.forEach(p => {
  dv.header(3, `${p.marque} ${p.modele}`);

  const palettes = generatePalettes(p);
  const positions = generatePositions(p);
  const cues = generateCues(p);

  dv.el("div", `
  <div class="adv-block">
    <h4>Palettes</h4>
    ${palettes.map(x => `<div>- ${x}</div>`).join("")}

    <h4>Positions</h4>
    ${positions.map(x => `<div>- ${x}</div>`).join("")}

    <h4>Cues</h4>
    ${cues.map(x => `<div>- ${x}</div>`).join("")}
  </div>
  `);
});
```
