#!/usr/bin/env node

import yargs, { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';

import { add } from './runners/add';
import { update } from './runners/update';
import { KuCliArguments, PackageManager } from './utils/types';

yargs(hideBin(process.argv))
    .command({
        command: 'update',
        aliases: ['$0'],
        describe: 'Update packages listed in "keepUpdated" array',
        handler: (cli: Arguments<KuCliArguments>) =>
            update({
                use: cli.use ? (cli.use as PackageManager) : undefined,
                revert: cli.revert,
                dedupe: cli.dedupe,
                outdated: cli.outdated,
                audit: cli.audit,
                auditFix: cli.auditFix,
            }),
    })
    .command({
        command: 'add [packages..]',
        describe: 'Add packages to "keepUpdated" array',
        handler: (cli: Arguments<KuCliArguments>) => add({ packages: cli.packages }),
    })
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
    .parserConfiguration({
        'strip-aliased': true,
        'strip-dashed': true,
    })
    .parse();
