import express from 'express'
const router = express.Router();
import {accounts} from '../../mongoDB'
var bcrypt = require('bcryptjs');
import cryptoF from '../../crypto-functions/index'
import mapAccount from './functions/mapAccount'
import setCookie from './functions/setCookie'
import findByEmail from './functions/findByEmail';

// bodyParser parses post form data to json, which can be saved into db
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, (req: any, res: any) =>
{
    let account = req.body
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

    console.log(account)
    if(!(account.password.match(/(?=.*[0-9])(?=.*[a-zA-Z]).{8,}/)))
        return res.status(400).end()
    
    findByEmail(res, account.email, (data) =>
    {
        if(data != null)
        {
            res.status(409).end()
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