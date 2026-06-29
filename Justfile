port := "8000"

run:
    #!/usr/bin/env bash
    set -euo pipefail
    lsof -ti tcp:{{port}} | xargs -r kill -9 2>/dev/null || true
    python3 -m http.server {{port}} &
    SERVER_PID=$!
    sleep 0.5
    open "http://localhost:{{port}}/?t=$(date +%s)"
    wait $SERVER_PID
