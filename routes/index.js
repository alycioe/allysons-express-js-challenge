const express = require('express');

const homeRouter = require('./home');
const notesRouter = require('./notes');

const app = express();

app.use('/home', homeRouter);
app.use('/notes', notesRouter);

module.exports = app;