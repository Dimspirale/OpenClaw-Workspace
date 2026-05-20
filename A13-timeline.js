/*
A13 — Timeline Engine
OpenClaw Light — Official Module
Version: 1.0
Author: Dimitri + Copilot

ROLE:
Analyse, structure et optimise des timelines complètes :
- normalisation des événements
- calcul des durées
- détection de conflits temporels
- génération de timeline structurée
- optimisation temporelle
*/

const A13 = {

    // --- 1) Normalisation d’un événement ---
    normalizeEvent(evt) {
        const fixed = { ...evt };

        if (!fixed.time) fixed.time = 0;
        if (!fixed.type) fixed.type = "generic";
        if (!fixed.payload) fixed.payload = {};

        return fixed;
    },


    // --- 2) Normalisation d’une timeline complète ---
    normalizeTimeline(events) {
        return events.map(e => this.normalizeEvent(e));
    },


    // --- 3) Tri temporel ---
    sortByTime(events) {
        return [...events].sort((a, b) => a.time - b.time);
    },


    // --- 4) Détection de conflits temporels ---
    detectConflicts(events) {
        const conflicts = [];

        for (let i = 1; i < events.length; i++) {
            if (events[i].time === events[i - 1].time) {
                conflicts.push({
                    indexA: i - 1,
                    indexB: i,
                    time: events[i].time,
                    message: "Deux événements au même timestamp"
                });
            }
        }

        return conflicts;
    },


    // --- 5) Calcul des durées entre événements ---
    computeDurations(events) {
        const durations = [];

        for (let i = 1; i < events.length; i++) {
            const delta = events[i].time - events[i - 1].time;
            durations.push({
                from: i - 1,
                to: i,
                duration: delta
            });
        }

        return durations;
    },


    // --- 6) Optimisation temporelle ---
    optimize(events) {
        const optimized = [...events];
        let fixes = 0;

        for (let i = 1; i < optimized.length; i++) {
            if (optimized[i].time <= optimized[i - 1].time) {
                optimized[i].time = optimized[i - 1].time + 1;
                fixes++;
            }
        }

        return {
            optimized,
            fixes,
            comment: fixes > 0
                ? `${fixes} conflits temporels corrigés`
                : "Aucun conflit temporel"
        };
    },


    // --- 7) Génération d’une timeline structurée ---
    generateTimeline(events) {
        const normalized = this.normalizeTimeline(events);
        const sorted = this.sortByTime(normalized);
        const conflicts = this.detectConflicts(sorted);
        const durations = this.computeDurations(sorted);
        const optimization = this.optimize(sorted);

        return {
            timeline: optimization.optimized,
            conflicts,
            durations,
            optimization: optimization.comment
        };
    }
};

export default A13;
