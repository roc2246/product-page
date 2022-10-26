const mongoose = require("mongoose");

const cartitemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  },
  totalprice: {
    type: Number,
    required: true,
  }
 
});

const Cartitem = mongoose.model("Cartitem", cartitemSchema)
module.exports = Cartitem