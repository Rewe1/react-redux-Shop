import express from 'express'
import {accounts} from '../../mongoDB'
var bcrypt = require('bcryptjs');
import cryptoF from '../../crypto-functions/index'
import cookieParser from 'cookie-parser'
import setCookie from './functions/setCookie'
import authenticate from './functions/authenticate'

const router = express.Router()

import bodyParser from 'body-parser'
router.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: true });
router.use(cookieParser())

router.post('/', urlencodedParser, (req: any, res: any) =>
{
    let formData = req.body
    authenticate(res, formData, (data) =>
    {
        let account = JSON.parse(JSON.stringify(data));
        let derivatedKey = cryptoF.derivateKey(account.email, formData.password)
        let rememberMe = req.body.rememberMe === 'on' ? true : false
        
        accounts.findOneAndUpdate({email: formData.email}, 
        {session: setCookie(res, account.email, derivatedKey, rememberMe)}, {}, 
        (err: Error, doc: any) =>
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
            res.status(200).end()
        })
    })
})

export default router