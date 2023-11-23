// getting-started.js
const mongoose = require('mongoose');
const mongoURI ="mongodb://127.0.0.1:27017/myCloudNote"

const connectToMongo=async()=>{
    mongoose.connect(mongoURI).then(console.log("connection sucess to mongo"))
}

module.exports =connectToMongo;
