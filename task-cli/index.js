
const { commands } = require('./commands');
const cli = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    historySize: 50,
    terminal: true,
    completer: completer,
    tabSize: 1
});

function completer(line) {
    const completions = Object.keys(commands)
    const hits = completions.filter((c) => c.startsWith(line));
    return [hits.length ? hits : completions, line];
}

const main = () => {
    cli.setPrompt('> ');
    cli.prompt();

    cli.on('line', (src) => {
        const line = src.trim();
        const [cmdName, ...args] = line.split(/\s+/);
        const argv = require('minimist')(args);
        const cmd = commands[cmdName];
        if (cmd) {
            const runCmd = typeof cmd === 'function' ? cmd : cmd.action;
            runCmd(argv)
        } else {
            console.warn(`No command found for ${line}`)
        }
        cli.prompt();
    }).on('close', () => {
        console.log('Bye');
        process.exit(0);
    });
}

main();