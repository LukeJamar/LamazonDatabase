// C.S.3320 Internet Software Development
// Due Date: 11/03/2020
// Author: Frederick Jamar flj5

const express = require('express');
const storeRouter = express.Router();

// Mongoose Model connection
const StoreModel = require('../data/StoreModel');


///////////////////////////////////////////////////////////
// Mongoose implementation
// 4.1: GET /StoreItem/:StoreItemID – Get the store item’s details
storeRouter.get('/StoreItem/:StoreItemID', async (req, res) => {
    try {
        const foundStoreItem = await StoreModel.findById(req.params.StoreItemID);
        if (!foundStoreItem) {
            return res.sendStatus(404);
        }
        return res.send(foundStoreItem);
    } catch (error) {
        console.error(error.message);
       return res.sendStatus(500);
    }
});


///////////////////////////////////////////////////////////
// MongoDb implementation
// 4.2 GET /StoreItem?query=abc – Get all items that satisfy the regular expression query (or all items if no query)
storeRouter.get('/StoreItem', async (req, res) => {
    const foundStoreItems = await StoreModel.find ({
        name: new RegExp(req.query.name),
        description: new RegExp(req.query.description)
    });
    res.send(foundStoreItems ? foundStoreItems : 404);
});

module.exports = storeRouter;