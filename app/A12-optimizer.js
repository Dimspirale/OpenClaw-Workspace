/*
A12 — Show Optimizer
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Optimise automatiquement un show complet :
- équilibrage d’intensité
- harmonisation des couleurs
- lissage des transitions
- réduction des variations brutales
- scoring global
*/

const A12 = {

    // --- 1) Équilibrage d’intensité ---
    balanceIntensity(show) {
        const optimized = [...show];
        let total = 0;

        optimized.forEach(p => total += (p.intensity ?? 0));
        const avg = total / Math.max(1, optimized.length);

        optimized.forEach(p => {
            if (p.intensity > avg + 20) p.intensity = avg + 20;
            if (p.intensity < avg - 20) p.intensity = avg - 20;
        });

        return {
            optimized,
            average: avg,
            comment: "Intensités recentrées autour de la moyenne"
        };
    },


    // --- 2) Harmonisation des couleurs ---
    harmonizeColors(show) {
        const optimized = [...show];
        const colors = optimized.map(p => p.color).filter(Boolean);

        const reference = colors.length > 0
            ? colors[0]
            : "white";

        optimized.forEach(p => {
            if (!p.color) p.color = reference;
        });

        return {
            optimized,
            reference,
            comment: "Couleurs harmonisées sur la première couleur valide"
        };
    },


    // --- 3) Lissage des transitions d’intensité ---
    smoothTransitions(show) {
        const optimized = [...show];
        let changes = 0;

        for (let i = 1; i < optimized.length; i++) {
            const prev = optimized[i - 1].intensity ?? 0;
            const curr = optimized[i].intensity ?? 0;

            if (Math.abs(curr - prev) > 40) {
                optimized[i].intensity = prev + (curr > prev ? 40 : -40);
                changes++;
            }
        }

        return {
            optimized,
            changes,
            comment: "Transitions d’intensité lissées"
        };
    },


    // --- 4) Score global du show ---
    score(show) {
        let score = 100;

        // pénalité transitions brutales
        for (let i = 1; i < show.length; i++) {
            const prev = show[i - 1].intensity ?? 0;
            const curr = show[i].intensity ?? 0;
            if (Math.abs(curr - prev) > 40) score -= 5;
        }

        // pénalité couleurs manquantes
        show.forEach(p => {
            if (!p.color) score -= 3;
        });

        return Math.max(0, score);
    },


    // --- 5) Optimisation complète ---
    optimizeShow(show) {
        let current = [...show];
        const logs = [];

        // Intensité
        const intensity = this.balanceIntensity(current);
        current = intensity.optimized;
        logs.push(intensity.comment);

        // Couleurs
        const colors = this.harmonizeColors(current);
        current = colors.optimized;
        logs.push(colors.comment);

        // Transitions
        const smooth = this.smoothTransitions(current);
        current = smooth.optimized;
        logs.push(smooth.comment);

        // Score final
        const finalScore = this.score(current);
        logs.push("Score final : " + finalScore);

        return {
            optimizedShow: current,
            score: finalScore,
            logs
        };
    }
};

export default A12;
