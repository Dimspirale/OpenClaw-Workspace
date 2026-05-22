/*
A17-H — HUD Emotion
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- tonalité émotionnelle des cues
- arcs émotionnels
- tension moyenne
- score émotionnel global
*/

import A17 from "../../A17-emotion.js";

export default class A17H_EmotionHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a17h-emotion">
                <div class="hud-title">EMOTION ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Score émotionnel global</div>
                    <div id="a17h-score" class="hud-value">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Tension moyenne</div>
                    <div id="a17h-tension" class="hud-subvalue">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Tonalité émotionnelle des cues</div>
                    <ul id="a17h-cues" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Arcs émotionnels</div>
                    <ul id="a17h-arcs" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(show) {
        const result = A17.analyzeEmotion(show);

        // Score émotionnel global
        document.getElementById("a17h-score").textContent =
            result.emotionScore + "%";

        // Tension moyenne
        document.getElementById("a17h-tension").textContent =
            result.averageTension;

        // Tonalité émotionnelle des cues
        const cuesList = document.getElementById("a17h-cues");
        cuesList.innerHTML = "";
        result.cues.forEach(c => {
            cuesList.innerHTML += `
                <li>
                    ${c.name}
                    <br><span style="opacity:0.7;font-size:0.8rem;">
                        Intensité : ${c.emotionIntensity} — Couleur : ${c.emotionColor}
                    </span>
                </li>
            `;
        });

        // Arcs émotionnels
        const arcsList = document.getElementById("a17h-arcs");
        arcsList.innerHTML = "";
        result.arcs.forEach(a => {
            arcsList.innerHTML += `
                <li>
                    ${a.from} → ${a.to}
                    <br><span style="opacity:0.7;font-size:0.8rem;">
                        Tension : ${a.tension}
                    </span>
                </li>
            `;
        });
    }
}
