const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fetchUser = require("../middleware/fetchUser")

dotenv.config()

const JWT_sec = process.env.JWT_SECRET || "WTF";

// ROUTE: 1 Create a user: POST "/api/v1/auth/createUser" does not require auth
router.post('/createUser', [
    body("name", "Enter a valid name min 3 char").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a passwd of atleast 5 char").isLength({ min: 5 }),

], async (req, res) => {
    try {
        console.log(req.body);
        // console.log(JWT_sec);
        // method 1
        // Create a new user instance based on the User model
        // const user = new User(req.body);

        // // Save the user to the database
        // await user.save();

        // // Send a JSON response with the saved user data
        // res.json(user);

        // if user enterd a bad entery input, sand a error array
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "user already exists with this email" })
        }
        // securing passwd
        const salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        // created user with a secure passwd by bcryptjs
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        // res.json(user);
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_sec)
        res.json({ authToken })

    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//ROUTE: 2 Create a user: POST "/api/v1/auth/login" 
router.post('/login', [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid passwd").exists()
], async (req, res) => {
    try {
        console.log(req.body);

        // if user enterd a bad entery input, sand a error array
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ error: "User Not found" })
            }
            const passwdComp = await bcrypt.compare(password, user.password)
            if (!passwdComp) {
                return res.status(400).json({ error: "Incorrect Password" })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_sec)
            res.json({ authToken })

        } catch (error) {
            console.error("Error loging user:", error);
            res.status(500).json({ error: "Someting went worng" });
        }


    } catch (error) {
        console.error("Error loging user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

//ROUTE: 3 get a user: GET "/api/v1/auth/getUser"  Login required
router.post("/getuser", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        
        const user = await User.findById(userId).select("-password")

        res.json(user)

    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;
