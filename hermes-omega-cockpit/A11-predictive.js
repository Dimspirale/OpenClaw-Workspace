/*
A11 — Predictive Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Prédire les risques et comportements futurs des presets :
- risque d’erreur
- risque d’incohérence
- tendance d’intensité
- stabilité globale
*/

const A11 = {

    // --- 1) Score de risque d’erreur sur un preset ---
    predictErrorRisk(preset) {
        let risk = 0;
        const factors = [];

        if (preset.intensity == null) {
            risk += 30;
            factors.push("Intensité non définie");
        } else {
            if (preset.intensity < 0 || preset.intensity > 100) {
                risk += 40;
                factors.push("Intensité hors plage 0–100");
            } else if (preset.intensity > 90) {
                risk += 15;
                factors.push("Intensité très élevée (>90)");
            }
        }

        if (!preset.color) {
            risk += 20;
            factors.push("Couleur non définie");
        }

        if (!preset.position) {
            risk += 20;
            factors.push("Position non définie");
        }

        return {
            risk: Math.min(100, risk),
            factors
        };
    },


    // --- 2) Analyse de tendance d’intensité sur une série ---
    predictIntensityTrend(presets) {
        if (!presets || presets.length < 2) {
            return {
                trend: "stable",
                deltas: [],
                comment: "Pas assez de presets pour analyser une tendance"
            };
        }

        const deltas = [];
        let sum = 0;

        for (let i = 1; i < presets.length; i++) {
            const prev = presets[i - 1].intensity ?? 0;
            const curr = presets[i].intensity ?? 0;
            const delta = curr - prev;
            deltas.push(delta);
            sum += delta;
        }

        const avg = sum / deltas.length;
        let trend = "stable";
        let comment = "Variation faible";

        if (avg > 5) {
            trend = "montante";
            comment = "Intensité globalement en hausse";
        } else if (avg < -5) {
            trend = "descendante";
            comment = "Intensité globalement en baisse";
        }

        return {
            trend,
            averageDelta: avg,
            deltas,
            comment
        };
    },


    // --- 3) Stabilité globale d’un set de presets ---
    predictStability(presets) {
        if (!presets || presets.length === 0) {
            return {
                stability: 100,
                comment: "Aucun preset, stabilité triviale"
            };
        }

        let jumps = 0;

        for (let i = 1; i < presets.length; i++) {
            const prev = presets[i - 1];
            const curr = presets[i];

            const prevInt = prev.intensity ?? 0;
            const currInt = curr.intensity ?? 0;

            if (Math.abs(currInt - prevInt) > 40) {
                jumps += 1;
            }
        }

        const ratio = jumps / Math.max(1, presets.length - 1);
        const stability = Math.max(0, 100 - ratio * 100);

        let comment = "Stabilité correcte";
        if (stability < 40) comment = "Très instable";
        else if (stability < 70) comment = "Stabilité moyenne";

        return {
            stability,
            comment,
            jumps
        };
    },


    // --- 4) Prédiction globale sur un preset + contexte ---
    fullPrediction(preset, allPresets = []) {
        const errorRisk = this.predictErrorRisk(preset);
        const trend = this.predictIntensityTrend(allPresets);
        const stability = this.predictStability(allPresets);

        return {
            errorRisk,
            trend,
            stability
        };
    }
};

export default A11;
