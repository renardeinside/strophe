import fs from 'fs';
import path from 'path';

// Get the version from the CLI arguments
const versionArg = process.argv[2];

if (!versionArg) {
    console.error('Please provide a version as an argument.');
    process.exit(1);
}

// Path to the manifest file
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const manifestPath = path.resolve(__dirname, '../public/manifest.json');

// Read the manifest file
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

// strip the v from the version and update the version in the manifest file
manifest.version = versionArg.replace(/^v/, '');

// Write the updated manifest file
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

console.log(`Updated manifest version to ${versionArg}`);

// also, bump the version in the package.json
const packagePath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

packageJson.version = versionArg.replace(/^v/, '');

fs.writeFileSync(
    packagePath,
    JSON.stringify(packageJson, null, 2),
    'utf-8'
);

console.log(`Updated package.json version to ${versionArg}`);