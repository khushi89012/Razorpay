const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: { type: Array, required: false },
    wishlist: { type: Array, required: false },
    orders: { type: Array, required: false },
    address: { type: Array, required: false },
    phone: { type: Number, required: false },
},{
    timestamps: true
});






var User = new mongoose.model('User', userSchema);

module.exports = User;