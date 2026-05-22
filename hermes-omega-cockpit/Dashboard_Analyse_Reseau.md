# 🌐 Analyse réseau — OpenClaw Light

## 🔌 Art‑Net

```dataview
table file.link as "Fichier", net.universe as "Univers", net.channel as "Canal", net.description as "Description"
from "Core/ShowControl"
where net.protocol = "artnet"
```

---

## 🔌 sACN

```dataview
table file.link as "Fichier", net.universe as "Univers", net.priority as "Priorité"
from "Core/ShowControl"
where net.protocol = "sacn"
```

---

## 🔊 OSC

```dataview
table file.link as "Fichier", osc.address as "Adresse", osc.type as "Type"
from "Core/ShowControl"
where osc
```

---

## ⚠️ Conflits d’univers

```dataviewjs
const pages = dv.pages('"Core/ShowControl"').where(p => p.net?.universe);

let conflicts = [];

pages.forEach(p1 => {
  pages.forEach(p2 => {
    if (p1 != p2 && p1.net.universe == p2.net.universe) {
      conflicts.push([p1.file.link, p2.file.link, p1.net.universe]);
    }
  });
});

dv.table(["Fichier A","Fichier B","Univers"], conflicts);
```

---

## 🚨 Ports OSC utilisés

```dataviewjs
const ports = {};

pages.forEach(p => {
  if (p.osc?.port) ports[p.osc.port] = (ports[p.osc.port] || 0) + 1;
});

dv.table(["Port","Utilisation"], Object.entries(ports));
```
