const mongoose = require('mongoose');

const url='mongodb://localhost:27017/ShopSphere';

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


