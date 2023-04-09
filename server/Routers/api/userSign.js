const express = require('express');
const router = express.Router();
const User = require(`../../models/User`)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  authenticate  = require(`../../middleware/auth`)
const { clearCookie } = require('express');



//SignUp route
router.get(`/signUp` ,  (req  , res) => {
    res.send(`Yea its Right route`)
})
router.post(`/signUp` ,  async (req , res) => {
    console.log(req.body);
    try {
        const {email , password , confirmPassword , userName} = req.body;
        const existUser = await User.findOne({email})
        if(existUser) {
            return res.status(400).json({error : `User With This Email Already Exists`})
        }
            // Create a new user with the provided email and password
            if(password !== confirmPassword) {
                return res.status(400).json({error: `Passwords do not Match`})
            }
            const hashedPassword = await bcrypt.hash(password , 10);
            const user = new User({email , password:hashedPassword , confirmPassword , userName});
            try{
                await user.save()
                //generate token for user
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                res.cookie('token', token, {
                    httpOnly: true,
                    // other cookie options go here
                });

                // res.status(200).json({ success: true });
                res.redirect(`/login`)
            }
            catch(error) {
                console.log(error);
            }
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
})
//Login Route
router.get(`/login` ,   (req  , res) => {
    res.send(`Yea its Right login route`)
})
    router.post(`/login` ,   async (req , res) => {
        try {
            const {email , password} = req.body;
            // Check if user with the given email exists
            const user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({error : `invaild email or password`})
            }
            // Check if the provided password matches the hashed password in the database
            const hashedPassword = await bcrypt.compare(password , user.password)
            if(!hashedPassword) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }
            // Generate a token for the authenticated user
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.json({token : token})
            console.log(token);
 
        }
        catch(err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }) 
router.get(`/logout` , (req , res) => {
    res.send(`logout route`)
})
router.post(`/logout` , authenticate , async (req ,res) => {
    console.log('Logout route called');

    console.log('Logout URL:', '/logout');
    try {
        if(req.user && req.user.tokens) {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })}
        await req.user.save();
    
        res.cookie('token', '', { maxAge:0 });
        console.log("Cookie cleared");
        res.status(200).json({message: `User logged Out`});

    }
    catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
})

// add this route to get the username of the logged-in user
router.get('/getUserName', authenticate , async (req, res) => {
    try {
      // get the user object from the authenticate middleware
      const user = req.user;
  
      // retrieve the username from the user object
      const username = user.userName;
  
      // send the username in the response
      res.status(200).json({ username });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
module.exports = router;