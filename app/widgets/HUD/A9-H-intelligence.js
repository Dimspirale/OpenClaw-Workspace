/*
A9-H — HUD Intelligence
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- score du preset
- incohérences
- patterns
- suggestions
- comparaisons
*/

import A9 from "../../core/A9-intelligence.js";

export default class A9H_IntelligenceHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a9h-intelligence">
                <div class="hud-title">INTELLIGENCE</div>

                <div class="hud-section">
                    <div class="hud-label">Score</div>
                    <div id="a9h-score" class="hud-value">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Incohérences</div>
                    <ul id="a9h-issues" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Patterns</div>
                    <ul id="a9h-patterns" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Suggestions</div>
                    <ul id="a9h-suggestions" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Comparaisons</div>
                    <ul id="a9h-cross" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(preset, allPresets) {
        const analysis = A9.fullAnalysis(preset, allPresets);

        // Score
        document.getElementById("a9h-score").textContent = analysis.score;

        // Incohérences
        const issues = document.getElementById("a9h-issues");
        issues.innerHTML = "";
        analysis.structural.issues.forEach(i => {
            issues.innerHTML += `<li>${i}</li>`;
        });

        // Patterns
        const patterns = document.getElementById("a9h-patterns");
        patterns.innerHTML = "";
        const p = A9.detectPatterns(allPresets);
        Object.entries(p.repeatedColors).forEach(([color, count]) => {
            if (count > 1) patterns.innerHTML += `<li>Couleur répétée : ${color} (${count}×)</li>`;
        });

        Object.entries(p.repeatedPositions).forEach(([pos, count]) => {
            if (count > 1) patterns.innerHTML += `<li>Position répétée : ${pos} (${count}×)</li>`;
        });

        // Suggestions
        const suggestions = document.getElementById("a9h-suggestions");
        suggestions.innerHTML = "";
        analysis.suggestions.forEach(s => {
            suggestions.innerHTML += `<li>${s}</li>`;
        });

        // Comparaisons
        const cross = document.getElementById("a9h-cross");
        cross.innerHTML = "";
        analysis.cross.forEach((c, i) => {
            cross.innerHTML += `<li>Preset ${i+1} : similarité ${c.similarity}%</li>`;
        });
    }
}
