# ============================================================
#  RAG Pipeline — OpenClaw_Light / Hermès Cockpit
#  Version Cockpit-Grade (hashing, atomic, incremental)
#  Compatible LlamaIndex 0.14.x + Ollama
# ============================================================

import os
import hashlib
import json
from pathlib import Path

from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding


# ------------------------------------------------------------
#  CONFIG
# ------------------------------------------------------------

DOCS_DIR = Path("data/docs")
STATE_FILE = Path("data/state.json")
INDEX_DIR = Path("data/index")


# ------------------------------------------------------------
#  UTILS
# ------------------------------------------------------------

def sha256_file(path: Path) -> str:
    """Retourne le hash SHA256 d’un fichier."""
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def atomic_write(path: Path, data: dict):
    """Écriture atomique (sécurisée) d’un fichier JSON."""
    tmp = path.with_suffix(".tmp")
    with open(tmp, "w") as f:
        json.dump(data, f, indent=2)
    os.replace(tmp, path)


def load_state() -> dict:
    """Charge l’état du pipeline (hashes)."""
    if not STATE_FILE.exists():
        return {}
    with open(STATE_FILE, "r") as f:
        return json.load(f)


def save_state(state: dict):
    """Sauvegarde l’état du pipeline."""
    atomic_write(STATE_FILE, state)


# ------------------------------------------------------------
#  PIPELINE PRINCIPAL
# ------------------------------------------------------------

def run_pipeline():
    print("🔧 Pipeline RAG — Mode cockpit-grade")
    print("📁 Dossier documents :", DOCS_DIR)

    state = load_state()
    new_state = {}

    changed_files = []
    all_docs = []

    # --------------------------------------------------------
    # 1) Scan des fichiers + hashing
    # --------------------------------------------------------
    for file in DOCS_DIR.glob("*"):
        if not file.is_file():
            continue

        file_hash = sha256_file(file)
        new_state[str(file)] = file_hash

        if state.get(str(file)) != file_hash:
            print(f"🟡 Modification détectée : {file.name}")
            changed_files.append(file)
        else:
            print(f"🟢 Inchangé : {file.name}")

    # --------------------------------------------------------
    # 2) Si aucun changement → rien à faire
    # --------------------------------------------------------
    if not changed_files:
        print("✅ Aucun changement détecté. Index inchangé.")
        return

    # --------------------------------------------------------
    # 3) Recharger tous les documents (léger)
    # --------------------------------------------------------
    print("📄 Chargement des documents…")
    all_docs = SimpleDirectoryReader(str(DOCS_DIR)).load_data()

    # --------------------------------------------------------
    # 4) Reconstruction de l’index (nécessaire en 0.14.x)
    # --------------------------------------------------------
    print("🧠 Reconstruction de l’index…")

    llm = Ollama(model="qwen2.5:3b")
    embed_model = OllamaEmbedding(model_name="nomic-embed-text")

    index = VectorStoreIndex.from_documents(
        all_docs,
        llm=llm,
        embed_model=embed_model
    )

    # --------------------------------------------------------
    # 5) Sauvegarde de l’index
    # --------------------------------------------------------
    print("💾 Sauvegarde de l’index…")
    INDEX_DIR.mkdir(parents=True, exist_ok=True)
    index.storage_context.persist(persist_dir=str(INDEX_DIR))

    # --------------------------------------------------------
    # 6) Mise à jour de l’état
    # --------------------------------------------------------
    save_state(new_state)

    print("✅ Pipeline terminé. Index mis à jour.")


# ------------------------------------------------------------
#  MAIN
# ------------------------------------------------------------

if __name__ == "__main__":
    run_pipeline()
