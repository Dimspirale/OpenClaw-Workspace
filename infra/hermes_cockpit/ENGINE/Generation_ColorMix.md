```dataviewjs
/* ============================================================
   WIDGET HUD — COLORMIX / CMY / CTO (A4‑H)
   ============================================================ */

const fixtures = dv.pages('"Lumière/Fixtures"')
  .where(p => p.type == "projecteur");

function extractFunctions(p) {
  const mode = p.modes_dmx?.[0];
  if (!mode || !mode.details) return [];
  return mode.details;
}

let fixturesCMY = 0;
let fixturesRGB = 0;
let fixturesCTO = 0;
let fixturesWB = 0;

fixtures.forEach(p => {
  const funcs = extractFunctions(p);
  if (funcs.length === 0) return;

  const hasC  = funcs.some(f => f.fonction.toLowerCase() === "cyan");
  const hasM  = funcs.some(f => f.fonction.toLowerCase() === "magenta");
  const hasY  = funcs.some(f => f.fonction.toLowerCase() === "yellow");
  const hasR  = funcs.some(f => f.fonction.toLowerCase() === "red");
  const hasG  = funcs.some(f => f.fonction.toLowerCase() === "green");
  const hasB  = funcs.some(f => f.fonction.toLowerCase() === "blue");
  const hasCTO = funcs.some(f => f.fonction.toLowerCase() === "cto");

  if (hasC && hasM && hasY) {
    fixturesCMY++;
    fixturesWB++;
  }
  if (hasR && hasG && hasB) fixturesRGB++;
  if (hasCTO) fixturesCTO++;
});

const status =
  (fixturesCMY + fixturesRGB) === 0 ? "CRITICAL" :
  fixturesCTO === 0 ? "WARNING" :
  "OK";

dv.el("div", `
<div class="hud-widget hud-colormix">
  <div class="hud-w-title">ColorMix / CMY / CTO</div>

  <div class="hud-cm-line">
    <span>Fixtures CMY :</span>
    <span>${fixturesCMY}</span>
  </div>

  <div class="hud-cm-line">
    <span>Fixtures RGB :</span>
    <span>${fixturesRGB}</span>
  </div>

  <div class="hud-cm-line">
    <span>Fixtures CTO :</span>
    <span>${fixturesCTO}</span>
  </div>

  <div class="hud-cm-line">
    <span>White Balance possibles :</span>
    <span>${fixturesWB}</span>
  </div>

  <div class="hud-cm-status hud-status-${status.toLowerCase()}">
    ${status}
  </div>
</div>
`);
```
