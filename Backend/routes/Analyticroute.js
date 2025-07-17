





const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/Product');
const Order = require('../models/Order');
const { verifyToken } = require('../middleware/authMiddleware');



router.get('/', verifyToken, async (req, res) => {
  try {
    const shopkeeperId = req.user._id; // ✅ Use as is

    const allproducts = await Product.find({ shopkeeperId });
    const totalproducts = allproducts.length;

    const categorycount = {};
    for (let product of allproducts) {
      const category = product.category;
      categorycount[category] = (categorycount[category] || 0) + 1;
    }

    const statusCounts = {
      inStock: allproducts.filter(p => p.status === "In Stock").length,
      lowStock: allproducts.filter(p => p.status === "Low Stock").length,
      outOfStock: allproducts.filter(p => p.status === "Out of Stock").length,
    };

    
     
      const low = allproducts
  .filter(p => p.status === 'Out of Stock')
  .slice(0, 5);

    // ✅ Match shopkeeperId directly, convert only if necessary
    const totalRevenueAgg = await Order.aggregate([
      {
        $match: {
          shopkeeperId: new mongoose.Types.ObjectId(shopkeeperId), // Use this ONLY IF shopkeeperId is a string
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const revenueByProduct = await Order.aggregate([
      { $match: { shopkeeperId: new mongoose.Types.ObjectId(req.user._id) } },
      {
        $group: {
          _id: "$productName",
          totalRevenue: { $sum: "$price" }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    const totalOrdersFromCustomers = await Order.countDocuments({ shopkeeperId });

    res.status(200).json({
      totalproducts,
      allproducts,
      categorycount,
      statusCounts,
      low,
      totalRevenue,
      revenueByProduct,
      totalOrdersFromCustomers
    });

  } catch (err) {
    console.log(err);
    res.status(504).json({ message: 'internal server error' });
  }
});


module.exports = router;








