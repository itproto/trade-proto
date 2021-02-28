
const AsciiNumbers = require('ascii-numbers').default;
const defaultFont = require('ascii-numbers/fonts/ANSI_Shadow')
const config = {
    lineLength: 80,
    minDigits: null,
    space: ''
};

const chalk = require('chalk');

const asciiNumbersWithFont = new AsciiNumbers(defaultFont, config);
function clear() {
    // 1. Print empty lines until the screen is blank.
    process.stdout.write('\\033[2J');

    // 2. Clear the scrollback.
    process.stdout.write('\u001b[H\u001b[2J\u001b[3J');
}


let iid;
const start = (argv, cli, { log }) => {
    let { c: counter = 25, i: interval = 25 } = argv;

    const tick = () => {
        clear();
        log('\n', chalk.blue(asciiNumbersWithFont.getNumber(counter)));
        counter--;
        if (counter === 0) {
            stop(undefined, cli, { log });
        }
        cli.prompt();
    }

    tick();
    iid = setInterval(tick, interval * 1000);
}

const stop = (_, cli, { log }) => {
    clearInterval(iid);
    clear();
    log('Stopped')
    cli.prompt();
}

const commands = {
    countdown: start,
    stop
};

module.exports = {
    commands
};