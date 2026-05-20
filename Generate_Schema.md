<%*
const name = await tp.system.prompt("Nom du schéma");
const file = `Schemas/Schema_${name}.md`;

const template = `# 🗺️ Schéma — ${name}

## 🧩 Architecture

\`\`\`mermaid
flowchart TD
  A[Entrée] --> B[Module 1]
  B --> C[Module 2]
  C --> D[Sortie]
\`\`\`

## 🔄 Flux interne

\`\`\`mermaid
sequenceDiagram
  participant User
  participant System
  participant Module

  User->>System: Action
  System->>Module: Traitement
  Module-->>System: Résultat
  System-->>User: Retour
\`\`\`

## 🕸️ Dépendances

\`\`\`mermaid
graph LR
  Core --> Simulation
  Core --> Diagnostic
  Simulation --> ShowControl
  Diagnostic --> Policies
\`\`\`

## 🌐 Réseau

\`\`\`mermaid
graph TD
  Client -->|OSC| Serveur
  Serveur -->|DMX| Projecteurs
  Serveur -->|MIDI| Contrôleurs
\`\`\`

## 🔧 Pipeline

\`\`\`mermaid
flowchart LR
  Clean --> Tags --> Status --> Version --> Build --> Package
\`\`\`
`;

await app.vault.create(file, template);

tR += "✔️ Schéma généré.";
%>
