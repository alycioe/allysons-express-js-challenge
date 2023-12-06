const express = require('express');
const path = require('path');
const api = require('./notes');

const app = express();

// retrieves the /notes address and puts the notes.html code in
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// retrieves the route for the index.html that applies to all pages except notes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.use('/api', api);

module.exports = app;