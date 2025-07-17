const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/Product');
const Order = require('../models/Order'); // You may need to create this model
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');

// ✅ After successful payment: reduce stock & update revenue
router.post('/', verifyToken, async (req, res) => {
  const { productName, shopkeeperId, price } = req.body;

  try {
    // 1. Find and update product stock
    const product = await Product.findOne({
      productname: productName,
      shopkeeperId,
    });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.stockQuantity > 0) {
      product.stockQuantity -= 1;

      // Update stock status
      if (product.stockQuantity === 0) product.status = 'Out of Stock';
      else if (product.stockQuantity <= 5) product.status = 'Low Stock';
      else product.status = 'In Stock';

      await product.save();
    }

    // 2. Optionally store order history (optional)
    await Order.create({
      productName,
      
      shopkeeperId: new mongoose.Types.ObjectId(shopkeeperId),
      price,
      date: new Date(),
    });

    res.status(200).json({ message: 'Stock reduced & revenue recorded.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error in stock reduction.' });
  }
});

module.exports = router;
