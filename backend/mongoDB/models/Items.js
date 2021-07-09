const mongoose = require('mongoose');

let schema = new mongoose.Schema(
    {
        title: String,
        category: String,
        description: String,
        price: Number
    }
);

module.exports = mongoose.model('items', schema);