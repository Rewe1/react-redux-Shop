import express from 'express'
import {accounts} from '../../mongoDB'
var bcrypt = require('bcryptjs');
import cryptoF from '../../crypto-functions/index'
import mapAccount from './mapAccount'
import cookieParser from 'cookie-parser'

const router = express.Router()

import bodyParser from 'body-parser'
router.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: true });
router.use(cookieParser())

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
    accounts.findOne({email: formData.email}, (err: Error, data: any) =>
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

        let token = cryptoF.genRandomKey()
        let account = JSON.parse(JSON.stringify(data));
        let derivatedKey = cryptoF.derivateKey(account.email, formData.password)

        res.cookie('authToken', JSON.stringify({email: account.email, token, derivatedKey}), {maxAge: 8 * 60 * 60 * 1000})

        accounts.findOneAndUpdate({email: formData.email}, {token: token}, {}, (err: Error, doc: any) =>
        {
            try{
                if (err)
                    throw err
            }
            catch(exc)
            {
                console.error(exc)
                res.status(500).end()
            }
            doc.save()
        })

        res.status(200).end()
    })
});

export default router