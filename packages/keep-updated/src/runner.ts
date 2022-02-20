import {
    detectPackageManager,
    getPackageManagerCommand,
    quitWithError,
    readJsonFile,
    updatePackageJson,
} from './helpers';
import {
    DepsObject,
    KuOptions,
    PackageJson,
    PackageManager,
    PackageManagerCommands,
    packageManagers,
    UpdatedPackage,
} from './types';
import * as cp from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface ResolvedPackageJson {
    pjPath: string;
    packagesList: string[];
    deps: DepsObject;
    devDeps: DepsObject;
}

type UpdatedPackages = Record<string, UpdatedPackage>;

function resolvePackageJson(): ResolvedPackageJson {
    const pjPath: string = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(pjPath)) {
        quitWithError(`No package.json file found in ${process.cwd()}`);
    }

    const pjFile = readJsonFile<PackageJson>(pjPath);

    const packagesList: string[] | undefined = pjFile['keep-updated'];
    if (!packagesList || !packagesList.length) {
        quitWithError(`No "keep-updated" array found in package.json file or it's empty`);
    }

    const { deps, devDeps } = {
        deps: pjFile.dependencies || {},
        devDeps: pjFile.devDependencies || {},
    };
    if (!Object.keys(deps).length && !Object.keys(devDeps).length) {
        quitWithError('No packages found in package.json file');
    }

    return {
        pjPath,
        packagesList,
        deps,
        devDeps,
    };
}

function resolveManager(pm?: PackageManager): PackageManagerCommands {
    if (pm && !packageManagers.includes(pm)) {
        quitWithError(`Unknown package manager ${pm}`);
    }

    pm = pm || detectPackageManager();
    const pmc: PackageManagerCommands = getPackageManagerCommand(pm);

    process.stdout.write(`Using ${pm}` + '\n');
    return pmc;
}

function updatePackages({
    packagesList,
    deps,
    devDeps,
    pmc,
}: {
    packagesList: string[];
    deps: DepsObject;
    devDeps: DepsObject;
    pmc: PackageManagerCommands;
}): UpdatedPackages {
    const updated: UpdatedPackages = {};

    packagesList.forEach((pkgName: string) => {
        if (deps[pkgName]) {
            const version = deps[pkgName];
            process.stdout.write(`Updating dependency '${pkgName}@${version}'` + '\n');
            updated[pkgName] = { version, type: 'dependencies' };
            cp.execSync(`${pmc.add} ${pkgName}@${version}`, { stdio: [] });
        } else if (devDeps[pkgName]) {
            const version = devDeps[pkgName];
            process.stdout.write(`Updating devDependency '${pkgName}@${version}'` + '\n');
            updated[pkgName] = { version, type: 'devDependencies' };
            cp.execSync(`${pmc.addDev} ${pkgName}@${version}`, { stdio: [] });
        } else {
            process.stdout.write(`Dependency '${pkgName}' not found in package.json.` + '\n');
        }
    });

    return updated;
}

function revertPackageJson({
    pjPath,
    updated,
    pmc,
}: {
    pjPath: string;
    updated: UpdatedPackages;
    pmc: PackageManagerCommands;
}): void {
    process.stdout.write('Reverting package.json file' + '\n');
    updatePackageJson(pjPath, updated);

    process.stdout.write('Syncing lock file' + '\n');
    cp.execSync(pmc.install, { stdio: [] });
}

export function keepUpdated(options: KuOptions): void {
    const pmc: PackageManagerCommands = resolveManager(options.use);
    const { pjPath, packagesList, deps, devDeps }: ResolvedPackageJson = resolvePackageJson();

    const updated: UpdatedPackages = updatePackages({ packagesList, deps, devDeps, pmc });

    if (options.revert) {
        revertPackageJson({ pjPath, updated, pmc });
    }
    if (options.dedupe && pmc.dedupe) {
        process.stdout.write('Deduplicating dependencies' + '\n');
        cp.spawnSync(pmc.dedupe.split(' ')[0], pmc.dedupe.split(' ').slice(1), { stdio: [] });
    }
    if (options.outdated) {
        process.stdout.write('Checking for outdated dependencies' + '\n');
        cp.spawnSync(pmc.outdated.split(' ')[0], pmc.outdated.split(' ').slice(1), { stdio: 'inherit' });
    }
    if (options.audit) {
        process.stdout.write('Checking for security issues' + '\n');
        cp.spawnSync(pmc.audit.split(' ')[0], pmc.audit.split(' ').slice(1), { stdio: 'inherit' });
    }
    if (options.auditFix && pmc.auditFix) {
        process.stdout.write('Trying to fix security issues' + '\n');
        cp.spawnSync(pmc.auditFix.split(' ')[0], pmc.auditFix.split(' ').slice(1), { stdio: 'inherit' });
    }
}

export default keepUpdated;