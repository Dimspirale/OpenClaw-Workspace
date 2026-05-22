# OpenClaw · Hermès Cockpit Environment

OpenClaw est un environnement modulaire conçu pour fournir un cockpit shell
ultra-stable, minimaliste et optimisé pour le travail technique, l’IA locale,
le benchmarking GPU et les workflows professionnels.

Hermès Cockpit fournit :
- un HUD dynamique
- des prompts adaptatifs
- des scripts cockpit-safe
- une structure propre et modulaire
- zéro pollution de fichiers
- compatibilité WSL Ubuntu / Linux

OpenClaw_Light fournit :
- un moteur IA léger
- des outils de benchmark GPU
- des modules d’analyse
- une architecture simple et extensible

---

## 📦 Structure du projet

openclaw/
│
├── cockpit/
│   ├── hermes/              # HUD, prompts, modules
│   ├── scripts/             # scripts cockpit-safe
│   └── runtime/             # fichiers générés (non versionnés)
│
├── openclaw_light/
│   ├── src/
│   ├── models/
│   └── benchmarks/
│
├── tools/                   # GPU, réseau, DMX/sACN/ArtNet
│
├── install.sh               # installation cockpit-safe
├── update.sh                # mise à jour automatique
├── .gitignore               # runtime, logs, caches
└── README.md                # ce fichier


---

## 🚀 Installation

Cloner le dépôt :

```bash
git clone git@github.com:Dimspirale/openclaw.git
cd openclaw

Installer l’environnement :
./install.sh

Mise à jour:
git pull
./update.sh

Benchmarks GPU:
Les scripts de benchmark se trouvent dans :
openclaw_light/benchmarks/

Scripts Cockpit
Les scripts Hermès Cockpit sont dans :
cockpit/scripts/

Fichiers non versionnés
Les fichiers runtime, logs, caches et modèles sont exclus via .gitignore

Licence
Projet privé — usage personnel uniquement.

