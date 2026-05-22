obsidian_write() {
    local file="$1"
    shift
    local content="$@"

    echo "[ObsidianBridge] Écriture : $file"
    echo "$content" > "$file"
}
