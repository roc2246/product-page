const express = require("express");
const router = express.Router();
const Product = require("../models/products");

// Add Product
router.post("/", async (req, res) => {
  const product = new Product({
    id: req.body.id,
    company: req.body.company,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    sale: req.body.sale,
    discount: req.body.discount,
    totalprice: req.body.totalprice,
    images: req.body.images,
    thumbnails: req.body.thumbnails,
  });
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Products
router.get("/", async (req, res) => {
    Product.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
      });
})

// Get One Product
router.get("/:id", async (req, res) => {
    try {
      const product = await Product.findOne({ id: req.params.id });
  
      if (!product) {
        return res.status(404).send()
    }

    res.send(product)
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
})

// Delete Product
router.delete("/:id", async (req, res) => {
    try {
      const product = await Product.findOne({ id: req.params.id });
      await product.remove();
      res.json({ message: "Deleted product" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  module.exports = router