import express from 'express'
const app = express();
import serverURL from '../../serverURL'

// Enable cross origin resource sharing
app.use(function (req: any, res: any, next: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

// routes

import frontend from './routes/app/index'
app.use(`/`, frontend);

import shopItems from './routes/shopItems/index'
app.use(`/shop-items`, shopItems);

import accounts from './routes/accounts/index'
app.use('/accounts', accounts)

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