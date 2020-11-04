// C.S.3320 Internet Software Development
// Due Date: 11/03/2020
// Author: Frederick Jamar flj5

const express = require('express');
const {body, validationResult} = require('express-validator');
const cartRouter = express.Router();

// Mongoose Model connections
const CartModel = require('../data/CartModel');
const StoreModel = require('../data/StoreModel');

// Validation to enforce POSTman body is correct
// storeItemId
// quantity
const cartValidators = [
    body('storeItemId').isAlphanumeric(),
    body('quantity').isNumeric(),
];


// Suplemental Mongoose route to get all carts
cartRouter.get('/cart', async (req, res) => {
    res.send(await CartModel.find());
});


///////////////////////////////////////////////////////////
// MongoDb implementation
// 3.1 POST/cart/:CartId/cartItem – Add a new item to the cart
cartRouter.post('/cart/:CartId/cartItem', async (req, res) => {

    // This code validates the post body to make sure it has all the minimum pieces we need to create a user
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({errors: errors.array()});
     }
    // Check of the cart is in the database
    const foundCart = await CartModel.findById(req.params.CartId);
    if (!foundCart) {
        return res.sendStatus(404);
    }
    // check if the body item is in he database
    const foundStoreItem = await StoreModel.findById(req.body.storeItemId);
    if (!foundStoreItem) {
        return res.sendStatus(404);
    }
    // Get correct information from body
    const newCartItem = req.body;
    // Check if the item is in the cart, Increment if it is and add if it isnt
    const itemInCart = foundCart.cartItems.find(cartItem => cartItem.storeItemId === newCartItem.storeItemId);
    if (itemInCart) {
        itemInCart.quantity += newCartItem.quantity;
    }
    else {
        foundCart.cartItems.push(newCartItem);
    }
    // Update the cartItems in the database
    res.send( await CartModel.findByIdAndUpdate(req.params.CartId, foundCart));

});



///////////////////////////////////////////////////////////
// MongoDb implementation
// 3.2 DELETE /cart/:CartId/cartItem/:cartItemId – Remove an item from the cart
cartRouter.delete('/cart/:CartId/cartItem/:CartItemId', async (req, res) => {

    // Get cart from database
    const foundCart = await CartModel.findById(req.params.CartId);
    if (!foundCart) {
        return res.sendStatus(404);
    }
    // Create a new array of cartItems to replace with old
    const newCart = foundCart.cartItems.filter(cartItem => cartItem._id != req.params.CartItemId);
    if (!newCart) {
        return res.sendStatus(404);
    }
    else {
        // Update and send new cart
        foundCart.cartItems = newCart;
         return res.send( await CartModel.findByIdAndUpdate(req.params.CartId, foundCart));
    }

});

module.exports = cartRouter;