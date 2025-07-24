const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();


require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // razpoy api get amount in paise or cent
    currency: 'INR',
    receipt: `order_rcptid_${Math.random().toString(36).substring(7)}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating Razorpay order');
  }
});

module.exports = router;
