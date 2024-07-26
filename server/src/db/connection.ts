import mongoose, { connect } from "mongoose";
import dotenv, { config } from "dotenv"
config()

export async function connectDataBase(){
    try {
        const dbUrl = process.env.MONGODB_URL as string;
        if (!dbUrl) {
            throw new Error("MONGODB_URL is not defined in the environment variables.");
        }
        await mongoose.connect(dbUrl)
        console.log("Database connected Successfully")
    } catch (error) {
        console.error("Database connection failed", error)
        throw new Error("could not connect to database")
    }
}
