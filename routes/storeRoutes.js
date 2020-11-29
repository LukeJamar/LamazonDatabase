// C.S.3320 Internet Software Development
// Due Date: 11/03/2020
// Author: Frederick Jamar flj5

const express = require('express');
const storeRouter = express.Router();

// Mongoose Model connection
const StoreModel = require('../data/StoreModel');

// Session inclusions for StoreItems
const session = require('express-session');


///////////////////////////////////////////////////////////
// Mongoose implementation
// 4.1: GET /StoreItem/:StoreItemID – Get the store item’s details
// ADDITION: takes last veiwed items into the session
storeRouter.get('/StoreItem/:StoreItemID', async (req, res) => {
    try {
        const foundStoreItem = await StoreModel.findById(req.params.StoreItemID);
        if (!foundStoreItem) {
            return res.sendStatus(404);
        }
        // New code section added for sessions
        if (!req.session.lastItemVeiwed) {
            req.session.lastItemVeiwed = [foundStoreItem];
        }
        else {
            req.session.lastItemVeiwed.push(foundStoreItem);
            if (req.session.lastItemVeiwed.length > 10) {
                req.session.lastItemVeiwed.pop();
            }
        }
        // return the storeItem
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

///////////////////////////////////////////////////////////
// Session Request!!
// GET /StoreItem/Recent?num=10 - Get previously searched items via session depending on 
// querey number (or all in the session)
storeRouter.get('/StoreItem/Hist/Recent', async (req, res) => {

    //Check if the session exists or is available
    if (!req.session.lastItemVeiwed) {
        return res.sendStatus(404);
    }

    // get and output the number of veiwed items based on query
    if(req.query.num) {
        let veiws = req.query.num;
        let index;
        let lastSectionVeiwed = [];
        for (index = 0; index < veiws; index++) {
            lastSectionVeiwed.push(req.session.lastItemVeiwed[index]);
        }
        res.send(lastSectionVeiwed);
    }
    else {
        // output all veiwed items
        res.send(req.session.lastItemVeiwed)
    }

})

module.exports = storeRouter;