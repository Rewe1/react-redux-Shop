import express from 'express'
const app = express();
import fs from 'fs'
import serverURL from '../../serverURL'
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

import get from './routes/shopItems/fetch'
import post from './routes/shopItems/post'

app.use(`/${serverURL.shopItems.fetchPath}`, get);
app.use(`/${serverURL.shopItems.postPath}`, post);

// accounts

import register from './routes/accounts/registerAcc'
import login from'./routes/accounts/login'

app.use(`/${serverURL.accounts.registerPath}`, register)
app.use(`/${serverURL.accounts.loginPath}`, login)

// assets

import res from './routes/res'
app.use('/res', res)

// 404

app.use(function(req: any, res: any, next: any) {
    res.status(404).redirect('/')
})

app.listen(serverURL.port, serverURL.host, () =>
{
    console.log(`Express: Listening on http://${serverURL.host}:${serverURL.port}`);
})