const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
    {
        title: String,
        category: String,
        description: String,
        price: Number
    }
);