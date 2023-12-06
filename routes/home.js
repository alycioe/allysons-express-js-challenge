const express = require('express');
const path = require('path');
const apiRoutes = require('./notes');

const router = express.Router();

router.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

router.use('/api', apiRoutes);

module.exports = router;