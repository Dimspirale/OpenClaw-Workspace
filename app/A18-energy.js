/*
A18 — Energy Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Analyse l'énergie d’un show :
- énergie instantanée
- énergie cumulée
- boosts / drops
- zones de repos
- cycles énergétiques
- dynamique globale
*/

const A18 = {

    // --- 1) Normalisation d’un cue ---
    normalizeCue(cue) {
        return {
            name: cue.name ?? "Unnamed Cue",
            intensity: cue.intensity ?? 0,
            color: cue.color ?? "white",
            position: cue.position ?? { pan: 0, tilt: 0 }
        };
    },


    // --- 2) Calcul de l’énergie instantanée ---
    computeInstantEnergy(cue) {
        let energy = 0;

        // Intensité = base de l’énergie
        energy += cue.intensity;

        // Couleur = modulation émotionnelle
        const colorBoost = {
            red: 20,
            amber: 10,
            white: 5,
            blue: -5,
            green: 0,
            purple: 5,
            magenta: 10,
            cyan: -5
        };
        energy += colorBoost[cue.color] ?? 0;

        // Position = ouverture / fermeture
        const spread = Math.abs(cue.position.pan) + Math.abs(cue.position.tilt);
        energy += spread * 0.1;

        return Math.max(0, Math.round(energy));
    },


    // --- 3) Analyse de l’énergie instantanée sur tout le show ---
    computeEnergySeries(show) {
        return show.map(c => this.computeInstantEnergy(c));
    },


    // --- 4) Détection des boosts / drops ---
    detectTransitions(series) {
        const transitions = [];

        for (let i = 1; i < series.length; i++) {
            const delta = series[i] - series[i - 1];

            if (delta > 20) {
                transitions.push({
                    type: "boost",
                    index: i,
                    delta
                });
            }

            if (delta < -20) {
                transitions.push({
                    type: "drop",
                    index: i,
                    delta
                });
            }
        }

        return transitions;
    },


    // --- 5) Détection des zones de repos ---
    detectRestZones(series) {
        const zones = [];
        let current = [];

        for (let i = 0; i < series.length; i++) {
            if (series[i] < 30) {
                current.push(i);
            } else {
                if (current.length >= 2) zones.push([...current]);
                current = [];
            }
        }

        if (current.length >= 2) zones.push(current);

        return zones;
    },


    // --- 6) Analyse des cycles énergétiques ---
    detectCycles(series) {
        const cycles = [];
        let direction = null;
        let start = 0;

        for (let i = 1; i < series.length; i++) {
            const delta = series[i] - series[i - 1];
            const newDir = delta > 0 ? "up" : delta < 0 ? "down" : direction;

            if (direction && newDir !== direction) {
                cycles.push({
                    from: start,
                    to: i - 1,
                    direction
                });
                start = i - 1;
            }

            direction = newDir;
        }

        cycles.push({ from: start, to: series.length - 1, direction });

        return cycles;
    },


    // --- 7) Score énergétique global ---
    globalEnergyScore(series) {
        const avg = series.reduce((a, b) => a + b, 0) / series.length;
        return Math.min(100, Math.round(avg));
    },


    // --- 8) Analyse complète ---
    analyzeEnergy(show) {
        const normalized = show.map(c => this.normalizeCue(c));
        const series = this.computeEnergySeries(normalized);
        const transitions = this.detectTransitions(series);
        const restZones = this.detectRestZones(series);
        const cycles = this.detectCycles(series);
        const score = this.globalEnergyScore(series);

        return {
            series,
            transitions,
            restZones,
            cycles,
            energyScore: score
        };
    }
};

export default A18;
