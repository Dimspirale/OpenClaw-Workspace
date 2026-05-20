# 🚨 Dashboard Alerts — Système d’Alertes Visuelles

## 🔥 Alerte Critiques (rouge)
```dataviewjs
const crit = dv.pages('"."').where(p => p.critical == true);

dv.header(2, "🔥 Critiques (" + crit.length + ")");

for (let c of crit) {
    dv.el("div", c.file.link, {
        cls: "alert-critical",
    });
}
```

## ⚠️ Métadonnées Manquantes (orange)
```dataviewjs
const missing = dv.pages('"."').where(p => !p.status || !p.module || !p.domain);

dv.header(2, "⚠️ Métadonnées manquantes (" + missing.length + ")");

for (let m of missing) {
    dv.el("div", m.file.link, {
        cls: "alert-missing",
    });
}
```

## ⏳ Retards (jaune)
```dataviewjs
const delayed = dv.pages('"."').where(p => p.status == "delayed");

dv.header(2, "⏳ Retards (" + delayed.length + ")");

for (let d of delayed) {
    dv.el("div", d.file.link, {
        cls: "alert-delayed",
    });
}
```

## 🧊 En Pause (bleu)
```dataviewjs
const paused = dv.pages('"."').where(p => p.status == "paused");

dv.header(2, "🧊 En pause (" + paused.length + ")");

for (let p of paused) {
    dv.el("div", p.file.link, {
        cls: "alert-paused",
    });
}
```

---

# 🎨 Styles Visuels (CSS Snippet)
> À placer dans `.obsidian/snippets/alerts.css` puis activer dans Obsidian.

```css
.alert-critical {
    padding: 6px 10px;
    margin: 4px 0;
    border-left: 4px solid #ff3b30;
    background: rgba(255, 59, 48, 0.12);
    color: #ff3b30;
    font-weight: 600;
    border-radius: 4px;
}

.alert-missing {
    padding: 6px 10px;
    margin: 4px 0;
    border-left: 4px solid #ff9500;
    background: rgba(255, 149, 0, 0.12);
    color: #ff9500;
    font-weight: 600;
    border-radius: 4px;
}

.alert-delayed {
    padding: 6px 10px;
    margin: 4px 0;
    border-left: 4px solid #ffd60a;
    background: rgba(255, 214, 10, 0.12);
    color: #b59400;
    font-weight: 600;
    border-radius: 4px;
}

.alert-paused {
    padding: 6px 10px;
    margin: 4px 0;
    border-left: 4px solid #0a84ff;
    background: rgba(10, 132, 255, 0.12);
    color: #0a84ff;
    font-weight: 600;
    border-radius: 4px;
}
```

---

# 🧠 Résultat
Tu obtiens un **système d’alertes visuelles** :

- 🔥 **rouge** → critiques  
- ⚠️ **orange** → métadonnées manquantes  
- ⏳ **jaune** → retards  
- 🧊 **bleu** → en pause  

Chaque alerte apparaît sous forme de **bandeau coloré**, ultra lisible, intégré dans tes dashboards.

---

# 🚀 Étape suivante (si tu veux aller encore plus loin)
On peut maintenant créer :

👉 **Dashboard_Global_3.0 avec widgets interactifs (Buttons)**  
👉 **Un panneau latéral “Command Center”**  
👉 **Un mode sombre PRO pour tous les dashboards**  
👉 **Un moteur d’alertes automatiques (DataviewJS + conditions dynamiques)**

Tu choisis la prochaine évolution.