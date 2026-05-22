# 🎬 Simulation de production — Timeline Show

## ⏱️ Timeline (Mermaid)

```dataviewjs
const pages = dv.pages('"Core/ShowControl"');

let events = [];

pages.forEach(p => {
  if (p.tc?.time) {
    events.push([p.tc.time, p.file.name, p.tc.event || "Événement"]);
  }
});

events.sort((a,b)=>a[0].localeCompare(b[0]));

let mermaid = "gantt\ndateFormat HH:mm:ss\n\nsection Show\n";

events.forEach(e => {
  mermaid += `${e[1]} :done, ${e[0]}, 1s\n`;
});

dv.el("pre", mermaid);
```

---

## 🎛️ Triggers OSC / DMX / MIDI

```dataview
table file.link as "Fichier", osc.address as "OSC", dmx.channel as "DMX", midi.note as "MIDI"
from "Core/ShowControl"
where osc or dmx or midi
```

---

## 🔥 Événements critiques

```dataview
table file.link, tc.time, file.tags
from "Core/ShowControl"
where contains(file.tags, "prio/haute")
```

---

## 🧠 Analyse de cohérence

```dataviewjs
function check(p){
  if(p.osc && !p.tc) return "OSC sans timecode";
  if(p.dmx && !p.tc) return "DMX sans timecode";
  if(p.midi && !p.tc) return "MIDI sans timecode";
  return "";
}

dv.table(["Fichier","Problème"], pages.map(p=>[p.file.link, check(p)]).filter(r=>r[1]!=""));
```
