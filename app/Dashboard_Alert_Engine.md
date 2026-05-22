# 🚨 Alert Engine PRO v5.0 — Escalade automatique, corrélation, prévisionnel

```dataviewjs
/* ========== DATA BRUTE ========== */
const pages = dv.pages('"."');
const crit = pages.where(p => p.critical).length;
const delayed = pages.where(p => p.status == "delayed").length;
const missing = pages.where(p => !p.status || !p.module || !p.domain).length;

/* ========== PERSISTENT STATE ========== */
function ae_set(key, value) {
  localStorage.setItem("alertengine-" + key, JSON.stringify(value));
}
function ae_get(key, def = null) {
  const v = localStorage.getItem("alertengine-" + key);
  return v ? JSON.parse(v) : def;
}

/* ========== LOG SYSTEM ========== */
function ae_log(msg) {
  const logs = ae_get("logs", []);
  logs.unshift({ msg, time: new Date().toLocaleTimeString() });
  ae_set("logs", logs.slice(0, 100));
  ae_renderLogs();
}

function ae_renderLogs() {
  const logs = ae_get("logs", []);
  const el = document.getElementById("ae-logs");
  if (!el) return;
  el.innerHTML = logs
    .map(l => `<div class="ae-log"><span>${l.time}</span> — ${l.msg}</div>`)
    .join("");
}

/* ========== NIVEAU & INTENSITÉ ========== */
function ae_level() {
  if (crit >= 5) return "meltdown";
  if (crit > 0) return "critical";
  if (delayed > 0) return "danger";
  if (missing > 0) return "warning";
  return "none";
}

function ae_intensity() {
  const total = crit + delayed + missing;
  if (total === 0) return 0;
  if (total <= 3) return 1;
  if (total <= 8) return 2;
  if (total <= 15) return 3;
  return 4;
}

/* ========== ESCALADE AUTOMATIQUE ========== */
function ae_escalate(level) {
  const history = ae_get("history", []);
  history.unshift({ level, time: Date.now() });
  ae_set("history", history.slice(0, 50));

  const last3 = history.slice(0, 3).map(h => h.level);
  const allHigh = last3.every(l => ["danger","critical","meltdown"].includes(l));
  if (allHigh && last3.length === 3) {
    ae_log("🚨 Escalade automatique : niveau élevé maintenu sur 3 cycles");
    ae_set("escalated", true);
  }
}

/* ========== CORRÉLATION SIMPLE ========== */
function ae_correlation() {
  const byModule = {};
  pages.forEach(p => {
    const m = p.module || "no-module";
    if (!byModule[m]) byModule[m] = { crit:0, delayed:0, missing:0 };
    if (p.critical) byModule[m].crit++;
    if (p.status == "delayed") byModule[m].delayed++;
    if (!p.status || !p.module || !p.domain) byModule[m].missing++;
  });
  return Object.entries(byModule)
    .map(([k,v]) => ({ module:k, ...v }))
    .sort((a,b) => (b.crit + b.delayed + b.missing) - (a.crit + a.delayed + a.missing))
    .slice(0,5);
}

const correlated = ae_correlation();

/* ========== PRÉVISIONNEL SIMPLE ========== */
function ae_forecast() {
  const history = ae_get("history", []);
  if (history.length < 3) return "Données insuffisantes";
  const highCount = history.filter(h => ["danger","critical","meltdown"].includes(h.level)).length;
  if (highCount / history.length > 0.6) return "Risque élevé de maintien ou aggravation";
  if (highCount / history.length > 0.3) return "Risque modéré de tensions persistantes";
  return "Tendance à la normalisation";
}

/* ========== MODES ========== */
function ae_toggleBlackout() {
  const current = ae_get("blackout", false);
  ae_set("blackout", !current);
  ae_log(!current ? "🛑 Blackout activé" : "☑️ Blackout désactivé");
  ae_applyModes();
}

function ae_toggleOverdrive() {
  const current = ae_get("overdrive", false);
  ae_set("overdrive", !current);
  ae_log(!current ? "⚡ Overdrive activé" : "☑️ Overdrive désactivé");
  ae_applyModes();
}

function ae_applyModes() {
  const root = document.getElementById("ae-root");
  if (!root) return;
  root.classList.toggle("ae-blackout", ae_get("blackout", false));
  root.classList.toggle("ae-overdrive", ae_get("overdrive", false));
}

/* ========== AUTO-DETECTION + ESCALADE ========== */
function ae_detect() {
  const lvl = ae_level();
  const intensity = ae_intensity();

  if (lvl === "meltdown") ae_log("💀 MELTDOWN — Critiques massifs : " + crit);
  else if (lvl === "critical") ae_log("🔥 CRITICAL — Critiques : " + crit);
  else if (lvl === "danger") ae_log("⚠️ DANGER — Retards : " + delayed);
  else if (lvl === "warning") ae_log("⚡ WARNING — Incomplets : " + missing);

  ae_set("last-level", lvl);
  ae_set("last-intensity", intensity);
  ae_escalate(lvl);
}

/* Auto-check toutes les 10 secondes */
setInterval(ae_detect, 10000);

/* ========== UI ========== */
const level = ae_level();
const intensity = ae_intensity();
const forecast = ae_forecast();
const escalated = ae_get("escalated", false);

dv.el("div", `
<div id="ae-root"
     class="ae-level-${level} ae-intensity-${intensity}
            ${ae_get("blackout",false)?"ae-blackout":""}
            ${ae_get("overdrive",false)?"ae-overdrive":""}
            ${escalated?"ae-escalated":""}">

  <div id="ae-hud">
    <div class="ae-hud-item ae-hud-critical">🔥 ${crit}</div>
    <div class="ae-hud-item ae-hud-delayed">⏳ ${delayed}</div>
    <div class="ae-hud-item ae-hud-missing">⚠️ ${missing}</div>
    <div class="ae-hud-item ae-hud-level">LVL: ${level.toUpperCase()}</div>
  </div>

  <div id="ae-counters">
    <div class="ae-counter ae-critical">🔥 Critiques : ${crit}</div>
    <div class="ae-counter ae-delayed">⏳ Retards : ${delayed}</div>
    <div class="ae-counter ae-missing">⚠️ Incomplets : ${missing}</div>
  </div>

  <div id="ae-forecast">
    <div class="ae-forecast-title">Prévisionnel</div>
    <div class="ae-forecast-body">${forecast}</div>
  </div>

  <div id="ae-correlation">
    <div class="ae-corr-title">Modules les plus corrélés aux alertes</div>
    <div class="ae-corr-list">
      ${correlated.map(c => `
        <div class="ae-corr-item">
          <div class="ae-corr-main">
            <span class="ae-corr-name">${c.module}</span>
            <span class="ae-corr-score">${c.crit + c.delayed + c.missing}</span>
          </div>
          <div class="ae-corr-meta">
            <span>Critiques: ${c.crit}</span>
            <span>Retards: ${c.delayed}</span>
            <span>Incomplets: ${c.missing}</span>
          </div>
        </div>
      `).join("")}
    </div>
  </div>

  <div id="ae-actions">
    <button class="ae-btn" onclick="ae_detect()">🔍 Scanner</button>
    <button class="ae-btn" onclick="ae_set('logs',[]); ae_renderLogs()">♻️ Reset logs</button>
    <button class="ae-btn ae-btn-blackout" onclick="ae_toggleBlackout()">🛑 Blackout</button>
    <button class="ae-btn ae-btn-overdrive" onclick="ae_toggleOverdrive()">⚡ Overdrive</button>
    <button class="ae-btn ae-btn-reset-escalate" onclick="ae_set('escalated',false); ae_log('Escalade réinitialisée')">⏬ Reset escalade</button>
  </div>

  <div id="ae-logs" class="ae-logs"></div>

</div>
`);

setTimeout(() => {
  ae_renderLogs();
  ae_applyModes();
}, 50);
```
