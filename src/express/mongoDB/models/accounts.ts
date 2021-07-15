import mongoose from 'mongoose'

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
        key: String,
        session:
        {
            token: String,
            expiration: Number
        }
    }
);

export default mongoose.model('accounts', schema);