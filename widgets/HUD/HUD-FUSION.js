/*
HUD FUSION — A1 → A22
OpenClaw Light — Official Widget
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Affiche la synthèse totale du show :
- score fusion global
- barre d’équilibre
- spectre fusionné
- signature instantanée
*/

export default class HUD_FUSION {

    constructor(container) {
        this.container = container;
        this.renderBase();
    }

    renderBase() {
        this.container.innerHTML = `
            <div class="hud-fusion">

                <div class="fusion-score-block">
                    <div class="fusion-score" id="fusion-score">--</div>
                    <div class="fusion-score-label">FUSION</div>
                </div>

                <div class="fusion-balance">
                    <div class="fusion-balance-track">
                        <div class="fusion-balance-fill" id="fusion-balance-fill"></div>
                    </div>
                </div>

                <div class="fusion-spectrum" id="fusion-spectrum"></div>

            </div>
        `;
    }

    // fusion = FusionA1A22.analyzeFusion(results)
    update(fusion) {

        const score = fusion?.fusionScore ?? 0;

        // Score global
        document.getElementById("fusion-score").textContent = score + "%";

        // Barre d’équilibre
        document.getElementById("fusion-balance-fill")
            .style.width = score + "%";

        // Spectre fusionné
        const spec = document.getElementById("fusion-spectrum");
        spec.innerHTML = "";

        const blocks = [
            fusion.technique.score,
            fusion.intelligence.score,
            fusion.structure.score,
            fusion.dynamique.score,
            fusion.style.styleScore,
            fusion.identite.identityScore
        ];

        blocks.forEach(v => {
            spec.innerHTML += `
                <div class="fusion-spectrum-bar" style="height:${v}%;"></div>
            `;
        });
    }
}
