//controller for user 

import {Request, Response} from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';




  export const registerUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;  
      if(!name ||!email||!password){
        res.status(400).json({message:"Please provide all required fields"});
        return;
      } 
      const user= await User.findOne({email});
      if(user){
        res.status(400).json({message:"User already exists"});
        return;
      }
      const salt =await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,salt);
      
      const newUser=await User.create({
        name,
        email,
        password: hashedPassword
      });
      await newUser.save();

      // Set session data
      req.session.isLoggedIn=true;
      req.session.userId=newUser._id;



      res.status(201).json({ message: 'Account registered successfully', user: newUser });

    }catch (error:any) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }       

  //controller for use login

  export const loginUser= async (req:Request,res:Response)=>{
  try {
      const { email, password } = req.body;  
      if(!email||!password){
        res.status(400).json({message:"Please provide all required fields"});
        return;
      } 
      const user= await User.findOne({email});
      if(!user){
        res.status(400).json({message:"Invalid email or passsword"});
        return;
      }
      const isPasswordCorrect=await bcrypt.compare(password,user.password);
      if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid email or password"})
      }

      //session
      req.session.isLoggedIn=true;
      req.session.userId=user._id;

      return res.json({
        message:"Login sucessfull",
        user:{
            _id:user._id,
            name:user.name,
            email:user.email
        }
      })

    }catch (error:any) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  //controller for userLogout


  export const userLogout=async(req:Request,res:Response)=>{
    try {
        
    } catch (error) {
        
    }

  }