
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['In Stock', 'Out of Stock','Low Stock'],
    default: 'Out of Stock'
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
  },

  shopkeeperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

//  compounding indexing
productSchema.index({ productname: 1, shopkeeperId: 1 }, { unique: true });

const Product = mongoose.model('product', productSchema);
module.exports = Product;
