const express = require('express');
const { RestaurantModel } = require('../Models/restaurant.model');
const RestaurantRouter = express.Router();

RestaurantRouter.post('/api/restaurants', async (req, res) => {
  try {
    // Create a new instance of the Restaurant model
    const newRestaurant = new RestaurantModel(req.body);
    // Save the new restaurant to the database
    const createdRestaurant = await newRestaurant.save();
    res.status(201).json(createdRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the restaurant' });
  }
})

RestaurantRouter.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get restaurant data' });
  }
})
RestaurantRouter.get('/api/restaurants/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get Restaurant data by Id' });
  }
})

RestaurantRouter.get('/api/restaurants/:id/menu', async (req, res) => {
  const { id } = req.params;
  try {
    // Find the restaurant by ID
    const restaurant = await RestaurantModel.findById(id);
    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    // Retrieve the menu from the restaurant object
    const menu = restaurant.menu;
    res.json({ menu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get Restaurant Menu Data' });
  }
})

RestaurantRouter.post('/api/restaurants/:id/menu', async (req, res) => {
  const { id } = req.params;
  const requestData = req.body; // Assuming the request data is sent in the request body
  try {
    // Find the restaurant by ID
    const restaurant = await RestaurantModel.findById(id);
    // Check if the restaurant exists
    console.log(restaurant)
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    // Retrieve the menu from the restaurant object
    const menu = restaurant.menu;
    // Add the request data to the menu
    menu.push(requestData);
    // Update the restaurant object with the modified menu
    restaurant.menu = menu;
    await restaurant.save();
    res.json({ menu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Create Menu Data in Restaurant' });
  }
});

RestaurantRouter.put('/api/restaurants/:id/menu/:itemId', async (req, res) => {
  const { id, itemId } = req.params;
  const { name, description, price, image } = req.body;
  try {
    // Find the restaurant by ID
    const restaurant = await RestaurantModel.findById(id);
    // Find the menu item by its ID
    const menuItem = restaurant.menu.id(itemId);
    // Update the menu item properties
    menuItem.name = name;
    menuItem.description = description;
    menuItem.price = price;
    menuItem.image = image;
    // Save the updated restaurant
    await restaurant.save();
    res.status(200).json({ success: true, message: 'Menu item updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred while updating the menu item' });
  }
});


RestaurantRouter.delete('/api/restaurants/:id/menu/:itemId', async (req, res) => {
  const { id, itemId } = req.params;
  try {
    // Find the restaurant by ID
    const restaurant = await RestaurantModel.findById(id);
    // Find the index of the menu item within the menu array
    const menuItemIndex = restaurant.menu.findIndex(item => item._id.toString() === itemId);
    if (menuItemIndex === -1) {
      return res.status(404).json({ success: false, error: 'Menu item not found' });
    }
    // Remove the menu item from the menu array
    restaurant.menu.pull(restaurant.menu[menuItemIndex]);
    // Save the updated restaurant
    await restaurant.save();
    res.status(200).json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred while deleting the menu item' });
  }
});




module.exports = { RestaurantRouter }