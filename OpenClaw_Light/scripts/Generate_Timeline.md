<%*
const name = await tp.system.prompt("Nom de la timeline");
const file = `Timelines/Timeline_${name}.md`;

const template = `# 🎬 Timeline — ${name}

## ⏱️ Timeline Gantt

\`\`\`mermaid
gantt
dateFormat HH:mm:ss
title Timeline ${name}

section OSC
OSC_Trigger_1 :done, 00:00:01, 1s
OSC_Trigger_2 :done, 00:00:05, 1s

section DMX
DMX_Fade_In :active, 00:00:02, 3s
DMX_Fade_Out : 00:00:10, 2s

section MIDI
MIDI_Note_On :done, 00:00:03, 1s
MIDI_Note_Off : 00:00:08, 1s
\`\`\`

## 🎛️ Détails des événements

### OSC
- /show/start — 00:00:01  
- /effect/trigger — 00:00:05  

### DMX
- Fade In — 00:00:02 → 00:00:05  
- Fade Out — 00:00:10 → 00:00:12  

### MIDI
- Note On C3 — 00:00:03  
- Note Off C3 — 00:00:08  

---

# 🔗 Navigation rapide
- [[Home]]
- [[Dashboard_OpenClaw]]
- [[Timelines]]
`;

await app.vault.create(file, template);

tR += "✔️ Timeline générée.";
%>
