
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product'); // Import your Product model
const user=require('../models/User');

const { verifyToken } = require('../middleware/authMiddleware');

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure "uploads" folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

//add new product

router.post('/', upload.single('image'),verifyToken, async (req, res) => {
  try {
    const shopkeeperId = req.user._id;
    const {
      productname,
      price,
      stockQuantity,
      category,
      status,
      description,
    
    } = req.body;

    const image = req.file ? req.file.filename : null;


  

    

    const newProduct = new Product({
      productname,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity),
      category,
      status,
      description,
      image,
      shopkeeperId
    });

    const response = await newProduct.save();
    res.status(200).json(response);
  } catch (err) {
    console.log( err);
    res.status(500).json({ message: 'Internal server err' });
  }
});


//get all products
router.get('/',verifyToken, async (req, res) => {
  try {
    const shopkeeperId = req.user._id;
    const products = await Product.find({shopkeeperId});
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json('Internal server error');
  }
});


//update existing product via id
router.put('/:id', upload.single('image'),verifyToken, async (req, res) => {
  try {
    const productId = req.params.id;

    // Extract fields from form-data (req.body)
    const productname = req.body.productname;
    const price = req.body.price;
    const stockQuantity = req.body.stockQuantity;
    const category = req.body.category;
    const description = req.body.description;
    const status = req.body.status;

    // Create a new object to store updated data
    const updateData = {};

    // Add each field only if it exists
    if (productname) {
      updateData.productname = productname;
    }

    if (price) {
      updateData.price = parseFloat(price);
    }

    if (stockQuantity) {
      updateData.stockQuantity = parseInt(stockQuantity);
    }

    if (category) {
      updateData.category = category;
    }

    if (description) {
      updateData.description = description;
    }

  
      

    // If image is uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    // Now update the product
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});



//delete product by id
router.delete('/:id', verifyToken,async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json('Internal server error');
  }
});



module.exports = router;
