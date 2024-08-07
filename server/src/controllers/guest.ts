import { Request, Response } from "express";
import { guestSchema } from "../utils/validators";
import { Guest } from "../models/user";


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
        res.status(201).json({
            message: "User Created Successfully",
            userId: createGuest.id
        })
    } catch (error) {
        console.error(error, "An Error Occured")
    }

}