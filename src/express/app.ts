const express = require('express');
const app = express();
const fs = require('fs')
let serverURL = require('../../serverURL')
let errorMsg = 'An error occurred :c'
// Frontend


app.get('/', (req: any, res: any) =>
{
    fs.readFile(`${__dirname}/index.html`, (err: any, data: any) =>
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

app.get('/bundle.js', (req: any, res: any) =>
{
    fs.readFile(`${__dirname}/bundle.js`, (err: any, data: any) =>
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
app.use(function (req: any, res: any, next: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

// shopItems

const get = require('./routes/shopItems/fetch');
const post = require('./routes/shopItems/post');

app.use(`/${serverURL.shopItems.fetchPath}`, get);
app.use(`/${serverURL.shopItems.postPath}`, post);

// accounts

const register = require('./routes/accounts/registerAcc')
const login = require('./routes/accounts/login')

app.use(`/${serverURL.accounts.registerPath}`, register)
app.use(`/${serverURL.accounts.loginPath}`, login)

// assets

const res = require('./routes/res')
app.use('/', res)

// 404

app.use(function(req: any, res: any, next: any) {
    res.status(404).redirect('/')
})

app.listen(serverURL.port, serverURL.host, () =>
{
    console.log(`Express: Listening on http://${serverURL.host}:${serverURL.port}`);
})