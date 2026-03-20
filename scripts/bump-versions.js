#!/usr/bin/env node
/**
 * bump-versions.js
 *
 * Detects which workspace packages have changed vs the base branch
 * and bumps their patch version (x.y.z → x.y.z+1).
 *
 * A package is considered changed if any file inside it has been
 * added, modified, or deleted relative to BASE_BRANCH.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = 'packages';
const BASE_BRANCH = process.env.BASE_BRANCH || 'origin/main';

function bumpPatch(version) {
  const [major, minor, patch] = version.split('.').map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

// Get all files changed vs the base branch
const changedFiles = execSync(`git diff --name-only ${BASE_BRANCH}...HEAD`, {
  encoding: 'utf8',
})
  .trim()
  .split('\n')
  .filter(Boolean);

// Map changed files → unique package directories
const changedPackages = [
  ...new Set(
    changedFiles
      .filter((f) => f.startsWith(`${PACKAGES_DIR}/`))
      .map((f) => f.split('/').slice(0, 2).join('/'))
      .filter((dir) => fs.existsSync(path.join(dir, 'package.json')))
  ),
];

if (changedPackages.length === 0) {
  console.log('No workspace packages were changed — nothing to bump.');
  process.exit(0);
}

console.log(`\nDetected ${changedPackages.length} changed package(s):\n`);

for (const pkgDir of changedPackages) {
  const pkgJsonPath = path.join(pkgDir, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));

  const oldVersion = pkgJson.version;
  const newVersion = bumpPatch(oldVersion);

  pkgJson.version = newVersion;
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');

  console.log(`  ${pkgJson.name}: ${oldVersion} → ${newVersion}`);
}

console.log('\nDone.\n');
