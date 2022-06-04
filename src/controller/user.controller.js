
const User = require('../models/user.model')
require('dotenv').config()
const jwt = require('jsonwebtoken')


// const {body, validationResult} = require('express-validators')

const login = async(req, res, err) => {
    try{ 
        var login = await User.findOne({email: req.body.email})
        var token = process.env.TOKEN
        if(login){
            if(login.password === req.body.password){
                res.status(200).send({
                    message: 'Login Successful',
                    user: login,
                    token: token
                })
            }else{
                res.status(403).send({
                    message: 'Invalid Password'
                })
            }
        }else{
            res.status(403).send({
                message: 'Invalid Email'
            })
        }
    }catch(err){
        res.status(500).send({
            message: 'Please Register first'
        })
    }
}

const register = async(req, res, err) => {
    try{
        var exist = await User.findOne({email: req.body.email})
        if(exist){
            res.status(500).send({
                message: 'Email already exist'
            })
        }else{
            var user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cart: [],
                wishlist: [],
                orders: [],
                address: [],
                phone: req.body.phone
                })
            user.save()
            let token = `Bearer-${user.email}${Date.now()}`
            res.status(200).send({
                message: 'Registration Successful',
                token: token,
                user: user
            })
        }
    }catch(err){
        res.status(500).send({
            message: err.message
        })
    }
}

const getUsers = async (req, res) => {
    try{
        var users = await User.find({})
        res.send(users)
    }catch(err){
        res.send({
            message: 'Error'
        })
    }
}


module.exports = {
    login,
    register,
    getUsers
}