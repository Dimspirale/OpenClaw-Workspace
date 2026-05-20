<%*
const name = await tp.system.prompt("Nom du preset lumière");
const file = `LightPresets/${name}.md`;

const template = `---
status: backlog
tags: [type/lightpreset, preset/${name.toLowerCase()}]
---

# 💡 Preset Lumière — ${name}

## 🎨 Palette
- Couleur 1 : #FF0000
- Couleur 2 : #FFA500
- Couleur 3 : #FFFFFF

## 🔥 Intensité
- Valeur : 75%

## 🎭 Mood
- Ambiance : Énergétique
- Style : Show / Impact

## 📈 Courbe d’évolution

\`\`\`mermaid
graph LR
  A[0%] --> B[30%]
  B --> C[75%]
  C --> D[100%]
\`\`\`

## 🔧 Paramètres DMX
- Canal : 1  
- Fonction : Intensité  
- Plage : 0–255  

---

# 🔗 Navigation rapide
- [[Home]]
- [[Dashboard_OpenClaw]]
- [[LightPresets]]
`;

await app.vault.create(file, template);

tR += "✔️ Preset lumière généré.";
%>
