/*
HUD MASTER A1 → A22
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Vue unifiée de tous les moteurs A1 → A22 :
- Technique (A1 → A5)
- Intelligence (A6 → A12)
- Structure (A13 → A17)
- Dynamique (A18 → A20)
- Style & Identité (A21 → A22)
*/

export default class HUD_MASTER_A1_A22 {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    renderBase() {
        this.container.innerHTML = `
            <div class="hud-master">

                <!-- SECTION 1 : TECHNIQUE -->
                <div class="hud-master-section">
                    <div class="hud-master-title">TECHNIQUE — A1 → A5</div>
                    <ul id="hud-master-tech" class="hud-master-list"></ul>
                </div>

                <!-- SECTION 2 : INTELLIGENCE -->
                <div class="hud-master-section">
                    <div class="hud-master-title">INTELLIGENCE — A6 → A12</div>
                    <ul id="hud-master-intel" class="hud-master-list"></ul>
                </div>

                <!-- SECTION 3 : STRUCTURE -->
                <div class="hud-master-section">
                    <div class="hud-master-title">STRUCTURE — A13 → A17</div>
                    <ul id="hud-master-struct" class="hud-master-list"></ul>
                </div>

                <!-- SECTION 4 : DYNAMIQUE -->
                <div class="hud-master-section">
                    <div class="hud-master-title">DYNAMIQUE — A18 → A20</div>
                    <ul id="hud-master-dyn" class="hud-master-list"></ul>
                </div>

                <!-- SECTION 5 : STYLE & IDENTITÉ -->
                <div class="hud-master-section">
                    <div class="hud-master-title">STYLE & IDENTITÉ — A21 → A22</div>
                    <ul id="hud-master-style" class="hud-master-list"></ul>
                </div>

            </div>
        `;
    }

    // update() reçoit TOUS les résultats déjà calculés par les moteurs
    update(results) {

        // --- A1 → A5 : Technique ---
        const tech = document.getElementById("hud-master-tech");
        tech.innerHTML = `
            <li>Erreurs : ${results.A3?.errors?.length ?? 0}</li>
            <li>Dominante couleur : ${results.A4?.dominant ?? "--"}</li>
            <li>FX détectés : ${results.A5?.fxCount ?? 0}</li>
        `;

        // --- A6 → A12 : Intelligence ---
        const intel = document.getElementById("hud-master-intel");
        intel.innerHTML = `
            <li>Risques : ${results.A7?.riskScore ?? "--"}%</li>
            <li>Stabilité : ${results.A8?.stabilityScore ?? "--"}%</li>
            <li>Optimisation : ${results.A12?.optimizerScore ?? "--"}%</li>
        `;

        // --- A13 → A17 : Structure ---
        const struct = document.getElementById("hud-master-struct");
        struct.innerHTML = `
            <li>Scènes : ${results.A15?.sceneCount ?? "--"}</li>
            <li>Patterns : ${results.A16?.patternCount ?? "--"}</li>
            <li>Émotion : ${results.A17?.emotionScore ?? "--"}%</li>
        `;

        // --- A18 → A20 : Dynamique ---
        const dyn = document.getElementById("hud-master-dyn");
        dyn.innerHTML = `
            <li>Énergie : ${results.A18?.energyScore ?? "--"}%</li>
            <li>Contraste : ${results.A19?.contrastScore ?? "--"}%</li>
            <li>Harmonie : ${results.A20?.harmonyScore ?? "--"}%</li>
        `;

        // --- A21 → A22 : Style & Identité ---
        const style = document.getElementById("hud-master-style");
        style.innerHTML = `
            <li>Style : ${results.A21?.styleScore ?? "--"}%</li>
            <li>Identité : ${results.A22?.identityScore ?? "--"}%</li>
        `;
    }
}
