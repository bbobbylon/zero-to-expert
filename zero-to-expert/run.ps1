<#
.SYNOPSIS
  The one entry point for building and running this repo on Windows. Twin of run.sh.

.DESCRIPTION
  Every repo exposes the same verbs (setup, dev, build, start, check, pages, clean), whatever
  stack sits underneath. Think of it as a Java interface with one implementation per repo:
  you always type `.\run.ps1 dev` (or `run dev` via run.cmd); this file decides whether that
  means npm, Maven, or both.

  Two modes, detected automatically:
    Frontend-only  (no backend\pom.xml)  -> commands call npm.            <- this repo today
    Full-stack     (backend\pom.xml)     -> Maven is the build of record: `mvnw package` builds
                                            the frontend too (via the pom) and produces ONE jar.

  Written for Windows PowerShell 5.1 (built into Windows) as well as PowerShell 7:
  no `&&`, `??`, or ternaries.

.PARAMETER Command
  setup | dev | build | start | check | pages | clean | help

.EXAMPLE
  .\run.ps1 dev
#>
param(
  [Parameter(Position = 0)]
  [string]$Command = 'help'
)

$ErrorActionPreference = 'Stop'

# Always operate from the repo root, no matter where the script is called from.
Set-Location -Path $PSScriptRoot

$BackendDir = 'backend'

<#
.SYNOPSIS  Print usage.
#>
function Show-Usage {
  @'
Usage: .\run.ps1 <command>     (or: run <command>)

  setup   Check tool versions and install exact dependencies
  dev     Run with live reload (frontend dev server; backend too if present)
  build   Production build (frontend-only: dist\; full-stack: one jar via Maven)
  start   Run the production build locally
  check   Build and run every validation (frontmatter, links; Maven tests if backend)
  pages   Build and preview exactly as GitHub Pages serves it (under /<repo>/)
  clean   Delete build output and caches
  help    Show this message
'@ | Write-Host
}

<#
.SYNOPSIS  Run an external program and stop the script if it fails.
.DESCRIPTION
  PowerShell doesn't throw when a native program (npm, mvnw, java) exits non-zero, so without
  this check a failed build would carry on silently. Equivalent to `set -e` in run.sh.
.PARAMETER File  Program to run.
.PARAMETER Arguments  Arguments passed through unchanged.
#>
function Invoke-Native {
  param([string]$File, [string[]]$Arguments = @())
  & $File @Arguments
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

<#
.SYNOPSIS  True if this repo has a Maven backend (backend\pom.xml exists).
#>
function Test-Backend { return (Test-Path (Join-Path $BackendDir 'pom.xml')) }

<#
.SYNOPSIS  Run the Maven wrapper inside backend\. The wrapper pins Maven's version in the repo.
.PARAMETER Arguments  Maven goals and flags.
#>
function Invoke-Mvnw {
  param([string[]]$Arguments)
  Push-Location $BackendDir
  try { Invoke-Native -File '.\mvnw.cmd' -Arguments $Arguments } finally { Pop-Location }
}

<#
.SYNOPSIS  Fail fast if Node is missing or older than package.json's "engines.node" minimum.
.DESCRIPTION  The minimum is read from package.json so it's defined in exactly one place.
#>
function Assert-Node {
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error 'Node.js is not installed. Install the version in .nvmrc (see README).'
  }
  $check = @'
const min = require("./package.json").engines.node.replace(/[^0-9.]/g, "").split(".").map(Number);
const cur = process.versions.node.split(".").map(Number);
for (let i = 0; i < 3; i++) {
  if ((cur[i] || 0) > (min[i] || 0)) process.exit(0);
  if ((cur[i] || 0) < (min[i] || 0)) {
    console.error(`Node ${process.versions.node} is too old; this repo needs ${min.join(".")} or newer.`);
    process.exit(1);
  }
}
'@
  Invoke-Native -File 'node' -Arguments @('-e', $check)
}

<#
.SYNOPSIS  Fail fast if a backend exists but Java isn't installed.
#>
function Assert-Java {
  if ((Test-Backend) -and -not (Get-Command java -ErrorAction SilentlyContinue)) {
    Write-Error "This repo has a Java backend but 'java' was not found. Install the JDK the pom requires."
  }
}

<#
.SYNOPSIS  Install dependencies if node_modules is missing, so dev/build work on a fresh clone.
#>
function Confirm-Installed { if (-not (Test-Path 'node_modules')) { Invoke-Setup } }

function Invoke-Setup {
  Assert-Node
  Assert-Java
  Invoke-Native -File 'npm' -Arguments @('ci')          # exact versions from package-lock.json
  if (Test-Backend) { Invoke-Mvnw -Arguments @('-q', 'dependency:resolve') }
}

function Invoke-Dev {
  Confirm-Installed
  $backend = $null
  if (Test-Backend) {
    # Start Spring Boot in the background; stop it (and its java child) when the dev server exits.
    $backend = Start-Process -FilePath (Join-Path $BackendDir 'mvnw.cmd') -ArgumentList 'spring-boot:run' `
      -WorkingDirectory $BackendDir -NoNewWindow -PassThru
  }
  try {
    Invoke-Native -File 'npm' -Arguments @('run', 'dev')
  } finally {
    if ($backend) { & taskkill /T /F /PID $backend.Id | Out-Null }
  }
}

function Invoke-Build {
  Confirm-Installed
  if (Test-Backend) {
    Invoke-Mvnw -Arguments @('package')                 # pom builds the frontend into the jar
  } else {
    Invoke-Native -File 'npm' -Arguments @('run', 'build')
  }
}

function Invoke-Start {
  if (Test-Backend) {
    $jar = Get-ChildItem -Path (Join-Path $BackendDir 'target') -Filter '*.jar' -ErrorAction SilentlyContinue |
      Select-Object -First 1
    if (-not $jar) { Write-Error 'No jar found. Run .\run.ps1 build first.' }
    Invoke-Native -File 'java' -Arguments @('-jar', $jar.FullName)
  } else {
    if (-not (Test-Path 'dist')) { Write-Error 'No dist\ found. Run .\run.ps1 build first.' }
    Invoke-Native -File 'npm' -Arguments @('run', 'preview')
  }
}

function Invoke-Check {
  Confirm-Installed
  Invoke-Native -File 'npm' -Arguments @('run', 'build')   # fails on bad frontmatter or broken links
  if (Test-Backend) { Invoke-Mvnw -Arguments @('verify') }
}

function Invoke-Pages {
  Confirm-Installed
  # GitHub serves project sites under /<repo-name>/. Default to this folder's name;
  # override with:  $env:BASE_PATH = '/something'; .\run.ps1 pages
  if (-not $env:BASE_PATH) { $env:BASE_PATH = '/' + (Split-Path -Leaf $PSScriptRoot) }
  Write-Host "Building for GitHub Pages with base path $($env:BASE_PATH) ..."
  Invoke-Native -File 'npm' -Arguments @('run', 'build')
  Write-Host "Preview: http://localhost:4321$($env:BASE_PATH)/"
  Invoke-Native -File 'npm' -Arguments @('run', 'preview')
}

function Invoke-Clean {
  foreach ($path in @('dist', '.astro')) {
    if (Test-Path $path) { Remove-Item -Recurse -Force $path }
  }
  if (Test-Backend) { Invoke-Mvnw -Arguments @('-q', 'clean') }
  Write-Host 'Cleaned.'
}

switch ($Command) {
  'setup' { Invoke-Setup }
  'dev'   { Invoke-Dev }
  'build' { Invoke-Build }
  'start' { Invoke-Start }
  'check' { Invoke-Check }
  'pages' { Invoke-Pages }
  'clean' { Invoke-Clean }
  { $_ -in 'help', '-h', '--help' } { Show-Usage }
  default { Write-Host "Unknown command: $Command"; Show-Usage; exit 1 }
}
