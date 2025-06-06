const mongoose = require("mongoose");
require('dotenv').config();

const mongoUrl =process.env.MONGODB_URL_LOCAL

mongoose.connect(mongoUrl,{
          useNewUrlParser: true, 
          useUnifiedTopology: true
})
const db = mongoose.connection;

db.on('connected',()=>{
          console.log('connected to mongodb server')
});

db.on("err",()=>{
          console.error('mogodb connection :', err);
});
db.on('diconnected',()=>{
          console.log("mongodb disconnected");
});

module.exports = db;

