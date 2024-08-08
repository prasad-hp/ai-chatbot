import { Router } from "express";
import { receiveChat, sendMessage } from "../controllers/chat";
import { authMiddleware } from "../utils/middleware";

const chatRouter = Router()

chatRouter.post("/send", authMiddleware ,sendMessage)
chatRouter.get("/receive", authMiddleware, receiveChat)


export default chatRouter;