# create_project_status.ps1
$RepoPath = "C:\Users\dimitri\Downloads\OpenClaw-Workspace"
Set-Location $RepoPath

# Collecte d'informations Git
$now = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$branch = git rev-parse --abbrev-ref HEAD 2>$null
$remotes = git remote -v 2>$null
$roots = git ls-tree --name-only HEAD 2>$null
$status = git status --porcelain 2>$null
$staged = git diff --staged --name-status 2>$null
$deleted = git diff --name-only --diff-filter=D 2>$null
$recent_imports_OpenClaw_Light = git log --oneline -- OpenClaw_Light -n 5 2>$null
$recent_imports_openclaw = git log --oneline -- openclaw -n 5 2>$null
$recent_imports_hermes = git log --oneline -- hermes-omega-cockpit -n 5 2>$null
$lfs = git lfs ls-files 2>$null
$remotes_list = git remote -v 2>$null

# Construire le contenu du rapport
$report = @()
$report += "# Project Status Snapshot"
$report += ""
$report += "**Generated**: $now"
$report += "**Current branch**: $branch"
$report += ""
$report += "## Remotes"
$report += "```\n$remotes_list\n```"
$report += ""
$report += "## Root tree"
$report += "```\n$roots\n```"
$report += ""
$report += "## Git status (porcelain)"
$report += "```\n$status\n```"
$report += ""
$report += "## Deleted paths (local, not committed)"
$report += "```\n$deleted\n```"
$report += ""
$report += "## Recent import commits"
$report += "### OpenClaw_Light"
$report += "```\n$recent_imports_OpenClaw_Light\n```"
$report += "### openclaw"
$report += "```\n$recent_imports_openclaw\n```"
$report += "### hermes-omega-cockpit"
$report += "```\n$recent_imports_hermes\n```"
$report += ""
$report += "## Git LFS tracked files (sample)"
$report += "```\n$lfs\n```"
$report += ""
$report += "## Recommended next steps"
$report += "- Decide whether to keep or discard the local deletions listed above."
$report += "- If keeping deletion: create branch `cleanup/core-remove`, commit (`git add -A; git commit -m 'Remove CORE...'`) and push."
$report += "- If restoring: create branch `cleanup/core-restore`, restore exact paths from `origin/main` or `HEAD`, commit and push."
$report += "- Open a Pull Request for review before merging to `main`."
$report += ""
$report += "## PR Template Suggestion"
$report += "```\nTitle: Restore or remove CORE directories\n\nDescription:\n- Summary of change\n- Files affected\n- Validation steps\n```\n"

# Écrire le fichier
$reportPath = Join-Path $RepoPath "PROJECT_STATUS.md"
$report -join "`n" | Out-File -FilePath $reportPath -Encoding UTF8

Write-Output "PROJECT_STATUS.md créé à : $reportPath"
Write-Output "Contenu résumé :"
Get-Content $reportPath | Select-Object -First 40

# Optionnel : créer branche docs et committer
$branchDocs = "docs/project-status"
git checkout -B $branchDocs
git add PROJECT_STATUS.md
git commit -m "Add project status snapshot"
Write-Output "Commit créé sur la branche $branchDocs. Si tu veux pousser : git push origin $branchDocs"
