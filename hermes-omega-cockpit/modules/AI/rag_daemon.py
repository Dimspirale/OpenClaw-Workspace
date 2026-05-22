# ============================================================
#  RAG Daemon — OpenClaw_Light / Hermès Cockpit
#  Version Cockpit-Grade (inotify, auto-pipeline)
# ============================================================

import time
import subprocess
from pathlib import Path

try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
except ImportError:
    print("❌ Module watchdog manquant. Installe-le avec :")
    print("   pip install watchdog")
    exit(1)

DOCS_DIR = Path("data/docs")
PIPELINE_CMD = ["python3", "rag_pipeline.py"]


# ------------------------------------------------------------
#  HANDLER
# ------------------------------------------------------------

class DocsChangeHandler(FileSystemEventHandler):
    def on_any_event(self, event):
        if event.is_directory:
            return

        print(f"🟡 Changement détecté : {event.src_path}")
        print("🚀 Lancement du pipeline RAG…")

        subprocess.run(PIPELINE_CMD)

        print("✅ Pipeline terminé. Surveillance continue.\n")


# ------------------------------------------------------------
#  MAIN
# ------------------------------------------------------------

def main():
    print("🔧 Démarrage du daemon RAG (cockpit-grade)")
    print(f"📁 Surveillance du dossier : {DOCS_DIR}")

    if not DOCS_DIR.exists():
        print("❌ Le dossier data/docs n’existe pas.")
        return

    event_handler = DocsChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, str(DOCS_DIR), recursive=False)
    observer.start()

    print("🟢 Daemon actif. En attente de modifications…\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("🛑 Arrêt du daemon.")
        observer.stop()

    observer.join()


if __name__ == "__main__":
    main()
