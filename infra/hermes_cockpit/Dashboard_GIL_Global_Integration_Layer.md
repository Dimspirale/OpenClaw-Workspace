# 🧩 OpenClaw Light — GIL v2.0 (Full Module Integration)

```dataviewjs
/* ============================================================
   GIL CORE API (v2.0)
   ============================================================ */
window.ocl = window.ocl || {};

ocl.set = (k,v) => localStorage.setItem("ocl-"+k, JSON.stringify(v));
ocl.get = (k,def=null) => JSON.parse(localStorage.getItem("ocl-"+k) || JSON.stringify(def));

ocl.pushLog = (msg, source="GIL") => {
  const logs = ocl.get("logs", []);
  logs.unshift({ msg, source, time: new Date().toLocaleTimeString() });
  ocl.set("logs", logs.slice(0, 200));
};

ocl.broadcast = (event, payload={}) => {
  const bus = ocl.get("bus", []);
  bus.unshift({ event, payload, time: Date.now() });
  ocl.set("bus", bus.slice(0, 150));
  ocl.pushLog("Broadcast: "+event, "GIL");
};

/* ============================================================
   GLOBAL STATE SYNC (v2.0)
   ============================================================ */
const pages = dv.pages('"."');
const crit = pages.where(p => p.critical).length;
const delayed = pages.where(p => p.status == "delayed").length;
const missing = pages.where(p => !p.status || !p.module || !p.domain).length;

function level() {
  if (crit >= 5) return "meltdown";
  if (crit > 0) return "critical";
  if (delayed > 0) return "danger";
  if (missing > 0) return "warning";
  return "none";
}

function intensity() {
  const t = crit + delayed + missing;
  if (t === 0) return 0;
  if (t <= 3) return 1;
  if (t <= 8) return 2;
  if (t <= 15) return 3;
  return 4;
}

/* Écriture dans l’état global partagé */
ocl.set("alert-level", level());
ocl.set("alert-intensity", intensity());
ocl.set("alert-counts", { crit, delayed, missing });

/* Modes globaux */
if (ocl.get("mode-blackout") === null) ocl.set("mode-blackout", false);
if (ocl.get("mode-overdrive") === null) ocl.set("mode-overdrive", false);

/* ============================================================
   MODULE INTEGRATION (v2.0)
   ============================================================ */

/* Command Center PRO écoute : */
ocl.set("ccpro-state", {
  level: ocl.get("alert-level"),
  intensity: ocl.get("alert-intensity"),
  blackout: ocl.get("mode-blackout"),
  overdrive: ocl.get("mode-overdrive")
});

/* Action Hub PRO écoute : */
ocl.set("actionhub-state", {
  alerts: ocl.get("alert-counts"),
  level: ocl.get("alert-level"),
  bus: ocl.get("bus", []).slice(0, 20)
});

/* Alert Engine PRO écrit : */
ocl.set("alertengine-state", {
  level: ocl.get("alert-level"),
  intensity: ocl.get("alert-intensity"),
  counts: ocl.get("alert-counts")
});

/* ============================================================
   GIL UI
   ============================================================ */
const logs = ocl.get("logs", []);
const bus = ocl.get("bus", []);
const blackout = ocl.get("mode-blackout", false);
const overdrive = ocl.get("mode-overdrive", false);

dv.el("div", `
<div id="gil-root"
     class="gil-level-${level()} gil-intensity-${intensity()}
            ${blackout?"gil-blackout":""}
            ${overdrive?"gil-overdrive":""}">

  <div id="gil-header">
    <div class="gil-title">OpenClaw Light — GIL v2.0</div>
    <div class="gil-subtitle">Full Integration Layer</div>
  </div>

  <div id="gil-summary">
    <div class="gil-pill gil-pill-crit">🔥 ${crit}</div>
    <div class="gil-pill gil-pill-delayed">⏳ ${delayed}</div>
    <div class="gil-pill gil-pill-missing">⚠️ ${missing}</div>
    <div class="gil-pill gil-pill-level">LVL: ${level().toUpperCase()}</div>
    <div class="gil-pill gil-pill-intensity">INT: ${intensity()}</div>
  </div>

  <div id="gil-modes">
    <button class="gil-btn ${blackout?"gil-on":""}"
            onclick="ocl.set('mode-blackout',!ocl.get('mode-blackout')); ocl.broadcast('mode-blackout-toggle',{value:ocl.get('mode-blackout')});">
      🛑 Blackout
    </button>
    <button class="gil-btn ${overdrive?"gil-on":""}"
            onclick="ocl.set('mode-overdrive',!ocl.get('mode-overdrive')); ocl.broadcast('mode-overdrive-toggle',{value:ocl.get('mode-overdrive')});">
      ⚡ Overdrive
    </button>
  </div>

  <div id="gil-bus">
    ${bus.slice(0,10).map(e => `
      <div class="gil-bus-item">
        <span class="gil-bus-event">${e.event}</span>
        <span class="gil-bus-time">${new Date(e.time).toLocaleTimeString()}</span>
      </div>
    `).join("")}
  </div>

  <div id="gil-logs">
    ${logs.slice(0,12).map(l => `
      <div class="gil-log-item">
        <span class="gil-log-time">${l.time}</span>
        <span class="gil-log-source">[${l.source}]</span>
        <span class="gil-log-msg">${l.msg}</span>
      </div>
    `).join("")}
  </div>

</div>
`);
```
