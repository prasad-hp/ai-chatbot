import { NextFunction, Request, Response } from "express";
import runGemini from "../config/gemini";
import { Guest, User } from "../models/user";

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const question = req.body.message;
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const user = await User.findById(userId);
        const guest = await Guest.findById(userId)

        if (!user || !guest) {
            return res.status(404).json({ message: "User/Guest not found" });
        }
        const result = await runGemini(question);
        const responseText = result.response.text();
        if(!user){
            guest.chats.push({
                request: question,
                response: responseText
            });
            await guest.save();
        }
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

export const receiveChat = async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    try {
        const userId = req.query.userId as string;
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const user = await User.findById(userId)
        const guest = await Guest.findById(userId)
        if(!user || !guest){
            return res.status(403).json({message:"User Not found"})
        }
        const chats = user.chats || guest.chats || []
        res.status(200).json(chats)
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "An error occurred, please try again." });
    }
}
