const mongoose = require('mongoose');

// Schema for Carts, ID is handeled by MongoDb
const CartSchema = new mongoose.Schema (
    {
    cartItems: [
        {
            storeItemId: String,
            quantity: Number
        }
    ],
    }
)

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;