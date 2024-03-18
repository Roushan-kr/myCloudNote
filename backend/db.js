// getting-started.js
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI
const connectToMongo=async()=>{
    mongoose.connect(mongoURI).then(console.log("connection sucess to mongo"))
}

module.exports =connectToMongo;
