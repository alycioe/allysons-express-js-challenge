const notes = require('express').Router();
const {readAndAppend} = require('../Develop/public/assets/helpers/fsUtils');
const uuid = require('../Develop/public/assets/helpers/uuid');

notes.get('/', (req, res) => 
    readFromFile('./Develop/db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            tip_id: uuid(),
        };

    readAndAppend(newNote, './Develop/db/db.json');
    res.json(`Note added`);
    } else {
        res.errored(`Error`);
    }
});

module.export = notes;