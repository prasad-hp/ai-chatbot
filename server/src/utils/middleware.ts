import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
config()

export const authMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    const JWT_TOKEN = process.env.JWT_TOKEN as string;
    try {
        const authToken = req.headers.authorization;
        if(!authToken || !authToken.startsWith("Bearer")){
            return res.status(400).json({ message: "Invalid Authorization" });
        }
        const token = authToken.split(" ")[1];
        const jwtEncoded = verify(token, JWT_TOKEN)
        req.id = jwtEncoded as string;
        next();
    } catch (error:any) {
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
        } else if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Unauthorized: Token expired" });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}