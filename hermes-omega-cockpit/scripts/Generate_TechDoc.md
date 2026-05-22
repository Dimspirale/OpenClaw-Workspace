<%*
const name = await tp.system.prompt("Nom de la documentation technique");
const file = `TechDocs/TechDoc_${name}.md`;

const template = `# 📘 Documentation Technique — ${name}

## 1. 🎯 Objectif
Décrire ici l’objectif technique du module / système.

## 2. 🧩 Architecture
- Composant 1
- Composant 2
- Composant 3

\`\`\`mermaid
flowchart TD
  A[Entrée] --> B[Traitement]
  B --> C[Sortie]
\`\`\`

## 3. 🔌 Interfaces
### OSC
- Adresse :
- Type :
- Description :

### DMX
- Canal :
- Plage :
- Fonction :

### MIDI
- Note :
- Canal :
- Action :

## 4. 📐 Spécifications
- Norme interne :
- Contraintes :
- Protocoles :
- Formats :

## 5. 🧪 Tests
- Test 1 :
- Test 2 :
- Test 3 :

## 6. 📦 Dépendances
- Module :
- Fichiers liés :

## 7. 🔗 Navigation rapide
- [[Home]]
- [[Dashboard_OpenClaw]]
- [[Dashboard_Technique]]
`;

await app.vault.create(file, template);

tR += "✔️ Documentation technique générée.";
%>
