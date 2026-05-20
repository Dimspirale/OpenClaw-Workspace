/*
A9 — Preset Intelligence PRO
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Analyse avancée des presets :
- scoring
- détection d’incohérences complexes
- analyse croisée
- patterns
- suggestions d’amélioration
*/

const A9 = {

    // --- 1) Analyse structurelle profonde ---
    structuralAnalysis(preset) {
        const issues = [];

        if (!preset.intensity && preset.intensity !== 0)
            issues.push("Absence d’intensité définie");

        if (!preset.color)
            issues.push("Couleur non définie");

        if (!preset.position)
            issues.push("Position non définie");

        if (preset.intensity < 0 || preset.intensity > 100)
            issues.push("Intensité hors plage 0–100");

        return {
            ok: issues.length === 0,
            issues
        };
    },


    // --- 2) Analyse croisée entre presets ---
    crossCompare(p1, p2) {
        const diffs = [];

        if (p1.color !== p2.color)
            diffs.push(`Couleur différente : ${p1.color} → ${p2.color}`);

        if (p1.intensity !== p2.intensity)
            diffs.push(`Intensité différente : ${p1.intensity}% → ${p2.intensity}%`);

        if (JSON.stringify(p1.position) !== JSON.stringify(p2.position))
            diffs.push("Position différente");

        return {
            similarity: 100 - diffs.length * 20,
            diffs
        };
    },


    // --- 3) Détection de patterns ---
    detectPatterns(presets) {
        const patterns = {
            repeatedColors: {},
            repeatedPositions: {},
            intensityTrends: []
        };

        presets.forEach((p, i) => {
            // couleurs
            patterns.repeatedColors[p.color] =
                (patterns.repeatedColors[p.color] || 0) + 1;

            // positions
            const posKey = JSON.stringify(p.position);
            patterns.repeatedPositions[posKey] =
                (patterns.repeatedPositions[posKey] || 0) + 1;

            // intensité
            if (i > 0)
                patterns.intensityTrends.push(p.intensity - presets[i - 1].intensity);
        });

        return patterns;
    },


    // --- 4) Scoring global ---
    scorePreset(preset) {
        let score = 100;

        if (!preset.color) score -= 20;
        if (!preset.position) score -= 20;
        if (preset.intensity == null) score -= 20;

        if (preset.intensity < 0 || preset.intensity > 100)
            score -= 30;

        return Math.max(0, score);
    },


    // --- 5) Suggestions intelligentes ---
    suggestImprovements(preset) {
        const suggestions = [];

        if (!preset.color)
            suggestions.push("Définir une couleur cohérente avec la scène");

        if (!preset.position)
            suggestions.push("Ajouter une position pour éviter un preset incomplet");

        if (preset.intensity == null)
            suggestions.push("Définir une intensité claire");

        if (preset.intensity > 100)
            suggestions.push("Réduire l’intensité à 100 maximum");

        if (preset.intensity < 0)
            suggestions.push("L’intensité ne peut pas être négative");

        return suggestions;
    },


    // --- 6) Analyse complète ---
    fullAnalysis(preset, allPresets = []) {
        const structural = this.structuralAnalysis(preset);
        const score = this.scorePreset(preset);
        const suggestions = this.suggestImprovements(preset);

        let cross = [];
        if (allPresets.length > 0) {
            cross = allPresets.map(p => this.crossCompare(preset, p));
        }

        return {
            structural,
            score,
            suggestions,
            cross
        };
    }
};

module.exports = A9;
