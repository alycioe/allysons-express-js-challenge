// All required paths and downloads are added here
const express = require('express');
const apiRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/db.json');

// This router takes from the database json and allows it to be read
// includes a try and catch to ensure it functions properly
apiRouter.get('/notes', async (req, res) => {
    try {
        const dbContent = await fs.readFileSync(dbPath, 'utf-8');
        const notes = JSON.parse(dbContent);
        res.json(notes);
    } catch {
        console.error(error);
        res.status(500).json({ error: 'Internal Service Error' });
    }
});

// This router is responsible for posting, requiring a title and text before posting
// 
apiRouter.post('/notes', async (req, res) => {
    try {
        const { title, text } = req.body;

        if (!title || !text) {
            return res.status(400).json({ error: 'Missing title and text! Please add and try again.'});
        };

        const dbContent = await fs.readFileSync(dbPath, 'utf-8');
        const notes = JSON.parse(dbContent);

        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        notes.push(newNote);
        await fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2), 'utf-8');
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Service Error' });
    }
});

apiRouter.delete('/notes/:id', (req, res) => {
    try {
        const { id } = req.params;
        const dbContent = fs.readFileSync(dbPath, 'utf-8');
        let notes = JSON.parse(dbContent);

        const noteIndex = notes.findIndex((note) => note.id === id);

        if (noteIndex === -1) {
            return res.status(404).json({ error: 'No note found' });
        }

        const deletedNote = notes.splice(noteIndex, 1);

        fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2), 'utf-8');

        res.json(deletedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Service Error' });
    }
});



module.exports = apiRouter;