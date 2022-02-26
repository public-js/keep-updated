export const packageManagers = ['yarn', 'pnpm', 'npm'] as const;
export type PackageManager = typeof packageManagers[number];

export interface PackageManagerCommands {
    install: string;
    add: string;
    addDev: string;
    // rm: string;
    // exec: string;
    // run: (script: string, args: string) => string;
    // list: string;
    dedupe: string | null;
    outdated: string;
    audit: string;
    auditFix: string | null;
}

export interface UpdatedPackage {
    type: 'dependencies' | 'devDependencies';
    version: string;
}
export type UpdatedPackages = Record<string, UpdatedPackage>;

export type DepsObject = Record<string, string>;

export interface PackageJson {
    dependencies?: DepsObject;
    devDependencies?: DepsObject;
    keepUpdated?: string[];
    'keep-updated'?: string[];
}

export interface ResolvedPackageJson {
    keepUpdated: string[];
    deps: DepsObject;
    devDeps: DepsObject;
}

export interface KuCliArguments {
    use?: string;
    revert: boolean;
    dedupe: boolean;
    outdated: boolean;
    audit: boolean;
    auditFix: boolean;
    packages?: string[];
}

export interface UpdateOptions extends Required<Omit<KuCliArguments, 'packages'>> {
    use: PackageManager | undefined;
}

export interface AddOptions extends Pick<KuCliArguments, 'packages'> {
    packages: string[];
}
