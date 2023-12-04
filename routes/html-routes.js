const express = require('express');
const router = require('express').Router();
const path = require('path');

// displays notes.html on /notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// displays index.html everywhere else
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

//exports router
module.exports = router;