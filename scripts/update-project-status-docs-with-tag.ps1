# update-project-status-docs-with-tag.ps1
# Usage: exécuter depuis la racine du repo
# Place: scripts\update-project-status-docs-with-tag.ps1

function Get-Next-ContextTag {
    param($prefix = "context/v")
    $tags = & git tag --list "$prefix*"
    if (-not $tags) { return "${prefix}1.0" }
    $versions = $tags | ForEach-Object {
        $_ -replace "^$prefix",""
    } | ForEach-Object {
        # normalize to major.minor (if possible)
        if ($_ -match "^\d+(\.\d+)*$") { $_ } else { "0.0" }
    }
    $max = $versions | Sort-Object { [version]$_ } -Descending | Select-Object -First 1
    try {
        $v = [version]$max
        $new = "{0}.{1}" -f $v.Major, ($v.Minor + 1)
        return "${prefix}${new}"
    } catch {
        return "${prefix}1.0"
    }
}

$RepoRoot = (Get-Location).Path
$DocsDir = Join-Path $RepoRoot "docs"
$ProjectFile = Join-Path $DocsDir "PROJECT_STATUS.md"
$ManifestFile = Join-Path $DocsDir "CONTEXT_MANIFEST.json"
$branch = "docs/project-status"

if (-not (Test-Path $DocsDir)) { New-Item -Path $DocsDir -ItemType Directory | Out-Null }

# Écrire/mettre à jour PROJECT_STATUS.md (modèle)
$projectStatus = @"
# Project Status — OpenClaw_Light
**Date**: $(Get-Date -Format "yyyy-MM-dd")
**Commit de référence**: (sera rempli automatiquement)

## 1. Objectifs principaux
- Stabiliser la branche `main` comme production.
- Centraliser le contexte du projet dans `docs/PROJECT_STATUS.md`.
- Documenter l'usage de Git LFS et les objets volumineux.
- Fournir un manifest machine‑lisible pour pointer vers le commit de référence.

## 2. Décisions prises
- `main` = production (déploiement).
- `docs/project-status` = synthèse et source de vérité pour le contexte.

## 3. Tâches ouvertes
- Vérifier intégrité des objets LFS listés.
- Valider que `v19.1` correspond au tag de release attendu.

## 4. Références Git LFS
- Commandes utiles:
  - `git fetch --all --tags`
  - `git lfs ls-files`
  - `git worktree prune`

## 5. Checklist environnement reproductible
- Tag de référence: **v19.1** ou commit SHA indiqué.
- Étapes rapides:
  1. `git fetch --all --tags`
  2. `git checkout <sha|tag>`
  3. `git lfs pull`

## 6. Historique des entrées
- $(Get-Date -Format "yyyy-MM-dd") — Entrée initiale : création de la synthèse et manifest.
"@
Set-Content -Path $ProjectFile -Value $projectStatus -Encoding UTF8

# Écrire/mettre à jour CONTEXT_MANIFEST.json (modèle)
$manifestObj = @{
    project = "OpenClaw_Light"
    repo_root = $RepoRoot
    reference_commit = ""
    reference_tag = "v19.1"
    context_sources = @{
        conversations = "local/notes/conversations.md"
        issues = "github:Dimspirale/OpenClaw-Workspace/issues"
        pull_requests = "github:Dimspirale/OpenClaw-Workspace/pulls"
        docs = "docs/PROJECT_STATUS.md"
    }
    lfs = @{
        checked = $true
        note = "Exécuter git lfs ls-files pour vérifier les objets"
    }
    last_updated = (Get-Date).ToString("o")
}
$manifestJson = $manifestObj | ConvertTo-Json -Depth 6
Set-Content -Path $ManifestFile -Value $manifestJson -Encoding UTF8

# Git ops
Write-Host "Fetching remotes and tags..."
& git fetch --all --tags

Write-Host "Switching to main and pulling latest..."
& git checkout main
& git pull origin main

Write-Host "Creating/updating branch $branch..."
& git checkout -B $branch

Write-Host "Staging docs files..."
& git add $ProjectFile $ManifestFile

# Commit if needed
$commitMessage1 = "chore(docs): update PROJECT_STATUS and CONTEXT_MANIFEST"
$commitOutput = & git commit -m $commitMessage1 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Aucun changement à committer pour l'ajout initial (ou erreur) :"
    Write-Host $commitOutput
} else {
    Write-Host "Commit initial effectué."
}

# SHA courant
$sha = (& git rev-parse HEAD).Trim()
Write-Host "SHA courant : $sha"

# Mettre à jour manifest avec le SHA
$manifestObj.reference_commit = $sha
$manifestObj.last_updated = (Get-Date).ToString("o")
$manifestJson = $manifestObj | ConvertTo-Json -Depth 6
Set-Content -Path $ManifestFile -Value $manifestJson -Encoding UTF8

# Commit manifest update si nécessaire
& git add $ManifestFile
$commitOutput2 = & git commit -m "chore(docs): set reference_commit $sha" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Aucun changement à committer pour le manifest (ou erreur) :"
    Write-Host $commitOutput2
} else {
    Write-Host "Manifest mis à jour et commité."
}

# Demande de confirmation avant push
Write-Host ""
Write-Host "Prêt à pousser la branche '$branch' vers origin."
$confirm = Read-Host "Confirmer le push ? Tape 'yes' pour pousser, 'no' pour annuler"
if ($confirm -ne "yes") {
    Write-Host "Push annulé par l'utilisateur. Les fichiers sont prêts localement."
    exit 0
}

# Push (force-with-lease pour sécurité)
Write-Host "Pushing branch $branch to origin (force-with-lease)..."
& git push origin HEAD:refs/heads/$branch --force-with-lease

# Déterminer nom du tag à créer
$nextTag = Get-Next-ContextTag -prefix "context/v"
Write-Host "Tag proposé : $nextTag"
$tagConfirm = Read-Host "Créer et pousser le tag '$nextTag' pointant sur $sha ? Tape 'yes' pour créer, 'no' pour annuler"
if ($tagConfirm -ne "yes") {
    Write-Host "Tagging annulé par l'utilisateur."
    Write-Host "Opération terminée. Commit de référence : $sha"
    exit 0
}

# Créer tag annoté et pousser
& git tag -a $nextTag -m "Context snapshot for project at $sha"
& git push origin $nextTag

Write-Host "Tag $nextTag créé et poussé. Commit de référence : $sha"
