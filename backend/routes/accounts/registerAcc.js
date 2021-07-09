const router = require('express').Router();
const accountModel = require('../../mongoDB').accounts;
let serverURL = require('../../../serverURL')
var bcrypt = require('bcryptjs');
let crypto = require('../../CryptoJs/index')

// TEMPORARILY HARDCODED
let iv = 'lw9YQ8lRpTeR0HOhJgiXiDXJIytmCzsx'

// bodyParser parses post form data to json, which can be saved into db
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, (req, res) =>
{
    const newAcc = req.body

    let key = crypto.genKey(newAcc.password)

    newAcc.email = crypto.encrypt(newAcc.email, key)
    newAcc.password = crypto.encrypt(bcrypt.hashSync(newAcc.password, 10), key)

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
            res.status(200).redirect(`http://${serverURL.host}:${serverURL.port ? serverURL.port : ''}/`)
    })
})

module.exports = router;