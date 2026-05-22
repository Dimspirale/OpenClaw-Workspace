# 🛰️ Supervision globale — OpenClaw Light

## 🟢 Santé générale

```dataviewjs
const pages = dv.pages('"Core"');

const total = pages.length;
const ok = pages.filter(p=>p.status && p.file.tags && p.file.content.includes("# 🔗 Navigation rapide")).length;

const health = Math.round((ok / total) * 100);

dv.paragraph("Santé globale : **" + health + "%**");
```

---

## 🔥 Risques critiques

```dataview
table file.link, status
from "Core"
where contains(file.tags, "prio/haute") and status != "en_cours"
```

---

## ⚠️ Anomalies

```dataview
table file.link, status
from "Core"
where !status or !file.tags or !contains(file.content, "# 🔗 Navigation rapide")
```

---

## 📈 Performance

```dataviewjs
const done = pages.filter(p=>p.status=="termine").length;
const inProgress = pages.filter(p=>p.status=="en_cours").length;
const speed = inProgress * 0.6 + done * 0.1;
const remaining = total - done;
const eta = speed > 0 ? Math.round(remaining / speed) : "∞";

dv.table(
  ["Indicateur","Valeur"],
  [
    ["Vitesse", speed.toFixed(2)],
    ["Restants", remaining],
    ["ETA (jours)", eta]
  ]
);
```

---

## 📦 Charge par module

```dataviewjs
const modules = [...new Set(pages.map(p=>p.file.folder.split("/")[1]))];
let rows = [];
modules.forEach(m=>{
  const f = pages.filter(p=>p.file.folder.includes(m));
  rows.push([m, f.filter(p=>p.status!="termine").length]);
});
dv.table(["Module","Charge"], rows);
```

---

## 🧠 Intelligence contextuelle

```dataviewjs
function keywords(text){
  const words = text.toLowerCase().split(/\W+/);
  const freq = {};
  words.forEach(w=>{ if(w.length>5) freq[w]=(freq[w]||0)+1; });
  return Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,5).map(e=>e[0]);
}

dv.table(
  ["Fichier","Mots-clés"],
  pages.map(p=>[p.file.link, keywords(p.file.content).join(", ")])
);
```
