import { NextFunction, Request, Response } from "express";
import User from "../models/user"
import bcrypt from "bcrypt"
import { signupSchema } from "../utils/validators";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
    )=>{
    try {
        const users = await User.find();
        return res.status(200).json({message: "OK", users})
    } catch (error) {
        console.log(error)
    }
}

export const signUpUser = async (
    req: Request,
    res: Response,
)=>{
    try {
        const signupData = signupSchema.safeParse(req.body)
        if(!signupData.success){
            return res.status(400).json({message: signupData.error})
        }
        const checkEmail = await User.findOne({
            email: signupData.data.email
        })
        if(checkEmail){
            return res.status(400).json({message: "Email already exists"})
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(signupData.data.password, salt)
        await User.create({
            firstName:signupData.data.firstName,
            lastName: signupData.data.lastName,
            email:signupData.data.email,
            password:hashedPassword
        })
        res.status(201).json({message: "User Created Successfully"})
    } catch (error) {
        console.error(error, "An Error Occured")
    }
}