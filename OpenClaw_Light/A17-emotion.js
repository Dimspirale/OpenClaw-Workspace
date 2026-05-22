/*
A17 — Emotion Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Analyse la charge émotionnelle d’un show :
- énergie
- tension
- douceur
- agressivité
- climax
- arcs émotionnels
*/

const A17 = {

    // --- 1) Normalisation d’un cue ---
    normalizeCue(cue) {
        return {
            name: cue.name ?? "Unnamed Cue",
            intensity: cue.intensity ?? 0,
            color: cue.color ?? "white",
            position: cue.position ?? { pan: 0, tilt: 0 }
        };
    },


    // --- 2) Score émotionnel basé sur la couleur ---
    colorEmotion(color) {
        const map = {
            red: "aggressif",
            blue: "calme",
            green: "naturel",
            white: "neutre",
            amber: "chaleureux",
            purple: "mystique",
            magenta: "émotionnel",
            cyan: "frais"
        };
        return map[color] ?? "neutre";
    },


    // --- 3) Score émotionnel basé sur l’intensité ---
    intensityEmotion(intensity) {
        if (intensity > 80) return "forte énergie";
        if (intensity > 50) return "énergie moyenne";
        if (intensity > 20) return "douceur";
        return "faible présence";
    },


    // --- 4) Analyse émotionnelle d’un cue ---
    analyzeCue(cue) {
        return {
            name: cue.name,
            intensity: cue.intensity,
            color: cue.color,
            emotionColor: this.colorEmotion(cue.color),
            emotionIntensity: this.intensityEmotion(cue.intensity)
        };
    },


    // --- 5) Détection des tensions émotionnelles ---
    detectTension(a, b) {
        let tension = 0;

        // Intensité
        if (Math.abs(a.intensity - b.intensity) > 40) tension += 40;

        // Couleur
        if (a.color !== b.color) tension += 30;

        // Position
        const deltaPan = Math.abs(a.position.pan - b.position.pan);
        const deltaTilt = Math.abs(a.position.tilt - b.position.tilt);
        if (deltaPan > 40 || deltaTilt > 40) tension += 20;

        return tension;
    },


    // --- 6) Analyse complète des arcs émotionnels ---
    analyzeArcs(show) {
        const arcs = [];
        let totalTension = 0;

        for (let i = 1; i < show.length; i++) {
            const a = show[i - 1];
            const b = show[i];
            const tension = this.detectTension(a, b);

            arcs.push({
                from: a.name,
                to: b.name,
                tension
            });

            totalTension += tension;
        }

        const avg = arcs.length > 0 ? totalTension / arcs.length : 0;

        return {
            arcs,
            averageTension: Math.round(avg)
        };
    },


    // --- 7) Score émotionnel global ---
    globalEmotionScore(show) {
        let score = 100;

        for (let i = 1; i < show.length; i++) {
            const t = this.detectTension(show[i - 1], show[i]);
            if (t > 60) score -= 10;
            if (t > 40) score -= 5;
        }

        return Math.max(0, score);
    },


    // --- 8) Analyse complète du show ---
    analyzeEmotion(show) {
        const normalized = show.map(c => this.normalizeCue(c));

        const cueAnalysis = normalized.map(c => this.analyzeCue(c));
        const arcs = this.analyzeArcs(normalized);
        const score = this.globalEmotionScore(normalized);

        return {
            cues: cueAnalysis,
            arcs: arcs.arcs,
            averageTension: arcs.averageTension,
            emotionScore: score
        };
    }
};

export default A17;
