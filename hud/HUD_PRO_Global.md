```dataviewjs
/* ============================================================
   WIDGET HUD — EXPORT SHOWS (A8‑H)
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

const SCENES_TEMPLATES = [
  { name: "Intro Soft",  duration: 20, needs: { panTilt: true, color: true, strobe: false, beam: false }},
  { name: "Groove Mid",  duration: 30, needs: { panTilt: true, color: true, strobe: false, beam: false }},
  { name: "Chorus Full", duration: 40, needs: { panTilt: true, color: true, strobe: true,  beam: false }},
  { name: "Break Atmos", duration: 25, needs: { panTilt: false, color: true, strobe: false, beam: true  }},
  { name: "Final",       duration: 45, needs: { panTilt: true, color: true, strobe: true,  beam: true  }}
];

let fixturesCaps = fixtures.map(p => {
  const funcs = extractFunctions(p);
  return { page: p, cap: detectCapabilities(funcs) };
});

let scenesPossible = 0;
let totalDuration = 0;

SCENES_TEMPLATES.forEach(scene => {
  const usable = fixturesCaps.filter(fc => {
    const c = fc.cap;
    const n = scene.needs;
    return (!n.panTilt || c.panTilt) &&
           (!n.color   || c.color) &&
           (!n.strobe  || c.strobe) &&
           (!n.beam    || c.beam);
  });

  if (usable.length > 0) {
    scenesPossible++;
    totalDuration += scene.duration;
  }
});

const exportable = scenesPossible > 0;
const formats = exportable ? "JSON, CueList, Timeline" : "Aucun";

const status =
  !exportable ? "CRITICAL" :
  scenesPossible < SCENES_TEMPLATES.length ? "WARNING" :
  "OK";

dv.el("div", `
<div class="hud-widget hud-export">
  <div class="hud-w-title">Export Shows</div>

  <div class="hud-ex-line">
    <span>Scènes exportables :</span>
    <span>${scenesPossible}</span>
  </div>

  <div class="hud-ex-line">
    <span>Durée totale :</span>
    <span>${exportable ? totalDuration + "s" : "-"}</span>
  </div>

  <div class="hud-ex-line">
    <span>Formats :</span>
    <span>${formats}</span>
  </div>

  <div class="hud-ex-status hud-status-${status.toLowerCase()}">
    ${status}
  </div>
</div>
`);
```
