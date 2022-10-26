const express = require('express');
require('./mongoose')
const productRouter = require('./routes/products')
const cartRouter = require('./routes/cart')
const pageRouter = require('./routes/page')

const app = express()

app.use(express.static('public'));
app.use(express.json())
app.use('/products', productRouter)
app.use('/cart', cartRouter)
app.use(pageRouter)

module.exports = app