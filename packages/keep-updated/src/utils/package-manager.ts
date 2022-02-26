import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

import { logger } from './logger';
import { PackageManager, PackageManagerCommands, packageManagers } from './types';

/// Borrowed from @nrwl/tao
export function detectPackageManager(dir = ''): PackageManager {
    return existsSync(join(dir, 'yarn.lock')) ? 'yarn' : existsSync(join(dir, 'pnpm-lock.yaml')) ? 'pnpm' : 'npm';
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
                // rm: 'yarn remove',
                // exec: 'yarn',
                // run: (script: string, args: string) => `yarn ${script} ${args}`,
                // list: 'yarn list',
                dedupe: 'yarn dedupe',
                outdated: 'yarn outdated',
                audit: isV1 ? 'yarn audit' : 'yarn npm audit',
                auditFix: null,
            };
        },
        pnpm: () => {
            // const [major, minor] = getPackageManagerVersion('pnpm').split('.');
            // const useExec = +major >= 6 && +minor >= 13;
            return {
                install: 'pnpm install --no-frozen-lockfile', // explicitly disable in case of CI
                add: 'pnpm add',
                addDev: 'pnpm add -D',
                // rm: 'pnpm rm',
                // exec: useExec ? 'pnpm exec' : 'pnpx',
                // run: (script: string, args: string) => `pnpm run ${script} -- ${args}`,
                // list: 'pnpm ls --depth 100',
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
                // rm: 'npm rm',
                // exec: 'npx',
                // run: (script: string, args: string) => `npm run ${script} -- ${args}`,
                // list: 'npm ls',
                dedupe: 'npm dedupe',
                outdated: 'npm outdated',
                audit: 'npm audit',
                auditFix: 'npm audit fix',
            };
        },
    };
    return commands[packageManager]();
}

export function resolvePackageManager(pm?: PackageManager): { pm: PackageManager; pmc: PackageManagerCommands } {
    if (pm && !packageManagers.includes(pm)) {
        throw new Error(`Unknown package manager ${pm}`);
    }

    pm = pm || detectPackageManager();
    const pmc: PackageManagerCommands = getPackageManagerCommand(pm);

    logger.info(`Using package manager ${pm}`);
    return { pm, pmc };
}
