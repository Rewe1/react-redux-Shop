const router = require('express').Router();
const accounts = require('../../mongoDB').accounts;
var bcrypt = require('bcryptjs');
let crypto = require('../../CryptoJs/index')
let serverURL = require('../../../serverURL')

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, (req, res) =>
{
    let account = req.body

    let key = crypto.genKey(account.password)
    let encEmail = crypto.encrypt(account.email, key)

    accounts.findOne({email: encEmail}, (err, data) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(exc)
        {
            res.status(500).end()
        }
        
        try
        {
            if(data === null)
                throw new Error('Email does not match with any information in the database')
            
            let passHash = crypto.decrypt(data.password, key)
            if(!bcrypt.compareSync(account.password, passHash))
                throw new Error("Password hash does not match the database's")
        }
        catch(exc)
        {
            res.status(401).end()
        }

        res.status(200).end(`http://${serverURL.host}:${serverURL.port ? serverURL.port : ''}/`)
    })
});

module.exports = router;