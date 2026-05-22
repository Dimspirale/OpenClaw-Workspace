// Update_Internal_Links.js
// Synchronisation automatique des wikilinks internes OpenClaw_Light
// Scanne les fichiers clés, corrige les liens, garantit la cohérence cockpit

module.exports = async (tp) => {

    const dv = app.plugins.plugins.dataview.api;
    const vault = app.vault;

    // --- Fichiers officiels à maintenir ---
    const targets = [
        "Plan_Fusion_4_Eres.md",
        "Cockpit_Architecture_A1-A22_V17-V∴.md",
        "Schema_Global_Arborescence.md",
        "Carte_Mentale_Cockpit.md",
        "Dashboard_ERA_Modules_Outils.md",
        "Index_Cockpit.md",
        "Index_Cockpit_Auto.md"
    ];

    // --- Génération automatique des wikilinks corrects ---
    const links = {
        plan: "[[Plan_Fusion_4_Eres]]",
        cockpit: "[[Cockpit_Architecture_A1-A22_V17-V∴]]",
        schema: "[[Schema_Global_Arborescence]]",
        map: "[[Carte_Mentale_Cockpit]]",
        dashboard: "[[Dashboard_ERA_Modules_Outils]]",
        index: "[[Index_Cockpit]]",
        auto: "[[Index_Cockpit_Auto]]"
    };

    // --- Fonction de remplacement intelligent ---
    const replaceLinks = (content) => {

        // Supprime les anciens liens cassés ou doublons
        content = content
            .replace(/

\[

\[(.*?)(#.*?)?\]

\]

/g, (match) => {
                const clean = match.replace(/\s+/g, " ").trim();
                return clean;
            });

        // Ajoute les liens officiels si absents
        const required = [
            links.plan,
            links.cockpit,
            links.schema,
            links.map,
            links.dashboard
        ];

        required.forEach(l => {
            if (!content.includes(l)) {
                content = `${l}\n${content}`;
            }
        });

        return content;
    };

    // --- Traitement de chaque fichier ---
    for (const filename of targets) {

        const file = vault.getAbstractFileByPath(`OpenClaw_Light/**/${filename}`);

        if (!file) continue;

        const content = await vault.read(file);
        const updated = replaceLinks(content);

        if (updated !== content) {
            await vault.modify(file, updated);
        }
    }

    new Notice("Wikilinks cockpit mis à jour avec succès.");
};
