const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/tester', () => {
    console.log('Connected to mongoBD');
},
    err => console.log(err)
);