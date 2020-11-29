const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
       firstName: String,
       lastName: String,
       email: String,
       login: String,
       password: String,
       cart: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Cart',
           // required: true
       }
    }
)

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;