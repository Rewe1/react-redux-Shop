import { Response } from 'express'
import cryptoF from '../../crypto-functions/index'

let setCookie = (res: Response, email: string, derivatedKey: string) =>
{
    let age = 8 * 60 * 60 * 1000
    let clock = new Date()
    let token = cryptoF.genRandomKey()
    res.cookie('authToken', JSON.stringify({email: email, token, derivatedKey}), {maxAge: age})

    return {
        token,
        expiration: clock.getTime() + 3000
    }
}

export default setCookie