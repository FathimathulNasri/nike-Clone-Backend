const cartService = require('../services/cartService')


 const addCart = async(req, res)=>{
    try{
        const {productId }= req.body
        const userId = req.user.id
        console.log(userId)
        const cart = await cartService.addToCart(userId, productId)
        res.status(200).json({message: 'product carted succesull', cart})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await cartService.getCart(userId);
    
        if (!cart) {
            return res.status(200).json({ message: "Cart is empty", products: [] });
        }

        res.status(200).json(cart || { message: "Cart is empty" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const cart = await cartService.removeFromCart(userId, id);
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const clearCart = async (req, res) => {
    console.log('hai')
    try {
        const userId = req.user.id;
        console.log('sss',userId)
        await cartService.clearCart(userId);
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.log('Error during cart clearing:', error);
        res.status(500).json({ message: "error not showing "});
    }
};

module.exports = {addCart, getCart, removeFromCart, clearCart}