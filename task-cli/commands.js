const { db } = require('./store');
const pluralize = require('pluralize')

const params = {
    task: {
        help: 'task --name=good',
        name: { title: 'Task name', required: true },
        duration: { name: 'task duration', parser: parseFloat, defaultValue: 30 }
    }
}

const add = (args) => {
    const { name, help, _ } = args;
    if (!args || _.length < 1) {
        return;
    }

    const [modelName] = _;
    let meta = params[modelName];
    if (help) {
        if (!meta) {
            console.warn(`No such model:`, modelName)
            return;
        }
        console.log(`Usage:`, meta.help)
        return;
    }

    const shemaProps = meta ? Object.keys(meta)
        .filter(p => !['help'].includes(p))
        : Object.keys(args).filter(p => !['_'].includes(p))


    // validation
    const uuid = () => Math.random().toString(32).replace('.', '');
    const newModel = shemaProps.reduce((res, prop) => {
        const propValue = args[prop];
        const targetMeta = meta ? meta[prop] : '-';
        let value;
        if (typeof targetMeta === 'string') {
            value = propValue;
        } else {
            const noParser = (v) => v;
            const { parser = noParser, defaultValue } = targetMeta;
            value = parser(propValue || defaultValue);
        }
        return { ...res, [prop]: value };
    }, { iid: uuid() });

    db.post(pluralize(modelName), newModel);
};

const ls = (args) => {
    const { name, help, _, table } = args;
    if (!args || _.length < 1) {
        return;
    }

    const [modelName] = _;
    const models = db.get(modelName);
    if (table) {
        console.table(models)
    } else {
        console.log(models)
    }
}



const help = () => {
    console.log('TODO:')
}

const commands = {
    'add': {
        name: 'add',
        title: 'Add task',
        action: add
    },
    'ls': {
        name: 'ls',
        title: 'List',
        action: ls
    },
    'help': help
};

module.exports = {
    commands
};