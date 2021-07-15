import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import {accounts} from '../../mongoDB/index'
import mapAccount from './mapAccount'
import cryptoF from '../../crypto-functions/index'

const router = express.Router()
router.use(cookieParser())

router.get('/', (req: Request, res: Response) =>
{
    let cookie = JSON.parse(req.cookies.authToken)

    accounts.find({email: cookie.email}, (err: Error, data: any) =>
    {
        let account = data[0]
        try{
            if(err)
                throw err
        }
        catch(exc)
        {
            console.error(exc)
            res.status(500).end()
            return;
        }
        
        if(!data.length)
        {
            res.status(404).end()
            return;
        }

        if(!account.token === cookie.token)
        {
            res.status(401).end('Not authenticated')
            return;
        }
        else
        {
            let encryptionKey = cryptoF.decrypt(account.key, cookie.derivatedKey)
            
            account = mapAccount(cryptoF.decrypt, account, encryptionKey)
            
            let body = account
            body.password = undefined
            body.token = undefined
            body.key = undefined
            
            res.status(200).end(JSON.stringify(body))
        }
    })
    
})

export default router