const express = require('express');
const fs = require('fs');
const { readFromFile, readAndRouterend, writeToFile } = require('../public/assets/helpers/fsUtils');
const uuid = require('../public/assets/helpers/uuid');

const router = express.Router();

// GET route for retrieving notes
router.get('/notes', (req, res) =>
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/notes', (req, res) => {
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

router.delete('/notes/:id', (req, res) => {
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

module.exports = router;