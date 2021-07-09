const mongoose = require('mongoose');

let schema = new mongoose.Schema(
    {
        email: 
        {
            type: String
        },
        password: 
        {
            type: String
        }
    }
);

module.exports = mongoose.model('accounts', schema);