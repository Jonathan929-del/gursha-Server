// Imports
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import signToken from '../utils/jwt.js';
import {validatRegisterInput, validateLoginInput} from '../utils/validators.js';
const router = express.Router();





// Register user
router.post('/register', async (req, res) => {
    try {


        // Validating
        const {username, email, password, confirmPassword} = req.body;
        const existingUser = await User.findOne({username});
        const {errors, valid} = validatRegisterInput(username, email, password, confirmPassword);
        if(!valid || existingUser){
            if(existingUser){
                errors.username = 'Username is taken.';
            };
            res.status(400).json(errors);
        }else{

            // Saving user
            const hashedPassword = bcrypt.hashSync(password);
            const newUser = await User.create({
                username,
                email,
                password:hashedPassword,
                createdAt:new Date().toISOString()
            });

            // Generating token
            const token = signToken(newUser);
            res.status(200).json({
                ...newUser._doc,
                token
            });
        };


    } catch (err) {
        res.status(500).json(err);
    }
});





// Login user
router.post('/login', async (req, res) => {
    try {


        // Validating
        const {username, password} = req.body;
        const {errors, valid} = validateLoginInput(username, password);
        if(!valid){
            res.status(400).json(errors);
        };
        const user = await User.findOne({username});
        if(!user){
            res.status(404).json('User not found.');
        };


        // Generating token
        const token = signToken(user);
        res.status(200).json({
            ...user._doc,
            token
        });


    } catch (err) {
        res.status(500).json(err);
    }
});





// Export
export default router;