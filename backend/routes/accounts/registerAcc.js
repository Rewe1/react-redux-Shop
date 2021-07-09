const router = require('express').Router();
const accountModel = require('../../mongoDB').accounts;
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
            res.status(500).end();
            return;
        }
            res.status(200).end()
    })
})

module.exports = router;