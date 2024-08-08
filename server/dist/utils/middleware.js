"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
(0, dotenv_1.config)();
const authMiddleware = (req, res, next) => {
    const JWT_TOKEN = process.env.JWT_TOKEN;
    try {
        const authToken = req.headers.authorization;
        if (!authToken || !authToken.startsWith("Bearer")) {
            return res.status(400).json({ message: "Invalid Authorization" });
        }
        const token = authToken.split(" ")[1];
        const jwtEncoded = (0, jsonwebtoken_1.verify)(token, JWT_TOKEN);
        req.id = jwtEncoded;
        next();
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        else if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Unauthorized: Token expired" });
        }
        else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};
exports.authMiddleware = authMiddleware;
