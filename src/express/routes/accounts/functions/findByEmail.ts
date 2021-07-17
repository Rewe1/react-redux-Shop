import {Response} from 'express'
import { createBrowserHistory } from 'history'
import {accounts} from '../../../mongoDB/index'

let findByEmail = (res: Response, email: string, cb: (account: any) => any) =>
{
    accounts.findOne({email: email}, (err: Error, account: any) =>
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

        cb(account)
    })
}

export default findByEmail