// require express for app commands, require path for joining paths,
// require the index routes path as api
const express = require('express');
const homeRoutes = require('./routes/home');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});