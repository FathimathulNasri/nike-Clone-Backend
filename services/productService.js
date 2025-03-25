const Product = require('../models/Product');

// Get all products
const getProducts = async () => {
return await Product.find();
};

// Get product by id
  const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
}


// Get product by Category

const getProductByCategory = async (category) => {
  try {
    const products = await Product.find({ category });  // Query products by category
    return products;
  } catch (error) {
    throw new Error('Error fetching products by category');
  }
};


// Add new product
const addProduct = async (productData) => {
  const { name, description, price, image, category,product_details, sizes, offer } = productData;
  const newProduct = new Product({ name, description, price,image,category, product_details, sizes, offer });
  await newProduct.save();
  return newProduct;
};

// Update existing product
const updateProduct = async (id, productData) => {
  // const { name, description, price, image, category,product_details, sizes, offer } = productData;
  const updatedProducts= await Product.findByIdAndUpdate(id, productData, { new: true })
  await updatedProducts.save();
  return updatedProducts;
};

// Delete product
const deleteProduct = async (id) =>{
  const deletedProduct = await Product.findByIdAndDelete( id )
   return deletedProduct 
}


module.exports = { getProducts, getProductById, getProductByCategory, addProduct, updateProduct, deleteProduct };
