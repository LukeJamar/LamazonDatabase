// C.S.3320 Internet Software Development
// Due Date: 11/03/2020
// Author: Frederick Jamar flj5

const express = require('express');
const {body, validationResult} = require('express-validator');
const userRouter = express.Router();

// Mongoose connection
const mongoose = require('mongoose');
const UserModel = require('../data/UserModel');
const CartModel = require('../data/CartModel');

// Validation to enforce POSTman body is correct
// firstName
// lastName
// email
const userValidators = [
    body('firstName').isAlpha(),
    body('lastName').isAlpha(),
    body('email').isEmail(),
];


// Mongoose suplemental get ALL users
userRouter.get('/user', async (req, res) => {
    res.send(await UserModel.find());
});


///////////////////////////////////////////////////////////
// MongoDb Implementation
// 1.1: GET /user/:UserId – Gets the user info given the id
userRouter.get('/user/:UserId', async (req, res) => {
    const foundUser = await UserModel.findById(req.params.UserId);
    res.send(foundUser ? foundUser: 404);
});


///////////////////////////////////////////////////////////
// MongoDb implementation
// 1.2 POST/user – Creates a new user
userRouter.post('/user', async (req, res) => {
    // maintain validation for minimum requirements
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // Create cart object with empty array
    const newCart = {
        cartItems: []
    };

    // Create user with cart onject and send to Db
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        cart: await CartModel.create(newCart)
    }
    res.send(await UserModel.create(newUser));
});


///////////////////////////////////////////////////////////
// MongoDb implementation
// 2.1 GET /user/:UserId/cart Gets the user’s cart
userRouter.get('/user/:UserId/cart', async (req, res) => {

    // Find the User for the specific cart
    const foundUser = await UserModel.findById(req.params.UserId);
    if (!foundUser) {
        return res.sendStatus(404);
    }
    // With user from db, find the cart with ID
    // WILL NOT WORK WITH OLD DATA
    const foundCart = await CartModel.findById(foundUser.cart);
    res.send(foundCart ? foundCart: 404);

});


///////////////////////////////////////////////////////////
// MongoDb implementation
//2.2 DELETE /user/:UserId/cart  – Empties the user’s cart

userRouter.delete('/user/:userId/cart', async (req, res) => {
    // Find user with Id
    const foundUser = await UserModel.findById(req.params.userId);
    if (!foundUser) {
        return res.sendStatus(404);
    }
    // get an instance of the cart we cant to change
    const foundCart = await CartModel.findById(foundUser.cart);
    if (!foundCart) {
        return res.sendStatus(404);
    }
    // Empty the cartItems array and update
    foundCart.cartItems = [];
    res.send (await CartModel.findByIdAndUpdate(foundUser.cart, foundCart));
});

module.exports = userRouter;