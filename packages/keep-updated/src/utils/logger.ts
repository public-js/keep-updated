import * as chalk from 'chalk';

const PFX_INFO = chalk.cyan.bold.inverse(' INFO ');
const PFX_WARN = chalk.yellow.bold.inverse(' WARN ');
const PFX_ERROR = chalk.red.bold.inverse(' ERROR ');

export const logger: Logger = {
    info: (msg) =>
        console.info(
            typeof msg === 'string' && msg.startsWith('__ ')
                ? `\n${PFX_INFO} ${chalk.white.bold(msg.slice(3))}\n`
                : chalk.white(msg),
        ),
    warn: (msg) =>
        console.warn(
            typeof msg === 'string' && msg.startsWith('__ ')
                ? `\n${PFX_WARN} ${chalk.yellow.bold(msg.slice(3))}\n`
                : chalk.yellow.bold(msg),
        ),
    error: (msg) =>
        console.error(
            typeof msg === 'string' && msg.startsWith('__ ')
                ? `\n${PFX_ERROR} ${chalk.red.bold(msg.slice(3))}\n`
                : chalk.red.bold(msg),
        ),
    progressStart: (msg) => process.stdout.write(chalk.white(`${msg} ... `)),
    updateDone: () => process.stdout.write(chalk.green('done\n')),
    // updateUpToDate: () => process.stdout.write(chalk.white('up to date\n')),
};

interface Logger {
    info: (msg) => void;
    warn: (msg) => void;
    error: (msg) => void;
    progressStart: (msg) => void;
    updateDone: () => void;
    // updateUpToDate: () => void;
}
