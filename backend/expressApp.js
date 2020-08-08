const express = require('express');
const connection = require('./mongoDb');
const app = express();

app.get('/', (req, res) =>
{
    res.send('Hi');
});

const fetch = require('./fetch');
app.use('/fetch', fetch);

const port = 8081;
const host = require('os').hostname();
app.listen(port, host, () =>
{
    console.log(`Listening on ${host}:${port}`);
})