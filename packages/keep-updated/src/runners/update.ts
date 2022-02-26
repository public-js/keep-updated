import { execSync, spawnSync } from 'child_process';
import { join } from 'path';

import { logger } from '../utils/logger';
import { resolvePackageJson, updatePackageJson } from '../utils/package-json';
import { resolvePackageManager } from '../utils/package-manager';
import {
    DepsObject,
    PackageManagerCommands,
    ResolvedPackageJson,
    UpdatedPackages,
    UpdateOptions,
} from '../utils/types';

export function update(options: UpdateOptions): void {
    try {
        runner(options);
    } catch (error) {
        logger.error('__ ' + error.message);
    }
}

function runner(options: UpdateOptions): void {
    const { pmc } = resolvePackageManager(options.use);

    const pjPath: string = join(process.cwd(), 'package.json');
    const { keepUpdated, deps, devDeps }: ResolvedPackageJson = resolvePackageJson(pjPath);

    logger.info('__ Updating dependencies');
    const updated: UpdatedPackages = updatePackagesInBatch(keepUpdated, pmc, { deps, devDeps });

    if (options.revert) {
        revertPackageJson({ pjPath, updated, pmc });
    }
    if (options.dedupe && pmc.dedupe) {
        logger.info('__ Deduplicating dependencies');
        spawnSync(pmc.dedupe.split(' ')[0], pmc.dedupe.split(' ').slice(1), { stdio: [] });
    }
    if (options.outdated) {
        logger.info('__ Checking for outdated dependencies');
        spawnSync(pmc.outdated.split(' ')[0], pmc.outdated.split(' ').slice(1), { stdio: 'inherit' });
    }
    if (options.audit) {
        logger.info('__ Checking for security issues');
        spawnSync(pmc.audit.split(' ')[0], pmc.audit.split(' ').slice(1), { stdio: 'inherit' });
    }
    if (options.auditFix && pmc.auditFix) {
        logger.info('__ Trying to fix security issues');
        spawnSync(pmc.auditFix.split(' ')[0], pmc.auditFix.split(' ').slice(1), { stdio: 'inherit' });
    }
}

function updatePackagesInBatch(
    packagesList: string[],
    pmc: PackageManagerCommands,
    { deps, devDeps }: { deps: DepsObject; devDeps: DepsObject },
): UpdatedPackages {
    const updated: UpdatedPackages = {};

    for (const pkg of packagesList) {
        if (deps[pkg]) {
            const version = deps[pkg];
            updatePackage(`${pkg}@${version}`, pmc.add, 'dependency');
            updated[pkg] = { version, type: 'dependencies' };
        } else if (devDeps[pkg]) {
            const version = devDeps[pkg];
            updatePackage(`${pkg}@${version}`, pmc.addDev, 'devDependency');
            updated[pkg] = { version, type: 'devDependencies' };
        } else {
            logger.warn(`Cannot find ${pkg} in package.json`);
        }
    }

    return updated;
}

function updatePackage(pkg: string, cmd: string, type: 'dependency' | 'devDependency'): void {
    logger.progressStart(`Updating ${type} ${pkg}`);
    execSync(`${cmd} ${pkg}`, { stdio: [] });
    logger.updateDone();
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
    logger.info('__ Reverting package.json');
    updatePackageJson(pjPath, updated);

    logger.info('__ Syncing lock file');
    execSync(pmc.install, { stdio: [] });
}
