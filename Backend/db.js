const mongoose = require('mongoose');
require('dotenv').config();

const url=process.env.URL;

mongoose.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

const db=mongoose.connection;


db.on('connected',()=>{
  console.log("db connected...");
})


db.on('disconnected',()=>{
  console.log("db disconnected");
})


module.exports= db;


