
const AsciiNumbers = require('ascii-numbers').default;
const defaultFont = require('ascii-numbers/fonts/ANSI_Shadow')
const config = {
    lineLength: 80,
    minDigits: null,
    space: ''
};


const asciiNumbersWithFont = new AsciiNumbers(defaultFont, config);

let iid;
const start = (_, cli) => {
    let counter = 20;
    iid = setInterval(() => {
        console.log('\n', asciiNumbersWithFont.getNumber(counter));
        counter--;
        cli.prompt();
    }, 3000);
}

const stop = () => {
    clearInterval(iid);
}

const commands = {
    start,
    stop
};

module.exports = {
    commands
};