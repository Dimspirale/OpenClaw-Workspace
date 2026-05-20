/*
A10 — Preset Repair Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Répare automatiquement les presets :
- correction d’erreurs
- normalisation
- reconstruction
- harmonisation
- nettoyage
*/

const A10 = {

    // --- 1) Normalisation des valeurs ---
    normalize(preset) {
        const fixed = { ...preset };

        // Intensité
        if (fixed.intensity == null) fixed.intensity = 0;
        if (fixed.intensity < 0) fixed.intensity = 0;
        if (fixed.intensity > 100) fixed.intensity = 100;

        // Couleur
        if (!fixed.color) fixed.color = "white";

        // Position
        if (!fixed.position) fixed.position = { pan: 0, tilt: 0 };

        return fixed;
    },


    // --- 2) Correction des erreurs simples ---
    fixErrors(preset) {
        const fixed = { ...preset };
        const log = [];

        if (fixed.intensity < 0) {
            log.push("Intensité négative corrigée → 0");
            fixed.intensity = 0;
        }

        if (fixed.intensity > 100) {
            log.push("Intensité >100 corrigée → 100");
            fixed.intensity = 100;
        }

        if (!fixed.color) {
            log.push("Couleur manquante → white");
            fixed.color = "white";
        }

        if (!fixed.position) {
            log.push("Position manquante → {pan:0, tilt:0}");
            fixed.position = { pan: 0, tilt: 0 };
        }

        return { fixed, log };
    },


    // --- 3) Reconstruction des presets incomplets ---
    reconstruct(preset) {
        const fixed = { ...preset };
        const log = [];

        if (!fixed.position) {
            fixed.position = { pan: 0, tilt: 0 };
            log.push("Position reconstruite");
        }

        if (!fixed.color) {
            fixed.color = "white";
            log.push("Couleur reconstruite");
        }

        if (fixed.intensity == null) {
            fixed.intensity = 0;
            log.push("Intensité reconstruite");
        }

        return { fixed, log };
    },


    // --- 4) Harmonisation globale ---
    harmonize(preset, reference) {
        const fixed = { ...preset };
        const log = [];

        if (reference) {
            if (!fixed.color) {
                fixed.color = reference.color;
                log.push("Couleur harmonisée avec le preset de référence");
            }

            if (fixed.intensity == null) {
                fixed.intensity = reference.intensity;
                log.push("Intensité harmonisée avec le preset de référence");
            }
        }

        return { fixed, log };
    },


    // --- 5) Réparation complète ---
    fullRepair(preset, reference = null) {
        const logs = [];

        // Normalisation
        const normalized = this.normalize(preset);
        logs.push("Normalisation effectuée");

        // Correction
        const { fixed: corrected, log: logFix } = this.fixErrors(normalized);
        logs.push(...logFix);

        // Reconstruction
        const { fixed: rebuilt, log: logRebuild } = this.reconstruct(corrected);
        logs.push(...logRebuild);

        // Harmonisation
        const { fixed: harmonized, log: logHarmo } = this.harmonize(rebuilt, reference);
        logs.push(...logHarmo);

        return {
            repaired: harmonized,
            logs
        };
    }
};

export default A10;
