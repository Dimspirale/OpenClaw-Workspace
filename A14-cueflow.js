/*
A14 — CueFlow Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Analyse et génère le flux logique cue-to-cue :
- transitions
- ruptures
- cohérence
- continuité
- suggestions d’amélioration
*/

const A14 = {

    // --- 1) Normalisation d’un cue ---
    normalizeCue(cue) {
        const fixed = { ...cue };

        if (!fixed.name) fixed.name = "Unnamed Cue";
        if (!fixed.intensity) fixed.intensity = 0;
        if (!fixed.color) fixed.color = "white";
        if (!fixed.position) fixed.position = { pan: 0, tilt: 0 };

        return fixed;
    },


    // --- 2) Normalisation d’un show complet ---
    normalizeShow(show) {
        return show.map(c => this.normalizeCue(c));
    },


    // --- 3) Analyse des transitions entre deux cues ---
    analyzeTransition(a, b) {
        const transitions = [];
        let score = 100;

        // Intensité
        const deltaInt = Math.abs((b.intensity ?? 0) - (a.intensity ?? 0));
        if (deltaInt > 40) {
            transitions.push("Transition d’intensité brutale");
            score -= 20;
        }

        // Couleur
        if (a.color !== b.color) {
            transitions.push("Changement de couleur");
            score -= 10;
        }

        // Position
        const deltaPan = Math.abs((b.position?.pan ?? 0) - (a.position?.pan ?? 0));
        const deltaTilt = Math.abs((b.position?.tilt ?? 0) - (a.position?.tilt ?? 0));

        if (deltaPan > 60 || deltaTilt > 60) {
            transitions.push("Mouvement important du faisceau");
            score -= 15;
        }

        return {
            from: a.name,
            to: b.name,
            transitions,
            score
        };
    },


    // --- 4) Analyse complète du flux cue-to-cue ---
    analyzeFlow(show) {
        const flow = [];
        let globalScore = 100;

        for (let i = 1; i < show.length; i++) {
            const result = this.analyzeTransition(show[i - 1], show[i]);
            flow.push(result);
            globalScore -= (100 - result.score) * 0.2;
        }

        return {
            flow,
            globalScore: Math.max(0, Math.round(globalScore))
        };
    },


    // --- 5) Détection des ruptures majeures ---
    detectBreaks(flow) {
        return flow.filter(f => f.score < 70);
    },


    // --- 6) Suggestions d’amélioration ---
    suggestImprovements(flow) {
        const suggestions = [];

        flow.forEach(f => {
            if (f.transitions.includes("Transition d’intensité brutale")) {
                suggestions.push(`Entre "${f.from}" et "${f.to}" : adoucir l’intensité.`);
            }
            if (f.transitions.includes("Changement de couleur")) {
                suggestions.push(`Entre "${f.from}" et "${f.to}" : harmoniser les couleurs.`);
            }
            if (f.transitions.includes("Mouvement important du faisceau")) {
                suggestions.push(`Entre "${f.from}" et "${f.to}" : réduire l’amplitude du mouvement.`);
            }
        });

        return suggestions;
    },


    // --- 7) Analyse complète du CueFlow ---
    generateCueFlow(show) {
        const normalized = this.normalizeShow(show);
        const flowAnalysis = this.analyzeFlow(normalized);
        const breaks = this.detectBreaks(flowAnalysis.flow);
        const suggestions = this.suggestImprovements(flowAnalysis.flow);

        return {
            normalizedShow: normalized,
            flow: flowAnalysis.flow,
            globalScore: flowAnalysis.globalScore,
            breaks,
            suggestions
        };
    }
};

export default A14;
