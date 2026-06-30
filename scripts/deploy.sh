#!/usr/bin/env bash
# =============================================================================
# Deploy the AKKO React site to the Netcup Caddy edge.
# -----------------------------------------------------------------------------
# akko-ai.com is served by the `climscore-caddy-1` container on Netcup, statically
# from /opt/akko-site (bind-mount), with a SPA fallback (404 -> /index.html).
# Pushing to GitHub alone does NOT update the live site — you must rsync the build.
#
# Usage:  scripts/deploy.sh            (build + back up edge + deploy + verify)
#         AKKO_SITE_HOST=... scripts/deploy.sh
# =============================================================================
set -euo pipefail

HOST="${AKKO_SITE_HOST:-root@159.195.77.208}"
DEST="${AKKO_SITE_DEST:-/opt/akko-site/}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> Building the site…"
( cd "$ROOT/web" && npm ci --silent && npm run build )

STAMP="$(date +%Y%m%d-%H%M%S)"
echo "==> Backing up the current edge to /opt/akko-site.bak-$STAMP…"
ssh "$HOST" "cp -a /opt/akko-site /opt/akko-site.bak-$STAMP"

echo "==> Deploying build to the edge (exact mirror, --delete)…"
# macOS ships rsync 2.6.9 — keep the flags it understands (no --info).
rsync -rlptz --delete "$ROOT/site-dist/" "$HOST:$DEST"

echo "==> Verifying https://akko-ai.com/ …"
curl -sSL https://akko-ai.com/ | grep -o '<title>[^<]*</title>' | head -1
echo "Done. Revert if needed: restore /opt/akko-site.bak-$STAMP on $HOST."
