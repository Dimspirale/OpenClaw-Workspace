/*
A20-H — HUD Harmony
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- harmonie colorimétrique
- harmonie d’intensité
- harmonie de position
- harmonie émotionnelle
- harmonie dynamique
- score global d’harmonie
*/

import A20 from "../../A20-harmony.js";

export default class A20H_HarmonyHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a20h-harmony">
                <div class="hud-title">HARMONY ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Score global d’harmonie</div>
                    <div id="a20h-score" class="hud-value">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Transitions harmonisées</div>
                    <ul id="a20h-harmony" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(show) {
        const result = A20.analyzeHarmony(show);

        // Score global
        document.getElementById("a20h-score").textContent =
            result.harmonyScore + "%";

        // Détails des harmonies
        const list = document.getElementById("a20h-harmony");
        list.innerHTML = "";
        result.harmony.forEach(h => {
            list.innerHTML += `
                <li>
                    ${h.from} → ${h.to}
                    <br><span style="opacity:0.7;font-size:0.8rem;">
                        Couleur: ${h.color} | Intensité: ${h.intensity} | Position: ${h.position}
                        <br>Émotion: ${h.emotional} | Dynamique: ${h.dynamic}
                    </span>
                </li>
            `;
        });
    }
}
