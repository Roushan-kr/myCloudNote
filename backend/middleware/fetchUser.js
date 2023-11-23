const jwt = require('jsonwebtoken');

const JWT_sec = process.env.JWT_SECRET || "WTF";

const fetchUser = (req, res, next) => {
    // get user from the jwt token and add id to req header
    const token = req.header("auth-token");
    if (!token) {
       return res.status(401).json({ error: "Token not found. Authentication required." });
    }
    try {
        const data = jwt.verify(token, JWT_sec);
        req.user = data.user;

    } catch (error) {
        return res.status(401).json({ error: "Authentication failed." });
    }

    next();
}

module.exports = fetchUser;
