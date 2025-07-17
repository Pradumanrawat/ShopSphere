const mongoose=require('mongoose');
const  orderschema=new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  shopkeeperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Optional: Add if tracking customer
  },
  date: {
    type: Date,
    default: Date.now,
  }
})


const Order = mongoose.model('Order', orderschema);

module.exports = Order;