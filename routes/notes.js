const Router = require('express').Router;
const fs = require('fs');
const { readFromFile, readAndRouterend, writeToFile } = require('../public/assets/helpers/fsUtils');
const uuid = require('../public/assets/helpers/uuid');

// GET route for retrieving notes
Router.get('/notes', (req, res) =>
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
);

Router.post('/notes', (res, req) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            note_id: uuid(),
        };

        writeToFile(newNote, '../db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error posting your note');
    }
});

Router.delete('/notes/:id', (req, res) => {
    const deleteNoteId = req.params.id;

    readFromFile('../db/db.json')
        .then((data) => {
            const notes = JSON.parse(data);

            const updatedNotes = notes.filter((note) => note.note_id !== deleteNoteId);

            writeToFile(updatedNotes, '../db/db.json')
                .then(() => {
                    const response = {
                        status: 'success',
                        message: `Note with id ${deleteNoteId} has been deleted`,
                    };
                    res.json(response);
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json('Internal Server Error');
                });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json('Internal Server Error');
        });
});

module.export = Router;