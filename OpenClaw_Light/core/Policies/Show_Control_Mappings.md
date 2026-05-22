---
status: backlog
title: "Show Control Mappings — OpenClaw Light"
version: "1.0"
---

# Show Control Mappings

## 1 Objectif
Centraliser les mappings OSC/MIDI/Timecode/Art‑Net/sACN et définir les conventions pour génération automatique de pages et triggers.

## 2 Conventions de nommage
- **OSC** : `/openclaw/<project>/<device>/<action>`  
- **MIDI** : Channel 1–16 ; CC mapping `CC <num> = OpenClaw/<module>/<param>`  
- **Timecode** : LTC/MTC/SMPTE → timeline master ; fallback interne si drift > 50ms.

## 3 Mapping standard (exemples)
- **Play cue** : OSC `/openclaw/show/play` ; MIDI CC 20 value 127 ; Timecode trigger SMPTE event.  
- **Pause** : OSC `/openclaw/show/pause` ; MIDI CC 21 value 127.  
- **Go to cue N** : OSC `/openclaw/show/goto <N>` ; MIDI Program Change <N>.

## 4 Pages OSC auto‑générées
- Structure : header (project, version), sections (Show Control, Timeline, Devices), actions (play, stop, goto, override).  
- Pagination : pages par groupe de fixtures / par rôle (lighting, media, FX).

## 5 Timecode & synchronisation
- Master selection : préférence Timecode externe si stable (<20ms drift), sinon fallback OpenClaw internal LTC.  
- Drift handling : correction progressive ; logs et alertes si correction > threshold.

## 6 Triggers réseau
- Art‑Net / sACN triggers : mapping d’événements → univers spécifiques ; sécurisation via VLAN et QoS.  
- Priorités : Timecode > OSC > MIDI > Art‑Net triggers.

## 7 Versioning des mappings
- Chaque mapping exporté avec métadonnées : auteur, date, version PRD, checksum.  
- Rollback possible vers mapping antérieur.

## 8 Tests et validation
- Simulation offline des mappings ; test de latence et de drift ; rapport de validation avant déploiement live.

## 9 Annexes
- Table complète des CC/OSC/PC par projet (template à remplir).

---
## 🔗 Navigation modules
- [[Core/OpenClaw_Light_PRD_v5.2]]
- [[Core/Simulation/Simulation_Globale]]
- [[Core/Diagnostic/Diagnostic_Global]]
- [[Core/ShowControl/Show_Control]]
- [[Core/Visualisation/Visualisation_3D]]
- [[Core/Artistique/Artistique_Predictif]]
- [[Core/Réseau/Réseau_Predictif]]
- [[Core/Rigging/Rigging_Predictif]]
- [[Core/Électricité/Electricite_Predictive]]
- [[Core/DMX/DMX_Predictif]]
- [[Core/HF/HF_Predictif]]
- [[Core/Policies/IA_Policies]]
- [[Core/Policies/Show_Control_Mappings]]
- [[Core/Policies/Render_Presets]]
- [[Core/Versioning/Versioning_Log]]



---

# 🔗 Navigation rapide
- [[Home]]
- [[Kanban_Master]]
- [[Kanban_Automatique]]
- [[Core/README]]
