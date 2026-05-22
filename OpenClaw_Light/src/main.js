#!/usr/bin/env node

/**
 * OpenClaw_Light – Point d’entrée professionnel
 * Version: 0.5.0 (Hermès Routing + HyperPrime + Profile Support)
 *
 * Ce fichier unifie :
 *  - les modules JS A9–A22
 *  - les modules Hermès .ocm
 *  - le cockpit (BOOT_SEQUENCE.sh)
 *  - les extensions PRIME+ (HyperPrime)
 *
 * Usage:
 *   openclaw run [DEV|SHOW|TOUR]
 *   openclaw status
 *   openclaw ingest <path>
 *
 * Appels automatiques:
 *   CORE_ENGINE, HUD_ENGINE, HERMES_GPU_MONITOR, etc.
 *   HERMES_HYPER_PRIME
 */

const { execSync } = require("child_process");
const path = require("path");

// ============================================================
//  MODULES JS A9–A22
// ============================================================
const modules = {
  repair: require("../A10-repair.js"),
  predictive: require("../A11-predictive.js"),
  optimizer: require("../A12-optimizer.js"),
  timeline: require("../A13-timeline.js"),
  cueflow: require("../A14-cueflow.js"),
  scene: require("../A15-scene.js"),
  pattern: require("../A16-pattern.js"),
  emotion: require("../A17-emotion.js"),
  energy: require("../A18-energy.js"),
  contrast: require("../A19-contrast.js"),
  harmony: require("../A20-harmony.js"),
  style: require("../A21-style.js"),
  identity: require("../A22-identity.js"),
  intelligence: require("../A9-intelligence.js"),
};

// ============================================================
//  ROUTAGE HERMÈS
// ============================================================
const PROJECT_ROOT = path.join(process.env.HOME, "OpenClaw_Light");
const ENGINE_DIR = path.join(PROJECT_ROOT, "ENGINE");

const HERMES_MODULES = {
  "HUD_ENGINE": "HUD_ENGINE.ocm",
  "HERMES_GPU_MONITOR": "HERMES_GPU_MONITOR.ocm",
  "HERMES_SYSTEM_MONITOR_TOTAL": "HERMES_SYSTEM_MONITOR_TOTAL.ocm",
  "HERMES_DASHBOARD": "HERMES_DASHBOARD.ocm",
  "HERMES_DASHBOARD_GPU": "HERMES_DASHBOARD_GPU.ocm",
  "HERMES_OS": "HERMES_OS.ocm",
  "HERMES_ENGINE": "HERMES_ENGINE.ocm",
  "HERMES_LISTENER": "HERMES_LISTENER.ocm",
  "HERMES_COCKPIT_MASTER_TOTAL_v4": "HERMES_COCKPIT_MASTER_TOTAL_v4.ocm",
  "CORE_ENGINE": "CORE_ENGINE.ocm",
  "HERMES_HYPER_PRIME": "HERMES_HYPER_PRIME.ocm"
};

// ============================================================
//  CLI
// ============================================================
const args = process.argv.slice(2);
const command = args[0];

// ============================================================
//  ROUTAGE AUTOMATIQUE DES MODULES HERMÈS
// ============================================================
if (HERMES_MODULES[command]) {
  const modulePath = path.join(ENGINE_DIR, HERMES_MODULES[command]);
  const extraArgs = args.slice(1).join(" ");

  try {
    execSync(`bash "${modulePath}" ${extraArgs}`, { stdio: "inherit" });
  } catch (err) {
    console.error(`[ERR] Module Hermès ${command} a échoué.`);
    process.exit(1);
  }

  process.exit(0);
}

// ============================================================
//  COCKPIT
// ============================================================
function runCockpit(profile = "DEV") {
  const scriptPath = path.join(__dirname, "../cockpit/BOOT_SEQUENCE.sh");
  console.log(`[OpenClaw] Lancement cockpit via BOOT_SEQUENCE.sh avec profil ${profile}...`);
  execSync(`bash "${scriptPath}" ${profile}`, { stdio: "inherit" });
}

function showStatus() {
  console.log("=== OpenClaw_Light Status ===");
  console.log("Modules JS:", Object.keys(modules).join(", "));
  console.log("Modules Hermès:", Object.keys(HERMES_MODULES).join(", "));
  console.log("Cockpit: BOOT_SEQUENCE.sh prêt (profils: DEV, SHOW, TOUR)");
}

function ingest(pathArg) {
  if (!pathArg) {
    console.error("[OpenClaw] Aucun chemin fourni pour ingestion.");
    process.exit(1);
  }
  console.log(`[OpenClaw] Ingestion de la source: ${pathArg}`);
}

// ============================================================
//  COMMANDES PRINCIPALES
// ============================================================
switch (command) {
  case "run":
    runCockpit(args[1] || "DEV");
    break;

  case "status":
    showStatus();
    break;

  case "ingest":
    ingest(args[1]);
    break;

  default:
    console.log("Usage: openclaw <run [DEV|SHOW|TOUR]|status|ingest <path>>");
    process.exit(1);
}
