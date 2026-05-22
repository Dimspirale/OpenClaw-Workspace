/*
A21-H — HUD Style
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- style d’intensité
- style colorimétrique
- style de position
- style dynamique
- style émotionnel
- style de contraste
- style d’harmonie
- score global de style
*/

import A21 from "../../A21-style.js";

export default class A21H_StyleHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a21h-style">
                <div class="hud-title">STYLE ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Score global de style</div>
                    <div id="a21h-score" class="hud-value">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Signature stylistique</div>
                    <ul id="a21h-styles" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    // contrastData et harmonyData doivent venir de A19 et A20
    update(show, contrastData, harmonyData) {
        const result = A21.analyzeStyle(show, contrastData, harmonyData);

        // Score global
        document.getElementById("a21h-score").textContent =
            result.styleScore + "%";

        // Détails des styles
        const list = document.getElementById("a21h-styles");
        list.innerHTML = "";

        const labels = {
            intensity: "Intensité",
            color: "Couleur",
            position: "Position",
            dynamic: "Dynamique",
            emotional: "Émotionnel",
            contrast: "Contraste",
            harmony: "Harmonie"
        };

        Object.entries(result.styles).forEach(([key, value]) => {
            list.innerHTML += `
                <li>
                    ${labels[key]} : ${value}
                </li>
            `;
        });
    }
}
