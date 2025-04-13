// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const router = require('express').Router();
const db  = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login route for user authentication
router.post('/', async (req, res) => {
    
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({message:'All fields are required'})
        } else{

            const user = await db.User.findOne({email: email});

            if(!user) {
                res.send(`Could not find this user in the database: User with email ${email}`);
            } else{

                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid){
                    res.send(`The password credentials shared did not match the credentials for the user with this email ${user.email}`);

                } else{

                    const token = jwt.sign(
                        { id: user._id, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: '1d' }
                    );

                    return res.status(200).json({ message: 'Login successful', token });
                }
            }

        }

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }

});

// Export the router to be used in other parts of the application
module.exports = router