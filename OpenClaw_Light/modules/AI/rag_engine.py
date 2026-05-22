# ============================================================
#  RAG Engine — OpenClaw_Light / Hermès Cockpit
#  Compatible LlamaIndex 0.14.x
#  Mode : Conversationnel + RAG strict + 100% local (Ollama)
# ============================================================

from llama_index.core import Settings
Settings.llm = None
Settings.embed_model = None

from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding

from llama_index.core.memory import ChatMemoryBuffer
from llama_index.core.chat_engine import ContextChatEngine
from llama_index.core.llms import ChatMessage


def main():
    print("🔧 Chargement du modèle Ollama...")

    # ⚠️ CHOISIS UN MODELE COMPATIBLE RAM :
    # llm = Ollama(model="llama3.2:3b")
    llm = Ollama(model="qwen2.5:3b")

    print("🔧 Chargement de l’embedding local...")
    embed_model = OllamaEmbedding(model_name="nomic-embed-text")

    print("📄 Chargement des documents...")
    docs = SimpleDirectoryReader("data/docs").load_data()

    print("🧠 Construction de l’index...")
    index = VectorStoreIndex.from_documents(
        docs,
        llm=llm,
        embed_model=embed_model
    )

    # ============================================================
    #  MODE CONVERSATIONNEL RAG (compatible 0.14.x)
    # ============================================================

    memory = ChatMemoryBuffer.from_defaults(token_limit=2000)
    retriever = index.as_retriever()

    # ⚠️ VERSION 0.14.x → OBLIGATOIRE : prefix_messages
    prefix_messages = [
        ChatMessage(
            role="system",
            content=(
                "Vous êtes un assistant IA local intégré au cockpit Hermès. "
                "Répondez toujours en français. "
                "Utilisez uniquement les documents indexés. "
                "Ne jamais inventer d'informations. "
                "Style : concis, technique, cockpit‑grade."
            )
        )
    ]

    chat_engine = ContextChatEngine(
        llm=llm,
        memory=memory,
        retriever=retriever,
        prefix_messages=prefix_messages
    )

    print("✅ Moteur RAG conversationnel prêt.")
    print("Tape 'exit' pour quitter.\n")

    # ============================================================
    #  BOUCLE CONVERSATIONNELLE
    # ============================================================
    while True:
        q = input("Question > ")
        if q.lower() in ["exit", "quit"]:
            break

        response = chat_engine.chat(q)
        print(response)


if __name__ == "__main__":
    main()
