const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');

const scrapers = require('./scrapers');
const db = require('./db')

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/products', async (req, res) => {
    const products = await db.getAllProducts();
    res.send(products)
})

app.post('/products', async (req, res) => {
    console.log(req.body)
    const productData = await scrapers.scrapeProduct(req.body.productURL)
    const products = await db.insertProduct(productData.name, productData.avatarURL, req.body.productURL)
    res.send(products);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))