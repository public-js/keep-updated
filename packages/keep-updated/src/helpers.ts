import { PackageJson, PackageManager, PackageManagerCommands, UpdatedPackage } from './types';
import * as cp from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export function quitWithError(err: string): void {
    // process.stdout.write(err + '\n');
    // process.exit(1);

    // const error: Error = new Error(err);
    // error.stack = undefined;
    // throw error;

    throw new Error(err);
}

/// Borrowed from @nrwl/tao
export function detectPackageManager(dir = ''): PackageManager {
    return fs.existsSync(path.join(dir, 'yarn.lock'))
        ? 'yarn'
        : fs.existsSync(path.join(dir, 'pnpm-lock.yaml'))
        ? 'pnpm'
        : 'npm';
}

/// Borrowed from @nrwl/tao
export function getPackageManagerVersion(packageManager: PackageManager = detectPackageManager()): string {
    return cp.execSync(`${packageManager} --version`).toString('utf-8').trim();
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
                run: (script: string, args: string) => `yarn ${script} ${args}`,
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
                run: (script: string, args: string) => `pnpm run ${script} -- ${args}`,
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
                run: (script: string, args: string) => `npm run ${script} -- ${args}`,
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
export function updatePackageJson(packageJsonPath: fs.PathLike, updatedPackages: Record<string, UpdatedPackage>) {
    const json = readJsonFile<PackageJson>(packageJsonPath);
    Object.keys(updatedPackages).forEach((pkgName: string) => {
        if (updatedPackages[pkgName].type === 'dependencies') {
            json.dependencies[pkgName] = updatedPackages[pkgName].version;
        } else if (updatedPackages[pkgName].type === 'devDependencies') {
            json.devDependencies[pkgName] = updatedPackages[pkgName].version;
        }
    });
    fs.writeFileSync(packageJsonPath, JSON.stringify(json, null, 2) + '\n', { encoding: 'utf-8' });
}

export function readJsonFile<T extends object>(filePath: fs.PathLike): T {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
    } catch (e) {
        quitWithError(e as string);
    }
}
