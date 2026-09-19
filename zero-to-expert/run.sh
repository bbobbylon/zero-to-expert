#!/usr/bin/env bash
#
# run.sh — the one entry point for building and running this repo (macOS, Linux, CI).
# Windows twin: run.ps1 (or run.cmd, which launches it). Both scripts accept the same commands.
#
# Why a script instead of "just remember the npm/Maven commands":
#   Every repo exposes the same verbs (setup, dev, build, start, check, pages, clean), whatever
#   stack sits underneath. Think of it as a Java interface with one implementation per repo:
#   you always type `./run.sh dev`; this file knows whether that means npm, Maven, or both.
#
# Two modes, detected automatically:
#   Frontend-only  (no backend/pom.xml)  -> commands call npm.            <- this repo today
#   Full-stack     (backend/pom.xml)     -> Maven is the build of record: `mvnw package` builds
#                                           the frontend too (via the pom) and produces ONE jar.
#
# Usage: ./run.sh <command>      (run ./run.sh help for the list)

set -euo pipefail

# Always operate from the repo root, no matter where the script is called from.
cd "$(dirname "$0")"

readonly BACKEND_DIR="backend"

#######################################
# Print usage.
#######################################
usage() {
  cat <<'EOF'
Usage: ./run.sh <command>

  setup   Check tool versions and install exact dependencies
  dev     Run with live reload (frontend dev server; backend too if present)
  build   Production build (frontend-only: dist/; full-stack: one jar via Maven)
  start   Run the production build locally
  check   Build and run every validation (frontmatter, links; Maven tests if backend)
  pages   Build and preview exactly as GitHub Pages serves it (under /<repo>/)
  clean   Delete build output and caches
  help    Show this message
EOF
}

#######################################
# True if this repo has a Maven backend.
# Returns: 0 when backend/pom.xml exists, 1 otherwise.
#######################################
has_backend() { [[ -f "$BACKEND_DIR/pom.xml" ]]; }

#######################################
# Run the Maven wrapper inside backend/.
# The wrapper (mvnw) pins the Maven version in the repo, the same way .nvmrc pins Node.
# Arguments: Maven goals and flags, passed through unchanged.
#######################################
mvnw() { (cd "$BACKEND_DIR" && ./mvnw "$@"); }

#######################################
# Fail fast if Node is missing or older than package.json's "engines.node" minimum.
# The minimum is read from package.json so it's defined in exactly one place.
#######################################
require_node() {
  if ! command -v node >/dev/null 2>&1; then
    echo "Node.js is not installed. Install the version in .nvmrc (see README)." >&2
    exit 1
  fi
  node -e '
    const min = require("./package.json").engines.node.replace(/[^0-9.]/g, "").split(".").map(Number);
    const cur = process.versions.node.split(".").map(Number);
    for (let i = 0; i < 3; i++) {
      if ((cur[i] || 0) > (min[i] || 0)) process.exit(0);
      if ((cur[i] || 0) < (min[i] || 0)) {
        console.error(`Node ${process.versions.node} is too old; this repo needs ${min.join(".")} or newer.`);
        process.exit(1);
      }
    }'
}

#######################################
# Fail fast if a backend exists but Java isn't installed.
#######################################
require_java() {
  if has_backend && ! command -v java >/dev/null 2>&1; then
    echo "This repo has a Java backend but 'java' was not found. Install the JDK the pom requires." >&2
    exit 1
  fi
}

#######################################
# Install dependencies if node_modules is missing, so `dev`/`build` work on a fresh clone.
#######################################
ensure_installed() { [[ -d node_modules ]] || cmd_setup; }

cmd_setup() {
  require_node
  require_java
  npm ci                                   # exact versions from package-lock.json
  if has_backend; then mvnw -q dependency:resolve; fi
}

cmd_dev() {
  ensure_installed
  if has_backend; then
    # Start Spring Boot in the background and stop it when this script exits (Ctrl+C included).
    mvnw spring-boot:run &
    local backend_pid=$!
    trap 'kill "$backend_pid" 2>/dev/null || true' EXIT
  fi
  npm run dev
}

cmd_build() {
  ensure_installed
  if has_backend; then
    mvnw package                           # pom builds the frontend and bundles it into the jar
  else
    npm run build
  fi
}

cmd_start() {
  if has_backend; then
    local jar
    jar=$(ls "$BACKEND_DIR"/target/*.jar 2>/dev/null | head -n 1 || true)
    [[ -n "$jar" ]] || { echo "No jar found. Run ./run.sh build first." >&2; exit 1; }
    java -jar "$jar"
  else
    [[ -d dist ]] || { echo "No dist/ found. Run ./run.sh build first." >&2; exit 1; }
    npm run preview
  fi
}

cmd_check() {
  ensure_installed
  npm run build                            # fails on bad frontmatter or broken links
  if has_backend; then mvnw verify; fi
}

cmd_pages() {
  ensure_installed
  # GitHub serves project sites under /<repo-name>/. Default to this folder's name;
  # override with BASE_PATH=/something ./run.sh pages
  export BASE_PATH="${BASE_PATH:-/$(basename "$PWD")}"
  echo "Building for GitHub Pages with base path $BASE_PATH ..."
  npm run build
  echo "Preview: http://localhost:4321$BASE_PATH/"
  npm run preview
}

cmd_clean() {
  rm -rf dist .astro
  if has_backend; then mvnw -q clean; fi
  echo "Cleaned."
}

case "${1:-help}" in
  setup) cmd_setup ;;
  dev)   cmd_dev ;;
  build) cmd_build ;;
  start) cmd_start ;;
  check) cmd_check ;;
  pages) cmd_pages ;;
  clean) cmd_clean ;;
  help|-h|--help) usage ;;
  *) echo "Unknown command: $1" >&2; usage; exit 1 ;;
esac
