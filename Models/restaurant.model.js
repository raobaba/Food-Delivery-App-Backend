const mongoose = require('mongoose');

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    }
  },
  menu: [
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image: String
    }
  ]
});

// Restaurant Model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
