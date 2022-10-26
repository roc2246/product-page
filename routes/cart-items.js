const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const Cartitem = require("../models/cart-items")


// Add To Cart
router.post("/",  async(req, res) => {
    const cartitem = new Cartitem({
        id: req.body.id,
          image: req.body.image[0],
          name: req.body.name,
          price: req.body.price,
          quantity: req.body.quantity,
          totalprice: req.body.totalprice
    })

    try {
        const newCartitem = await cartitem.save();
        res.status(201).json(newCartitem);
      } catch (e) {
        res.status(400).json(e);
        console.log(e);
      }
})

// Get Cart Items
router.get("/", async (req, res) => {
    Cartitem.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
      });
})

// Update Cart Item
router.patch("/:id", getCartitem, async (req, res) => {
    if (req.body.quantity != null) {
        res.cartitem.quantity = req.body.quantity;
        res.cartitem.totalprice = req.body.totalprice
      }
      try {
        const updatedCartitem = await res.cartitem.save();
        res.json(updatedCartitem);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  });

// Delete Cart Item
router.delete("/:id", getCartitem, async (req, res) => {
    try {
        await res.cartitem.remove();
        res.json({ message: "Deleted Cart Item" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  });

// Middleware
async function getCartitem(req, res, next) {
    let cartitem;
    try {
      cartitem = await Cartitem.findOne({ id: req.params.id });
  
      if (cartitem === null) {
        return res.status(400).json({ message: "Cannot find cart item" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.cartitem = cartitem;
    next();
  }

module.exports = router