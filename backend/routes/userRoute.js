const router=require('express').Router();
const User=require("../models/userModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');

//Register user account

router.post("/register", async(req,res)=>{
    try{
        //check if user already exists
        let user=await User.findOne({email: req.body.email});
        if(user){
            return res.send({
                message: "User already exists",
                success: false,
            });
        }

        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);
        req.body.password=hashedPassword;
        const newUser=new User(req.body);
        await newUser.save();
        res.send({
            message: "User created successfully",
            data: null,
            success: true,
        });
    }
    catch(error){
        res.send({
            message: error.message,
            success: false,
        });
    }
});


//Login user account

router.post("/login", async(req,res)=>{
    try{
        //Check if user exists
        let user=await User.findOne({email: req.body.email});
        if(!user){
            return res.send({
                message: "User doesnt exists",
                success: false,
            });
        }

        //Check if password is correct
        const validPassword= await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.send({
                message: "Invalid Password",
                success: false,
            });
        }

        //Generate Token
        const token= jwt.sign( {userId : user._id}, process.env.TOKEN_SECRET, { expiresIn:"1d"} );
        res.send({
            message: "User logged in successfully",
            data: token,
            success: true,
        });
    }
    catch(error){
        res.send({
            message: error.message,
            success: false,
        });
    }
});


// Get user info

router.get("/get-user-info", authMiddleware , async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        user.password="****";
        res.send({
            message: "User info fetched successfully",
            data: user,
            success: true,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

module.exports=router;