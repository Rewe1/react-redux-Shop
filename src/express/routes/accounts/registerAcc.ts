import express from 'express'
const router = express.Router();
import {accounts} from '../../mongoDB'
var bcrypt = require('bcryptjs');
import cryptoF from '../../crypto-functions/index'
import mapAccount from './mapAccount'
import setCookie from './setCookie'

// bodyParser parses post form data to json, which can be saved into db
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
        key: '',
        session:
        {
            token: '',
            expiration: 0
        }
    }

    // Check if email is already in use
    accounts.findOne({email: account.email}, (err: Error, data: any) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(exc)
        {
            console.error(exc)
            res.status(500).end()
            return;
        }

        if(data != null)
        {
            res.status(401).end()
            return;
        }
        else
        {
            let encryptionKey = cryptoF.genRandomKey()
            let derivatedKey = cryptoF.derivateKey(account.email, account.password)

            account.password = bcrypt.hashSync(account.password, 10)
            account = mapAccount(cryptoF.encrypt, account, encryptionKey)
            account.key = cryptoF.encrypt(encryptionKey, derivatedKey)
            let rememberMe = req.body.rememberMe === 'on' ? true : false

            account.session = setCookie(res, account.email, derivatedKey, rememberMe)

            new accounts(account).save((err: Error) =>
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
        }
    })
})

export default router;