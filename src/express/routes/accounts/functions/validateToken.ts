import { Request, Response } from 'express'
import {accounts} from '../../../mongoDB/index'
import setCookie from './setCookie'

let validateToken = (cookie: any, res: Response, cb: () => any) =>
{
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

        let clock = new Date()
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
        cb()
    })
}

export default validateToken