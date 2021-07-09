const express = require('express');
const app = express();
let serverURL = require('../serverURL')

// Enable cross origin resource sharing
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', [`http://${serverURL.host}:8080`]);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

// shopItems

const fetch = require('./routes/shopItems/fetch');
const post = require('./routes/shopItems/post');

app.use(`/${serverURL.shopItems.fetchPath}`, fetch);
app.use(`/${serverURL.shopItems.postPath}`, post);

// accounts

const register = require('./routes/accounts/registerAcc')
const login = require('./routes/accounts/login')

app.use(`/${serverURL.accounts.registerPath}`, register)
app.use(`/${serverURL.accounts.loginPath}`, login)

app.listen(serverURL.port, serverURL.host, () =>
{
    console.log(`Backend: Listening on http://${serverURL.host}:${serverURL.port}`);
})