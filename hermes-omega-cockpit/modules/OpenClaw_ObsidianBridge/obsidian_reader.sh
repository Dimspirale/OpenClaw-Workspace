obsidian_read() {
    local file="$1"

    if [ ! -f "$file" ]; then
        echo "[ObsidianBridge] Fichier introuvable : $file"
        return 1
    fi

    echo "[ObsidianBridge] Lecture : $file"
    cat "$file"
}
