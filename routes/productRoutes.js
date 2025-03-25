const express = require('express');
const { getAllProducts, getproduct,getProductsByCategory, createProduct, editProduct, removeProduct } = require('../controllers/productController');
const {authMiddleware, adminMiddleware} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createProduct); // Protect this route with auth middleware
router.get('/', getAllProducts)
router.get('/:id', getproduct);
router.put('/edit/:id',authMiddleware,adminMiddleware, editProduct, );
router.delete('/delete/:id',authMiddleware, adminMiddleware, removeProduct);
router.get('/category/:category', getProductsByCategory);

module.exports = router;
