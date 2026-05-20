/*
HUD MASTER EXTENDED A1 → A22
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Vue cockpit augmentée :
- jauges circulaires
- barres d’énergie
- mini-graphes
- scores A1 → A22
- synthèse totale
*/

export default class HUD_MASTER_EXTENDED_A1_A22 {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    renderBase() {
        this.container.innerHTML = `
            <div class="hud-master-extended">

                <!-- GAUGES -->
                <div class="hud-master-gauges">
                    <div class="gauge" id="g-energy">
                        <div class="gauge-value" id="g-energy-val">--</div>
                        <div class="gauge-label">ÉNERGIE</div>
                    </div>

                    <div class="gauge" id="g-contrast">
                        <div class="gauge-value" id="g-contrast-val">--</div>
                        <div class="gauge-label">CONTRASTE</div>
                    </div>

                    <div class="gauge" id="g-harmony">
                        <div class="gauge-value" id="g-harmony-val">--</div>
                        <div class="gauge-label">HARMONIE</div>
                    </div>

                    <div class="gauge" id="g-style">
                        <div class="gauge-value" id="g-style-val">--</div>
                        <div class="gauge-label">STYLE</div>
                    </div>

                    <div class="gauge" id="g-identity">
                        <div class="gauge-value" id="g-identity-val">--</div>
                        <div class="gauge-label">IDENTITÉ</div>
                    </div>
                </div>

                <!-- ENERGY BAR -->
                <div class="hud-master-energybar">
                    <div class="energybar-label">Courbe d’énergie</div>
                    <div class="energybar-track" id="energybar-track"></div>
                </div>

                <!-- STRUCTURED SUMMARY -->
                <div class="hud-master-summary">

                    <div class="summary-block">
                        <div class="summary-title">TECHNIQUE</div>
                        <ul id="sum-tech"></ul>
                    </div>

                    <div class="summary-block">
                        <div class="summary-title">INTELLIGENCE</div>
                        <ul id="sum-intel"></ul>
                    </div>

                    <div class="summary-block">
                        <div class="summary-title">STRUCTURE</div>
                        <ul id="sum-struct"></ul>
                    </div>

                    <div class="summary-block">
                        <div class="summary-title">DYNAMIQUE</div>
                        <ul id="sum-dyn"></ul>
                    </div>

                    <div class="summary-block">
                        <div class="summary-title">STYLE & IDENTITÉ</div>
                        <ul id="sum-style"></ul>
                    </div>

                </div>

            </div>
        `;
    }

    update(results) {

        // --- GAUGES ---
        const setGauge = (id, val) => {
            const el = document.getElementById(id);
            const v = document.getElementById(id + "-val");
            v.textContent = val + "%";
            el.style.setProperty("--gauge-fill", val);
        };

        setGauge("g-energy", results.A18?.energyScore ?? 0);
        setGauge("g-contrast", results.A19?.contrastScore ?? 0);
        setGauge("g-harmony", results.A20?.harmonyScore ?? 0);
        setGauge("g-style", results.A21?.styleScore ?? 0);
        setGauge("g-identity", results.A22?.identityScore ?? 0);

        // --- ENERGY BAR ---
        const track = document.getElementById("energybar-track");
        track.innerHTML = "";
        (results.A18?.series ?? []).forEach(v => {
            track.innerHTML += `<div class="energybar-seg" style="height:${v}%;"></div>`;
        });

        // --- SUMMARY BLOCKS ---
        document.getElementById("sum-tech").innerHTML = `
            <li>Erreurs : ${results.A3?.errors?.length ?? 0}</li>
            <li>Dominante : ${results.A4?.dominant ?? "--"}</li>
            <li>FX : ${results.A5?.fxCount ?? 0}</li>
        `;

        document.getElementById("sum-intel").innerHTML = `
            <li>Risques : ${results.A7?.riskScore ?? "--"}%</li>
            <li>Stabilité : ${results.A8?.stabilityScore ?? "--"}%</li>
            <li>Optimisation : ${results.A12?.optimizerScore ?? "--"}%</li>
        `;

        document.getElementById("sum-struct").innerHTML = `
            <li>Scènes : ${results.A15?.sceneCount ?? "--"}</li>
            <li>Patterns : ${results.A16?.patternCount ?? "--"}</li>
            <li>Émotion : ${results.A17?.emotionScore ?? "--"}%</li>
        `;

        document.getElementById("sum-dyn").innerHTML = `
            <li>Énergie : ${results.A18?.energyScore ?? "--"}%</li>
            <li>Contraste : ${results.A19?.contrastScore ?? "--"}%</li>
            <li>Harmonie : ${results.A20?.harmonyScore ?? "--"}%</li>
        `;

        document.getElementById("sum-style").innerHTML = `
            <li>Style : ${results.A21?.styleScore ?? "--"}%</li>
            <li>Identité : ${results.A22?.identityScore ?? "--"}%</li>
        `;
    }
}
