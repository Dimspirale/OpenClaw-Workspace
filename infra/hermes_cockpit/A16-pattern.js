/*
A16 — Pattern Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Détecte les patterns récurrents dans un show :
- intensité
- couleur
- position
- séquences répétées
- signatures lumière
*/

const A16 = {

    // --- 1) Normalisation d’un cue ---
    normalizeCue(cue) {
        return {
            name: cue.name ?? "Unnamed Cue",
            intensity: cue.intensity ?? 0,
            color: cue.color ?? "white",
            position: cue.position ?? { pan: 0, tilt: 0 }
        };
    },


    // --- 2) Extraction des séries brutes ---
    extractSeries(show) {
        const intensities = show.map(c => c.intensity ?? 0);
        const colors = show.map(c => c.color ?? "white");
        const pans = show.map(c => c.position?.pan ?? 0);
        const tilts = show.map(c => c.position?.tilt ?? 0);

        return { intensities, colors, pans, tilts };
    },


    // --- 3) Détection de motifs répétitifs dans une série numérique ---
    detectNumericPatterns(series) {
        const patterns = [];

        for (let size = 2; size <= Math.floor(series.length / 2); size++) {
            for (let start = 0; start <= series.length - size * 2; start++) {
                const a = series.slice(start, start + size);
                const b = series.slice(start + size, start + size * 2);

                if (JSON.stringify(a) === JSON.stringify(b)) {
                    patterns.push({
                        type: "numeric",
                        size,
                        start,
                        pattern: a
                    });
                }
            }
        }

        return patterns;
    },


    // --- 4) Détection de motifs répétitifs dans une série de couleurs ---
    detectColorPatterns(colors) {
        const patterns = [];

        for (let size = 2; size <= Math.floor(colors.length / 2); size++) {
            for (let start = 0; start <= colors.length - size * 2; start++) {
                const a = colors.slice(start, start + size);
                const b = colors.slice(start + size, start + size * 2);

                if (JSON.stringify(a) === JSON.stringify(b)) {
                    patterns.push({
                        type: "color",
                        size,
                        start,
                        pattern: a
                    });
                }
            }
        }

        return patterns;
    },


    // --- 5) Détection de signatures lumière ---
    detectSignatures(show) {
        const signatures = [];

        for (let i = 1; i < show.length; i++) {
            const a = show[i - 1];
            const b = show[i];

            const deltaInt = Math.abs(a.intensity - b.intensity);
            const deltaPan = Math.abs(a.position.pan - b.position.pan);
            const deltaTilt = Math.abs(a.position.tilt - b.position.tilt);

            if (deltaInt > 40 && deltaPan < 10 && deltaTilt < 10) {
                signatures.push({
                    type: "signature_intensity_hit",
                    index: i,
                    description: "Geste lumière : HIT d’intensité"
                });
            }

            if (a.color !== b.color && deltaInt < 10) {
                signatures.push({
                    type: "signature_color_shift",
                    index: i,
                    description: "Geste lumière : SHIFT couleur"
                });
            }
        }

        return signatures;
    },


    // --- 6) Scoring global des patterns ---
    scorePatterns(patterns) {
        if (patterns.length === 0) return 0;
        return Math.min(100, patterns.length * 10);
    },


    // --- 7) Analyse complète des patterns ---
    analyzePatterns(show) {
        const normalized = show.map(c => this.normalizeCue(c));
        const series = this.extractSeries(normalized);

        const intensityPatterns = this.detectNumericPatterns(series.intensities);
        const panPatterns = this.detectNumericPatterns(series.pans);
        const tiltPatterns = this.detectNumericPatterns(series.tilts);
        const colorPatterns = this.detectColorPatterns(series.colors);

        const signatures = this.detectSignatures(normalized);

        const allPatterns = [
            ...intensityPatterns,
            ...panPatterns,
            ...tiltPatterns,
            ...colorPatterns
        ];

        const score = this.scorePatterns(allPatterns);

        return {
            patterns: allPatterns,
            signatures,
            score
        };
    }
};

export default A16;
