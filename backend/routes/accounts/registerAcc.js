const router = require('express').Router();
const accountModel = require('../../mongoDB').accounts;
let serverURL = require('../../../serverURL')
var bcrypt = require('bcryptjs');
var CryptoJS = require('Crypto-js')

// TEMPORARILY HARDCODED
let secret = 'taFwIAFlpSMDJR01T2G5iG1p8J18nVHN'

// bodyParser parses post form data to json, which can be saved into db
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, (req, res) =>
{
    const newAcc = req.body

    newAcc.email = CryptoJS.AES.encrypt(newAcc.email, secret).toString();
    newAcc.password = CryptoJS.AES.encrypt(bcrypt.hashSync(newAcc.password, 10), secret).toString();

    accountModel(newAcc).save((err) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(exc)
        {
            console.error(exc);
            res.status(500).end('An error occurred :c');
        }
            res.status(200).redirect(`http://${serverURL.host}:8080/`)
    })
})

module.exports = router;