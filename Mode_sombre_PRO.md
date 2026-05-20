# 🎨 Mode sombre PRO — Dashboards OpenClaw Light

> À mettre dans `.obsidian/snippets/dashboard-dark-pro.css` puis à activer dans Obsidian.

```css
/* ====== BASE DASHBOARD LOOK ====== */
.markdown-preview-view h1,
.markdown-preview-view h2,
.markdown-preview-view h3 {
    letter-spacing: 0.03em;
    text-transform: none;
}

/* Conteneur général des dashboards */
.markdown-preview-view {
    --oc-bg: #05060a;
    --oc-bg-soft: #0b0f18;
    --oc-bg-softer: #111827;
    --oc-border: #1f2933;
    --oc-border-strong: #374151;
    --oc-text: #e5e7eb;
    --oc-text-soft: #9ca3af;
    --oc-accent: #38bdf8;
    --oc-accent-soft: rgba(56, 189, 248, 0.12);
    --oc-green: #22c55e;
    --oc-red: #f97373;
    --oc-orange: #fb923c;
    --oc-yellow: #eab308;
    --oc-blue: #3b82f6;
}

/* Fond global */
.theme-dark .markdown-preview-view {
    background: radial-gradient(circle at top, #020617 0, #020617 40%, #020617 100%);
    color: var(--oc-text);
}

/* Blocs de sections (titres + contenu) */
.theme-dark .markdown-preview-view h1,
.theme-dark .markdown-preview-view h2 {
    border-bottom: 1px solid var(--oc-border);
    padding-bottom: 0.25rem;
    margin-bottom: 0.75rem;
}

.theme-dark .markdown-preview-view h1 {
    color: #e5e7eb;
}

.theme-dark .markdown-preview-view h2 {
    color: #e5e7eb;
}

.theme-dark .markdown-preview-view h3 {
    color: var(--oc-accent);
}

/* ====== TABLES (Dataview & Markdown) ====== */
.theme-dark .markdown-preview-view table {
    width: 100%;
    border-collapse: collapse;
    background: var(--oc-bg-soft);
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--oc-border);
    font-size: 0.9rem;
}

.theme-dark .markdown-preview-view th,
.theme-dark .markdown-preview-view td {
    padding: 6px 10px;
    border-bottom: 1px solid var(--oc-border);
}

.theme-dark .markdown-preview-view th {
    background: #020617;
    color: #e5e7eb;
    font-weight: 600;
}

.theme-dark .markdown-preview-view tr:nth-child(even) td {
    background: rgba(15, 23, 42, 0.9);
}

.theme-dark .markdown-preview-view tr:nth-child(odd) td {
    background: rgba(15, 23, 42, 0.7);
}

.theme-dark .markdown-preview-view tr:hover td {
    background: rgba(56, 189, 248, 0.08);
}

/* ====== LISTES ====== */
.theme-dark .markdown-preview-view ul,
.theme-dark .markdown-preview-view ol {
    color: var(--oc-text-soft);
}

/* ====== BLOCS DATAVIEWJS / CODE ====== */
.theme-dark .markdown-preview-view pre code {
    background: #020617;
    border-radius: 6px;
    border: 1px solid var(--oc-border);
    padding: 8px 10px;
    display: block;
    font-size: 0.85rem;
}

/* ====== ALERTES (intégration avec Dashboard_Alerts) ====== */
.theme-dark .alert-critical {
    padding: 6px 10px;
    margin: 4px 0;
    border-left: 4px solid #f97373;
    background: rgba(248, 113, 113, 0.12);
    color: #fecaca;
    font-weight: 600;
    border-radius: 4px;
}

.theme-dark .alert-missing {
    padding: 6px 10px;
    margin: 4px 0;
    border-left: 4px solid #fb923c;
    background: rgba(251, 146, 60, 0.12);
    color: #fed7aa;
    font-weight: 600;
    border-radius: 4px;
}

.theme-dark .alert-delayed {
    padding: 6px 10px;
    margin: 4px 0;
    border-left: 4px solid #eab308;
    background: rgba(234, 179, 8, 0.12);
    color: #facc15;
    font-weight: 600;
    border-radius: 4px;
}

.theme-dark .alert-paused {
    padding: 6px 10px;
    margin: 4px 0;
    border-left: 4px solid #3b82f6;
    background: rgba(59, 130, 246, 0.12);
    color: #bfdbfe;
    font-weight: 600;
    border-radius: 4px;
}

/* ====== MERMAID (Gantt, etc.) ====== */
.theme-dark .markdown-preview-view .mermaid {
    background: var(--oc-bg-soft) !important;
    border-radius: 6px;
    border: 1px solid var(--oc-border);
}

/* ====== BOUTONS (plugin Buttons) ====== */
.theme-dark .button-default {
    background: var(--oc-bg-soft);
    border-radius: 999px;
    border: 1px solid var(--oc-border-strong);
    color: var(--oc-text);
    padding: 4px 10px;
    font-size: 0.85rem;
}

.theme-dark .button-default:hover {
    border-color: var(--oc-accent);
    box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.4);
}

/* ====== NAVIGATION RAPIDE ====== */
.theme-dark .markdown-preview-view ul li a.internal-link {
    color: var(--oc-accent);
}

.theme-dark .markdown-preview-view ul li a.internal-link:hover {
    text-decoration: underline;
}
