const { getProducts, getProductById, getProductByCategory, addProduct, updateProduct, deleteProduct } = require('../services/productService');

// Controller for creating a product
const createProduct = async (req, res) => {
  try {
    const product = await addProduct(req.body);
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Controller for get all product
const getAllProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Controller function to get products by category
const getProductsByCategory = async (req, res) => {
  const { category } = req.params;  // Get the category from URL params

  try {
    const products = await getProductByCategory(category);
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }
    res.json(products);  // Return products as a response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error: error.message });
  }
};

// Controller for getting a product by ID
const getproduct = async(req, res) =>{
  try{
   const product = await getProductById(req.params.id)
   if(!product){
    res.status(404).json({message:"Product not Found"});
   }
   res.status(200||201).json({message: "Fetched Successfully", product});
  }
  catch(err){
    res.status(500).json({ message: 'Error getting product', err });
  }
}



// Controller for editing a product by ID
const editProduct = async (req, res) => {
  const { name, description, price, image, category,product_details, sizes, offer } = req.body; 
  try {
    const updatedProduct = await updateProduct(
      req.params.id,
      { name, description, price, image, category,product_details, sizes, offer }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200||201).json({message: "Update Successfully", updatedProduct});
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};


// Controller for deleting a product by ID
const removeProduct = async(req, res) =>{
const id = req.params.id
try{
const deletedProduct = await deleteProduct(id)
if(!deletedProduct){
  res.status(404).json({message:"Product not Found"});
}
res.status(200||201).json({message: "Deleted Successfully"});
}
catch(err){
  res.status(500).json({ message: 'Error deleting product', err });
}
}

module.exports = { getAllProducts, getproduct, getProductsByCategory, createProduct, editProduct, removeProduct };
