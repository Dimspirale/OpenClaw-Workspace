<%*
const name = await tp.system.prompt("Nom du preset");
const file = `Presets/${name}.md`;

const template = `---
status: backlog
tags: [type/preset, preset/${name.toLowerCase()}]
---

# 🎛️ Preset — ${name}

## 🔊 OSC
- Adresse : /${name.toLowerCase()}
- Type : float
- Description : Contrôle principal du preset ${name}

## 💡 DMX
- Canal : 1
- Plage : 0–255
- Fonction : Intensité / Paramètre

## 🎹 MIDI
- Note : C3
- Canal : 1
- Action : Trigger du preset

## 🎨 Render
- Intensité : 80%
- Couleur : #FFFFFF
- Dynamique : Medium

---

# 🔗 Navigation rapide
- [[Home]]
- [[Dashboard_OpenClaw]]
- [[Presets]]
`;

await app.vault.create(file, template);

tR += "✔️ Preset généré.";
%>
