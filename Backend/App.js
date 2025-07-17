
const express = require("express");
const connectDB = require('./db'); 
const authRouter = require('./routes/auth');
const cors = require('cors'); // to enable cross request from frontend to backend 
const productrouter=require('./routes/productroute')
const analyticroute=require('./routes/Analyticroute')
const shopslinkroute=require('./routes/Shopslink');
const adminroute=require('./routes/Adminroute');
const paymentroute=require('./routes/Paymentroute')
const paymentsuccess=require('./routes/Payment200')
const app = express(); 


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
const fs = require('fs');
const path = require('path');

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

//  Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/', authRouter);
app.use('/product',productrouter)
app.use('/analytic',analyticroute);
app.use('/shoplinks',shopslinkroute);
app.use('/shop',shopslinkroute);
app.use('/admindata',adminroute);
app.use('/payment',paymentroute);
app.use('/paymentsuccess',paymentsuccess);
//  Serve static images from 'uploads' folder
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
