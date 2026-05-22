# 🎛️ Génération automatique de presets DMX — Moteur A2‑E

```dataviewjs
/* ============================================================
   MOTEUR A2‑E — GENERATION AUTOMATIQUE DE PRESETS DMX
   ============================================================ */

const fixtures = dv.pages('"Lumière/Fixtures"')
  .where(p => p.type == "projecteur");

function extractFunctions(p) {
  if (!p.modes_dmx || p.modes_dmx.length === 0) return [];
  return p.modes_dmx.flatMap(m => m.details?.map(c => c.fonction) || []);
}

function generatePreset(name, fonction, canal) {
  return `
## ${name}
- Fonction : ${fonction}
- Canal : ${canal}
- Valeur : 255
`;
}

function generatePresetsForFixture(p) {
  const presets = [];
  const functions = extractFunctions(p);

  const mode = p.modes_dmx?.[0];
  if (!mode) return "Aucun mode DMX";

  mode.details.forEach(c => {
    switch (c.fonction.toLowerCase()) {
      case "dimmer":
        presets.push(generatePreset("Dimmer Full", "Dimmer", c.canal));
        presets.push(generatePreset("Dimmer 50%", "Dimmer", c.canal).replace("255", "128"));
        break;

      case "shutter":
        presets.push(generatePreset("Shutter Open", "Shutter", c.canal));
        break;

      case "color wheel":
        presets.push(generatePreset("Color White", "Color Wheel", c.canal).replace("255", "0"));
        presets.push(generatePreset("Color Saturé", "Color Wheel", c.canal).replace("255", "200"));
        break;

      case "gobo wheel":
        presets.push(generatePreset("Gobo Open", "Gobo Wheel", c.canal).replace("255", "0"));
        break;

      case "zoom":
        presets.push(generatePreset("Zoom Wide", "Zoom", c.canal).replace("255", "255"));
        presets.push(generatePreset("Zoom Tight", "Zoom", c.canal).replace("255", "0"));
        break;

      case "focus":
        presets.push(generatePreset("Focus Near", "Focus", c.canal).replace("255", "0"));
        presets.push(generatePreset("Focus Far", "Focus", c.canal).replace("255", "255"));
        break;

      case "pan":
        presets.push(generatePreset("Pan Center", "Pan", c.canal).replace("255", "128"));
        break;

      case "tilt":
        presets.push(generatePreset("Tilt Center", "Tilt", c.canal).replace("255", "128"));
        break;
    }
  });

  return presets.join("\n");
}

/* ============================================================
   RENDER
   ============================================================ */

dv.header(2, "Génération automatique de presets DMX");

fixtures.forEach(p => {
  dv.header(3, `${p.marque} ${p.modele}`);

  const presets = generatePresetsForFixture(p);

  dv.el("div", `
  <div class="preset-block">
    ${presets}
  </div>
  `);
});
```
