import { Response } from 'express';
import { combineReducers } from 'redux';
import {accounts} from '../../../mongoDB/index'
import findByEmail from './findByEmail';
var bcrypt = require('bcryptjs');

interface accountID
{
    email: string,
    password: string
}

let authenticate = (res: Response, info: accountID, cb: (data: any) => any) =>
{
    findByEmail(res, info.email, (data) =>
    {
        let passHash = data.password
        try{
            if(!bcrypt.compareSync(info.password, passHash))
                throw new Error("Password hash does not match the database's")
        }
        catch(exc){
            // It's a 401 but send 404 to not give information if the email is registered.
            res.status(404).end()
            return;
        }

        cb(data)
    })
}

export default authenticate