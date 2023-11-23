const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a user: POST "/api/v1/auth/createUser" does not require auth
router.post('/createUser', async (req, res) => {
    try {
        console.log(req.body);

        // Create a new user instance based on the User model
        const user = new User(req.body);

        // Save the user to the database
        await user.save();

        // Send a JSON response with the saved user data
        res.json(user);
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
