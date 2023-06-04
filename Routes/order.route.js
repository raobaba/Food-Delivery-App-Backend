const express = require('express');
const { OrderModel } = require('../Models/order.model');
const OrderRouter = express.Router();

OrderRouter.post('/api/orders', async (req, res) => {
  try {
    // Create a new instance of the Restaurant model
    const newOrders = new OrderModel(req.body);
    // Save the new restaurant to the database
    const createdOrder = await newOrders.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the restaurant' });
  }
});

OrderRouter.get('/api/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the order.' });
  }
});

OrderRouter.put('/api/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the order.' });
  }
});

module.exports = { OrderRouter };
