#!/usr/bin/env bash
# =============================================================================
# Deploy akko-site to Netcup (Caddy serves /opt/akko-site as akko-ai.com)
# -----------------------------------------------------------------------------
# Until akko-site moves to GitHub Pages or has a CI webhook, this is the
# blessed deploy command. Run from the repo root after committing +
# pushing to main.
# =============================================================================
set -euo pipefail

HOST="${AKKO_SITE_HOST:-root@159.195.77.208}"
DEST="${AKKO_SITE_DEST:-/opt/akko-site/}"

cd "$(dirname "$0")/.."

rsync -avz --delete \
    index.html CNAME og-image.png og-image.svg README.md style.css robots.txt sitemap.xml \
    "${HOST}:${DEST}"

echo
echo "Deployed. Verify:"
echo "  curl -sk https://akko-ai.com/ | head -c 200"
