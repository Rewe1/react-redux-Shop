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

// Create schema
const itemSchema = new mongoose.Schema(
    {
        title: String,
        category: String,
        price: Number
    }
);

// Create model
const items = mongoose.model('items', itemSchema);

module.exports = items;