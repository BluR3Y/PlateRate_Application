import mongoose from "mongoose";

const mongoConn = mongoose.connect('mongodb://localhost:27017/tester', () => {
    console.log('connected');
},
    err => console.log(err)
);

export default mongoConn;