/*
A16-H — HUD Pattern
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- patterns détectés
- signatures lumière
- score global de patternisation
*/

import A16 from "../../A16-pattern.js";

export default class A16H_PatternHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a16h-pattern">
                <div class="hud-title">PATTERN ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Score global</div>
                    <div id="a16h-score" class="hud-value">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Patterns détectés</div>
                    <ul id="a16h-patterns" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Signatures lumière</div>
                    <ul id="a16h-signatures" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(show) {
        const result = A16.analyzePatterns(show);

        // Score global
        document.getElementById("a16h-score").textContent =
            result.score + "%";

        // Patterns détectés
        const patternsList = document.getElementById("a16h-patterns");
        patternsList.innerHTML = "";
        result.patterns.forEach(p => {
            patternsList.innerHTML += `
                <li>
                    Pattern ${p.type} — taille ${p.size}
                    <br><span style="opacity:0.7;font-size:0.8rem;">
                        ${JSON.stringify(p.pattern)}
                    </span>
                </li>
            `;
        });

        // Signatures lumière
        const sigList = document.getElementById("a16h-signatures");
        sigList.innerHTML = "";
        result.signatures.forEach(s => {
            sigList.innerHTML += `
                <li>
                    ${s.description}
                    <br><span style="opacity:0.7;font-size:0.8rem;">
                        à l’index ${s.index}
                    </span>
                </li>
            `;
        });
    }
}
