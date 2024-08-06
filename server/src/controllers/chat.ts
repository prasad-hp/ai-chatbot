import { NextFunction, Request, Response } from "express";
import run from "../config/gemini";


export const chat = async(
    req:Request, 
    res:Response, 
    next:NextFunction)=>{
        try {
            const inputData = req.body;
            const question = inputData.message;
            const result = await run(question)
            res.status(201).json(result.response.text() || {message:"An error Occured Please try again"})
        } catch (error) {
            console.error(error, "An Error Occured")
        }
}