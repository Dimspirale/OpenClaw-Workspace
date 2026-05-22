/*
HUD MASTER ULTRA A1 → A22
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Vue ULTRA basée sur le Fusion Engine :
- radar global des blocs
- heatmap des scores
- matrice style / identité
*/

export default class HUD_MASTER_ULTRA_A1_A22 {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    renderBase() {
        this.container.innerHTML = `
            <div class="hud-master-ultra">

                <!-- RADAR SIMPLIFIÉ (en réalité : anneau segmenté) -->
                <div class="ultra-radar">
                    <div class="ultra-radar-center">
                        <div class="ultra-radar-score" id="ultra-fusion-score">--</div>
                        <div class="ultra-radar-label">FUSION</div>
                    </div>
                    <div class="ultra-radar-ring">
                        <div class="ultra-radar-seg" id="seg-tech"></div>
                        <div class="ultra-radar-seg" id="seg-intel"></div>
                        <div class="ultra-radar-seg" id="seg-struct"></div>
                        <div class="ultra-radar-seg" id="seg-dyn"></div>
                        <div class="ultra-radar-seg" id="seg-style"></div>
                        <div class="ultra-radar-seg" id="seg-id"></div>
                    </div>
                    <div class="ultra-radar-legend">
                        <span>TECH</span><span>INTEL</span><span>STRUCT</span>
                        <span>DYN</span><span>STYLE</span><span>ID</span>
                    </div>
                </div>

                <!-- HEATMAP DES SCORES -->
                <div class="ultra-heatmap">
                    <div class="ultra-heatmap-title">Heatmap des blocs</div>
                    <div class="ultra-heatmap-grid">
                        <div class="heat-cell" id="heat-tech">TECH</div>
                        <div class="heat-cell" id="heat-intel">INTEL</div>
                        <div class="heat-cell" id="heat-struct">STRUCT</div>
                        <div class="heat-cell" id="heat-dyn">DYN</div>
                        <div class="heat-cell" id="heat-style">STYLE</div>
                        <div class="heat-cell" id="heat-id">ID</div>
                    </div>
                </div>

                <!-- MATRICE STYLE / IDENTITÉ -->
                <div class="ultra-matrix">
                    <div class="ultra-matrix-title">Matrice Style / Identité</div>
                    <div class="ultra-matrix-grid">
                        <div class="matrix-label">Style</div>
                        <div class="matrix-value" id="matrix-style-score">--</div>
                        <div class="matrix-label">Identité</div>
                        <div class="matrix-value" id="matrix-id-score">--</div>
                    </div>
                </div>

            </div>
        `;
    }

    // fusion = résultat de FusionA1A22.analyzeFusion(results)
    update(fusion) {

        // Score fusion global
        const fusionScore = fusion?.fusionScore ?? 0;
        document.getElementById("ultra-fusion-score").textContent = fusionScore + "%";

        // Helpers
        const clamp = (v) => Math.max(0, Math.min(100, v));
        const setSeg = (id, val) => {
            const el = document.getElementById(id);
            el.style.setProperty("--seg-fill", clamp(val));
        };
        const setHeat = (id, val) => {
            const el = document.getElementById(id);
            el.style.setProperty("--heat-fill", clamp(val));
        };

        // Blocs
        const techScore = fusion.technique.score;
        const intelScore = fusion.intelligence.score;
        const structScore = fusion.structure.score;
        const dynScore = fusion.dynamique.score;
        const styleScore = fusion.style.styleScore;
        const idScore = fusion.identite.identityScore;

        // Radar segments
        setSeg("seg-tech", techScore);
        setSeg("seg-intel", intelScore);
        setSeg("seg-struct", structScore);
        setSeg("seg-dyn", dynScore);
        setSeg("seg-style", styleScore);
        setSeg("seg-id", idScore);

        // Heatmap
        setHeat("heat-tech", techScore);
        setHeat("heat-intel", intelScore);
        setHeat("heat-struct", structScore);
        setHeat("heat-dyn", dynScore);
        setHeat("heat-style", styleScore);
        setHeat("heat-id", idScore);

        // Matrice Style / Identité
        document.getElementById("matrix-style-score").textContent = styleScore + "%";
        document.getElementById("matrix-id-score").textContent = idScore + "%";
    }
}
