
const store = require('./tasks.json')

const save = () => {
    require('fs').writeFile(require('path').join(__dirname, 'tasks.json'), JSON.stringify(store, null, 2), (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
}

const post = (colName, newModel) => {
    const models = store.data[colName] = store.data[colName] || [];
    models.push(newModel);
    save();
    console.log('saved ', JSON.stringify(newModel, null, 2))
}

const get = (colName, id) => {
    const models = store.data[colName] = store.data[colName] || [];
    return models;
}

module.exports.db = {
    post,
    get
};