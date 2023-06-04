const express = require("express");
require('dotenv').config(); 
const cors = require("cors"); 
const {UserRouter} = require('./Routes/user.route.js')
const {RestaurantRouter} = require('./Routes/restaurant.route.js')
const {OrderRouter} = require('./Routes/order.route.js')
const Connection = require("./Database/db.js");
const app = express();
app.use(express.json()); 
app.use(cors());
app.use('/',UserRouter) 
app.use('/',RestaurantRouter) 
app.use('/',OrderRouter) 
Connection();  
app.listen(process.env.PORT, () =>
 console.log(`Server is running successfully on PORT ${process.env.PORT}`)
 ); 
   