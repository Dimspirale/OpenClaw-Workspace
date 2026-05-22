/*
A20 — Harmony Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Analyse l’harmonie globale d’un show :
- harmonie colorimétrique
- harmonie dynamique
- harmonie émotionnelle
- harmonie structurelle
- harmonie des transitions
- score global d’harmonie
*/

const A20 = {

    // --- 1) Normalisation d’un cue ---
    normalizeCue(cue) {
        return {
            name: cue.name ?? "Unnamed Cue",
            intensity: cue.intensity ?? 0,
            color: cue.color ?? "white",
            position: cue.position ?? { pan: 0, tilt: 0 }
        };
    },


    // --- 2) Harmonie colorimétrique ---
    colorHarmony(a, b) {
        if (a.color === b.color) return 100;

        const warm = ["red", "amber", "magenta"];
        const cold = ["blue", "cyan", "purple"];
        const neutral = ["white", "green"];

        const group = (c) =>
            warm.includes(c) ? "warm" :
            cold.includes(c) ? "cold" :
            neutral.includes(c) ? "neutral" : "neutral";

        const gA = group(a.color);
        const gB = group(b.color);

        if (gA === gB) return 70;   // cohérence intra‑famille
        return 30;                 // opposition inter‑famille
    },


    // --- 3) Harmonie d’intensité ---
    intensityHarmony(a, b) {
        const delta = Math.abs(a.intensity - b.intensity);
        if (delta < 10) return 100;
        if (delta < 30) return 70;
        if (delta < 50) return 40;
        return 10;
    },


    // --- 4) Harmonie de position ---
    positionHarmony(a, b) {
        const deltaPan = Math.abs(a.position.pan - b.position.pan);
        const deltaTilt = Math.abs(a.position.tilt - b.position.tilt);
        const spread = (deltaPan + deltaTilt) / 2;

        if (spread < 10) return 100;
        if (spread < 30) return 70;
        if (spread < 50) return 40;
        return 10;
    },


    // --- 5) Harmonie émotionnelle ---
    emotionalHarmony(a, b) {
        let score = 100;

        if (a.color !== b.color) score -= 20;
        if (Math.abs(a.intensity - b.intensity) > 40) score -= 30;
        if (this.positionHarmony(a, b) < 40) score -= 20;

        return Math.max(0, score);
    },


    // --- 6) Harmonie dynamique ---
    dynamicHarmony(a, b) {
        const i = this.intensityHarmony(a, b);
        const p = this.positionHarmony(a, b);
        return Math.round((i * 0.6) + (p * 0.4));
    },


    // --- 7) Analyse harmonique cue‑to‑cue ---
    analyzeHarmony(show) {
        const results = [];

        for (let i = 1; i < show.length; i++) {
            const a = show[i - 1];
            const b = show[i];

            results.push({
                from: a.name,
                to: b.name,
                color: this.colorHarmony(a, b),
                intensity: this.intensityHarmony(a, b),
                position: this.positionHarmony(a, b),
                emotional: this.emotionalHarmony(a, b),
                dynamic: this.dynamicHarmony(a, b)
            });
        }

        return results;
    },


    // --- 8) Score global d’harmonie ---
    globalHarmonyScore(harmony) {
        if (harmony.length === 0) return 0;

        const avg = harmony.reduce((acc, h) =>
            acc + (h.color + h.intensity + h.position + h.emotional + h.dynamic) / 5
        , 0) / harmony.length;

        return Math.min(100, Math.round(avg));
    },


    // --- 9) Analyse complète du show ---
    analyzeHarmony(show) {
        const normalized = show.map(c => this.normalizeCue(c));
        const harmony = this.analyzeHarmony(normalized);
        const score = this.globalHarmonyScore(harmony);

        return {
            harmony,
            harmonyScore: score
        };
    }
};

export default A20;
