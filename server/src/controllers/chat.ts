import { NextFunction, Request, Response } from "express";
import run from "../config/gemini";
import User from "../models/user";

export const chat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inputData = req.body;
        const question = inputData.message;
    
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const result = await run(question);
        const responseText = result.response.text();

        user.chats.push({
            request: question,
            response: responseText
        });
        await user.save();
        res.status(201).json({ response: responseText });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "An error occurred, please try again." });
    }
};
