#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import keepUpdated from './runner';
import { PackageManager } from './types';

const cli = yargs(hideBin(process.argv))
    .option('use', {
        type: 'string',
        description:
            'Name of the package manager to use. Must be one of the following: yarn, pnpm or npm. ' +
            'Default is determined based on the lock-file',
    })
    .option('revert', {
        alias: 'r',
        default: true,
        type: 'boolean',
        description: 'Revert changes made to package.json file',
    })
    .option('dedupe', {
        alias: 'd',
        default: true,
        type: 'boolean',
        description: 'Deduplicate deps. Available only for yarn and npm',
    })
    .option('outdated', {
        alias: 'o',
        default: true,
        type: 'boolean',
        description: 'Check for outdated deps and output the report',
    })
    .option('audit', {
        alias: 'a',
        default: true,
        type: 'boolean',
        description: 'Check deps for security issues and output the report',
    })
    .option('audit-fix', {
        alias: 'f',
        default: false,
        type: 'boolean',
        description: 'Apply non-breaking fixes to vulnerable deps. Available only for pnpm and npm',
    })
    .usage('Usage: keep-updated [options]')
    .parse();

keepUpdated({
    use: cli.use ? (cli.use as PackageManager) : undefined,
    revert: cli.revert,
    dedupe: cli.dedupe,
    outdated: cli.outdated,
    audit: cli.audit,
    auditFix: cli['audit-fix'],
});
