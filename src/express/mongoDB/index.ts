import mongoose from 'mongoose'

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

import accounts from './models/accounts'
import items from './models/items'

export default
{
    accounts,
    items
}