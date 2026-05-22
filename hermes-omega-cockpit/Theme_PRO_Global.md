# 🎨 Theme PRO Global v9.0 — Vision holographique (parallax, profondeur 3D, couches flottantes)

```dataviewjs
/* ============================================================
   THEME PRO v9.0 — VISION HOLOGRAPHIQUE
   ============================================================ */

window.ocl = window.ocl || {};

/* Récupération des données globales */
const lvl = ocl.get("alert-level", "none");
const intensity = ocl.get("alert-intensity", 0);
const predicted = ocl.get("theme-predictive", {}).predicted || "none";
const adaptive = ocl.get("theme-adaptive", {});

/* ============================================================
   1) Profondeur holographique (Z‑Depth)
   ============================================================ */

const holoDepth = {
  none:      2,
  warning:   4,
  danger:    6,
  critical:  8,
  meltdown:  12
};

/* ============================================================
   2) Glow volumétrique (halo 3D)
   ============================================================ */

const holoGlow = {
  none:      "0 0 12px rgba(56,189,248,0.25)",
  warning:   "0 0 16px rgba(234,179,8,0.35)",
  danger:    "0 0 20px rgba(251,146,60,0.45)",
  critical:  "0 0 24px rgba(248,113,113,0.55)",
  meltdown:  "0 0 32px rgba(239,68,68,0.75)"
};

/* ============================================================
   3) Parallax 3D (réactivité à la souris)
   ============================================================ */

function holoParallax() {
  document.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    ocl.set("theme-holo-parallax", { x, y });
  });
}

holoParallax();

/* ============================================================
   4) Injection dans le thème maître
   ============================================================ */

ocl.set("theme-holographic", {
  depth: holoDepth[lvl],
  glow: holoGlow[lvl],
  accent: adaptive.accent || "#38bdf8",
  parallax: ocl.get("theme-holo-parallax", { x:0, y:0 })
});

/* Broadcast global */
ocl.broadcast("theme-holographic-updated", ocl.get("theme-holographic"));

/* Preview */
const holo = ocl.get("theme-holographic");

dv.el("div", `
<div class="themepro9-preview">
  <div class="themepro9-title">Theme PRO Global v9.0</div>
  <div class="themepro9-sub">Vision holographique active</div>

  <div class="themepro9-box">
    Profondeur 3D : ${holo.depth}<br>
    Glow volumétrique : ${holo.glow}<br>
    Accent : ${holo.accent}<br>
    Parallax : x=${holo.parallax.x.toFixed(2)}, y=${holo.parallax.y.toFixed(2)}
  </div>
</div>
`);
```
