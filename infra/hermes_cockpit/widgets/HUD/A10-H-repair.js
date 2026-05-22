/*
A10-H — HUD Repair
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- réparations
- corrections
- reconstructions
- harmonisations
- logs
*/

import A10 from "../../A10-repair.js";

export default class A10H_RepairHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a10h-repair">
                <div class="hud-title">REPAIR ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Preset réparé</div>
                    <pre id="a10h-repaired" class="hud-code">--</pre>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Logs</div>
                    <ul id="a10h-logs" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(preset, reference = null) {
        const result = A10.fullRepair(preset, reference);

        // Preset réparé
        const repaired = document.getElementById("a10h-repaired");
        repaired.textContent = JSON.stringify(result.repaired, null, 2);

        // Logs
        const logs = document.getElementById("a10h-logs");
        logs.innerHTML = "";
        result.logs.forEach(l => {
            logs.innerHTML += `<li>${l}</li>`;
        });
    }
}
