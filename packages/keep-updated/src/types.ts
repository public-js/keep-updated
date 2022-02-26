export const packageManagers = ['yarn', 'pnpm', 'npm'] as const;
export type PackageManager = typeof packageManagers[number];

export interface PackageManagerCommands {
    install: string;
    add: string;
    addDev: string;
    rm: string;
    exec: string;
    list: string;
    run: (script: string, arguments_: string) => string;
    dedupe: string | null;
    outdated: string;
    audit: string;
    auditFix: string | null;
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

export interface KuOptions {
    use?: PackageManager | undefined;
    revert: boolean;
    dedupe: boolean;
    outdated: boolean;
    audit: boolean;
    auditFix: boolean;
}
