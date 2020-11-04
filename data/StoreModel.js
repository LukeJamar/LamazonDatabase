const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
    {
        name: String,
        // id: Handeled in MongoDb
        quantity: Number,
        description: String
    }
)

const StoreModel = mongoose.model('StoreItem', StoreSchema);

module.exports = StoreModel;