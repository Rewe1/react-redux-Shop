import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import validateToken from './functions/validateToken'
import {accounts} from '../../mongoDB/index'
import mapAccount from './functions/mapAccount'
import cryptoF from '../../crypto-functions/index'

const router = express.Router()

router.use(cookieParser())
router.use(bodyParser.json())

router.post('/', (req: Request, res: Response) =>
{
    let cookie =JSON.parse(req.cookies.authToken)
    let changes = req.body

    validateToken(cookie, res, () =>
    {
        accounts.find({email: changes.email}, (err: Error, doc: any) =>
        {
            let account = doc[0]
            try{
                if(err)
                throw err
            }
            catch(exc)
            {
                console.error(exc)
                res.status(500).end('An error occurred :c')
                return;
            }
            
            let encryptionKey = cryptoF.decrypt(account.key, cookie.derivatedKey)
            changes = mapAccount(cryptoF.encrypt, changes, encryptionKey)

            accounts.findOneAndUpdate({email: changes.email},
            {...changes}, {},
            (err: Error, doc: any) =>
            {
                try{
                    if(err)
                        throw err
                }
                catch(exc)
                {
                    console.error(exc)
                    res.status(500).end('An error occurred :c')
                    return;
                }
                doc.save()
                res.status(200).end()
            })
        })
    })
})

export default router