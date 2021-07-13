const mongoose = require('mongoose');

let schema = new mongoose.Schema(
    {
        email: String,
        password: String,
        CNPJ: String,
        phone: String,
        whatsapp: String,
        address:
        {
            CEP: String,
            state: String,
            city: String,
            district: String,
            optional: String
        },
        key: String
    }
);

module.exports = mongoose.model('accounts', schema);