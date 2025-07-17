const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv=require('../')
const User = require('../models/User'); // Assuming your User model is here

require('dotenv').config();

// Signup Route


router.post('/signup', async (req, res) => {
    try {
      const {
        role,
        fullName,
        email,
        password,
        phoneNumber,
        address,
        shopName,
        shopaddress,
        adminKey,
      } = req.body;
  
      if (!role || !fullName || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: 'Please enter all required fields.' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // ✅ STEP 1: Create a plain object first
      let userData = {
        fullName,
        email,
        password,
        phoneNumber,
        role,
      };
  
      // ✅ STEP 2: Add fields conditionally BEFORE calling new User()
      if (role === "customer") {
        userData.address = address;
      }
  
      if (role === "shopkeeper") {
        userData.shopName = shopName;
        userData.shopaddress = shopaddress;
      }
  
     
      if (role === "admin") {
        if (adminKey !== process.env.ADMIN_SECRET_KEY) {
          return res.status(403).json({ message: "Invalid admin key" });
        }
        userData.adminKey = adminKey;
      }
      
  
      // ✅ STEP 3: Now create the user with all fields already included
      const newuser = new User(userData);
  
      const response = await newuser.save();
      console.log(`${role} registered successfully`);
      res.status(200).json(response);
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
       
// Login Route with role check
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body; // role is expected from frontend

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log(`Login attempt for email: ${email}`);
    console.log(`User role from DB: ${user.role}, Role from request: ${role}`);

    // 2. Check if user has the correct role
    if (user.role !== role) {
      return res.status(403).json({ message: `You are not authorized as a ${role}` });
    }

    // 3. Compare password directly using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

   

    // 4. Generate JWT
    const token = jwt.sign(
      {//payload
        _id: user._id,
        fullName: user.fullName,
        role: user.role,
        area: user.role === 'shopkeeper' ? user.shopaddress : user.address,
        
      }, //secret or private key
      process.env.JWT_SECRET, 
      //options(include expire time of token ,etc)
      { expiresIn: '100d' }
    );

    // 5. Send response
    let userData = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        area: user.role === 'shopkeeper' ? user.shopaddress : user.address,
      };
      
      if (user.role === 'shopkeeper') {
        userData.shopName = user.shopName;
      }
      
      res.status(200).json({
        message: "Login successful",
        token: token,
        user: userData
      });
      

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});








module.exports = router;

