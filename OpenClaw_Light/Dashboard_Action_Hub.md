# ⚡ Action Hub PRO v4.0 — Intelligence interne, scoring & priorités

```dataviewjs
/* ========== ANALYSE & SCORING ========== */
const pages = dv.pages('"."');

function scorePage(p) {
  let s = 0;
  if (p.critical) s += 50;
  if (p.status == "delayed") s += 30;
  if (!p.status || !p.module || !p.domain) s += 20;
  if (p.priority) s += Number(p.priority) * 5;
  return s;
}

const analyzed = pages
  .map(p => ({ page: p, score: scorePage(p) }))
  .sort((a, b) => b.score - a.score);

const top5 = analyzed.slice(0, 5);

/* Stats globales */
const ok = pages.where(p => p.status == "done").length;
const warn = pages.where(p => p.status == "warning").length;
const crit = pages.where(p => p.critical).length;
const delayed = pages.where(p => p.status == "delayed").length;
const missing = pages.where(p => !p.status || !p.module || !p.domain).length;

/* ========== LOG SYSTEM ========== */
function ah_log(msg) {
  const logs = JSON.parse(localStorage.getItem("actionhub-logs") || "[]");
  logs.unshift({ msg, time: new Date().toLocaleTimeString() });
  localStorage.setItem("actionhub-logs", JSON.stringify(logs.slice(0, 40)));
  ah_renderLogs();
}

function ah_renderLogs() {
  const logs = JSON.parse(localStorage.getItem("actionhub-logs") || "[]");
  const el = document.getElementById("actionhub-logs");
  if (!el) return;
  el.innerHTML = logs
    .map(l => `<div class="ah-log"><span>${l.time}</span> — ${l.msg}</div>`)
    .join("");
}

/* ========== ACTIONS INTELLIGENTES ========== */
function ah_focusTop() {
  ah_log("Focus sur les éléments à plus forte priorité");
}

function ah_focusCrit() {
  ah_log("Focus sur les éléments critiques");
}

function ah_focusDelayed() {
  ah_log("Focus sur les éléments en retard");
}

/* ========== UI ========== */
dv.el("div", `
<div id="actionhub-root">

  <div id="actionhub-grid-main">
    <button class="ah-btn ah-focus" onclick="ah_focusTop()">🎯 Top Priorités</button>
    <button class="ah-btn ah-focus" onclick="ah_focusCrit()">🔥 Critiques</button>
    <button class="ah-btn ah-focus" onclick="ah_focusDelayed()">⏳ Retards</button>
    <button class="ah-btn ah-focus" onclick="ah_log('Analyse globale exécutée')">📊 Analyse Globale</button>
  </div>

  <div id="actionhub-status">
    <div class="ah-status-item">OK : ${ok}</div>
    <div class="ah-status-item">Warnings : ${warn}</div>
    <div class="ah-status-item">Critiques : ${crit}</div>
    <div class="ah-status-item">Retards : ${delayed}</div>
    <div class="ah-status-item">Incomplets : ${missing}</div>
  </div>

  <div id="actionhub-top">
    <div class="ah-top-title">Top 5 priorités (score interne)</div>
    <div class="ah-top-list">
      ${top5.map(t => `
        <div class="ah-top-item">
          <div class="ah-top-main">
            <span class="ah-top-name">${t.page.file.name}</span>
            <span class="ah-top-score">${t.score}</span>
          </div>
          <div class="ah-top-meta">
            <span>${t.page.status || "no-status"}</span>
            <span>${t.page.module || "no-module"}</span>
            <span>${t.page.domain || "no-domain"}</span>
          </div>
        </div>
      `).join("")}
    </div>
  </div>

  <div id="actionhub-logs" class="ah-logs"></div>

</div>
`);

setTimeout(ah_renderLogs, 50);
```
