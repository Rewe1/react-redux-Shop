import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import {accounts} from '../../mongoDB/index'
import mapAccount from './functions/mapAccount'
import cryptoF from '../../crypto-functions/index'
import setCookie from './functions/setCookie'
import validateToken from './functions/validateToken'
import { validate } from 'json-schema'

const router = express.Router()
router.use(cookieParser())

router.get('/', (req: Request, res: Response) =>
{
    let cookie = JSON.parse(req.cookies.authToken)

    validateToken(res, cookie, (account) =>
    {
        let encryptionKey = cryptoF.decrypt(account.key, cookie.derivatedKey)
        
        account = mapAccount(cryptoF.decrypt, account, encryptionKey)
        
        let body = account
        body.password = undefined
        body.session = undefined
        body.key = undefined
        
        res.status(200).end(JSON.stringify(body))
    })
    
})

export default router