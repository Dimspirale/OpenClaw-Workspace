obsidian_ai_query() {
    local file="$1"
    local model="${2:-llama3}"

    if [ ! -f "$file" ]; then
        echo "[ObsidianBridge] Fichier introuvable : $file"
        return 1
    fi

    echo "[ObsidianBridge] Analyse IA du fichier : $file"
    ollama run "$model" "$(cat "$file")"
}
