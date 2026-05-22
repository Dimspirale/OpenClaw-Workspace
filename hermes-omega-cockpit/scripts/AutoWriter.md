<%*
const title = tp.file.title;

const template = `---
status: en_cours
tags: [type/doc]
---

# ${title}

## 🎯 Objectif
Décrire ici l’objectif principal du document.

## 🧩 Contexte
Ajouter le contexte technique, artistique ou opérationnel.

## 🛠️ Détails techniques
- Élément 1
- Élément 2
- Élément 3

## 📐 Structure
1. Introduction
2. Développement
3. Conclusion

## 📝 Notes
Ajouter ici les notes importantes.

---

# 🔗 Navigation rapide
- [[Home]]
- [[Dashboard_OpenClaw]]
- [[Kanban_Master]]
`;

await tp.file.write(template);
tR += "✔️ Document généré automatiquement.";
%>
