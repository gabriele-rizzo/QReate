#!/usr/bin/env node
// Release helper: bumps package.json version, stages everything, commits with a
// custom message, and creates an annotated git tag.
//
// Usage:
//   pnpm release <patch|minor|major|X.Y.Z> "<commit message>"
//
// Examples:
//   pnpm release patch "fix finder color drift"
//   pnpm release minor "add contact vCard fields"
//   pnpm release 1.0.0 "first stable release"

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PKG_PATH = join(ROOT, "package.json");
const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/;

function fail(message) {
    console.error(`\n✖ ${message}`);
    console.error('\nUsage: pnpm release <patch|minor|major|X.Y.Z> "<commit message>"\n');
    process.exit(1);
}

function git(args, opts = {}) {
    return execFileSync("git", args, { cwd: ROOT, ...opts });
}

function tagExists(tag) {
    try {
        git(["rev-parse", "-q", "--verify", `refs/tags/${tag}`], { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

function nextVersion(current, bump) {
    const match = current.match(SEMVER);
    if (!match) fail(`Current version "${current}" in package.json is not valid semver.`);

    const [major, minor, patch] = match.slice(1).map(Number);
    switch (bump) {
        case "major":
            return `${major + 1}.0.0`;
        case "minor":
            return `${major}.${minor + 1}.0`;
        case "patch":
            return `${major}.${minor}.${patch + 1}`;
        default:
            if (!SEMVER.test(bump)) fail(`"${bump}" is not a valid bump. Use patch, minor, major, or an explicit X.Y.Z.`);
            return bump;
    }
}

const [bump, ...messageParts] = process.argv.slice(2);
const message = messageParts.join(" ").trim();

if (!bump) fail("Missing version bump.");
if (!message) fail("Missing commit message.");

const pkg = JSON.parse(readFileSync(PKG_PATH, "utf8"));
const current = pkg.version;
const next = nextVersion(current, bump);
const tag = `v${next}`;

if (next === current) fail(`Version is already ${current}; nothing to bump.`);
if (tagExists(tag)) fail(`Tag ${tag} already exists.`);

// Bump the version (preserve the file's 4-space indentation + trailing newline).
pkg.version = next;
writeFileSync(PKG_PATH, `${JSON.stringify(pkg, null, 4)}\n`);

console.log(`\n${current} → ${next}\n`);

try {
    git(["add", "-A"], { stdio: "inherit" });
    git(["commit", "-m", message], { stdio: "inherit" });
    git(["tag", "-a", tag, "-m", message], { stdio: "inherit" });
} catch {
    // Roll the version back so a failed run doesn't leave package.json ahead.
    pkg.version = current;
    writeFileSync(PKG_PATH, `${JSON.stringify(pkg, null, 4)}\n`);
    fail("git step failed; reverted package.json. No commit or tag was created.");
}

console.log(`\n✔ Committed and tagged ${tag}`);
console.log(`  Push it with: git push && git push origin ${tag}\n`);
