/*
A15-H — HUD Scene
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- scènes détectées
- cues par scène
- scores de cohérence
- ruptures scéniques
*/

import A15 from "../../A15-scene.js";

export default class A15H_SceneHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a15h-scene">
                <div class="hud-title">SCENE ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Nombre total de scènes</div>
                    <div id="a15h-total" class="hud-value">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Scènes détectées</div>
                    <ul id="a15h-scenes" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Scores de cohérence</div>
                    <ul id="a15h-scores" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(show) {
        const result = A15.generateSceneStructure(show);

        // Nombre total de scènes
        document.getElementById("a15h-total").textContent =
            result.totalScenes;

        // Scènes
        const scenesList = document.getElementById("a15h-scenes");
        scenesList.innerHTML = "";
        result.scenes.forEach((scene, index) => {
            scenesList.innerHTML += `
                <li>
                    Scène ${index + 1} — ${scene.length} cues
                </li>
            `;
        });

        // Scores
        const scoresList = document.getElementById("a15h-scores");
        scoresList.innerHTML = "";
        result.analysis.forEach(s => {
            scoresList.innerHTML += `
                <li>
                    Scène ${s.index + 1} : ${s.score}%
                </li>
            `;
        });
    }
}
