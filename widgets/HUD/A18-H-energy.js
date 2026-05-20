/*
A18-H — HUD Energy
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche en temps réel :
- énergie instantanée (série)
- boosts / drops
- zones de repos
- cycles énergétiques
- score énergétique global
*/

import A18 from "../../A18-energy.js";

export default class A18H_EnergyHUD {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    // --- Structure visuelle ---
    renderBase() {
        this.container.innerHTML = `
            <div class="hud-block a18h-energy">
                <div class="hud-title">ENERGY ENGINE</div>

                <div class="hud-section">
                    <div class="hud-label">Score énergétique global</div>
                    <div id="a18h-score" class="hud-value">--</div>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Énergie instantanée</div>
                    <pre id="a18h-series" class="hud-code">--</pre>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Boosts / Drops</div>
                    <ul id="a18h-transitions" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Zones de repos</div>
                    <ul id="a18h-rest" class="hud-list"></ul>
                </div>

                <div class="hud-section">
                    <div class="hud-label">Cycles énergétiques</div>
                    <ul id="a18h-cycles" class="hud-list"></ul>
                </div>
            </div>
        `;
    }

    // --- Mise à jour en temps réel ---
    update(show) {
        const result = A18.analyzeEnergy(show);

        // Score énergétique global
        document.getElementById("a18h-score").textContent =
            result.energyScore + "%";

        // Série énergétique
        document.getElementById("a18h-series").textContent =
            JSON.stringify(result.series, null, 2);

        // Boosts / Drops
        const transitionsList = document.getElementById("a18h-transitions");
        transitionsList.innerHTML = "";
        result.transitions.forEach(t => {
            transitionsList.innerHTML += `
                <li>
                    ${t.type.toUpperCase()} à l’index ${t.index}
                    <br><span style="opacity:0.7;font-size:0.8rem;">
                        Δ ${t.delta}
                    </span>
                </li>
            `;
        });

        // Zones de repos
        const restList = document.getElementById("a18h-rest");
        restList.innerHTML = "";
        result.restZones.forEach(zone => {
            restList.innerHTML += `
                <li>Repos : index ${zone[0]} → ${zone[zone.length - 1]}</li>
            `;
        });

        // Cycles énergétiques
        const cyclesList = document.getElementById("a18h-cycles");
        cyclesList.innerHTML = "";
        result.cycles.forEach(c => {
            cyclesList.innerHTML += `
                <li>
                    Cycle ${c.direction}
                    <br><span style="opacity:0.7;font-size:0.8rem;">
                        ${c.from} → ${c.to}
                    </span>
                </li>
            `;
        });
    }
}
