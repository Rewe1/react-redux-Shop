const express = require('express');
const app = express();
const fs = require('fs')
let serverURL = require('./serverURL')

// Frontend

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

// Enable cross origin resource sharing
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

// shopItems

const fetch = require('./backend/routes/shopItems/fetch');
const post = require('./backend/routes/shopItems/post');

app.use(`/${serverURL.shopItems.fetchPath}`, fetch);
app.use(`/${serverURL.shopItems.postPath}`, post);

// accounts

const register = require('./backend/routes/accounts/registerAcc')
const login = require('./backend/routes/accounts/login')

app.use(`/${serverURL.accounts.registerPath}`, register)
app.use(`/${serverURL.accounts.loginPath}`, login)

// assets

const res = require('./backend/res')
app.use('/', res)

// 404

app.use(function(req, res, next) {
    res.status(404).redirect('/')
})

app.listen(serverURL.port, serverURL.host, () =>
{
    console.log(`Express: Listening on http://${serverURL.host}:${serverURL.port}`);
})