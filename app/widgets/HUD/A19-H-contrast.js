/*
A19-H — HUD Contrast
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- contrastes d’intensité
- contrastes de couleur
- contrastes de position
- contrastes dynamiques
- contrastes émotionnels
- score global de contraste
*/

import A19 from "../../A19-contrast.js";

export default class A19H_ContrastHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a19h-contrast">
                <div class="hud-title">CONTRAST ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Score global de contraste</div>
                    <div id="a19h-score" class="hud-value">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Contrastes cue-to-cue</div>
                    <ul id="a19h-contrasts" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(show) {
        const result = A19.analyzeContrast(show);

        // Score global
        document.getElementById("a19h-score").textContent =
            result.contrastScore + "%";

        // Contrastes
        const list = document.getElementById("a19h-contrasts");
        list.innerHTML = "";
        result.contrasts.forEach(c => {
            list.innerHTML += `
                <li>
                    ${c.from} → ${c.to}
                    <br><span style="opacity:0.7;font-size:0.8rem;">
                        Intensité: ${c.intensity} | Couleur: ${c.color} | Position: ${c.position}
                        <br>Dyn.: ${c.dynamic} | Émotion: ${c.emotional}
                    </span>
                </li>
            `;
        });
    }
}
