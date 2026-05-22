<%*
tR += "🚀 OpenClaw Autonomous Mode — DÉMARRAGE\n";

// Nettoyage
await tp.user.CleanVault();
tR += "✔️ CleanVault\n";

// Tags
await tp.user.Batch_AddTags();
tR += "✔️ Tags\n";

// Status + Footer
await tp.user.Batch_Footer_Status();
tR += "✔️ Status + Footer\n";

// Versioning
await tp.user.AutoVersioning();
tR += "✔️ Versioning\n";

// Build
await tp.user.Build_OpenClaw();
tR += "✔️ Build\n";

// Packaging
await tp.user.Package_Module();
tR += "✔️ Packaging\n";

// Optimisation
await tp.user.Optimize_Vault();
tR += "✔️ Optimisation\n";

// Clustering
await tp.user.Cluster_Vault?.();
tR += "✔️ Clustering\n";

// Analyse
await tp.user.Generate_Tests();
tR += "✔️ Tests\n";

// Rapport
await tp.user.Generate_Report();
tR += "✔️ Rapport\n";

tR += "\n🎉 OpenClaw Autonomous Mode — TERMINÉ";
%>
