/*
A21 — Style Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Analyse le style artistique d’un show :
- style d’intensité
- style colorimétrique
- style de position
- style dynamique
- style émotionnel
- style de contraste
- style d’harmonie
- score global de style
*/

const A21 = {

    // --- 1) Normalisation d’un cue ---
    normalizeCue(cue) {
        return {
            name: cue.name ?? "Unnamed Cue",
            intensity: cue.intensity ?? 0,
            color: cue.color ?? "white",
            position: cue.position ?? { pan: 0, tilt: 0 }
        };
    },


    // --- 2) Style d’intensité ---
    intensityStyle(series) {
        const avg = series.reduce((a, b) => a + b, 0) / series.length;

        if (avg > 80) return "puissant";
        if (avg > 50) return "énergétique";
        if (avg > 20) return "modéré";
        return "minimaliste";
    },


    // --- 3) Style colorimétrique ---
    colorStyle(colors) {
        const freq = {};
        colors.forEach(c => freq[c] = (freq[c] || 0) + 1);

        const dominant = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];

        const warm = ["red", "amber", "magenta"];
        const cold = ["blue", "cyan", "purple"];
        const neutral = ["white", "green"];

        if (warm.includes(dominant)) return "chaud";
        if (cold.includes(dominant)) return "froid";
        return "neutre";
    },


    // --- 4) Style de position ---
    positionStyle(show) {
        let spread = 0;

        show.forEach(c => {
            spread += Math.abs(c.position.pan) + Math.abs(c.position.tilt);
        });

        spread /= show.length;

        if (spread > 120) return "ouvert";
        if (spread > 60) return "moyen";
        return "fermé";
    },


    // --- 5) Style dynamique ---
    dynamicStyle(series) {
        let variation = 0;

        for (let i = 1; i < series.length; i++) {
            variation += Math.abs(series[i] - series[i - 1]);
        }

        variation /= series.length;

        if (variation > 40) return "agité";
        if (variation > 20) return "vivant";
        return "stable";
    },


    // --- 6) Style émotionnel ---
    emotionalStyle(colors, intensities) {
        const warm = ["red", "amber", "magenta"];
        const cold = ["blue", "cyan", "purple"];

        const warmCount = colors.filter(c => warm.includes(c)).length;
        const coldCount = colors.filter(c => cold.includes(c)).length;

        const avgIntensity = intensities.reduce((a, b) => a + b, 0) / intensities.length;

        if (warmCount > coldCount && avgIntensity > 60) return "passionné";
        if (coldCount > warmCount && avgIntensity < 40) return "contemplatif";
        return "équilibré";
    },


    // --- 7) Style de contraste ---
    contrastStyle(contrasts) {
        const avg = contrasts.reduce((a, b) => a + b.dynamic, 0) / contrasts.length;

        if (avg > 60) return "tranché";
        if (avg > 30) return "structuré";
        return "doux";
    },


    // --- 8) Style d’harmonie ---
    harmonyStyle(harmony) {
        const avg = harmony.reduce((a, b) => a + b.dynamic, 0) / harmony.length;

        if (avg > 70) return "fluide";
        if (avg > 40) return "cohérent";
        return "fragmenté";
    },


    // --- 9) Score global de style ---
    globalStyleScore(styles) {
        const map = {
            puissant: 90,
            énergétique: 75,
            modéré: 60,
            minimaliste: 50,

            chaud: 80,
            froid: 70,
            neutre: 60,

            ouvert: 85,
            moyen: 70,
            fermé: 55,

            agité: 80,
            vivant: 70,
            stable: 60,

            passionné: 90,
            contemplatif: 70,
            équilibré: 75,

            tranché: 85,
            structuré: 70,
            doux: 60,

            fluide: 90,
            cohérent: 75,
            fragmenté: 55
        };

        const values = Object.values(styles).map(s => map[s] ?? 60);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;

        return Math.min(100, Math.round(avg));
    },


    // --- 10) Analyse complète du style ---
    analyzeStyle(show, contrastData, harmonyData) {
        const normalized = show.map(c => this.normalizeCue(c));

        const intensities = normalized.map(c => c.intensity);
        const colors = normalized.map(c => c.color);

        const intensity = this.intensityStyle(intensities);
        const color = this.colorStyle(colors);
        const position = this.positionStyle(normalized);

        const energySeries = intensities; // proxy simple
        const dynamic = this.dynamicStyle(energySeries);

        const emotional = this.emotionalStyle(colors, intensities);

        const contrast = this.contrastStyle(contrastData);
        const harmony = this.harmonyStyle(harmonyData);

        const styles = {
            intensity,
            color,
            position,
            dynamic,
            emotional,
            contrast,
            harmony
        };

        const score = this.globalStyleScore(styles);

        return {
            styles,
            styleScore: score
        };
    }
};

export default A21;
