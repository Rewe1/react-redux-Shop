const router = require('express').Router();
const accounts = require('../../mongoDB').accounts;
var bcrypt = require('bcryptjs');
let crypto = require('../../CryptoJs/index')
let serverURL = require('../../../serverURL')

const bodyParser = require('body-parser');
router.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, (req, res) =>
{
    try
    {
        if(!Object.keys(req.body).length)
            throw new Error('Request body is empty')
    }
    catch(exc)
    {
        res.status(400).end()
        return;
    }

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
            return;
        }
        
        try
        {
            if(data === null)
                throw new Error('Email does not match with any information in the database')
            else
            {
                let passHash = crypto.decrypt(data.password, key)
                if(!bcrypt.compareSync(account.password, passHash))
                    throw new Error("Password hash does not match the database's")
            }
        }
        catch(exc)
        {
            res.status(401).end()
            return;
        }

        res.status(200).end(JSON.stringify(data))
    })
});

module.exports = router;