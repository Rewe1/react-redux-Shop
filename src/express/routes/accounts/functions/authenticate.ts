import { Response } from 'express';
import { combineReducers } from 'redux';
import {accounts} from '../../../mongoDB/index'
var bcrypt = require('bcryptjs');

interface accountID
{
    email: string,
    password: string
}

let authenticate = (res: Response, info: accountID, cb: () => any) =>
{
    accounts.findOne({email: info.email}, (err: Error, data: any) =>
    {
        try{
            if(err)
                throw err
        }
        catch(exc){
            res.status(500).end()
            return;
        }
        
        try{
            if(data === null)
                throw new Error('Email does not match with any information in the database')
            else
            {
                let passHash = data.password
                if(!bcrypt.compareSync(info.password, passHash))
                    throw new Error("Password hash does not match the database's")
            }
        }
        catch(exc){
            res.status(401).end()
            return;
        }
        cb()
    })
}

export default authenticate