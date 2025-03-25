const express = require('express')
const {addCart, getCart, removeFromCart, clearCart} = require('../controllers/cartController')
const {authMiddleware} = require('../middleware/authMiddleware')


const router = express.Router()

router.get('/',authMiddleware, getCart)
router.post('/',authMiddleware, addCart )
router.delete('/:id', authMiddleware, removeFromCart)
router.delete('/cart-clear',authMiddleware, clearCart)

module.exports = router