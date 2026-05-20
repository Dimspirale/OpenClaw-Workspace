# 🎛️ Documentation API — OpenClaw Light

## 🎚️ OSC — Open Sound Control

```dataview
table file.link as "Fichier", osc.address as "Adresse", osc.type as "Type", osc.description as "Description"
from "Core/ShowControl"
where osc
```

---

## 💡 DMX — Digital Multiplex

```dataview
table file.link as "Fichier", dmx.channel as "Canal", dmx.range as "Plage", dmx.function as "Fonction"
from "Core/ShowControl"
where dmx
```

---

## 🎹 MIDI — Musical Instrument Digital Interface

```dataview
table file.link as "Fichier", midi.note as "Note", midi.channel as "Canal", midi.action as "Action"
from "Core/ShowControl"
where midi
```

---

## ⏱️ Timecode

```dataview
table file.link as "Fichier", tc.event as "Événement", tc.time as "Timecode"
from "Core/ShowControl"
where tc
```

---

## 🌐 Réseaux — Art-Net / sACN

```dataview
table file.link as "Fichier", net.protocol as "Protocole", net.universe as "Univers", net.description as "Description"
from "Core/ShowControl"
where net
```
