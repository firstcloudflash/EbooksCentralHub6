const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Add a new product
router.post('/', async (req, res) => {
  const { title, description, price, image } = req.body;
  try {
    const product = new Product({ title, description, price, image });
    await product.save();
    res.status(201).send('Product added');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
