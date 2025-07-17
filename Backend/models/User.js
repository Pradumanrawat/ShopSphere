const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'shopkeeper', 'admin'],
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
    
  },
  address: {
    type: String,
    
    required: function () {
      return this.role === 'customer';
    }
  },
  
  shopName: {
    type: String,
    required: function () {
      return this.role === 'shopkeeper';
    },
    unique:true
  },
  shopaddress: {
    type: String,
    
    required: function () {
      return this.role === 'shopkeeper';
    }
  },
  adminKey: {
    type: String,
    required: function () {
      return this.role === 'admin';
    }
    
  },

})

userSchema.pre('save',async function(next){
  const user=this;
  if(!user.isModified('password')){
    return next();
  } 

  try {
    const salt=await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(user.password,salt);
    user.password=hashpassword;
    next();
  } catch (error) {
    next(error);
  }
})


const User = mongoose.model('User', userSchema);

module.exports = User;
