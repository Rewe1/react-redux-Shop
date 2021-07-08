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
const account = mongoose.model('accounts', require('./schemas/account'));
const items = mongoose.model('items', require('./schemas/shopItem'));

module.exports = 
{
    account, items,
}