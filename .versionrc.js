import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const cwd = process.cwd();

const expandPath = (dirPath) => {
    let dirContents = [];
    if (!existsSync(dirPath)) {
        return dirContents;
    }
    try {
        dirContents = readdirSync(dirPath, { withFileTypes: true });
    } catch {
        return dirContents;
    }
    return dirContents
        .filter((entry) => entry.isDirectory())
        .map((entry) => join(dirPath, entry.name, 'package.json'))
        .filter((pjPath) => existsSync(pjPath))
        .map((pjPath) => pjPath.replace(cwd, '.'));
};

const [packagesPath] = [join(cwd, 'packages')];
const [packages] = [expandPath(packagesPath)];

export default {
    packageFiles: ['./package.json'],
    bumpFiles: ['./package.json', './package-lock.json', ...packages],
    tagPrefix: '',
    skip: { commit: true, tag: true },
};
