const mongoose = require('mongoose');

const uri = 'mongodb+srv://rewe:WSVwD9zJGjhL@cluster0-lojkm.gcp.mongodb.net/shopAppDb?retryWrites=true&w=majority';

// Connect to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) =>
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

// Create model
const accounts = require('./models/accounts')
const items = require('./models/items')

module.exports = 
{
    accounts, items,
}