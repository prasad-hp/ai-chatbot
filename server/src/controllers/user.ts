import { NextFunction, Request, Response } from "express";
import { User } from "../models/user"
import bcrypt from "bcrypt"
import { loginSchema, signupSchema } from "../utils/validators";
import { createToken } from "../utils/token-manager";
import { COOKIE_NAME } from "../utils/constants";

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
        const createUser = await User.create({
                                firstName:signupData.data.firstName,
                                lastName: signupData.data.lastName,
                                email:signupData.data.email,
                                password:hashedPassword
                            })
        if(!createUser){
            return res.status(500).json({message:"An error Occured, please try again"})
        }
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        })
        const token = createToken(createUser.id, createUser.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie(
            COOKIE_NAME, 
            token, 
            {
                path: "/",
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true
            }
        )
        res.status(201).json({message: "User Created Successfully"})
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
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        })
        const token = createToken(user.id, user.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie(
            COOKIE_NAME, 
            token, 
            {
                path: "/",
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true
            }
        )
        res.status(200).json({message:"Logged In"})
    } catch (error) {
        console.error(error, "An Error Occured")
    }
}