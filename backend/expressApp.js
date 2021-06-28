const express = require('express');
const app = express();

// Enable cross origin resource sharing
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', [`http://${serverURL.host}:8080`]);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

// Root Route
app.get('/', (req, res) =>
{
    console.log('hi');
    res.status(200).end('Hi');
})

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
    console.log(`Backend: Listening on http://${serverURL.host}:${serverURL.port}`);
})