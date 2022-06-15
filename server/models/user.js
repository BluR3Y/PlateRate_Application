const mongoose = require('mongoose');
const mongoConn = require('../utils/mongodb.js');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
});

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max:100,

    },
    email: {
        type: String,
        minlength: 10,
        maxlength: 50,
        required: true,
        lowercase: true,
    },
    address: addressSchema,
});

module.exports = mongoose.model('User', userSchema);
