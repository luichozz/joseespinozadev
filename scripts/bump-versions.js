#!/usr/bin/env node
/**
 * bump-versions.js
 *
 * Detects which workspace packages have changed vs the base branch
 * and bumps their patch version (x.y.z → x.y.z+1).
 *
 * Covers all change states: committed, staged, unstaged, and new untracked files.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = 'packages';
const BASE_BRANCH = process.env.BASE_BRANCH || 'origin/main';

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] })
      .trim()
      .split('\n')
      .filter(Boolean);
  } catch {
    return [];
  }
}

function bumpPatch(version) {
  const [major, minor, patch] = version.split('.').map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

// Collect changed files from every possible state
const changedFiles = new Set([
  ...run(`git diff --name-only ${BASE_BRANCH}...HEAD`), // committed changes vs main
  ...run(`git diff --name-only --cached ${BASE_BRANCH}`), // staged vs main
  ...run(`git diff --name-only`), // unstaged changes to tracked files
  ...run(`git ls-files --others --exclude-standard`), // untracked new files
]);

// Map changed files → unique package directories that have a package.json
const changedPackages = [
  ...new Set(
    [...changedFiles]
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
