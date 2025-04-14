// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const router = require('express').Router();
const db  = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign in route for user authentication
router.post('/', async (req, res) => {
    
    try {

        const { firstName, lastName, email, password } = req.body;

        if (!email || !password) {
            return res.json({message:'All fields are required'})
        } else {

            const existingUser = await db.User.findOne({ email: email});

            if (existingUser) {
                return res.json({ error: "Email already in system" });
            } else {

                // Hash the password before saving the user
                const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

                const createUser = new db.User({firstName, lastName, email, password: hashedPassword});
                await createUser.save();

                const token = jwt.sign(
                    { id: createUser._id, email: createUser.email },
                    process.env.SECRET,
                    { expiresIn: '1d' }
                );

                console.log("JWT SECRET:", process.env.SECRET);

                return res.status(200).json({ message: 'Signup successful', token });
            }

        }
    } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
    }

});

// Export the router to be used in other parts of the application
module.exports = router