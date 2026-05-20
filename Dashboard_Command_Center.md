# 🧭 Command Center PRO v1.0 — Stable

```dataviewjs
/* Auto-refresh */
setInterval(() => app.commands.executeCommandById("dataview:refresh-views"), 8000);

/* Data */
const all = dv.pages('"."');
const done = all.filter(p => ["done","success","published"].includes(p.status)).length;
const total = all.length;
const crit = all.filter(p => p.critical).length;
const delayed = all.filter(p => p.status == "delayed").length;
const missing = all.filter(p => !p.status || !p.module || !p.domain).length;
const percent = total > 0 ? Math.round(done / total * 100) : 0;

/* Persistent positions */
function savePos(id, x, y) {
  localStorage.setItem("ccpro-pos-" + id, JSON.stringify({x, y}));
}
function loadPos(id) {
  const v = localStorage.getItem("ccpro-pos-" + id);
  return v ? JSON.parse(v) : null;
}

/* Window template */
function ccpro_window(id, title, content) {
  const pos = loadPos(id);
  return `
  <div class="ccpro-window" id="${id}" style="${pos ? `left:${pos.x}px; top:${pos.y}px;` : ""}">
    <div class="ccpro-header" data-id="${id}">
      <span>${title}</span>
      <span class="ccpro-drag">⠿</span>
    </div>
    <div class="ccpro-body">${content}</div>
  </div>`;
}

/* Render */
dv.el("div", `
<div id="ccpro-root" class="ccpro-visible">

  <div id="ccpro-dock">
    <button class="ccpro-dock-btn" data-toggle="ccpro-root">ON/OFF</button>
    <button class="ccpro-dock-btn" data-mode="compact">Compact</button>
    <button class="ccpro-dock-btn" data-mode="extended">Étendu</button>
  </div>

  ${ccpro_window("ccpro-kpi", "📌 KPIs", `
    <div class="ccpro-kpi-grid">
      <div class="ccpro-kpi"><div class="ccpro-kpi-value">${done}</div><div class="ccpro-kpi-label">OK</div></div>
      <div class="ccpro-kpi ${crit>0?"ccpro-pulse-red":""}"><div class="ccpro-kpi-value">${crit}</div><div class="ccpro-kpi-label">Critiques</div></div>
      <div class="ccpro-kpi ${delayed>0?"ccpro-pulse-yellow":""}"><div class="ccpro-kpi-value">${delayed}</div><div class="ccpro-kpi-label">Retards</div></div>
      <div class="ccpro-kpi"><div class="ccpro-kpi-value">${total}</div><div class="ccpro-kpi-label">Total</div></div>
    </div>
  `)}

  ${ccpro_window("ccpro-progress", "📊 Progression", `
    <div class="ccpro-progress">
      <div class="ccpro-progress-bar" style="width:${percent}%"></div>
    </div>
    <div class="ccpro-progress-label">${percent}% complété</div>
  `)}

  ${ccpro_window("ccpro-alerts", "🚨 Alertes", `
    <div class="ccpro-alert ccpro-alert-critical">🔥 Critiques : ${crit}</div>
    <div class="ccpro-alert ccpro-alert-delayed">⏳ Retards : ${delayed}</div>
    <div class="ccpro-alert ccpro-alert-missing">⚠️ Incomplets : ${missing}</div>
  `)}

</div>
`);

/* Drag logic */
setTimeout(() => {
  document.querySelectorAll(".ccpro-header").forEach(h => {
    let drag = false, offsetX = 0, offsetY = 0;
    const id = h.dataset.id;
    const win = document.getElementById(id);

    h.addEventListener("mousedown", e => {
      drag = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      win.style.transition = "none";
    });

    document.addEventListener("mousemove", e => {
      if (!drag) return;
      win.style.left = (e.clientX - offsetX) + "px";
      win.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
      if (!drag) return;
      drag = false;
      savePos(id, win.offsetLeft, win.offsetTop);
      win.style.transition = "";
    });
  });

  /* Dock buttons */
  document.querySelectorAll(".ccpro-dock-btn").forEach(btn => {
    btn.onclick = () => {
      const toggle = btn.dataset.toggle;
      const mode = btn.dataset.mode;

      if (toggle) document.getElementById(toggle).classList.toggle("ccpro-hidden");
      if (mode === "compact") document.getElementById("ccpro-root").classList.add("ccpro-compact");
      if (mode === "extended") document.getElementById("ccpro-root").classList.remove("ccpro-compact");
    };
  });
}, 50);
```
