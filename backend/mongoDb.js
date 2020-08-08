const mongoose = require('mongoose');

const uri = 'mongodb+srv://rewe:WSVwD9zJGjhL@cluster0-lojkm.gcp.mongodb.net/shopAppDb?retryWrites=true&w=majority';
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

const connection = mongoose.connection;
module.exports = connection;

/* const messageSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        message: String,
    }
);
    
const messages = mongoose.model('Messages', messageSchema);
    
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true }); */