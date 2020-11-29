// C.S.3320 Internet Software Development
// Due Date: 11/03/2020
// Author: Frederick Jamar flj5

const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();

// Added MongoDB OMR Mongoose
const mongoose = require('mongoose');
const url = "mongodb+srv://userLuke:snowBallCat@lamazondb.ao5dg.mongodb.net/LamazonDb?retryWrites=true&w=majority";
let database;

// Add session extensions
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Add JSON object to Populate DB
// No longer need to initialize
// const cartData = require('./data/sampleData/sampleCarts.json');
// const storeData = require('./data/sampleData/sampleStore.json');
// const userData = require('./data/sampleData/sampleUsers.json');
// const CartModel = require('./data/CartModel');   
// const StoreModel = require('./data/StoreModel');
// const UserModel = require('./data/UserModel');

// Establish connection to LamazonDb
const initDabase = async () => {
    database = await mongoose.connect(url);

    if (database) {
        app.use(session({
            secret: 'InAmberClad',
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));
        app.use(router);
        console.log("Successfuly connected to DB");
    }
    else {
        console.log("Failed to connect to DB");
    }
};

// populate the database with some sample values
// Only called if needed to populate database
/*
const populateDb = async () => {

    await initDabase();

    await CartModel.deleteMany({});
    await StoreModel.deleteMany({});
    await UserModel.deleteMany({});
    
    await StoreModel.create(storeData);
    // Throw in Test values
    // await CartModel.create(cartData);
    // await UserModel.create(userData);

}
*/

const port = process.env.PORT || 8080;


// routes for 1 and 2
router.use(require('./routes/userRoutes'));

// routes for  3
router.use(require('./routes/cartRoutes'));

// routes for  4
router.use(require('./routes/storeRoutes'));

// Test database connection
// populateDb(); // uncomment to populate Database
initDabase();       // comment out to populate database


app.listen(port);
console.log(`listening on port ${port}`);