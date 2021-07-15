import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false);

const uri = 'mongodb+srv://rewe:WSVwD9zJGjhL@cluster0-lojkm.gcp.mongodb.net/shopAppDb?retryWrites=true&w=majority';

// Connect to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err: Error) =>
{
    try
    {
        if(err)
            throw err;
        else
            console.log('Connected to mongoDb')
    }
    catch(exc)
    {
        console.error(exc);
    }
});

import accountsModel from './models/accounts'
import itemsModel from './models/items'

export default
{
    accounts: accountsModel,
    items: itemsModel
}
export let accounts = accountsModel
export let items = itemsModel