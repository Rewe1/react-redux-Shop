const express = require('express');
const app = express();

// Root route
app.get('/', (req, res) =>
{
    res.send('Hi');
});

// Fetch route
const fetch = require('./fetch');
app.use('/fetch', fetch);

// Post Route
const postItem = require('./postItem');
app.use('/postItem', postItem);

// Start server
const serverURL = require('./serverURL');
app.listen(serverURL.port, serverURL.host, () =>
{
    console.log(`Listening on ${serverURL.host}:${serverURL.port}`);
})