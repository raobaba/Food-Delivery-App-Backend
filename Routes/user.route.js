const express = require('express');
const {UserModel} = require('../Models/user.model');
const UserRouter = express.Router();
  
UserRouter.post("/api/register",async (req,res)=>{
      const user = req.body;
      try { 
        const exist = await UserModel.findOne({username:req.body.username});
        if(exist){
          return res.status(401).json({message:'User already exists'});
        } 
        const newuser = new UserModel(user);
        await newuser.save();
        res.status(200).json({message:user})
      } catch (error) {
        console.log("Error while SignUp",error.message);
      }
});

UserRouter.post("/api/login", async(req,res)=>{
        const username = req.body.username;
      const password = req.body.password;
     try {
      let user = await UserModel.findOne({username:username,password:password});
      if(user){
        return res.status(200).json({data:user});
      }else{
        return res.status(401).json("Invalid Credential");
      }
     } catch (error) {
         res.status(500).json("Error while Login",error.message);  
     }
})

UserRouter.put('/api/user/:id/reset', async (req, res) => {
    try {
      const { id } = req.params;
      const { password, newPassword } = req.body;
      // Find the user by ID
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Check if the current password matches
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid current password' });
      }
      // Update the user's password
      user.password = newPassword;
      // Save the updated user to the database
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to reset password' });
    }
  });
module.exports = {UserRouter};