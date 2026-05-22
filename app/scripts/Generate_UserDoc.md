<%*
const name = await tp.system.prompt("Nom de la documentation utilisateur");
const file = `UserDocs/UserDoc_${name}.md`;

const template = `# 📘 Documentation Utilisateur — ${name}

## 👋 Introduction
Bienvenue dans la documentation utilisateur du module **${name}**.

## 🚀 Démarrage rapide
1. Ouvrir le module
2. Suivre les instructions
3. Vérifier les résultats

## 🧭 Tutoriel pas-à-pas

\`\`\`mermaid
flowchart TD
  A[Début] --> B[Étape 1]
  B --> C[Étape 2]
  C --> D[Étape 3]
  D --> E[Fin]
\`\`\`

## 🛠️ Fonctionnalités principales
- Fonction 1
- Fonction 2
- Fonction 3

## ❓ FAQ
**Q : Comment utiliser ce module ?**  
R : Suivre les étapes ci-dessus.

**Q : Où trouver les logs ?**  
R : Dans /Logs/.

## 🔗 Navigation rapide
- [[Home]]
- [[Dashboard_OpenClaw]]
- [[UserDocs]]
`;

await app.vault.create(file, template);

tR += "✔️ Documentation utilisateur générée.";
%>
