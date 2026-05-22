/*
A19 — Contrast Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Analyse les contrastes d’un show :
- intensité
- couleur
- position
- dynamique
- émotion
- structure
*/

const A19 = {

    // --- 1) Normalisation d’un cue ---
    normalizeCue(cue) {
        return {
            name: cue.name ?? "Unnamed Cue",
            intensity: cue.intensity ?? 0,
            color: cue.color ?? "white",
            position: cue.position ?? { pan: 0, tilt: 0 }
        };
    },


    // --- 2) Contraste d’intensité ---
    intensityContrast(a, b) {
        return Math.abs(a.intensity - b.intensity);
    },


    // --- 3) Contraste de couleur ---
    colorContrast(a, b) {
        if (a.color === b.color) return 0;

        const groups = {
            warm: ["red", "amber", "magenta"],
            cold: ["blue", "cyan", "purple"],
            neutral: ["white", "green"]
        };

        const groupOf = (c) =>
            Object.keys(groups).find(g => groups[g].includes(c)) ?? "neutral";

        const gA = groupOf(a.color);
        const gB = groupOf(b.color);

        if (gA === gB) return 20;     // variation intra‑famille
        return 50;                   // contraste inter‑famille
    },


    // --- 4) Contraste de position ---
    positionContrast(a, b) {
        const deltaPan = Math.abs(a.position.pan - b.position.pan);
        const deltaTilt = Math.abs(a.position.tilt - b.position.tilt);
        return Math.round((deltaPan + deltaTilt) / 2);
    },


    // --- 5) Contraste dynamique (variation globale) ---
    dynamicContrast(a, b) {
        const i = this.intensityContrast(a, b);
        const p = this.positionContrast(a, b);
        return Math.round((i * 0.6) + (p * 0.4));
    },


    // --- 6) Contraste émotionnel ---
    emotionalContrast(a, b) {
        let score = 0;

        if (a.color !== b.color) score += 30;
        if (Math.abs(a.intensity - b.intensity) > 40) score += 40;
        if (this.positionContrast(a, b) > 40) score += 20;

        return score;
    },


    // --- 7) Analyse complète des contrastes cue‑to‑cue ---
    analyzeContrasts(show) {
        const results = [];

        for (let i = 1; i < show.length; i++) {
            const a = show[i - 1];
            const b = show[i];

            results.push({
                from: a.name,
                to: b.name,
                intensity: this.intensityContrast(a, b),
                color: this.colorContrast(a, b),
                position: this.positionContrast(a, b),
                dynamic: this.dynamicContrast(a, b),
                emotional: this.emotionalContrast(a, b)
            });
        }

        return results;
    },


    // --- 8) Score global de contraste ---
    globalContrastScore(contrasts) {
        if (contrasts.length === 0) return 0;

        const avg = contrasts.reduce((acc, c) =>
            acc + (c.intensity + c.color + c.position + c.dynamic + c.emotional) / 5
        , 0) / contrasts.length;

        return Math.min(100, Math.round(avg));
    },


    // --- 9) Analyse complète du show ---
    analyzeContrast(show) {
        const normalized = show.map(c => this.normalizeCue(c));
        const contrasts = this.analyzeContrasts(normalized);
        const score = this.globalContrastScore(contrasts);

        return {
            contrasts,
            contrastScore: score
        };
    }
};

export default A19;
