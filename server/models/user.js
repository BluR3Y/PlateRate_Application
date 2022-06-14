import mongoose from 'mongoose';
const { Schema } = mongoose;

import mongoConn from '../utils/mongodb.js';


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
const User = mongoose.model('User', userSchema);

export default User;
