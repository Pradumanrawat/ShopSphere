
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const{verifyToken,authorizeRoles}=require('../middleware/authMiddleware')

// Route: GET /shoplinks (get shops + products, optionally filtered by product name)
// GET /shoplinks (only accessible by customer and shopkeeper)
router.get(
  '/',
  verifyToken,
  authorizeRoles(['customer', 'shopkeeper']), // ✅ restrict access to only these roles
  async (req, res) => {
    const searchQuery = req.query.query?.toLowerCase();
    const { role: userRole, area: userArea } = req.user;

    try {
      let shopQuery = { role: 'shopkeeper' };

      // ✅ For customer, restrict by area if no search query
      if (userRole === 'customer' && (!searchQuery || searchQuery.trim() === '')) {
        shopQuery.shopaddress = userArea;
      }

      const shopkeepers = await User.find(shopQuery).lean();

      const result = await Promise.all(
        shopkeepers.map(async (shop) => {
          let products = await Product.find({ shopkeeperId: shop._id }).lean();

          if (searchQuery) {
            products = products.filter(p =>
              p.productname.toLowerCase().includes(searchQuery)
            );
          }

          if (searchQuery && products.length === 0) return null;

          return {
            shopkeeperId: shop._id,
            name: shop.fullName,
            shopName: shop.shopName || "Unnamed Shop",
            shopaddress: shop.shopaddress,
            shopLink: `http://localhost:3000/shop/${encodeURIComponent(shop.shopName)}`,
            products: products.map(product => ({
              name: product.productname,
              price: product.price,
              description: product.description,
              status: product.status,
              image: product.image
                ? `http://localhost:3000/uploads/${product.image}`
                : '',
            })),
          };
        })
      );

      const filteredResult = result.filter(Boolean);

      res.status(200).json(filteredResult);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  }
);



// Route: GET /shop/:shopName (get specific shop details)
router.get('/:shopName',verifyToken,authorizeRoles(['customer']), async (req, res) => {
  const { shopName } = req.params;

  try {
    const shopkeeper = await User.findOne({ shopName });
    if (!shopkeeper) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    const products = await Product.find({ shopkeeperId: shopkeeper._id });

    res.json({
      shopkeeperId: shopkeeper._id,
      name: shopkeeper.shopName,
      image: 'https://via.placeholder.com/150',
      products: products.map((p) => ({
        name: p.productname,
        price: p.price,
        category: p.category,
        description: p.description,
        image: p.image
          ? `http://localhost:3000/uploads/${p.image}`
          : '',
        stockStatus: p.status,
        stockColor:
          p.status === 'In Stock'
            ? 'green'
            : p.status === 'Low Stock'
            ? 'orange'
            : 'red',
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});








module.exports = router;
