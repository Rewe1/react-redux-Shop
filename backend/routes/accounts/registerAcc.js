const router = require('express').Router();
const accounts = require('../../mongoDB').accounts;
let serverURL = require('../../../serverURL')
var bcrypt = require('bcryptjs');
let crypto = require('../../CryptoJs/index')

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
    
    const account = req.body

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
            let key = crypto.genKey(account.password, account.email)

            account.password = crypto.encrypt(bcrypt.hashSync(account.password, 10), key)

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
                         _id: data._id,
                        email: data.email,
                    }))
                })
            })   
        }
    })
})

module.exports = router;