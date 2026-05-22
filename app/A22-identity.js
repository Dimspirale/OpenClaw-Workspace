/*
A22 — Identity Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Analyse l’identité artistique profonde d’un show :
- constantes stylistiques
- préférences colorimétriques
- logique d’intensité
- philosophie de mouvement / position
- rapport au contraste
- rapport à l’harmonie
- rapport à l’énergie
- cohérence interne
- signature identitaire
*/

const A22 = {

    // --- 1) Extraction des constantes ---
    extractConstants(styleData) {
        const constants = [];

        Object.entries(styleData).forEach(([key, value]) => {
            constants.push({
                dimension: key,
                signature: value
            });
        });

        return constants;
    },


    // --- 2) Analyse des préférences colorimétriques ---
    colorIdentity(colors) {
        const freq = {};
        colors.forEach(c => freq[c] = (freq[c] || 0) + 1);

        const dominant = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];

        const warm = ["red", "amber", "magenta"];
        const cold = ["blue", "cyan", "purple"];

        if (warm.includes(dominant)) return "identité chaude";
        if (cold.includes(dominant)) return "identité froide";
        return "identité neutre";
    },


    // --- 3) Analyse de la logique d’intensité ---
    intensityIdentity(intensities) {
        const avg = intensities.reduce((a, b) => a + b, 0) / intensities.length;

        if (avg > 80) return "identité puissante";
        if (avg > 50) return "identité énergique";
        if (avg > 20) return "identité modérée";
        return "identité minimaliste";
    },


    // --- 4) Analyse de la philosophie de mouvement ---
    positionIdentity(show) {
        let spread = 0;

        show.forEach(c => {
            spread += Math.abs(c.position.pan) + Math.abs(c.position.tilt);
        });

        spread /= show.length;

        if (spread > 120) return "identité ouverte";
        if (spread > 60) return "identité moyenne";
        return "identité fermée";
    },


    // --- 5) Analyse du rapport au contraste ---
    contrastIdentity(contrastData) {
        const avg = contrastData.reduce((a, b) => a + b.dynamic, 0) / contrastData.length;

        if (avg > 60) return "identité tranchée";
        if (avg > 30) return "identité structurée";
        return "identité douce";
    },


    // --- 6) Analyse du rapport à l’harmonie ---
    harmonyIdentity(harmonyData) {
        const avg = harmonyData.reduce((a, b) => a + b.dynamic, 0) / harmonyData.length;

        if (avg > 70) return "identité fluide";
        if (avg > 40) return "identité cohérente";
        return "identité fragmentée";
    },


    // --- 7) Synthèse identitaire ---
    synthesizeIdentity(components) {
        return {
            color: components.color,
            intensity: components.intensity,
            position: components.position,
            contrast: components.contrast,
            harmony: components.harmony
        };
    },


    // --- 8) Score global d’identité ---
    identityScore(identity) {
        const map = {
            "identité puissante": 90,
            "identité énergique": 80,
            "identité modérée": 70,
            "identité minimaliste": 60,

            "identité chaude": 85,
            "identité froide": 75,
            "identité neutre": 65,

            "identité ouverte": 85,
            "identité moyenne": 70,
            "identité fermée": 60,

            "identité tranchée": 85,
            "identité structurée": 75,
            "identité douce": 65,

            "identité fluide": 90,
            "identité cohérente": 75,
            "identité fragmentée": 55
        };

        const values = Object.values(identity).map(v => map[v] ?? 60);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;

        return Math.min(100, Math.round(avg));
    },


    // --- 9) Analyse complète ---
    analyzeIdentity(show, styleData, contrastData, harmonyData) {
        const intensities = show.map(c => c.intensity);
        const colors = show.map(c => c.color);

        const components = {
            color: this.colorIdentity(colors),
            intensity: this.intensityIdentity(intensities),
            position: this.positionIdentity(show),
            contrast: this.contrastIdentity(contrastData),
            harmony: this.harmonyIdentity(harmonyData)
        };

        const identity = this.synthesizeIdentity(components);
        const score = this.identityScore(identity);

        return {
            identity,
            identityScore: score
        };
    }
};

export default A22;
