const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {type: String},
  price: { type: Number, required: true },
  image: { type: String },
  category:{ type: String, required: true},
  product_details: { type: String },
  sizes: [{ type: String, enum : ['XS', 'S', 'M', 'L', 'XL', 'XXL','UK 1.5','UK 2.5','UK 3','UK 3.5','UK 4','UK 4.5','UK 5','UK 5.5','UK 6','UK 6.5',
    'UK 7.5','UK 8','UK 8.5','UK 9','UK 9.5','UK 10','UK 10.5','UK 11','UK 11.5','UK 12']}],
  offer: { type : String}
});

module.exports = mongoose.model('Product', productSchema);