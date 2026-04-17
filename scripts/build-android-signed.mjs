#!/usr/bin/env node

import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const signingDir = resolve(repoRoot, 'src-tauri/.signing');
const keystorePath = process.env.ANDROID_KEYSTORE_PATH ?? resolve(signingDir, 'release.jks');
const aliasName = process.env.ANDROID_KEY_ALIAS ?? 'smartpac-release';
const storePassword = process.env.ANDROID_KEYSTORE_PASSWORD ?? 'smartpac-release';
const keyPassword = process.env.ANDROID_KEY_PASSWORD ?? storePassword;
const distinguishedName = process.env.ANDROID_KEY_DNAME ?? 'CN=Smart PAC Client, OU=Android, O=Quteam, L=Shenzhen, ST=Guangdong, C=CN';
const bundlePath = resolve(repoRoot, 'src-tauri/gen/android/app/build/outputs/bundle/universalRelease/app-universal-release.aab');

function run(command, args) {
    const result = spawnSync(command, args, {
        cwd: repoRoot,
        stdio: 'inherit',
    });

    if (result.error) {
        throw result.error;
    }

    if (result.status !== 0) {
        throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status ?? 'unknown'}`);
    }
}

mkdirSync(dirname(keystorePath), { recursive: true });

if (!existsSync(keystorePath)) {
    console.log(`Creating Android signing keystore at ${keystorePath}`);
    run('keytool', [
        '-genkeypair',
        '-alias', aliasName,
        '-keyalg', 'RSA',
        '-keysize', '4096',
        '-validity', '10000',
        '-keystore', keystorePath,
        '-storepass', storePassword,
        '-keypass', keyPassword,
        '-dname', distinguishedName,
    ]);
}

console.log('Building Android AAB...');
run('pnpm', ['tauri', 'android', 'build', '-t', 'aarch64', '--aab', '--ci']);

if (!existsSync(bundlePath)) {
    throw new Error(`Android AAB was not found at ${bundlePath}`);
}

console.log(`Signing Android AAB with ${keystorePath}...`);
run('jarsigner', [
    '-keystore', keystorePath,
    '-storepass', storePassword,
    '-keypass', keyPassword,
    bundlePath,
    aliasName,
]);

console.log('Verifying signature...');
run('jarsigner', ['-verify', '-verbose', '-certs', bundlePath]);

console.log(`Signed Android AAB is ready at ${bundlePath}`);