import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import cookieParser from "cookie-parser";

export const protectRoute = async (req, res, next) => {
    try {
        // Extract the JWT token from cookies
        const token = req.cookies?.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        // Find the user by decoded userId
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach user to request object
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Error in ProtectRoute middleware:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
