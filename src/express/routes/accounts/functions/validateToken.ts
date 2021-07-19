import { Request, Response } from 'express'
import {accounts} from '../../../mongoDB/index'
import setCookie from './setCookie'
import findByEmail from './findByEmail'

let validateToken = (res: Response, cookie: any, cb: (data: any) => any) =>
{
    findByEmail(res, cookie.email, (account) =>
    {
        let clock = new Date()

        if(account === null)
        {
            res.status(404).end()
            return;
        }
        if(!(account.session.token === cookie.token))
        {
            res.status(401).end('Not authenticated')
            return;
        }
        else
        {
            let session = account.session
            if(clock.getTime() > session.expiration)
            {
                if(!session.rememberMe)
                {
                    res.status(401).end('Not authenticated')
                    return;
                }
                else
                {
                    accounts.findOneAndUpdate(
                    {email: account.email}, 
                    {session: setCookie(res, account.email, session.derivatedKey, true)}, {}, 
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
                            return;
                        }
                        doc.save()
                    })
                }
            }
        }
        cb(account)
    })
}

export default validateToken