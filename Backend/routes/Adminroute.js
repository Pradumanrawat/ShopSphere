const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// GET customer data
router.get('/', verifyToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }).select('fullName email address');

    const shopkeepers = await User.find({ role: 'shopkeeper' }).select(' fullName shopName shopaddress email');

    res.status(200).json({
      customers,
      shopkeepers,
    });
  } catch (err) {
    console.log('Error fetching admin data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
