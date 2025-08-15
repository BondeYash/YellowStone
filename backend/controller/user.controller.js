import * as userService from '../services/user.services.js';
import userModel from '../models/user.model.js';
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.services.js';


export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  console.log("REQ BODY:", req.body);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message:
        'Validation failed: ' +
        errors.array().map((err) => err.msg).join(', '),
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await userService.createUser({ email, password });
    const token = await user.generateAuthToken(); // this will now work

    delete user._doc.password

    res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const loginUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message:
        'Validation failed: ' +
        errors.array().map((err) => err.msg).join(', '),
    });
  }

  try {
    const {email , password} = req.body

    const user = await userModel.findOne({email}).select('+password'); // Ensure password is selected for comparison


    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    

    const token = await user.generateAuthToken();

    delete user._doc.password; 

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error)
  }
}

export const getUserProfileController = async (req, res) => {
  const userEmail = req.user.
  email;

  try {
    const user = await userModel.findOne({ email: userEmail }).select('+password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const logOutUserController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    } 
    redisClient.set(token , 'logged_out' , 'EX', 60 * 60 * 24);

    res.status(200).json({ message : "User logged out successfully"})

  }catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getAllUserController = async (req , res) => {
   try {

    const loggedInUser = await userModel.findOne({email : req.user.email});


     const allUser = await userService.getAllUser({userId : loggedInUser._id});


     return res.status(200).json({allUser});
   }catch(err) {
    return res.status(400).send("Internal Server error");
   }
}