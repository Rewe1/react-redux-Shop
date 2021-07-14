import mongoose from 'mongoose'

let schema = new mongoose.Schema(
    {
        title: String,
        category: String,
        description: String,
        price: Number
    }
);

export default mongoose.model('items', schema);