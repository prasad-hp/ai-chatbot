import { Request, Response } from "express";
import { guestSchema } from "../utils/validators";
import { Guest } from "../models/user";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
config()

const JWT_TOKEN = process.env.JWT_TOKEN as string;
export const guestUser = async(
    req: Request,
    res: Response
)=>{
    const guestName = req.body.name;
    const parsedData = guestSchema.safeParse(guestName);
    if(!parsedData.success){
        return res.status(400).json({message: parsedData.error})
    }
    try {        
        const createGuest = await Guest.create({
            firstName:guestName
        })
        if(!createGuest){
            return res.status(500).json({message:"Please try again"})
        }
        const token = sign(createGuest.id, JWT_TOKEN)
        res.status(201).json({
            message: "User Created Successfully",
            token: token
        })
    } catch (error) {
        console.error(error, "An Error Occured")
    }

}