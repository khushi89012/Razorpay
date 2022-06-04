const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const bodyParser = require('body-parser')
require('dotenv').config()
const {login, register, getUsers} = require('./src/controller/user.controller')
const {getProducts,  getOneProduct} = require('./src/controller/product.controller')


const app = express()
app.use(cors())
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded());

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/shop'

mongoose.connect(MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
    },() => {
        console.log('Connected to database')
    }
)

// routes for pages
// in get route show all products 
app.post('/login', login)
app.post('/register', register)
app.get('/login', getUsers)
app.get('/products', getProducts)
app.get('/products/:id', getOneProduct)

const razorpay = new Razorpay({
	key_id: process.env.RAZOR_PAY_KEY,
	key_secret: process.env.RAZOR_PAY_SECRET
})

app.get('/logo.svg', (req, res) => {
	res.sendFile(path.join(__dirname, 'logo.svg'))
})

app.post('/verification', (req, res) => {
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const tushar = crypto.createHmac('tush259', secret)
	tushar.update(JSON.stringify(req.body))
	const digest = tushar.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = 499
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

app.listen(process.env.PORT, () => {
    console.log('Server started')
}
)
