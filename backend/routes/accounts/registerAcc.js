const router = require('express').Router();
const accounts = require('../../mongoDB').accounts;
let serverURL = require('../../../serverURL')
var bcrypt = require('bcryptjs');
let CryptoJs = require('../../crypto-functions/index')
let mapAccount = require('./mapAccount')

// bodyParser parses post form data to json, which can be saved into db
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
    
    let account = 
    {
        email: req.body.email,
        password: req.body.password,
        CNPJ: req.body.CNPJ,
        phone: req.body.phone,
        whatsapp: req.body.whatsapp,
        address:
        {
            CEP: req.body.CEP,
            state: req.body.state,
            city: req.body.city,
            district: req.body.district,
            optional: req.body.optional
        },
    }

    // Check if email is already in use
    accounts.findOne({email: account.email}, (err, data) =>
    {
        if(data != null)
        {
            res.status(401).end()
            return;
        }
        else
        {
            let encryptionKey = CryptoJs.genRandomKey()
            let derivatedKey = CryptoJs.derivateKey(account.email, account.password)

            account.password = bcrypt.hashSync(account.password, 10)
            
            account = mapAccount(CryptoJs.encrypt, account, encryptionKey)
            
            account.key = CryptoJs.encrypt(encryptionKey, derivatedKey)

            accounts(account).save((err) =>
            {
                try
                {
                    if(err)
                        throw err
                }
                catch(exc)
                {
                    console.error(exc);
                    res.status(500).end();
                    return;
                }

                
                accounts.findOne({email: account.email}, (err, data) =>
                {
                    try
                    {
                        if(err)
                            throw err
                    }
                    catch(exc)
                    {
                        console.error(exc);
                        res.status(500).end();
                        return;
                    }

                    res.status(200).end(JSON.stringify(
                        {
                            ...data._doc,
                            password: undefined,
                            key: undefined
                        })
                    )
                })
            })   
        }
    })
})

module.exports = router;