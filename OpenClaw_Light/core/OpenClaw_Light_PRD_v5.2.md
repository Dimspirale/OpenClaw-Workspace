---
status: backlog
---
OpenClaw Light — Product Requirements Document (PRD)
Version : 5.2  
Statut : Perfection Étendue — IA Autonome, Show Control, Rendu Artistique

Extrait du PRD source : OpenClaw Light 5.1 est un système unifié, prédictif et auto‑génératif, couvrant l’intégralité d’un projet scénique.  
Extrait du PRD source : Mode : Offline.

1 Vision produit
OpenClaw Light 5.2 est la plateforme unifiée pour la conception, la simulation, la programmation et l’exécution de shows scéniques, combinant prédiction, auto‑génération, contrôle temps réel, sécurité normative et assistance artistique par IA.
La v5.2 formalise l’IA autonome, le Show Control intelligent et le Rendu Artistique Avancé comme piliers transverses, intégrés à tous les modules techniques et artistiques.

2 Problème
Les productions continuent de subir :

fragmentation des outils ;

lenteur et répétitivité des tâches ;

erreurs humaines critiques ;

absence d’un workflow collaboratif et versionné ;

manque de visualisation et de simulation intégrées ;

incohérences entre rigging, DMX/HF, réseau, électricité et direction artistique ;

surcharge cognitive du régisseur et des équipes techniques.

3 Objectifs
Automatiser la programmation, le rigging, le réseau, le DMX/HF/RDM, l’électricité et la logistique.

Comprendre et formaliser l’intention artistique pour générer des presets et des phasers cohérents.

Générer et exécuter un show complet, synchronisé multi‑systèmes.

Simuler et prédire impacts et risques (what‑if).

Corriger automatiquement en temps réel et notifier les opérateurs.

Fournir un diagnostic global et un score de cohérence technique + artistique + sécurité.

Intégrer et faire respecter les normes globales de rigging, électricité, réseau et HF.

Fluidifier la collaboration, le versioning et la traçabilité.

4 Architecture générale
Mode principal : Offline (avec modules de synchronisation et monitoring réseau pour opérations live).

Vault structure : /Core/ et /Projets/ (source de vérité centralisée).

Source de vérité : Bibliothèque\_Matériel.md (catalogue fixtures, moteurs, câbles, racks, profils).

Modules principaux : Programmation, Réseau, HF, DMX/RDM, Rigging, Électricité, Artistique, Visualisation, Workflow, Sécurité \& Normes, Simulation, Diagnostic, Assistant interne, IA Autonome, Show Control, Rendu Artistique Avancé, Apprentissage adaptatif.

Interopérabilité : exports/imports vers MA3, Titan, Capture, Depence, L8, Wysiwyg; mappings OSC/MIDI/Timecode.

5 Convention de coordonnées (v5.2)
5.1 Système global
Origine (0,0,0) : centre de scène.

Axes : X jardin (+), Y cour (+), Z haut (+).

5.2 Unités
Distance : m ; Angle : ° ; Charge : kg ; Puissance : W ; Intensité : A ; DMX : univers/adresse ; Réseau : IP/VLAN/port.

5.3 Références scéniques
Avant‑scène : Y– ; Fond : Y+ ; Cour : X+ ; Jardin : X– ; Grill : Z+ ; Sol : Z=0.

5.4 Orientation appareils
Pan 0° : fond ; Tilt 0° : horizontal ; Tilt + : vers le bas ; Tilt – : vers le haut.

5.5 Rigging
Points, moteurs, élingues et CoG exprimés en XYZ absolus ; angles et vecteurs 3D pour calculs de bridage et sécurité.

5.6 DMX / HF / RDM
Univers : 1 → ∞ ; Adresses : 1–512 ; HF : coordonnées émetteurs/récepteurs ; RDM : mapping réel → patch.

5.7 Réseau
Switch/AP : position XYZ ; VLAN : mapping zones ; Nodes : couverture HF.

5.8 Électricité
Racks : XYZ ; Câbles : distance 3D + slack ; Phases : mapping zones.

5.9 Artistique
Zones : volumes 3D ; Directions : vecteurs ; Focus : XYZ.

5.10 Visualisation
Compatibilité et formats d’export : MA3, Titan, Capture, Depence, L8, Wysiwyg.

6 Programmation prédictive
6.1 Analyse prédictive
Extraction automatique d’intentions artistiques (texte, moodboard, références), corrélées au patch, types de fixtures, positions, couleurs, dynamiques, rythmes et style utilisateur.

6.2 Auto‑programmation
Génération structurée de :

Groupes, palettes, presets, phasers, cue lists, layouts ;

pages OSC/Remote, macros MA3/Titan ;

mappings automatiques pour consoles et visualiseurs.

6.3 Auto‑correction
Détection et correction des conflits de modes DMX, univers, palettes et patch ; propositions d’actions et corrections automatiques avec journalisation et possibilité d’annulation.

7 Réseau prédictif
7.1 Auto‑configuration
Génération automatique de VLANs, IP, routage MA‑Net3/TitanNet, Art‑Net/sACN, QoS, IGMP et PoE selon topologie scénique et contraintes.

7.2 Auto‑détection
Surveillance active : loops, collisions, latence, erreurs switch/nodes, perte de multicast.

7.3 Auto‑correction
Routage univers, correction VLAN/IP/protocole, basculement automatique et recommandations d’intervention physique.

8 DMX + HF + RDM prédictif
8.1 Auto‑analyse
Cartographie filaire et HF, détection de modes DMX, univers, fréquences HF et puissance, et inventaire RDM.

8.2 Auto‑optimisation
Allocation optimale d’univers, choix de fréquences HF, puissance et multi‑univers HF pour minimiser interférences et latence.

8.3 Auto‑correction
Réaffectation d’adresses, changement de modes DMX, fallback HF → filaire, et notifications d’actions prises.

9 Rigging prédictif
9.1 Auto‑analyse
Calculs de charges, angles, bridages, moteurs requis, structure et CoG ; détection de points critiques.

9.2 Auto‑optimisation
Redistribution des charges, correction d’angles, choix moteurs et bridages alternatifs pour respecter normes et contraintes scéniques.

9.3 Auto‑sécurité
Alertes sur surcharge, angles dangereux, bridage incorrect ou moteur inadapté ; génération automatique de plans de correction.

10 Électricité prédictive
10.1 Auto‑analyse
Inventaire phases, circuits, câbles, compatibilité des fixtures et sécurité électrique.

10.2 Auto‑optimisation
Équilibrage des phases, redistribution circuits, correction câbles et réduction des pertes ; recommandations de matériel.

11 Artistique prédictif
11.1 Analyse
Interprétation d’intentions, ambiances, couleurs, dynamiques et rythmes à partir de texte, références audio/vidéo et historiques de projets.

11.2 Génération automatique
Création de palettes artistiques, presets, phasers, transitions cohérentes et d’un show skeleton exploitable par la programmation automatique.

12 Visualisation \& Rendu (module v5.2)
12.1 Auto‑génération 3D
Construction automatique d’une scène 3D complète (grill, ponts, moteurs, barres) avec fixtures positionnés et mapping rigging ↔ DMX ↔ HF ↔ artistique.

12.2 Auto‑export
Exports structurés vers Capture, Depence, L8, MA3 Stage View, Titan Visualiser, avec métadonnées de versioning.

12.3 Auto‑rendu
Rendus d’ambiances, couleurs, phasers, transitions et volumétriques, optimisés pour preview et simulation.

12.4 Auto‑mise à jour
Synchronisation continue : modifications rigging/DMX/artistique → mise à jour 3D en temps réel.

13 Workflow \& Collaboration (module v5.2)
13.1 Gestion équipe
Rôles, permissions granulaires, tâches assignables, suivi d’avancement et journaux d’activité.

13.2 Versioning
Versioning complet : plans, patchs, rigging, réseau, show. Possibilité de branches, merges et rollbacks.

13.3 Communication
Notes techniques, commentaires contextuels, rapports automatiques et notifications ciblées.

13.4 Synchronisation
Synchronisation bidirectionnelle MA3 ↔ Titan ↔ OpenClaw ↔ Visualiseurs ; gestion des conflits et règles de priorité.

14 Sécurité \& Normes Globales (module v5.2)
14.1 Normes rigging
Conformité CWA 15902‑1 ; vérifications automatiques de charges, angles et bridages.

14.2 Normes électricité
Conformité EN 60598, EN 62368, ERP ; contrôles de compatibilité et sécurité.

14.3 Normes réseau
Conformité EN 50173 ; bonnes pratiques broadcast/multicast et sécurité réseau.

14.4 Normes HF
Conformité EN 300 328 ; gestion des puissances et fréquences HF.

14.5 Auto‑vérification
Moteur de conformité : audits automatiques, scoring des risques et alertes actionnables.

15 Simulation globale
15.1 Simulation What‑if
Scénarios : rigging, DMX, HF, réseau, électricité, artistique, programmation ; simulation d’impacts et de risques.

15.2 Recalcul automatique
Recalculs en cascade : charges, latence, RF, DMX, sécurité, univers, phasers ; génération de rapports et recommandations.

16 Diagnostic global
16.1 Diagnostic complet
Couverture : rigging, DMX, HF, RDM, réseau, Wi‑Fi, électricité, artistique, programmation, visualisation, workflow, normes.

16.2 Score global
Score composite de cohérence technique + artistique + sécurité, avec seuils d’alerte et priorisation des actions correctives.

17 Assistant interne — Perfection
17.1 Capacités
Réponses techniques et artistiques, optimisation et correction automatiques, génération et simulation de shows, diagnostics explicites.

17.2 Exemples d’instructions
“Génère le show complet”

“Optimise tout”

“Corrige tout”

“Simule l’impact”

“Quel est le risque principal”

“Quel est le meilleur choix artistique”

18 IA Autonome (nouveau module central)
L’IA autonome devient un agent transversal : surveillance continue, optimisation en temps réel, auto‑show et apprentissage adaptatif.

18.1 Auto‑analyse continue
Surveillance permanente de : rigging, DMX, HF, réseau, électricité, artistique, programmation, visualisation. Détection d’incohérences, risques, optimisations et opportunités artistiques.

18.2 Auto‑optimisation en temps réel
Ajustements automatiques contrôlés et traçables : univers DMX, fréquences et puissance HF, VLANs/IP, phasers, palettes, transitions, angles de rigging, charges, circuits électriques. Toutes actions automatiques sont loggées, réversibles et soumises à règles de sécurité.

18.3 Auto‑show
Capacité à générer un show complet (structure de cues, transitions, phasers, palettes) exécutable en mode assisté ou autonome, avec options de supervision humaine.

18.4 Auto‑apprentissage
Apprentissage des préférences : style de programmation, couleurs, dynamiques, choix de rigging, habitudes réseau et workflows. Modèle adaptatif qui propose des presets personnalisés et améliore ses suggestions au fil des projets.

18.5 Auto‑visualisation
Mises à jour automatiques de la scène 3D, positions, rendus, ambiances et volumes en fonction des optimisations et des corrections.

18.6 Auto‑correction
En cas d’erreur détectée (DMX, HF, réseau, rigging, électricité, artistique), l’IA applique corrections immédiates selon politiques définies et notifie les opérateurs avec justification technique et artistique.

19 Show Control (nouveau module)
19.1 Protocoles supportés
Timecode LTC/MTC/SMPTE, MIDI, OSC avancé, Art‑Net triggers, sACN triggers.

19.2 Auto‑mapping
Génération automatique des pages OSC, mappings MIDI, triggers timecode, timelines et synchronisations MA3/Titan.

19.3 Timeline intelligente
Analyse musicale : détection BPM, transitions, génération d’une timeline artistique et placement automatique des cues.

19.4 Synchronisation multi‑systèmes
Synchronisation MA3 ↔ Titan ↔ OpenClaw ↔ médias (vidéo, son, FX) ; gestion des drift timecode et fallback interne.

19.5 Auto‑sécurité Show Control
Détection de dérive timecode, correction automatique, fallback timecode interne et monitoring en temps réel.

20 Rendu Artistique Avancé (nouveau module)
20.1 Génération d’ambiances par IA
À partir d’un texte ou d’une référence, génération d’ambiance, couleur dominante, dynamique, intention et émotion ; production de palettes, presets, phasers et rendu 3D.

20.2 Génération de palettes par IA
Palettes cohérentes, complémentaires et émotionnelles, adaptées à la scénographie et aux contraintes techniques.

20.3 Génération de phasers par IA
Phasers dynamiques, rythmiques, organiques, géométriques et volumétriques, synchronisables au tempo et aux événements.

20.4 Génération de transitions par IA
Transitions lentes, musicales, émotionnelles et scénographiques, avec paramètres éditables et versionnés.

20.5 Rendu 3D artistique
Rendus volumétriques, atmosphères, faisceaux, ombres et ambiances globales fidèles à l’identité artistique.

20.6 Style utilisateur
L’IA apprend le style utilisateur et génère des rendus fidèles à l’identité artistique, avec options d’ajustement fin.

21 Intégration transversale IA / Show Control / Rendu
Politiques d’action : toutes actions automatiques définies par règles (sécurité, seuils, approbation humaine).

Traçabilité : journal complet des décisions IA, versions et rollback.

Modes opératoires : Assisté (suggestions), Supervisé (actions automatiques avec approbation rapide), Autonome (exécution automatique selon règles validées).

Interfaces : dashboards temps réel, notifications, logs, et API pour intégration tierce.

22 Backlog Phase 18 (v5.2)
Nouveaux axes
Renforcement sécurité globale IA ;

Orchestration multi‑site ;

Plugins médias (vidéo, FX) ;

Tests de robustesse HF en environnements denses.

Améliorations prioritaires
Auto‑rendu temps réel optimisé GPU ;

Auto‑export 3D enrichi (métadonnées) ;

Versioning technique avancé ;

Normes unifiées et certification.

23 Checklist Déploiement (v5.2)
Matériel : inventaire et compatibilité.

Patch : DMX/RDM/Network.

Réseau : VLANs, QoS, IGMP, PoE.

HF : coverage, fréquences, puissance.

Rigging : plans, moteurs, bridages, CoG.

Électricité : phases, circuits, câblage.

Artistique : presets, palettes, phasers.

Visualisation : scène 3D, exports.

Sécurité : audits normes.

Workflow : rôles, permissions, versioning.

Validation finale : simulation what‑if, diagnostic global, approbation.

24 Annexes techniques
24.1 Formats d’export
MA3, Titan, Capture, Depence, L8, Wysiwyg ; JSON/CSV pour métadonnées.

24.2 Protocoles et ports recommandés
Art‑Net, sACN, MA‑Net3, TitanNet, OSC, MIDI, SMPTE/LTC/MTC ; recommandations QoS et PoE.

24.3 Politique d’actions automatiques
Définition des seuils, approbations, rollback, journaux et notifications.

24.4 Glossaire
Définitions clés : univers, palette, phaser, cue list, CoG, VLAN, RDM, HF node.

25 Notes de gouvernance et sécurité
Sécurité par conception : toutes les actions automatiques respectent les normes et politiques de sécurité.

Contrôle humain : possibilité d’interrompre, d’approuver ou d’annuler toute action IA.

Conformité : audits réguliers et rapports de conformité.

26 Versioning et historique
v5.0 → v5.1 : ajout Visualisation, Workflow, Normes.

v5.2 : intégration IA Autonome, Show Control, Rendu Artistique Avancé ; ré‑architecture pour usage Vault/Obsidian ; perfection documentaire.

27 Instructions d’intégration Vault
Placer OpenClaw\_Light\_PRD\_v5.2.md dans /Core/ ;

Lier Bibliothèque\_Matériel.md en tant que source de vérité ;

Créer pages séparées pour : IA Policies, Show Control Mappings, Render Presets, Versioning Log.

\## 🔗 Liens internes du Vault

\- \[\[Core/Bibliothèque\_Matériel]]

\- \[\[Core/Simulation/Simulation\_Globale]]

\- \[\[Core/Diagnostic/Diagnostic\_Global]]

\- \[\[Core/ShowControl/Show\_Control]]

\- \[\[Core/Visualisation/Visualisation\_3D]]

\- \[\[Core/Artistique/Artistique\_Predictif]]

\- \[\[Core/Réseau/Réseau\_Predictif]]

\- \[\[Core/Rigging/Rigging\_Predictif]]

\- \[\[Core/Électricité/Electricite\_Predictive]]

\- \[\[Core/DMX/DMX\_Predictif]]

\- \[\[Core/HF/HF\_Predictif]]

\- \[\[Core/Policies/IA\_Policies]]

\- \[\[Core/Policies/Show\_Control\_Mappings]]

\- \[\[Core/Policies/Render\_Presets]]

\- \[\[Core/Versioning/Versioning\_Log]]

28 Récapitulatif exécutif (1 paragraphe)
OpenClaw Light v5.2 transforme le PRD en un framework intégré où l’IA autonome, le Show Control intelligent et le Rendu Artistique Avancé sont des composants centraux et transverses : ils surveillent, optimisent, génèrent et corrigent en continu tout l’écosystème scénique, tout en garantissant traçabilité, sécurité normative et contrôle humain.



\---

\## 🔗 Navigation modules

\- \[\[Core/OpenClaw\_Light\_PRD\_v5.2]]

\- \[\[Core/Simulation/Simulation\_Globale]]

\- \[\[Core/Diagnostic/Diagnostic\_Global]]

\- \[\[Core/ShowControl/Show\_Control]]

\- \[\[Core/Visualisation/Visualisation\_3D]]

\- \[\[Core/Artistique/Artistique\_Predictif]]

\- \[\[Core/Réseau/Réseau\_Predictif]]

\- \[\[Core/Rigging/Rigging\_Predictif]]

\- \[\[Core/Électricité/Electricite\_Predictive]]

\- \[\[Core/DMX/DMX\_Predictif]]

\- \[\[Core/HF/HF\_Predictif]]

\- \[\[Core/Policies/IA\_Policies]]

\- \[\[Core/Policies/Show\_Control\_Mappings]]

\- \[\[Core/Policies/Render\_Presets]]

\- \[\[Core/Versioning/Versioning\_Log]]





---

# 🔗 Navigation rapide
- [[Home]]
- [[Kanban_Master]]
- [[Kanban_Automatique]]
- [[Core/README]]
