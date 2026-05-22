/*
A15 — Scene Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Regroupe automatiquement un show en scènes cohérentes :
- analyse des patterns
- détection des ruptures
- regroupement intelligent
- scoring de cohérence
*/

const A15 = {

    // --- 1) Normalisation d’un cue ---
    normalizeCue(cue) {
        return {
            name: cue.name ?? "Unnamed Cue",
            intensity: cue.intensity ?? 0,
            color: cue.color ?? "white",
            position: cue.position ?? { pan: 0, tilt: 0 }
        };
    },


    // --- 2) Analyse de similarité entre deux cues ---
    similarity(a, b) {
        let score = 100;

        // Intensité
        if (Math.abs(a.intensity - b.intensity) > 20) score -= 30;

        // Couleur
        if (a.color !== b.color) score -= 30;

        // Position
        const deltaPan = Math.abs(a.position.pan - b.position.pan);
        const deltaTilt = Math.abs(a.position.tilt - b.position.tilt);
        if (deltaPan > 40 || deltaTilt > 40) score -= 20;

        return Math.max(0, score);
    },


    // --- 3) Détection des ruptures scéniques ---
    detectBreak(a, b) {
        const sim = this.similarity(a, b);
        return sim < 40; // seuil de rupture
    },


    // --- 4) Regroupement intelligent en scènes ---
    groupIntoScenes(show) {
        const scenes = [];
        let currentScene = [];

        for (let i = 0; i < show.length; i++) {
            const cue = this.normalizeCue(show[i]);

            if (i === 0) {
                currentScene.push(cue);
                continue;
            }

            const prev = currentScene[currentScene.length - 1];

            if (this.detectBreak(prev, cue)) {
                scenes.push(currentScene);
                currentScene = [cue];
            } else {
                currentScene.push(cue);
            }
        }

        if (currentScene.length > 0) scenes.push(currentScene);

        return scenes;
    },


    // --- 5) Scoring d’une scène ---
    scoreScene(scene) {
        if (scene.length <= 1) return 100;

        let score = 100;

        for (let i = 1; i < scene.length; i++) {
            const sim = this.similarity(scene[i - 1], scene[i]);
            score -= (100 - sim) * 0.1;
        }

        return Math.max(0, Math.round(score));
    },


    // --- 6) Analyse complète des scènes ---
    analyzeScenes(scenes) {
        return scenes.map((scene, index) => ({
            index,
            cues: scene,
            score: this.scoreScene(scene),
            length: scene.length
        }));
    },


    // --- 7) Génération complète de la structure scénique ---
    generateSceneStructure(show) {
        const scenes = this.groupIntoScenes(show);
        const analysis = this.analyzeScenes(scenes);

        return {
            scenes,
            analysis,
            totalScenes: scenes.length
        };
    }
};

export default A15;
