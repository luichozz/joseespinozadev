#!/usr/bin/env node
/**
 * check-versions.js
 *
 * Validates version consistency across all workspace packages:
 *   1. Every package version must be valid semver (x.y.z)
 *   2. Workspace cross-dependencies (@portfolio/*) must use "*"
 *   3. No package version in the PR may be lower than the version on main
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SEMVER_RE = /^\d+\.\d+\.\d+$/;
const WORKSPACE_SCOPE = '@portfolio/';
const PACKAGES_DIR = 'packages';
const BASE_BRANCH = process.env.BASE_BRANCH || 'origin/main';

let errors = 0;

function fail(msg) {
  console.error(`  ✗ ${msg}`);
  errors++;
}

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}

/** Simple semver comparison — returns -1, 0, or 1 */
function cmpVersion(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if (pa[i] > pb[i]) return 1;
    if (pa[i] < pb[i]) return -1;
  }
  return 0;
}

/** Read the package.json of a package from the main branch (returns null if not found) */
function getMainPkg(pkgDir) {
  try {
    const raw = execSync(`git show ${BASE_BRANCH}:${pkgDir}/package.json`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return JSON.parse(raw);
  } catch {
    return null; // new package — doesn't exist on main yet
  }
}

const packages = fs
  .readdirSync(PACKAGES_DIR)
  .filter((d) => fs.existsSync(path.join(PACKAGES_DIR, d, 'package.json')));

console.log(`\nChecking ${packages.length} package(s) against ${BASE_BRANCH}...\n`);

for (const pkg of packages) {
  const pkgDir = path.join(PACKAGES_DIR, pkg);
  const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));
  const { name, version, dependencies = {}, devDependencies = {} } = pkgJson;

  console.log(`[${name}]`);

  // 1 — Valid semver
  if (!SEMVER_RE.test(version)) {
    fail(`version "${version}" is not valid semver (expected x.y.z)`);
  } else {
    ok(`version ${version} is valid semver`);
  }

  // 2 — Workspace cross-deps must stay as "*"
  const allDeps = { ...dependencies, ...devDependencies };
  for (const [dep, range] of Object.entries(allDeps)) {
    if (dep.startsWith(WORKSPACE_SCOPE)) {
      if (range !== '*') {
        fail(`workspace dep "${dep}" uses "${range}" — must be "*" to avoid version lock-in`);
      } else {
        ok(`workspace dep "${dep}" correctly uses "*"`);
      }
    }
  }

  // 3 — Version must not be lower than main
  const mainPkg = getMainPkg(pkgDir);
  if (!mainPkg) {
    console.log(`  ~ new package, skipping version comparison against main\n`);
    continue;
  }

  const mainVersion = mainPkg.version;
  const cmp = cmpVersion(version, mainVersion);

  if (cmp < 0) {
    fail(`version ${version} is LOWER than main (${mainVersion}) — did you forget to bump?`);
  } else if (cmp === 0) {
    ok(`version ${version} matches main (no bump — that's fine if this package didn't change)`);
  } else {
    ok(`version ${version} > main (${mainVersion})`);
  }

  console.log();
}

if (errors > 0) {
  console.error(`\n${errors} check(s) failed.\n`);
  process.exit(1);
} else {
  console.log(`All version checks passed.\n`);
}
