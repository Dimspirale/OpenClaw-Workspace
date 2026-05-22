/*
A13-H — HUD Timeline
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- timeline optimisée
- durées entre événements
- conflits temporels
- corrections temporelles
*/

import A13 from "../../A13-timeline.js";

export default class A13H_TimelineHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a13h-timeline">
                <div class="hud-title">TIMELINE ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Timeline optimisée</div>
                    <pre id="a13h-timeline" class="hud-code">--</pre>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Durées</div>
                    <ul id="a13h-durations" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Conflits</div>
                    <ul id="a13h-conflicts" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Optimisation</div>
                    <div id="a13h-optimization" class="hud-subvalue">--</div>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(events) {
        const result = A13.generateTimeline(events);

        // Timeline optimisée
        document.getElementById("a13h-timeline").textContent =
            JSON.stringify(result.timeline, null, 2);

        // Durées
        const durations = document.getElementById("a13h-durations");
        durations.innerHTML = "";
        result.durations.forEach(d => {
            durations.innerHTML += `<li>Événement ${d.from} → ${d.to} : ${d.duration} ms</li>`;
        });

        // Conflits
        const conflicts = document.getElementById("a13h-conflicts");
        conflicts.innerHTML = "";
        result.conflicts.forEach(c => {
            conflicts.innerHTML += `<li>${c.message} (t=${c.time})</li>`;
        });

        // Optimisation
        document.getElementById("a13h-optimization").textContent =
            result.optimization;
    }
}
