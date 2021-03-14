
const { commands } = require('./commands');
const { commands: trackerCommands } = require('./tracker/commands');

class CliContext {
    completer(line) {
        const completions = Object.keys(commands)
        const hits = completions.filter((c) => c.startsWith(line));
        return [hits.length ? hits : completions, line];
    }
}

const cliContext = new CliContext();

const cli = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    historySize: 50,
    terminal: true,
    completer: cliContext.completer,
    tabSize: 1
});


const main = () => {
    cli.setPrompt('> ');
    cli.prompt();

    cli.on('line', (src) => {
        const line = src.trim();
        const [cmdName, ...args] = line.split(/\s+/);
        const argv = require('minimist')(args);
        const cmd = commands[cmdName] || trackerCommands[cmdName];
        if (cmd) {
            const runCmd = typeof cmd === 'function' ? cmd : cmd.action;
            cli.prompt();
            runCmd(argv, cli, console)
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