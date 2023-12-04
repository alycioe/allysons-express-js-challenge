// All necessary packages are added here, as well as the port is set up
const express = require('express');
const api = require('./routes/api-routes.js');
const html = require('./routes/html-routes.js');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware for parsing JSON files and urlencoded form data added below
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);
app.use('/', html);

// Port is listened to using express app
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});