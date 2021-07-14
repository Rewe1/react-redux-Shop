import express from 'express'
import models from '../../mongoDB'
var bcrypt = require('bcryptjs');
import cryptoF from '../../crypto-functions/index'
import mapAccount from './mapAccount'

const router = express.Router()

const bodyParser = require('body-parser');
router.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, (req: any, res: any) =>
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

    let formData = 
    {
        email: req.body.email,
        password: req.body.password
    }

    // Look for an account with the email
    models.accounts.findOne({email: formData.email}, (err: Error, data: any) =>
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
                let passHash = data.password
                if(!bcrypt.compareSync(formData.password, passHash))
                    throw new Error("Password hash does not match the database's")
            }
        }
        catch(exc)
        {
            res.status(401).end()
            return;
        }

        let account = JSON.parse(JSON.stringify(data));
        let derivatedKey = cryptoF.derivateKey(account.email, formData.password)
        let encryptionKey = cryptoF.decrypt(account.key, derivatedKey)

        mapAccount(cryptoF.decrypt, account, encryptionKey)

        res.status(200).end(JSON.stringify(
            {
                ...account,
                password: undefined,
                key: undefined
            }
        ))
    })
});

module.exports = router;