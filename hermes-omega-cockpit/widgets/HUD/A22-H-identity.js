/*
A22-H — HUD Identity
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- identité colorimétrique
- identité d’intensité
- identité de position
- identité de contraste
- identité d’harmonie
- synthèse identitaire
- score global d’identité
*/

import A22 from "../../A22-identity.js";

export default class A22H_IdentityHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a22h-identity">
                <div class="hud-title">IDENTITY ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Score global d’identité</div>
                    <div id="a22h-score" class="hud-value">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Signature identitaire</div>
                    <ul id="a22h-identity" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(show, styleData, contrastData, harmonyData) {
        const result = A22.analyzeIdentity(show, styleData, contrastData, harmonyData);

        // Score global
        document.getElementById("a22h-score").textContent =
            result.identityScore + "%";

        // Détails identitaires
        const list = document.getElementById("a22h-identity");
        list.innerHTML = "";

        const labels = {
            color: "Couleur",
            intensity: "Intensité",
            position: "Position",
            contrast: "Contraste",
            harmony: "Harmonie"
        };

        Object.entries(result.identity).forEach(([key, value]) => {
            list.innerHTML += `
                <li>${labels[key]} : ${value}</li>
            `;
        });
    }
}
