/*
A14-H — HUD CueFlow
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- flux cue-to-cue
- transitions
- ruptures
- score global
- suggestions d’amélioration
*/

import A14 from "../../A14-cueflow.js";

export default class A14H_CueFlowHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a14h-cueflow">
                <div class="hud-title">CUEFLOW ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Score global</div>
                    <div id="a14h-score" class="hud-value">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Flux cue-to-cue</div>
                    <ul id="a14h-flow" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Ruptures</div>
                    <ul id="a14h-breaks" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Suggestions</div>
                    <ul id="a14h-suggestions" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(show) {
        const result = A14.generateCueFlow(show);

        // Score global
        document.getElementById("a14h-score").textContent =
            result.globalScore + "%";

        // Flux cue-to-cue
        const flow = document.getElementById("a14h-flow");
        flow.innerHTML = "";
        result.flow.forEach(f => {
            flow.innerHTML += `
                <li>
                    ${f.from} → ${f.to}
                    <br><span style="opacity:0.7;font-size:0.8rem;">
                        ${f.transitions.length > 0 ? f.transitions.join(", ") : "Transition fluide"}
                    </span>
                </li>
            `;
        });

        // Ruptures
        const breaks = document.getElementById("a14h-breaks");
        breaks.innerHTML = "";
        result.breaks.forEach(b => {
            breaks.innerHTML += `
                <li>${b.from} → ${b.to} (score ${b.score})</li>
            `;
        });

        // Suggestions
        const suggestions = document.getElementById("a14h-suggestions");
        suggestions.innerHTML = "";
        result.suggestions.forEach(s => {
            suggestions.innerHTML += `<li>${s}</li>`;
        });
    }
}
