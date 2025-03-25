const mongoose = require('mongoose')
const Cart = require('../models/Cart')

const addToCart = async(userId, productId)=>{
    console.log(userId)
    let cart = await Cart.findOne({userId})
    if (!cart) {
        cart = new Cart({ userId, products: [productId] });
    } else {
        if (!cart.products.includes(productId)) {
            cart.products.push(productId);
        }
    }
    await cart.save()
    return cart
}

const getCart = async (userId) => {
    try{
        const cart = await Cart.findOne({ userId }).populate("products");
        return cart.products
    }catch(err){
        return err
    }
}

const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    const productObjectId = new mongoose.Types.ObjectId(productId.toString());
    cart.products = cart.products.filter(item => !item.equals(productObjectId));
    await cart.save();
    return cart;
};

const clearCart = async (userId) => {
    console.log(userId)
    const cart = await Cart.findOneAndDelete({ userId });
    console.log(cart)
};
module.exports = {addToCart, getCart, removeFromCart, clearCart}