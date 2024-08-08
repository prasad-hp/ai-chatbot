import { NextFunction, Request, Response } from "express";
import { User } from "../models/user"
import bcrypt from "bcrypt"
import { loginSchema, signupSchema } from "../utils/validators";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
config()
const JWT_TOKEN = process.env.JWT_TOKEN as string;
export const getAllUsers = async (
    req: Request,
    res: Response
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
        const createUser = await User.create({
                                firstName:signupData.data.firstName,
                                lastName: signupData.data.lastName,
                                email:signupData.data.email,
                                password:hashedPassword
                            })
        if(!createUser){
            return res.status(500).json({message:"An error Occured, please try again"})
        }
        const token = sign(createUser.id, JWT_TOKEN)
        res.status(201).json({
            message: "User Created Successfully",
            token: token
        })
    } catch (error) {
        console.error(error, "An Error Occured")
    }
}

export const loginUser = async(
    req : Request,
    res : Response
)=>{
    try {
        const loginData = loginSchema.safeParse(req.body)
        if(!loginData.success){
            return res.status(400).json({message: loginData.error})
        }
        const user = await User.findOne({
            email:loginData.data.email
        })
        if(!user){
            return res.status(400).json({message:"User doesn't exist"})
        }
        const checkPassword = bcrypt.compareSync(loginData.data.password, user.password)
        if(!checkPassword){
            return res.status(400).json({message:"Enter valid Password"})
        }
        const token = sign(user.id, JWT_TOKEN)
        res.status(200).json({
            message:"Logged In",
            token:token
        })
    } catch (error) {
        console.error(error, "An Error Occured")
    }
}