import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { Embeddings } from "openai/resources";

const chatSchema = new mongoose.Schema({
    id:{
        type:String,
        default: randomUUID()
    },
    role:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})
const userSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: false
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [chatSchema]
})
const User = mongoose.model("User", userSchema)
export default User;