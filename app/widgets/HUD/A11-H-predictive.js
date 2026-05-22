/*
A11-H — HUD Predictive
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- risque d’erreur
- tendance d’intensité
- stabilité globale
- prédiction complète
*/

import A11 from "../../A11-predictive.js";

export default class A11H_PredictiveHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a11h-predictive">
                <div class="hud-title">PREDICTIVE ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Risque d'erreur</div>
                    <div id="a11h-risk" class="hud-value">--</div>
                    <ul id="a11h-risk-factors" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Tendance d'intensité</div>
                    <div id="a11h-trend" class="hud-value">--</div>
                    <ul id="a11h-trend-details" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Stabilité globale</div>
                    <div id="a11h-stability" class="hud-value">--</div>
                    <div id="a11h-stability-comment" class="hud-subvalue">--</div>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(preset, allPresets = []) {
        const prediction = A11.fullPrediction(preset, allPresets);

        // Risque d'erreur
        document.getElementById("a11h-risk").textContent =
            prediction.errorRisk.risk + "%";

        const riskList = document.getElementById("a11h-risk-factors");
        riskList.innerHTML = "";
        prediction.errorRisk.factors.forEach(f => {
            riskList.innerHTML += `<li>${f}</li>`;
        });

        // Tendance d'intensité
        document.getElementById("a11h-trend").textContent =
            prediction.trend.trend;

        const trendDetails = document.getElementById("a11h-trend-details");
        trendDetails.innerHTML = `
            <li>Moyenne Δ : ${prediction.trend.averageDelta.toFixed(2)}</li>
            <li>${prediction.trend.comment}</li>
        `;

        // Stabilité
        document.getElementById("a11h-stability").textContent =
            prediction.stability.stability + "%";

        document.getElementById("a11h-stability-comment").textContent =
            prediction.stability.comment;
    }
}
