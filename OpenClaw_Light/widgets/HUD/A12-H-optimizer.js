/*
A12-H — HUD Optimizer
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- show optimisé
- score final
- logs d’optimisation
*/

import A12 from "../../A12-optimizer.js";

export default class A12H_OptimizerHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a12h-optimizer">
                <div class="hud-title">SHOW OPTIMIZER</div>

                <div class="hud-section">
                    <div class="hud-label">Score final</div>
                    <div id="a12h-score" class="hud-value">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Show optimisé</div>
                    <pre id="a12h-show" class="hud-code">--</pre>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Logs</div>
                    <ul id="a12h-logs" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(show) {
        const result = A12.optimizeShow(show);

        // Score
        document.getElementById("a12h-score").textContent =
            result.score + "%";

        // Show optimisé
        document.getElementById("a12h-show").textContent =
            JSON.stringify(result.optimizedShow, null, 2);

        // Logs
        const logs = document.getElementById("a12h-logs");
        logs.innerHTML = "";
        result.logs.forEach(l => {
            logs.innerHTML += `<li>${l}</li>`;
        });
    }
}
