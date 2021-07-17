import { Response } from 'express'
import cryptoF from '../../../crypto-functions/index'

let setCookie = (res: Response, email: string, derivatedKey: string, rememberMe: boolean) =>
{
    let age = 8 * 60 * 60 * 1000
    let clock = new Date()
    let token = cryptoF.genRandomKey()

    if(rememberMe)
        res.cookie('authToken', JSON.stringify({email: email, token, derivatedKey}), {expires: new Date(2999, 0)})
    else
        res.cookie('authToken', JSON.stringify({email: email, token, derivatedKey}), {maxAge: age})

    return {
        token,
        expiration: clock.getTime() + age,
        rememberMe
    }
}

export default setCookie