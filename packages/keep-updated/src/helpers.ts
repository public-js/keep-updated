import { execSync } from 'node:child_process';
import { existsSync, PathLike, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { PackageJson, PackageManager, PackageManagerCommands, UpdatedPackage } from './types.js';

export function quitWithError(error: string): void {
    // process.stdout.write(err + '\n');
    // process.exit(1);

    // const error: Error = new Error(err);
    // error.stack = undefined;
    // throw error;

    throw new Error(error);
}

/// Borrowed from @nrwl/tao
export function detectPackageManager(directory = ''): PackageManager {
    return existsSync(join(directory, 'yarn.lock'))
        ? 'yarn'
        : existsSync(join(directory, 'pnpm-lock.yaml'))
        ? 'pnpm'
        : 'npm';
}

/// Borrowed from @nrwl/tao
export function getPackageManagerVersion(packageManager: PackageManager = detectPackageManager()): string {
    return execSync(`${packageManager} --version`).toString('utf8').trim();
}

/// Borrowed from @nrwl/tao
export function getPackageManagerCommand(
    packageManager: PackageManager = detectPackageManager(),
): PackageManagerCommands {
    const commands: Record<PackageManager, () => PackageManagerCommands> = {
        yarn: () => {
            const [major] = getPackageManagerVersion('yarn').split('.');
            const isV1 = +major < 2;
            return {
                install: 'yarn',
                add: 'yarn add -W',
                addDev: 'yarn add -D -W',
                rm: 'yarn remove',
                exec: 'yarn',
                run: (script: string, arguments_: string) => `yarn ${script} ${arguments_}`,
                list: 'yarn list',
                dedupe: 'yarn dedupe',
                outdated: 'yarn outdated',
                audit: isV1 ? 'yarn audit' : 'yarn npm audit',
                auditFix: null,
            };
        },
        pnpm: () => {
            const [major, minor] = getPackageManagerVersion('pnpm').split('.');
            const useExec = +major >= 6 && +minor >= 13;
            return {
                install: 'pnpm install --no-frozen-lockfile', // explicitly disable in case of CI
                add: 'pnpm add',
                addDev: 'pnpm add -D',
                rm: 'pnpm rm',
                exec: useExec ? 'pnpm exec' : 'pnpx',
                run: (script: string, arguments_: string) => `pnpm run ${script} -- ${arguments_}`,
                list: 'pnpm ls --depth 100',
                dedupe: null,
                outdated: 'pnpm outdated',
                audit: 'pnpm audit',
                auditFix: 'pnpm audit --fix',
            };
        },
        npm: () => {
            process.env['npm_config_legacy_peer_deps'] ??= 'true';
            return {
                install: 'npm install',
                add: 'npm install',
                addDev: 'npm install -D',
                rm: 'npm rm',
                exec: 'npx',
                run: (script: string, arguments_: string) => `npm run ${script} -- ${arguments_}`,
                list: 'npm ls',
                dedupe: 'npm dedupe',
                outdated: 'npm outdated',
                audit: 'npm audit',
                auditFix: 'npm audit --fix',
            };
        },
    };
    return commands[packageManager]();
}

/// Borrowed from @nrwl/tao
export function updatePackageJson(packageJsonPath: PathLike, updatedPackages: Record<string, UpdatedPackage>) {
    const json = readJsonFile<PackageJson>(packageJsonPath);
    const updatedKeys: string[] = Object.keys(updatedPackages);
    for (const packageName of updatedKeys) {
        if (updatedPackages[packageName].type === 'dependencies') {
            json.dependencies[packageName] = updatedPackages[packageName].version;
        } else if (updatedPackages[packageName].type === 'devDependencies') {
            json.devDependencies[packageName] = updatedPackages[packageName].version;
        }
    }
    writeFileSync(packageJsonPath, JSON.stringify(json, null, 2) + '\n', { encoding: 'utf8' });
}

export function readJsonFile<T extends object>(filePath: PathLike): T {
    try {
        return JSON.parse(readFileSync(filePath, 'utf8')) as T;
    } catch (error) {
        quitWithError(error as string);
    }
}
