import { NextFunction, Request, Response } from "express";
import runGemini from "../config/gemini";
import { Guest, User } from "../models/user";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const question = req.body.message;
        const userId = req.id as string;
        console.log(userId)
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }


        const user = await User.findById(userId);
        const guest = await Guest.findById(userId);

        if (!user && !guest) {
            return res.status(404).json({ message: "User or Guest not found" });
        }

        // Run Gemini to get response
        const result = await runGemini(question);
        const responseText = result.response.text();

        // Update the appropriate chat collection
        if (user) {
            user.chats.push({
                request: question,
                response: responseText
            });
            await user.save();
        }

        if (guest) {
            guest.chats.push({
                request: question,
                response: responseText
            });
            await guest.save();
        }

        res.status(201).json({ response: responseText });
    } catch (error) {
        console.error("An error occurred while sending message:", error);
        res.status(500).json({ message: "An error occurred, please try again." });
    }
};

export const receiveChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.id as string;
        
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        // Check if the ID belongs to a User or Guest
        const user = await User.findById(userId);
        const guest = await Guest.findById(userId);

        if (!user && !guest) {
            return res.status(404).json({ message: "User or Guest not found" });
        }

        // Return the chats for User or Guest
        const chats = user?.chats || guest?.chats || [];
        res.status(200).json(chats);
    } catch (error) {
        console.error("An error occurred while receiving chat:", error);
        res.status(500).json({ message: "An error occurred, please try again." });
    }
};
