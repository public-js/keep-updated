import { existsSync, PathLike, readFileSync, writeFileSync } from 'fs';

import { PackageJson, ResolvedPackageJson, UpdatedPackages } from './types';

export function resolvePackageJson(pjPath: PathLike): ResolvedPackageJson {
    const pjFile = readJson<PackageJson>(pjPath);

    const keepUpdated: string[] | undefined = pjFile.keepUpdated || pjFile['keep-updated'];
    if (!keepUpdated || keepUpdated.length === 0) {
        throw new Error(`Cannot find "keepUpdated" array in ${pjPath}`);
    }

    const { deps, devDeps } = {
        deps: pjFile.dependencies || {},
        devDeps: pjFile.devDependencies || {},
    };
    if (Object.keys(deps).length === 0 && Object.keys(devDeps).length === 0) {
        throw new Error(`Cannot find any dependencies in ${pjPath}`);
    }

    return { keepUpdated, deps, devDeps };
}

export function updatePackageJson(pjPath: PathLike, updatedPackages: UpdatedPackages) {
    const updatedKeys: string[] = Object.keys(updatedPackages);

    updateJson<PackageJson>(pjPath, (pjFile: PackageJson) => {
        for (const pkgName of updatedKeys) {
            if (updatedPackages[pkgName].type === 'dependencies') {
                pjFile.dependencies[pkgName] = updatedPackages[pkgName].version;
            } else if (updatedPackages[pkgName].type === 'devDependencies') {
                pjFile.devDependencies[pkgName] = updatedPackages[pkgName].version;
            }
        }

        return pjFile;
    });
}

export function readJson<T extends object = object>(filePath: PathLike): T {
    if (!existsSync(filePath)) {
        throw new Error(`Cannot find ${filePath}`);
    }
    try {
        return JSON.parse(readFileSync(filePath, 'utf8')) as T;
    } catch (error) {
        throw new Error(`Cannot parse from ${filePath}: ${error.message}`);
    }
}

export function writeJson<T extends object = object>(filePath: PathLike, content: T): void {
    let serialized: string;
    try {
        serialized = JSON.stringify(content, null, 2) + '\n';
    } catch (error) {
        throw new Error(`Cannot serialize content for ${filePath}: ${error.message}`);
    }
    try {
        writeFileSync(filePath, serialized, { encoding: 'utf8' });
    } catch (error) {
        throw new Error(`Cannot write to ${filePath}: ${error.message}`);
    }
}

export function updateJson<T extends object = object, U extends object = T>(
    filePath: PathLike,
    updateFn: (value: T) => U,
): void {
    const content: U = updateFn(readJson(filePath));
    writeJson(filePath, content);
}
