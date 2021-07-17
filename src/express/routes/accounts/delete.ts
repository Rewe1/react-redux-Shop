import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import authenticate from './functions/authenticate'
import {accounts} from '../../mongoDB/index'

const router = express.Router()
router.use(bodyParser.json())
router.use(cookieParser())

router.post('/', (req: Request, res: Response) =>
{
    let account = req.body
    authenticate(res, account, () =>
    {
        accounts.findOneAndDelete({email: account.email}, {}, (err: Error, doc: any) =>
        {
            try{
                if(err)
                    throw err
            }
            catch(exc){
                console.error(exc)
                res.status(500).end('An error occurred')
                return;
            }
            res.status(200).end()
        })
    })
})

export default router