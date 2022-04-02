import { join } from 'path';

import { logger } from '../utils/logger';
import { getKuContent, updateJson } from '../utils/package-json';
import { AddOptions, PackageJson } from '../utils/types';

export function add(options: AddOptions): void {
    try {
        runner(options);
    } catch (error) {
        logger.error('__ ' + error.message);
    }
}

function runner(options: AddOptions): void {
    if (!options.packages || options.packages.length === 0) {
        throw new Error(`No packages to add to "keepUpdated" array`);
    }
    const pjPath: string = join(process.cwd(), 'package.json');
    updateJson<PackageJson>(pjPath, (pjFile: PackageJson) => {
        const [currentList, key]: [string[], string] = getKuContent(pjFile);
        const updated: Set<string> = new Set([...currentList, ...options.packages]);
        pjFile[key] = [...updated.keys()].sort();
        return pjFile;
    });
    logger.info('Packages list updated successfully');
}
