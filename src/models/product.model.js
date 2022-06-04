const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title :{ type: String, required: true },
    description :{ type: String, required: true },
    price :{ type: Number, required: true },
    image :{ type: String, required: true },
    quantity :{ type: Number,required: true },
    category :{ type: String, required: true },
    Id :{ type: String, required: true },
    rating :
        { 
            rate : Number,
            count : Number,
        }, 
})

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;