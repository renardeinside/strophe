import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get the current git tag
const currentTag = execSync('git describe --tags', { encoding: 'utf-8' }).trim();

// Path to the manifest file
const manifestPath = path.resolve(__dirname, '../public/manifest.json');

// Read the manifest file
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

// Update the version in the manifest file
manifest.version = currentTag;

// Write the updated manifest file
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

console.log(`Updated manifest version to ${currentTag}`);