export type PackageManager = 'yarn' | 'pnpm' | 'npm';

export interface PackageManagerCommands {
    install: string;
    add: string;
    addDev: string;
    rm: string;
    exec: string;
    list: string;
    run: (script: string, args: string) => string;
    outdated: string;
}

export interface UpdatedPackage {
    type: 'dependencies' | 'devDependencies';
    version: string;
}

export type DepsObject = Record<string, string>;

export interface PackageJson {
    dependencies?: DepsObject;
    devDependencies?: DepsObject;
    'keep-updated': string[];
}
