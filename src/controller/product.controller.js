const Product = require('../models/product.model')
// const mongoose = require('mongoose')


// get all products from here

const getProducts = async(req, res, err) => {
    try{
        var products = await Product.find()
        res.status(200).send(products)
    }
    catch(err){
        res.send({
            message: 'Error'
        })
    }
}


// get a single product by its product ID

const getOneProduct = async(req, res, err) => {
    try{
        var product = await Product.findOne({_id: req.params.id})
        .lean()
        .exec()

        res.status(201).send(product)
    }catch(err){
        res.send({
            message: err.message
        })
    }
}


module.exports = {
    getProducts,
    getOneProduct
};