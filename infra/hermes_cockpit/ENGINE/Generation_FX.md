# ⚡ Génération automatique d’effets FX — Moteur A5

```dataviewjs
/* ============================================================
   MOTEUR A5 — GENERATION AUTOMATIQUE D’EFFETS (FX)
   ============================================================ */

const fixtures = dv.pages('"Lumière/Fixtures"')
  .where(p => p.type == "projecteur");

function extractFunctions(p) {
  const mode = p.modes_dmx?.[0];
  if (!mode || !mode.details) return [];
  return mode.details;
}

/* ============================================================
   FX PAN/TILT — Waves, Circles, Tilt Sweep
   ============================================================ */

function generatePanTiltFX(funcs) {
  const hasPan = funcs.some(f => f.fonction.toLowerCase() === "pan");
  const hasTilt = funcs.some(f => f.fonction.toLowerCase() === "tilt");

  if (!(hasPan && hasTilt)) return [];

  return [
    "FX PanTilt : Circle Slow",
    "FX PanTilt : Circle Fast",
    "FX PanTilt : Tilt Wave",
    "FX PanTilt : Pan Wave",
    "FX PanTilt : Figure Eight",
    "FX PanTilt : Random Movement"
  ];
}

/* ============================================================
   FX COLOR — Color Chase, Rainbow, Pulse
   ============================================================ */

function generateColorFX(funcs) {
  const hasColorWheel = funcs.some(f => f.fonction.toLowerCase() === "color wheel");
  const hasRGB = funcs.some(f => ["red","green","blue"].includes(f.fonction.toLowerCase()));

  if (!(hasColorWheel || hasRGB)) return [];

  return [
    "FX Color : Rainbow Slow",
    "FX Color : Rainbow Fast",
    "FX Color : Color Chase",
    "FX Color : Pulse Saturated",
    "FX Color : Pulse White"
  ];
}

/* ============================================================
   FX STROBE — Strobe, Random Strobe, Pulse
   ============================================================ */

function generateStrobeFX(funcs) {
  const hasShutter = funcs.some(f => f.fonction.toLowerCase() === "shutter");

  if (!hasShutter) return [];

  return [
    "FX Strobe : Slow",
    "FX Strobe : Medium",
    "FX Strobe : Fast",
    "FX Strobe : Random",
    "FX Strobe : Pulse"
  ];
}

/* ============================================================
   FX BEAM — Zoom Pulse, Focus Sweep
   ============================================================ */

function generateBeamFX(funcs) {
  const hasZoom = funcs.some(f => f.fonction.toLowerCase() === "zoom");
  const hasFocus = funcs.some(f => f.fonction.toLowerCase() === "focus");

  const fx = [];

  if (hasZoom) {
    fx.push("FX Beam : Zoom Pulse");
    fx.push("FX Beam : Zoom Sweep");
  }

  if (hasFocus) {
    fx.push("FX Beam : Focus Sweep");
    fx.push("FX Beam : Focus Pulse");
  }

  return fx;
}

/* ============================================================
   RENDER
   ============================================================ */

dv.header(2, "Génération automatique d’effets FX");

fixtures.forEach(p => {
  const funcs = extractFunctions(p);

  const fxPanTilt = generatePanTiltFX(funcs);
  const fxColor = generateColorFX(funcs);
  const fxStrobe = generateStrobeFX(funcs);
  const fxBeam = generateBeamFX(funcs);

  dv.header(3, `${p.marque} ${p.modele}`);

  dv.el("div", `
  <div class="fx-block">

    <h4>Pan/Tilt FX</h4>
    ${fxPanTilt.length ? fxPanTilt.map(x => `<div>- ${x}</div>`).join("") : "<div>Aucun</div>"}

    <h4>Color FX</h4>
    ${fxColor.length ? fxColor.map(x => `<div>- ${x}</div>`).join("") : "<div>Aucun</div>"}

    <h4>Strobe FX</h4>
    ${fxStrobe.length ? fxStrobe.map(x => `<div>- ${x}</div>`).join("") : "<div>Aucun</div>"}

    <h4>Beam FX</h4>
    ${fxBeam.length ? fxBeam.map(x => `<div>- ${x}</div>`).join("") : "<div>Aucun</div>"}

  </div>
  `);
});
```
