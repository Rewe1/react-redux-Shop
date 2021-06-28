const app = require('express')()
const os = require('os')
const fs = require('fs')
const serverURL = require('./backend/serverURL');

let errorMsg = 'An error occurred :c'

app.get('/', (req, res) =>
{
    fs.readFile(`${__dirname}/dist/index.html`, (err, data) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(err)
        {
            console.error(err)
            res.status(500).end(errorMsg)
        }
        res.status(200).end(data)
    })
})

app.get('/bundle.js', (req, res) =>
{
    fs.readFile(`${__dirname}/dist/bundle.js`, (err, data) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(err)
        {
            console.error(err)
            res.status(500).end(errorMsg)
        }
        res.status(200).end(data)
    })
})

app.listen(serverURL.port - 1, serverURL.host, () =>
{
    console.log(`Frontend: Listening on http://${serverURL.host}:${serverURL.port -1}`)
})